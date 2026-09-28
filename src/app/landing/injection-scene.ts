import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import bottleUrl from "../../assets/nad-bottle/NAD_Bottle.glb?url";
import { injectionFrame } from "./injection-motion";

export type InjectionScene = {
  render: (progress: number) => void;
  resize: () => void;
  dispose: () => void;
};

/** Loads the supplied bottle without replacing its geometry, UVs, or artwork. */
export async function createInjectionScene(host: HTMLElement, onContextLost: () => void, signal: AbortSignal): Promise<InjectionScene> {
  const response = await fetch(bottleUrl, { signal });
  if (!response.ok) throw new Error(`Bottle model could not load (${response.status}).`);
  const gltf = await new GLTFLoader().parseAsync(await response.arrayBuffer(), "");
  const model = gltf.scene;
  const geometries = new Set<THREE.BufferGeometry>();
  const materials = new Set<THREE.Material>();
  const textures = new Set<THREE.Texture>();
  model.traverse(object => {
    if (!(object instanceof THREE.Mesh)) return;
    geometries.add(object.geometry);
    for (const surface of Array.isArray(object.material) ? object.material : [object.material]) {
      // Embedded photographic surfaces already contain their studio exposure.
      // Tone-mapping them again changes the supplied cap and label colours.
      if (surface instanceof THREE.MeshBasicMaterial) surface.toneMapped = false;

      // This canvas floats over a CSS background. Screen-space transmission cannot
      // refract that DOM backdrop, and its empty render pass turns the glass white.
      // Alpha glass lets the actual page show through while retaining reflections.
      if (surface instanceof THREE.MeshPhysicalMaterial && (
        surface.name === "Clear optical glass — continuous side reflections" ||
        surface.name === "Smooth solid glass base — recessed underside"
      )) {
        const base = surface.name.startsWith("Smooth solid glass base");
        surface.transmission = 0;
        surface.thickness = 0;
        surface.transparent = true;
        surface.opacity = base ? 0.26 : 0.15;
        surface.depthWrite = false;
        surface.roughness = base ? 0.10 : 0.055;
        surface.side = THREE.FrontSide;
        // Preserve a visible glass rim while the front lets the page show through.
        surface.onBeforeCompile = shader => {
          shader.fragmentShader = shader.fragmentShader.replace("#include <opaque_fragment>", `
            float glassEdge = pow(1.0 - clamp(abs(dot(normal, normalize(vViewPosition))), 0.0, 1.0), 2.5);
            diffuseColor.a = mix(diffuseColor.a, 0.62, glassEdge);
            outgoingLight = mix(outgoingLight, vec3(0.28, 0.32, 0.34), glassEdge * 0.45);
            #include <opaque_fragment>
          `);
        };
        surface.customProgramCacheKey = () => "vial-css-glass-v1";
      }
      if (surface.name === "Soft front and rear photographic reflections — fades before sides") {
        surface.opacity = 0.85;
        surface.depthWrite = false;
      }
      materials.add(surface);
      for (const value of Object.values(surface)) {
        if (value instanceof THREE.Texture) textures.add(value);
      }
    }
  });

  let renderer: THREE.WebGLRenderer | undefined;
  let environment: THREE.WebGLRenderTarget | undefined;
  let disposed = false;
  let lost = false;
  const contextLost = (event: Event) => { event.preventDefault(); lost = true; onContextLost(); };
  const dispose = () => {
    if (disposed) return;
    disposed = true;
    renderer?.domElement.removeEventListener("webglcontextlost", contextLost);
    geometries.forEach(value => value.dispose());
    materials.forEach(value => value.dispose());
    const bitmaps = new Set<ImageBitmap>();
    textures.forEach(value => {
      const bitmap = value.source.data;
      if (bitmap && typeof bitmap.close === "function") bitmaps.add(bitmap);
      value.dispose();
    });
    bitmaps.forEach(value => value.close());
    environment?.dispose();
    renderer?.dispose();
    renderer?.domElement.remove();
  };

  try {
    // Parsing embedded textures may finish after navigation aborts the fetch.
    signal.throwIfAborted();
    const label = [...materials].find(value => value.name === "Editable product label") as THREE.MeshBasicMaterial | undefined;
    if (!label?.map) throw new Error("Bottle label texture could not be decoded.");
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
    const webgl = renderer;
    webgl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    webgl.setClearColor(0x000000, 0);
    webgl.toneMapping = THREE.ACESFilmicToneMapping;
    webgl.toneMappingExposure = 1;
    webgl.outputColorSpace = THREE.SRGBColorSpace;
    webgl.domElement.addEventListener("webglcontextlost", contextLost);
    textures.forEach(value => { value.anisotropy = Math.min(8, webgl.capabilities.getMaxAnisotropy()); });

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-2, 2, 2.5, -2.5, 0.1, 40);
    camera.position.set(0, 0.8, 12);
    camera.lookAt(0, 0.12, 0);
    const vial = new THREE.Group();
    scene.add(vial);

    // The GLB is in meters. Fit the complete supplied model to the existing stage.
    const bounds = new THREE.Box3().setFromObject(model);
    const size = bounds.getSize(new THREE.Vector3());
    if (!Number.isFinite(size.y) || size.y <= 0) throw new Error("Bottle model has invalid bounds.");
    const scale = 3.73 / size.y;
    const center = bounds.getCenter(new THREE.Vector3());
    model.scale.multiplyScalar(scale);
    model.position.sub(center).multiplyScalar(scale);
    vial.add(model);

    // A studio environment supplies reflections to the physical sides and base.
    // Photographic cap/label materials and their shared embedded maps stay intact.
    const studio = new RoomEnvironment();
    const pmrem = new THREE.PMREMGenerator(webgl);
    try { environment = pmrem.fromScene(studio, 0.04); }
    finally { studio.dispose(); pmrem.dispose(); }
    scene.environment = environment.texture;
    scene.add(new THREE.HemisphereLight(0xffffff, 0xb5b8ab, 1.5));
    const key = new THREE.DirectionalLight(0xffffff, 2);
    key.position.set(-4, 5, 6);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xe6f0ff, 1.2);
    rim.position.set(4, 3, -2);
    scene.add(rim);

    function mesh(shape: THREE.BufferGeometry, surface: THREE.Material, parent: THREE.Object3D = vial) {
      geometries.add(shape);
      materials.add(surface);
      const object = new THREE.Mesh(shape, surface);
      parent.add(object);
      return object;
    }

    // The supplied file contains no liquid. Keep the scroll fill in a separate
    // inset volume, below the shoulder, without altering any source mesh.
    const liquidBase = -1.57;
    const liquidRange = 2.10;
    const liquidMaterial = new THREE.MeshPhysicalMaterial({ color: 0xc2d8df, roughness: 0.08, transparent: true, opacity: 0.18, depthWrite: false, side: THREE.DoubleSide, clearcoat: 1 });
    const liquid = mesh(new THREE.CylinderGeometry(0.86, 0.86, 1, 96), liquidMaterial);
    const meniscusMaterial = new THREE.MeshPhysicalMaterial({ color: 0xd7e6df, roughness: 0.06, transparent: true, opacity: 0.3, depthWrite: false, side: THREE.DoubleSide });
    const meniscus = mesh(new THREE.CircleGeometry(0.858, 96), meniscusMaterial);
    meniscus.rotation.x = -Math.PI / 2;

    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = shadowCanvas.height = 128;
    const shadowContext = shadowCanvas.getContext("2d")!;
    const shadowGradient = shadowContext.createRadialGradient(64, 64, 4, 64, 64, 64);
    shadowGradient.addColorStop(0, "rgba(10,25,42,.24)");
    shadowGradient.addColorStop(0.5, "rgba(10,25,42,.1)");
    shadowGradient.addColorStop(1, "rgba(10,25,42,0)");
    shadowContext.fillStyle = shadowGradient;
    shadowContext.fillRect(0, 0, 128, 128);
    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    textures.add(shadowTexture);
    const shadow = mesh(new THREE.PlaneGeometry(3.5, 0.52), new THREE.MeshBasicMaterial({ map: shadowTexture, transparent: true, depthWrite: false }), scene);
    shadow.position.set(0, -2.04, -0.8);

    let lastProgress = 0;
    function render(progress: number) {
      if (lost || disposed) return;
      lastProgress = progress;
      const state = injectionFrame(progress);
      vial.rotation.set(-0.035 + Math.sin(state.progress * Math.PI) * 0.065, state.rotation, state.tilt);
      vial.position.y = Math.sin(state.progress * Math.PI) * 0.045;
      const height = 0.16 + state.fill * liquidRange;
      liquid.scale.y = height;
      liquid.position.y = liquidBase + height / 2;
      meniscus.position.y = liquidBase + height;
      shadow.scale.x = 1 - Math.sin(state.progress * Math.PI) * 0.06;
      webgl.render(scene, camera);
    }
    function resize() {
      const width = host.clientWidth;
      const height = host.clientHeight;
      if (!width || !height || lost || disposed) return;
      webgl.setSize(width, height);
      const aspect = width / height;
      const viewHeight = Math.max(4.95, 2.65 / aspect);
      camera.left = -viewHeight * aspect / 2;
      camera.right = viewHeight * aspect / 2;
      camera.top = viewHeight / 2;
      camera.bottom = -viewHeight / 2;
      camera.updateProjectionMatrix();
      render(lastProgress);
    }
    host.appendChild(webgl.domElement);
    resize();
    return { render, resize, dispose };
  } catch (error) {
    dispose();
    throw error;
  }
}
