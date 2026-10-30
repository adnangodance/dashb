
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import InjectionPreview from "./app/landing/InjectionSection";
  import "./styles/index.css";
  import { ViewportSizing } from "./app/responsive-ui";

  const isInjectionPreview = new URLSearchParams(window.location.search).get("view") === "injection-preview";

  createRoot(document.getElementById("root")!).render(
    <><ViewportSizing />{isInjectionPreview ? <InjectionPreview /> : <App />}</>,
  );
