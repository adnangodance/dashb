import { EnrollmentModal } from "./EnrollmentModal";
import { Fragment, createContext, useContext, useState, useRef, useEffect, useLayoutEffect, useMemo, type CSSProperties, type Dispatch, type FormEvent, type PointerEvent as ReactPointerEvent, type ReactNode, type SetStateAction } from "react";
import { createPortal } from "react-dom";
import USAMap from "react-usa-map";
import {
  LayoutDashboard,
  BookOpen,
  FlaskConical,
  ClipboardList,
  ShoppingCart,
  Users,
  MessageSquare,
  Settings,
  RefreshCw,
  Search,
  Heart,
  Bell,
  ChevronDown,
  ChevronsUpDown,
  Package,
  Building2,
  Plus,
  Filter,
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight,
  Check,
  CheckCircle2,
  Clock,
  AlertCircle,
  TriangleAlert,
  XCircle,
  Eye,
  Truck,
  Star,
  ChevronLeft,
  ChevronRight,
  Upload,
  Download,
  Trash2,
  Edit3,
  Phone,
  Mail,
  MapPin,
  Shield,
  CreditCard,
  User,
  Lock,
  Globe,
  Leaf,
  Minus,
  Syringe,
  X,
  Loader2,
  EyeOff,
  LogOut,
  Flag,
  Send,
  Snowflake,
  Copy,
  Tag,
  History,
  Info,
} from "lucide-react";

import img430 from "@/imports/ScriptlinkrxDashboard/9b6fa0a3b334659006bcf39e91b4da387a7b4cf0.png";
import img429 from "@/imports/ScriptlinkrxDashboard/5a66df92e25e912526cc119832b732deeacaa033.png";
import img431 from "@/imports/ScriptlinkrxDashboard/143a980412abcd77313d7193a14da8e48a539c1c.png";
import img432 from "@/imports/ScriptlinkrxDashboard/6c60baab03165ef8abab5f7207471c9c98cd8c6d.png";
import img433 from "@/imports/ScriptlinkrxDashboard/468b9aadf5afc5b0889fbadb2123d9b07618a907.png";
import img434 from "@/imports/ScriptlinkrxDashboard/92c24c340582162a18a98ce2172b6b88031eda43.png";
import img452dash from "@/imports/ScriptlinkrxDashboard/3208bf4564f5f1a2415d12b2e8ebf09c778bfcf1.png";
import img435 from "@/imports/ScriptlinkrxDashboard/928e96867c205b0e19e479ab55e64e7d8c644861.png";
import img436 from "@/imports/ScriptlinkrxDashboard/5f05b98bbd5f4366dde6987174a5ce7f9da06055.png";
import img437 from "@/imports/ScriptlinkrxDashboard/9acef17dd58ea5f905eacb97963e7153fb513dbc.png";
import img438 from "@/imports/ScriptlinkrxDashboard/105218643749a83b70d0b0c96a7e3dc7e0fc3f13.png";
import img439 from "@/imports/ScriptlinkrxDashboard/4594cb4d36df6eeef8a6896fc4f35a79e5091a7d.png";
import img440 from "@/imports/ScriptlinkrxDashboard/71b3a03610647f4c97f26448ddda3dbc36882006.png";
import imgPT141 from "@/imports/ScriptlinkrxProductPage/76629cbe854957543c2416420a71b8b9d0316bd3.png";
import imgAminoQuad from "@/assets/amino-quad.png";
import imgNadInjection from "@/assets/nad-injection.png";
import imgOrderAminoQuad from "@/assets/order-amino-quad.png";
import imgOrderOxytocin from "@/assets/order-oxytocin.png";
import imgOrderOxytocinAlt from "@/assets/order-oxytocin-alt.png";
import landingGlutathione from "@/assets/landing-glutathione.png";
import landingNadInjection from "@/assets/landing-nad-injection.png";
import landingTestosterone from "@/assets/landing-testosterone-cypionate.png";
import landingTriMix from "@/assets/landing-tri-mix.png";
import imgProduct452 from "@/imports/ScriptlinkrxProductPage/a7404d4186f9383142485474193c8c2ca1b2259c.png";
import scriptlinkrxLogo from "@/assets/scriptlinkrx-logo.svg";
import maxrxLogo from "@/assets/maxrx-logo.svg";
import scriptlinkrxLandingLogo from "@/assets/scriptlinkrx-landing-logo.png";
import supportShayne from "@/assets/support-shayne.png";
import supportZee from "@/assets/support-zee.png";
import userVerifiedIcon from "@/assets/user-verified.svg";
import blankVialReference from "@/assets/blank-vial-reference.png";
import chaseLogo from "@/assets/chase-logo.png";
import blankNasalSprayReference from "@/assets/blank-nasal-spray-reference.png";
import blankLyophilizedVialReference from "@/assets/blank-lyophilized-vial-reference.png";
import blankTopicalDropperReference from "@/assets/blank-topical-dropper-reference.png";
import blankPatchPackageReference from "@/assets/blank-patch-package-reference.png";
import blankCapsuleBottleReference from "@/assets/blank-capsule-bottle-reference.png";
import productSupplyNeedle from "@/assets/product-supply-needle.png";
import pharmacyFirstChoice from "@/assets/pharmacies/first-choice.png";
import pharmacyDca from "@/assets/pharmacies/dca.png";
import pharmacyLush from "@/assets/pharmacies/lush.png";
import pharmacyNationalHealthRx from "@/assets/pharmacies/national-health-rx.png";
import pharmacyOptimalBalance from "@/assets/pharmacies/optimal-balance.png";
import pharmacyPharmko from "@/assets/pharmacies/pharmko.png";
import pharmacyPrecision from "@/assets/pharmacies/precision.png";
import pharmacyRush from "@/assets/pharmacies/rush.png";
import pharmacySpringCreek from "@/assets/pharmacies/spring-creek.png";
import pharmacyStriker from "@/assets/pharmacies/striker.png";
import pharmacyThesis from "@/assets/pharmacies/thesis.png";
import pharmacyVios from "@/assets/pharmacies/vios.png";
import pharmacyWells from "@/assets/pharmacies/wells.png";
import { INJECTION_PRODUCT_SEEDS } from "./injection-products";
import { NASAL_SPRAY_PRODUCT_SEEDS } from "./nasal-spray-products";
import { LYOPHILIZED_PRODUCT_SEEDS } from "./lyophilized-products";
import { TOPICAL_PRODUCT_SEEDS } from "./topical-products";
import { PATCH_PRODUCT_SEEDS } from "./patch-products";
import { CAPSULE_PRODUCT_SEEDS } from "./capsule-products";

type Page =
  | "dashboard"
  | "products"
  | "catalog-503a"
  | "catalog-503b"
  | "favorites"
  | "product-detail"
  | "pharmacies"
  | "orders"
  | "order-detail"
  | "order-history"
  | "pending-approvals"
  | "support"
  | "users"
  | "settings"
  | "cart-single"
  | "cart-503b"
  | "cart-multi"
  | "checkout-prescription";

type AppTheme = "default" | "orange";

type CartMode = "single" | "multi";
type CheckoutSubmissionState = "idle" | "submitting" | "submitted";

const DEFAULT_PAGE: Page = "products";

function CheckoutSubmissionFooter({
  state,
  submitLabel,
  onSubmit,
  onEdit,
  onGoToOrders,
}: {
  state: CheckoutSubmissionState;
  submitLabel: string;
  onSubmit: () => void;
  onEdit?: () => void;
  onGoToOrders: () => void;
}) {
  if (state === "submitted") {
    return (
      <div className="w-full">
        <div className="relative mb-4 flex items-center gap-3.5 rounded-[14px] bg-[linear-gradient(135deg,#f1f1f1_0%,#fafafa_100%)] px-4 py-4 text-left">
          <div className="checkout-celebration" aria-hidden="true">
            <span>🎉</span><span>✨</span><span>🎊</span><span>⭐</span><span>🎉</span><span>✨</span><span>🎊</span>
            <span>🥳</span><span>✨</span><span>🎉</span><span>⭐</span><span>🎊</span><span>✨</span><span>🎉</span>
          </div>
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-[#242424] shadow-[0_1px_4px_rgba(0,0,0,0.08)]">
            <CheckCircle2 size={19} strokeWidth={1.9} />
          </span>
          <div className="min-w-0">
            <p className="text-[15px] font-semibold tracking-[-0.02em] text-[#171717]">Order submitted</p>
            <p className="mt-1 text-[11px] leading-[16px] text-[#6f7782]">We&apos;ll send status updates as your order moves forward.</p>
          </div>
        </div>
        <button onClick={onGoToOrders} className="flex h-[48px] w-full items-center justify-center rounded-full bg-[#111] text-[13px] font-semibold text-white transition-colors hover:bg-[#121212]">
          Go to orders
        </button>
        <button className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-full bg-[#f1f1f1] text-[12px] font-semibold text-black transition-colors hover:bg-[#e7e7e7]">
          <Download size={14} /> Download receipt
        </button>
      </div>
    );
  }

  if (state === "submitting") {
    return (
      <button disabled className="flex h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#111] text-[13px] font-semibold text-white opacity-90">
        <span className="size-4 rounded-full border-2 border-white/35 border-t-white animate-spin" />
        Submitting...
      </button>
    );
  }

  return (
    <div className={onEdit ? "flex w-full gap-2" : "w-full"}>
      {onEdit && (
        <button onClick={onEdit} className="flex h-10 flex-1 items-center justify-center gap-2 rounded-[8px] border border-[#183229] text-[13px] font-semibold text-[#183229]">
          <ChevronLeft size={15} /> Edit order
        </button>
      )}
      <button onClick={onSubmit} className={`${onEdit ? "h-10 flex-1 rounded-[8px]" : "h-[52px] w-full rounded-full"} flex items-center justify-center gap-2 bg-[#111] text-[13px] font-semibold text-white transition-colors ${submitLabel === "Review and submit" ? "hover:!bg-[#101010] hover:!text-white" : "hover:bg-[#183229]"}`}>
        {onEdit && <CheckCircle2 size={15} />}
        {submitLabel}
      </button>
    </div>
  );
}

type ProductFavoritesContextValue = {
  favoriteProductIds: Set<number>;
  setFavoriteProductIds: Dispatch<SetStateAction<Set<number>>>;
  favoriteProducts: CardDef[];
};

const ProductFavoritesContext = createContext<ProductFavoritesContextValue | null>(null);

function useProductFavorites() {
  const context = useContext(ProductFavoritesContext);
  if (!context) {
    return {
      favoriteProductIds: new Set<number>(),
      setFavoriteProductIds: (() => undefined) as Dispatch<SetStateAction<Set<number>>>,
      favoriteProducts: [],
    };
  }
  return context;
}

type CartScope = "standard" | "503B";
const cartScope = (item: { catalogType?: "503A" | "503B" }): CartScope => item.catalogType === "503B" ? "503B" : "standard";

type CartSummaryContextValue = {
  cartItemCount: number;
  cart503BItemCount: number;
  cartPreviewItems: CartPreviewItem[];
  addCartItems: (count?: number, product?: CartPreviewItem) => void;
  updateCartItemQty: (id: number, delta: number, scope?: CartScope, syncEntries?: boolean) => void;
  removeCartItem: (id: number, scope?: CartScope) => void;
  clearCartItems: (scope?: CartScope) => void;
};

type CartPreviewItem = {
  catalogType?: "503A" | "503B";
  id: number;
  name: string;
  price: string;
  img: string;
  qty?: number;
};

type PatientCartEntry = {
  id: number;
  patientId: number | null;
  catalogType?: "503A" | "503B";
  product: CardDef;
  qty: number;
  pharmacy: string;
  size: string;
  strength: string;
  injectionType: string;
  unitPrice: number;
};

const CartSummaryContext = createContext<CartSummaryContextValue | null>(null);

function useCartSummary() {
  const context = useContext(CartSummaryContext);
  if (!context) {
    return {
      cartItemCount: 0,
      cart503BItemCount: 0,
      cartPreviewItems: [],
      addCartItems: () => undefined,
      updateCartItemQty: () => undefined,
      removeCartItem: () => undefined,
      clearCartItems: () => undefined,
    };
  }
  return context;
}

type AppLoadingContextValue = {
  runWithAppLoader: (action: () => void, delayMs?: number) => void;
  showToast: (message: string, type?: "success" | "error") => void;
};

const AppLoadingContext = createContext<AppLoadingContextValue | null>(null);

function useAppLoading() {
  const context = useContext(AppLoadingContext);
  if (!context) {
    return {
      runWithAppLoader: (action: () => void) => action(),
      showToast: () => undefined,
    };
  }
  return context;
}

// ─── Design System Primitives ────────────────────────────────────────────────

function Badge({
  children,
  variant = "default",
}: {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "info" | "neutral";
}) {
  const styles = {
    default: "bg-[#f0f0f0] text-[#1a1a1a]",
    success: "bg-[#d4f4e3] text-[#0a5c35]",
    warning: "bg-[#fef3c7] text-[#92400e]",
    error: "bg-[#fee2e2] text-[#991b1b]",
    info: "bg-[#dbeafe] text-[#1e40af]",
    neutral: "bg-[#f3f4f6] text-[#6b7280]",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${styles[variant]}`}
    >
      {children}
    </span>
  );
}

function PageBackButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-r-[12px] bg-[#f0f1f2] text-[#183229] transition-colors hover:bg-[#e6e8e9]"
    >
      <ChevronLeft size={21} strokeWidth={2} />
    </button>
  );
}

function AppActionOverlay({ active }: { active: boolean }) {
  if (!active) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/65 backdrop-blur-[1px]" role="status" aria-live="polite" aria-label="Processing">
      <Loader2 size={42} className="animate-spin text-[#183229]" />
    </div>
  );
}

function AppToast({
  toast,
  onClose,
}: {
  toast: { type: "success" | "error"; message: string } | null;
  onClose: () => void;
}) {
  if (!toast) return null;

  const isSuccess = toast.type === "success";

  return (
    <div className="fixed bottom-6 left-1/2 z-[10000] w-[min(418px,calc(100vw-24px))] -translate-x-1/2" role="status" aria-live="polite">
      <div className="flex h-[45px] items-center gap-2 rounded-full bg-white px-4 shadow-[0_5px_0_rgba(20,20,20,0.10),0_9px_10px_rgba(20,20,20,0.24)]">
        <span className={`flex size-[14px] shrink-0 items-center justify-center rounded-full text-white ${isSuccess ? "bg-[#45AD68]" : "bg-[#EB4F47]"}`}>
          {isSuccess ? <Check size={8} strokeWidth={3} /> : <X size={8} strokeWidth={3} />}
        </span>
        <p className="min-w-0 flex-1 truncate text-[12px] font-medium text-[#171717]">{toast.message}</p>
        <button
          type="button"
          onClick={onClose}
          className="h-[33px] shrink-0 rounded-full bg-[#485DDD] px-[15px] text-[12px] font-medium text-white transition-colors hover:bg-[#3E52CF]"
        >
          Got it
        </button>
      </div>
    </div>
  );
}

function StatusDot({ status }: { status: string }) {
  const colors: Record<string, string> = {
    Pending: "bg-amber-400",
    Processing: "bg-blue-400",
    Shipped: "bg-purple-400",
    Delivered: "bg-emerald-400",
    Cancelled: "bg-red-400",
    Active: "bg-emerald-400",
    Inactive: "bg-gray-300",
    Open: "bg-blue-400",
    Resolved: "bg-emerald-400",
    Urgent: "bg-red-400",
  };
  return (
    <span className={`inline-block w-1.5 h-1.5 rounded-full ${colors[status] ?? "bg-gray-400"}`} />
  );
}

function StatCard({
  label,
  value,
  delta,
  positive,
  icon: Icon,
  color,
}: {
  label: string;
  value: string;
  delta?: string;
  positive?: boolean;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <div className="bg-card rounded-xl p-5 border border-[#eaeaea] flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <span className="text-[13px] text-[#9d9d9d] font-medium">{label}</span>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color}`}>
          <Icon size={15} className="text-white" />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <span className="text-[26px] font-semibold text-[#1a1a1a] leading-none">{value}</span>
        {delta && (
          <span
            className={`flex items-center gap-0.5 text-[12px] font-medium ${positive ? "text-emerald-600" : "text-red-500"}`}
          >
            {positive ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
            {delta}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────

type MenuItem = { icon: React.ElementType; label: string; page: Page };

const INITIAL_FAVORITES: MenuItem[] = [
];

const INITIAL_MAIN: MenuItem[] = [
  { icon: FlaskConical, label: "503A Catalog", page: "catalog-503a" },
  { icon: Package, label: "503B Catalog", page: "catalog-503b" },
  { icon: ClipboardList, label: "Orders", page: "orders" },
  { icon: History, label: "Order History", page: "order-history" },
  { icon: CheckCircle2, label: "Pending Approvals", page: "pending-approvals" },
  { icon: ShoppingCart, label: "Cart", page: "cart-multi" },
  { icon: ShoppingCart, label: "503B Cart", page: "cart-503b" },
  { icon: Users, label: "Patients", page: "users" },
  { icon: MessageSquare, label: "Support Tickets", page: "support" },
];

function NavItem({
  item,
  isPinned,
  isActive,
  hoveredItem,
  openMenu,
  onNavigate,
  onHover,
  onOpenMenu,
  onPin,
}: {
  item: MenuItem;
  isPinned: boolean;
  isActive: boolean;
  hoveredItem: string | null;
  openMenu: string | null;
  onNavigate: (p: Page) => void;
  onHover: (label: string | null) => void;
  onOpenMenu: (label: string | null) => void;
  onPin: (item: MenuItem, isPinned: boolean) => void;
}) {
  const { icon: Icon, label, page } = item;
  const isHovered = hoveredItem === label;
  const menuOpen = openMenu === label;
  const { cartItemCount, cart503BItemCount } = useCartSummary();
  const badgeCount = page === "orders" ? ORDERS.length : page === "cart-multi" ? cartItemCount : page === "cart-503b" ? cart503BItemCount : null;
  const catalogLabel = page === "catalog-503a" || page === "cart-multi" ? "503A" : page === "catalog-503b" || page === "cart-503b" ? "503B" : null;
  const displayLabel = page === "catalog-503a" || page === "catalog-503b" ? "Catalog" : page === "cart-multi" || page === "cart-503b" ? "Cart" : label;

  return (
    <div
      className="relative"
      onMouseEnter={() => onHover(label)}
      onMouseLeave={() => onHover(null)}
    >
      <div
        className={`group flex h-10 w-full cursor-pointer select-none items-center gap-2.5 rounded-[9px] px-2.5 text-[13px] font-normal text-[#242424] transition-colors ${
          isActive ? "bg-[#F2F3F4] text-[#171717]" : "hover:bg-[#F6F6F5]"
        }`}
        onClick={() => {
          if (label === "Hard Refresh") {
            window.location.reload();
            return;
          }
          onNavigate(page);
          onOpenMenu(null);
        }}
      >
        <Icon size={16} strokeWidth={1.65} className="flex-shrink-0 text-[#303332] transition-transform duration-200 ease-out group-hover:-translate-y-px group-hover:translate-x-0.5 group-hover:rotate-6" />
        <span className="flex flex-1 items-center gap-2">
          {displayLabel}
          {catalogLabel && <span className="rounded-full bg-[#eef3ff] px-2 py-1 text-[10px] font-semibold leading-none text-[#2563EB]">{catalogLabel}</span>}
        </span>
        {badgeCount !== null && badgeCount > 0 ? <span className="inline-flex h-5 min-w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#e9eaec] px-1.5 text-[10px] font-semibold tabular-nums text-[#35383a]">{badgeCount}</span> : <span className="size-6 flex-shrink-0" />}
      </div>
    </div>
  );
}

function Sidebar({
  active,
  onNavigate,
  cartPage,
  onLogout,
  appTheme,
  setAppTheme,
  extraVariants,
  setExtraVariants,
  oldCatalog,
  setOldCatalog,
  pharmacyCatalog,
  setPharmacyCatalog,
}: {
  active: Page;
  onNavigate: (p: Page) => void;
  cartPage: Page;
  onLogout: () => void;
  appTheme: AppTheme;
  setAppTheme: Dispatch<SetStateAction<AppTheme>>;
  extraVariants: boolean;
  setExtraVariants: Dispatch<SetStateAction<boolean>>;
  oldCatalog: boolean;
  setOldCatalog: Dispatch<SetStateAction<boolean>>;
  pharmacyCatalog: boolean;
  setPharmacyCatalog: Dispatch<SetStateAction<boolean>>;
}) {
  const [favorites, setFavorites] = useState<MenuItem[]>(INITIAL_FAVORITES);
  const [mainMenu, setMainMenu] = useState<MenuItem[]>(INITIAL_MAIN);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [canScrollMainMenu, setCanScrollMainMenu] = useState(false);
  const menuScrollRef = useRef<HTMLDivElement>(null);

  function handlePin(item: MenuItem, isPinned: boolean) {
    if (isPinned) {
      setFavorites((prev) => prev.filter((f) => f.label !== item.label));
      setMainMenu((prev) => [...prev, item]);
    } else {
      setMainMenu((prev) => prev.filter((m) => m.label !== item.label));
      setFavorites((prev) => [...prev, item]);
    }
    setOpenMenu(null);
  }

  const handleNavigate = (nextPage: Page) => {
    onNavigate(nextPage === "cart-multi" ? cartPage : nextPage);
  };

  const navItemProps = {
    hoveredItem, openMenu,
    onNavigate: handleNavigate, onHover: setHoveredItem, onOpenMenu: setOpenMenu,
    onPin: handlePin,
  };

  useEffect(() => {
    const menu = menuScrollRef.current;
    if (!menu) return;
    const updateScrollHint = () => {
      setCanScrollMainMenu(menu.scrollTop + menu.clientHeight < menu.scrollHeight - 2);
    };
    updateScrollHint();
    const resizeObserver = new ResizeObserver(updateScrollHint);
    resizeObserver.observe(menu);
    window.addEventListener("resize", updateScrollHint);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateScrollHint);
    };
  }, [mainMenu]);

  return (
    <aside className="sticky top-0 flex h-screen w-[248px] flex-shrink-0 flex-col bg-[#FCFBFA] px-3">
      {/* Logo */}
      <button
        type="button"
        onClick={() => onNavigate("products")}
        className="flex min-w-0 cursor-pointer items-center gap-2.5 py-4 text-left"
        aria-label="Go to catalog"
      >
        <img src={scriptlinkrxLogo} alt="ScriptLinkRx" className="h-[25px] w-8 object-contain" />
        <span className="min-w-0 flex-1 truncate font-['Poppins',sans-serif] text-[16px] font-semibold uppercase tracking-wide text-[#1a1a1a]">
          S<span className="lowercase">CRIPTLINKrx</span>
        </span>
        <span className="flex size-7 shrink-0 items-center justify-center rounded-[7px] text-[#666] hover:bg-[#F1F2F2]" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2.25" y="2.25" width="11.5" height="11.5" rx="3" stroke="currentColor" strokeWidth="1.2"/><path d="M9.25 2.75V13.25" stroke="currentColor" strokeWidth="1.2"/></svg></span>
      </button>

      {/* New Order */}
      <div className="pb-4">
        <button
          type="button"
          onClick={() => onNavigate("products")}
          className="flex h-11 w-full cursor-pointer items-center gap-2 rounded-[11px] border border-[#DFE1E3] bg-white px-3 text-left transition-colors hover:border-[#C7CECA] hover:bg-[#F8F9F8]"
        >
          <span className="flex size-5 shrink-0 items-center justify-center text-[#1f2220]">
            <Plus size={15} strokeWidth={1.9} />
          </span>
          <span className="min-w-0 flex-1 truncate text-[13px] font-medium text-[#1a1a1a]">New Order</span>
          <span className="flex shrink-0 items-center gap-0.5 text-[#9a9e9c]"><kbd className="flex size-5 items-center justify-center rounded-[4px] bg-[#F1F2F3] text-[10px]">⌘</kbd><kbd className="flex size-5 items-center justify-center rounded-[4px] bg-[#F1F2F3] text-[10px]">K</kbd></span>
        </button>
      </div>

      {/* Main Menu */}
      <div ref={menuScrollRef} onScroll={() => {
        const menu = menuScrollRef.current;
        if (menu) setCanScrollMainMenu(menu.scrollTop + menu.clientHeight < menu.scrollHeight - 2);
      }} className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain pb-2 [scrollbar-width:thin]">
        <p className="mb-1.5 px-2.5 text-[10px] font-medium uppercase tracking-[0.08em] text-[#A0A4A2]">Main Menu</p>
        <div className="flex flex-col gap-0.5">
          {mainMenu.map((item) => {
            const isActive = item.page === "cart-multi" ? active === cartPage : item.page === "orders" ? active === "orders" || active === "order-detail" : active === item.page && item.label !== "Hard Refresh";
            return <NavItem key={item.label} item={item} isPinned={false} isActive={isActive} {...navItemProps} />;
          })}
        </div>
      </div>

      {canScrollMainMenu && (
        <div className="flex h-6 shrink-0 items-center justify-center gap-1 border-t border-[#eceeec] text-[9px] font-medium text-[#8c948f]">
          <ChevronDown size={11} /> Scroll for more
        </div>
      )}

      <SidebarSupportVersion onNavigate={onNavigate} />
      <div className="shrink-0 pb-3 pt-4">
        <UserChip onNavigate={onNavigate} onLogout={onLogout} />
      </div>
    </aside>
  );
}

function SidebarSupportVersion({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const paymentNoticeActive = () => Number(window.sessionStorage.getItem("clinic-card-notice-until") ?? 0) > Date.now();
  const accounts = [
    { name: "Zee Pharmacy", location: "Bronx, NY" },
    { name: "Altin Clinic", location: "Queens County, NY" },
  ];
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(accounts[0]);
  const [clinicPaymentEnabled, setClinicPaymentEnabled] = useState(() => window.sessionStorage.getItem("clinic-card-saved") === "true");
  const [clinicPaymentNoticeVisible, setClinicPaymentNoticeVisible] = useState(true);
  const [clinicPaymentUpdated, setClinicPaymentUpdated] = useState(() => paymentNoticeActive());
  const supportContacts = [
    { name: "Shayne", role: "Head Operator", phone: "917-274-7648", avatar: supportShayne },
    { name: "Zee", role: "CEO", phone: "(646)-617-9881", avatar: supportZee },
  ];

  useEffect(() => {
    const updateClinicPayment = () => {
      setClinicPaymentEnabled(window.sessionStorage.getItem("clinic-card-saved") === "true");
      setClinicPaymentNoticeVisible(paymentNoticeActive());
      setClinicPaymentUpdated(paymentNoticeActive());
    };
    window.addEventListener("clinic-payment-updated", updateClinicPayment);
    return () => window.removeEventListener("clinic-payment-updated", updateClinicPayment);
  }, []);

  useEffect(() => {
    if (!clinicPaymentNoticeVisible || !clinicPaymentUpdated) return;
    const remainingMs = Number(window.sessionStorage.getItem("clinic-card-notice-until") ?? 0) - Date.now();
    const timeout = window.setTimeout(() => {
      window.sessionStorage.removeItem("clinic-card-notice-until");
      setClinicPaymentNoticeVisible(false);
      setClinicPaymentUpdated(false);
    }, Math.max(0, remainingMs));
    return () => window.clearTimeout(timeout);
  }, [clinicPaymentNoticeVisible, clinicPaymentUpdated]);

  return (
    <div className="shrink-0 border-y border-[#ECEEEA] py-4">
      <div className="mb-3 flex items-center gap-2 px-1 text-[#8c948f]">
        <p className="text-[11px] font-medium uppercase tracking-[0.08em]">Customer Support</p>
      </div>
      <div className="space-y-1">
        {supportContacts.map((contact) => (
          <div key={contact.name} className="grid grid-cols-[34px_minmax(0,1fr)] items-center gap-2 rounded-[9px] px-1.5 py-1.5 transition-colors hover:bg-[var(--app-menu-bg)]">
            <div className="size-8 overflow-hidden rounded-full bg-[#F1F2F2]">
              <img src={contact.avatar} alt="" className="size-full object-cover" />
            </div>
            <div className="min-w-0">
              <div className="flex min-w-0 items-center gap-2">
                <p className="shrink-0 text-[13px] font-medium leading-[16px] text-[#1f2220]">{contact.name}</p>
                <a href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`} className="truncate text-[11px] font-normal text-[#667085] transition-colors hover:text-[#2563EB]">{contact.phone}</a>
              </div>
              <p className="truncate text-[11px] font-normal leading-[14px] text-[#8c948f]">{contact.role}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="relative mt-3">
        <button type="button" onClick={() => setAccountMenuOpen(current => !current)} className="flex w-full cursor-pointer items-center gap-2 rounded-[10px] bg-[var(--app-menu-bg)] px-2.5 py-2 text-left transition-colors hover:bg-[#EEF0EF]" aria-expanded={accountMenuOpen}>
          <span className="min-w-0 flex-1">
            <span className="flex min-w-0 items-center gap-1.5">
              <span className="truncate text-[12px] font-medium leading-[15px] text-[#1f2220]">{selectedAccount.name}</span>
              <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-white text-[9px] font-semibold text-[#5f6662]">{accounts.length}</span>
            </span>
            <span className="block truncate text-[11px] font-normal leading-[14px] text-[#8c948f]">Switch account</span>
          </span>
          <ChevronsUpDown size={15} className="shrink-0 text-[#8c948f]" />
        </button>
        {accountMenuOpen && (
          <div className="absolute bottom-[calc(100%+8px)] left-0 z-50 w-full rounded-[12px] border border-[#E0E4EA] bg-white p-2 shadow-[0_16px_40px_rgba(16,24,40,0.14)]">
            <p className="px-2.5 pb-2 pt-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#8A94A6]">Accounts</p>
            <div className="space-y-1">
              {accounts.map(account => {
                const selected = selectedAccount.name === account.name;
                return (
                  <button
                    key={account.name}
                    type="button"
                    onClick={() => { setSelectedAccount(account); setAccountMenuOpen(false); }}
                    className={`flex w-full items-center gap-3 rounded-[9px] px-3 py-2.5 text-left transition-colors ${selected ? "bg-[#F7F8FA]" : "hover:bg-[#F7F8FA]"}`}
                  >
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[12px] font-semibold text-[#222]">{account.name}</span>
                      <span className="mt-0.5 block truncate text-[10px] text-[#7C8491]">{account.location}</span>
                    </span>
                    {selected && <CheckCircle2 size={18} strokeWidth={2.2} className="shrink-0 fill-[#2563EB] text-white" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
      {clinicPaymentNoticeVisible && (
        <div className={`mt-2 rounded-[18px] border border-white/70 p-3 shadow-[0_10px_28px_rgba(38,54,45,0.08)] ${clinicPaymentUpdated ? "bg-[radial-gradient(circle_at_90%_0%,rgba(191,219,254,0.98),transparent_52%),linear-gradient(145deg,#eff6ff_0%,#dbeafe_100%)]" : "bg-[radial-gradient(circle_at_90%_0%,rgba(223,244,238,0.95),transparent_48%),linear-gradient(145deg,#fbfff3_0%,#f8f3e9_100%)]"}`}>
            <h3 className="text-[15px] font-semibold leading-[19px] tracking-[-0.01em] text-[#171A18]">{clinicPaymentUpdated ? "Card updated" : "Update payment card"}</h3>
            <p className="mt-1.5 text-[11px] leading-[16px] text-[#737A75]">{clinicPaymentUpdated ? "Your new payment card is ready to use." : "Please review your saved card before placing your next order."}</p>
            <button
              type="button"
              onClick={() => {
                const eventName = clinicPaymentEnabled ? "open-payment-overview" : "open-payment-setup";
                window.sessionStorage.setItem(eventName, "true");
                window.dispatchEvent(new Event(eventName));
                onNavigate("settings");
              }}
              className="group mt-3 flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-3 py-2.5 text-[11px] font-semibold text-[#171A18] shadow-[0_3px_12px_rgba(34,46,39,0.06)] transition-transform hover:-translate-y-0.5"
            >
              {clinicPaymentUpdated ? "Manage payment" : "Update card"}
              <ArrowUpRight size={13} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
      )}
    </div>
  );
}

// ─── Header ──────────────────────────────────────────────────────────────────

function UserChip({
  onNavigate,
  onLogout,
}: {
  onNavigate: (p: Page) => void;
  onLogout: () => void;
}) {
  const [menuHovered, setMenuHovered] = useState(false);
  const [menuPinned, setMenuPinned] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);
  const hoverCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuOpen = menuHovered || menuPinned;

  const keepMenuOpen = () => {
    if (hoverCloseTimerRef.current) clearTimeout(hoverCloseTimerRef.current);
    hoverCloseTimerRef.current = null;
    setMenuHovered(true);
  };

  const scheduleMenuClose = () => {
    if (hoverCloseTimerRef.current) clearTimeout(hoverCloseTimerRef.current);
    hoverCloseTimerRef.current = setTimeout(() => setMenuHovered(false), 220);
  };

  useEffect(() => () => {
    if (hoverCloseTimerRef.current) clearTimeout(hoverCloseTimerRef.current);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!accountMenuRef.current?.contains(event.target as Node)) {
        setMenuPinned(false);
        setMenuHovered(false);
      }
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, [menuOpen]);

  return (
    <div
      ref={accountMenuRef}
      className="relative"
      onMouseEnter={keepMenuOpen}
      onMouseLeave={scheduleMenuClose}
    >
      {menuOpen && (
        <div className="account-menu absolute bottom-[calc(100%+8px)] left-0 z-40 w-[224px] rounded-[14px] border border-[#dedede] bg-white p-2 shadow-[0_10px_28px_rgba(16,24,40,0.12)] after:absolute after:-bottom-2 after:left-0 after:h-2 after:w-full after:content-['']">
          <button onClick={() => { onNavigate("settings"); setMenuPinned(false); setMenuHovered(false); }} className="group flex h-10 w-full items-center gap-3 rounded-[9px] px-3 text-left text-[12px] font-normal text-black transition-colors hover:bg-[#f1f1f1]"><Settings size={16} strokeWidth={1.6} className="text-black transition-transform duration-200 ease-out group-hover:-translate-y-px group-hover:translate-x-0.5 group-hover:rotate-6" /> Settings</button>
          <button onClick={() => window.location.reload()} className="group flex h-10 w-full items-center gap-3 rounded-[9px] px-3 text-left text-[12px] font-normal text-black transition-colors hover:bg-[#f1f1f1]"><RefreshCw size={16} strokeWidth={1.6} className="text-black transition-transform duration-200 ease-out group-hover:-translate-y-px group-hover:translate-x-0.5 group-hover:rotate-6" /> Hard Refresh</button>
          <button onClick={onLogout} className="group flex h-10 w-full items-center gap-3 rounded-[9px] px-3 text-left text-[12px] font-normal text-black transition-colors hover:bg-[#f1f1f1]"><LogOut size={16} strokeWidth={1.6} className="text-black transition-transform duration-200 ease-out group-hover:-translate-y-px group-hover:translate-x-0.5 group-hover:rotate-6" /> Log out</button>
        </div>
      )}
      <div className="flex h-[50px] items-center gap-2">
        <button onClick={() => setMenuPinned(current => !current)} className={`flex h-full min-w-0 flex-1 items-center gap-2 rounded-[10px] px-2 text-left transition-colors ${menuOpen ? "bg-[#f1f1f1]" : "hover:bg-[#f1f1f1]"}`} aria-expanded={menuOpen} aria-label="Open account menu">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#eeeeee] text-[12px] font-semibold text-black" aria-hidden="true">Z</span>
          <span className="min-w-0 flex-1">
            <span className="flex min-w-0 items-center gap-1.5">
              <span className="truncate text-[12px] font-normal text-[#181a19]">Hi, Zee Rabushaj, NP</span>
            </span>
            <span className="mt-1 flex items-center gap-1.5">
              <img src={userVerifiedIcon} alt="Verified" className="size-[14px] shrink-0" />
              <span className="shrink-0 rounded-[7px] bg-[var(--app-menu-bg)] px-2 py-0.5 text-[10px] font-normal text-[#5f6662]">User Verified</span>
            </span>
          </span>
          <span className="flex shrink-0 flex-col items-center gap-[3px] px-1" aria-hidden="true">
            <span className="size-[3px] rounded-full bg-black" />
            <span className="size-[3px] rounded-full bg-black" />
          </span>
        </button>
      </div>
    </div>
  );
}

function Header({
  title,
  breadcrumb,
  onNavigate,
  favoriteProducts = [],
  cartPage = "cart-single",
  onProductSelect,
}: {
  title: string;
  breadcrumb?: string[];
  onNavigate: (p: Page) => void;
  favoriteProducts?: CardDef[];
  cartPage?: Page;
  onProductSelect?: (product: CardDef) => void;
}) {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className="text-[28px] font-semibold text-[#1a1a1a] leading-tight">{title}</h1>
        {breadcrumb && (
          <p className="text-[11px] text-[#4b4b4b] mt-1">
            {breadcrumb.slice(0, -1).map((b) => (
              <span key={b}>
                <button
                  className="hover:underline text-[12px]"
                  onClick={() => onNavigate("products")}
                >
                  {b}
                </button>
                {", "}
              </span>
            ))}
            <span className="text-[#1a1a1a] font-medium">{breadcrumb[breadcrumb.length - 1]}</span>
          </p>
        )}
      </div>
    </div>
  );
}

function VoucherBanner() {
  const [dismissed, setDismissed] = useState(false);
  const [copied, setCopied] = useState(false);
  if (dismissed) return null;

  function copyVoucher() {
    void navigator.clipboard?.writeText("WELCOME25");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <div className="sticky top-0 z-40 mb-2 rounded-[18px] border border-white/80 bg-[linear-gradient(180deg,rgba(248,249,252,0.92),rgba(239,241,245,0.78))] p-2 pb-1.5 shadow-[0_12px_34px_rgba(25,35,55,0.08)] backdrop-blur-xl">
      <div className="flex items-center gap-3 rounded-[13px] border border-white bg-white/95 px-3 py-2.5 shadow-[0_7px_20px_rgba(30,41,59,0.09)]">
        <span className="flex size-9 shrink-0 items-center justify-center text-[20px] leading-none">
          🎁
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[12px] font-semibold text-[#171A1F]">Your $25 coupon is ready <span className="font-normal text-[#7B808A]">· Use code WELCOME25 on your next order.</span></p>
        </div>
        <span className="hidden whitespace-nowrap text-[9px] text-[#9297A1] lg:inline-flex">Valid until September 5, 2026 · <strong className="ml-1 font-semibold text-[#2563EB]">Available at checkout</strong></span>
        <button onClick={copyVoucher} className="hidden h-8 min-w-[126px] items-center justify-between gap-3 rounded-[8px] bg-[#F6F4F8] px-3 text-[10px] font-medium text-[#4F5968] transition-colors hover:bg-[#F0EDF3] sm:inline-flex">
          <span>{copied ? "Copied" : "WELCOME25"}</span>{copied ? <CheckCircle2 size={12} className="text-[#2563EB]" /> : <Copy size={12} strokeWidth={1.8} className="text-[#8A96A8]" />}
        </button>
        <button onClick={() => setDismissed(true)} className="flex size-8 shrink-0 items-center justify-center text-[#717680] transition-colors hover:text-[#222]" aria-label="Dismiss voucher"><X size={14} /></button>
      </div>
    </div>
  );
}

// ─── Products (Catalog) ───────────────────────────────────────────────────────

// Lightweight product list for dashboard "Top Products" strip
const ALL_PRODUCTS = [
  { id: 1, name: "NAD+ Injection", price: "$55.88", img: img430 },
  { id: 2, name: "Nandrolone Decanoate", price: "$35.88", img: img429 },
  { id: 3, name: "B-Complex", price: "$45.99", img: img431 },
  { id: 4, name: "MIC/B12", price: "$215.98", img: img432 },
  { id: 5, name: "Esteadol", price: "$65.99", img: img433 },
  { id: 6, name: "Atropine Sulfate", price: "$15.98", img: img434 },
];

// SVG path data (sourced from Figma export)
const HEART_OUTLINE = "M9.60356 0C8.3794 0 7.3076 0.526417 6.6395 1.41623C5.9714 0.526417 4.89959 0 3.67544 0C2.70099 0.00109833 1.76676 0.388683 1.07772 1.07772C0.388683 1.76676 0.00109833 2.70099 0 3.67544C0 7.82512 6.1528 11.184 6.41482 11.3227C6.48388 11.3599 6.56108 11.3793 6.6395 11.3793C6.71792 11.3793 6.79511 11.3599 6.86417 11.3227C7.12619 11.184 13.279 7.82512 13.279 3.67544C13.2779 2.70099 12.8903 1.76676 12.2013 1.07772C11.5122 0.388683 10.578 0.00109833 9.60356 0ZM6.6395 10.3624C5.55702 9.73161 0.948499 6.85824 0.948499 3.67544C0.949441 2.9525 1.23704 2.25944 1.74824 1.74824C2.25944 1.23704 2.9525 0.949441 3.67544 0.948499C4.82846 0.948499 5.79652 1.56265 6.20082 2.54909C6.23655 2.63607 6.29733 2.71047 6.37544 2.76283C6.45355 2.81519 6.54546 2.84314 6.6395 2.84314C6.73353 2.84314 6.82544 2.81519 6.90355 2.76283C6.98166 2.71047 7.04245 2.63607 7.07818 2.54909C7.48247 1.56087 8.45054 0.948499 9.60356 0.948499C10.3265 0.949441 11.0196 1.23704 11.5308 1.74824C12.0419 2.25944 12.3296 2.9525 12.3305 3.67544C12.3305 6.8535 7.72079 9.73101 6.6395 10.3624Z";
const HEART_FILLED = "M15.4077 6.55061C15.4077 11.0445 8.7445 14.682 8.46075 14.8322C8.38596 14.8724 8.30236 14.8935 8.21743 14.8935C8.13251 14.8935 8.04891 14.8724 7.97412 14.8322C7.69037 14.682 1.02722 11.0445 1.02722 6.55061C1.02841 5.49534 1.44814 4.48362 2.19433 3.73743C2.94053 2.99124 3.95224 2.5715 5.00752 2.57031C6.33321 2.57031 7.49392 3.14039 8.21743 4.10401C8.94095 3.14039 10.1017 2.57031 11.4274 2.57031C12.4826 2.5715 13.4943 2.99124 14.2405 3.73743C14.9867 4.48362 15.4065 5.49534 15.4077 6.55061Z";
const RX_ICON = "M15.9802 8.84809C15.9898 8.88727 15.9916 8.92795 15.9855 8.96784C15.9794 9.00772 15.9656 9.046 15.9447 9.08052C15.9238 9.11503 15.8963 9.14509 15.8638 9.16897C15.8313 9.19286 15.7944 9.21011 15.7552 9.21973L14.8092 9.45009L15.0572 10.3757C15.0677 10.4147 15.0703 10.4554 15.0651 10.4954C15.0598 10.5354 15.0467 10.5739 15.0265 10.6089C15.0063 10.6438 14.9795 10.6744 14.9475 10.699C14.9154 10.7235 14.8789 10.7416 14.8399 10.752C14.8141 10.7594 14.7873 10.7636 14.7604 10.7643C14.6929 10.7642 14.6272 10.7419 14.5736 10.7007C14.52 10.6595 14.4815 10.6019 14.464 10.5366L14.1677 9.43089L12.6105 8.53212V10.33L13.442 11.1612C13.4706 11.1898 13.4932 11.2237 13.5087 11.2609C13.5241 11.2982 13.532 11.3382 13.532 11.3785C13.532 11.4189 13.5241 11.4589 13.5087 11.4961C13.4932 11.5334 13.4706 11.5673 13.442 11.5958C13.4135 11.6244 13.3796 11.647 13.3423 11.6625C13.3051 11.6779 13.2651 11.6859 13.2247 11.6859C13.1844 11.6859 13.1444 11.6779 13.1071 11.6625C13.0699 11.647 13.036 11.6244 13.0074 11.5958L12.3033 10.8913L11.5992 11.5958C11.5707 11.6244 11.5368 11.647 11.4995 11.6625C11.4622 11.6779 11.4223 11.6859 11.3819 11.6859C11.3415 11.6859 11.3016 11.6779 11.2643 11.6625C11.227 11.647 11.1931 11.6244 11.1646 11.5958C11.1361 11.5673 11.1134 11.5334 11.098 11.4961C11.0825 11.4589 11.0746 11.4189 11.0746 11.3785C11.0746 11.3382 11.0825 11.2982 11.098 11.2609C11.1134 11.2237 11.1361 11.1898 11.1646 11.1612L11.9962 10.33V8.53212L10.4394 9.43089L10.143 10.5366C10.1255 10.6019 10.0869 10.6596 10.0332 10.7008C9.97958 10.742 9.91383 10.7643 9.8462 10.7643C9.81925 10.7642 9.79241 10.7607 9.76634 10.7539C9.72736 10.7435 9.69082 10.7255 9.6588 10.7009C9.62678 10.6764 9.59991 10.6457 9.57973 10.6108C9.55955 10.5759 9.54646 10.5373 9.54119 10.4973C9.53592 10.4573 9.53859 10.4166 9.54904 10.3776L9.79705 9.45201L8.85106 9.22165C8.77195 9.2022 8.7038 9.15212 8.6616 9.08243C8.61941 9.01273 8.60663 8.92913 8.62608 8.85001C8.64553 8.77089 8.69561 8.70274 8.76531 8.66055C8.835 8.61836 8.91861 8.60558 8.99772 8.62503L10.1284 8.90261L11.689 8L10.1288 7.09931L8.99811 7.37689C8.97412 7.38283 8.94949 7.38579 8.92478 7.38572C8.84968 7.38577 8.77716 7.35831 8.72094 7.30852C8.66471 7.25873 8.62868 7.19006 8.61965 7.11551C8.61062 7.04095 8.62922 6.96567 8.67193 6.9039C8.71464 6.84213 8.77851 6.79815 8.85145 6.78027L9.79744 6.54991L9.54942 5.62235C9.52835 5.54364 9.5394 5.45978 9.58015 5.38922C9.6209 5.31866 9.68801 5.26718 9.76672 5.2461C9.84543 5.22503 9.92929 5.23608 9.99985 5.27683C10.0704 5.31758 10.1219 5.3847 10.143 5.46341L10.4394 6.56911L11.9962 7.46788V5.66996L11.1646 4.83876C11.107 4.78113 11.0746 4.70296 11.0746 4.62146C11.0746 4.5811 11.0825 4.54114 11.098 4.50385C11.1134 4.46657 11.1361 4.43269 11.1646 4.40416C11.1931 4.37562 11.227 4.35298 11.2643 4.33754C11.3016 4.32209 11.3415 4.31415 11.3819 4.31415C11.4634 4.31415 11.5416 4.34652 11.5992 4.40416L12.3033 5.10866L13.0074 4.40416C13.0651 4.34652 13.1432 4.31415 13.2247 4.31415C13.3062 4.31415 13.3844 4.34652 13.442 4.40416C13.4997 4.46179 13.532 4.53995 13.532 4.62146C13.532 4.70296 13.4997 4.78113 13.442 4.83876L12.6105 5.66996V7.46788L14.1673 6.56911L14.4637 5.46341C14.4847 5.3847 14.5362 5.31758 14.6068 5.27683C14.6773 5.23608 14.7612 5.22503 14.8399 5.2461C14.9186 5.26718 14.9857 5.31866 15.0265 5.38922C15.0672 5.45978 15.0783 5.54364 15.0572 5.62235L14.8092 6.54799L15.7552 6.77835C15.8302 6.79436 15.8964 6.83783 15.941 6.90023C15.9855 6.96262 16.0052 7.03942 15.996 7.11553C15.9868 7.19164 15.9495 7.26157 15.8913 7.31157C15.8332 7.36156 15.7585 7.38801 15.6819 7.38572C15.6571 7.38579 15.6325 7.38283 15.6085 7.37689L14.4779 7.09931L12.9176 8L14.4779 8.90069L15.6085 8.62311C15.6477 8.61347 15.6884 8.61165 15.7283 8.61774C15.7682 8.62383 15.8064 8.63772 15.841 8.65861C15.8755 8.67951 15.9055 8.70699 15.9294 8.7395C15.9533 8.77201 15.9705 8.80891 15.9802 8.84809Z";

// Exact Figma product card using stacking CSS grid (col-1 row-1 for all children)
const PHARMACY_LOGOS = [
  { name: "1st Choice Compounding Pharmacy", src: pharmacyFirstChoice },
  { name: "DCA Pharmacy", src: pharmacyDca },
  { name: "Lush Pharmacy", src: pharmacyLush },
  { name: "National Health RX", src: pharmacyNationalHealthRx },
  { name: "Optimal Balance Pharmacy", src: pharmacyOptimalBalance },
  { name: "Pharmko Pharmacy", src: pharmacyPharmko },
  { name: "Precision Fulfillment Pharmacy", src: pharmacyPrecision },
  { name: "Rush Pharmacy TX", src: pharmacyRush },
  { name: "Spring Creek Pharmacy", src: pharmacySpringCreek },
  { name: "Striker Pharmacy", src: pharmacyStriker },
  { name: "Thesis Pharmacy", src: pharmacyThesis },
  { name: "VIOS Pharmacy", src: pharmacyVios },
  { name: "Wells Pharmacy", src: pharmacyWells },
] as const;

type PharmacyLogo = (typeof PHARMACY_LOGOS)[number];

const US_LICENSE_STATES = [
  ["WA", "Washington", 1, 1], ["MT", "Montana", 3, 1], ["ND", "North Dakota", 5, 1], ["MN", "Minnesota", 6, 1], ["WI", "Wisconsin", 7, 1], ["MI", "Michigan", 8, 1], ["VT", "Vermont", 11, 1], ["ME", "Maine", 12, 1],
  ["OR", "Oregon", 1, 2], ["ID", "Idaho", 2, 2], ["WY", "Wyoming", 3, 2], ["SD", "South Dakota", 5, 2], ["IA", "Iowa", 6, 2], ["IL", "Illinois", 7, 2], ["IN", "Indiana", 8, 2], ["OH", "Ohio", 9, 2], ["PA", "Pennsylvania", 10, 2], ["NY", "New York", 11, 2], ["NH", "New Hampshire", 12, 2],
  ["CA", "California", 1, 3], ["NV", "Nevada", 2, 3], ["UT", "Utah", 3, 3], ["CO", "Colorado", 4, 3], ["NE", "Nebraska", 5, 3], ["MO", "Missouri", 6, 3], ["KY", "Kentucky", 8, 3], ["WV", "West Virginia", 9, 3], ["VA", "Virginia", 10, 3], ["MD", "Maryland", 11, 3], ["MA", "Massachusetts", 12, 3],
  ["AZ", "Arizona", 2, 4], ["NM", "New Mexico", 3, 4], ["KS", "Kansas", 5, 4], ["AR", "Arkansas", 6, 4], ["TN", "Tennessee", 8, 4], ["NC", "North Carolina", 10, 4], ["NJ", "New Jersey", 11, 4], ["CT", "Connecticut", 12, 4],
  ["OK", "Oklahoma", 5, 5], ["LA", "Louisiana", 6, 5], ["MS", "Mississippi", 7, 5], ["AL", "Alabama", 8, 5], ["GA", "Georgia", 9, 5], ["SC", "South Carolina", 10, 5], ["DE", "Delaware", 11, 5], ["RI", "Rhode Island", 12, 5],
  ["TX", "Texas", 4, 6], ["FL", "Florida", 10, 6], ["AK", "Alaska", 1, 7], ["HI", "Hawaii", 2, 7],
] as const;

function PharmacyComplianceModal({ pharmacy, onClose }: { pharmacy: PharmacyLogo; onClose: () => void }) {
  const [selectedState, setSelectedState] = useState("NE");
  const [licensePopoverPosition, setLicensePopoverPosition] = useState({ left: 72, top: 46 });
  const pharmacyGradient = "radial-gradient(circle at 8% 12%, rgba(255,255,255,.96), transparent 34%), linear-gradient(135deg, #f6f9fc 0%, #dce5ef 55%, #bdcadd 100%)";
  const selectedStateName = US_LICENSE_STATES.find(state => state[0] === selectedState)?.[1] ?? selectedState;
  const stateBoardLicenseUrl = ({
    NE: "https://www.nebraska.gov/LISSearch/search.cgi",
    UT: "https://secure.utah.gov/llv/search/index.html",
  } as Record<string, string>)[selectedState] ?? "https://www.naspa.us/member/boards-of-pharmacy/";
  const unavailableStates = new Set(["CA", "SC", "AK"]);
  const blueMapPalette = ["#B9C4D3", "#ACB8C9", "#9EABBE", "#8F9DB2", "#7F8EA5"];
  const mapCustomization = Object.fromEntries(
    US_LICENSE_STATES.map(([code], index) => [code, {
      fill: selectedState === code ? "#617593" : unavailableStates.has(code) ? "#E5E9EF" : blueMapPalette[index % blueMapPalette.length],
      clickHandler: () => setSelectedState(code),
    }]),
  );
  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const map = document.querySelector(".pharmacy-usa-map svg");
      if (!map) return;
      map.querySelectorAll(".state-initial").forEach(label => label.remove());
      map.querySelectorAll<SVGPathElement>("path.state").forEach(path => {
        const code = path.dataset.name;
        if (!code) return;
        const bounds = path.getBBox();
        const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
        label.classList.add("state-initial");
        label.setAttribute("x", String(bounds.x + bounds.width / 2));
        label.setAttribute("y", String(bounds.y + bounds.height / 2));
        label.setAttribute("text-anchor", "middle");
        label.setAttribute("dominant-baseline", "central");
        label.setAttribute("font-size", String(Math.max(6, Math.min(11, bounds.width / 3.5))));
        label.setAttribute("font-weight", "600");
        label.setAttribute("fill", selectedState === code ? "#ffffff" : "#3f4c60");
        label.setAttribute("pointer-events", "none");
        label.textContent = code;
        map.appendChild(label);
      });
      const selectedPath = map.querySelector<SVGPathElement>(`path.state[data-name="${selectedState}"]`);
      const viewBox = (map as SVGSVGElement).viewBox.baseVal;
      if (selectedPath && viewBox.width && viewBox.height) {
        const bounds = selectedPath.getBBox();
        const stateX = ((bounds.x + bounds.width / 2 - viewBox.x) / viewBox.width) * 100;
        const stateY = ((bounds.y + bounds.height / 2 - viewBox.y) / viewBox.height) * 100;
        setLicensePopoverPosition({
          left: Math.max(24, Math.min(76, stateX + (stateX > 58 ? -25 : 25))),
          top: Math.max(25, Math.min(72, stateY)),
        });
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, [selectedState]);
  return createPortal(
    <div className="fixed inset-0 z-[180] flex items-center justify-center bg-black/35 p-4 backdrop-blur-[2px]" role="dialog" aria-modal="true" aria-labelledby="pharmacy-compliance-title" onClick={event => event.stopPropagation()} onMouseDown={onClose}>
      <div className="max-h-[92vh] w-full max-w-[760px] overflow-y-auto rounded-[16px] bg-white shadow-[0_30px_90px_rgba(0,0,0,0.25)]" onClick={event => event.stopPropagation()} onMouseDown={event => event.stopPropagation()}>
        <div className="flex items-start justify-between gap-4 border-b border-[#ececec] px-6 py-5">
          <div>
            <h2 id="pharmacy-compliance-title" className="text-[22px] font-medium tracking-[-0.02em] text-[#171717]">Licensing &amp; compliance</h2>
          </div>
          <button type="button" onClick={onClose} className="flex size-8 items-center justify-center text-[#777] transition-colors hover:text-black" aria-label="Close"><X size={19} /></button>
        </div>

        <div className="p-6">
          <div className="relative overflow-hidden rounded-[14px] p-5 shadow-[0_14px_34px_rgba(50,75,120,0.13)]" style={{ backgroundImage: pharmacyGradient }}>
            <div className="relative z-10 flex flex-wrap items-center gap-4">
              <img src={pharmacy.src} alt="" className="size-14 rounded-full border-2 border-white object-cover shadow-[0_7px_18px_rgba(30,64,175,0.18)]" />
              <div className="min-w-0 flex-1">
                <h3 className="text-[16px] font-medium text-[#1b1b1b]">{pharmacy.name}</h3>
                <p className="mt-1 text-[11px] text-[#61708a]">Pharmacy · NPI 1235136987</p>
                <p className="mt-2 text-[12px] font-medium text-[#42506a]">233 Bedford Way, Franklin, TN, 37064</p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/72 px-3 py-1.5 text-[10px] font-medium text-[#2563eb] shadow-[0_4px_14px_rgba(37,99,235,0.10)] backdrop-blur-sm"><span className="size-1.5 rounded-full bg-[#2563eb]" />Active</span>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-end justify-between gap-4"><div><h3 className="text-[15px] font-medium text-[#202020]">Nationwide licensing</h3><p className="mt-1 text-[11px] text-[#777]">Select a state on the map to view license details.</p></div><div className="flex items-center gap-5 text-[12px] font-medium text-[#666]"><span className="flex items-center gap-2"><i className="size-3 rounded-full bg-[#8797ad]" />Licensed</span><span className="flex items-center gap-2"><i className="size-3 rounded-full bg-[#e5e9ef]" />Not licensed</span></div></div>
            <div className="mt-4 overflow-hidden rounded-[12px] border border-[#e6e8e7] bg-[#fafafa] px-5 py-4">
              <style>{`.pharmacy-usa-map svg{display:block;width:100%;height:auto}.pharmacy-usa-map .state{stroke:#fff;stroke-width:.65;vector-effect:non-scaling-stroke;transition:fill .18s ease,opacity .18s ease,filter .18s ease}.pharmacy-usa-map .state:hover{cursor:pointer;opacity:.82;filter:drop-shadow(0 2px 3px rgba(0,0,0,.16))}.pharmacy-usa-map .state-initial{font-family:Inter,sans-serif;letter-spacing:-.02em}@keyframes license-pop{0%{opacity:0;transform:translate(-50%,-45%) scale(.94)}100%{opacity:1;transform:translate(-50%,-50%) scale(1)}}`}</style>
              <div className="pharmacy-usa-map relative mx-auto max-w-[650px]" aria-label="United States pharmacy license coverage map">
                <USAMap
                  title="United States pharmacy license coverage"
                  width={650}
                  height={400}
                  defaultFill="#a6b3c5"
                  customize={mapCustomization}
                  onClick={(event: { target: { dataset?: { name?: string } } }) => {
                    const code = event.target.dataset?.name;
                    if (code) setSelectedState(code);
                  }}
                />
                <div
                  key={selectedState}
                  className="absolute z-20 w-[250px] rounded-[12px] border border-white/80 bg-white/95 p-3 shadow-[0_14px_36px_rgba(18,18,18,0.16)] backdrop-blur-md animate-[license-pop_.24s_ease-out]"
                  style={{ left: `${licensePopoverPosition.left}%`, top: `${licensePopoverPosition.top}%`, transform: "translate(-50%, -50%)" }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[8px] font-medium uppercase tracking-[0.08em] text-[#6f83a5]">Selected license</p>
                      <h3 className="mt-1 text-[14px] font-medium text-[#17233a]">{selectedStateName} <span className="text-[#71819b]">({selectedState})</span></h3>
                    </div>
                    <button type="button" className="h-8 shrink-0 rounded-full bg-[#121212] px-3 text-[10px] font-medium text-white shadow-[0_6px_18px_rgba(0,0,0,0.16)] transition-all hover:-translate-y-0.5 hover:bg-black">View PDF</button>
                  </div>
                  <p className="mt-1.5 text-[10px] text-[#65758f]">State board license · Active and verified</p>
                  <a href={stateBoardLicenseUrl} target="_blank" rel="noreferrer" className="mt-2 block truncate text-[9px] font-medium text-[#2563eb] underline decoration-[#94b3f5] underline-offset-2 hover:text-[#174bb8]">{stateBoardLicenseUrl}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function ReferenceProductCard({ card, onClick }: { card: CardDef; onClick: () => void }) {
  const [pharmaciesExpanded, setPharmaciesExpanded] = useState(false);
  const [compliancePharmacy, setCompliancePharmacy] = useState<PharmacyLogo | null>(null);
  const pharmacyCollapseTimer = useRef<ReturnType<typeof window.setTimeout> | null>(null);
  const primaryLogo = PHARMACY_LOGOS.find(pharmacy => pharmacy.name === card.pharmacy);
  const orderedLogos = primaryLogo ? [primaryLogo, ...PHARMACY_LOGOS.filter(pharmacy => pharmacy.name !== primaryLogo.name)] : [...PHARMACY_LOGOS];
  const visibleLogos = orderedLogos.slice(0, Math.min(card.pharmacies, 5));
  const displaySize = card.dosage === "Capsule" ? "30 Capsules"
    : card.dosage === "Nasal Spray" ? "1 (10mL) Bottle"
    : card.dosage === "Topical" ? "1 (30mL) Bottle"
    : card.dosage === "Patch" ? "30 Patches"
    : card.dosage === "Lyophilized" ? "1 Vial"
    : "1 (5mL) Vial";
  const schedulePharmacyCollapse = () => {
    if (pharmacyCollapseTimer.current) window.clearTimeout(pharmacyCollapseTimer.current);
    pharmacyCollapseTimer.current = window.setTimeout(() => {
      setPharmaciesExpanded(false);
      pharmacyCollapseTimer.current = null;
    }, 5000);
  };
  const expandPharmacies = () => {
    setPharmaciesExpanded(true);
    schedulePharmacyCollapse();
  };
  useEffect(() => () => {
    if (pharmacyCollapseTimer.current) window.clearTimeout(pharmacyCollapseTimer.current);
  }, []);
  return (
    <article onClick={onClick} className="group relative h-[393px] w-[268px] shrink-0 cursor-pointer overflow-hidden rounded-[4px] bg-gradient-to-b from-[rgba(247,239,233,0.1)] to-[rgba(236,229,182,0.1)] transition-transform duration-200 hover:-translate-y-0.5">
      <div className="absolute left-[18px] top-[18px] z-10 flex flex-col items-start gap-2">
        {(card.dosage === "Injection" || card.dosage === "Lyophilized") && (
          <span className="flex size-8 items-center justify-center rounded-full bg-[#EEF4FF] text-[#2563EB] shadow-[0_4px_14px_rgba(37,99,235,0.10)]" title="Refrigerated" aria-label="Refrigerated">
            <Snowflake size={15} strokeWidth={2} />
          </span>
        )}
      </div>
      <div className="flex h-[285px] items-center justify-center px-7 pt-5">
        {card.img === blankVialReference || card.img === blankLyophilizedVialReference ? (
          <div className="h-[245px] w-[184px] transition-transform duration-300 group-hover:scale-[1.02]"><ManualVialPreview name={card.name} strength={card.strength ?? "2.5 mg/mL"} size="Multi-Dose Vial" palette={card.vialPalette} baseImage={card.img} compact flatLabel /></div>
        ) : card.img === blankNasalSprayReference ? (
          <div className="h-[245px] w-[190px] transition-transform duration-300 group-hover:scale-[1.02]"><ManualNasalSprayPreview name={card.name} strength={card.strength ?? "100mg/mL"} palette={card.vialPalette} compact flatLabel /></div>
        ) : card.img === blankTopicalDropperReference ? (
          <div className="h-[235px] w-[180px] transition-transform duration-300 group-hover:scale-[1.02]"><ManualNasalSprayPreview name={card.name} strength={card.strength ?? "2%"} palette={card.vialPalette} baseImage={card.img} variant="topical" compact flatLabel /></div>
        ) : card.img === blankPatchPackageReference ? (
          <div className="size-[220px] transition-transform duration-300 group-hover:scale-[1.02]"><ManualPatchPreview name={card.name} strength={card.strength ?? "0.1mg/day"} compact /></div>
        ) : card.img === blankCapsuleBottleReference ? (
          <div className="h-[250px] w-[195px] transition-transform duration-300 group-hover:scale-[1.02]"><ManualCapsulePreview name={card.name} strength={card.strength ?? "200mg/mL"} palette={card.vialPalette} compact flatLabel /></div>
        ) : (
          <img src={card.img} alt={card.name} className="max-h-[245px] max-w-[195px] object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-[1.02]" />
        )}
      </div>
      <div className="absolute inset-x-0 bottom-0 px-[18px] pb-[18px]">
        <div
          role="button"
          tabIndex={0}
          aria-expanded={pharmaciesExpanded}
          aria-label={`${pharmaciesExpanded ? "Collapse" : "Show"} ${card.pharmacies} pharmacies`}
          onClick={(event) => {
            event.stopPropagation();
            if (pharmaciesExpanded) {
              setPharmaciesExpanded(false);
              if (pharmacyCollapseTimer.current) window.clearTimeout(pharmacyCollapseTimer.current);
            } else {
              expandPharmacies();
            }
          }}
          onKeyDown={event => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              if (pharmaciesExpanded) setPharmaciesExpanded(false);
              else expandPharmacies();
            }
          }}
          className={`mb-2 flex h-8 w-fit items-center rounded-full border border-white/80 bg-white/80 px-1.5 shadow-[0_5px_16px_rgba(0,0,0,0.08)] backdrop-blur-sm transition-all duration-300 hover:bg-white ${pharmaciesExpanded ? "gap-1.5" : "gap-0"}`}
        >
          {visibleLogos.map((pharmacy, index) => (
            <button
              type="button"
              key={pharmacy.name}
              onClick={event => {
                event.stopPropagation();
                if (!pharmaciesExpanded) {
                  expandPharmacies();
                  return;
                }
                schedulePharmacyCollapse();
                setCompliancePharmacy(pharmacy);
              }}
              aria-label={`View compliance for ${pharmacy.name}`}
              className={`relative flex size-6 items-center justify-center rounded-full border-2 border-white bg-white shadow-[0_1px_4px_rgba(0,0,0,0.14)] transition-all duration-300 ${!pharmaciesExpanded && index > 0 ? "-ml-2" : "ml-0"}`}
              style={{ transitionDelay: `${index * 28}ms` }}
            >
              <img src={pharmacy.src} alt={pharmacy.name} className="size-full rounded-full object-cover" />
            </button>
          ))}
        </div>
        <h3 className="break-words text-[14px] font-semibold leading-[18px] text-[#111]">{card.name}</h3>
        <p className="mt-0.5 text-[12px] leading-[16px] text-[#666]">{card.price}</p>
        <p className="flex items-center gap-1.5 text-[11px] leading-[15px] text-[#888]">
          <span>{displaySize}</span>
          <span aria-hidden="true" className="text-[#bbb]">·</span>
          <span>{card.dosage}</span>
        </p>
      </div>
      {compliancePharmacy && <PharmacyComplianceModal pharmacy={compliancePharmacy} onClose={() => setCompliancePharmacy(null)} />}
    </article>
  );
}

function FigmaCard({
  name,
  strength,
  vialPalette,
  price,
  pharmacies,
  img,
  imgW,
  imgH,
  imgL,
  imgT,
  imgContain,
  favorited,
  onFavorite,
  favoriteLoading = false,
  hasRxBadge,
  btnOffsetX,
  heartVariant,
  onClick,
}: {
  name: string;
  strength?: string;
  vialPalette?: VialPalette;
  price: string;
  pharmacies: number;
  img: string;
  imgW: number;
  imgH: number;
  imgL: number;
  imgT: number;
  imgContain?: boolean;
  favorited: boolean;
  onFavorite: () => void;
  favoriteLoading?: boolean;
  hasRxBadge?: boolean;
  btnOffsetX: number;
  heartVariant: "green" | "black" | "none";
  onClick: () => void;
}) {
  const [pharmacyMenuOpen, setPharmacyMenuOpen] = useState(false);
  const cardPharmacies = ["Altin Compounding Pharmacy", "Emerald Pharmacy SandBox", "Partel Sandbox"];
  const usesManualVial = img === blankVialReference || img === blankLyophilizedVialReference;
  const usesManualPatch = img === blankPatchPackageReference;
  const usesManualCapsule = img === blankCapsuleBottleReference;
  const cardScale = 1.3;
  const productImageStyle = usesManualVial
    ? { marginLeft: 16.5 * cardScale, marginTop: 2 * cardScale, width: 172 * cardScale, height: 215 * cardScale }
    : usesManualPatch
    ? { marginLeft: 27, marginTop: 18, width: 214, height: 214 }
    : usesManualCapsule
    ? { marginLeft: 28, marginTop: 0, width: 212, height: 264 }
    : { marginLeft: imgL * cardScale, marginTop: imgT * cardScale, width: imgW * cardScale, height: imgH * cardScale };

  return (
    <div
      className="relative inline-grid shrink-0 cursor-pointer grid-cols-[max-content] grid-rows-[max-content] place-items-start"
      onClick={onClick}
    >
      <div className="col-1 row-1 h-[393px] w-[268px] rounded-[16px] bg-gradient-to-b from-[rgba(247,239,233,0.1)] to-[rgba(236,229,182,0.1)]" />

      <div className="pointer-events-none col-1 row-1" style={productImageStyle}>
        {usesManualVial ? (
          <ManualVialPreview name={name} strength={strength ?? "20mg/25mg/mL"} size="1 (5mL) Vial" palette={vialPalette} baseImage={img} compact />
        ) : img === blankNasalSprayReference ? (
          <ManualNasalSprayPreview name={name} strength={strength ?? "100mg/mL"} palette={vialPalette} compact />
        ) : img === blankTopicalDropperReference ? (
          <ManualNasalSprayPreview name={name} strength={strength ?? "2%"} palette={vialPalette} baseImage={img} variant="topical" compact />
        ) : img === blankPatchPackageReference ? (
          <ManualPatchPreview name={name} strength={strength ?? "0.1mg/day"} compact />
        ) : img === blankCapsuleBottleReference ? (
          <ManualCapsulePreview name={name} strength={strength ?? "200mg/mL"} palette={vialPalette} compact />
        ) : (
          <img
            alt={name}
            className={`size-full max-w-none ${imgContain ? "object-contain" : "object-cover"}`}
            src={img}
          />
        )}
      </div>

      <div className="col-1 row-1 z-10 flex items-center gap-[5px]" style={{ marginLeft: 15.6, marginTop: 19.5 }}>
        <span className="flex h-[26px] min-w-[36px] items-center justify-center rounded-[8px] bg-[#EAF2FF] px-2 text-[#2563EB]" title="Refrigerated"><Snowflake size={14} strokeWidth={2} /></span>
        {hasRxBadge && <span className="flex size-[26px] items-center justify-center rounded-[8px] bg-[#FFF0F0] text-[13px] font-semibold text-[#D84B4B]" title="Controlled">C</span>}
      </div>

      <div className="col-1 row-1" style={{ marginLeft: 26.8, marginTop: 285.3, width: 223.6 }}>
        <h3 className="truncate text-[18px] font-light leading-[23px] tracking-[-0.36px] text-[#1a1a1a]">{name}</h3>
        <p className="mt-1 text-[15.5px] font-normal leading-[21px] text-[#1a1a1a]">{price}</p>
        <div className="mt-2 flex items-center gap-[6px]">
          <button
            type="button"
            className="relative inline-flex h-[26px] items-center rounded-[4px] bg-[#f8f5f1] px-2.5 text-[13px] font-normal text-[#333]"
            onClick={(event) => { event.stopPropagation(); setPharmacyMenuOpen(current => !current); }}
            aria-expanded={pharmacyMenuOpen}
          >
            {pharmacies > 2 ? `+${pharmacies - 2} Pharmacies` : `${pharmacies} Pharmacies`}
            {pharmacyMenuOpen && (
              <span
                className="absolute bottom-[26px] left-0 z-30 w-[155px] overflow-hidden rounded-[8px] border border-[#e5e5e5] bg-white text-left shadow-[0_7px_18px_rgba(0,0,0,0.10)]"
                onClick={(event) => event.stopPropagation()}
              >
                <span className="block space-y-1 px-3 py-2.5">
                  {cardPharmacies.map((pharmacyName, index) => (
                    <span key={pharmacyName} className="flex items-start gap-2 rounded-[5px] py-1.5">
                      <span className={`mt-0.5 flex size-3.5 shrink-0 items-center justify-center rounded-[3px] text-[5px] font-semibold ${index === 1 ? "bg-[#e8f1d8] text-[#69833b]" : "bg-white text-[#7357ff]"}`}>
                        {index === 1 ? "E" : "Optimal"}
                      </span>
                      <span className="text-[9px] font-medium leading-[13px] text-[#222]">{pharmacyName}</span>
                    </span>
                  ))}
                </span>
                <span className="block border-t border-[#eeeeee] px-3 py-2 text-[9px] font-medium text-[#222] underline underline-offset-2">3 Pharmacies</span>
              </span>
            )}
          </button>
        </div>
      </div>

      {heartVariant !== "none" && (
        <button
          className="col-1 row-1 z-10 flex size-9 items-center justify-center rounded-full bg-white shadow-[0_3px_8px_rgba(0,0,0,0.04)]"
          style={{ marginLeft: btnOffsetX * cardScale, marginTop: 19.5 }}
          onClick={(e) => { e.stopPropagation(); onFavorite(); }}
          disabled={favoriteLoading}
          aria-busy={favoriteLoading}
          aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
        >
          {favoriteLoading ? (
            <Loader2 size={20} className="animate-spin text-[#183229]" />
          ) : favorited || heartVariant === "green" ? (
            <Heart size={21} strokeWidth={1.8} className="fill-[#2563EB] text-[#2563EB]" />
          ) : (
            <Heart size={20} strokeWidth={1.8} className="text-black" />
          )}
        </button>
      )}
    </div>
  );
}

function OldCatalogCard({
  name,
  strength,
  vialPalette,
  price,
  pharmacies,
  img,
  favorited,
  onFavorite,
  favoriteLoading = false,
  heartVariant,
  onClick,
}: {
  name: string;
  strength?: string;
  vialPalette?: VialPalette;
  price: string;
  pharmacies: number;
  img: string;
  favorited: boolean;
  onFavorite: () => void;
  favoriteLoading?: boolean;
  heartVariant: "green" | "black" | "none";
  onClick: () => void;
}) {
  return (
    <article
      onClick={onClick}
      className="relative h-[374px] w-[268px] shrink-0 cursor-pointer overflow-hidden rounded-[16px] bg-gradient-to-b from-[rgba(247,239,233,0.10)] to-[rgba(236,229,182,0.10)] transition-transform duration-200 hover:-translate-y-0.5"
    >
      <div className="flex h-[276px] items-center justify-center px-7 pt-5">
        {img === blankVialReference || img === blankLyophilizedVialReference ? (
          <div className="h-[245px] w-[196px]">
            <ManualVialPreview name={name} strength={strength ?? "20mg/25mg/mL"} size="1 (5mL) Vial" palette={vialPalette} baseImage={img} compact flatLabel />
          </div>
        ) : img === blankNasalSprayReference ? (
          <div className="h-[260px] w-[223px]">
            <ManualNasalSprayPreview name={name} strength={strength ?? "100mg/mL"} palette={vialPalette} compact flatLabel />
          </div>
        ) : img === blankTopicalDropperReference ? (
          <div className="h-[245px] w-[196px]">
            <ManualNasalSprayPreview name={name} strength={strength ?? "2%"} palette={vialPalette} baseImage={img} variant="topical" compact flatLabel />
          </div>
        ) : img === blankPatchPackageReference ? (
          <div className="size-[220px]">
            <ManualPatchPreview name={name} strength={strength ?? "0.1mg/day"} compact />
          </div>
        ) : img === blankCapsuleBottleReference ? (
          <div className="h-[255px] w-[205px]">
            <ManualCapsulePreview name={name} strength={strength ?? "200mg/mL"} palette={vialPalette} compact flatLabel />
          </div>
        ) : (
          <img src={img} alt={name} className="max-h-[245px] max-w-[205px] object-contain mix-blend-multiply" />
        )}
      </div>
      <div className="absolute inset-x-0 bottom-0 px-6 pb-6">
        <h3 className="truncate text-[16px] font-medium leading-5 text-[#1a1a1a]">{name}</h3>
        <p className="mt-1 text-[14px] text-[#1a1a1a]">{price}</p>
        <p className="mt-2 text-[12px] text-[#666] underline underline-offset-2">{pharmacies} Pharmacies</p>
      </div>
      {heartVariant !== "none" && (
        <button
          type="button"
          onClick={(event) => { event.stopPropagation(); onFavorite(); }}
          disabled={favoriteLoading}
          className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
          aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
        >
          {favoriteLoading ? <Loader2 size={17} className="animate-spin text-[#2563EB]" /> : <Heart size={18} className={favorited || heartVariant === "green" ? "fill-[#2563EB] text-[#2563EB]" : "text-black"} />}
        </button>
      )}
    </article>
  );
}

function PharmacyCatalogCard({
  name,
  strength,
  vialPalette,
  price,
  pharmacy,
  pharmacies,
  dosage,
  img,
  favorited,
  onFavorite,
  heartVariant,
  onClick,
}: {
  name: string;
  strength?: string;
  vialPalette?: VialPalette;
  price: string;
  pharmacy: string;
  pharmacies: number;
  dosage: string;
  img: string;
  favorited: boolean;
  onFavorite: () => void;
  heartVariant: "green" | "black" | "none";
  onClick: () => void;
}) {
  return (
    <article onClick={onClick} className="group relative flex h-[374px] w-[268px] shrink-0 cursor-pointer flex-col overflow-hidden rounded-[16px] border border-[#e7e9e7] bg-white transition-colors hover:border-[#cbd2ce]">
      <div className="relative flex h-[230px] items-center justify-center bg-[#f7f8f7] px-7 py-5">
        {img === blankVialReference || img === blankLyophilizedVialReference ? (
          <div className="h-[195px] w-[156px] transition-transform duration-300 group-hover:scale-[1.03]">
            <ManualVialPreview name={name} strength={strength ?? "20mg/25mg/mL"} size="1 (5mL) Vial" palette={vialPalette} baseImage={img} compact />
          </div>
        ) : img === blankNasalSprayReference ? (
          <div className="h-[205px] w-[176px] transition-transform duration-300 group-hover:scale-[1.03]">
            <ManualNasalSprayPreview name={name} strength={strength ?? "100mg/mL"} palette={vialPalette} compact />
          </div>
        ) : img === blankTopicalDropperReference ? (
          <div className="h-[195px] w-[156px] transition-transform duration-300 group-hover:scale-[1.03]">
            <ManualNasalSprayPreview name={name} strength={strength ?? "2%"} palette={vialPalette} baseImage={img} variant="topical" compact />
          </div>
        ) : img === blankPatchPackageReference ? (
          <div className="size-[185px] transition-transform duration-300 group-hover:scale-[1.03]">
            <ManualPatchPreview name={name} strength={strength ?? "0.1mg/day"} compact />
          </div>
        ) : img === blankCapsuleBottleReference ? (
          <div className="h-[205px] w-[165px] transition-transform duration-300 group-hover:scale-[1.03]">
            <ManualCapsulePreview name={name} strength={strength ?? "200mg/mL"} palette={vialPalette} compact />
          </div>
        ) : (
          <img src={img} alt={name} className="max-h-[195px] max-w-[175px] object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-[1.03]" />
        )}
        {heartVariant !== "none" && (
          <button type="button" onClick={(event) => { event.stopPropagation(); onFavorite(); }} className="absolute right-3.5 top-3.5 flex size-8 items-center justify-center rounded-full border border-[#e5e8e6] bg-white text-[#1c211e]" aria-label={favorited ? "Remove from favorites" : "Add to favorites"}>
            <Heart size={15} strokeWidth={1.8} className={favorited || heartVariant === "green" ? "fill-[#2563EB] text-[#2563EB]" : ""} />
          </button>
        )}
        <span className="absolute bottom-3 left-3.5 rounded-full bg-white px-2.5 py-1 text-[10px] font-medium text-[#5d6561]">{dosage}</span>
      </div>
      <div className="flex flex-1 flex-col px-5 pb-4 pt-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-2 text-[15px] font-semibold leading-[20px] tracking-[-0.01em] text-[#171a18]">{name}</h3>
          <span className="shrink-0 text-[14px] font-semibold text-[#171a18]">{price}</span>
        </div>
        <div className="mt-auto rounded-[9px] bg-[#f5f7f6] px-3 py-2.5">
          <div className="flex flex-wrap items-center justify-end gap-2">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-[6px] bg-white text-[#31583f]"><Building2 size={13} strokeWidth={1.7} /></span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[10px] font-semibold text-[#26302b]">{pharmacy}</p>
              <p className="mt-0.5 text-[9px] text-[#818985]">Available from {pharmacies} pharmacies</p>
            </div>
            <ChevronRight size={13} className="shrink-0 text-[#8a928e]" />
          </div>
        </div>
      </div>
    </article>
  );
}

type VialPalette = {
  start: string;
  middle: string;
  end: string;
  mark: string;
  foreground?: string;
};

// Product definitions matching the Figma dashboard export exactly
type CardDef = {
  id: number;
  name: string;
  price: string;
  pharmacies: number;
  pharmacy: string;
  shippingState: string;
  areaOfTreatment: string;
  dosage: string;
  img: string;
  imgW: number; imgH: number; imgL: number; imgT: number;
  imgContain?: boolean;
  hasRxBadge?: boolean;
  btnOffsetX: number;
  heartVariant: "green" | "black" | "none";
  strength?: string;
  vialPalette?: VialPalette;
};

function injectionArea(name: string) {
  const normalizedName = name.toLowerCase();
  if (["tirzepatide", "semaglutide", "retatrutide", "liraglutide", "aod-9604", "mots-c"].some(term => normalizedName.includes(term))) return "Weight Loss";
  if (["testosterone", "nandrolone", "tri-mix", "bimix", "quadmix", "alprostadil", "papaverine", "dutasteride", "pt-141", "bremelanotide", "pregnyl"].some(term => normalizedName.includes(term))) return "Men's Health";
  if (["bpc", "tb-500", "tb500", "ghk", "cjc", "ipamorelin", "sermorelin", "tesamorelin", "peptide", "epithalon", "foxo", "igf", "kisspeptin", "thymosin", "dsip", "ll-37", "ara 290", "ss31", "peg-mgf"].some(term => normalizedName.includes(term))) return "Peptide Therapy";
  if (["oxytocin", "biotin", "folic acid"].some(term => normalizedName.includes(term))) return "Women's Health";
  return "Wellness";
}

function gradientLabelPalette(catalogNumber: number, offset = 0): VialPalette {
  const hue = (218 + (catalogNumber + offset) * 47) % 360;
  const middleHue = (hue + 7) % 360;
  const endHue = (hue + 14) % 360;
  return {
    start: `hsl(${hue} 56% 25%)`,
    middle: `hsl(${middleHue} 58% 45%)`,
    end: `hsl(${endHue} 72% 68%)`,
    mark: `hsl(${endHue} 76% 73%)`,
    foreground: "#FFFFFF",
  };
}

function injectionPalette(catalogNumber: number): VialPalette {
  return gradientLabelPalette(catalogNumber);
}

function nasalSprayPalette(catalogNumber: number): VialPalette {
  return gradientLabelPalette(catalogNumber, 6);
}

function lyophilizedPalette(catalogNumber: number): VialPalette {
  return gradientLabelPalette(catalogNumber, 12);
}

function topicalPalette(catalogNumber: number): VialPalette {
  return gradientLabelPalette(catalogNumber, 18);
}

function capsulePalette(): VialPalette {
  return {
    start: "#581C3B",
    middle: "#7D2D59",
    end: "#B690C8",
    mark: "#B690C8",
    foreground: "#F2C15A",
  };
}

const INJECTION_CARDS: CardDef[] = INJECTION_PRODUCT_SEEDS.map((product, index) => ({
  id: 1000 + product.catalogNumber,
  name: product.name,
  strength: product.strength,
  price: "$35.88",
  pharmacies: 2 + (index % 4),
  pharmacy: ["1st Choice Compounding Pharmacy", "Optimal Balance Pharmacy", "DCA Pharmacy", "Thesis Pharmacy"][index % 4],
  shippingState: ["Florida", "New York", "Texas"][index % 3],
  areaOfTreatment: injectionArea(product.name),
  dosage: "Injection",
  img: blankVialReference,
  imgW: 145,
  imgH: 181,
  imgL: 30,
  imgT: 17,
  imgContain: true,
  btnOffsetX: 168,
  heartVariant: "black" as const,
  vialPalette: injectionPalette(product.catalogNumber),
}));

const NASAL_SPRAY_CARDS: CardDef[] = NASAL_SPRAY_PRODUCT_SEEDS.map((product, index) => ({
  id: 2000 + product.catalogNumber,
  name: product.name,
  strength: product.strength,
  price: "$35.88",
  pharmacies: 2 + (index % 4),
  pharmacy: ["1st Choice Compounding Pharmacy", "Optimal Balance Pharmacy", "DCA Pharmacy", "Thesis Pharmacy"][index % 4],
  shippingState: ["Florida", "New York", "Texas"][index % 3],
  areaOfTreatment: injectionArea(product.name),
  dosage: "Nasal Spray",
  img: blankNasalSprayReference,
  imgW: 210,
  imgH: 255,
  imgL: 29,
  imgT: 1,
  imgContain: true,
  btnOffsetX: 168,
  heartVariant: "black",
  vialPalette: nasalSprayPalette(product.catalogNumber),
}));

const LYOPHILIZED_CARDS: CardDef[] = LYOPHILIZED_PRODUCT_SEEDS.map((product, index) => ({
  id: 3000 + product.catalogNumber,
  name: product.name,
  strength: product.strength,
  price: "$35.88",
  pharmacies: 2 + (index % 4),
  pharmacy: ["1st Choice Compounding Pharmacy", "Optimal Balance Pharmacy", "DCA Pharmacy", "Thesis Pharmacy"][index % 4],
  shippingState: ["Florida", "New York", "Texas"][index % 3],
  areaOfTreatment: injectionArea(product.name),
  dosage: "Lyophilized",
  img: blankLyophilizedVialReference,
  imgW: 145,
  imgH: 181,
  imgL: 30,
  imgT: 17,
  imgContain: true,
  btnOffsetX: 168,
  heartVariant: "black",
  vialPalette: lyophilizedPalette(product.catalogNumber),
}));

const TOPICAL_CARDS: CardDef[] = TOPICAL_PRODUCT_SEEDS.map((product, index) => ({
  id: 4000 + product.catalogNumber,
  name: product.name,
  strength: product.strength,
  price: "$35.88",
  pharmacies: 2 + (index % 4),
  pharmacy: ["1st Choice Compounding Pharmacy", "Optimal Balance Pharmacy", "DCA Pharmacy", "Thesis Pharmacy"][index % 4],
  shippingState: ["Florida", "New York", "Texas"][index % 3],
  areaOfTreatment: injectionArea(product.name),
  dosage: "Topical",
  img: blankTopicalDropperReference,
  imgW: 172,
  imgH: 215,
  imgL: 16.5,
  imgT: 2,
  imgContain: true,
  btnOffsetX: 168,
  heartVariant: "black" as const,
  vialPalette: topicalPalette(product.catalogNumber),
}));

const PATCH_CARDS: CardDef[] = PATCH_PRODUCT_SEEDS.map((product, index) => ({
  id: 5000 + product.catalogNumber,
  name: product.name,
  strength: product.strength,
  price: "$35.88",
  pharmacies: 2 + (index % 4),
  pharmacy: ["1st Choice Compounding Pharmacy", "Optimal Balance Pharmacy", "DCA Pharmacy", "Thesis Pharmacy"][index % 4],
  shippingState: ["Florida", "New York", "Texas"][index % 3],
  areaOfTreatment: "Women's Health",
  dosage: "Patch",
  img: blankPatchPackageReference,
  imgW: 172,
  imgH: 215,
  imgL: 16.5,
  imgT: 2,
  imgContain: true,
  btnOffsetX: 168,
  heartVariant: "black" as const,
}));

const CAPSULE_CARDS: CardDef[] = CAPSULE_PRODUCT_SEEDS.map((product, index) => ({
  id: 6000 + product.catalogNumber,
  name: product.name,
  strength: product.strength,
  price: "$35.88",
  pharmacies: 2 + (index % 4),
  pharmacy: ["1st Choice Compounding Pharmacy", "Optimal Balance Pharmacy", "DCA Pharmacy", "Thesis Pharmacy"][index % 4],
  shippingState: ["Florida", "New York", "Texas"][index % 3],
  areaOfTreatment: injectionArea(product.name),
  dosage: "Capsule",
  img: blankCapsuleBottleReference,
  imgW: 172,
  imgH: 215,
  imgL: 16.5,
  imgT: 2,
  imgContain: true,
  btnOffsetX: 168,
  heartVariant: "black" as const,
  vialPalette: capsulePalette(),
}));

const POPULAR_CARDS: CardDef[] = INJECTION_CARDS.slice(0, 8);

const ALL_CARDS: CardDef[] = [...INJECTION_CARDS, ...NASAL_SPRAY_CARDS, ...LYOPHILIZED_CARDS, ...PATCH_CARDS];

const PHARMACIES_MULTI = [
  { name: "All Pharmacies", count: 200 },
  { name: "1st Choice Compounding Pharmacy", count: 37 },
  { name: "Optimal Balance Pharmacy", count: 59 },
  { name: "DCA Pharmacy", count: 51 },
  { name: "Thesis Pharmacy", count: 53 },
  { name: "Rush Pharmacy TX", count: 20 },
  { name: "Spring Creek Pharmacy", count: 3 },
];

function MultiPatientPanel({ activePharmacy, onSelect }: { activePharmacy: string; onSelect: (name: string) => void }) {

  return (
    <div className="mb-5">
      {/* Warning banner */}
      <div className="flex items-start gap-3 bg-[#fffbeb] border border-[#fde68a] rounded-[10px] px-4 py-3 mb-4">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="flex-shrink-0 mt-0.5">
          <path d="M8 1.5L14.5 13H1.5L8 1.5Z" stroke="#d97706" strokeWidth="1.4" strokeLinejoin="round"/>
          <path d="M8 6V9" stroke="#d97706" strokeWidth="1.4" strokeLinecap="round"/>
          <circle cx="8" cy="11" r="0.6" fill="#d97706"/>
        </svg>
        <div>
          <p className="text-[12px] font-semibold text-[#92400e] mb-0.5">Multi-Patient Orders!</p>
          <p className="text-[11px] text-[#92400e]/80 leading-relaxed">
            Items in this catalog are available for group purchasing. Order medications for multiple patients from the same pharmacy and have them shipped directly to your clinic.
          </p>
        </div>
      </div>

      {/* Pharmacy filter row */}
      <p className="text-[10px] font-semibold text-[#9d9d9d] tracking-widest uppercase mb-2.5">
        Pharmacies ({PHARMACIES_MULTI.length - 1})
      </p>
      <div className="flex flex-wrap gap-2">
        {PHARMACIES_MULTI.map((ph) => {
          const isActive = activePharmacy === ph.name;
          return (
            <button
              key={ph.name}
              onClick={() => onSelect(ph.name)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[12px] font-medium transition-all ${
                isActive
                  ? "border-2 border-[#183229] bg-white text-[#183229]"
                  : "border-[#e0e0e0] bg-white text-[#1a1a1a] hover:border-[#183229]/40"
              }`}
            >
              {ph.name}
              <span className={`text-[11px] font-semibold ${isActive ? "text-[#183229]" : "text-[#9d9d9d]"}`}>
                {ph.count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function FavoritesPage({
  onNavigate,
  cartPage,
  onProductSelect,
}: {
  onNavigate: (p: Page) => void;
  cartPage: Page;
  onProductSelect: (product: CardDef) => void;
}) {
  const { favoriteProducts, setFavoriteProductIds } = useProductFavorites();
  const { addCartItems } = useCartSummary();
  const { runWithAppLoader, showToast } = useAppLoading();

  function removeFavorite(id: number) {
    setFavoriteProductIds(current => {
      const next = new Set(current);
      next.delete(id);
      return next;
    });
  }

  function addFavoriteProductToCart(product: CardDef) {
    runWithAppLoader(() => {
      addCartItems(1, {
        id: product.id,
        name: product.name,
        price: product.price,
        img: product.img,
        qty: 1,
      });
      showToast("Product added to cart");
    });
  }

  return (
    <>
      <Header title="Favorites" onNavigate={onNavigate} cartPage={cartPage} onProductSelect={onProductSelect} />

      <section>
        <div className="flex justify-end pb-3">
          <button
            onClick={() => setFavoriteProductIds(new Set())}
            className="inline-flex h-9 items-center gap-2 rounded-[7px] px-3 text-[12px] font-semibold uppercase tracking-[0.02em] text-[#183229] transition-colors hover:bg-[#f6f4f5]"
          >
            Clear all <Trash2 size={15} />
          </button>
        </div>

        {favoriteProducts.length > 0 ? (
          <div className="flex flex-wrap gap-5">
            {favoriteProducts.map(product => (
              <article key={product.id} className="relative w-[268px]">
                <FigmaCard
                  name={product.name}
                  strength={product.strength}
                  vialPalette={product.vialPalette}
                  price={product.price}
                  pharmacies={product.pharmacies}
                  img={product.img}
                  imgW={product.imgW}
                  imgH={product.imgH}
                  imgL={product.imgL}
                  imgT={product.imgT}
                  imgContain={product.imgContain}
                  favorited={true}
                  onFavorite={() => removeFavorite(product.id)}
                  hasRxBadge={product.hasRxBadge}
                  btnOffsetX={product.btnOffsetX}
                  heartVariant={product.heartVariant === "none" ? "black" : "green"}
                  onClick={() => {
                    onProductSelect(product);
                    onNavigate("product-detail");
                  }}
                />
                <div className="absolute bottom-3 left-5 right-5 z-20 grid grid-cols-[minmax(0,1fr)_34px] gap-2">
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      addFavoriteProductToCart(product);
                    }}
                    className="flex h-8 items-center justify-center rounded-[10px] bg-white px-3 text-[10px] font-bold uppercase tracking-[0.02em] text-[#183229] transition-colors hover:bg-[#eef5f1]"
                  >
                    Add to cart
                  </button>
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      removeFavorite(product.id);
                    }}
                    className="flex h-8 items-center justify-center rounded-[10px] bg-white text-[#183229] transition-colors hover:bg-[#fbeaea] hover:text-[#d92d20]"
                    aria-label={`Remove ${product.name}`}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center px-4 py-16 text-center">
            <Heart size={28} className="text-[#c7cfcb]" />
            <p className="mt-3 text-[15px] font-semibold text-[#1a1a1a]">No favorite products yet</p>
            <p className="mt-1 max-w-[320px] text-[12px] text-[#6f7782]">Favorite products from the catalog and they will appear here.</p>
            <button onClick={() => onNavigate("products")} className="mt-5 h-10 rounded-[10px] bg-[#183229] px-4 text-[12px] font-semibold text-white">
              Browse catalog
            </button>
          </div>
        )}
      </section>
    </>
  );
}

function CatalogProductSkeleton({ index }: { index: number }) {
  return (
    <div
      className="h-[393px] w-[268px] overflow-hidden rounded-[4px] bg-gradient-to-b from-[#fbfbfb] to-[#f7f7f5]"
      aria-hidden="true"
      style={{ animationDelay: `${index * 55}ms` }}
    >
      <div className="relative flex h-[285px] items-center justify-center">
        <div className="absolute left-[18px] top-[18px] size-8 animate-pulse rounded-full bg-[#e9edf3]" />
        <div className="h-[205px] w-[118px] animate-pulse rounded-[54px_54px_22px_22px] bg-gradient-to-r from-[#ececec] via-[#f7f7f7] to-[#ececec] bg-[length:200%_100%]" />
      </div>
      <div className="px-[18px] pt-2">
        <div className="mb-3 h-6 w-full animate-pulse rounded-full bg-[#eeeeec]" />
        <div className="h-4 w-[78%] animate-pulse rounded bg-[#e5e5e3]" />
        <div className="mt-2 h-3 w-[38%] animate-pulse rounded bg-[#ededeb]" />
        <div className="mt-2 h-3 w-[58%] animate-pulse rounded bg-[#f0f0ee]" />
      </div>
    </div>
  );
}

function ProductsPage({
  onNavigate,
  cartMode,
  setCartMode,
  onProductSelect,
  oldCatalog,
  pharmacyCatalog,
}: {
  onNavigate: (p: Page) => void;
  cartMode: CartMode;
  setCartMode: (mode: CartMode) => void;
  onProductSelect: (product: CardDef) => void;
  oldCatalog: boolean;
  pharmacyCatalog: boolean;
}) {
  const { favoriteProductIds, setFavoriteProductIds, favoriteProducts } = useProductFavorites();
  const [search, setSearch] = useState("");
  const [activePharmacy, setActivePharmacy] = useState("All Pharmacies");
  const [shippingStates, setShippingStates] = useState<string[]>([]);
  const [areasOfTreatment, setAreasOfTreatment] = useState<string[]>([]);
  const [dosages, setDosages] = useState<string[]>([]);
  const [openCatalogFilter, setOpenCatalogFilter] = useState<string | null>(null);
  const [catalogFilterSearch, setCatalogFilterSearch] = useState<Record<string, string>>({});
  const [catalogLoading, setCatalogLoading] = useState(true);
  const { runWithAppLoader, showToast } = useAppLoading();
  const searchRef = useRef<HTMLInputElement>(null);
  const catalogFiltersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadingTimer = window.setTimeout(() => setCatalogLoading(false), 700);
    return () => window.clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "f") {
        e.preventDefault();
        searchRef.current?.focus();
        searchRef.current?.select();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!openCatalogFilter) return;

    function closeFilterOnOutsideClick(event: MouseEvent | TouchEvent) {
      if (!catalogFiltersRef.current?.contains(event.target as Node)) {
        setOpenCatalogFilter(null);
      }
    }

    document.addEventListener("mousedown", closeFilterOnOutsideClick);
    document.addEventListener("touchstart", closeFilterOnOutsideClick);
    return () => {
      document.removeEventListener("mousedown", closeFilterOnOutsideClick);
      document.removeEventListener("touchstart", closeFilterOnOutsideClick);
    };
  }, [openCatalogFilter]);

  function toggleFav(id: number) {
    const willFavorite = !favoriteProductIds.has(id);
    runWithAppLoader(() => {
      setFavoriteProductIds((prev) => {
        const next = new Set(prev);
        next.has(id) ? next.delete(id) : next.add(id);
        return next;
      });
      showToast(willFavorite ? "Product added to favorites" : "Product removed from favorites");
    });
  }

  function renderCard(card: CardDef) {
    return <ReferenceProductCard key={card.id} card={card} onClick={() => { onProductSelect(card); onNavigate("product-detail"); }} />;
  }

  function matchesCatalogFilters(card: CardDef) {
    return (shippingStates.length === 0 || shippingStates.includes(card.shippingState))
      && (areasOfTreatment.length === 0 || areasOfTreatment.includes(card.areaOfTreatment))
      && (dosages.length === 0 || dosages.includes(card.dosage));
  }

  const usStates = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
    "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
    "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
    "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
    "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
    "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
    "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
  ];
  const dosageCounts: Record<string, number> = {
    Bottle: 6,
    Enema: 2,
    Injection: INJECTION_CARDS.length,
    "Nasal Spray": NASAL_SPRAY_CARDS.length,
    Lyophilized: LYOPHILIZED_CARDS.length,
    Patch: PATCH_CARDS.length,
    Gel: 6,
    Lollipop: 2,
    "Iv Bag": 1,
    Jar: 6,
    "Iv Bag 15": 15,
    Jan: 6,
  };
  const dosageOptions = ["Bottle", "Enema", "Injection", "Nasal Spray", "Lyophilized", "Patch", "Gel", "Lollipop", "Iv Bag", "Jar", "Iv Bag 15", "Jan"];
  const areaCounts = ALL_CARDS.reduce<Record<string, number>>((counts, card) => {
    counts[card.areaOfTreatment] = (counts[card.areaOfTreatment] ?? 0) + 1;
    return counts;
  }, {});
  const areaOptions = ["Women's Health", "Men's Health", "Wellness", "Weight Loss", "Peptide Therapy", "Hormone Support"];

  const catalogFilters = [
    { label: "Shipping State", values: shippingStates, setValues: setShippingStates, options: usStates },
    { label: "Area of Treatment", values: areasOfTreatment, setValues: setAreasOfTreatment, options: areaOptions },
    { label: "Dosage", values: dosages, setValues: setDosages, options: dosageOptions },
  ];
  const selectedCatalogFilterCount = catalogFilters.reduce((count, filter) => count + filter.values.length, 0);
  const clearCatalogFilters = () => {
    setShippingStates([]);
    setAreasOfTreatment([]);
    setDosages([]);
    setActivePharmacy("All Pharmacies");
  };

  return (
    <>
      {/* Page header — matches Figma layout */}
      <div className="mb-0 flex h-[38px] items-center justify-between">
        <h1 className="flex h-[38px] items-center font-['Inter',sans-serif] text-[28px] font-semibold leading-tight text-[#1a1a1a]">Products</h1>
      </div>

      {/* Search + filters bar */}
      <div className="sticky top-0 z-30 -mx-2 mb-5 flex items-end gap-[14px] border-b border-[#eeeeec] bg-white/95 px-2 pb-4 pt-3 backdrop-blur-sm">
        {/* Search box — from Figma import Group1216401138 */}
        <div className="group w-[220px] flex-shrink-0 transition-all duration-300 ease-out focus-within:w-[310px]">
        <div className="flex h-[38px] items-center gap-2 rounded-[9px] border border-[#cfcfcf] bg-white px-3 transition-all duration-300 ease-out focus-within:border-2 focus-within:border-black">
          {/* Magnifier icon — pce98200 */}
          <svg width="14" height="14" viewBox="0 0 18 18" fill="none" className="flex-shrink-0 transition-transform duration-300 group-focus-within:scale-110">
            <path d="M16.1489 15.3529L12.6283 11.8331C13.6487 10.608 14.1575 9.03675 14.0489 7.4461C13.9403 5.85545 13.2227 4.3679 12.0452 3.2929C10.8678 2.21791 9.32127 1.63823 7.72733 1.67445C6.13339 1.71068 4.61477 2.36002 3.4874 3.4874C2.36002 4.61477 1.71068 6.13339 1.67445 7.72733C1.63823 9.32127 2.21791 10.8678 3.2929 12.0452C4.3679 13.2227 5.85545 13.9403 7.4461 14.0489C9.03675 14.1575 10.608 13.6487 11.8331 12.6283L15.3529 16.1489C15.4052 16.2011 15.4672 16.2426 15.5355 16.2709C15.6038 16.2991 15.677 16.3137 15.7509 16.3137C15.8248 16.3137 15.898 16.2991 15.9663 16.2709C16.0346 16.2426 16.0966 16.2011 16.1489 16.1489C16.2011 16.0966 16.2426 16.0346 16.2709 15.9663C16.2991 15.898 16.3137 15.8248 16.3137 15.7509C16.3137 15.677 16.2991 15.6038 16.2709 15.5355C16.2426 15.4672 16.2011 15.4052 16.1489 15.3529ZM2.81339 7.87589C2.81339 6.87462 3.1103 5.89584 3.66658 5.06332C4.22285 4.23079 5.01351 3.58192 5.93856 3.19875C6.86361 2.81558 7.88151 2.71533 8.86354 2.91067C9.84557 3.10601 10.7476 3.58816 11.4556 4.29616C12.1636 5.00417 12.6458 5.90622 12.8411 6.88825C13.0365 7.87028 12.9362 8.88818 12.553 9.81323C12.1699 10.7383 11.521 11.5289 10.6885 12.0852C9.85594 12.6415 8.87716 12.9384 7.87589 12.9384C6.53369 12.9369 5.24689 12.4031 4.29781 11.454C3.34873 10.5049 2.81488 9.21809 2.81339 7.87589Z" fill="#686868"/>
          </svg>
          <input
            ref={searchRef}
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search stock or Orders"
            className="flex-1 text-[11px] font-medium font-['Inter',sans-serif] text-black bg-transparent outline-none placeholder:text-[#686868] placeholder:font-medium"
          />
          <div className="flex items-center gap-1 flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="flex-shrink-0">
              <path d="M11.25 9H10V7H11.25C11.695 7 12.13 6.86804 12.5 6.62081C12.87 6.37357 13.1584 6.02217 13.3287 5.61104C13.499 5.19991 13.5436 4.74751 13.4568 4.31105C13.37 3.87459 13.1557 3.47368 12.841 3.15901C12.5263 2.84434 12.1254 2.63005 11.689 2.54323C11.2525 2.45642 10.8001 2.50097 10.389 2.67127C9.97783 2.84157 9.62643 3.12996 9.3792 3.49997C9.13196 3.86998 9 4.30499 9 4.75V6H7V4.75C7 4.30499 6.86804 3.86998 6.62081 3.49997C6.37357 3.12996 6.02217 2.84157 5.61104 2.67127C5.19991 2.50097 4.74751 2.45642 4.31105 2.54323C3.87459 2.63005 3.47368 2.84434 3.15901 3.15901C2.84434 3.47368 2.63005 3.87459 2.54323 4.31105C2.45642 4.74751 2.50097 5.19991 2.67127 5.61104C2.84157 6.02217 3.12996 6.37357 3.49997 6.62081C3.86998 6.86804 4.30499 7 4.75 7H6V9H4.75C4.30499 9 3.86998 9.13196 3.49997 9.3792C3.12996 9.62643 2.84157 9.97783 2.67127 10.389C2.50097 10.8001 2.45642 11.2525 2.54323 11.689C2.63005 12.1254 2.84434 12.5263 3.15901 12.841C3.47368 13.1557 3.87459 13.37 4.31105 13.4568C4.74751 13.5436 5.19991 13.499 5.61104 13.3287C6.02217 13.1584 6.37357 12.87 6.62081 12.5C6.86804 12.13 7 11.695 7 11.25V10H9V11.25C9 11.695 9.13196 12.13 9.3792 12.5C9.62643 12.87 9.97783 13.1584 10.389 13.3287C10.8001 13.499 11.2525 13.5436 11.689 13.4568C12.1254 13.37 12.5263 13.1557 12.841 12.841C13.1557 12.5263 13.37 12.1254 13.4568 11.689C13.5436 11.2525 13.499 10.8001 13.3287 10.389C13.1584 9.97783 12.87 9.62643 12.5 9.3792C12.13 9.13196 11.695 9 11.25 9ZM10 4.75C10 4.50277 10.0733 4.2611 10.2107 4.05554C10.348 3.84998 10.5432 3.68976 10.7716 3.59515C11.0001 3.50054 11.2514 3.47579 11.4939 3.52402C11.7363 3.57225 11.9591 3.6913 12.1339 3.86612C12.3087 4.04093 12.4278 4.26366 12.476 4.50614C12.5242 4.74861 12.4995 4.99995 12.4049 5.22836C12.3102 5.45676 12.15 5.65199 11.9445 5.78934C11.7389 5.92669 11.4972 6 11.25 6H10V4.75ZM3.5 4.75C3.5 4.41848 3.6317 4.10054 3.86612 3.86612C4.10054 3.6317 4.41848 3.5 4.75 3.5C5.08152 3.5 5.39946 3.6317 5.63388 3.86612C5.86831 4.10054 6 4.41848 6 4.75V6H4.75C4.41848 6 4.10054 5.86831 3.86612 5.63388C3.6317 5.39946 3.5 5.08152 3.5 4.75ZM6 11.25C6 11.4972 5.92669 11.7389 5.78934 11.9445C5.65199 12.15 5.45676 12.3102 5.22836 12.4049C4.99995 12.4995 4.74861 12.5242 4.50614 12.476C4.26366 12.4278 4.04093 12.3087 3.86612 12.1339C3.6913 11.9591 3.57225 11.7363 3.52402 11.4939C3.47579 11.2514 3.50054 11.0001 3.59515 10.7716C3.68976 10.5432 3.84998 10.348 4.05554 10.2107C4.2611 10.0733 4.50277 10 4.75 10H6V11.25ZM7 7H9V9H7V7ZM11.25 12.5C10.9185 12.5 10.6005 12.3683 10.3661 12.1339C10.1317 11.8995 10 11.5815 10 11.25V10H11.25C11.5815 10 11.8995 10.1317 12.1339 10.3661C12.3683 10.6005 12.5 10.9185 12.5 11.25C12.5 11.5815 12.3683 11.8995 12.1339 12.1339C11.8995 12.3683 11.5815 12.5 11.25 12.5Z" fill="#686868"/>
            </svg>
            <span className="text-[12px] text-[#686868] font-['Inter',sans-serif] font-normal">+ F</span>
          </div>
        </div>
        </div>

        {/* Filters */}
        <div ref={catalogFiltersRef} className="ml-auto flex items-end gap-3">
          {catalogFilters.map(({ label, values, setValues, options }) => {
            const isOpen = openCatalogFilter === label;
            const hasSelection = values.length > 0;
            const isShippingState = label === "Shipping State";
            const isDosage = label === "Dosage";
            const isAreaOfTreatment = label === "Area of Treatment";
            const isCountCheckboxFilter = isDosage || isAreaOfTreatment;
            const buttonLabel = isShippingState && hasSelection ? values[0] : label;
            const filterWidthClass = isShippingState ? "w-[142px]" : isAreaOfTreatment ? "w-[165px]" : "w-[94px]";
            return (
              <div key={label} className="relative flex flex-col gap-1.5">
                <span className="px-0.5 text-[11px] font-medium leading-none text-[#667085]">
                  {label}
                </span>
                <button
                  onClick={() => setOpenCatalogFilter(isOpen ? null : label)}
                  className={`flex h-[38px] ${filterWidthClass} cursor-pointer items-center justify-between gap-2 rounded-[9px] border bg-white px-3 text-[12px] font-medium leading-none transition-colors ${
                    hasSelection
                      ? isShippingState
                        ? "border-[#9DBBFF] bg-[#F3F7FF] text-[#2563EB]"
                        : "border-[#cfd8d4] text-[#344054]"
                      : "border-[#cfcfcf] text-[#344054] hover:border-[#aeb8c5]"
                  }`}
                >
                  <span className="min-w-0 truncate">{buttonLabel}</span>
                  <ChevronsUpDown size={14} strokeWidth={1.8} className={isShippingState && hasSelection ? "text-[#2563EB]" : "text-[#344054]"} />
                </button>

                {isOpen && (
                  <div className={`absolute top-[56px] z-20 overflow-hidden rounded-[9px] border border-[#d7dee8] bg-white shadow-[0_18px_40px_rgba(16,24,40,0.16)] ${
                    isDosage ? "right-0 w-[180px]" : isAreaOfTreatment ? "left-0 w-[220px]" : "left-0 w-[240px]"
                  }`}>
                    <div className="border-b border-[#e7ebf0] p-2">
                      <div className="flex h-[34px] items-center gap-2 rounded-[5px] border border-[#cfd8e3] bg-white px-2">
                        <Search size={15} strokeWidth={1.9} className="text-[#344054]" />
                        <input
                          value={catalogFilterSearch[label] ?? ""}
                          onChange={(e) => setCatalogFilterSearch(prev => ({ ...prev, [label]: e.target.value }))}
                          autoFocus
                          className="h-full min-w-0 flex-1 bg-transparent text-[13px] font-normal text-[#344054] outline-none placeholder:text-[#98a2b3]"
                        />
                      </div>
                    </div>
                    <div className="max-h-[330px] overflow-y-auto py-1">
                      {options
                        .filter(option => option.toLowerCase().includes((catalogFilterSearch[label] ?? "").toLowerCase()))
                        .map(option => {
                        const checked = values.includes(option);
                        if (isCountCheckboxFilter) {
                          const count = isDosage ? (dosageCounts[option] ?? 0) : (areaCounts[option] ?? 0);
                          const displayOption = option === "Iv Bag 15" ? "Iv Bag" : option;
                          return (
                            <label
                              key={option}
                              className="flex cursor-pointer items-center gap-2 px-4 py-2 text-[13px] font-normal text-[#344054] transition-colors hover:bg-[#f6f8fa]"
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => {
                                  setValues(prev => (
                                    prev.includes(option)
                                      ? prev.filter(value => value !== option)
                                      : [...prev, option]
                                  ));
                                }}
                                className="size-3.5 rounded border-[#a8afb8] accent-[#344054]"
                              />
                              <span>{displayOption} ({count})</span>
                            </label>
                          );
                        }
                        return (
                          <button
                            key={option}
                            onClick={() => {
                              if (isShippingState) {
                                setValues([option]);
                                setOpenCatalogFilter(null);
                                return;
                              }
                              setValues(prev => (
                                prev.includes(option)
                                  ? prev.filter(value => value !== option)
                                  : [...prev, option]
                              ));
                            }}
                            className="flex w-full cursor-pointer items-center gap-3 px-4 py-2 text-left text-[13px] font-normal text-[#344054] transition-colors hover:bg-[#f6f8fa]"
                          >
                            <span className="flex-1">{option}</span>
                            {checked && <CheckCircle2 size={14} strokeWidth={2.4} className="fill-[#475467] text-white" />}
                          </button>
                        );
                      })}
                      {options.filter(option => option.toLowerCase().includes((catalogFilterSearch[label] ?? "").toLowerCase())).length === 0 && (
                        <div className="px-4 py-3 text-[13px] font-medium text-[#98a2b3]">No results</div>
                      )}
                    </div>
                    {hasSelection && (
                      <button
                        onClick={() => setValues([])}
                        className="w-full cursor-pointer border-t border-[#e7ebf0] px-4 py-2.5 text-left text-[12px] font-normal text-[#667085] transition-colors hover:bg-[#f6f8fa] hover:text-[#183229]"
                      >
                        Clear {label}
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
          <div className="relative flex flex-col gap-1.5">
            <span className="px-0.5 text-[11px] font-medium leading-none text-transparent">Legend</span>
            <button
              type="button"
              onClick={() => setOpenCatalogFilter(openCatalogFilter === "Legend" ? null : "Legend")}
              className={`flex h-[38px] w-[108px] items-center justify-between gap-2 rounded-[9px] border bg-white px-3 text-[12px] font-medium leading-none text-[#344054] transition-colors ${openCatalogFilter === "Legend" ? "border-black" : "border-[#cfcfcf] hover:border-[#aeb8c5]"}`}
              aria-expanded={openCatalogFilter === "Legend"}
            >
              <span className="inline-flex items-center gap-1.5"><Info size={14} strokeWidth={2} /> Legend</span>
              <ChevronDown size={14} className={`transition-transform ${openCatalogFilter === "Legend" ? "rotate-180" : ""}`} />
            </button>

            {openCatalogFilter === "Legend" && (
              <div className="absolute right-0 top-[56px] z-30 w-[300px] rounded-[10px] border border-[#d7dee8] bg-white p-4 shadow-[0_18px_40px_rgba(16,24,40,0.16)]">
                <div className="space-y-3.5">
                  <div className="flex items-start gap-3">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#EEF4FF] text-[#2563EB]"><Snowflake size={14} strokeWidth={2} /></span>
                    <div><p className="text-[12px] font-medium text-[#1f2937]">Refrigerated</p><p className="mt-0.5 text-[11px] font-normal leading-4 text-[#667085]">Requires cold storage and ships refrigerated.</p></div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#FFF0F0] text-[11px] font-semibold text-[#D84B4B]">C</span>
                    <div><p className="text-[12px] font-medium text-[#1f2937]">Controlled</p><p className="mt-0.5 text-[11px] font-normal leading-4 text-[#667085]">Controlled substance—additional prescribing requirements apply.</p></div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#EEF4FF]"><Heart size={14} className="fill-[#2563EB] text-[#2563EB]" /></span>
                    <div><p className="text-[12px] font-medium text-[#1f2937]">Favorite</p><p className="mt-0.5 text-[11px] font-normal leading-4 text-[#667085]">A product you’ve favorited—shown in your Favorites row.</p></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mb-5 flex flex-wrap items-center gap-2">
        {PHARMACIES_MULTI.map(pharmacy => {
          const isActive = activePharmacy === pharmacy.name;
          return (
            <button
              key={pharmacy.name}
              onClick={() => setActivePharmacy(pharmacy.name)}
              className={`flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[12px] font-medium transition-colors ${isActive ? "border-2 border-[#2563EB] text-[#2563EB]" : "border-[0.5px] border-black text-[#1a1a1a] hover:border-[#2563EB]"}`}
            >
              {pharmacy.name}
              <span className={`text-[11px] font-semibold ${isActive ? "text-[#2563EB]" : "text-[#9d9d9d]"}`}>{pharmacy.count}</span>
            </button>
          );
        })}
      </div>

      {selectedCatalogFilterCount > 0 && (
        <div className="-mt-2 mb-5 flex flex-wrap items-center gap-2">
          {catalogFilters.flatMap(({ label, values, setValues }) => (
            values.map(value => (
              <button
                key={`${label}-${value}`}
                onClick={() => setValues(prev => prev.filter(item => item !== value))}
                className="flex cursor-pointer items-center gap-1.5 rounded-full border border-[#9DBBFF] bg-[#F3F7FF] px-3 py-1.5 text-[12px] font-medium text-[#2563EB] transition-colors hover:border-[#2563EB]"
              >
                <span className="text-[#4F6FAF]">{label}:</span>
                {value}
                <XCircle size={13} strokeWidth={1.8} />
              </button>
            ))
          ))}
          <button
            onClick={clearCatalogFilters}
            className="cursor-pointer text-[12px] font-medium text-[#667085] transition-colors hover:text-[#183229]"
          >
            Clear all
          </button>
        </div>
      )}

      {catalogLoading && (
        <section className="mb-6" aria-live="polite" aria-busy="true" aria-label="Loading products">
          <div className="mb-4 flex items-center gap-2">
            <span className="size-3.5 animate-spin rounded-full border-2 border-[#d9d9d7] border-t-[#121212]" />
            <h2 className="font-['Inter',sans-serif] text-[18px] font-medium leading-none text-black">Loading products</h2>
          </div>
          <div className="grid justify-items-start gap-[13px] [grid-template-columns:repeat(auto-fit,268px)]">
            {Array.from({ length: 8 }, (_, index) => <CatalogProductSkeleton key={index} index={index} />)}
          </div>
        </section>
      )}

      {/* Popular Products */}
      {!catalogLoading && (() => {
        const q = search.toLowerCase();
        const filtered = POPULAR_CARDS.filter(c => {
          const matchesSearch = !q || c.name.toLowerCase().includes(q) || c.price.toLowerCase().includes(q);
          const matchesPharmacy = activePharmacy === "All Pharmacies" || c.pharmacy === activePharmacy;
          return matchesSearch && matchesPharmacy && matchesCatalogFilters(c);
        });
        if (filtered.length === 0) return null;
        return (
          <section className="mb-6">
            <h2 className="font-['Inter',sans-serif] font-medium text-black text-[18px] mb-4 leading-none">Popular Products</h2>
            <div className="grid justify-items-start gap-[13px] [grid-template-columns:repeat(auto-fit,268px)]">
              {filtered.map(renderCard)}
            </div>
          </section>
        );
      })()}

      {/* All Products */}
      {!catalogLoading && (() => {
        const q = search.toLowerCase();
        const filtered = ALL_CARDS.filter(c => {
          const matchesSearch = !q || c.name.toLowerCase().includes(q) || c.price.toLowerCase().includes(q);
          const matchesPharmacy = activePharmacy === "All Pharmacies" || c.pharmacy === activePharmacy;
          return matchesSearch && matchesPharmacy && matchesCatalogFilters(c);
        });
        return (
          <section>
            <h2 className="font-['Inter',sans-serif] font-medium text-black text-[18px] mb-4 leading-none">
              {search ? `Results for "${search}"` : "All Products"}
              <span className="text-[14px] text-[#9d9d9d] font-normal ml-2">
                ({filtered.length} {search ? "found" : "items"})
              </span>
            </h2>
            {filtered.length > 0 ? (
              <div className="grid justify-items-start gap-[13px] [grid-template-columns:repeat(auto-fit,268px)]">
                {filtered.map(renderCard)}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Search size={28} className="text-[#d0d0d0] mb-3" />
                <p className="text-[14px] font-semibold text-[#1a1a1a] mb-1">No products found</p>
                <p className="text-[12px] text-[#9d9d9d]">Try a different search term</p>
              </div>
            )}
          </section>
        );
      })()}
    </>
  );
}

// ─── Product Detail ───────────────────────────────────────────────────────────

function OptionPill({
  label,
  selected,
  onClick,
  emphasis,
  card,
  tesla,
  blue,
  subLabel,
  tone = "apple",
}: {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  emphasis?: boolean;
  card?: boolean;
  tesla?: boolean;
  blue?: boolean;
  subLabel?: string;
  tone?: "apple" | "green";
}) {
  const selectedOutline =
    tone === "green"
      ? "border-2 border-[#00B53F] bg-white text-[#111] shadow-[0_0_0_3px_rgba(0,181,63,0.10)]"
      : "border-[3px] border-[#4485FF] bg-white text-[#111]";

  return (
    <button
      onClick={onClick}
      className={`relative inline-flex items-center border font-medium transition-colors ${subLabel ? "h-[46px] min-w-[102px] justify-center rounded-[7px] px-2 text-[12px]" : tesla ? "h-10 min-w-[94px] justify-center rounded-[7px] px-3 text-[12px]" : "h-11 rounded-[7px] px-5 text-[12px]"} ${
        selected && tesla
          ? blue
            ? "border-2 border-[#2563EB] bg-white text-[#171a20]"
            : "border-2 border-[#171a20] bg-white text-[#171a20]"
          : tesla
          ? "border border-[#d0d1d2] bg-white text-[#5c5e62] hover:border-[#8e8e8e]"
          : selected && card
          ? "border-[#183229] bg-[#eef7f2] text-[#183229] shadow-[0_8px_18px_rgba(24,50,41,0.08)]"
          : selected && emphasis
          ? "border-[#183229] bg-[#183229] text-white shadow-[0_8px_18px_rgba(24,50,41,0.16)]"
          : selected
          ? selectedOutline
          : "border-[#c8c8c8] bg-white text-[#333] hover:border-[#111]/50"
      }`}
    >
      <span className={`inline-flex items-center gap-1.5 ${card ? "w-full justify-between" : ""}`}>
        <span className={tesla ? "text-left" : ""}>
          <span className="block">{label}</span>
          {subLabel && <span className="mt-0.5 block rounded-full bg-[#f3f3f3] px-1.5 py-0.5 text-[10px] font-normal leading-[12px] text-[#444]">{subLabel}</span>}
        </span>
        {tesla && selected && <CheckCircle2 size={18} strokeWidth={2.2} className={`absolute -right-2 -top-2 text-white ${blue ? "fill-[#2563EB]" : "fill-black"}`} />}
        {(emphasis || card) && selected && <CheckCircle2 size={13} strokeWidth={2} />}
      </span>
    </button>
  );
}

function ManualVialPreview({
  name,
  strength,
  size,
  palette,
  baseImage = blankVialReference,
  compact = false,
  flatLabel = false,
}: {
  name: string;
  strength: string;
  size: string;
  palette?: VialPalette;
  baseImage?: string;
  compact?: boolean;
  flatLabel?: boolean;
}) {
  const breakCandidates = Array.from(name).flatMap((character, index) =>
    character === " " || character === "/" ? [{ index, character }] : [],
  );
  const selectedBreak = name.length > 16
    ? breakCandidates.reduce<{ index: number; character: string } | null>((best, candidate) => {
        const firstLength = candidate.character === "/" ? candidate.index + 1 : candidate.index;
        const secondLength = name.length - candidate.index - 1;
        const score = Math.max(firstLength, secondLength) + Math.abs(firstLength - secondLength) * 0.08;
        if (!best) return candidate;
        const bestFirstLength = best.character === "/" ? best.index + 1 : best.index;
        const bestSecondLength = name.length - best.index - 1;
        const bestScore = Math.max(bestFirstLength, bestSecondLength) + Math.abs(bestFirstLength - bestSecondLength) * 0.08;
        return score < bestScore ? candidate : best;
      }, null)
    : null;
  const firstLine = selectedBreak
    ? name.slice(0, selectedBreak.character === "/" ? selectedBreak.index + 1 : selectedBreak.index).trim()
    : name;
  const secondLine = selectedBreak ? name.slice(selectedBreak.index + 1).trim() : "";
  const labelCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let cancelled = false;
    let drawFrame = 0;
    let densityQuery: MediaQueryList | null = null;

    const drawLabel = () => {
      const canvas = labelCanvasRef.current;
      if (!canvas || cancelled) return;

      const bounds = canvas.getBoundingClientRect();
      if (bounds.width <= 0 || bounds.height <= 0) return;

      // Keep the artwork at Retina density on standard external monitors too.
      // Recomputing from the live CSS size also prevents browser resampling when
      // the window moves between displays with different pixel densities.
      const pixelDensity = compact
        ? Math.max(4, window.devicePixelRatio || 1)
        : Math.min(3, Math.max(2, window.devicePixelRatio || 1));
      const width = Math.max(1, Math.round(bounds.width * pixelDensity));
      const height = Math.max(1, Math.round(bounds.height * pixelDensity));
      const renderScale = width / 1400;
      canvas.width = width;
      canvas.height = height;

      const source = document.createElement("canvas");
      source.width = width;
      source.height = height;
      const sourceContext = source.getContext("2d");
      const outputContext = canvas.getContext("2d");
      if (!sourceContext || !outputContext) return;

      const colors = {
        start: palette?.start ?? "#282e84",
        middle: palette?.middle ?? "#5d55bd",
        end: palette?.end ?? "#9680ef",
        mark: palette?.mark ?? "#9680ef",
        foreground: palette?.foreground ?? "#FFFFFF",
      };

      const fitFont = (text: string, maxWidth: number, maximum: number, minimum: number) => {
        sourceContext.font = `400 ${maximum}px "Bebas Neue", Impact, sans-serif`;
        const measured = Math.max(sourceContext.measureText(text.toUpperCase()).width, 1);
        const fitted = Math.min(maximum, maximum * (maxWidth / measured));
        return Math.max(minimum, fitted);
      };

      sourceContext.clearRect(0, 0, width, height);
      sourceContext.textBaseline = "top";
      sourceContext.textAlign = "left";
      sourceContext.fillStyle = "#050505";

      const nameLines = secondLine ? [firstLine, secondLine] : [firstLine];
      const nameFontSize = Math.min(
        ...nameLines.map((line) => fitFont(
          line,
          width * (compact ? 0.92 : 0.9),
          (compact ? 226 : 210) * renderScale,
          (compact ? 106 : 98) * renderScale,
        )),
      );
      sourceContext.font = `400 ${nameFontSize}px "Bebas Neue", Impact, sans-serif`;
      sourceContext.globalAlpha = 0.98;
      const nameX = width * 0.067;
      const firstNameY = secondLine ? height * 0.15 : height * 0.235;
      const nameLineGap = height * 0.17;
      nameLines.forEach((line, index) => {
        sourceContext.save();
        sourceContext.translate(nameX, firstNameY + index * nameLineGap);
        sourceContext.scale(compact ? 0.96 : 0.98, 1.22);
        sourceContext.fillText(line.toUpperCase(), 0, 0);
        sourceContext.globalAlpha = 1;
        sourceContext.globalCompositeOperation = "destination-out";
        sourceContext.lineWidth = compact
          ? Math.max(1, 3.2 * renderScale)
          : Math.max(0.8, 2.6 * renderScale);
        sourceContext.strokeStyle = "#000";
        sourceContext.strokeText(line.toUpperCase(), 0, 0);
        sourceContext.globalCompositeOperation = "source-over";
        sourceContext.restore();
      });
      sourceContext.globalAlpha = 1;

      const bandX = width * 0.0183;
      const bandY = height * 0.629;
      const bandWidth = width * 0.9232;
      const bandHeight = height * 0.219;
      const mainBandWidth = bandWidth * 0.876;
      const markX = bandX + mainBandWidth;
      const markWidth = bandWidth - mainBandWidth;

      if (flatLabel) {
        sourceContext.fillStyle = colors.middle;
      } else {
        const bandGradient = sourceContext.createLinearGradient(bandX, 0, bandX + mainBandWidth, 0);
        bandGradient.addColorStop(0, colors.start);
        bandGradient.addColorStop(0.18, colors.start);
        bandGradient.addColorStop(0.5, colors.middle);
        bandGradient.addColorStop(0.82, colors.end);
        bandGradient.addColorStop(1, colors.end);
        sourceContext.fillStyle = bandGradient;
      }
      sourceContext.fillRect(bandX, bandY, mainBandWidth + 1, bandHeight);

      if (!flatLabel) {
        const bandLight = sourceContext.createLinearGradient(bandX, 0, bandX + mainBandWidth, 0);
        bandLight.addColorStop(0, "rgba(7, 10, 35, 0.10)");
        bandLight.addColorStop(0.22, "rgba(255, 255, 255, 0.015)");
        bandLight.addColorStop(0.58, "rgba(255, 255, 255, 0.07)");
        bandLight.addColorStop(0.82, "rgba(255, 255, 255, 0.025)");
        bandLight.addColorStop(1, "rgba(255, 255, 255, 0.09)");
        sourceContext.fillStyle = bandLight;
        sourceContext.fillRect(bandX, bandY, mainBandWidth + 1, bandHeight);
      }

      sourceContext.fillStyle = flatLabel ? colors.middle : colors.mark;
      const markPieces = [
        [0, 0.5, 0.24, 0.5],
        [0.24, 0, 0.15, 0.5],
        [0.39, 0, 0.16, 1],
        [0.55, 0.5, 0.16, 0.5],
        [0.71, 0, 0.17, 0.5],
        [0.88, 0.5, 0.12, 0.5],
      ];
      markPieces.forEach(([x, y, pieceWidth, pieceHeight], index) => {
        sourceContext.globalAlpha = flatLabel ? 1 : 0.9 + index * 0.018;
        sourceContext.fillRect(
          markX + markWidth * x,
          bandY + bandHeight * y,
          markWidth * pieceWidth + 1,
          bandHeight * pieceHeight,
        );
      });
      sourceContext.globalAlpha = 1;
      const strengthText = strength.toUpperCase();
      const strengthFontSize = fitFont(
        strengthText,
        mainBandWidth * 0.76,
        (compact ? 104 : 94) * renderScale,
        (compact ? 47 : 43) * renderScale,
      );
      sourceContext.font = `400 ${strengthFontSize}px "Bebas Neue", Impact, sans-serif`;
      sourceContext.fillStyle = colors.foreground;
      sourceContext.textAlign = "left";
      sourceContext.textBaseline = "middle";
      sourceContext.save();
      sourceContext.translate(bandX + mainBandWidth * 0.065, bandY + bandHeight * 0.515);
      sourceContext.scale(compact ? 0.96 : 0.98, 1.12);
      sourceContext.fillText(strengthText, 0, 0);
      sourceContext.globalCompositeOperation = "destination-out";
      sourceContext.lineWidth = compact
        ? Math.max(0.8, 2.2 * renderScale)
        : Math.max(0.65, 1.8 * renderScale);
      sourceContext.strokeStyle = "#000";
      sourceContext.strokeText(strengthText, 0, 0);
      sourceContext.globalCompositeOperation = "source-over";
      sourceContext.restore();

      outputContext.clearRect(0, 0, width, height);
      outputContext.imageSmoothingEnabled = true;
      outputContext.imageSmoothingQuality = "high";
      const thetaMax = 0.72;
      const sinMax = Math.sin(thetaMax);
      const curveDepth = 28 * renderScale;
      const sourceSliceWidth = 1;

      for (let sourceX = 0; sourceX < width; sourceX += sourceSliceWidth) {
        const nextSourceX = Math.min(sourceX + sourceSliceWidth, width);
        const normalizedX = (sourceX / width - 0.5) * 2;
        const nextNormalizedX = (nextSourceX / width - 0.5) * 2;
        const destinationX = width * 0.5 + (Math.sin(normalizedX * thetaMax) / sinMax) * width * 0.5;
        const nextDestinationX = width * 0.5 + (Math.sin(nextNormalizedX * thetaMax) / sinMax) * width * 0.5;
        const centerAmount = 1 - normalizedX * normalizedX;
        const yOffset = curveDepth * (centerAmount - 0.42);
        const verticalScale = 1 + centerAmount * 0.008;
        outputContext.drawImage(
          source,
          sourceX,
          0,
          nextSourceX - sourceX,
          height,
          destinationX - 0.5,
          yOffset,
          nextDestinationX - destinationX + 1,
          height * verticalScale,
        );
      }

    };

    const scheduleDraw = () => {
      window.cancelAnimationFrame(drawFrame);
      drawFrame = window.requestAnimationFrame(drawLabel);
    };

    const canvas = labelCanvasRef.current;
    const resizeObserver = typeof ResizeObserver === "undefined"
      ? null
      : new ResizeObserver(scheduleDraw);
    if (canvas) resizeObserver?.observe(canvas);

    const handleDensityChange = () => {
      densityQuery?.removeEventListener("change", handleDensityChange);
      densityQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio || 1}dppx)`);
      densityQuery.addEventListener("change", handleDensityChange);
      scheduleDraw();
    };

    handleDensityChange();
    window.addEventListener("resize", scheduleDraw);
    document.fonts?.load('400 174px "Bebas Neue"').then(scheduleDraw).catch(() => undefined);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(drawFrame);
      resizeObserver?.disconnect();
      densityQuery?.removeEventListener("change", handleDensityChange);
      window.removeEventListener("resize", scheduleDraw);
    };
  }, [firstLine, secondLine, strength, palette, compact, flatLabel]);

  return (
    <div
      className={`manual-vial-preview ${compact ? "manual-vial-preview-compact" : ""}`}
      role="img"
      aria-label={`${name}, ${strength}, ${size}`}
    >
      <img src={baseImage} alt="" draggable={false} />
      <div className="manual-vial-label" aria-hidden="true">
        <canvas ref={labelCanvasRef} className="manual-vial-art" />
      </div>
    </div>
  );
}

function ManualNasalSprayPreview({
  name,
  strength,
  palette,
  baseImage = blankNasalSprayReference,
  variant = "nasal",
  compact = false,
  flatLabel = false,
}: {
  name: string;
  strength: string;
  palette?: VialPalette;
  baseImage?: string;
  variant?: "nasal" | "topical";
  compact?: boolean;
  flatLabel?: boolean;
}) {
  const labelCanvasRef = useRef<HTMLCanvasElement>(null);
  const desiredLineCount = variant === "topical"
    ? name.length > 58 ? 4 : name.length > 28 ? 3 : name.length > 16 ? 2 : 1
    : name.toLowerCase().includes("nasal spray") || name.length > 24 ? 3 : name.length > 14 ? 2 : 1;
  const nasalNameTokens = name.replaceAll("/", "/ ").trim().split(/\s+/).filter(Boolean);
  const nasalNameLines = nasalNameTokens.reduce<string[]>((lines, token) => {
    if (desiredLineCount === 1) return [name];
    const currentLine = lines.at(-1) ?? "";
    const targetLength = Math.ceil(name.length / desiredLineCount);
    if (currentLine && `${currentLine} ${token}`.length > targetLength && lines.length < desiredLineCount) {
      lines.push(token);
    } else if (lines.length === 0) {
      lines.push(token);
    } else {
      lines[lines.length - 1] = `${currentLine} ${token}`;
    }
    return lines;
  }, []);

  useEffect(() => {
    let cancelled = false;
    let drawFrame = 0;
    let densityQuery: MediaQueryList | null = null;

    const drawLabel = () => {
      const canvas = labelCanvasRef.current;
      if (!canvas || cancelled) return;
      const bounds = canvas.getBoundingClientRect();
      if (bounds.width <= 0 || bounds.height <= 0) return;

      const pixelDensity = compact
        ? Math.max(variant === "topical" ? 4 : 3, window.devicePixelRatio || 1)
        : Math.min(3, Math.max(2, window.devicePixelRatio || 1));
      const width = Math.max(1, Math.round(bounds.width * pixelDensity));
      const height = Math.max(1, Math.round(bounds.height * pixelDensity));
      canvas.width = width;
      canvas.height = height;

      const source = document.createElement("canvas");
      source.width = width;
      source.height = height;
      const sourceContext = source.getContext("2d");
      const outputContext = canvas.getContext("2d");
      if (!sourceContext || !outputContext) return;

      const colors = {
        start: palette?.start ?? "#BFD5D2",
        middle: palette?.middle ?? "#6FAEA1",
        end: palette?.end ?? "#A9E2B0",
        mark: palette?.mark ?? "#A9E2B0",
        foreground: palette?.foreground ?? "#FFFFFF",
      };
      const renderScale = width / 720;
      const fitFont = (text: string, maxWidth: number, maximum: number, minimum: number) => {
        sourceContext.font = `400 ${maximum}px "Bebas Neue", Impact, sans-serif`;
        const measured = Math.max(sourceContext.measureText(text.toUpperCase()).width, 1);
        return Math.max(minimum, Math.min(maximum, maximum * maxWidth / measured));
      };

      sourceContext.clearRect(0, 0, width, height);
      const topicalLineCount = nasalNameLines.length;
      const maximumNameSize = variant === "topical"
        ? topicalLineCount === 1 ? 190 : topicalLineCount === 2 ? 150 : topicalLineCount === 3 ? 132 : 110
        : topicalLineCount === 1 ? 210 : topicalLineCount === 2 ? 140 : topicalLineCount === 3 ? 112 : 92;
      const minimumNameSize = variant === "topical" ? 48 : 42;
      const widthFittedNameSize = Math.min(...nasalNameLines.map(line => fitFont(
        line,
        width * (variant === "topical" ? 0.88 : 0.84),
        maximumNameSize * renderScale,
        minimumNameSize * renderScale,
      )));
      const topicalBandY = height * (topicalLineCount >= 4 ? 0.67 : topicalLineCount === 3 ? 0.64 : 0.61);
      const topicalNameAreaHeight = topicalBandY - height * 0.1;
      const heightFittedNameSize = variant === "topical"
        ? topicalNameAreaHeight / (topicalLineCount * 0.82 + Math.max(0, topicalLineCount - 1) * 0.22)
        : widthFittedNameSize;
      const nameFontSize = Math.min(widthFittedNameSize, heightFittedNameSize);
      sourceContext.font = `400 ${nameFontSize}px "Bebas Neue", Impact, sans-serif`;
      sourceContext.fillStyle = "#090909";
      sourceContext.textAlign = "left";
      sourceContext.textBaseline = "top";
      const firstNameY = variant === "topical"
        ? Math.max(height * 0.1, (topicalBandY - nameFontSize * (topicalLineCount * 0.82 + Math.max(0, topicalLineCount - 1) * 0.22)) * 0.5)
        : height * (topicalLineCount === 1 ? 0.2 : topicalLineCount === 2 ? 0.115 : topicalLineCount === 3 ? 0.055 : 0.025);
      const nameLineGap = variant === "topical"
        ? nameFontSize * 1.04
        : height * (topicalLineCount >= 4 ? 0.125 : topicalLineCount === 3 ? 0.15 : 0.2);
      nasalNameLines.forEach((line, index) => {
        sourceContext.save();
        sourceContext.translate(width * (variant === "topical" ? 0.055 : 0.075), firstNameY + index * nameLineGap);
        sourceContext.scale(variant === "topical" ? 0.8 : 0.98, variant === "topical" ? 1 : 1.12);
        const labelLine = line.toUpperCase();
        sourceContext.fillText(labelLine, 0, 0);
        sourceContext.globalCompositeOperation = "destination-out";
        sourceContext.lineWidth = variant === "topical"
          ? Math.max(0.65, 1.5 * renderScale)
          : Math.max(0.8, 3 * renderScale);
        sourceContext.strokeStyle = "#000";
        sourceContext.strokeText(labelLine, 0, 0);
        sourceContext.globalCompositeOperation = "source-over";
        sourceContext.restore();
      });

      const bandX = width * (variant === "topical" ? 0.055 : 0.035);
      const bandY = height * (variant === "topical"
        ? topicalLineCount >= 4 ? 0.67 : topicalLineCount === 3 ? 0.64 : 0.61
        : topicalLineCount >= 4 ? 0.65 : 0.585);
      const bandWidth = width * (variant === "topical" ? 0.89 : 0.91);
      const bandHeight = height * (variant === "topical" ? 0.15 : 0.19);
      const mainBandWidth = bandWidth * 0.84;
      if (flatLabel) {
        sourceContext.fillStyle = colors.middle;
      } else {
        const bandGradient = sourceContext.createLinearGradient(bandX, 0, bandX + mainBandWidth, 0);
        bandGradient.addColorStop(0, colors.start);
        bandGradient.addColorStop(0.2, colors.start);
        bandGradient.addColorStop(0.54, colors.middle);
        bandGradient.addColorStop(0.86, colors.end);
        bandGradient.addColorStop(1, colors.end);
        sourceContext.fillStyle = bandGradient;
      }
      sourceContext.fillRect(bandX, bandY, mainBandWidth + 1, bandHeight);

      const markX = bandX + mainBandWidth;
      const markWidth = bandWidth - mainBandWidth;
      sourceContext.fillStyle = flatLabel ? colors.middle : colors.mark;
      [
        [0, 0.5, 0.28, 0.5],
        [0.28, 0, 0.2, 0.5],
        [0.48, 0, 0.22, 1],
        [0.7, 0.5, 0.18, 0.5],
        [0.88, 0, 0.12, 0.5],
      ].forEach(([x, y, pieceWidth, pieceHeight]) => {
        sourceContext.fillRect(
          markX + markWidth * x,
          bandY + bandHeight * y,
          markWidth * pieceWidth + 1,
          bandHeight * pieceHeight,
        );
      });

      const strengthText = strength.toUpperCase();
      const strengthFontSize = fitFont(
        strengthText,
        mainBandWidth * (variant === "topical" ? 0.76 : 0.68),
        (variant === "topical" ? 74 : 64) * renderScale,
        (variant === "topical" ? 38 : 30) * renderScale,
      );
      sourceContext.font = `400 ${strengthFontSize}px "Bebas Neue", Impact, sans-serif`;
      sourceContext.fillStyle = colors.foreground;
      sourceContext.textBaseline = "middle";
      sourceContext.fillText(strengthText, bandX + mainBandWidth * 0.06, bandY + bandHeight * 0.53);
      sourceContext.globalCompositeOperation = "destination-out";
      sourceContext.lineWidth = Math.max(0.6, (variant === "topical" ? 1.2 : 1.8) * renderScale);
      sourceContext.strokeStyle = "#000";
      sourceContext.strokeText(strengthText, bandX + mainBandWidth * 0.06, bandY + bandHeight * 0.53);
      sourceContext.globalCompositeOperation = "source-over";

      outputContext.clearRect(0, 0, width, height);
      outputContext.imageSmoothingEnabled = true;
      outputContext.imageSmoothingQuality = "high";
      const thetaMax = variant === "topical" ? 0.62 : 0.48;
      const sinMax = Math.sin(thetaMax);
      const curveDepth = 10 * renderScale;
      for (let sourceX = 0; sourceX < width; sourceX += 1) {
        const nextSourceX = Math.min(sourceX + 1, width);
        const normalizedX = (sourceX / width - 0.5) * 2;
        const nextNormalizedX = (nextSourceX / width - 0.5) * 2;
        const destinationX = width * 0.5 + Math.sin(normalizedX * thetaMax) / sinMax * width * 0.5;
        const nextDestinationX = width * 0.5 + Math.sin(nextNormalizedX * thetaMax) / sinMax * width * 0.5;
        const centerAmount = 1 - normalizedX * normalizedX;
        outputContext.drawImage(
          source,
          sourceX,
          0,
          1,
          height,
          destinationX - 0.5,
          curveDepth * (centerAmount - 0.42),
          nextDestinationX - destinationX + 1,
          height * (1 + centerAmount * 0.006),
        );
      }

    };

    const scheduleDraw = () => {
      window.cancelAnimationFrame(drawFrame);
      drawFrame = window.requestAnimationFrame(drawLabel);
    };
    const canvas = labelCanvasRef.current;
    const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(scheduleDraw);
    if (canvas) resizeObserver?.observe(canvas);
    const handleDensityChange = () => {
      densityQuery?.removeEventListener("change", handleDensityChange);
      densityQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio || 1}dppx)`);
      densityQuery.addEventListener("change", handleDensityChange);
      scheduleDraw();
    };
    handleDensityChange();
    window.addEventListener("resize", scheduleDraw);
    document.fonts?.load('400 150px "Bebas Neue"').then(scheduleDraw).catch(() => undefined);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(drawFrame);
      resizeObserver?.disconnect();
      densityQuery?.removeEventListener("change", handleDensityChange);
      window.removeEventListener("resize", scheduleDraw);
    };
  }, [name, strength, palette, compact, variant, flatLabel]);

  return (
    <div className={`${variant === "topical" ? "manual-topical-preview" : "manual-nasal-preview"} ${compact ? variant === "topical" ? "manual-topical-preview-compact" : "manual-nasal-preview-compact" : ""}`} role="img" aria-label={`${name}, ${strength}, ${variant}`}>
      <img src={baseImage} alt="" draggable={false} />
      <div className={variant === "topical" ? "manual-topical-label" : "manual-nasal-label"} aria-hidden="true">
        <canvas ref={labelCanvasRef} className="manual-nasal-art" />
      </div>
    </div>
  );
}

function ManualPatchPreview({
  name,
  strength,
  compact = false,
}: {
  name: string;
  strength: string;
  compact?: boolean;
}) {
  const labelCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let cancelled = false;
    let drawFrame = 0;
    let densityQuery: MediaQueryList | null = null;

    const drawLabel = () => {
      const canvas = labelCanvasRef.current;
      if (!canvas || cancelled) return;
      const bounds = canvas.getBoundingClientRect();
      if (bounds.width <= 0 || bounds.height <= 0) return;

      const pixelDensity = compact
        ? Math.max(4, window.devicePixelRatio || 1)
        : Math.min(3, Math.max(2, window.devicePixelRatio || 1));
      canvas.width = Math.max(1, Math.round(bounds.width * pixelDensity));
      canvas.height = Math.max(1, Math.round(bounds.height * pixelDensity));
      const context = canvas.getContext("2d");
      if (!context) return;

      const width = canvas.width;
      const height = canvas.height;
      const renderScale = width / 1200;
      const fitFont = (text: string, maxWidth: number, maximum: number, minimum: number) => {
        context.font = `400 ${maximum}px "Bebas Neue", Impact, sans-serif`;
        const measured = Math.max(context.measureText(text.toUpperCase()).width, 1);
        return Math.max(minimum, Math.min(maximum, maximum * maxWidth / measured));
      };

      context.clearRect(0, 0, width, height);
      const productName = name.toUpperCase();
      const nameFontSize = fitFont(productName, width * 0.93, 220 * renderScale, 80 * renderScale);
      context.font = `400 ${nameFontSize}px "Bebas Neue", Impact, sans-serif`;
      context.fillStyle = "#090909";
      context.textAlign = "left";
      context.textBaseline = "top";
      context.fillText(productName, width * 0.055, height * 0.045 + 5 * pixelDensity);

      const bandX = width * 0.035;
      const bandY = height * 0.58;
      const bandWidth = width * 0.93;
      const bandHeight = height * 0.22;
      const mainBandWidth = bandWidth * 0.78;
      context.fillStyle = "#E8CFC8";
      context.fillRect(bandX, bandY, mainBandWidth, bandHeight);

      const markX = bandX + bandWidth * 0.82;
      const markWidth = bandWidth * 0.18;
      [
        [0, 0.5, 0.28, 0.5],
        [0.28, 0, 0.2, 0.5],
        [0.48, 0, 0.22, 1],
        [0.7, 0.5, 0.18, 0.5],
        [0.88, 0, 0.12, 0.5],
      ].forEach(([x, y, pieceWidth, pieceHeight]) => {
        context.fillRect(
          markX + markWidth * x,
          bandY + bandHeight * y,
          markWidth * pieceWidth + 1,
          bandHeight * pieceHeight,
        );
      });

      const strengthFontSize = fitFont(strength, mainBandWidth * 0.78, 76 * renderScale, 34 * renderScale);
      context.font = `400 ${strengthFontSize}px "Bebas Neue", Impact, sans-serif`;
      context.fillStyle = "#6A4741";
      context.textBaseline = "middle";
      context.fillText(strength.toUpperCase(), bandX + mainBandWidth * 0.05, bandY + bandHeight * 0.52);

    };

    const scheduleDraw = () => {
      window.cancelAnimationFrame(drawFrame);
      drawFrame = window.requestAnimationFrame(drawLabel);
    };
    const canvas = labelCanvasRef.current;
    const resizeObserver = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(scheduleDraw);
    if (canvas) resizeObserver?.observe(canvas);
    const handleDensityChange = () => {
      densityQuery?.removeEventListener("change", handleDensityChange);
      densityQuery = window.matchMedia(`(resolution: ${window.devicePixelRatio || 1}dppx)`);
      densityQuery.addEventListener("change", handleDensityChange);
      scheduleDraw();
    };
    handleDensityChange();
    window.addEventListener("resize", scheduleDraw);
    document.fonts?.load('400 180px "Bebas Neue"').then(scheduleDraw).catch(() => undefined);

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(drawFrame);
      resizeObserver?.disconnect();
      densityQuery?.removeEventListener("change", handleDensityChange);
      window.removeEventListener("resize", scheduleDraw);
    };
  }, [name, strength, compact]);

  return (
    <div className={`manual-patch-preview ${compact ? "manual-patch-preview-compact" : ""}`} role="img" aria-label={`${name}, ${strength}, patch`}>
      <img src={blankPatchPackageReference} alt="" draggable={false} />
      <canvas ref={labelCanvasRef} className="manual-patch-label" aria-hidden="true" />
    </div>
  );
}

function ManualCapsulePreview({
  name,
  strength,
  palette,
  compact = false,
  flatLabel = false,
}: {
  name: string;
  strength: string;
  palette?: VialPalette;
  compact?: boolean;
  flatLabel?: boolean;
}) {
  const labelCanvasRef = useRef<HTMLCanvasElement>(null);
  const desiredLineCount = name.length > 56 ? 4 : name.length > 36 ? 3 : name.length > 18 ? 2 : 1;
  const capsuleNameTokens = name.replaceAll("/", "/ ").trim().split(/\s+/).filter(Boolean);
  const capsuleNameLines = capsuleNameTokens.reduce<string[]>((lines, token) => {
    if (desiredLineCount === 1) return [name];
    const currentLine = lines.at(-1) ?? "";
    const targetLength = Math.ceil(name.length / desiredLineCount);
    if (currentLine && `${currentLine} ${token}`.length > targetLength && lines.length < desiredLineCount) {
      lines.push(token);
    } else if (lines.length === 0) {
      lines.push(token);
    } else {
      lines[lines.length - 1] = `${currentLine} ${token}`;
    }
    return lines;
  }, []);

  useEffect(() => {
    let cancelled = false;
    let drawFrame = 0;

    const drawLabel = () => {
      const canvas = labelCanvasRef.current;
      if (!canvas || cancelled) return;
      const bounds = canvas.getBoundingClientRect();
      if (bounds.width <= 0 || bounds.height <= 0) return;
      const pixelDensity = compact ? Math.max(4, window.devicePixelRatio || 1) : Math.min(3, Math.max(2, window.devicePixelRatio || 1));
      canvas.width = Math.max(1, Math.round(bounds.width * pixelDensity));
      canvas.height = Math.max(1, Math.round(bounds.height * pixelDensity));
      const context = canvas.getContext("2d");
      if (!context) return;
      const width = canvas.width;
      const height = canvas.height;
      const renderScale = width / 900;
      const source = document.createElement("canvas");
      source.width = width;
      source.height = height;
      const sourceContext = source.getContext("2d");
      if (!sourceContext) return;
      const fitFont = (text: string, maxWidth: number, maximum: number, minimum: number) => {
        sourceContext.font = `400 ${maximum}px "Bebas Neue", Impact, sans-serif`;
        const measured = Math.max(sourceContext.measureText(text.toUpperCase()).width, 1);
        return Math.max(minimum, Math.min(maximum, maximum * maxWidth / measured));
      };

      sourceContext.clearRect(0, 0, width, height);
      const maximumNameSize = [174, 150, 118, 94][capsuleNameLines.length - 1] ?? 94;
      const minimumNameSize = capsuleNameLines.length >= 4 ? 46 : 58;
      const nameSize = Math.min(...capsuleNameLines.map(line => fitFont(line, width * 0.74, maximumNameSize * renderScale, minimumNameSize * renderScale)));
      sourceContext.font = `400 ${nameSize}px "Bebas Neue", Impact, sans-serif`;
      sourceContext.fillStyle = "#080808";
      sourceContext.textAlign = "left";
      sourceContext.textBaseline = "top";
      const lineLayout = {
        1: { top: 0.285, gap: 0 },
        2: { top: 0.19, gap: 0.185 },
        3: { top: 0.095, gap: 0.15 },
        4: { top: 0.045, gap: 0.12 },
      }[capsuleNameLines.length] ?? { top: 0.045, gap: 0.12 };
      capsuleNameLines.forEach((line, index) => {
        sourceContext.save();
        sourceContext.translate(width * 0.11, height * (lineLayout.top + index * lineLayout.gap));
        sourceContext.scale(0.96, 1.16);
        sourceContext.fillText(line.toUpperCase(), 0, 0);
        sourceContext.globalCompositeOperation = "destination-out";
        sourceContext.lineWidth = Math.max(0.8, 2.4 * renderScale);
        sourceContext.strokeStyle = "#000";
        sourceContext.strokeText(line.toUpperCase(), 0, 0);
        sourceContext.restore();
      });

      const bandX = width * 0.06;
      const bandY = height * 0.675;
      const bandWidth = width * 0.88;
      const bandHeight = height * 0.185;
      const mainBandWidth = bandWidth * 0.875;
      const colors = {
        start: palette?.start ?? "#581C3B",
        middle: palette?.middle ?? "#7D2D59",
        end: palette?.end ?? "#B690C8",
        mark: palette?.mark ?? "#B690C8",
        foreground: palette?.foreground ?? "#F1C9A8",
      };
      if (flatLabel) {
        sourceContext.fillStyle = colors.middle;
      } else {
        const bandGradient = sourceContext.createLinearGradient(bandX, 0, bandX + mainBandWidth, 0);
        bandGradient.addColorStop(0, colors.start);
        bandGradient.addColorStop(0.24, colors.start);
        bandGradient.addColorStop(0.55, colors.middle);
        bandGradient.addColorStop(0.86, colors.end);
        bandGradient.addColorStop(1, colors.end);
        sourceContext.fillStyle = bandGradient;
      }
      sourceContext.fillRect(bandX, bandY, mainBandWidth, bandHeight);
      const markX = bandX + mainBandWidth;
      const markWidth = bandWidth - mainBandWidth;
      sourceContext.fillStyle = flatLabel ? colors.middle : colors.mark;
      [[0, .5, .24, .5], [.24, 0, .15, .5], [.39, 0, .16, 1], [.55, .5, .16, .5], [.71, 0, .17, .5], [.88, .5, .12, .5]].forEach(([x, y, w, h]) => {
        sourceContext.fillRect(markX + markWidth * x, bandY + bandHeight * y, markWidth * w + 1, bandHeight * h);
      });
      const strengthSize = fitFont(strength, mainBandWidth * 0.72, 68 * renderScale, 34 * renderScale);
      sourceContext.font = `400 ${strengthSize}px "Bebas Neue", Impact, sans-serif`;
      sourceContext.fillStyle = colors.foreground;
      sourceContext.textBaseline = "middle";
      sourceContext.fillText(strength.toUpperCase(), bandX + mainBandWidth * 0.075, bandY + bandHeight * 0.53);

      context.clearRect(0, 0, width, height);
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
      const thetaMax = 0.5;
      const sinMax = Math.sin(thetaMax);
      const curveDepth = 18 * renderScale;
      for (let sourceX = 0; sourceX < width; sourceX += 1) {
        const nextSourceX = Math.min(sourceX + 1, width);
        const normalizedX = (sourceX / width - 0.5) * 2;
        const nextNormalizedX = (nextSourceX / width - 0.5) * 2;
        const destinationX = width * 0.5 + Math.sin(normalizedX * thetaMax) / sinMax * width * 0.5;
        const nextDestinationX = width * 0.5 + Math.sin(nextNormalizedX * thetaMax) / sinMax * width * 0.5;
        const centerAmount = 1 - normalizedX * normalizedX;
        context.drawImage(source, sourceX, 0, 1, height, destinationX - 0.5, curveDepth * (centerAmount - 0.42), nextDestinationX - destinationX + 1, height * (1 + centerAmount * 0.007));
      }
    };

    const scheduleDraw = () => {
      window.cancelAnimationFrame(drawFrame);
      drawFrame = window.requestAnimationFrame(drawLabel);
    };
    const canvas = labelCanvasRef.current;
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(scheduleDraw);
    if (canvas) observer?.observe(canvas);
    window.addEventListener("resize", scheduleDraw);
    document.fonts?.load('400 150px "Bebas Neue"').then(scheduleDraw).catch(() => undefined);
    scheduleDraw();
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(drawFrame);
      observer?.disconnect();
      window.removeEventListener("resize", scheduleDraw);
    };
  }, [name, strength, palette, compact, flatLabel]);

  return (
    <div className={`manual-capsule-preview ${compact ? "manual-capsule-preview-compact" : ""}`} role="img" aria-label={`${name}, ${strength}, capsule`}>
      <img src={blankCapsuleBottleReference} alt="" draggable={false} />
      <div className="manual-capsule-label" aria-hidden="true">
        <canvas ref={labelCanvasRef} className="manual-capsule-art" />
      </div>
    </div>
  );
}

function ProductDetailPage({
  onNavigate,
  cartMode,
  setCartMode,
  onAddToPatientCart,
  onUpdatePatientCartQuantity,
  product,
  extraVariants,
  catalogType,
}: {
  onNavigate: (p: Page) => void;
  cartMode: CartMode;
  setCartMode: (mode: CartMode) => void;
  onAddToPatientCart: (entries: PatientCartEntry[]) => void;
  onUpdatePatientCartQuantity: (productId: number, patientId: number, quantity: number) => void;
  product: CardDef;
  extraVariants: boolean;
  catalogType?: "503A" | "503B";
}) {
  const is503B = catalogType === "503B";
  const [enrollmentFormOpen, setEnrollmentFormOpen] = useState(false);
  const [completedEnrollments, setCompletedEnrollments] = useState<Set<string>>(() => new Set(["1st Choice Compounding Pharmacy"]));
  const isCompoundProduct = product.name.includes("/");
  const isTirzepatidePyridoxine = product.name.toLowerCase().includes("tirzepatide") && product.name.toLowerCase().includes("pyridoxine");
  const defaultSize = product.dosage === "Gel" ? "30g Tube" : product.dosage === "Capsule" ? "30 Capsules" : product.dosage === "Nasal Spray" ? "1 (10mL) Bottle" : product.dosage === "Topical" ? "1 (30mL) Bottle" : product.dosage === "Patch" ? "30 Patches" : isTirzepatidePyridoxine ? "1 (0.5mL) Vial" : "1 (5mL) Vial";
  const defaultStrength = product.strength ?? (isTirzepatidePyridoxine ? "20mg/25mg/mL" : isCompoundProduct ? "15mg/40mg/250mg/mL" : product.price.includes("mg") ? product.price : product.dosage === "Gel" ? "0.025%" : "5mg/mL");
  const [size, setSize] = useState(defaultSize);
  const [strength, setStrength] = useState(defaultStrength);
  const [injType, setInjType] = useState(product.dosage === "Injection" ? "Intramuscular" : product.dosage);
  const [pharmacy, setPharmacy] = useState(product.pharmacy);
  const [qty, setQty] = useState(1);
  const [suppliesOpen, setSuppliesOpen] = useState(false);
  const [supplyQty, setSupplyQty] = useState(1);
  const [patientPickerOpen, setPatientPickerOpen] = useState(false);
  const [createPatientOpen, setCreatePatientOpen] = useState(false);
  const [patientSearch, setPatientSearch] = useState("");
  const [paymentChoice, setPaymentChoice] = useState<"patient" | "clinic" | "card">("patient");
  const [shippingChoice, setShippingChoice] = useState<"patient" | "clinic">("clinic");
  const [selectedPatientIds, setSelectedPatientIds] = useState<Set<number>>(new Set());
  const [patientQuantities, setPatientQuantities] = useState<Record<number, number>>({});
  const [addedPatientQuantities, setAddedPatientQuantities] = useState<Record<number, number>>({});
  const [expandedPatientIds, setExpandedPatientIds] = useState<Set<number>>(new Set());
  const [addedItemCount, setAddedItemCount] = useState<number | null>(null);
  const [lastAddedItemCount, setLastAddedItemCount] = useState<number | null>(null);
  const [deliveryState, setDeliveryState] = useState("Florida");
  const [locationMenuOpen, setLocationMenuOpen] = useState(false);
  const [activeInfoTab, setActiveInfoTab] = useState<"overview" | "formula" | "dosage" | "safety">("overview");
  const [productDetailVariant, setProductDetailVariant] = useState<1 | 2 | 3 | 4 | 5 | 6>(6);
  const [questionModalOpen, setQuestionModalOpen] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountApplying, setDiscountApplying] = useState(false);
  const configurationCardRef = useRef<HTMLDivElement>(null);
  const [productCardHeight, setProductCardHeight] = useState(825);
  const { addCartItems, updateCartItemQty } = useCartSummary();
  const { runWithAppLoader, showToast } = useAppLoading();

  useEffect(() => {
    setSize(defaultSize);
    setStrength(defaultStrength);
    setInjType(product.dosage === "Injection" ? "Intramuscular" : product.dosage);
    setPharmacy(product.pharmacy);
    setQty(1);
    setPaymentChoice("patient");
    setShippingChoice("clinic");
    setSelectedPatientIds(new Set());
    setPatientQuantities({});
    setAddedPatientQuantities({});
    setExpandedPatientIds(new Set());
    setAddedItemCount(null);
    setLastAddedItemCount(null);
    setQuestionModalOpen(false);
    setQuestionText("");
    setDiscountApplied(false);
    setDiscountApplying(false);
  }, [defaultSize, defaultStrength, product.dosage, product.id, product.pharmacy]);

  useEffect(() => {
    if (!extraVariants) setProductDetailVariant(6);
  }, [extraVariants]);

  useLayoutEffect(() => {
    if (configurationCardRef.current) {
      setProductCardHeight(configurationCardRef.current.offsetHeight);
    }
  }, [cartMode]);

  const baseProductPrice = Number.parseFloat(product.price.replace(/[^0-9.]/g, "")) || 35.88;
  const deliveryStates = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
    "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
    "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri",
    "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York",
    "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island",
    "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
    "West Virginia", "Wisconsin", "Wyoming",
  ];
  const sizeCatalog = isTirzepatidePyridoxine
    ? ["1 (0.5mL) Vial", "1 (1mL) Vial", "1 (2mL) Vial", "1 (3mL) Vial", "1 (5mL) Vial", "1 (10mL) Vial", "2 (0.5mL) Vials", "2 (1mL) Vials", "2 (2mL) Vials", "2 (5mL) Vials"]
    : product.dosage === "Nasal Spray"
    ? ["1 (5mL) Bottle", "1 (10mL) Bottle", "1 (15mL) Bottle", "1 (20mL) Bottle", "2 (5mL) Bottles", "2 (10mL) Bottles", "3 (5mL) Bottles", "3 (10mL) Bottles"]
    : product.dosage === "Gel"
    ? ["10g Tube", "15g Tube", "20g Tube", "30g Tube", "45g Tube", "60g Tube", "75g Tube", "90g Tube", "15g Pump", "30g Pump", "45g Pump", "60g Pump", "75g Pump", "90g Pump", "120g Pump"]
    : product.dosage === "Capsule"
    ? ["15 Capsules", "20 Capsules", "30 Capsules", "40 Capsules", "45 Capsules", "50 Capsules", "60 Capsules", "75 Capsules", "90 Capsules", "100 Capsules", "120 Capsules", "150 Capsules", "180 Capsules", "240 Capsules", "360 Capsules"]
    : ["1 (1mL) Vial", "1 (2mL) Vial", "1 (3mL) Vial", "1 (5mL) Vial", "1 (10mL) Vial", "1 (15mL) Vial", "1 (20mL) Vial", "1 (30mL) Vial", "2 (2mL) Vials", "2 (5mL) Vials", "2 (10mL) Vials", "3 (5mL) Vials", "4 (2mL) Vials", "5 (1mL) Vials", "6 (1mL) Vials"];
  const strengthCatalog = isTirzepatidePyridoxine
    ? ["5mg/6.25mg/mL", "7.5mg/9.4mg/mL", "10mg/12.5mg/mL", "12.5mg/15mg/mL", "15mg/18.75mg/mL", "17.5mg/22mg/mL", "20mg/25mg/mL", "22.5mg/28mg/mL", "25mg/31.25mg/mL", "30mg/37.5mg/mL"]
    : product.dosage === "Gel"
    ? ["0.005%", "0.01%", "0.015%", "0.02%", "0.025%", "0.03%", "0.04%", "0.05%", "0.06%", "0.075%", "0.08%", "0.1%", "0.125%", "0.15%", "0.2%"]
    : product.dosage === "Capsule"
    ? ["2.5mg", "5mg", "7.5mg", "10mg", "12.5mg", "15mg", "20mg", "25mg", "30mg", "40mg", "50mg", "75mg", "100mg", "150mg", "200mg"]
    : isCompoundProduct
    ? ["5mg/20mg/100mg/mL", "7.5mg/25mg/125mg/mL", "10mg/30mg/150mg/mL", "12.5mg/35mg/200mg/mL", "15mg/40mg/250mg/mL", "17.5mg/45mg/275mg/mL", "20mg/50mg/300mg/mL", "22.5mg/60mg/350mg/mL", "25mg/75mg/400mg/mL", "30mg/80mg/450mg/mL", "35mg/90mg/500mg/mL", "40mg/100mg/550mg/mL", "45mg/110mg/600mg/mL", "50mg/125mg/650mg/mL", "60mg/150mg/750mg/mL"]
    : ["0.5mg/mL", "1mg/mL", "2mg/mL", "2.5mg/mL", "5mg/mL", "7.5mg/mL", "10mg/mL", "12.5mg/mL", "15mg/mL", "20mg/mL", "25mg/mL", "30mg/mL", "40mg/mL", "50mg/mL", "100mg/mL"];
  const rotateOptions = (options: string[], offset: number) => [
    ...options.slice(offset % options.length),
    ...options.slice(0, offset % options.length),
  ];
  const sizeOptionCount = 10 + ((product.id * 7) % 6);
  const strengthOptionCount = 10 + ((product.id * 11 + 3) % 6);
  const sizeOptions = [defaultSize, ...rotateOptions(sizeCatalog, product.id * 3)]
    .filter((option, index, list) => list.indexOf(option) === index)
    .slice(0, sizeOptionCount);
  const strengthOptions = [defaultStrength, ...rotateOptions(strengthCatalog, product.id * 5)]
    .filter((option, index, list) => list.indexOf(option) === index)
    .slice(0, strengthOptionCount);
  const usesWideStrengthCards = strengthOptions.some(option => option.length > 16);
  const sizePriceAdjustment = (Math.max(sizeOptions.indexOf(size), 0) - Math.max(sizeOptions.indexOf(defaultSize), 0)) * 10;
  const strengthPriceAdjustment = (Math.max(strengthOptions.indexOf(strength), 0) - Math.max(strengthOptions.indexOf(defaultStrength), 0)) * 5;
  const configurationPriceAdjustment = sizePriceAdjustment + strengthPriceAdjustment;
  const pharmacies = [
    { name: is503B ? "1st Choice Compounding Pharmacy" : product.pharmacy, turnaround: "1-2 business days", price: baseProductPrice },
    { name: !is503B && product.pharmacy === "Rush Pharmacy FL" ? "Optimal Balance Pharmacy" : "Rush Pharmacy FL", turnaround: "1-2 business days", price: baseProductPrice + 20 },
  ];
  const selectedPharmacy = pharmacies.find(option => option.name === pharmacy) ?? pharmacies[0];
  // Demo enrollment is specific to the pharmacy; replace with the doctor's account status.
  const enrolled503BPharmacies = completedEnrollments;
  const requires503BEnrollment = is503B && !enrolled503BPharmacies.has(selectedPharmacy.name);
  const configuredPrice = Math.max(0, selectedPharmacy.price + configurationPriceAdjustment);
  const priceChangeKey = `${size}-${strength}-${pharmacy}`;
  const selectedPatientCount = selectedPatientIds.size;
  const selectedItemCount = is503B ? qty : [...selectedPatientIds].reduce((sum, id) => sum + (patientQuantities[id] ?? 1), 0);
  const addedItemTotal = Object.values(addedPatientQuantities).reduce((sum, quantity) => sum + quantity, 0);
  const visiblePatientIds = [...new Set([...Object.keys(addedPatientQuantities).map(Number), ...selectedPatientIds])];
  const isMultiPatientOrder = cartMode === "multi" && selectedPatientIds.size > 1;
  const patientMatches = PATIENTS
    .map((patient, id) => ({ patient, id }))
    .filter(({ patient }) => {
      const query = patientSearch.trim().toLowerCase();
      return !query || `${patient.firstName} ${patient.lastName} ${patient.birthDate} ${patient.primaryPhone}`.toLowerCase().includes(query);
    })
    .slice(0, 6);

  function togglePatient(id: number) {
    setAddedItemCount(null);
    setSelectedPatientIds(current => {
      if (shippingChoice === "patient" && !current.has(id)) {
        setPatientQuantities({ [id]: 1 });
        return new Set([id]);
      }
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
        setPatientQuantities(quantities => {
          const updated = { ...quantities };
          delete updated[id];
          return updated;
        });
      } else {
        next.add(id);
        setPatientQuantities(quantities => ({ ...quantities, [id]: quantities[id] ?? 1 }));
      }
      return next;
    });
  }

  function selectShippingChoice(choice: "patient" | "clinic") {
    setShippingChoice(choice);
    setAddedItemCount(null);
    if (choice === "patient" && selectedPatientIds.size > 1) {
      const firstPatientId = [...selectedPatientIds][0];
      setSelectedPatientIds(new Set([firstPatientId]));
      setPatientQuantities(current => ({ [firstPatientId]: current[firstPatientId] ?? 1 }));
      setExpandedPatientIds(current => new Set(current.has(firstPatientId) ? [firstPatientId] : []));
    }
  }

  function updatePatientQuantity(id: number, change: number) {
    setPatientQuantities(current => ({
      ...current,
      [id]: Math.max(1, (current[id] ?? 1) + change),
    }));
  }

  function updateAddedPatientQuantity(id: number, change: number) {
    const currentQuantity = addedPatientQuantities[id] ?? 1;
    const nextQuantity = Math.max(0, currentQuantity + change);
    setAddedPatientQuantities(current => {
      const next = { ...current };
      if (nextQuantity === 0) delete next[id];
      else next[id] = nextQuantity;
      const nextTotal = Object.values(next).reduce((sum, quantity) => sum + quantity, 0);
      setLastAddedItemCount(nextTotal || null);
      return next;
    });
    updateCartItemQty(product.id, change);
    onUpdatePatientCartQuantity(product.id, id, nextQuantity);
  }

  function togglePatientDetails(id: number) {
    setExpandedPatientIds(current => {
      const next = new Set(current);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function addToCart() {
    if (requires503BEnrollment) return;
    if (!is503B && selectedPatientCount === 0) return;
    const nextCartMode: CartMode = selectedPatientCount > 1 ? "multi" : "single";
    if (!is503B) setCartMode(nextCartMode);
    const itemCount = Math.max(selectedItemCount, 1);
    runWithAppLoader(() => {
      addCartItems(itemCount, {
        id: product.id,
        catalogType,
        name: product.name,
        price: `$${configuredPrice.toFixed(2)}`,
        img: product.img,
        qty: itemCount,
      });
      onAddToPatientCart(is503B ? [{
        id: Date.now(), patientId: null, catalogType: "503B", product,
        qty: itemCount, pharmacy: selectedPharmacy.name, size, strength,
        injectionType: "", unitPrice: configuredPrice,
      }] : [...selectedPatientIds].map((patientId, index) => ({
        id: Date.now() + index,
        patientId,
        catalogType,
        product,
        qty: patientQuantities[patientId] ?? 1,
        pharmacy: selectedPharmacy.name,
        size,
        strength,
        injectionType: injType,
        unitPrice: configuredPrice,
      })));
      setAddedPatientQuantities(current => {
        const next = { ...current };
        selectedPatientIds.forEach(patientId => {
          next[patientId] = (next[patientId] ?? 0) + (patientQuantities[patientId] ?? 1);
        });
        return next;
      });
      setAddedItemCount(itemCount);
      setLastAddedItemCount(itemCount);
      setSize(defaultSize);
      setStrength(defaultStrength);
      setInjType(product.dosage === "Injection" ? "Intramuscular" : product.dosage);
      setPharmacy(product.pharmacy);
      setQty(1);
      setSuppliesOpen(false);
      setPatientPickerOpen(false);
      setPatientSearch("");
      setSelectedPatientIds(new Set());
      setPatientQuantities({});
      setExpandedPatientIds(new Set());
      showToast(is503B ? "Product added to 503B cart" : "Product added to cart");
      window.setTimeout(() => setAddedItemCount(null), 1600);
    });
  }

  const isReferenceStyle = productDetailVariant === 5 || productDetailVariant === 6;
  const isBlueReference = productDetailVariant === 6;
  const similarProducts = ALL_CARDS.filter(candidate => candidate.id !== product.id && candidate.dosage === product.dosage).slice(0, 4);

  return (
    <>
      <div className="pl-[15px]">
      <div className="-mt-4 mb-[39px]">
        <div className="flex items-start gap-3">
          {isReferenceStyle && (
            <PageBackButton onClick={() => onNavigate("products")} label="Back to catalog" />
          )}
          <div>
            <h1 className="text-[32px] font-medium leading-tight text-[#111]">Products</h1>
            <p className="mt-2 text-[11px] font-normal text-[#4b4b4b]">
              <button onClick={() => onNavigate("products")} className="text-[11px] font-normal hover:underline">Home</button>, <button onClick={() => onNavigate("products")} className="text-[11px] font-normal hover:underline">Catalog</button>, <span className="text-[11px] font-normal">{product.name}</span>
            </p>
          </div>
        </div>
      </div>
      {extraVariants && <div className="mb-5 flex flex-wrap items-center gap-2">
        <span className="mr-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#777]">Page style</span>
        {([1, 2, 3, 4, 5, 6] as const).map(variant => (
          <button key={variant} onClick={() => setProductDetailVariant(variant)} className={`h-8 rounded-full px-3 text-[11px] font-semibold transition-colors ${productDetailVariant === variant ? "bg-[#111] text-white" : "border border-[#ddd] bg-white text-[#555] hover:border-[#999]"}`}>
            {variant}. {variant === 1 ? "Apple" : variant === 2 ? "Selection" : variant === 3 ? "Card Selection" : variant === 4 ? "Green" : variant === 5 ? "Reference" : "Blue"}
          </button>
        ))}
      </div>}
      <div className={`grid max-w-[1180px] items-start gap-10 ${isReferenceStyle ? "xl:grid-cols-[minmax(0,1.1fr)_minmax(480px,0.9fr)]" : "xl:grid-cols-[minmax(0,1.244fr)_minmax(0,1fr)]"}`}>
        <div className="min-w-0">
          <div className={`relative flex h-[600px] items-center justify-center overflow-hidden rounded-[18px] p-16 ${isReferenceStyle ? "bg-[#fafafa]" : `border border-[#e4e4e4] ${productDetailVariant === 2 ? "bg-[#fbfdfc]" : "bg-[#f8f8f8]"}`}`}>
            {product.img === blankVialReference || product.img === blankLyophilizedVialReference ? (
              <ManualVialPreview name={product.name} strength={strength} size={size} palette={product.vialPalette} baseImage={product.img} />
            ) : product.img === blankNasalSprayReference ? (
              <ManualNasalSprayPreview name={product.name} strength={strength} palette={product.vialPalette} />
            ) : product.img === blankTopicalDropperReference ? (
              <ManualNasalSprayPreview name={product.name} strength={strength} palette={product.vialPalette} baseImage={product.img} variant="topical" />
            ) : product.img === blankPatchPackageReference ? (
              <ManualPatchPreview name={product.name} strength={strength} />
            ) : product.img === blankCapsuleBottleReference ? (
              <ManualCapsulePreview name={product.name} strength={strength} palette={product.vialPalette} />
            ) : (
              <img src={product.img} alt={product.name} className="max-h-[470px] h-full w-full object-contain mix-blend-multiply" />
            )}
          </div>
          <div className="mt-7 flex flex-wrap gap-2">
            {[
              { label: "Sterile", icon: Syringe },
              { label: "Refrigerated", icon: Snowflake },
              { label: "Controlled Substance", icon: Lock },
              { label: "Protect from Light", icon: EyeOff },
            ].map(({ label, icon: Icon }) => (
              <span key={label} className="inline-flex items-center gap-2 rounded-full border border-[#202020] bg-white px-4 py-2 text-[12px] font-medium text-[#202020]">
                <Icon size={15} strokeWidth={1.7} />
                {label}
              </span>
            ))}
          </div>
        </div>

        <div ref={configurationCardRef} className="min-w-0 -mt-[23px]">
          {isReferenceStyle ? (
            <h1 className="text-left text-[32px] font-medium leading-tight tracking-[-0.02em] text-[#111]">{product.name}</h1>
          ) : (
            <h1 className="text-[30px] font-medium leading-tight text-[#111]">{product.name}</h1>
          )}
          <p className="mt-1.5 max-w-[500px] text-[13px] leading-[1.45] text-[#666]">A compounded {product.dosage.toLowerCase()} developed for personalized {product.areaOfTreatment.toLowerCase()} treatment and patient care.</p>
          <div key={priceChangeKey} className="mt-3 flex animate-[pulse_600ms_ease-out_1] items-center rounded-[7px]">
            <p className="text-[25px] font-medium text-[#111]">${configuredPrice.toFixed(2)}</p>
          </div>
          {isReferenceStyle && (
            <button
              type="button"
              onClick={() => setQuestionModalOpen(true)}
              className="mt-2 cursor-pointer text-[11px] font-medium text-[#333] underline decoration-[#999] underline-offset-4 transition-colors hover:text-black hover:decoration-black"
            >
              Ask a question?
            </button>
          )}

          <div className={`${isReferenceStyle ? "mt-6" : "mt-2 border-t border-[#ededed] pt-2"}`}>
            <div className={isReferenceStyle ? "mb-3 flex items-center gap-3" : ""}><p className={`${isReferenceStyle ? "shrink-0 text-[12px] font-medium" : "mb-2 text-[12px] font-medium"} text-[#111]`}>Size</p>{isReferenceStyle && <span className="h-px flex-1 bg-[#e5e5e5]" />}</div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 [&>button]:w-full [&>button]:min-w-0">
              {sizeOptions.map(option => <OptionPill key={option} label={option} selected={size === option} onClick={() => setSize(option)} emphasis={productDetailVariant === 2} card={productDetailVariant === 3} tesla={isReferenceStyle} blue={isBlueReference} tone={productDetailVariant === 4 ? "green" : "apple"} />)}
            </div>
          </div>

          <div className={`${isReferenceStyle ? "mt-5" : "mt-3 border-t border-[#ededed] pt-2"}`}>
            <div className={isReferenceStyle ? "mb-3 flex items-center gap-3" : ""}><p className={`${isReferenceStyle ? "shrink-0 text-[12px] font-medium" : "mb-2 text-[12px] font-medium"} text-[#111]`}>Strength</p>{isReferenceStyle && <span className="h-px flex-1 bg-[#e5e5e5]" />}</div>
            <div className={`grid grid-cols-2 gap-1.5 [&>button]:w-full [&>button]:min-w-0 ${usesWideStrengthCards ? "[&>button]:h-[58px]" : "sm:grid-cols-4"}`}>
              {strengthOptions.map(option => <OptionPill key={option} label={option} subLabel={isCompoundProduct ? "Combined strength" : "150mg total"} selected={strength === option} onClick={() => setStrength(option)} emphasis={productDetailVariant === 2} card={productDetailVariant === 3} tesla={isReferenceStyle} blue={isBlueReference} tone={productDetailVariant === 4 ? "green" : "apple"} />)}
            </div>
          </div>

          {!discountApplied && (
            <div className={`${isReferenceStyle ? "mt-6" : "mt-4"} w-[226px] max-w-full rounded-[14px] border border-white/80 bg-[radial-gradient(circle_at_90%_0%,rgba(219,232,255,0.98),transparent_52%),linear-gradient(145deg,#f8fbff_0%,#edf4ff_100%)] p-3 shadow-[0_10px_28px_rgba(37,99,235,0.08)]`}>
              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-white/55 text-[#2563EB]">
                  <Tag size={14} strokeWidth={1.9} />
                </span>
                <div className="min-w-0">
                  <p className="text-[14px] font-semibold leading-[18px] tracking-[-0.02em] text-[#171717]">$25 coupon is ready</p>
                  <p className="mt-1 text-[11px] font-medium leading-[15px] text-[#68736d]">1 active coupon is ready for this product.</p>
                </div>
              </div>
              <button
                type="button"
                disabled={discountApplying}
                onClick={() => {
                  setDiscountApplying(true);
                  window.setTimeout(() => {
                    setDiscountApplied(true);
                    setDiscountApplying(false);
                    showToast("Coupon applied");
                  }, 1000);
                }}
                className="mt-3 flex h-9 w-full items-center justify-center gap-2 rounded-full bg-white text-[11px] font-semibold text-[#171717] shadow-[0_1px_0_rgba(24,50,41,0.04)] transition-colors hover:bg-[#fbfbfb] disabled:cursor-wait disabled:text-[#68736d]"
              >
                {discountApplying && <Loader2 size={13} className="animate-spin text-[#2563EB]" />}
                {discountApplying ? "Applying" : "Apply discount"}
              </button>
            </div>
          )}

          {!is503B && (
          <div className={`${isReferenceStyle ? "mt-5" : "mt-3 border-t border-[#ededed] pt-2"}`}>
            <div className={isReferenceStyle ? "mb-3 flex items-center gap-3" : ""}><p className={`${isReferenceStyle ? "shrink-0 text-[12px] font-medium" : "mb-2 text-[12px] font-medium"} text-[#111]`}>{product.dosage === "Injection" ? "Injection Type" : "Form"}</p>{isReferenceStyle && <span className="h-px flex-1 bg-[#e5e5e5]" />}</div>
            <div className="flex flex-wrap gap-2">
              {(product.dosage === "Injection" ? ["Subcutaneous", "Intramuscular"] : [product.dosage]).map(option => <OptionPill key={option} label={option} selected={injType === option} onClick={() => setInjType(option)} emphasis={productDetailVariant === 2} card={productDetailVariant === 3} tesla={isReferenceStyle} blue={isBlueReference} tone={productDetailVariant === 4 ? "green" : "apple"} />)}
            </div>
          </div>
          )}

          <div className={`${isReferenceStyle ? "mt-5" : "mt-3 border-t border-[#ededed] pt-2"}`}>
            <div className={isReferenceStyle ? "mb-3 flex items-center gap-3" : ""}><p className={`${isReferenceStyle ? "shrink-0 text-[12px] font-medium" : "mb-2 text-[12px] font-medium"} text-[#111]`}>Pharmacy</p>{isReferenceStyle && <span className="h-px flex-1 bg-[#e5e5e5]" />}</div>
            <div className="space-y-2">
              {pharmacies.slice(0, 2).map(option => {
                const selected = selectedPharmacy.name === option.name;
                const outlineSelected = productDetailVariant === 4
                  ? "border-2 border-[#00B53F] bg-white shadow-[0_0_0_3px_rgba(0,181,63,0.10)]"
                  : productDetailVariant === 1
                  ? "border-[3px] border-[#4485FF] bg-white"
                  : isBlueReference
                  ? "border-2 border-[#2563EB] bg-white"
                  : isReferenceStyle
                  ? "border-2 border-[#171a20] bg-white"
                  : "border-[#183229] bg-[#eef7f2] shadow-[0_8px_18px_rgba(24,50,41,0.08)]";
                return (
                  <button key={option.name} onClick={() => { setPharmacy(option.name); setEnrollmentFormOpen(false); setAddedItemCount(null); }} className={`relative grid w-full grid-cols-[minmax(0,1fr)_90px] items-center border px-3 text-left transition-colors ${isReferenceStyle ? "min-h-[58px] rounded-[8px] py-2.5" : "rounded-[8px] py-3"} ${selected && productDetailVariant === 2 ? "border-[#183229] bg-[#183229] text-white shadow-[0_8px_18px_rgba(24,50,41,0.16)]" : selected ? outlineSelected : "border-[#bdbdbd] bg-white hover:border-[#555]"}`}>
                    {selected && isReferenceStyle && <CheckCircle2 size={18} strokeWidth={2.2} className={`absolute -right-2 -top-2 text-white ${isBlueReference ? "fill-[#2563EB]" : "fill-black"}`} />}
                    <span className="min-w-0">
                      <span className={`flex items-center gap-1.5 truncate text-[12px] font-medium ${selected && productDetailVariant === 2 ? "text-white" : "text-[#111]"}`}>
                        {selected && productDetailVariant === 2 && <CheckCircle2 size={13} className="shrink-0 text-white" />}
                        {option.name}
                      </span>
                      <span className={`mt-0.5 block text-[10px] ${selected && productDetailVariant === 2 ? "text-white/70" : "text-[#777]"}`}>BUD: 90 Days</span>
                      {is503B && !enrolled503BPharmacies.has(option.name) && (
                        <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-[#fff3df] px-2 py-0.5 text-[10px] font-medium text-[#916422]">
                          <Lock size={10} />
                          Enrollment required
                        </span>
                      )}
                    </span>
                    <span className="text-right">
                      <span className={`block text-[12px] font-medium ${selected && productDetailVariant === 2 ? "text-white" : "text-[#111]"}`}>${Math.max(0, option.price + configurationPriceAdjustment).toFixed(2)}</span>
                      <span className={`mt-0.5 block whitespace-nowrap text-[10px] leading-tight ${selected && productDetailVariant === 2 ? "text-white/70" : "text-[#777]"}`}>1–2 Days Processing</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {!is503B && (
          <div className={isReferenceStyle ? "mt-5" : "mt-4 border-t border-[#ededed] pt-4"}>
            {isReferenceStyle ? <div className="mb-3 flex items-center gap-3"><p className="shrink-0 text-[12px] font-medium text-[#111]">Shipping</p><span className="h-px flex-1 bg-[#e5e5e5]" /></div> : <><p className="text-[12px] font-medium text-[#111]">Shipping</p><p className="mt-1 text-[12px] text-[#252525]">Choose where to ship the prescription</p></>}
            {selectedPatientCount > 1 && (
              <p className="mt-2 flex items-center gap-1.5 text-[10px] font-medium leading-[14px] text-[#c2413b]"><TriangleAlert size={13} strokeWidth={2} className="shrink-0" />Ship to Patient is disabled due to multiple patients in cart.</p>
            )}
            <div className="mt-3 flex flex-wrap gap-2">
              <button disabled={selectedPatientCount > 1} onClick={() => selectShippingChoice("patient")} className={`relative inline-flex h-9 items-center gap-2 border px-3 text-[11px] font-semibold transition-colors ${isReferenceStyle ? "rounded-[7px]" : "rounded-full"} ${selectedPatientCount > 1 ? "cursor-not-allowed border-[#e0e2e1] bg-[#f7f7f6] text-[#a7aaa8] opacity-70" : shippingChoice === "patient" && productDetailVariant === 2 ? "border-[#183229] bg-[#183229] text-white shadow-[0_8px_18px_rgba(24,50,41,0.16)]" : shippingChoice === "patient" ? (productDetailVariant === 4 ? "border-2 border-[#00B53F] bg-white text-[#202020] shadow-[0_0_0_3px_rgba(0,181,63,0.10)]" : productDetailVariant === 1 ? "border-[3px] border-[#4485FF] bg-white text-[#202020]" : isBlueReference ? "border-2 border-[#2563EB] bg-white text-[#171a20]" : isReferenceStyle ? "border-2 border-[#171a20] bg-white text-[#171a20]" : "border-[#183229] bg-[#eef7f2] text-[#183229]") : "border-[#d8dedd] bg-white text-[#6f7782]"}`}>
                {shippingChoice === "patient" && productDetailVariant === 2 && <CheckCircle2 size={13} />}
                {shippingChoice === "patient" && isReferenceStyle && <CheckCircle2 size={18} strokeWidth={2.2} className={`absolute -right-2 -top-2 text-white ${isBlueReference ? "fill-[#2563EB]" : "fill-black"}`} />}
                <User size={13} strokeWidth={1.8} /> Ship to Patient
              </button>
              <button onClick={() => selectShippingChoice("clinic")} className={`relative inline-flex h-9 items-center gap-2 border px-3 text-[11px] font-semibold transition-colors ${isReferenceStyle ? "rounded-[7px]" : "rounded-full"} ${shippingChoice === "clinic" && productDetailVariant === 2 ? "border-[#183229] bg-[#183229] text-white shadow-[0_8px_18px_rgba(24,50,41,0.16)]" : shippingChoice === "clinic" ? (productDetailVariant === 4 ? "border-2 border-[#00B53F] bg-white text-[#202020] shadow-[0_0_0_3px_rgba(0,181,63,0.10)]" : productDetailVariant === 1 ? "border-[3px] border-[#4485FF] bg-white text-[#202020]" : isBlueReference ? "border-2 border-[#2563EB] bg-white text-[#171a20]" : isReferenceStyle ? "border-2 border-[#171a20] bg-white text-[#171a20]" : "border-[#183229] bg-[#eef7f2] text-[#183229]") : "border-[#d8dedd] bg-white text-[#6f7782]"}`}>
                {shippingChoice === "clinic" && productDetailVariant === 2 && <CheckCircle2 size={13} />}
                {shippingChoice === "clinic" && isReferenceStyle && <CheckCircle2 size={18} strokeWidth={2.2} className={`absolute -right-2 -top-2 text-white ${isBlueReference ? "fill-[#2563EB]" : "fill-black"}`} />}
                <Building2 size={13} strokeWidth={1.8} /> Ship to Clinic
              </button>
            </div>
            <p className="mt-2 text-[10px] text-[#7a837f]">{shippingChoice === "clinic" ? "You can select multiple patients for one clinic shipment." : "You can select one patient for this shipment."}</p>
          </div>
          )}

          {!is503B && visiblePatientIds.length > 0 && (
            <div role="status" aria-live="polite" className="mt-3 overflow-hidden rounded-[11px] border border-[#dbe5f5] bg-white shadow-[0_2px_8px_rgba(37,99,235,0.05)]">
              <div className="flex items-center justify-between border-b border-[#dbe5f5] bg-[#f3f7ff] px-3.5 py-2.5">
                <div>
                  <p className="text-[11px] font-semibold text-[#1a1a1a]">Patients</p>
                  <p className="mt-0.5 text-[9px] text-[#7a837f]">Manage quantities and see who is already in the cart.</p>
                </div>
                <span className="rounded-full bg-[#2563EB] px-2 py-1 text-[9px] font-semibold text-white">{addedItemTotal + selectedItemCount} item{addedItemTotal + selectedItemCount === 1 ? "" : "s"}</span>
              </div>
              <div className="divide-y divide-[#e8ebe9]">
                {visiblePatientIds.map(id => {
                  const patient = PATIENTS[id];
                  const alreadyInCart = addedPatientQuantities[id] !== undefined;
                  const patientQty = alreadyInCart ? addedPatientQuantities[id] : patientQuantities[id] ?? 1;
                  const isExpanded = expandedPatientIds.has(id);
                  const patientAddress = [patient.address1, patient.address2, `${patient.city}, ${patient.state} ${patient.zip}`].filter(Boolean).join(", ");
                  return (
                    <div key={id} className="bg-white px-3.5 py-3 transition-colors hover:bg-[#fcfdfc]">
                      <div className="grid grid-cols-[minmax(0,1fr)_120px] items-center gap-3">
                        <button onClick={() => togglePatientDetails(id)} className="flex min-w-0 items-center gap-2 text-left" aria-expanded={isExpanded}>
                          <span className="min-w-0">
                            <span className="flex items-center gap-2">
                              <span className="block truncate text-[11px] font-semibold text-[#171917]">{patient.firstName} {patient.lastName}</span>
                              {alreadyInCart && <span className="shrink-0 rounded-full bg-[#dbe8ff] px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.04em] text-[#2563eb]">In cart</span>}
                              {!alreadyInCart && <span className="shrink-0 rounded-full bg-[#f1f1f1] px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.04em] text-[#555]">Selected</span>}
                            </span>
                            <span className="mt-0.5 block truncate text-[9px] text-[#7a837f]">DOB {patient.birthDate}</span>
                          </span>
                          <ChevronDown size={13} className={`shrink-0 text-[#777] transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                        </button>
                        <div className="inline-flex h-10 w-fit items-center overflow-hidden rounded-full border border-[#e2e2e2] bg-white">
                          {patientQty === 1 ? (
                            <button onClick={() => alreadyInCart ? updateAddedPatientQuantity(id, -1) : togglePatient(id)} className="flex h-10 w-10 items-center justify-center text-[#202020] transition-colors hover:bg-[#f7f7f7]" aria-label={`Remove ${patient.firstName} ${patient.lastName}`}><Trash2 size={15} /></button>
                          ) : (
                            <button onClick={() => alreadyInCart ? updateAddedPatientQuantity(id, -1) : updatePatientQuantity(id, -1)} className="flex h-10 w-10 items-center justify-center text-[#202020] transition-colors hover:bg-[#f7f7f7]" aria-label={`Decrease quantity for ${patient.firstName}`}><Minus size={16} /></button>
                          )}
                          <span className="flex h-10 w-8 items-center justify-center text-[13px] font-medium text-[#171717]">{patientQty}</span>
                          <button onClick={() => alreadyInCart ? updateAddedPatientQuantity(id, 1) : updatePatientQuantity(id, 1)} className="flex h-10 w-10 items-center justify-center text-[#202020] transition-colors hover:bg-[#f7f7f7]" aria-label={`Increase quantity for ${patient.firstName}`}><Plus size={16} /></button>
                        </div>
                      </div>
                      {isExpanded && (
                        <div className="mt-2 rounded-[8px] border border-[#e4e8e6] bg-[#f7f9f8] px-3 py-2.5 text-[10px] leading-relaxed text-[#666]">
                          <div className="flex items-start gap-2"><MapPin size={12} className="mt-0.5 shrink-0 text-[#333]" /><span>{patientAddress}</span></div>
                          <div className="mt-1.5 flex items-center gap-2"><Phone size={12} className="shrink-0 text-[#333]" /><span>{patient.primaryPhone}</span></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {is503B ? (
            <div className="mt-6">
              <label htmlFor="catalog-503b-quantity" className="mb-2 block text-[12px] font-medium text-[#555]">Quantity</label>
              <div className="flex h-11 w-full items-center overflow-hidden rounded-full border border-[#e2e2e2] bg-white">
                <button type="button" aria-label="Decrease quantity" disabled={qty <= 1} onClick={() => setQty(current => Math.max(1, current - 1))} className="flex h-11 w-11 shrink-0 items-center justify-center text-[#202020] transition-colors hover:bg-[#f7f7f7] disabled:cursor-not-allowed disabled:opacity-40"><Minus size={16} /></button>
                <input id="catalog-503b-quantity" type="number" inputMode="numeric" min={1} step={1} value={qty} onFocus={event => event.currentTarget.select()} onKeyDown={event => { if (event.key === "Enter") event.currentTarget.blur(); }} onChange={event => setQty(Math.max(1, Math.floor(Number(event.target.value) || 1)))} className="h-11 min-w-0 flex-1 bg-transparent text-center text-[13px] font-medium text-[#171717] outline-none focus:bg-[#f7f7f7] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [appearance:textfield]" />
                <button type="button" aria-label="Increase quantity" onClick={() => setQty(current => current + 1)} className="flex h-11 w-11 shrink-0 items-center justify-center text-[#202020] transition-colors hover:bg-[#f7f7f7]"><Plus size={16} /></button>
              </div>
            </div>
          ) : (
          <div className={`relative ${visiblePatientIds.length > 0 ? "mt-3" : "mt-6"}`}>
            {lastAddedItemCount !== null && selectedPatientCount === 0 ? (
              <>
                <button onClick={() => setPatientPickerOpen(current => !current)} className="flex h-11 w-full items-center justify-center gap-2 rounded-full border border-[#d8dce3] bg-white text-[12px] font-medium text-[#111] transition-colors hover:bg-[#f1f1f1]">
                  <Plus size={14} strokeWidth={2} /> Add for another patient
                </button>
                <button onClick={() => onNavigate(is503B ? "cart-503b" : cartMode === "multi" ? "cart-multi" : "cart-single")} className="mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-full border border-[#111] bg-[#111] text-[12px] font-medium text-white transition-colors hover:bg-[#121212]">
                  View cart <ShoppingCart size={14} strokeWidth={1.5} />
                </button>
              </>
            ) : (
              <button onClick={() => setPatientPickerOpen(current => !current)} className="flex h-11 w-full items-center justify-center rounded-full border border-[#111] bg-white text-[12px] font-medium text-[#111] transition-colors hover:bg-[#fafafa]">
                {selectedPatientCount === 0 ? "Choose patient" : shippingChoice === "clinic" ? "Add another patient" : "Change patient"}
              </button>
            )}
            {patientPickerOpen && (
              <div className={`absolute inset-x-0 z-30 overflow-hidden rounded-[10px] border border-[#d8dfdc] bg-white shadow-xl ${lastAddedItemCount !== null && selectedPatientCount === 0 ? "top-[96px]" : "top-12"}`}>
                <div className="flex h-10 items-center gap-2 border-b border-[#e8e3df] px-3">
                  <Search size={14} className="text-[#7b8580]" />
                  <input autoFocus value={patientSearch} onChange={event => setPatientSearch(event.target.value)} placeholder="Search patients" className="min-w-0 flex-1 bg-transparent text-[12px] outline-none" />
                </div>
                <div className="max-h-[220px] overflow-y-auto p-1.5">
                  {patientMatches.map(({ patient, id }) => {
                    const selected = selectedPatientIds.has(id);
                    const alreadyInCart = addedPatientQuantities[id] !== undefined;
                    return (
                      <button key={id} disabled={alreadyInCart} onClick={() => { togglePatient(id); setPatientPickerOpen(false); }} className={`w-full rounded-[7px] px-3 py-2.5 text-left transition-colors ${alreadyInCart ? "cursor-default bg-[#f3f7ff]" : selected ? "bg-[#f3f5f4]" : "hover:bg-[#f8f7f5]"}`}>
                        <span className="flex items-center gap-2">
                          <span className={`block text-[12px] font-semibold ${alreadyInCart || selected ? "text-[#667085]" : "text-[#1a1a1a]"}`}>{patient.firstName} {patient.lastName}</span>
                          {alreadyInCart && <span className="rounded-full bg-[#dbe8ff] px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.04em] text-[#2563eb]">In cart</span>}
                          {selected && !alreadyInCart && <span className="rounded-full bg-[#f1f1f1] px-2 py-0.5 text-[8px] font-bold uppercase tracking-[0.04em] text-[#555]">Selected</span>}
                        </span>
                        <span className={`mt-0.5 block text-[10px] ${alreadyInCart || selected ? "text-[#98a2b3]" : "text-[#777]"}`}>{patient.birthDate} · {patient.gender}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="border-t border-[#e8e3df] p-2">
                  <button onClick={() => { setPatientPickerOpen(false); setCreatePatientOpen(true); }} className="flex h-9 w-full items-center justify-center gap-1.5 rounded-[7px] border border-dashed border-[#9dbbff] bg-[#f3f7ff] text-[11px] font-semibold text-[#2563eb] transition-colors hover:border-[#2563eb] hover:bg-[#eaf1ff]">
                    <Plus size={13} /> Create new patient
                  </button>
                </div>
              </div>
            )}
          </div>
          )}

          {(is503B || !(lastAddedItemCount !== null && selectedPatientCount === 0)) && (
            <button
              onClick={addToCart}
              disabled={requires503BEnrollment || (!is503B && selectedPatientCount === 0)}
              aria-describedby={requires503BEnrollment ? "catalog-503b-enrollment-notice" : undefined}
              className={`mt-2 flex h-11 w-full items-center justify-center gap-2 rounded-full text-[12px] font-medium text-white transition-colors ${addedItemCount !== null ? "bg-[#111] disabled:bg-[#111]" : "bg-[#111] hover:bg-[#121212] disabled:cursor-not-allowed disabled:bg-[#b8b8b8]"}`}
            >
              {requires503BEnrollment
                ? <>Add to cart <Lock size={14} strokeWidth={1.5} /></>
                : addedItemCount !== null
                ? <>Added <Check size={14} strokeWidth={2.2} /></>
                : <>{selectedItemCount > 1 ? `Add ${selectedItemCount} items to cart` : "Add to cart"} <ShoppingCart size={14} strokeWidth={1.5} /></>}
            </button>
          )}

          {requires503BEnrollment && (
            <div id="catalog-503b-enrollment-notice" className="mt-4 rounded-[20px] bg-[linear-gradient(135deg,#fffdf5_0%,#fff0d6_60%,#fbe8da_100%)] p-4">
              <div className="min-w-0">
                <p className="text-[14px] font-semibold text-[#483b24]">Enroll with {selectedPharmacy.name}</p>
                <p className="mt-1.5 text-[12px] leading-5 text-[#78684d]">Complete this pharmacy’s enrollment form before adding products to your cart.</p>
                <button type="button" onClick={() => setEnrollmentFormOpen(true)} aria-haspopup="dialog" className="mt-3 flex h-10 w-full items-center justify-center gap-2 rounded-full bg-white text-[12px] font-semibold text-[#483b24] transition-colors hover:bg-[#fffaf2] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b7791f]">
                  Apply for Enrollment<ArrowUpRight size={14} />
                </button>
              </div>
            </div>
          )}

          <div className="mt-3 overflow-hidden rounded-[9px] bg-[#f7f7f7]">
            <div className="flex h-12 items-center px-4">
              <MapPin size={18} strokeWidth={1.6} className="mr-2 text-[#111]" />
              <span className="text-[9px] leading-tight text-[#777]">Delivered to<br /><strong className="text-[11px] font-semibold text-[#111]">{deliveryState}</strong></span>
              <button onClick={() => setLocationMenuOpen(current => !current)} className="ml-auto text-[10px] font-medium text-[#333] hover:underline">{locationMenuOpen ? "Cancel" : "Change Location"}</button>
            </div>
            {locationMenuOpen && (
              <div className="border-t border-[#e5e5e5] bg-white p-3">
                <label className="mb-1.5 block text-[10px] font-medium text-[#555]">Delivery state</label>
                <div className="relative">
                  <select
                    value={deliveryState}
                    onChange={event => { setDeliveryState(event.target.value); setLocationMenuOpen(false); }}
                    autoFocus
                    className="h-10 w-full appearance-none rounded-[7px] border border-[#cfd3d8] bg-white px-3 pr-9 text-[12px] font-medium text-[#222] outline-none transition-colors focus:border-[#2563EB]"
                  >
                    {deliveryStates.map(state => <option key={state}>{state}</option>)}
                  </select>
                  <ChevronDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#555]" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <section className="mt-9 max-w-[1180px] overflow-hidden rounded-[14px] border border-[#e4e4e4] bg-white">
        <div className="border-b border-[#e8e8e8] px-6 py-4 lg:px-8">
          <p className="text-[12px] font-semibold text-[#2563EB]">About this product</p>
        </div>

        <div className="px-6 py-7 lg:px-8 lg:py-9">
          <h2 className="text-[22px] font-medium tracking-[-0.02em] text-[#171717]">Tesamorelin / Ipamorelin Injection</h2>
          <p className="mt-4 text-[13px] leading-6 text-[#555]">Tesamorelin / Ipamorelin is an advanced synergistic peptide therapy designed to optimize endogenous growth hormone production and improve metabolic health. Tesamorelin targets the reduction of visceral adipose tissue—the metabolically active fat surrounding internal organs—while Ipamorelin provides a highly selective signal to the pituitary gland to increase the strength of the growth hormone “pulse.”</p>
          <p className="mt-3 text-[13px] leading-6 text-[#555]">This combination is a cornerstone of modern longevity and body composition protocols. By activating two separate pathways (GHRH and Ghrelin receptors), this formulation facilitates significant fat loss and supports the preservation of lean muscle tissue. Because it preserves the body's natural regulatory feedback loops, it offers a physiological approach to age-management, improving systemic vitality, sleep quality, and physical recovery.</p>

          <h3 className="mt-8 text-[16px] font-medium text-[#202020]">Product List</h3>
          <div className="mt-3 overflow-x-auto rounded-[10px] border border-[#e5e5e5]">
            <table className="w-full min-w-[700px] text-left text-[12px]">
              <thead className="bg-[#f7f7f7] text-[10px] uppercase tracking-[0.07em] text-[#777]"><tr><th className="px-4 py-3">Item Name</th><th className="px-4 py-3">Strength (TESA/IPAM)</th><th className="px-4 py-3">Form</th><th className="px-4 py-3">Quantity</th></tr></thead>
              <tbody><tr><td className="px-4 py-3.5">Tesamorelin / Ipamorelin</td><td className="px-4 py-3.5">2.4mg / 1.2mg / mL</td><td className="px-4 py-3.5">Injection</td><td className="px-4 py-3.5">5 mL Vial</td></tr></tbody>
            </table>
          </div>

          <h3 className="mt-8 text-[16px] font-medium text-[#202020]">Ingredient Breakdown &amp; Benefits</h3>
          <div className="mt-3 space-y-2 text-[12px] leading-5 text-[#555]">
            <p><strong className="font-medium text-[#222]">Tesamorelin Acetate:</strong> A stabilized GHRH analogue that specifically facilitates the reduction of deep abdominal fat and improves lipid profiles.</p>
            <p><strong className="font-medium text-[#222]">Ipamorelin:</strong> A selective growth hormone secretagogue that stimulates the timing and amplitude of GH release without increasing hunger, cortisol, or prolactin.</p>
            <p><strong className="font-medium text-[#222]">Metabolic Synergy:</strong> The dual-action approach ensures a more robust hormonal response than single-peptide therapies, maximizing fat oxidation and tissue repair.</p>
          </div>

          <h3 className="mt-8 text-[16px] font-medium text-[#202020]">Typical Dosage and Administration</h3>
          <p className="mt-3 text-[12px] italic leading-5 text-[#555]">Dosing is administered via subcutaneous (SQ) injection, ideally at bedtime. To maximize the growth hormone pulse, avoid eating for at least 2 hours before administration.</p>
          <div className="mt-4 overflow-x-auto rounded-[10px] border border-[#e5e5e5]">
            <table className="w-full min-w-[700px] text-left text-[12px]">
              <thead className="bg-[#f7f7f7] text-[10px] uppercase tracking-[0.07em] text-[#777]"><tr><th className="px-4 py-3">Goal</th><th className="px-4 py-3">Frequency</th><th className="px-4 py-3">Route</th><th className="px-4 py-3">Notes</th></tr></thead>
              <tbody className="divide-y divide-[#ebebeb] text-[#424242]">
                <tr><td className="px-4 py-3">Visceral Fat Loss</td><td className="px-4 py-3">Once Daily</td><td className="px-4 py-3">Subcutaneous</td><td className="px-4 py-3">1.2mg/0.6mg standard dose</td></tr>
                <tr className="bg-[#fafafa]"><td className="px-4 py-3">Pulsatile Protocol</td><td className="px-4 py-3">5x Weekly</td><td className="px-4 py-3">Subcutaneous</td><td className="px-4 py-3">5 days on / 2 days off</td></tr>
                <tr><td className="px-4 py-3">Intensive Support</td><td className="px-4 py-3">Once Daily</td><td className="px-4 py-3">Subcutaneous</td><td className="px-4 py-3">2.4mg/1.2mg dose</td></tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 space-y-1 text-[12px] leading-5 text-[#555]">
            <p><strong className="font-medium text-[#222]">Beyond Use Days:</strong> 90 days (unopened) or 28 days after first puncture.</p>
            <p><strong className="font-medium text-[#222]">Storage:</strong> Store in the refrigerator (36°F to 46°F). Protect from light. Do not freeze.</p>
            <p><strong className="font-medium text-[#222]">Status:</strong> 503A Compounded (Sterile)</p>
          </div>

          <div className="mt-8 rounded-[12px] border border-[#f5e6d2] bg-[radial-gradient(circle_at_95%_0%,rgba(255,231,194,0.42),transparent_48%),linear-gradient(145deg,#fffdf9_0%,#fff8ee_100%)] p-5">
            <div className="flex items-start gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white/85 text-[#c9782f] shadow-[0_1px_0_rgba(120,65,8,0.04)]">
                <TriangleAlert size={17} strokeWidth={1.9} />
              </span>
              <div>
                <h3 className="text-[16px] font-medium text-[#75481f]">Safety Warning</h3>
                <p className="mt-2 text-[12px] leading-5 text-[#66574a]"><strong className="font-medium text-[#5f432b]">FOR SUBCUTANEOUS USE ONLY.</strong> Use a fresh sterile needle for every administration. Discard 28 days after first puncture or by the BUD date, whichever comes first. For optimal results, administer on an empty stomach. Common side effects may include transient redness at the injection site, mild joint pain, or swelling. Consult your provider if you have a history of active malignancy or pituitary disorders. Discontinue use and seek medical attention if you experience severe headaches, vision changes, or signs of an allergic reaction. Keep out of reach of children.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {product.dosage === "Injection" && (
        <section className="mt-5 max-w-[1180px] rounded-[14px] border border-[#e4e4e4] bg-white p-6 lg:p-8">
          <h2 className="text-[20px] font-medium tracking-[-0.02em] text-[#171717]">Product Supply</h2>
          <div className="mt-5 flex h-[393px] w-[268px] max-w-full flex-col overflow-hidden rounded-[14px] border border-[#e4e4e4] bg-white">
            <div className="flex h-[190px] shrink-0 items-center justify-center overflow-hidden bg-[#fafafa] p-5">
              <img src={productSupplyNeedle} alt="Packaged subcutaneous needle" className="h-full w-full object-contain mix-blend-multiply" />
            </div>
            <div className="flex min-h-0 flex-1 flex-col p-4">
              <h3 className="text-[15px] font-medium leading-5 text-[#1d1d1d]">SQ Supplies Pack</h3>
              <p className="mt-1 text-[11px] leading-4 text-[#656565]">Suitable needles, syringe, and alcohol pads for the selected dosage.</p>
              <span className="mt-2 inline-flex w-fit rounded-[6px] bg-[#eef3ff] px-2 py-1 text-[9px] font-medium text-[#526fe8]">Subcutaneous (SC)</span>
              <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                <div className="inline-flex h-8 items-center overflow-hidden rounded-full border border-[#e1e1e1] bg-white">
                  {supplyQty === 1 ? (
                    <button type="button" onClick={() => { setSuppliesOpen(false); showToast("Supply removed"); }} className="flex size-8 items-center justify-center text-[#555] transition-colors hover:bg-[#f1f1f1]" aria-label="Remove supply"><Trash2 size={13} strokeWidth={1.7} /></button>
                  ) : (
                    <button type="button" onClick={() => setSupplyQty(value => value - 1)} className="flex size-8 items-center justify-center text-[#555] transition-colors hover:bg-[#f1f1f1]" aria-label="Decrease supply quantity"><Minus size={13} /></button>
                  )}
                  <span className="flex h-8 min-w-7 items-center justify-center text-[11px] font-medium text-[#222]">{supplyQty}</span>
                  <button type="button" onClick={() => setSupplyQty(value => value + 1)} className="flex size-8 items-center justify-center text-[#555] transition-colors hover:bg-[#f1f1f1]" aria-label="Increase supply quantity"><Plus size={13} /></button>
                </div>
                <p className="text-[14px] font-medium text-[#171717]">${(1.2 * supplyQty).toFixed(2)}</p>
              </div>
              <button type="button" onClick={() => { setSuppliesOpen(true); showToast("Supply added"); }} className={`-mx-1 mt-3 h-10 w-[calc(100%+8px)] rounded-full text-[11px] font-medium transition-colors ${suppliesOpen ? "bg-[#f1f1f1] text-[#222]" : "bg-[#111] text-white hover:bg-[#121212]"}`}>
                {suppliesOpen ? "Added" : "Add supply"}
              </button>
            </div>
          </div>
        </section>
      )}

      <section className="mt-5 max-w-[1180px] rounded-[14px] border border-[#e4e4e4] bg-white p-6 lg:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-[20px] font-medium tracking-[-0.02em] text-[#171717]">Similar Products</h2>
            <p className="mt-2 text-[12px] leading-5 text-[#6b6b6b]">For any unanswered questions, reach out to our support team via email.</p>
          </div>
          <button type="button" onClick={() => onNavigate("products")} className="inline-flex h-9 items-center gap-1.5 rounded-[8px] px-3 text-[12px] font-medium text-[#2563EB] transition-colors hover:bg-[#f3f7ff]">
            View catalogue <ChevronRight size={15} strokeWidth={1.8} />
          </button>
        </div>
        <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
          {similarProducts.map(candidate => (
            <ReferenceProductCard key={candidate.id} card={candidate} onClick={() => onNavigate("products")} />
          ))}
        </div>
      </section>
      </div>
      {requires503BEnrollment && enrollmentFormOpen && (
        <EnrollmentModal pharmacy={selectedPharmacy.name} onClose={() => setEnrollmentFormOpen(false)} onComplete={() => {
          setCompletedEnrollments(current => new Set([...current, selectedPharmacy.name]));
          setEnrollmentFormOpen(false);
        }} />
      )}

      {questionModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/35 px-4 py-6 backdrop-blur-[2px]" role="dialog" aria-modal="true" aria-labelledby="product-question-title">
          <div className="w-full max-w-[560px] rounded-[18px] border border-[#ece8e3] bg-white p-5 shadow-[0_28px_80px_rgba(0,0,0,0.22)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8c95a1]">Support ticket</p>
                <h2 id="product-question-title" className="mt-1 text-[22px] font-semibold tracking-[-0.03em] text-[#111]">Ask a Question</h2>
                <p className="mt-1 text-[12px] leading-5 text-[#6f7782]">We will attach this product setup so the team has the right context.</p>
              </div>
              <button
                type="button"
                onClick={() => setQuestionModalOpen(false)}
                className="flex size-9 cursor-pointer items-center justify-center rounded-full text-[#777] transition-colors hover:bg-[#f5f5f3] hover:text-[#111]"
                aria-label="Close question modal"
              >
                <X size={18} strokeWidth={1.8} />
              </button>
            </div>

            <div className="mt-5 rounded-[14px] border border-[#e8ebe9] bg-[#fafafa] p-3">
              <p className="mb-2 text-[11px] font-medium text-[#6c746f]">Product</p>
              <div className="flex items-center gap-3">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-[10px] bg-white">
                  <img src={product.img} alt={product.name} className="h-10 w-10 object-contain mix-blend-multiply" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-semibold text-[#151515]">{product.name}</p>
                  <p className="mt-1 text-[11px] leading-4 text-[#6f7782]">{strength} | {size}</p>
                  <p className="mt-0.5 truncate text-[10px] text-[#8d9591]">{selectedPharmacy.name}</p>
                </div>
                <p className="shrink-0 text-[13px] font-semibold text-[#151515]">${configuredPrice.toFixed(2)}</p>
              </div>
            </div>

            <label className="mt-5 block">
              <span className="text-[12px] font-semibold text-[#171717]">Your Question <span className="text-[#b4473d]">*</span></span>
              <textarea
                value={questionText}
                onChange={(event) => setQuestionText(event.target.value)}
                placeholder="Write..."
                className="mt-2 min-h-[132px] w-full resize-y rounded-[12px] border border-[#d8dedb] bg-white px-3.5 py-3 text-[13px] leading-5 text-[#111] outline-none transition placeholder:text-[#a3aaa6] focus:border-[#183229] focus:ring-2 focus:ring-[#183229]/10"
              />
            </label>

            <div className="mt-3 flex items-start gap-2 rounded-[12px] bg-[#f7f7f5] px-3 py-3">
              <MessageSquare size={15} className="mt-0.5 shrink-0 text-[#183229]" strokeWidth={1.8} />
              <p className="text-[11px] leading-[16px] text-[#66716c]">
                This question will be automatically created as a support ticket and assigned to our team. You'll receive a response within 24 hours.
              </p>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setQuestionModalOpen(false)}
                className="h-10 cursor-pointer rounded-[9px] border border-[#d7ddd9] bg-white px-4 text-[13px] font-semibold text-[#183229] transition-colors hover:bg-[#f7f8f6]"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!questionText.trim()}
                onClick={() => {
                  showToast("Question submitted");
                  setQuestionModalOpen(false);
                  setQuestionText("");
                }}
                className="h-10 cursor-pointer rounded-[9px] bg-[#111] px-5 text-[13px] font-semibold text-white transition-colors hover:bg-[#183229] disabled:cursor-not-allowed disabled:bg-[#d5d8d6]"
              >
                Submit Question
              </button>
            </div>
          </div>
        </div>
      )}
      {createPatientOpen && (
        <div className="fixed inset-0 z-[80] flex justify-end bg-black/30 backdrop-blur-[2px]">
          <button className="absolute inset-0 cursor-default" onClick={() => setCreatePatientOpen(false)} aria-label="Close create patient" />
          <form
            onSubmit={event => { event.preventDefault(); setCreatePatientOpen(false); }}
            className="relative flex h-full w-full max-w-[680px] flex-col overflow-hidden rounded-l-[16px] border-l border-[#e4e1dd] bg-white shadow-[-18px_0_55px_rgba(0,0,0,0.16)]"
          >
            <div className="flex items-center justify-between border-b border-[#ece9e5] px-6 py-5">
              <div>
                <h2 className="text-[20px] font-semibold text-[#171717]">Create Patient</h2>
                <p className="mt-1 text-[11px] text-[#777]">Enter the patient’s personal and contact information.</p>
              </div>
              <button type="button" onClick={() => setCreatePatientOpen(false)} className="flex size-8 items-center justify-center rounded-full text-[#777] hover:bg-[#f4f2ef]" aria-label="Close"><X size={18} /></button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
              <div className="grid gap-x-4 gap-y-4 sm:grid-cols-2">
                {[
                  ["First Name", "firstName", "Write...", "text", true],
                  ["Last Name", "lastName", "Write...", "text", true],
                ].map(([label, name, placeholder, type, required]) => (
                  <label key={String(name)} className="block text-[11px] font-medium text-[#242424]">{label} {required && <span className="text-[#b44b42]">*</span>}<input name={String(name)} type={String(type)} required={Boolean(required)} placeholder={String(placeholder)} className="mt-1.5 h-10 w-full rounded-[9px] border border-[#dddcd8] bg-white px-3 text-[12px] outline-none placeholder:text-[#b8b8b5] focus:border-[#202020]" /></label>
                ))}
                <label className="block text-[11px] font-medium text-[#242424]">Gender <span className="text-[#b44b42]">*</span><select name="gender" required defaultValue="" className="mt-1.5 h-10 w-full rounded-[9px] border border-[#dddcd8] bg-white px-3 text-[12px] text-[#555] outline-none focus:border-[#202020]"><option value="" disabled>Select</option><option>Female</option><option>Male</option><option>Other</option></select></label>
                <label className="block text-[11px] font-medium text-[#242424]">Birth Date <span className="text-[#b44b42]">*</span><input name="birthDate" type="date" required className="mt-1.5 h-10 w-full rounded-[9px] border border-[#dddcd8] bg-white px-3 text-[12px] text-[#555] outline-none focus:border-[#202020]" /></label>
                <label className="block text-[11px] font-medium text-[#242424]">Primary Phone <span className="text-[#b44b42]">*</span><input name="primaryPhone" type="tel" required placeholder="(000) 000-0000" className="mt-1.5 h-10 w-full rounded-[9px] border border-[#dddcd8] px-3 text-[12px] outline-none placeholder:text-[#b8b8b5] focus:border-[#202020]" /></label>
                <label className="block text-[11px] font-medium text-[#242424]">Secondary Phone<input name="secondaryPhone" type="tel" placeholder="(000) 000-0000" className="mt-1.5 h-10 w-full rounded-[9px] border border-[#dddcd8] px-3 text-[12px] outline-none placeholder:text-[#b8b8b5] focus:border-[#202020]" /></label>
                <label className="block text-[11px] font-medium text-[#242424]">Address 1 <span className="text-[#b44b42]">*</span><input name="address1" required placeholder="Start typing address..." className="mt-1.5 h-10 w-full rounded-[9px] border border-[#dddcd8] px-3 text-[12px] outline-none placeholder:text-[#b8b8b5] focus:border-[#202020]" /></label>
                <label className="block text-[11px] font-medium text-[#242424]">Apt, Floor, etc.<input name="address2" placeholder="Write..." className="mt-1.5 h-10 w-full rounded-[9px] border border-[#dddcd8] px-3 text-[12px] outline-none placeholder:text-[#b8b8b5] focus:border-[#202020]" /></label>
                <label className="block text-[11px] font-medium text-[#242424]">State <span className="text-[#b44b42]">*</span><select name="state" required defaultValue="" className="mt-1.5 h-10 w-full rounded-[9px] border border-[#dddcd8] bg-white px-3 text-[12px] text-[#555] outline-none focus:border-[#202020]"><option value="" disabled>Select a state</option><option>Florida</option><option>New York</option><option>Texas</option><option>California</option></select></label>
                <label className="block text-[11px] font-medium text-[#242424]">City <span className="text-[#b44b42]">*</span><input name="city" required placeholder="Write..." className="mt-1.5 h-10 w-full rounded-[9px] border border-[#dddcd8] px-3 text-[12px] outline-none placeholder:text-[#b8b8b5] focus:border-[#202020]" /></label>
                <label className="block text-[11px] font-medium text-[#242424]">Zip Code <span className="text-[#b44b42]">*</span><input name="zip" required placeholder="Write..." className="mt-1.5 h-10 w-full rounded-[9px] border border-[#dddcd8] px-3 text-[12px] outline-none placeholder:text-[#b8b8b5] focus:border-[#202020]" /></label>
                <label className="block text-[11px] font-medium text-[#242424]">Allergies<input name="allergies" placeholder="Write..." className="mt-1.5 h-10 w-full rounded-[9px] border border-[#dddcd8] px-3 text-[12px] outline-none placeholder:text-[#b8b8b5] focus:border-[#202020]" /></label>
                <label className="block text-[11px] font-medium text-[#242424]">Email<input name="email" type="email" placeholder="Write..." className="mt-1.5 h-10 w-full rounded-[9px] border border-[#dddcd8] px-3 text-[12px] outline-none placeholder:text-[#b8b8b5] focus:border-[#202020]" /></label>
                <label className="block text-[11px] font-medium text-[#242424]">Language<select name="language" defaultValue="" className="mt-1.5 h-10 w-full rounded-[9px] border border-[#dddcd8] bg-white px-3 text-[12px] text-[#555] outline-none focus:border-[#202020]"><option value="" disabled>Select</option><option>English</option><option>Spanish</option><option>Albanian</option></select></label>
              </div>

              <div className="mt-5 border-t border-[#ece9e5] pt-5">
                <h3 className="text-[12px] font-semibold text-[#242424]">BMI Classification</h3>
                <div className="mt-3 grid gap-4 sm:grid-cols-2">
                  <label className="block text-[11px] font-medium text-[#242424]">Weight<div className="mt-1.5 flex gap-2"><input name="weight" type="number" min="0" placeholder="Write..." className="h-10 min-w-0 flex-1 rounded-[9px] border border-[#dddcd8] px-3 text-[12px] outline-none focus:border-[#202020]" /><select name="weightUnit" className="h-10 w-20 rounded-[9px] border border-[#dddcd8] bg-white px-2 text-[12px]"><option>lb</option><option>kg</option></select></div></label>
                  <label className="block text-[11px] font-medium text-[#242424]">Height<div className="mt-1.5 flex gap-2"><input name="height" type="number" min="0" placeholder="Write..." className="h-10 min-w-0 flex-1 rounded-[9px] border border-[#dddcd8] px-3 text-[12px] outline-none focus:border-[#202020]" /><select name="heightUnit" className="h-10 w-20 rounded-[9px] border border-[#dddcd8] bg-white px-2 text-[12px]"><option>in</option><option>cm</option></select></div></label>
                </div>
              </div>
            </div>

            <div className="border-t border-[#ece9e5] bg-white px-6 py-4">
              <button type="submit" className="h-11 w-full rounded-[8px] bg-[#111] px-6 text-[12px] font-semibold text-white hover:bg-black">Save Patient</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

// ─── Dashboard ────────────────────────────────────────────────────────────────

const RECENT_ORDERS = [
  { id: "ORD-0041", patient: "Sarah M.", product: "NAD+ Injection", status: "Delivered", date: "Jul 8", total: "$55.88" },
  { id: "ORD-0040", patient: "John R.", product: "Testosterone Cyp", status: "Shipped", date: "Jul 7", total: "$135.99" },
  { id: "ORD-0039", patient: "Emily K.", product: "Semaglutide", status: "Processing", date: "Jul 7", total: "$180.00" },
  { id: "ORD-0038", patient: "David L.", product: "BPC-157", status: "Pending", date: "Jul 6", total: "$75.00" },
  { id: "ORD-0037", patient: "Maria S.", product: "Sermorelin", status: "Delivered", date: "Jul 5", total: "$110.00" },
];

function DashboardPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <>
      <Header title="Dashboard" onNavigate={onNavigate} />

      <section className="mb-6 grid grid-cols-4 gap-3 max-xl:grid-cols-2 max-sm:grid-cols-1">
        {[
          { label: "Total orders", value: "1,284", delta: "+12.5% this month", icon: Package, bg: "bg-[#f5f8f6]", color: "text-[#31584A]" },
          { label: "Active patients", value: "348", delta: "+3.2% this month", icon: Users, bg: "bg-[#fafafa]", color: "text-[#31584A]" },
          { label: "Revenue this month", value: "$24,192", delta: "+8.7% this month", icon: CreditCard, bg: "bg-[#f7f8f6]", color: "text-[#665E28]" },
          { label: "Open tickets", value: "17", delta: "2 need attention", icon: MessageSquare, bg: "bg-[#fff7f2]", color: "text-[#8A4338]" },
        ].map(({ label, value, delta, icon: Icon, bg, color }) => (
          <article key={label} className="flex min-h-[116px] items-center gap-4 rounded-[14px] border border-[#efefec] bg-white p-4">
            <span className={`flex size-12 shrink-0 items-center justify-center rounded-[13px] ${bg} ${color}`}><Icon size={19} strokeWidth={1.7} /></span>
            <div><p className="text-[11px] font-medium text-[#858b88]">{label}</p><p className="mt-1 text-[23px] font-semibold tracking-[-0.03em] text-[#1a1a1a]">{value}</p><p className={`mt-1 text-[10px] font-medium ${color}`}>{delta}</p></div>
          </article>
        ))}
      </section>

      <div className="mb-6 grid grid-cols-[minmax(0,1fr)_310px] gap-4 max-lg:grid-cols-1">
        <section className="rounded-[14px] bg-[#FBFBFB] p-2">
          <div className="flex items-center justify-between px-3 py-3">
            <div><h2 className="text-[15px] font-semibold text-[#1a1a1a]">Recent orders</h2><p className="mt-1 text-[10px] text-[#929694]">Latest prescriptions submitted by your clinic.</p></div>
            <button onClick={() => onNavigate("orders")} className="flex items-center gap-1 text-[11px] font-semibold text-[#183229] transition-opacity hover:opacity-70">View all <ChevronRight size={13} /></button>
          </div>
          <div className="space-y-2">
            {RECENT_ORDERS.map((order) => {
              const statusClass = order.status === "Delivered" ? "bg-[#ecf8ef] text-[#31583F]" : order.status === "Pending" ? "bg-[#fff4eb] text-[#8A4338]" : "bg-[#edf6f2] text-[#31584A]";
              return (
                <button key={order.id} onClick={() => onNavigate("orders")} className="grid w-full grid-cols-[minmax(160px,1fr)_minmax(130px,.9fr)_104px_70px_72px_20px] items-center gap-3 rounded-[11px] bg-white px-3 py-3 text-left transition-colors hover:bg-[#fffcfa] max-md:grid-cols-[1fr_auto_18px]">
                  <span className="min-w-0"><span className="block truncate text-[11px] font-semibold text-[#252525]">{order.patient}</span><span className="mt-0.5 block text-[9px] text-[#999]">{order.id}</span></span>
                  <span className="truncate text-[11px] text-[#5f6461] max-md:hidden">{order.product}</span>
                  <span className={`w-fit rounded-full px-2.5 py-1.5 text-[9px] font-semibold ${statusClass}`}>{order.status}</span>
                  <span className="text-[10px] text-[#999] max-md:hidden">{order.date}</span>
                  <span className="text-right text-[11px] font-semibold text-[#252525] max-md:hidden">{order.total}</span>
                  <ChevronRight size={14} className="text-[#a2a5a3]" />
                </button>
              );
            })}
          </div>
        </section>

        <aside className="rounded-[14px] border border-[#efefec] bg-white p-5">
          <div className="flex items-center justify-between"><div><h2 className="text-[15px] font-semibold text-[#1a1a1a]">Activity</h2><p className="mt-1 text-[10px] text-[#929694]">What changed recently.</p></div><span className="flex size-8 items-center justify-center rounded-full bg-white text-[#183229]"><Bell size={14} /></span></div>
          <div className="mt-5 space-y-1">
            {[
              { icon: CheckCircle2, text: "Order ORD-0041 delivered", time: "2h ago", bg: "bg-[#ecf8ef]", color: "text-[#31583F]" },
              { icon: Truck, text: "Order ORD-0040 shipped", time: "5h ago", bg: "bg-[#edf6f2]", color: "text-[#31584A]" },
              { icon: AlertCircle, text: "Low stock: BPC-157", time: "1d ago", bg: "bg-[#fafafa]", color: "text-[#6E642A]" },
              { icon: User, text: "New patient: Mark T.", time: "1d ago", bg: "bg-[#f7f8f6]", color: "text-[#31584A]" },
              { icon: MessageSquare, text: "Ticket #89 opened", time: "2d ago", bg: "bg-[#fff7f2]", color: "text-[#8A4338]" },
            ].map(({ icon: Icon, text, time, bg, color }) => (
              <div key={text} className="flex items-center gap-3 rounded-[10px] px-1 py-2.5">
                <span className={`flex size-8 shrink-0 items-center justify-center rounded-[9px] ${bg} ${color}`}><Icon size={14} /></span>
                <div className="min-w-0"><p className="truncate text-[11px] font-medium text-[#252525]">{text}</p><p className="mt-0.5 text-[9px] text-[#999]">{time}</p></div>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <section className="rounded-[14px] bg-[#FBFBFB] p-2">
        <div className="flex items-center justify-between px-3 py-3"><div><h2 className="text-[15px] font-semibold text-[#1a1a1a]">Top products</h2><p className="mt-1 text-[10px] text-[#929694]">Frequently ordered by your clinic.</p></div><button onClick={() => onNavigate("products")} className="flex items-center gap-1 text-[11px] font-semibold text-[#183229] hover:opacity-70">Browse catalog <ChevronRight size={13} /></button></div>
        <div className="grid grid-cols-6 gap-2 max-xl:grid-cols-3 max-md:grid-cols-2">
          {ALL_PRODUCTS.slice(0, 6).map((product) => (
            <button key={product.id} onClick={() => onNavigate("product-detail")} className="group rounded-[11px] bg-white px-3 pb-2.5 pt-2 text-left transition-colors hover:bg-[#fffefd]">
              <div className="flex h-[84px] items-center justify-center overflow-hidden rounded-[9px] bg-[#FCFCFC]"><img src={product.img} alt={product.name} className="h-[92%] max-w-full object-contain mix-blend-multiply transition-transform duration-200 group-hover:scale-[1.04]" /></div>
              <p className="mt-2 truncate text-[10px] font-semibold leading-4 text-[#252525]">{product.name}</p>
              <div className="mt-1 flex items-center justify-between"><span className="text-[11px] font-semibold text-[#1a1a1a]">{product.price}</span><span className="flex size-5 items-center justify-center rounded-full bg-[#f2f1ee] text-[#183229]"><ChevronRight size={11} /></span></div>
            </button>
          ))}
        </div>
      </section>

    </>
  );
}

// ─── Orders ───────────────────────────────────────────────────────────────────

const ORDERS = [
  {
    id: "#CEF164",
    status: "Pending Payment",
    orderType: "ORDER",
    timestamp: "07/11/2026 - 1:44 PM",
    payMethod: "Pay by Patient",
    payStatus: "UNPAID",
    shipMethod: "Ship to Clinic",
    total: "$548.52",
    patientNames: ["Zeee Rabushaj", "Altin Selimi"],
    patient: { name: "Zeee Rabushaj", gender: "M", address: "95 Windermere Drive, Westchester County, NY 10710", phone: "(646)-389-7766" },
    patients: [
      { name: "Zeee Rabushaj", gender: "M", address: "95 Windermere Drive, Westchester County, NY 10710", phone: "(646)-389-7766" },
      { name: "Altin Selimi", gender: "M", address: "95 Windermere Drive, Yonkers, NY 10710", phone: "(646)-617-9881" },
    ],
    clinic: { name: "ScriptLinkRx Demo", address: "2823 Middletown Road Line 2, Bronx, NY 10461", phone: "(646)-617-9881" },
    items: [
	      { patientName: "Zeee Rabushaj", name: "Tirzepatide/Pyridoxine (B6)", description: "1 (0.5mL) Vial | 20mg/25mg/mL", pharmacy: "1st Choice Compounding Pharmacy", tracking: "Tracking Not Ready", qty: 1, authRefills: 1, refillsLeft: 0, daysSupply: 1, price: "$125.43", image: blankVialReference },
	      { patientName: "Zeee Rabushaj", name: "5-Amino-1mq/NMN", description: "30 Capsules | 25mg/500mg", pharmacy: "1st Choice Compounding Pharmacy", tracking: "Tracking Not Ready", qty: 30, authRefills: 1, refillsLeft: 0, daysSupply: 1, price: "$171.80", image: img431 },
	      { patientName: "Altin Selimi", name: "Bremelanotide (PT-141)", description: "1 (10mL) Bottle | 10mg/mL", pharmacy: "Precision Compounding Pharmacy", tracking: "Tracking Not Ready", qty: 1, authRefills: 1, refillsLeft: 0, daysSupply: 1, price: "$118.80", image: imgProduct452 },
	      { patientName: "Altin Selimi", name: "Aminoblend", description: "1 (30mL) Vial | 100mg/50mg/50mg/50mg/100mg/mL", pharmacy: "Thesis Pharmacy", tracking: "Tracking Not Ready", qty: 1, authRefills: 2, refillsLeft: 0, daysSupply: 1, price: "$35.99", image: img432 },
    ],
  },
  {
    id: "#BCF445",
    status: "Pending Approval",
    orderType: "ORDER",
    timestamp: "07/11/2026 - 1:21 PM",
    payMethod: "Pay by Patient",
    payStatus: "UNPAID",
    shipMethod: "Ship to Clinic",
    total: "$156.56",
    patientNames: ["Zeee Rabushaj"],
    patient: { name: "Zeee Rabushaj", gender: "M", address: "95 Windermere Drive, Westchester County, NY 10710", phone: "(646)-389-7766" },
    clinic: { name: "ScriptLinkRx Demo", address: "2823 Middletown Road Line 2, Bronx, NY 10461", phone: "(646)-617-9881" },
    items: [
      { name: "Tesamorelin/Ipamorelin", description: "1 (5mL) Vial | 2.4mg/1.2mg/mL", pharmacy: "Optimal Balance Pharmacy", tracking: "Tracking Not Ready", qty: 1, authRefills: 1, refillsLeft: 0, daysSupply: 1, price: "$135.36", image: imgPT141 },
    ],
  },
  {
    id: "#EB5790",
    status: "Processing",
    orderType: "ORDER",
    timestamp: "07/07/2026 - 09:02 AM",
    payMethod: "Pay by Clinic",
    payStatus: "PAID",
    shipMethod: "Ship to Clinic",
    total: "$180.00",
    patientNames: ["Emily Krause"],
    patient: { name: "Emily Krause", gender: "F", address: "302 Maple Ave, Brooklyn, NY 11201", phone: "(718)-555-0187" },
    clinic: { name: "ScriptLinkRx Demo", address: "2823 Middletown Road Line 2, Bronx, NY 10461", phone: "(646)-617-9881" },
    items: [
      { name: "Semaglutide", description: "2 Vials | 5mg/mL", pharmacy: "Precision Compounding", tracking: "Tracking Not Ready", qty: 2, authRefills: 5, refillsLeft: 5, daysSupply: 60, price: "$180.00", image: img434 },
    ],
  },
  {
    id: "#EB5778",
    status: "Shipped",
    orderType: "ORDER",
    timestamp: "07/07/2026 - 08:15 AM",
    payMethod: "Pay by Patient",
    payStatus: "PAID",
    shipMethod: "Ship to Patient",
    total: "$135.99",
    patientNames: ["John Reynolds"],
    patient: { name: "John Reynolds", gender: "M", address: "88 Park Blvd, Queens, NY 11375", phone: "(718)-555-0143" },
    clinic: { name: "ScriptLinkRx Demo", address: "2823 Middletown Road Line 2, Bronx, NY 10461", phone: "(646)-617-9881" },
    items: [
      { name: "Testosterone Cypionate", description: "1 Vial | 200mg/mL", pharmacy: "Rush Pharmacy FL", tracking: "TRACK-774412", qty: 1, authRefills: 11, refillsLeft: 10, daysSupply: 28, price: "$135.99", image: img452dash },
    ],
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      className="text-[#c0c0c0] hover:text-[#183229] transition-colors flex-shrink-0"
      onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1500); }); }}
      title={copied ? "Copied!" : "Copy"}
    >
      {copied
        ? <CheckCircle2 size={11} className="text-[#183229]" />
        : <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><rect x="3" y="3" width="7" height="7" rx="1.2" stroke="currentColor" strokeWidth="1.1"/><path d="M1.5 7.5V1.5H7.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>
      }
    </button>
  );
}

function OrdersPage({ onNavigate, onOrderSelect, extraVariants }: { onNavigate: (p: Page) => void; onOrderSelect: (order: typeof ORDERS[number]) => void; extraVariants: boolean }) {
  const [filter, setFilter] = useState("Pending Payment");
  const [search, setSearch] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState(ORDERS[0]?.id ?? "");
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    ORDERS.forEach((order) => order.items.forEach((item, index) => { init[`${order.id}-${index}`] = item.qty; }));
    return init;
  });
  const [shippingMethod, setShippingMethod] = useState<"standard" | "overnight">("standard");
  const [reviewOpen, setReviewOpen] = useState(false);
  const [orderCardVariant, setOrderCardVariant] = useState<"current" | "cart" | "optimized" | "silver" | "multi">("cart");

  useEffect(() => {
    if (!extraVariants) setOrderCardVariant("cart");
  }, [extraVariants]);

  const tabs = ["Overall", "Pending Payment", "Pending Approval", "Cancellation Requested", "Processing", "Pending eScript", "Shipped", "Delivered", "Flagged", "Cancelled"];

  const statusPillStyle: Record<string, string> = {
    "Pending Payment": "bg-gradient-to-r from-[#FFE2D2] to-[#FFF45C] text-[#56203B]",
    "Pending Approval": "bg-gradient-to-r from-[#FFE2D2] to-[#FFF45C] text-[#56203B]",
    "Cancellation Requested": "bg-gradient-to-r from-[#FFB78E] to-[#F07A00] text-[#56203B]",
    Processing: "bg-gradient-to-r from-[#FFE5A8] to-[#F07A00] text-[#56203B]",
    "Pending eScript": "bg-[#E8E5B0] text-[#31583F]",
    Shipped: "bg-[#292B78] text-[#C9F4F5]",
    Delivered: "bg-[#31583F] text-[#F1EFD9]",
    Flagged: "bg-[#7B003B] text-[#FFE8EE]",
    Cancelled: "bg-[#56203B] text-[#FFE7D6]",
  };

  const silverStatusPillStyle: Record<string, string> = {
    Processing: "bg-[#FFC55B] text-[#151515]",
    "Pending Payment": "bg-[#F20D17] text-white",
    "Pending Approval": "bg-[#F20D17] text-white",
    Cancelled: "bg-[#F20D17] text-white",
    Flagged: "bg-[#F20D17] text-white",
    Shipped: "bg-[#3269E8] text-white",
    Delivered: "bg-[#0AB53B] text-white",
    Test: "bg-[#F6DF5C] text-[#151515]",
  };

  function silverStatusIcon(status: string) {
    if (status === "Processing") return <RefreshCw size={13} />;
    if (status === "Pending Payment" || status === "Pending Approval") return <CreditCard size={13} />;
    if (status === "Cancelled") return <AlertCircle size={13} />;
    if (status === "Flagged") return <Flag size={13} />;
    if (status === "Shipped") return <Send size={13} />;
    if (status === "Delivered") return <CheckCircle2 size={13} />;
    return <Package size={13} />;
  }

  const overallOrders = ORDERS.slice(0, 3);
  const filtered = (filter === "Overall" ? overallOrders : ORDERS).filter((order) => {
    const matchesTab = filter === "Overall" || order.status === filter;
    const query = search.toLowerCase();
    const matchesSearch = !query || order.id.toLowerCase().includes(query) || order.patient.name.toLowerCase().includes(query) || order.items.some((item) => item.name.toLowerCase().includes(query));
    return matchesTab && matchesSearch;
  });

  useEffect(() => {
    if (filtered.length > 0 && !filtered.some((order) => order.id === selectedOrderId)) {
      setSelectedOrderId(filtered[0].id);
    }
  }, [filtered, selectedOrderId]);

  const selectedOrder = filtered.find((order) => order.id === selectedOrderId) ?? filtered[0] ?? ORDERS[0];
  const shipping = shippingMethod === "standard" ? 29.99 : 49.99;
  const subtotal = selectedOrder.items.reduce((sum, item, index) => {
    const key = `${selectedOrder.id}-${index}`;
    const unitPrice = Number(item.price.replace(/[$,]/g, "")) || 0;
    return sum + unitPrice * (quantities[key] ?? item.qty);
  }, 0);
  const convenienceFee = selectedOrder.payStatus === "PAID" ? 0 : Math.round(subtotal * 0.045 * 100) / 100;
  const total = subtotal + shipping + convenienceFee;

  function tabCount(tab: string) {
    return tab === "Overall" ? overallOrders.length : ORDERS.filter((order) => order.status === tab).length;
  }

  function updateQty(key: string, delta: number) {
    setQuantities((prev) => ({ ...prev, [key]: Math.max(1, (prev[key] ?? 1) + delta) }));
  }

  function labelCase(value: string) {
    const lower = value.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }

  function orderHistoryStatusKey(status: string): OrderHistoryEntry["order_status"] {
    if (status === "Pending Payment" || status === "Pending Approval") return "pending_payment";
    if (status === "Shipped") return "shipped";
    if (status === "Delivered") return "delivered";
    if (status === "Cancelled" || status === "Cancellation Requested" || status === "Flagged") return "cancelled";
    return "processing";
  }

  return (
    <>
      <div className="max-w-[1400px]">
      <div className="mb-5 flex flex-col gap-3">
        <div className="flex flex-col items-start gap-3">
          <h1 className="flex h-[38px] items-center text-[28px] font-semibold leading-tight text-[#1a1a1a]">Orders</h1>
          <div className="group mt-[17px] flex h-[38px] w-full items-center gap-2 rounded-[9px] border border-[#cfcfcf] bg-white px-3 transition-all duration-300 ease-out focus-within:border-2 focus-within:border-black sm:w-[220px] sm:focus-within:w-[310px]">
            <Search size={14} strokeWidth={1.8} className="flex-shrink-0 text-[#686868] transition-transform duration-300 group-focus-within:scale-110" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="min-w-0 flex-1 bg-transparent text-[11px] font-medium text-[#1a1a1a] outline-none placeholder:font-medium placeholder:text-[#686868]"
              placeholder="Search by order, patient, or item"
            />
            <span className="shrink-0 text-[10px] text-[#686868]">⌘ F</span>
          </div>
        </div>

        <div className="flex items-end gap-4 overflow-x-auto border-b border-[#e3e3e3] px-1">
          {tabs.map((tab) => {
            const isActive = filter === tab;
            return (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`relative h-[46px] whitespace-nowrap px-0.5 text-[12px] font-medium transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:transition-colors ${
                  isActive ? "text-[#171717] after:bg-[#183229]" : "text-[#555] after:bg-transparent hover:text-[#171717]"
                }`}
              >
                <span>{tab}</span>
                <span className={`ml-1.5 inline-flex size-[18px] items-center justify-center rounded-full text-[9px] font-semibold ${isActive ? "bg-[#183229] text-white" : "bg-[#eeeeec] text-[#777]"}`}>{tabCount(tab)}</span>
              </button>
            );
          })}
        </div>

        {extraVariants && <div className="flex items-center gap-2 pt-1">
          <span className="mr-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#888]">Card style</span>
	          {(["silver", "cart", "multi"] as const).map(variant => (
	            <button
	              key={variant}
	              onClick={() => setOrderCardVariant(variant)}
	              className={`h-8 rounded-full px-3 text-[11px] font-semibold capitalize transition-colors ${orderCardVariant === variant ? "bg-[#111] text-white" : "border border-[#ddd] bg-white text-[#555] hover:border-[#999]"}`}
	            >
	              {variant === "cart" ? "Cart style" : variant === "multi" ? "Patient lanes" : "Current"}
	            </button>
	          ))}
        </div>}

      </div>

      {filtered.length === 0 ? (
        <div className="bg-white border border-[#e8e8e8] rounded-[10px] flex flex-col items-center justify-center py-16">
          <Package size={32} className="text-[#d0d0d0] mb-3" />
          <p className="text-[14px] font-semibold text-[#1a1a1a] mb-1">No orders found</p>
          <p className="text-[12px] text-[#9d9d9d]">No orders match the current filter.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filtered.map((order) => {
            if (orderCardVariant === "cart") {
              const orderPatients = "patients" in order ? order.patients : [order.patient];
              const hasMultiplePatients = orderPatients.length > 1;
              const compactImages = [imgOrderAminoQuad, imgOrderOxytocin, imgOrderOxytocinAlt, imgOrderAminoQuad];
              const compactRows = orderPatients.length > 1
                ? orderPatients.map((patient, index) => ({
                    patient,
                    item: order.items[index] ?? order.items[0],
                    image: compactImages[index] ?? order.items[index]?.image ?? order.items[0].image,
                    index,
                  }))
                : order.items.map((item, index) => ({
                    patient: orderPatients[0],
                    item,
                    image: compactImages[index] ?? item.image,
                    index,
                  }));
              return (
                <section key={order.id} onClick={() => onOrderSelect(order)} className="cursor-pointer rounded-[10px] bg-[#F8F8F8] px-5 pb-3 pt-5 transition-colors hover:bg-[#f6f6f5]">
                  <div className="mb-2 hidden grid-cols-[minmax(310px,1.05fr)_minmax(260px,1fr)_minmax(240px,0.9fr)_70px] gap-7 px-5 md:grid">
                    <p className="text-[12px] font-semibold text-[#555]">Prescription</p>
                    <p className="text-[12px] font-semibold text-[#555]">Patient</p>
                    <p className="text-[12px] font-semibold text-[#555]">Pharmacy</p>
                    <p className="text-right text-[12px] font-semibold text-[#555]">Price</p>
                  </div>

                  <div className={hasMultiplePatients ? "overflow-hidden rounded-[9px] bg-white" : "space-y-3"}>
                    {compactRows.map(({ item, patient, image, index }) => {
                      const trackingBlue = index % 2 === 1;
                      return (
                        <div key={`${order.id}-${patient.name}-${item.name}-${index}`} className={`grid items-center gap-7 bg-white px-5 md:grid-cols-[minmax(310px,1.05fr)_minmax(260px,1fr)_minmax(240px,0.9fr)_70px] ${hasMultiplePatients ? "min-h-[104px] py-3" : "min-h-[122px] rounded-[9px] py-5"}`}>
                          <div className="flex min-w-0 items-center gap-4">
                            <div className="flex h-[70px] w-[58px] shrink-0 items-center justify-center overflow-visible">
                              <img src={image} alt="" className="max-h-[70px] max-w-[52px] object-contain" />
                            </div>
                            <div className="min-w-0">
                            <p className="truncate text-[14px] font-semibold text-[#161a18]">{item.name}</p>
                            <p className="mt-1 truncate text-[12px] text-[#777]">{item.description}</p>
                            <div className="mt-2 flex flex-wrap gap-1.5">
                              <span className="rounded-full bg-[#f3f3f3] px-2 py-1 text-[9px] text-[#555]">Qty {item.qty}</span>
                              <span className="rounded-full bg-[#f3f3f3] px-2 py-1 text-[9px] text-[#555]">Auth refills {item.authRefills}</span>
                              <span className="rounded-full bg-[#f3f3f3] px-2 py-1 text-[9px] text-[#555]">Refills left {item.refillsLeft}</span>
                              <span className="rounded-full bg-[#f3f3f3] px-2 py-1 text-[9px] text-[#555]">Days {item.daysSupply}</span>
                            </div>
                            </div>
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-[14px] font-medium text-[#161a18]">{patient.name} ({patient.gender})</p>
                            <p className="mt-1.5 truncate text-[11px] text-[#444]">{patient.phone}</p>
                            <p className="mt-1 truncate text-[11px] text-[#444]">{patient.address}</p>
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-[12px] font-normal text-[#777]">{item.pharmacy}</p>
                            <span className={`mt-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-semibold ${trackingBlue ? "bg-[#F6F6FF] text-[#4169E8]" : "bg-[#ECEBE3] text-[#2f3d35]"}`}>
                              {trackingBlue && <Send size={13} strokeWidth={1.8} />}
                              {labelCase(item.tracking)}
                            </span>
                          </div>
                          <p className="self-start pt-1 text-right text-[14px] font-semibold text-[#161a18]">{item.price}</p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-3 px-1">
                    <span className="mr-1 text-[15px] font-medium text-[#161a18]">{order.id}</span>
                    <span className="inline-flex h-[26px] items-center gap-2 rounded-full bg-[#F1F0EF] pl-3 pr-1 text-[12px] font-medium text-[#183229]">
                      Order Type
                      <span className="inline-flex h-5 items-center rounded-full bg-white px-2.5 text-[11px] font-normal text-[#111]">{labelCase(order.orderType)}</span>
                    </span>
                    <span className="inline-flex h-[26px] items-center gap-2 rounded-full bg-[#F1F0EF] pl-3 pr-1 text-[12px] font-medium text-[#183229]">
                      Order Timestamp
                      <span className="inline-flex h-5 items-center rounded-full bg-white px-2.5 text-[11px] font-normal text-[#111]">{order.timestamp}</span>
                    </span>
                    <span className="inline-flex h-8 items-center gap-2 rounded-full bg-[#f1f1f1] py-1 pl-1 pr-1.5">
                      <span className={`flex size-6 items-center justify-center rounded-full text-white ${order.payMethod === "Pay by Clinic" ? "bg-[#20cbd0]" : "bg-[#79cf91]"}`}>
                        {order.payMethod === "Pay by Clinic" ? <Building2 size={13} /> : <User size={13} />}
                      </span>
                      <span className="whitespace-nowrap text-[11px] font-medium text-[#222]">{order.payMethod}</span>
                      <span className={`rounded-full px-2.5 py-1 text-[9px] font-medium text-white ${order.payStatus === "PAID" ? "bg-[#2f7a43]" : "bg-[#9f1239]"}`}>{labelCase(order.payStatus)}</span>
                    </span>
                    <OrderHistoryV2Status status={orderHistoryStatusKey(order.status)} label={labelCase(order.status)} large />
                    <span className="inline-flex h-8 items-center gap-2 rounded-full bg-[#f1f1f1] py-1 pl-1 pr-1.5">
                      <span className={`flex size-6 items-center justify-center rounded-full text-white ${order.shipMethod === "Ship to Clinic" ? "bg-[#20cbd0]" : "bg-[#79cf91]"}`}>
                        {order.shipMethod === "Ship to Clinic" ? <Building2 size={13} /> : <User size={13} />}
                      </span>
                      <span className="whitespace-nowrap text-[11px] font-medium text-[#222]">{order.shipMethod}</span>
                      <span className="whitespace-nowrap rounded-full bg-white px-2.5 py-1 text-[9px] font-medium text-[#222]">{order.items.length} {order.items.length === 1 ? "item" : "items"}</span>
                    </span>
                    <span className="ml-auto inline-flex h-[26px] items-center gap-2 rounded-full bg-[#F1F0EF] pl-3 pr-1 text-[12px] font-medium text-[#183229]">
                      Total
                      <strong className="inline-flex h-5 items-center rounded-full bg-white px-2.5 text-[11px] font-medium text-[#111]">{order.total}</strong>
                    </span>
                  </div>
	                </section>
	              );
	            }

	            if (orderCardVariant === "multi") {
	              const orderPatients = "patients" in order ? order.patients : [order.patient];
	              const patientGroups = orderPatients.map((patient) => ({
	                patient,
	                items: order.items
	                  .map((item, index) => ({ item, index }))
	                  .filter(({ item, index }) => {
	                    const assignedName = (item as { patientName?: string }).patientName;
	                    return assignedName ? assignedName === patient.name : orderPatients[index]?.name === patient.name || (orderPatients.length === 1 && index >= 0);
	                  }),
	              })).filter(group => group.items.length > 0);
	              const groups = patientGroups.length > 0
	                ? patientGroups
	                : orderPatients.map((patient, patientIndex) => ({
	                    patient,
	                    items: order.items
	                      .map((item, index) => ({ item, index }))
	                      .filter((_, index) => index === patientIndex),
	                  })).filter(group => group.items.length > 0);
	              const productCount = order.items.length;

	              return (
	                <section key={order.id} onClick={() => onOrderSelect(order)} className="cursor-pointer rounded-[14px] bg-[#F8F8F8] p-4 transition-colors hover:bg-[#f5f5f4]">
	                  <div className="flex flex-wrap items-center gap-3 px-1 pb-4">
	                    <span className="mr-1 text-[15px] font-bold text-[#161a18]">{order.id}</span>
	                    <span className={`inline-flex h-8 items-center gap-2 rounded-full px-3 text-[11px] font-semibold ${order.payMethod === "Pay by Clinic" ? "bg-[#20D8DB] text-[#102c2d]" : "bg-[#ACEABB] text-[#173d25]"}`}>
	                      {order.payMethod.replace("by", "By")}
	                      {order.payMethod === "Pay by Clinic" ? <Building2 size={13} /> : <User size={13} />}
	                      <span className={`rounded-full px-2 py-1 text-[8px] font-bold ${order.payStatus === "PAID" ? "bg-white text-[#173d25]" : "bg-[#FF4A87] text-white"}`}>{order.payStatus}</span>
	                    </span>
	                    <span className={`inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[11px] font-semibold ${silverStatusPillStyle[order.status] ?? "bg-[#FFC55B] text-[#151515]"}`}>{labelCase(order.status)} {silverStatusIcon(order.status)}</span>
	                    <span className={`inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-[11px] font-semibold ${order.shipMethod === "Ship to Clinic" ? "bg-[#20D8DB] text-[#102c2d]" : "bg-[#ACEABB] text-[#173d25]"}`}>
	                      {order.shipMethod.replace("to", "To")} {order.shipMethod === "Ship to Clinic" ? <Building2 size={13} /> : <User size={13} />}
	                    </span>
	                    <span className="inline-flex h-8 items-center rounded-full bg-white px-3 text-[11px] font-semibold text-[#60656d]">{groups.length} patients</span>
	                    <span className="inline-flex h-8 items-center rounded-full bg-white px-3 text-[11px] font-semibold text-[#60656d]">{productCount} prescriptions</span>
	                    <span className="ml-auto text-[15px] font-semibold text-[#161a18]">{order.total}</span>
	                  </div>

	                  <div className="space-y-3">
	                    {groups.map(({ patient, items }, groupIndex) => {
	                      const patientTotal = items.reduce((sum, { item }) => sum + Number(item.price.replace(/[$,]/g, "")), 0);
	                      return (
	                        <article key={`${order.id}-${patient.name}`} className="rounded-[13px] bg-white p-4">
	                          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#F1F1EF] pb-3">
	                            <div className="flex min-w-0 items-start gap-3">
	                              <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-[#F1F0EF] text-[12px] font-semibold text-[#183229]">{groupIndex + 1}</span>
	                              <div className="min-w-0">
	                                <div className="flex flex-wrap items-center gap-2">
	                                  <p className="truncate text-[14px] font-semibold text-[#161a18]">{patient.name} ({patient.gender})</p>
	                                  <span className="rounded-full bg-[#F8F8F8] px-2.5 py-1 text-[10px] font-semibold text-[#60656d]">{items.length} prescription{items.length === 1 ? "" : "s"}</span>
	                                </div>
	                                <p className="mt-1 text-[11px] text-[#5d6470]">{patient.phone}</p>
	                                <p className="mt-1 text-[11px] leading-[1.35] text-[#5d6470]">{patient.address}</p>
	                              </div>
	                            </div>
	                            <div className="rounded-full bg-[#F8F8F8] px-3 py-2 text-[11px] font-semibold text-[#60656d]">
	                              Patient total <span className="ml-2 text-[#161a18]">${patientTotal.toFixed(2)}</span>
	                            </div>
	                          </div>

	                          <div className="mt-3 grid gap-3 lg:grid-cols-2">
	                            {items.map(({ item, index }) => (
	                              <div key={`${order.id}-${patient.name}-${item.name}-${index}`} className="rounded-[11px] bg-[#FAFAFA] p-3">
	                                <div className="flex min-w-0 items-start gap-3">
	                                  <div className="flex h-[72px] w-[58px] shrink-0 items-center justify-center overflow-visible rounded-[9px] bg-white">
	                                    <img src={item.image} alt="" className="max-h-[70px] max-w-[52px] object-contain mix-blend-multiply" />
	                                  </div>
	                                  <div className="min-w-0 flex-1">
	                                    <div className="flex items-start justify-between gap-3">
	                                      <div className="min-w-0">
	                                        <p className="truncate text-[14px] font-semibold text-[#161a18]">{item.name}</p>
	                                        <p className="mt-1 truncate text-[12px] text-[#777]">{item.description}</p>
	                                      </div>
	                                      <p className="shrink-0 text-[13px] font-semibold text-[#161a18]">{item.price}</p>
	                                    </div>
	                                    <div className="mt-3 flex flex-wrap items-center gap-1.5">
	                                      <span className="rounded-full bg-white px-2 py-1 text-[9px] text-[#555]">Qty {item.qty}</span>
	                                      <span className="rounded-full bg-white px-2 py-1 text-[9px] text-[#555]">Auth {item.authRefills}</span>
	                                      <span className="rounded-full bg-white px-2 py-1 text-[9px] text-[#555]">Refills {item.refillsLeft}</span>
	                                      <span className="rounded-full bg-white px-2 py-1 text-[9px] text-[#555]">Days {item.daysSupply}</span>
	                                    </div>
	                                    <div className="mt-3 flex flex-wrap items-center gap-2">
	                                      <p className="truncate text-[11px] text-[#777]">{item.pharmacy}</p>
	                                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[9px] font-semibold ${(groupIndex + index) % 2 === 1 ? "bg-[#F6F6FF] text-[#4169E8]" : "bg-[#ECEBE3] text-[#2f3d35]"}`}>
	                                        {(groupIndex + index) % 2 === 1 && <Send size={12} strokeWidth={1.8} />}
	                                        {labelCase(item.tracking)}
	                                      </span>
	                                    </div>
	                                  </div>
	                                </div>
	                              </div>
	                            ))}
	                          </div>
	                        </article>
	                      );
	                    })}
	                  </div>

	                  <div className="mt-4 flex flex-wrap items-center gap-3 px-1">
	                    <span className="inline-flex h-9 items-center gap-2 rounded-full bg-white px-3 text-[12px] font-semibold text-[#183229]">
	                      Order Type
	                      <span className="inline-flex h-6 items-center rounded-full bg-[#F1F0EF] px-2.5 text-[11px] font-semibold text-[#111]">{labelCase(order.orderType)}</span>
	                    </span>
	                    <span className="inline-flex h-9 items-center gap-2 rounded-full bg-white px-3 text-[12px] font-semibold text-[#183229]">
	                      Order Timestamp
	                      <span className="inline-flex h-6 items-center rounded-full bg-[#F1F0EF] px-2.5 text-[11px] font-semibold text-[#111]">{order.timestamp}</span>
	                    </span>
	                  </div>
	                </section>
	              );
	            }

	            return (
            <section key={order.id} onClick={() => onOrderSelect(order)} className={`cursor-pointer overflow-hidden ${orderCardVariant === "current" ? "rounded-[13px] border border-[#e5ddd5] bg-white" : orderCardVariant === "silver" ? "rounded-[10px] bg-[#FBFBFB] p-3" : "rounded-[10px] bg-[var(--app-soft)] p-3"}`}>
              <div className={`flex flex-wrap items-center justify-between gap-3 ${orderCardVariant === "current" ? "border-b border-[#eee8e3] bg-[#fffcf8] px-5 py-4" : orderCardVariant === "silver" ? "bg-[#FBFBFB] px-2 pb-4 pt-2" : "bg-[var(--app-soft)] px-2 pb-4 pt-2"}`}>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[14px] font-bold text-[#1a1a1a]">{order.id}</span>
                  {orderCardVariant === "silver" ? <>
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold ${order.payMethod === "Pay by Clinic" ? "bg-[#20D8DB] text-[#102c2d]" : "bg-[#ACEABB] text-[#173d25]"}`}>
                      {labelCase(order.payMethod)} {order.payMethod === "Pay by Clinic" ? <Building2 size={13} /> : <User size={13} />}
                      <span className={`inline-flex h-4 min-w-[34px] items-center justify-center self-center rounded-full px-2 text-center text-[8px] font-bold uppercase leading-none ${order.payStatus === "PAID" ? "bg-white text-[#17201b]" : "bg-[#FF4A87] text-white"}`}>{order.payStatus}</span>
                    </span>
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold ${order.shipMethod === "Ship to Clinic" ? "bg-[#20D8DB] text-[#102c2d]" : "bg-[#ACEABB] text-[#173d25]"}`}>
                      {labelCase(order.shipMethod)} {order.shipMethod === "Ship to Clinic" ? <Building2 size={13} /> : <User size={13} />}
                    </span>
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold ${silverStatusPillStyle[order.status] ?? "bg-[#FFC55B] text-[#151515]"}`}>
                      {labelCase(order.status)} {silverStatusIcon(order.status)}
                    </span>
                  </> : <>
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold ${order.payMethod === "Pay by Clinic" ? "bg-[#20D8DB] text-[#102c2d]" : "bg-[#ACEABB] text-[#173d25]"}`}>
                      {labelCase(order.payMethod)} {order.payMethod === "Pay by Clinic" ? <Building2 size={13} /> : <User size={13} />}
                      <span className={`rounded-full px-2 py-0.5 text-[8px] font-bold ${order.payStatus === "PAID" ? "bg-white text-[#173d25]" : "bg-[#FF4A87] text-white"}`}>{labelCase(order.payStatus)}</span>
                    </span>
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold ${order.shipMethod === "Ship to Clinic" ? "bg-[#20D8DB] text-[#102c2d]" : "bg-[#ACEABB] text-[#173d25]"}`}>
                      {labelCase(order.shipMethod)} {order.shipMethod === "Ship to Clinic" ? <Building2 size={13} /> : <User size={13} />}
                    </span>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-bold tracking-[0.01em] ${statusPillStyle[order.status] ?? "bg-[#56203B] text-white"}`}>{labelCase(order.status)}</span>
                  </>}
                </div>
                <div className="text-right">
                  <p className="text-[15px] font-bold text-[#183229]">{order.total}</p>
                  <p className="text-[11px] text-[#8c95a1]">{order.timestamp}</p>
                </div>
              </div>

              {orderCardVariant === "optimized" ? (
                <div className="rounded-[8px] bg-white px-5 pb-5 pt-4">
                  <div className="flex flex-wrap gap-2 rounded-[9px] bg-[#fbfffd] px-4 py-3">
                    {("patients" in order ? order.patients : [order.patient]).map(patient => (
                      <div key={patient.name} className="min-w-[220px] flex-1">
                        <p className="text-[12px] font-semibold text-[#1a1a1a]">{patient.name} <span className="font-normal text-[#8c95a1]">({patient.gender})</span></p>
                        <p className="mt-1 text-[10px] text-[#6f7782]">{patient.phone} · {patient.address}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 grid gap-3 lg:grid-cols-2">
                    {(expandedItems[order.id] ? order.items : order.items.slice(0, 2)).map((item, index) => (
                      <article key={`${order.id}-${item.name}`} className="flex min-h-[142px] gap-4 rounded-[10px] bg-[#FFFAF7] p-4">
                        <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden bg-white">
                          <img src={item.image} alt="" className="size-16 object-contain mix-blend-multiply" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <p className="text-[13px] font-semibold leading-[17px] text-[#1a1a1a]">{item.name}</p>
                            <span className="shrink-0 text-[12px] font-bold text-[#1a1a1a]">{item.price}</span>
                          </div>
                          <p className="mt-1 text-[11px] text-[#6f7782]">{item.description}</p>
                          <p className="mt-1 text-[10px] text-[#8c95a1]">{item.pharmacy}</p>
                          <span className={`mt-2 inline-flex rounded-full px-2 py-0.5 text-[9px] font-semibold ${item.tracking === "Tracking Not Ready" ? "bg-[#E8E5B0] text-[#31583F]" : "bg-[#C5F5DD] text-[#31583F]"}`}>{labelCase(item.tracking)}</span>
                          <p className="mt-2 text-[10px] text-[#8c95a1]">Qty {quantities[`${order.id}-${index}`] ?? item.qty} · Refills {item.authRefills} · Days {item.daysSupply}</p>
                        </div>
                      </article>
                    ))}
                    {order.items.length > 2 && (
                      <div className="flex items-center lg:col-start-2">
                        <button onClick={(event) => { event.stopPropagation(); setExpandedItems(prev => ({ ...prev, [order.id]: !prev[order.id] })); }} className="inline-flex items-center gap-1.5 px-1 text-[10px] font-semibold text-[#183229] hover:underline hover:underline-offset-4">
                          <ChevronDown size={13} className={expandedItems[order.id] ? "rotate-180" : ""} />
                          {expandedItems[order.id] ? "Show fewer prescriptions" : `Show ${order.items.length - 2} more prescriptions`}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
              <div className={orderCardVariant === "current" ? "px-7 py-3" : "rounded-[8px] bg-white px-5 py-2"}>
                  {(expandedItems[order.id] ? order.items : order.items.slice(0, 2)).map((item, index) => {
                    const orderPatients = "patients" in order ? order.patients : [order.patient];
                    const patient = orderPatients[index] ?? orderPatients[orderPatients.length - 1];
                    return (
                      <div key={`${patient.name}-${item.name}`} className={`grid min-h-[126px] grid-cols-1 lg:grid-cols-[0.78fr_1.32fr] ${orderCardVariant === "current" ? `py-4 ${index === (expandedItems[order.id] ? order.items.length : Math.min(2, order.items.length)) - 1 ? "" : "border-b border-[#e8e5e2]"}` : "py-5"}`}>
                        <div className="px-3">
                          {(order.payMethod === "Pay by Clinic" || index === 0) && (
                            <>
                              <p className="text-[12px] font-semibold text-[#1a1a1a]">{patient.name} <span className="font-normal text-[#8c95a1]">({patient.gender})</span></p>
                              <p className="mt-1 text-[11px] text-[#6f7782]">{patient.phone}</p>
                              <p className="mt-1 text-[11px] leading-relaxed text-[#6f7782]">{patient.address}</p>
                            </>
                          )}
                        </div>
                        <div className="flex items-start justify-between gap-3 px-3">
                          <div className="flex min-w-0 gap-3">
                            <div className={`flex size-12 shrink-0 items-center justify-center overflow-hidden bg-white ${orderCardVariant === "current" ? "rounded-[8px] border border-[#eee8e3]" : ""}`}>
                              <img src={item.image} alt="" className="h-12 w-12 object-contain mix-blend-multiply" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-[12px] font-semibold text-[#1a1a1a]">{item.name}</p>
                              <p className="mt-0.5 text-[11px] text-[#6f7782]">{item.description}</p>
                              <p className="mt-1 text-[10px] text-[#8c95a1]">{item.pharmacy}</p>
                              {orderCardVariant === "silver" ? <span className="mt-1.5 inline-flex items-center gap-1.5 text-[9px] font-medium text-[#98A2B3]"><Clock size={11} strokeWidth={1.5} />{labelCase(item.tracking)}</span> : <span className={`mt-1.5 inline-flex rounded-full px-2 py-0.5 text-[9px] font-semibold ${item.tracking === "Tracking Not Ready" ? "bg-[#E8E5B0] text-[#31583F]" : "bg-[#C5F5DD] text-[#31583F]"}`}>{labelCase(item.tracking)}</span>}
                              <p className="mt-1 text-[10px] text-[#8c95a1]">Qty {quantities[`${order.id}-${index}`] ?? item.qty} · Auth refills {item.authRefills} · Refills left {item.refillsLeft} · Days {item.daysSupply}</p>
                            </div>
                          </div>
                          <span className="text-[12px] font-bold text-[#1a1a1a]">{item.price}</span>
                        </div>
                      </div>
                    );
                  })}
                  {order.items.length > 2 && (
                    <button onClick={(event) => { event.stopPropagation(); setExpandedItems(prev => ({ ...prev, [order.id]: !prev[order.id] })); }} className="mx-auto mt-2 flex w-fit items-center gap-1 py-1 text-[12px] font-semibold text-[#183229]">
                      <ChevronDown size={14} strokeWidth={2} className={`transition-transform ${expandedItems[order.id] ? "rotate-180" : ""}`} />
                      {expandedItems[order.id] ? "Show less" : `Show more ${order.items.length - 2} Prescriptions`}
                    </button>
                  )}
                </div>
              )}
            </section>
            );
          })}
        </div>
      )}
      </div>
    </>
  );

}

function OrderDetailPage({ order, onNavigate }: { order: typeof ORDERS[number]; onNavigate: (page: Page) => void }) {
  const [trackingLinkCopied, setTrackingLinkCopied] = useState(false);
  const [paymentLinkSent, setPaymentLinkSent] = useState(false);
  const [paymentLinkModalOpen, setPaymentLinkModalOpen] = useState(false);
  const [paymentPhone, setPaymentPhone] = useState(() => "patients" in order ? order.patients[0]?.phone ?? "" : order.patient.phone);
  const [cancellationModalOpen, setCancellationModalOpen] = useState(false);
  const [cancellationReason, setCancellationReason] = useState("");
  const [createTicketModalOpen, setCreateTicketModalOpen] = useState(false);
  const [detailSideTab, setDetailSideTab] = useState<"status" | "receipt">("status");
  const [selectedTrackingPharmacy, setSelectedTrackingPharmacy] = useState("Optimal Balance Pharmacy");
  const patients = "patients" in order ? order.patients : [order.patient];
  const patientTrackingLink = `https://scriptlinkrx.com/track/${order.id.replace('#','')}`;
  const statusSteps = ["Order Created", "In Progress", "Shipped", "Delivered"];
  const pharmacyTrackingOptions = [
    { name: "Optimal Balance Pharmacy", status: "In progress", activeStep: 1, updated: "Updated just now" },
    { name: "1st Choice Compounding Pharmacy", status: "Shipped", activeStep: 2, updated: "Updated 2 min ago" },
  ];
  const selectedPharmacyTracking = pharmacyTrackingOptions.find(pharmacy => pharmacy.name === selectedTrackingPharmacy) ?? pharmacyTrackingOptions[0];
  const effectivePharmacyTracking = order.payStatus === "UNPAID"
    ? { ...selectedPharmacyTracking, status: "Awaiting payment", activeStep: 0, updated: "Payment required" }
    : selectedPharmacyTracking;
  const compactLabel = "text-[9px] font-semibold uppercase tracking-[0.1em] text-[#8c95a1]";
  const detailStatusKey: OrderHistoryEntry["order_status"] = order.status === "Pending Payment" || order.status === "Pending Approval"
    ? "pending_payment"
    : order.status === "Shipped"
      ? "shipped"
      : order.status === "Delivered"
        ? "delivered"
        : "processing";
  return (
    <>
      <div className="max-w-[1400px]">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <PageBackButton onClick={() => onNavigate("orders")} label="Back to orders" />
          <h1 className="text-[22px] font-semibold text-[#1a1a1a]">Orders</h1>
        </div>
        <div className="ml-auto flex flex-wrap justify-end gap-2">
          <button className="inline-flex h-[35px] items-center gap-1.5 rounded-full border border-[#d8dedb] bg-white px-4 text-[11px] font-semibold text-black transition-colors hover:bg-[#f1f1f1]"><Download size={13} /> Download receipt</button>
          <button onClick={() => setCreateTicketModalOpen(true)} className="inline-flex h-[35px] items-center gap-1.5 rounded-full bg-[#272727] px-4 text-[11px] font-semibold text-white transition-colors hover:bg-[#111]"><Plus size={13} /> Create Ticket</button>
          <button onClick={() => setCancellationModalOpen(true)} className="inline-flex h-[35px] items-center rounded-full bg-[#FFE7D6] px-4 text-[11px] font-semibold text-[#7B003B] transition-colors hover:bg-[#ffdcc4]">Request cancellation</button>
        </div>
      </div>
      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-4">
          <section className="overflow-hidden rounded-[14px] bg-white">
            <div className="grid gap-x-5 gap-y-4 border-b border-[#eceeeb] bg-[#FBFBFB] px-5 py-4 sm:grid-cols-3 lg:grid-cols-[1.15fr_.8fr_1fr_1.05fr_1.35fr_.85fr]">
              <div><p className={compactLabel}>Order Timestamp</p><p className="mt-1 text-[12px] font-semibold text-[#161a18]">{order.timestamp}</p></div>
              <div><p className={compactLabel}>Order ID</p><p className="mt-1 text-[12px] font-semibold text-[#161a18]">{order.id}</p></div>
              <div><p className={compactLabel}>Status</p><div className="mt-1"><OrderHistoryV2Status status={detailStatusKey} label={order.status} /></div></div>
              <div><p className={compactLabel}>Ship To</p><div className="mt-1"><PendingV2ShipToChip shipTo={order.shipMethod === "Ship to Clinic" ? "clinic" : "patient"} items={order.items.length} /></div></div>
              <div><p className={compactLabel}>Payment Method</p><div className="mt-1"><OrderHistoryV2PayBy payBy={order.payMethod === "Pay by Clinic" ? "clinic" : "patient"} paid={order.payStatus === "PAID"} /></div></div>
              <div><p className={compactLabel}>Final Total</p><p className="mt-1 text-[12px] font-bold text-[#161a18]">{order.total}</p></div>
            </div>
            <div className="grid divide-y divide-[#eceeeb] lg:grid-cols-[1.15fr_.85fr] lg:divide-x lg:divide-y-0">
              <div className="px-5 py-4">
                <div className="mb-2 flex items-center gap-2"><p className={compactLabel}>Patient</p>{patients.length > 1 && <span className="rounded-full bg-[#eaf8fb] px-2 py-0.5 text-[9px] font-semibold text-[#21707d]">Multi Patient</span>}</div>
                <div className="space-y-3">
                  {patients.map(patient => (
                    <div key={patient.name} className="text-[11px] leading-[1.45] text-[#5f6863]">
                      <div className="flex items-center gap-1.5"><p className="font-semibold text-[#161a18]">{patient.name} <span className="font-medium text-[#777]">({patient.gender})</span></p><CopyButton text={patient.name} /></div>
                      <p className="mt-0.5">{patient.address}</p>
                      <div className="mt-0.5 flex items-center gap-1.5"><span>{patient.phone}</span><CopyButton text={patient.phone} /></div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="px-5 py-4">
                <p className={compactLabel}>Prescriber</p>
                <p className="mt-2 text-[11px] italic leading-[1.45] text-[#667085]">No prescriber has approved this order yet.</p>
              </div>
            </div>
          </section>

          <section className="overflow-hidden rounded-[14px] bg-white">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#eceeeb] bg-[#FBFBFB] px-5 py-4">
              <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-[9px] bg-white text-[#667085]"><Building2 size={17} /></span>
                <div><p className="text-[14px] font-semibold text-[#161a18]">{order.items[0].pharmacy}</p><p className="mt-0.5 text-[11px] text-[#667085]">Licensed compounding pharmacy</p></div>
              </div>
              <p className="text-[16px] font-bold text-[#161a18]">{order.total}</p>
            </div>
            <div className="grid gap-3 border-b border-[#eceeeb] px-5 py-3 sm:grid-cols-4">
              <div><p className={compactLabel}>Shipping Method</p><p className="mt-1 text-[11px] font-semibold text-[#161a18]">UPS Overnight Refrigerated</p></div>
              <div><p className={compactLabel}>Est. Delivery</p><p className="mt-1 text-[11px] font-semibold text-[#161a18]">Pending</p></div>
              <div><p className={compactLabel}>Tracking</p><p className="mt-1 text-[11px] text-[#8c95a1]">Tracking Not Ready</p></div>
              <div><p className={compactLabel}>Handling</p><span className="mt-1 inline-flex rounded-full bg-[#edf8fb] px-2 py-0.5 text-[9px] font-semibold text-[#21707d]">Refrigerated</span></div>
            </div>
            <div className="divide-y divide-[#eceeeb]">
              {order.items.map((item, index) => {
                const patient = patients[index] ?? patients[patients.length - 1] ?? patients[0];
                const isSupply = item.name.toLowerCase().includes("supplies") || item.name.toLowerCase().includes("needle");
                return (
                  <div key={`${item.name}-${index}`}>
                    <div className="flex flex-wrap items-center gap-2 bg-[#FBFBFB] px-5 py-2 text-[10px] text-[#667085]">
                      <User size={12} className="text-[#05AF3B]" />
                      <span className="font-semibold text-[#161a18]">{patient.name} ({patient.gender})</span>
                      <span>|</span><span>{patient.phone}</span>
                      <span>|</span><span>{patient.address}</span>
                    </div>
                    <div className="grid gap-4 px-5 py-4 md:grid-cols-[minmax(0,1fr)_70px_70px_70px_90px]">
                      <div className="flex gap-3">
                        <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-[7px] border border-[#eeeeec] bg-white">
                          <img src={item.image} alt="" className="size-11 object-contain mix-blend-multiply" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-[12px] font-semibold text-[#161a18]">{item.name}</p>
                            {!isSupply && <span className="inline-flex rounded-full bg-gradient-to-r from-[#FFE2D2] to-[#FFF45C] px-2 py-0.5 text-[9px] font-semibold text-[#56203B]">Open Rx</span>}
                          </div>
                          <p className="mt-1 text-[11px] text-[#667085]">{item.description}</p>
                          {!isSupply && <><p className="mt-2 text-[10px] text-[#161a18]"><strong>Sig:</strong> Use as directed by prescriber.</p><p className="mt-1 text-[10px] text-[#161a18]"><strong>Reason:</strong> Patient requires a customized compounded formulation.</p></>}
                          {isSupply && <p className="mt-1 text-[10px] text-[#8c95a1]">Suitable amount</p>}
                        </div>
                      </div>
                      <div className="max-md:hidden"><p className={compactLabel}>Days Supply</p><p className="mt-2 text-[11px] font-semibold">{item.daysSupply}</p></div>
                      <div className="max-md:hidden"><p className={compactLabel}>Refills</p><p className="mt-2 text-[11px] font-semibold">{item.authRefills}</p></div>
                      <div className="max-md:hidden"><p className={compactLabel}>Qty</p><p className="mt-2 text-[11px] font-semibold">{item.qty}</p></div>
                      <p className="text-right text-[12px] font-bold text-[#161a18]">{item.price}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
        <aside className="sticky top-6 space-y-6">
          <div className="flex border-b border-[#d8ddd9] bg-white">
            {(["status", "receipt"] as const).map(tab => (
              <button key={tab} onClick={() => setDetailSideTab(tab)} className={`relative h-12 flex-1 text-[12px] font-semibold transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full ${detailSideTab === tab ? "text-[#161a18] after:bg-[#183229]" : "text-[#667085] after:bg-transparent hover:text-[#161a18]"}`}>
                {tab === "status" ? "Order status" : "Receipt"}
              </button>
            ))}
          </div>
          {detailSideTab === "status" ? <>
            <section className="rounded-[14px] bg-[#FBFBFB] p-6">
              <h2 className="text-[18px] font-semibold text-[#161a18]">Order status</h2>
              <p className="mt-1 text-[11px] text-[#667085]">Select a pharmacy to view its progress.</p>
              <div className="relative mt-4">
                <select value={selectedTrackingPharmacy} onChange={event => setSelectedTrackingPharmacy(event.target.value)} aria-label="Select pharmacy to track" className="h-10 w-full appearance-none rounded-[10px] border border-[#d7dce1] bg-white pl-3 pr-9 text-[11px] font-medium text-[#202020] outline-none focus:border-[#2563EB]">
                  {pharmacyTrackingOptions.map(pharmacy => <option key={pharmacy.name} value={pharmacy.name}>{pharmacy.name}</option>)}
                </select>
                <ChevronsUpDown size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#667085]" />
              </div>
              <div className="mt-2 flex items-center justify-between px-1 text-[9px]">
                <span className="inline-flex items-center gap-1.5 font-semibold text-[#344054]"><span className={`size-2 rounded-full ${order.payStatus === "UNPAID" ? "bg-[#d92d20]" : "bg-[#22c55e]"}`} />{effectivePharmacyTracking.status}</span>
                <span className="text-[#7b8290]">{effectivePharmacyTracking.updated}</span>
              </div>
              <div className="mt-6">{statusSteps.map((step,index) => (
                <div key={step} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <span className={`flex size-9 items-center justify-center rounded-full ${index <= effectivePharmacyTracking.activeStep ? order.payStatus === "UNPAID" ? "bg-[linear-gradient(135deg,#56203B_0%,#8F3F63_52%,#E8BFD2_100%)] text-white" : "bg-[linear-gradient(135deg,#1746D1_0%,#3B82F6_48%,#A7C8FF_100%)] text-white" : "bg-[#edf0f2] text-[#9aa1a8]"}`}>{index === 0 ? <Package size={15}/> : <CheckCircle2 size={15}/>}</span>
                    {index < statusSteps.length - 1 && <span className="h-10 w-px bg-[#dfe5e2]" />}
                  </div>
                  <div className="pt-1"><p className="text-[13px] font-semibold text-[#161a18]">{step}</p>{index === 0 && <><p className="mt-1 text-[11px] text-[#667085]">{order.timestamp}</p><p className={`mt-1 text-[11px] font-semibold ${order.payStatus === "PAID" ? "text-[#2563EB]" : "text-[#d92d20]"}`}>Payment {order.payStatus.toLowerCase()}</p></>}</div>
                </div>
              ))}</div>
              {order.status === "Pending Payment" && (
                <button type="button" onClick={() => setPaymentLinkModalOpen(true)} className="mt-5 flex h-[35px] w-full items-center justify-center gap-2 rounded-full bg-black px-4 text-[11px] font-semibold text-white transition-colors hover:bg-[#242424]">
                  <Send size={13} /> {paymentLinkSent ? "Payment link sent" : "Resend payment link"}
                </button>
              )}
              <div className="mt-6 flex items-center gap-3 rounded-[12px] bg-[radial-gradient(circle_at_90%_0%,rgba(219,232,255,0.98),transparent_52%),linear-gradient(145deg,#f8fbff_0%,#edf4ff_100%)] px-4 py-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white text-[#667085]"><Bell size={15} /></span>
                <div><p className="text-[12px] font-semibold text-[#161a18]">Live updates.</p><p className="mt-0.5 text-[11px] leading-4 text-[#667085]">Always in the know.</p></div>
              </div>
            </section>
            <section className="bg-white px-5 py-4">
              <h3 className="text-[15px] font-semibold text-[#161a18]">Share with patient</h3>
              <p className="mt-1 text-[12px] leading-5 text-[#667085]">Send this link so your patient can track their order.</p>
              <div className="mt-4 flex items-center gap-2 rounded-[9px] border border-[#e1e5e8] bg-[#FBFBFB] px-3 py-2.5">
                <span className="min-w-0 flex-1 truncate text-[11px] text-[#52645c]">{patientTrackingLink}</span>
                <button onClick={() => navigator.clipboard.writeText(patientTrackingLink).then(() => { setTrackingLinkCopied(true); window.setTimeout(() => setTrackingLinkCopied(false), 1600); })} className="flex shrink-0 items-center justify-center text-[#98a2b3] hover:text-[#183229]" aria-label="Copy patient tracking link">{trackingLinkCopied ? <CheckCircle2 size={15} /> : <svg width="15" height="15" viewBox="0 0 12 12" fill="none"><rect x="3.5" y="3.5" width="7" height="7" rx="1.2" stroke="currentColor"/><path d="M1.5 8V1.5H8" stroke="currentColor" strokeLinecap="round"/></svg>}</button>
              </div>
            </section>
          </> : <section className="rounded-[18px] bg-white p-6 shadow-[0_18px_50px_rgba(20,26,23,0.06)]"><h2 className="text-[18px] font-semibold">Receipt</h2><p className="mt-1 text-[11px] text-[#667085]">Order {order.id}</p><div className="mt-5 space-y-3">{order.items.map(item => <div key={item.name} className="flex justify-between gap-3 text-[11px]"><span className="text-[#667085]">{item.name}</span><span className="font-semibold">{item.price}</span></div>)}</div><div className="mt-5 border-t border-[#e8e3df] pt-4"><div className="flex justify-between text-[12px]"><span>Shipping</span><span className="font-semibold">Included</span></div><div className="mt-3 flex justify-between text-[15px] font-bold"><span>Total</span><span className="text-[#183229]">{order.total}</span></div></div><button className="mt-5 flex h-10 w-full items-center justify-center gap-2 rounded-full bg-[#111] text-[11px] font-semibold text-white"><Download size={13} /> Download receipt</button></section>}
        </aside>
      </div>
      </div>
      {paymentLinkModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 p-5 backdrop-blur-[2px]">
          <button type="button" className="absolute inset-0 cursor-default" onClick={() => setPaymentLinkModalOpen(false)} aria-label="Close resend payment link" />
          <form onSubmit={event => { event.preventDefault(); setPaymentLinkModalOpen(false); setPaymentLinkSent(true); window.setTimeout(() => setPaymentLinkSent(false), 2200); }} className="relative z-10 w-full max-w-[440px] overflow-hidden rounded-[10px] bg-white shadow-[0_24px_70px_rgba(0,0,0,0.2)]">
            <div className="flex items-start justify-between border-b border-[#ececec] px-6 py-5">
              <div><h2 className="text-[19px] font-semibold text-[#171717]">Resend payment link</h2><p className="mt-1.5 max-w-[330px] text-[12px] leading-5 text-[#667085]">We’ll send a secure payment link by SMS to the patient’s phone number.</p></div>
              <button type="button" onClick={() => setPaymentLinkModalOpen(false)} className="flex size-8 items-center justify-center text-[#777] transition-colors hover:text-black" aria-label="Close"><X size={18} /></button>
            </div>
            <div className="px-6 py-5">
              <label className="block"><span className="mb-1.5 block text-[11px] font-medium text-[#292929]">Phone number <span className="text-[#d92d20]">*</span></span><input required type="tel" value={paymentPhone} onChange={event => setPaymentPhone(event.target.value)} className="h-10 w-full rounded-[10px] border border-[#d8d8d8] bg-white px-3.5 text-[12px] text-[#171717] outline-none focus:border-black" /></label>
            </div>
            <div className="flex justify-end gap-2 border-t border-[#ececec] px-6 py-4">
              <button type="button" onClick={() => setPaymentLinkModalOpen(false)} className="h-[35px] rounded-full border border-[#d8d8d8] bg-white px-5 text-[11px] font-medium text-black transition-colors hover:bg-[#f1f1f1]">Cancel</button>
              <button type="submit" className="h-[35px] rounded-full bg-black px-6 text-[11px] font-semibold text-white transition-colors hover:bg-[#242424]">Send link</button>
            </div>
          </form>
        </div>
      )}
      {cancellationModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 p-5 backdrop-blur-[2px]">
          <button type="button" className="absolute inset-0 cursor-default" onClick={() => setCancellationModalOpen(false)} aria-label="Close cancellation request" />
          <form onSubmit={event => { event.preventDefault(); if (!cancellationReason.trim()) return; setCancellationModalOpen(false); setCancellationReason(""); }} className="relative z-10 w-full max-w-[500px] overflow-hidden rounded-[10px] bg-white shadow-[0_24px_70px_rgba(0,0,0,0.2)]">
            <div className="flex items-start justify-between border-b border-[#ececec] px-6 py-5">
              <div><h2 className="text-[19px] font-semibold text-[#171717]">Request order cancellation</h2><p className="mt-1.5 max-w-[380px] text-[12px] leading-5 text-[#667085]">Please provide a reason for requesting cancellation of this order.</p></div>
              <button type="button" onClick={() => setCancellationModalOpen(false)} className="flex size-8 items-center justify-center text-[#777] transition-colors hover:text-black" aria-label="Close"><X size={18} /></button>
            </div>
            <div className="px-6 py-5">
              <label className="block"><span className="mb-1.5 block text-[11px] font-medium text-[#292929]">Reason <span className="text-[#d92d20]">*</span></span><textarea autoFocus required value={cancellationReason} onChange={event => setCancellationReason(event.target.value)} rows={5} placeholder="Explain why this order should be cancelled" className="w-full resize-none rounded-[10px] border border-[#d8d8d8] bg-white px-3.5 py-3 text-[12px] leading-5 text-[#171717] outline-none placeholder:text-[#aaa] focus:border-black" /></label>
            </div>
            <div className="flex justify-end gap-2 border-t border-[#ececec] px-6 py-4">
              <button type="button" onClick={() => setCancellationModalOpen(false)} className="h-[35px] rounded-full border border-[#d8d8d8] bg-white px-5 text-[11px] font-medium text-black transition-colors hover:bg-[#f1f1f1]">Back</button>
              <button type="submit" disabled={!cancellationReason.trim()} className="h-[35px] rounded-full px-5 text-[11px] font-semibold transition-colors disabled:cursor-not-allowed disabled:bg-[#ededed] disabled:text-[#999] enabled:bg-[#D92D20] enabled:text-white enabled:hover:bg-[#b42318]">Request cancellation</button>
            </div>
          </form>
        </div>
      )}
      <SupportCreateTicketModal open={createTicketModalOpen} onClose={() => setCreateTicketModalOpen(false)} onCreate={() => setCreateTicketModalOpen(false)} />
    </>
  );
}

// ─── Order History ────────────────────────────────────────────────────────────

const ORDER_HISTORY_RANGE_PRESETS = [
  { value: "all", label: "All time" },
  { value: "this_month", label: "This month" },
  { value: "last_month", label: "Last month" },
  { value: "this_year", label: "This year" },
  { value: "custom", label: "Custom range" },
];

const ORDER_HISTORY_PAYER_OPTIONS = [
  { value: "all", label: "All payers" },
  { value: "clinic", label: "Paid by Clinic (Card)" },
  { value: "clinic_ach", label: "Paid by Clinic (ACH)" },
  { value: "patient", label: "Paid by Patient" },
];

const ORDER_HISTORY_STATUS_OPTIONS = [
  { value: "all", label: "All statuses" },
  { value: "pending_payment", label: "Pending payment" },
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

interface OrderHistoryEntry {
  order_id: string;
  created_at: string;
  patient_name: string;
  is_multi_patient: boolean;
  order_type: "order" | "refill";
  is_custom: boolean;
  order_status: "processing" | "pending_payment" | "cancelled" | "shipped" | "delivered";
  payment_method: "clinic" | "clinic_ach" | "patient";
  is_paid: boolean;
  is_cancelled: boolean;
  total_price: number;
  refunded_amount: number;
  net_paid: number;
  payment_timestamp: string | null;
}

const orderHistoryDaysAgo = (days: number, hour = 10, minute = 24) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
};

const ORDER_HISTORY_ENTRIES: OrderHistoryEntry[] = [
  { order_id: "8f2c91d34a6e47b1905cfd12e8a3f82c9a3f82c1", created_at: orderHistoryDaysAgo(0, 9, 14), patient_name: "Sarah Mitchell", is_multi_patient: false, order_type: "order", is_custom: false, order_status: "pending_payment", payment_method: "patient", is_paid: false, is_cancelled: false, total_price: 215.98, refunded_amount: 0, net_paid: 0, payment_timestamp: null },
  { order_id: "1d84f7a2c95b40e3871a6f0d24b7c1e94d67b2e0", created_at: orderHistoryDaysAgo(1, 15, 42), patient_name: "", is_multi_patient: true, order_type: "order", is_custom: false, order_status: "processing", payment_method: "clinic", is_paid: true, is_cancelled: false, total_price: 431.96, refunded_amount: 0, net_paid: 431.96, payment_timestamp: orderHistoryDaysAgo(1, 15, 44) },
  { order_id: "6b09e3d18f4a42c7953e2a8b06d1f7358c2ad490", created_at: orderHistoryDaysAgo(2, 11, 8), patient_name: "David Lim", is_multi_patient: false, order_type: "refill", is_custom: false, order_status: "shipped", payment_method: "clinic_ach", is_paid: true, is_cancelled: false, total_price: 55.88, refunded_amount: 0, net_paid: 55.88, payment_timestamp: orderHistoryDaysAgo(2, 11, 9) },
  { order_id: "4e71a0c58d2b46f9812c5e3a97b0d64125f8ce37", created_at: orderHistoryDaysAgo(4, 14, 31), patient_name: "Maria Santos", is_multi_patient: false, order_type: "order", is_custom: true, order_status: "delivered", payment_method: "patient", is_paid: true, is_cancelled: false, total_price: 189.5, refunded_amount: 0, net_paid: 189.5, payment_timestamp: orderHistoryDaysAgo(4, 14, 35) },
  { order_id: "9c35b8e07f1d49a2864b0d7c53e9a18670e4b9a5", created_at: orderHistoryDaysAgo(6, 10, 2), patient_name: "John Reynolds", is_multi_patient: false, order_type: "order", is_custom: false, order_status: "cancelled", payment_method: "clinic", is_paid: true, is_cancelled: true, total_price: 65.99, refunded_amount: 65.99, net_paid: 0, payment_timestamp: orderHistoryDaysAgo(6, 10, 5) },
  { order_id: "2a68d4f19c0e47b5923f8a1d65c0b39784c1d5f8", created_at: orderHistoryDaysAgo(8, 16, 55), patient_name: "Allison Johnson", is_multi_patient: false, order_type: "order", is_custom: false, order_status: "delivered", payment_method: "clinic", is_paid: true, is_cancelled: false, total_price: 145.0, refunded_amount: 25.0, net_paid: 120.0, payment_timestamp: orderHistoryDaysAgo(8, 17, 1) },
  { order_id: "7f50c2e94b8d41a6879e3c5f02a6d81b39e7f0a2", created_at: orderHistoryDaysAgo(10, 8, 47), patient_name: "Emily Krause", is_multi_patient: false, order_type: "refill", is_custom: false, order_status: "shipped", payment_method: "patient", is_paid: true, is_cancelled: false, total_price: 89.99, refunded_amount: 0, net_paid: 89.99, payment_timestamp: orderHistoryDaysAgo(10, 9, 0) },
  { order_id: "0d97e5a36c2f48b1904a7e6d31f5c08246a9d3b7", created_at: orderHistoryDaysAgo(12, 13, 19), patient_name: "", is_multi_patient: true, order_type: "order", is_custom: false, order_status: "delivered", payment_method: "clinic_ach", is_paid: true, is_cancelled: false, total_price: 325.75, refunded_amount: 0, net_paid: 325.75, payment_timestamp: orderHistoryDaysAgo(12, 13, 25) },
  { order_id: "5b23f8d60a9e47c3812d6b4f95e0a27158d3c6e9", created_at: orderHistoryDaysAgo(21, 12, 33), patient_name: "John Reynolds", is_multi_patient: false, order_type: "order", is_custom: false, order_status: "delivered", payment_method: "clinic", is_paid: true, is_cancelled: false, total_price: 215.98, refunded_amount: 0, net_paid: 215.98, payment_timestamp: orderHistoryDaysAgo(21, 12, 40) },
  { order_id: "3e86a1c74f0b45d2913c8e5a60d2f94b07c5e8a1", created_at: orderHistoryDaysAgo(24, 9, 51), patient_name: "Chris Baker", is_multi_patient: false, order_type: "refill", is_custom: false, order_status: "delivered", payment_method: "patient", is_paid: true, is_cancelled: false, total_price: 74.25, refunded_amount: 0, net_paid: 74.25, payment_timestamp: orderHistoryDaysAgo(23, 11, 12) },
  { order_id: "b49d0f2a68e1c45379a2d0f8b46e1c5392b6f0d4", created_at: orderHistoryDaysAgo(27, 15, 6), patient_name: "Dan Rahming", is_multi_patient: false, order_type: "order", is_custom: false, order_status: "cancelled", payment_method: "patient", is_paid: false, is_cancelled: true, total_price: 129.99, refunded_amount: 0, net_paid: 0, payment_timestamp: null },
  { order_id: "c72e5b9a04d8f16385b4e7a2c90d5f18a4d7b2e5", created_at: orderHistoryDaysAgo(31, 10, 28), patient_name: "", is_multi_patient: true, order_type: "order", is_custom: false, order_status: "delivered", payment_method: "clinic_ach", is_paid: true, is_cancelled: false, total_price: 512.4, refunded_amount: 0, net_paid: 512.4, payment_timestamp: orderHistoryDaysAgo(31, 10, 30) },
  { order_id: "e18c4a7f52b0d69347f1c8e5a2b0d69e6f9a3c70", created_at: orderHistoryDaysAgo(36, 14, 15), patient_name: "Tom Taylor", is_multi_patient: false, order_type: "order", is_custom: false, order_status: "delivered", payment_method: "clinic", is_paid: true, is_cancelled: false, total_price: 55.88, refunded_amount: 10.0, net_paid: 45.88, payment_timestamp: orderHistoryDaysAgo(36, 14, 20) },
  { order_id: "a05f8d3c61e947b2854a0d6f13c8e5b2d1e8f4a6", created_at: orderHistoryDaysAgo(75, 11, 44), patient_name: "Alex Rahming", is_multi_patient: false, order_type: "order", is_custom: false, order_status: "delivered", payment_method: "patient", is_paid: true, is_cancelled: false, total_price: 129.99, refunded_amount: 0, net_paid: 129.99, payment_timestamp: orderHistoryDaysAgo(75, 12, 2) },
  { order_id: "f63b0e8a25d9c47180c3f6a9d52e0b473c9e6a1d", created_at: orderHistoryDaysAgo(110, 16, 20), patient_name: "Taylor Mitchell", is_multi_patient: false, order_type: "order", is_custom: false, order_status: "delivered", payment_method: "clinic", is_paid: true, is_cancelled: false, total_price: 260.0, refunded_amount: 0, net_paid: 260.0, payment_timestamp: orderHistoryDaysAgo(110, 16, 26) },
  { order_id: "48a7d1f0b3e6c25976e2a5f8c10d4b3985f2c7d0", created_at: orderHistoryDaysAgo(150, 9, 5), patient_name: "Mark Wood", is_multi_patient: false, order_type: "order", is_custom: true, order_status: "delivered", payment_method: "clinic_ach", is_paid: true, is_cancelled: false, total_price: 199.99, refunded_amount: 0, net_paid: 199.99, payment_timestamp: orderHistoryDaysAgo(149, 10, 40) },
  { order_id: "d94c6e2b70a1f58324b8d1e6f0a3c57b8e1d4f69", created_at: orderHistoryDaysAgo(300, 13, 58), patient_name: "", is_multi_patient: true, order_type: "order", is_custom: false, order_status: "delivered", payment_method: "clinic", is_paid: true, is_cancelled: false, total_price: 340.12, refunded_amount: 0, net_paid: 340.12, payment_timestamp: orderHistoryDaysAgo(300, 14, 4) },
  { order_id: "17e9b5a48c2d06f3958c0b7e4a1d6f2043a8e5b1", created_at: orderHistoryDaysAgo(340, 10, 12), patient_name: "Eve K.", is_multi_patient: false, order_type: "refill", is_custom: false, order_status: "delivered", payment_method: "patient", is_paid: true, is_cancelled: false, total_price: 96.4, refunded_amount: 0, net_paid: 96.4, payment_timestamp: orderHistoryDaysAgo(340, 10, 18) },
];

const orderHistoryMoney = (amount: number) => `$${(amount ?? 0).toFixed(2)}`;

const orderHistoryDateKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

function resolveOrderHistoryRange(preset: string, customStart: string, customEnd: string): { startDate?: string; endDate?: string } {
  const now = new Date();
  switch (preset) {
    case "this_month":
      return { startDate: orderHistoryDateKey(new Date(now.getFullYear(), now.getMonth(), 1)), endDate: orderHistoryDateKey(now) };
    case "last_month":
      return {
        startDate: orderHistoryDateKey(new Date(now.getFullYear(), now.getMonth() - 1, 1)),
        endDate: orderHistoryDateKey(new Date(now.getFullYear(), now.getMonth(), 0)),
      };
    case "this_year":
      return { startDate: orderHistoryDateKey(new Date(now.getFullYear(), 0, 1)), endDate: orderHistoryDateKey(now) };
    case "custom": {
      const startDate = customStart || undefined;
      const endDate = customEnd || undefined;
      if (startDate && endDate && startDate > endDate) return { startDate };
      return { startDate, endDate };
    }
    default:
      return {};
  }
}

const ORDER_HISTORY_STATUS_CONFIG = {
  processing: { label: "Processing", bgColor: "#FFC766", darkText: true },
  pending_payment: { label: "Pending Payment", bgColor: "#EC0000", darkText: false },
  cancelled: { label: "Cancelled", bgColor: "#EC0000", darkText: false },
  shipped: { label: "Shipped", bgColor: "#2D63E8", darkText: false },
  delivered: { label: "Delivered", bgColor: "#00AE30", darkText: false },
} as const;

function OrderHistoryStatusIcon({ status }: { status: OrderHistoryEntry["order_status"] }) {
  const props = { width: 14, height: 14, viewBox: "0 0 12 12", fill: "none", xmlns: "http://www.w3.org/2000/svg" };
  switch (status) {
    case "processing":
      return <svg {...props}><path d="M8.01138 4.6742H10.5077V4.67332M1.49207 9.82219V7.32587M1.49207 7.32587L3.98839 7.32587M1.49207 7.32587L3.08251 8.91735C3.57777 9.41354 4.2063 9.78999 4.93218 9.98449C7.13272 10.5741 9.39462 9.26822 9.98425 7.06767M2.01536 4.93242C2.605 2.73187 4.86689 1.42597 7.06744 2.0156C7.79332 2.2101 8.42185 2.58656 8.91711 3.08275L10.5077 4.67332M10.5077 2.1779V4.67332" stroke="#020202" strokeLinecap="round" strokeLinejoin="round" /></svg>;
    case "pending_payment":
      return <svg {...props}><path d="M1.125 9.375C3.8586 9.375 6.5068 9.74062 9.02338 10.4256C9.38688 10.5246 9.75 10.2543 9.75 9.87756V9.375M1.875 2.25V2.625C1.875 2.83211 1.70711 3 1.5 3H1.125M1.125 3V2.8125C1.125 2.50184 1.37684 2.25 1.6875 2.25H10.125M1.125 3V7.5M10.125 2.25V2.625C10.125 2.83211 10.2929 3 10.5 3H10.875M10.125 2.25H10.3125C10.6232 2.25 10.875 2.50184 10.875 2.8125V7.6875C10.875 7.99816 10.6232 8.25 10.3125 8.25H10.125M10.875 7.5H10.5C10.2929 7.5 10.125 7.66789 10.125 7.875V8.25M10.125 8.25H1.875M1.875 8.25H1.6875C1.37684 8.25 1.125 7.99816 1.125 7.6875V7.5M1.875 8.25V7.875C1.875 7.66789 1.70711 7.5 1.5 7.5H1.125M7.5 5.25C7.5 6.07843 6.82843 6.75 6 6.75C5.17157 6.75 4.5 6.07843 4.5 5.25C4.5 4.42157 5.17157 3.75 6 3.75C6.82843 3.75 7.5 4.42157 7.5 5.25ZM9 5.25H9.00375V5.25375H9V5.25ZM3 5.25H3.00375V5.25375H3V5.25Z" stroke="#FCFCFC" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
    case "cancelled":
      return <svg {...props}><path d="M5.99989 4.49997V6.37497M1.34826 8.06278C0.915571 8.81278 1.45686 9.74997 2.32272 9.74997H9.67705C10.5429 9.74997 11.0842 8.81278 10.6515 8.06278L6.97434 1.68903C6.54141 0.938617 5.45836 0.938617 5.02543 1.68903L1.34826 8.06278ZM5.99989 7.87497H6.00364V7.87872H5.99989V7.87497Z" stroke="#FCFCFC" strokeLinecap="round" strokeLinejoin="round" /></svg>;
    case "shipped":
      return <svg {...props}><path d="M2.99986 6L1.6344 1.56226C4.94197 2.52308 8.01379 4.038 10.7427 5.99987C8.01381 7.96177 4.942 9.47673 1.63445 10.4376L2.99986 6ZM2.99986 6L6.75 6" stroke="#FCFCFC" strokeLinecap="round" strokeLinejoin="round" /></svg>;
    case "delivered":
      return <svg {...props}><path d="M4.5 6.375L5.625 7.5L7.5 4.875M10.5 6C10.5 8.48528 8.48528 10.5 6 10.5C3.51472 10.5 1.5 8.48528 1.5 6C1.5 3.51472 3.51472 1.5 6 1.5C8.48528 1.5 10.5 3.51472 10.5 6Z" stroke="#FCFCFC" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  }
}

function OrderHistoryStatusChip({ status }: { status: OrderHistoryEntry["order_status"] }) {
  const config = ORDER_HISTORY_STATUS_CONFIG[status];
  return (
    <span
      className={`inline-flex h-7 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-3 text-[11px] font-semibold ${config.darkText ? "text-[#020202]" : "text-white"}`}
      style={{ backgroundColor: config.bgColor }}
    >
      {config.label}
      <span className="flex size-3.5 items-center justify-center"><OrderHistoryStatusIcon status={status} /></span>
    </span>
  );
}

function OrderHistoryV2Status({ status, label, large = false }: { status: OrderHistoryEntry["order_status"]; label?: string; large?: boolean }) {
  const config = ORDER_HISTORY_STATUS_CONFIG[status];
  return (
    <span className={`inline-flex shrink-0 items-center whitespace-nowrap rounded-full bg-[#f1f1f1] pl-1 pr-3 text-[11px] font-normal text-[#333] ${large ? "h-8 gap-2" : "h-7 gap-1.5"}`}>
      <span className={`flex items-center justify-center rounded-full ${large ? "size-6 [&_svg]:size-[13px]" : "size-5 [&_svg]:size-3"}`} style={{ backgroundColor: config.bgColor }}><OrderHistoryStatusIcon status={status} /></span>
      {label ?? config.label}
    </span>
  );
}

function OrderHistoryV2PayBy({ payBy, paid }: { payBy: OrderHistoryEntry["payment_method"]; paid?: boolean }) {
  const isPatient = payBy === "patient";
  return (
    <span className={`inline-flex h-7 items-center gap-1.5 whitespace-nowrap rounded-full bg-[#f1f1f1] pl-1 text-[11px] font-normal text-[#333] ${paid === undefined ? "pr-3" : "pr-1"}`}>
      <span className={`flex size-5 items-center justify-center rounded-full text-white ${isPatient ? "bg-[#35B467]" : "bg-[#20C9D2]"}`}>
        {isPatient ? <User size={12} strokeWidth={2} /> : <Building2 size={12} strokeWidth={2} />}
      </span>
      {isPatient ? "Pay by Patient" : "Pay by Clinic"}
      {paid !== undefined && <PaymentStateLabel paid={paid} />}
    </span>
  );
}

function PaymentStateLabel({ paid }: { paid: boolean }) {
  return (
    <span className={`inline-flex h-5 items-center rounded-full px-2 text-[9px] font-semibold text-white ${paid ? "bg-[#246B3C]" : "bg-[#8F1D2C]"}`}>
      {paid ? "Paid" : "Unpaid"}
    </span>
  );
}

function OrderHistoryPayByChip({ payBy, showStatus = false, neutral = false, isPaid }: { payBy: OrderHistoryEntry["payment_method"]; showStatus?: boolean; neutral?: boolean; isPaid?: boolean }) {
  const isPatient = payBy === "patient";
  const paymentIsPaid = isPaid ?? payBy === "clinic_ach";
  return (
    <span
      className={`inline-flex h-7 items-center justify-center gap-1.5 whitespace-nowrap rounded-full pl-3 text-[11px] text-[#171717] ${showStatus ? "pr-1" : "pr-3"} ${neutral ? "font-medium" : "font-semibold"}`}
      style={{ backgroundColor: isPatient ? "#ACEABB" : "#20D8DB" }}
    >
      {isPatient ? "Pay by Patient" : "Pay by Clinic"}
      <span className="flex size-3.5 items-center justify-center">
        {isPatient ? (
          <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.99077 9.3624C8.30605 8.45873 7.2212 7.875 6 7.875C4.7788 7.875 3.69395 8.45873 3.00923 9.3624M8.99077 9.3624C9.91675 8.53817 10.5 7.3372 10.5 6C10.5 3.51472 8.48528 1.5 6 1.5C3.51472 1.5 1.5 3.51472 1.5 6C1.5 7.3372 2.08325 8.53817 3.00923 9.3624M8.99077 9.3624C8.19575 10.0701 7.14808 10.5 6 10.5C4.85192 10.5 3.80425 10.0701 3.00923 9.3624M7.5 4.875C7.5 5.70343 6.82843 6.375 6 6.375C5.17157 6.375 4.5 5.70343 4.5 4.875C4.5 4.04657 5.17157 3.375 6 3.375C6.82843 3.375 7.5 4.04657 7.5 4.875Z" stroke="#020202" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.125 10.5H10.875M1.875 1.5V10.5M7.125 1.5V10.5M10.125 3.75V10.5M3.375 3.375H3.75M3.375 4.875H3.75M3.375 6.375H3.75M5.25 3.375H5.625M5.25 4.875H5.625M5.25 6.375H5.625M3.375 10.5V8.8125C3.375 8.50184 3.62684 8.25 3.9375 8.25H5.0625C5.37316 8.25 5.625 8.50184 5.625 8.8125V10.5M1.5 1.5H7.5M7.125 3.75H10.5M8.625 5.625H8.62875V5.62875H8.625V5.625ZM8.625 7.125H8.62875V7.12875H8.625V7.125ZM8.625 8.625H8.62875V8.62875H8.625V8.625Z" stroke="#020202" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        )}
      </span>
      {showStatus && paymentIsPaid && <span className="ml-[6px] inline-flex h-5 items-center rounded-full bg-white px-2 text-[8px] font-bold text-[#101010]">PAID</span>}
      {showStatus && !paymentIsPaid && <span className="ml-[6px] inline-flex h-5 items-center rounded-full bg-[#fb3e75] px-2 text-[8px] font-bold text-white">UNPAID</span>}
    </span>
  );
}

function OrderHistorySelect({ label, options, value, onChange }: { label: string; options: { value: string; label: string }[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex w-full flex-col">
      <label className="mb-1.5 block text-[11px] font-medium leading-none text-[#667085]">{label}</label>
      <div className="relative w-full">
        <select
          value={value}
          onChange={event => onChange(event.target.value)}
          className="h-[38px] w-full cursor-pointer appearance-none rounded-[9px] border border-[#cfcfcf] bg-white py-1 pl-3 pr-9 text-[12px] font-medium leading-5 text-[#344054] outline-none transition-colors hover:border-[#aeb8c5] focus:border-black"
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#344054]">
          <ChevronsUpDown size={14} strokeWidth={1.8} />
        </div>
      </div>
    </div>
  );
}

function OrderHistoryDateInput({ label, value, onChange, min, max }: { label: string; value: string; onChange: (v: string) => void; min?: string; max?: string }) {
  const formatForDisplay = (dateStr: string) => {
    const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/);
    return match ? `${match[2]}/${match[3]}/${match[1]}` : dateStr;
  };
  const [displayValue, setDisplayValue] = useState(() => formatForDisplay(value));

  useEffect(() => {
    setDisplayValue(formatForDisplay(value));
  }, [value]);

  function handleTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    const raw = event.target.value;
    if (raw.length < displayValue.length) {
      setDisplayValue(raw);
      return;
    }
    const digits = raw.replace(/\D/g, "");
    const formatted = digits.length <= 2 ? digits : digits.length <= 4 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
    setDisplayValue(formatted);
    const match = formatted.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
    if (match) onChange(`${match[3]}-${match[1]}-${match[2]}`);
  }

  return (
    <div className="flex w-full flex-col">
      <label className="mb-1.5 block text-[11px] font-medium leading-none text-[#667085]">{label}</label>
      <div className="relative flex w-full items-center">
        <input
          type="text"
          value={displayValue}
          onChange={handleTextChange}
          placeholder="MM/DD/YYYY"
          maxLength={10}
          inputMode="numeric"
          className="h-[38px] w-full rounded-[9px] border border-[#cfcfcf] bg-white py-2 pl-3 pr-11 text-[12px] font-medium leading-5 text-[#121212] outline-none transition-all duration-200 placeholder:font-medium placeholder:text-[#999999] focus:border-black focus:shadow-[0_0_0_2px_rgba(0,0,0,0.06)]"
        />
        <span className="pointer-events-none absolute right-3 top-1/2 z-[1] flex -translate-y-1/2 items-center justify-center p-1 text-[#6b7280]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M15.6947 13.7H15.7037M15.6947 16.7H15.7037M11.9955 13.7H12.0045M11.9955 16.7H12.0045M8.29431 13.7H8.30329M8.29431 16.7H8.30329" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <input
          type="date"
          value={value}
          onChange={event => event.target.value && onChange(event.target.value)}
          min={min}
          max={max}
          tabIndex={-1}
          className="absolute right-2 top-1/2 z-[2] size-8 -translate-y-1/2 cursor-pointer opacity-0"
        />
      </div>
    </div>
  );
}

function OrderHistoryPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const { showToast } = useAppLoading();
  const [historyVersion, setHistoryVersion] = useState<"current" | "v2">("v2");
  const [rangePreset, setRangePreset] = useState("this_month");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const [payer, setPayer] = useState("all");
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [downloadingOrderId, setDownloadingOrderId] = useState<string | null>(null);

  const { startDate, endDate } = useMemo(
    () => resolveOrderHistoryRange(rangePreset, customStart, customEnd),
    [rangePreset, customStart, customEnd],
  );

  const orders = useMemo(() => {
    const sorted = [...ORDER_HISTORY_ENTRIES].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return sorted.filter(order => {
      const dateKey = orderHistoryDateKey(new Date(order.created_at));
      if (startDate && dateKey < startDate) return false;
      if (endDate && dateKey > endDate) return false;
      if (payer !== "all" && order.payment_method !== payer) return false;
      if (historyVersion === "v2" && status !== "all" && order.order_status !== status) return false;
      const query = search.trim().toLowerCase();
      if (query && ![
        order.order_id,
        order.patient_name,
        order.order_type,
        order.order_status.replaceAll("_", " "),
        order.payment_method.replaceAll("_", " "),
      ].some(value => value.toLowerCase().includes(query))) return false;
      return true;
    });
  }, [startDate, endDate, payer, search, status, historyVersion]);

  const hasActiveFilters = rangePreset !== "all" || payer !== "all" || (historyVersion === "v2" && status !== "all");

  function handleDownloadInvoice(orderId: string) {
    if (downloadingOrderId) return;
    setDownloadingOrderId(orderId);
    window.setTimeout(() => {
      setDownloadingOrderId(null);
      showToast("Invoice downloaded successfully");
    }, 900);
  }

  const formatDate = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <>
      <div className="mb-5 flex flex-col items-start gap-3">
        <div className="flex w-full items-center justify-between gap-4">
          <h1 className="flex h-[38px] items-center text-[28px] font-semibold leading-tight text-[#1a1a1a]">
            Order History <span className="text-[16px] font-normal text-[#9d9d9d]">({orders.length})</span>
          </h1>
        </div>
        <div className="flex w-full flex-wrap items-end gap-4 border-b border-[#eeeeec] pb-4">
          <div className={`group mt-[17px] flex h-[38px] w-full items-center gap-2 rounded-[9px] border border-[#cfcfcf] bg-white px-3 focus-within:border-black ${historyVersion === "v2" ? "sm:w-[280px]" : "transition-all duration-300 ease-out sm:w-[220px] sm:focus-within:w-[310px]"}`}>
            <Search size={14} strokeWidth={1.8} className={`shrink-0 text-[#686868] ${historyVersion === "current" ? "transition-transform duration-300 group-focus-within:scale-110" : ""}`} />
            <input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search order history" className="min-w-0 flex-1 bg-transparent text-[11px] font-medium text-[#1a1a1a] outline-none placeholder:font-medium placeholder:text-[#686868]" />
            {search ? <button type="button" onClick={() => setSearch("")} className="text-[14px] text-[#777] hover:text-black" aria-label="Clear search">×</button> : <span className="shrink-0 text-[10px] text-[#686868]">⌘ F</span>}
          </div>
          <div className="ml-auto flex flex-wrap items-end justify-end gap-3.5">
            <div className="w-[180px]">
              <OrderHistorySelect label="Period" options={ORDER_HISTORY_RANGE_PRESETS} value={rangePreset} onChange={setRangePreset} />
            </div>
            {rangePreset === "custom" && (
              <>
                <div className="w-[180px]">
                  <OrderHistoryDateInput label="From" value={customStart} onChange={setCustomStart} max={customEnd || undefined} />
                </div>
                <div className="w-[180px]">
                  <OrderHistoryDateInput label="To" value={customEnd} onChange={setCustomEnd} min={customStart || undefined} />
                </div>
              </>
            )}
            <div className="w-[180px]">
              <OrderHistorySelect label="Paid by" options={ORDER_HISTORY_PAYER_OPTIONS} value={payer} onChange={setPayer} />
            </div>
            {historyVersion === "v2" && (
              <div className="w-[180px]">
                <OrderHistorySelect label="Status" options={ORDER_HISTORY_STATUS_OPTIONS} value={status} onChange={setStatus} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5">

        {orders.length === 0 ? (
          <div className="flex w-full flex-col items-center justify-center rounded-lg border border-[#e5e7eb] bg-white px-5 py-[60px] text-center">
            <div className="mb-2.5">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.6667 28.9739C15.0721 29.2079 15.5319 29.3311 16 29.3311C16.4681 29.3311 16.9279 29.2079 17.3333 28.9739L26.6667 23.6405C27.0717 23.4067 27.408 23.0705 27.6421 22.6656C27.8761 22.2608 27.9995 21.8015 28 21.3339V10.6672C27.9995 10.1996 27.8761 9.74027 27.6421 9.3354C27.408 8.93054 27.0717 8.59434 26.6667 8.36052L17.3333 3.02719C16.9279 2.79314 16.4681 2.66992 16 2.66992C15.5319 2.66992 15.0721 2.79314 14.6667 3.02719L5.33333 8.36052C4.92835 8.59434 4.59197 8.93054 4.35795 9.3354C4.12392 9.74027 4.00048 10.1996 4 10.6672V21.3339C4.00048 21.8015 4.12392 22.2608 4.35795 22.6656C4.59197 23.0705 4.92835 23.4067 5.33333 23.6405L14.6667 28.9739Z" stroke="#999999" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 29.3333V16" stroke="#999999" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4.38672 9.33398L16.0001 16.0007L27.6134 9.33398" stroke="#999999" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 5.69336L22 12.56" stroke="#999999" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-[14px] font-bold text-[#121212]">No orders found</h3>
            <p className="mb-4 mt-1.5 text-[12px] text-[#999999]">
              {hasActiveFilters
                ? "No orders match the selected filters. Try widening the date range."
                : "No orders yet. Your billing history will appear here once orders are placed."}
            </p>
          </div>
        ) : (
          <div className="rounded-xl bg-white">
            <div className="w-full max-w-[1400px] overflow-x-auto bg-white">
              <table className={`w-full min-w-max text-left text-sm ${historyVersion === "v2" ? "border-separate border-spacing-0" : "border-collapse"}`}>
                <thead>
                  <tr>
                    {(historyVersion === "v2" ? ["Patient", "Date", "Type", "Status", "Paid By", "Total", ""] : ["Date", "Order", "Patient", "Type", "Status", "Paid By", "Total", "Refunded", "Paid", ""]).map((header, index) => (
                      <th key={index} className={`whitespace-nowrap px-4 py-2 text-[12px] leading-5 text-[#999999] ${historyVersion === "v2" ? "bg-[#f5f5f5] font-normal normal-case first:rounded-l-[10px] last:rounded-r-[10px]" : "border-b border-[#e5e7eb] bg-[#fbfbfb] font-bold uppercase"}`}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr
                      key={order.order_id}
                      onClick={() => onNavigate("orders")}
                      className={`cursor-pointer transition-colors hover:bg-[#f1f1f1] ${historyVersion === "current" ? "even:bg-[#fbfbfb] even:hover:bg-[#f1f1f1]" : "even:bg-[#fafafa] even:hover:bg-[#f1f1f1]"}`}
                    >
                      {historyVersion === "v2" ? (
                        <>
                          <td className="px-4 py-3 text-[12px] font-normal text-[#121212]">
                            <span className="inline-flex flex-col items-start gap-0.5">
                              {order.is_multi_patient ? <span className="inline-flex items-center gap-1.5">Multiple patients <span className="rounded-full bg-[#f1f1f1] px-2 py-0.5 text-[9px] text-[#666]">Group</span></span> : <span>{order.patient_name || "—"}</span>}
                              <span className="text-[10px] font-normal leading-[13px] text-[#686868]">Order #{order.order_id.slice(-8).toUpperCase()}</span>
                            </span>
                          </td>
                          <td className="px-4 py-3 text-[12px] font-normal text-[#121212]">{formatDate(order.created_at)}</td>
                          <td className="px-4 py-3 text-[12px] font-normal text-[#555]">{order.is_custom ? "Custom" : order.order_type === "refill" ? "Refill" : "Order"}</td>
                          <td className="px-4 py-3"><OrderHistoryV2Status status={order.order_status} /></td>
                          <td className="px-4 py-3"><OrderHistoryV2PayBy payBy={order.payment_method} paid={!order.is_cancelled && order.is_paid} /></td>
                          <td className="px-4 py-3">
                            <span className="block text-[12px] font-medium text-[#121212]">{orderHistoryMoney(order.total_price)}</span>
                            {order.refunded_amount > 0 && <span className="mt-0.5 block text-[10px] font-normal text-[#777]">{orderHistoryMoney(order.refunded_amount)} refunded</span>}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button type="button" onClick={event => { event.stopPropagation(); handleDownloadInvoice(order.order_id); }} disabled={downloadingOrderId === order.order_id} className="inline-flex h-[30px] min-w-[94px] items-center justify-center gap-1.5 rounded-full bg-black px-3 text-[11px] font-medium text-white transition-colors hover:bg-[#242424] disabled:opacity-60">
                              {downloadingOrderId === order.order_id ? <span className="size-3 animate-spin rounded-full border-2 border-[#666] border-t-white" /> : <><Download size={13} />Invoice</>}
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="max-w-[500px] px-4 py-2.5 text-[12px] font-medium leading-5 text-[#121212]">{formatDate(order.created_at)}</td>
                          <td className="max-w-[500px] px-4 py-2.5 text-[12px] font-medium leading-5 text-[#121212]">#{order.order_id.slice(-8).toUpperCase()}</td>
                          <td className="max-w-[500px] px-4 py-2.5 text-[12px] font-medium leading-5 text-[#121212]">{order.is_multi_patient ? "Multiple Patients" : order.patient_name || "—"}</td>
                          <td className="max-w-[500px] px-4 py-2.5 text-[12px] font-medium leading-5 text-[#121212]">{order.is_custom ? "Custom" : order.order_type === "refill" ? "Refill" : "Order"}</td>
                          <td className="max-w-[500px] px-4 py-2.5 text-[12px] font-medium leading-5 text-[#121212]"><OrderHistoryStatusChip status={order.order_status} /></td>
                          <td className="max-w-[500px] px-4 py-2.5 text-[12px] font-medium leading-5 text-[#121212]"><OrderHistoryPayByChip payBy={order.payment_method} /></td>
                          <td className="max-w-[500px] px-4 py-2.5 text-[12px] font-medium leading-5 text-[#121212]">{orderHistoryMoney(order.total_price)}</td>
                          <td className="max-w-[500px] px-4 py-2.5 text-[12px] font-medium leading-5 text-[#121212]">{order.refunded_amount > 0 ? `-${orderHistoryMoney(order.refunded_amount)}` : "—"}</td>
                          <td className="max-w-[500px] px-4 py-2.5 text-[12px] font-medium leading-5 text-[#121212]">{order.is_paid ? <span className="flex flex-col gap-[2px] font-semibold leading-[13px] text-[#37703b]"><span>{orderHistoryMoney(order.net_paid)}</span>{order.payment_timestamp && <span className="text-[10px] font-medium leading-[11px] text-[#9a9a90]">{formatDate(order.payment_timestamp)}</span>}</span> : order.is_cancelled ? "—" : <span className="font-semibold text-[#9a4b3c]">Unpaid</span>}</td>
                          <td className="max-w-[500px] px-4 py-2.5 text-[12px] font-medium leading-5 text-[#121212]"><button type="button" onClick={event => { event.stopPropagation(); handleDownloadInvoice(order.order_id); }} disabled={downloadingOrderId === order.order_id} aria-label="Download invoice" title="Download invoice" className="inline-flex h-[30px] items-center gap-1.5 rounded-full border border-black bg-black px-3 text-[12px] font-semibold text-white transition-colors hover:border-[#242424] hover:bg-[#242424] disabled:cursor-default disabled:opacity-60 disabled:hover:border-black disabled:hover:bg-black">{downloadingOrderId === order.order_id ? <span className="size-[13px] animate-spin rounded-full border-2 border-[#d8d8d2] border-t-[#183229]" aria-hidden="true" /> : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3v12m0 0 4.5-4.5M12 15l-4.5-4.5M4 19h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}<span>Invoice</span></button></td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// ─── Pending Approvals ────────────────────────────────────────────────────────

interface PendingApprovalRx {
  name: string;
  size: string;
  strength: string;
  sig: string;
  reason: string;
  note?: string;
  daysSupply: number;
  refills: number;
  qty: number;
  price: number;
  image: string;
  isControlled?: boolean;
  supplies?: { name: string; size: string }[];
}

interface PendingApprovalPharmacy {
  name: string;
  shippingMethod: string;
  refrigerated?: boolean;
  signatureRequired?: boolean;
  prescriptions: PendingApprovalRx[];
}

interface PendingApproval {
  id: string;
  createdAt: string;
  patient: { firstName: string; lastName: string; gender: string; address1: string; address2?: string; city: string; state: string; zip: string; phone: string; dob: string };
  submittedBy: string;
  paymentMethod: "patient" | "clinic" | "clinic_ach";
  shipTo: "patient" | "clinic";
  pharmacies: PendingApprovalPharmacy[];
}

const PENDING_APPROVALS_CLINIC = {
  name: "ScriptLinkRX Medical Group",
  address: "2823 Middletown Road, Suite 4B, Bronx, NY 10461",
  phone: "(646) 617-9881",
};

const PENDING_APPROVER = {
  firstName: "Sarah",
  lastName: "Chen",
  npi: "1780012345",
  dea: "FC1234563",
  license: "NY-556677",
};

const pendingApprovalDaysAgo = (days: number, hour: number, minute: number) => {
  const d = new Date();
  d.setDate(d.getDate() - days);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
};

const PENDING_APPROVALS_MOCK: PendingApproval[] = [
  {
    id: "b7e2f4a1c8d3465f9a0b1c2d3e4f5a6b8c1d24af",
    createdAt: pendingApprovalDaysAgo(0, 9, 5),
    patient: { firstName: "Sarah", lastName: "Mitchell", gender: "F", address1: "2823 Middletown Road", address2: "Apt 3C", city: "Bronx", state: "NY", zip: "10461", phone: "(646) 617-9881", dob: "04/14/1991" },
    submittedBy: "Chirag Patel",
    paymentMethod: "patient",
    shipTo: "patient",
    pharmacies: [
      {
        name: "Precision Compounding",
        shippingMethod: "UPS Overnight Refrigerated",
        refrigerated: true,
        prescriptions: [
          { name: "Semaglutide", size: "2 Vials", strength: "5mg/mL", sig: "Inject 0.25mg subcutaneously once weekly for 4 weeks, then increase as directed.", reason: "Patient requires a customized compounded formulation.", daysSupply: 60, refills: 5, qty: 2, price: 180.0, image: img434, supplies: [{ name: "Injection Supplies (Syringes & Alcohol Pads)", size: "1 month supply" }] },
          { name: "NAD+ Injection", size: "1 (0.5mL) Vial", strength: "20mg/25mg/mL", sig: "Inject 0.5mL intramuscularly twice weekly.", reason: "Wellness and energy support protocol.", note: "Patient prefers morning administration.", daysSupply: 30, refills: 2, qty: 1, price: 84.5, image: imgNadInjection },
        ],
      },
    ],
  },
  {
    id: "3a9c1e5f7b2d48609c4e8f1a2b3c4d5e0f8a36cd",
    createdAt: pendingApprovalDaysAgo(1, 16, 38),
    patient: { firstName: "David", lastName: "Lim", gender: "M", address1: "95 Windermere Drive", city: "Westchester County", state: "NY", zip: "10710", phone: "(646) 389-7766", dob: "08/03/1975" },
    submittedBy: "Nora Vasquez",
    paymentMethod: "clinic",
    shipTo: "clinic",
    pharmacies: [
      {
        name: "Rush Pharmacy FL",
        shippingMethod: "UPS 2nd Day Air",
        signatureRequired: true,
        prescriptions: [
          { name: "Testosterone Cypionate", size: "1 Vial", strength: "200mg/mL", sig: "Inject 1mL intramuscularly once weekly.", reason: "Hormone replacement therapy per treatment plan.", daysSupply: 28, refills: 11, qty: 1, price: 135.99, image: img452dash, isControlled: true },
        ],
      },
    ],
  },
  {
    id: "f0d8b6a4e2c1479385a7c9e1b3d5f7a94b2e68f1",
    createdAt: pendingApprovalDaysAgo(2, 11, 21),
    patient: { firstName: "Maria", lastName: "Santos", gender: "F", address1: "852 Cedar Ln", city: "Seattle", state: "WA", zip: "98101", phone: "(555) 789-0123", dob: "07/19/1990" },
    submittedBy: "Chirag Patel",
    paymentMethod: "clinic_ach",
    shipTo: "patient",
    pharmacies: [
      {
        name: "Optimal Balance Pharmacy",
        shippingMethod: "UPS Ground",
        prescriptions: [
          { name: "Aminoblend", size: "1 (30mL) Vial", strength: "100mg/50mg/50mg/50mg/100mg/mL", sig: "Inject 1mL intramuscularly up to three times weekly.", reason: "Amino acid supplementation for recovery.", daysSupply: 30, refills: 2, qty: 1, price: 35.99, image: img432 },
        ],
      },
    ],
  },
  {
    id: "c4b2d0f8a6e3471592c7a5e9f1b3d80613f5a7c9",
    createdAt: pendingApprovalDaysAgo(3, 14, 2),
    patient: { firstName: "Emily", lastName: "Krause", gender: "F", address1: "302 Maple Ave", city: "Brooklyn", state: "NY", zip: "11201", phone: "(718) 555-0187", dob: "03/22/1988" },
    submittedBy: "Marcus Webb",
    paymentMethod: "patient",
    shipTo: "patient",
    pharmacies: [
      {
        name: "Precision Compounding",
        shippingMethod: "UPS Overnight Refrigerated",
        refrigerated: true,
        prescriptions: [
          { name: "Bremelanotide (PT-141)", size: "1 (10mL) Bottle", strength: "10mg/mL", sig: "Use as directed by prescriber.", reason: "Patient requires a customized compounded formulation.", daysSupply: 30, refills: 1, qty: 1, price: 118.8, image: imgProduct452 },
        ],
      },
    ],
  },
  {
    id: "58e6c4a2f0d9473186b5d3f7a9c1e02479b1d3f5",
    createdAt: pendingApprovalDaysAgo(4, 10, 47),
    patient: { firstName: "John", lastName: "Reynolds", gender: "M", address1: "88 Park Blvd", city: "Queens", state: "NY", zip: "11375", phone: "(718) 555-0143", dob: "01/17/1993" },
    submittedBy: "Nora Vasquez",
    paymentMethod: "clinic",
    shipTo: "clinic",
    pharmacies: [
      {
        name: "Optimal Balance Pharmacy",
        shippingMethod: "UPS Ground",
        prescriptions: [
          { name: "Glutathione", size: "1 (30mL) Vial", strength: "200mg/mL", sig: "Inject 1mL intramuscularly twice weekly.", reason: "Antioxidant support protocol.", daysSupply: 30, refills: 3, qty: 1, price: 96.0, image: landingGlutathione },
          { name: "B-Complex", size: "1 (30mL) Vial", strength: "100mg/mL", sig: "Inject 1mL intramuscularly once weekly.", reason: "Vitamin supplementation for fatigue.", daysSupply: 30, refills: 3, qty: 1, price: 45.99, image: img431 },
        ],
      },
    ],
  },
  {
    id: "916f3d5b7a8c42e0f4a6c8e0b2d4f6a8d0f2b4a8",
    createdAt: pendingApprovalDaysAgo(5, 15, 29),
    patient: { firstName: "Tom", lastName: "Taylor", gender: "M", address1: "902 Cedar Ln", city: "Houston", state: "TX", zip: "77001", phone: "(646) 617-1880", dob: "09/05/1982" },
    submittedBy: "Marcus Webb",
    paymentMethod: "patient",
    shipTo: "patient",
    pharmacies: [
      {
        name: "Northeast Compounding",
        shippingMethod: "UPS 2nd Day Air",
        refrigerated: true,
        prescriptions: [
          { name: "Tesamorelin/Ipamorelin", size: "1 (5mL) Vial", strength: "2.4mg/1.2mg/mL", sig: "Inject 0.5mL subcutaneously nightly before bed.", reason: "Peptide therapy per treatment plan.", daysSupply: 30, refills: 1, qty: 1, price: 135.36, image: imgPT141 },
        ],
      },
    ],
  },
];

const pendingApprovalTotal = (approval: PendingApproval) =>
  approval.pharmacies.reduce((sum, ph) => sum + ph.prescriptions.reduce((s, rx) => s + rx.price, 0), 0);

const pendingApprovalRxCount = (approval: PendingApproval) =>
  approval.pharmacies.reduce((sum, ph) => sum + ph.prescriptions.length, 0);

function PendingShipToChip({ shipTo }: { shipTo: "patient" | "clinic" }) {
  const isPatient = shipTo === "patient";
  return (
    <span
      className={`inline-flex h-7 items-center justify-center gap-1.5 whitespace-nowrap rounded-full pl-3 pr-3 text-[11px] font-medium text-[#171717] ${isPatient ? "bg-[#ADEBBE]" : "bg-[#6DE9ED]"}`}
    >
      {isPatient ? "Ship to Patient" : "Ship to Clinic"}
      <span className="flex size-3.5 items-center justify-center">
        {isPatient ? (
          <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.99077 9.3624C8.30605 8.45873 7.2212 7.875 6 7.875C4.7788 7.875 3.69395 8.45873 3.00923 9.3624M8.99077 9.3624C9.91675 8.53817 10.5 7.3372 10.5 6C10.5 3.51472 8.48528 1.5 6 1.5C3.51472 1.5 1.5 3.51472 1.5 6C1.5 7.3372 2.08325 8.53817 3.00923 9.3624M8.99077 9.3624C8.19575 10.0701 7.14808 10.5 6 10.5C4.85192 10.5 3.80425 10.0701 3.00923 9.3624M7.5 4.875C7.5 5.70343 6.82843 6.375 6 6.375C5.17157 6.375 4.5 5.70343 4.5 4.875C4.5 4.04657 5.17157 3.375 6 3.375C6.82843 3.375 7.5 4.04657 7.5 4.875Z" stroke="#020202" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.125 10.5H10.875M1.875 1.5V10.5M7.125 1.5V10.5M10.125 3.75V10.5M3.375 3.375H3.75M3.375 4.875H3.75M3.375 6.375H3.75M5.25 3.375H5.625M5.25 4.875H5.625M5.25 6.375H5.625M3.375 10.5V8.8125C3.375 8.50184 3.62684 8.25 3.9375 8.25H5.0625C5.37316 8.25 5.625 8.50184 5.625 8.8125V10.5M1.5 1.5H7.5M7.125 3.75H10.5M8.625 5.625H8.62875V5.62875H8.625V5.625ZM8.625 7.125H8.62875V7.12875H8.625V7.125ZM8.625 8.625H8.62875V8.62875H8.625V8.625Z" stroke="#020202" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        )}
      </span>
    </span>
  );
}

function PendingV2ShipToChip({ shipTo, items }: { shipTo: "patient" | "clinic"; items: number }) {
  const isPatient = shipTo === "patient";
  return (
    <span className="inline-flex h-7 items-center gap-1.5 whitespace-nowrap rounded-full bg-[#f1f1f1] pl-1 pr-1 text-[11px] font-normal text-[#333]">
      <span className={`flex size-5 items-center justify-center rounded-full text-white ${isPatient ? "bg-[#35B467]" : "bg-[#20C9D2]"}`}>
        {isPatient ? <User size={12} strokeWidth={2} /> : <Building2 size={12} strokeWidth={2} />}
      </span>
      {isPatient ? "Ship to Patient" : "Ship to Clinic"}
      {items > 1 && (
        <span className="inline-flex h-5 items-center rounded-full bg-white px-2 text-[9px] font-semibold text-black">
          {items} items
        </span>
      )}
    </span>
  );
}

function PendingApprovalModal({ isOpen, onClose, onApprove, isLoading }: { isOpen: boolean; onClose: () => void; onApprove: () => void; isLoading: boolean }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50" onClick={onClose}>
      <div className="max-h-[90vh] w-full max-w-[480px] overflow-y-auto rounded-2xl bg-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]" onClick={event => event.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-[#e5e7eb] px-6 py-5">
          <h2 className="text-[18px] font-semibold text-[#111827]">Approve Order</h2>
          <button className="text-2xl leading-none text-[#6b7280] hover:text-[#374151]" onClick={onClose}>×</button>
        </div>
        <div className="p-6">
          <p className="mb-5 text-[14px] leading-[1.6] text-[#374151]">
            By approving this order, your prescriber credentials will be attached and payment will be processed.
          </p>
          <div className="mb-5">
            <h3 className="mb-3 text-[14px] font-semibold uppercase tracking-[0.05em] text-[#111827]">Your Credentials</h3>
            <div className="rounded-lg bg-[#f9fafb] px-4 py-3">
              {[
                ["Name", `${PENDING_APPROVER.firstName} ${PENDING_APPROVER.lastName}`],
                ["NPI", PENDING_APPROVER.npi],
                ["DEA", PENDING_APPROVER.dea],
                ["License", PENDING_APPROVER.license],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between border-b border-[#e5e7eb] py-2 last:border-b-0">
                  <span className="text-[13px] text-[#6b7280]">{label}</span>
                  <span className="text-[13px] font-medium text-[#111827]">{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-5">
            <h3 className="mb-3 text-[14px] font-semibold uppercase tracking-[0.05em] text-[#111827]">Your Signature</h3>
            <div className="flex min-h-[100px] items-center justify-center rounded-lg bg-[#f9fafb] p-4">
              <span className="text-[28px] italic text-[#1a2e35]" style={{ fontFamily: '"Snell Roundhand", "Savoye LET", "Segoe Script", cursive' }}>
                Sarah Chen
              </span>
            </div>
          </div>
          <div className="rounded-lg bg-[#fef3c7] px-4 py-3">
            <p className="text-[13px] leading-[1.5] text-[#92400e]">
              This action cannot be undone. The patient will be charged and the order will be submitted for processing.
            </p>
          </div>
        </div>
        <div className="flex justify-end gap-3 border-t border-[#e5e7eb] px-6 py-4">
          <button onClick={onClose} className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-[#d8d8d8] bg-white px-4 text-[12px] font-semibold text-[#121212] transition-colors hover:bg-[#f1f1f1]">
            Cancel
          </button>
          <button onClick={onApprove} disabled={isLoading} className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-black px-4 text-[12px] font-semibold text-white transition-colors hover:bg-[#242424] disabled:opacity-50">
            {isLoading && <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />}
            Approve Order
          </button>
        </div>
      </div>
    </div>
  );
}

function PendingRejectModal({ isOpen, onClose, onReject, isLoading }: { isOpen: boolean; onClose: () => void; onReject: (reason?: string) => void; isLoading: boolean }) {
  const [reason, setReason] = useState("");
  if (!isOpen) return null;

  const handleClose = () => {
    setReason("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50" onClick={handleClose}>
      <div className="max-h-[90vh] w-full max-w-[440px] overflow-y-auto rounded-2xl bg-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]" onClick={event => event.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-[#e5e7eb] px-6 py-5">
          <h2 className="text-[18px] font-semibold text-[#111827]">Reject Order</h2>
          <button className="text-2xl leading-none text-[#6b7280] hover:text-[#374151]" onClick={handleClose}>×</button>
        </div>
        <div className="p-6">
          <div className="mb-5 rounded-lg bg-[#fee2e2] px-4 py-3">
            <p className="text-[13px] leading-[1.5] text-[#991b1b]">
              This action cannot be undone. The order will be permanently cancelled and the user will need to submit a new order.
            </p>
          </div>
          <div className="mt-4">
            <label className="mb-1 block text-[14px] font-medium leading-none text-[#121212]">Rejection Reason (Optional)</label>
            <textarea
              rows={4}
              value={reason}
              onChange={event => setReason(event.target.value)}
              placeholder="Enter a reason for rejecting this order..."
              className="min-h-[100px] w-full resize-y rounded-lg border border-[#dbdbdb] bg-white px-4 py-3 text-[16px] leading-5 text-[#121212] shadow-[0px_3px_6px_-3px_#0000000d,0px_2px_4px_-2px_#0000000d,0px_1px_2px_-1px_#0000000d,0px_1px_0px_-1px_#0000000d] outline-none transition-all placeholder:font-medium placeholder:text-[#999999] focus:border-[#132F19] focus:shadow-[0_0_0_1px_#132F19,0_0_0_3px_rgba(0,174,48,0.1)]"
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 border-t border-[#e5e7eb] px-6 py-4">
          <button onClick={handleClose} className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-[#d8d8d8] bg-white px-4 text-[12px] font-semibold text-[#121212] transition-colors hover:bg-[#f1f1f1]">
            Cancel
          </button>
          <button onClick={() => onReject(reason || undefined)} disabled={isLoading} className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-black px-4 text-[12px] font-semibold text-white transition-colors hover:bg-[#242424] disabled:opacity-50">
            {isLoading && <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />}
            Reject Order
          </button>
        </div>
      </div>
    </div>
  );
}

function PendingApprovalDetail({ approval, onBack, onResolve }: { approval: PendingApproval; onBack: () => void; onResolve: () => void }) {
  const { showToast } = useAppLoading();
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [detailVersion] = useState<"current" | "v2">("v2");

  const created = new Date(approval.createdAt);
  const timestamp = `${String(created.getMonth() + 1).padStart(2, "0")}/${String(created.getDate()).padStart(2, "0")}/${created.getFullYear()} - ${created.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`;
  const payToClinic = approval.paymentMethod === "clinic" || approval.paymentMethod === "clinic_ach";
  const { patient } = approval;
  const patientStripName = `${patient.firstName} ${patient.lastName} (${patient.gender})`;
  const patientStripAddress = [patient.address1, patient.city, patient.state, patient.zip].filter(Boolean).join(", ");
  const finalTotal = pendingApprovalTotal(approval);

  function handleApprove() {
    setIsApproving(true);
    window.setTimeout(() => {
      setIsApproving(false);
      setIsApprovalModalOpen(false);
      showToast("Order approved successfully");
      onResolve();
    }, 900);
  }

  function handleReject() {
    setIsRejecting(true);
    window.setTimeout(() => {
      setIsRejecting(false);
      setIsRejectModalOpen(false);
      showToast("Order rejected");
      onResolve();
    }, 900);
  }

  const metaLabel = "text-[9px] font-semibold uppercase tracking-[0.1em] text-[#8c95a1]";

  return (
    <div className="max-w-[1040px]">
      {/* Top bar */}
      <div className={`mb-5 flex flex-wrap items-center justify-between gap-3 ${detailVersion === "v2" ? "sticky top-0 z-20 border-b border-[#eeeeec] bg-white/95 py-3 backdrop-blur-sm" : ""}`}>
        <div className="flex items-center gap-3">
          <button type="button" aria-label="Back to pending approvals" onClick={onBack} className="flex size-10 items-center justify-center rounded-r-[12px] bg-[#f0f1f2] text-[#111] transition-colors hover:bg-[#e6e8e9]">
            <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
          </button>
          {detailVersion === "v2" ? <div><h1 className="text-[22px] font-semibold text-[#1a1a1a]">Review order</h1><p className="mt-0.5 text-[10px] text-[#7b7b7b]">Order #{approval.id.slice(-6).toUpperCase()}</p></div> : <h1 className="text-[22px] font-semibold text-[#1a1a1a]">Pending Approvals</h1>}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={() => setIsRejectModalOpen(true)} className="inline-flex h-10 items-center gap-1.5 rounded-full border border-[#d8d8d8] bg-white px-4 text-[12px] font-semibold text-[#121212] transition-colors hover:bg-[#f1f1f1]">
            Reject
          </button>
          <button onClick={() => setIsApprovalModalOpen(true)} className="inline-flex h-10 items-center gap-1.5 rounded-full bg-black px-4 text-[12px] font-semibold text-white transition-colors hover:bg-[#242424]">
            Approve Order
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {/* Order summary card */}
        <section className="overflow-hidden rounded-[14px] bg-white">
          <div className="grid gap-x-5 gap-y-4 border-b border-[#eceeeb] bg-[#fbfbfb] px-5 py-4 sm:grid-cols-3 lg:grid-cols-[1.15fr_.8fr_1fr_1.05fr_1.35fr_.85fr]">
            <div>
              <p className={metaLabel}>Order Timestamp</p>
              <p className="mt-1 text-[12px] font-semibold text-[#161a18]">{timestamp}</p>
            </div>
            <div>
              <p className={metaLabel}>Order ID</p>
              <p className="mt-1 text-[12px] font-semibold text-[#161a18]">#{approval.id.slice(-6).toUpperCase()}</p>
            </div>
            <div>
              <p className={metaLabel}>Status</p>
              <div className="mt-1 flex">
                {detailVersion === "v2" ? <OrderHistoryV2Status status="pending_payment" label="Pending Payment" /> : <span className="inline-flex h-7 items-center gap-1.5 whitespace-nowrap rounded-full bg-[#EC0000] px-3 text-[11px] font-semibold text-white">Pending payment <CreditCard size={13} /></span>}
              </div>
            </div>
            <div>
              <p className={metaLabel}>Ship To</p>
              <div className="mt-1 flex">
                <PendingV2ShipToChip shipTo={approval.shipTo} items={pendingApprovalRxCount(approval)} />
              </div>
            </div>
            <div>
              <p className={metaLabel}>Payment Method</p>
              <div className="mt-1 flex">
                <OrderHistoryV2PayBy payBy={approval.paymentMethod} paid={approval.paymentMethod === "clinic_ach"} />
              </div>
            </div>
            <div>
              <p className={metaLabel}>Final Total</p>
              <p className="mt-1 text-[12px] font-bold text-[#161a18]">${finalTotal.toFixed(2)}</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1.15fr_.85fr]">
            <div className="min-w-0 px-5 py-4">
              <div className="mb-2 flex items-center gap-2"><p className={metaLabel}>Patient</p></div>
              <div className="flex flex-col gap-3">
                <div className="text-[11px] leading-[1.45] text-[#5f6863]">
                  <div className="flex items-center gap-1.5">
                    <p className="font-semibold text-[#161a18]">
                      {patient.firstName} {patient.lastName} <span className="font-medium text-[#777777]">({patient.gender})</span>
                    </p>
                  </div>
                  <p className="mt-0.5">
                    {patient.address1}
                    {patient.address2 && `, ${patient.address2}`}
                    {`, ${patient.city}, ${patient.state} ${patient.zip}`}
                  </p>
                  <div className="mt-0.5 flex items-center gap-1.5"><span>{patient.phone}</span></div>
                  <div className="mt-0.5 flex items-center gap-1.5"><span>DOB: {patient.dob}</span></div>
                </div>
              </div>
            </div>
            <div className="min-w-0 border-t border-[#eceeeb] px-5 py-4 lg:border-l lg:border-t-0">
              <div className="mb-2 flex items-center gap-2"><p className={metaLabel}>Submitted By</p></div>
              <div className="flex flex-col gap-3">
                <div className="text-[11px] leading-[1.45] text-[#5f6863]">
                  <p className="font-semibold text-[#161a18]">{approval.submittedBy}</p>
                  <p className="mt-0.5">Awaiting approval</p>
                </div>
                <div className="text-[11px] leading-[1.45] text-[#5f6863]">
                  <div className="mb-2 flex items-center gap-2"><p className={metaLabel}>Clinic</p></div>
                  <p className="font-semibold text-[#161a18]">{PENDING_APPROVALS_CLINIC.name}</p>
                  <p className="mt-0.5">{PENDING_APPROVALS_CLINIC.address}</p>
                  <div className="mt-0.5 flex items-center gap-1.5"><span>{PENDING_APPROVALS_CLINIC.phone}</span></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pharmacy fulfillment cards */}
        {approval.pharmacies.map((pharmacyOrder, pharmacyIndex) => {
          const pharmacyTotal = pharmacyOrder.prescriptions.reduce((s, rx) => s + rx.price, 0);
          return (
            <section key={pharmacyIndex} className="overflow-hidden rounded-[14px] bg-white">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#eceeeb] bg-[#fbfbfb] px-5 py-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-[9px] bg-white text-[#667085]"><Building2 size={17} /></span>
                  <div>
                    <p className="text-[14px] font-semibold text-[#161a18]">{pharmacyOrder.name}</p>
                    <p className="mt-0.5 text-[11px] text-[#667085]">Licensed compounding pharmacy</p>
                  </div>
                </div>
                <p className="min-w-0 flex-1 whitespace-nowrap text-center text-[10px] font-medium text-[#b42318]">Please make sure to also forward an e-prescription via your clinical software to the above pharmacy!</p>
                <p className="text-[16px] font-bold text-[#161a18]">${pharmacyTotal.toFixed(2)}</p>
              </div>

              <div className="grid gap-3 border-b border-[#eceeeb] px-5 py-3 sm:grid-cols-4">
                <div>
                  <p className={metaLabel}>Shipping Method</p>
                  <p className="mt-1 text-[11px] font-semibold text-[#161a18]">{pharmacyOrder.shippingMethod}</p>
                </div>
                <div>
                  <p className={metaLabel}>Est. Delivery</p>
                  <p className="mt-1 text-[11px] font-semibold text-[#161a18]">Pending</p>
                </div>
                <div>
                  <p className={metaLabel}>Tracking</p>
                  <p className="mt-1 text-[11px] text-[#8c95a1]">Tracking Not Ready</p>
                </div>
                {(pharmacyOrder.refrigerated || pharmacyOrder.signatureRequired) && (
                  <div>
                    <p className={metaLabel}>Handling</p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {pharmacyOrder.refrigerated && <span className="inline-flex rounded-full bg-[#edf8fb] px-2 py-0.5 text-[9px] font-semibold text-[#21707d]">Refrigerated</span>}
                      {pharmacyOrder.signatureRequired && <span className="inline-flex rounded-full bg-[#edf8fb] px-2 py-0.5 text-[9px] font-semibold text-[#21707d]">Signature Required</span>}
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-white">
                <div>
                  <div className="flex flex-wrap items-center gap-2 bg-[#fbfbfb] px-5 py-2 text-[10px] text-[#667085]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#05AF3B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                    <span className="font-semibold text-[#161a18]">{patientStripName}</span>
                    <span>|</span>
                    <span>{patient.phone}</span>
                    <span>|</span>
                    <span>{patientStripAddress}</span>
                  </div>
                  {pharmacyOrder.prescriptions.map((rx, rxIndex) => (
                    <Fragment key={rxIndex}>
                      <div className={`grid gap-4 px-5 py-4 md:grid-cols-[minmax(0,1fr)_70px_70px_70px_90px] ${rxIndex > 0 ? "border-t border-[#eceeeb]" : ""}`}>
                        <div className="flex gap-3">
                          <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-[7px] border border-[#eeeeec] bg-white">
                            <img src={rx.image} alt="" className="size-11 object-contain mix-blend-multiply" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="text-[12px] font-semibold text-[#161a18]">{rx.name}</p>
                            </div>
                            <p className="mt-1 text-[11px] text-[#667085]">{rx.size} | {rx.strength}</p>
                            <p className="mt-2 text-[10px] text-[#161a18]"><strong>Sig:</strong> {rx.sig}</p>
                            <p className="mt-1 text-[10px] text-[#161a18]"><strong>Reason:</strong> {rx.reason}</p>
                            {rx.note && <p className="mt-1 text-[10px] text-[#161a18]"><strong>Note:</strong> {rx.note}</p>}
                          </div>
                        </div>
                        <div className="max-md:hidden">
                          <p className={metaLabel}>Days Supply</p>
                          <p className="mt-2 text-[11px] font-semibold text-[#161a18]">{rx.daysSupply}</p>
                        </div>
                        <div className="max-md:hidden">
                          <p className={metaLabel}>Refills</p>
                          <p className="mt-2 text-[11px] font-semibold text-[#161a18]">{rx.refills}</p>
                        </div>
                        <div className="max-md:hidden">
                          <p className={metaLabel}>Qty</p>
                          <p className="mt-2 text-[11px] font-semibold text-[#161a18]">{rx.qty}</p>
                        </div>
                        <p className="text-right text-[12px] font-bold text-[#161a18]">${rx.price.toFixed(2)}</p>
                      </div>
                      {rx.supplies?.map((supply, supplyIndex) => (
                        <div key={supplyIndex} className="grid gap-4 border-t border-[#eceeeb] px-5 py-4 md:grid-cols-[minmax(0,1fr)_70px_70px_70px_90px]">
                          <div className="flex gap-3">
                            <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-[7px] border border-[#eeeeec] bg-white text-[#8c95a1]">
                              <Syringe size={22} strokeWidth={1.5} />
                            </div>
                            <div className="min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <p className="text-[12px] font-semibold text-[#161a18]">{supply.name}</p>
                              </div>
                              <p className="mt-1 text-[11px] text-[#667085]">{supply.size}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </Fragment>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>

      <PendingApprovalModal isOpen={isApprovalModalOpen} onClose={() => setIsApprovalModalOpen(false)} onApprove={handleApprove} isLoading={isApproving} />
      <PendingRejectModal isOpen={isRejectModalOpen} onClose={() => setIsRejectModalOpen(false)} onReject={handleReject} isLoading={isRejecting} />
    </div>
  );
}

function PendingApprovalsPage({ onNavigate: _onNavigate }: { onNavigate: (p: Page) => void }) {
  const [approvals, setApprovals] = useState<PendingApproval[]>(PENDING_APPROVALS_MOCK);
  const [searchQuery, setSearchQuery] = useState("");
  const [approvalsVersion, setApprovalsVersion] = useState<"current" | "v2" | "v3">("v2");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // ⌘F / Ctrl+F focuses the search box instead of the browser find bar
  const searchInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "f") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const selectedApproval = approvals.find(a => a.id === selectedId) ?? null;

  if (selectedApproval) {
    return (
      <PendingApprovalDetail
        approval={selectedApproval}
        onBack={() => setSelectedId(null)}
        onResolve={() => {
          setApprovals(current => current.filter(a => a.id !== selectedApproval.id));
          setSelectedId(null);
        }}
      />
    );
  }

  const filteredApprovals = approvals.filter(approval => {
    if (!searchQuery) return true;
    const searchLower = searchQuery.toLowerCase();
    const patientName = `${approval.patient.firstName} ${approval.patient.lastName}`.toLowerCase();
    return (
      approval.id.toLowerCase().includes(searchLower) ||
      approval.id.slice(-6).toUpperCase().includes(searchQuery.toUpperCase()) ||
      patientName.includes(searchLower) ||
      approval.submittedBy.toLowerCase().includes(searchLower)
    );
  });

  const tdClass = `max-w-[500px] px-4 text-[12px] font-normal leading-5 text-[#121212] ${approvalsVersion === "v2" ? "py-3" : "py-2"}`;

  return (
    <div className="max-w-[1400px]">
      <div className="mb-5 flex flex-col gap-3">
        <div className="flex flex-col items-start gap-3">
          <div className="flex w-full items-center justify-between gap-4">
            <h1 className="flex h-[38px] items-center text-[28px] font-medium leading-tight text-[#1a1a1a]">
              Pending Approvals <span className="text-[16px] font-normal text-[#9d9d9d]">({approvals.length})</span>
            </h1>
          </div>
          <div className="mt-[17px] flex w-full flex-wrap items-end justify-between gap-3">
            <label className={`group flex h-[38px] w-full items-center gap-2 rounded-[9px] border border-[#cfcfcf] bg-white px-3 focus-within:border-black ${approvalsVersion !== "current" ? "transition-colors sm:w-[310px]" : "transition-all duration-300 ease-out sm:w-[220px] sm:focus-within:w-[310px]"}`}>
              <span className={`flex shrink-0 text-[#686868] ${approvalsVersion === "current" ? "transition-transform duration-300 group-focus-within:scale-110" : ""}`}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
              </span>
              <input
                ref={searchInputRef}
                value={searchQuery}
                onChange={event => setSearchQuery(event.target.value)}
                placeholder="Search by order, patient, or user"
                aria-label="Search pending approvals"
                className={`min-w-0 flex-1 bg-transparent text-[11px] text-[#1a1a1a] outline-none placeholder:text-[#686868] ${approvalsVersion !== "current" ? "font-normal placeholder:font-normal" : "font-medium placeholder:font-medium"}`}
              />
              <span className="shrink-0 text-[10px] text-[#686868]">⌘ F</span>
            </label>
            {approvalsVersion === "v2" && <span className="pb-2 text-[11px] font-medium text-[#7f1d1d]">{filteredApprovals.length} requiring review</span>}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {filteredApprovals.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-[10px] bg-[#f8f8f8] px-5 py-[60px] text-center">
            <div className="mb-2.5">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.6667 28.9739C15.0721 29.2079 15.5319 29.3311 16 29.3311C16.4681 29.3311 16.9279 29.2079 17.3333 28.9739L26.6667 23.6405C27.0717 23.4067 27.408 23.0705 27.6421 22.6656C27.8761 22.2608 27.9995 21.8015 28 21.3339V10.6672C27.9995 10.1996 27.8761 9.74027 27.6421 9.3354C27.408 8.93054 27.0717 8.59434 26.6667 8.36052L17.3333 3.02719C16.9279 2.79314 16.4681 2.66992 16 2.66992C15.5319 2.66992 15.0721 2.79314 14.6667 3.02719L5.33333 8.36052C4.92835 8.59434 4.59197 8.93054 4.35795 9.3354C4.12392 9.74027 4.00048 10.1996 4 10.6672V21.3339C4.00048 21.8015 4.12392 22.2608 4.35795 22.6656C4.59197 23.0705 4.92835 23.4067 5.33333 23.6405L14.6667 28.9739Z" stroke="#999999" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 29.3333V16" stroke="#999999" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4.38672 9.33398L16.0001 16.0007L27.6134 9.33398" stroke="#999999" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M10 5.69336L22 12.56" stroke="#999999" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-[14px] font-bold text-[#121212]">No pending approvals</h3>
            <p className="mb-4 mt-1.5 text-[12px] text-[#999999]">
              {searchQuery ? "No orders found matching your search." : "There are no orders waiting for your approval."}
            </p>
          </div>
        ) : approvalsVersion === "v3" ? (
          <div className="overflow-hidden rounded-[12px] bg-white">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-[10px] bg-[#f5f5f5] px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[12px] font-semibold text-[#7f1d1d]">{filteredApprovals.length}</span>
                <div><h2 className="text-[12px] font-semibold text-[#171717]">Orders requiring review</h2><p className="mt-0.5 text-[9px] text-[#777]">Review patient, payment, and delivery details before deciding</p></div>
              </div>
              <span className="text-[10px] font-medium text-[#777]">Oldest submissions first</span>
            </div>
            <div className="mt-3 hidden grid-cols-[minmax(250px,1.25fr)_minmax(150px,.75fr)_minmax(170px,.8fr)_minmax(150px,.75fr)_150px] gap-4 px-4 py-2 text-[10px] font-normal text-[#999] md:grid">
              <span>Order and patient</span><span>Created by</span><span>Payment</span><span>Shipping</span><span className="text-right">Total</span>
            </div>
            <div className="space-y-1">
              {filteredApprovals.map(approval => {
                const created = new Date(approval.createdAt);
                const isPaid = approval.paymentMethod === "clinic_ach";
                return (
                  <article key={approval.id} onClick={() => setSelectedId(approval.id)} className="group grid cursor-pointer gap-4 rounded-[10px] px-4 py-3.5 transition-colors odd:bg-white even:bg-[#fafafa] hover:bg-[#f1f1f1] md:grid-cols-[minmax(250px,1.25fr)_minmax(150px,.75fr)_minmax(170px,.8fr)_minmax(150px,.75fr)_150px] md:items-center">
                    <div className="min-w-0">
                      <div className="flex min-w-0 items-center gap-2"><h3 className="truncate text-[12px] font-semibold text-[#161616]">{approval.patient.firstName} {approval.patient.lastName}</h3><span className="shrink-0 text-[10px] font-semibold text-[#B25327]">Pending Approval</span></div>
                      <p className="mt-1 text-[10px] text-[#777]">Order #{approval.id.slice(-8)}</p>
                    </div>
                    <div>
                      <p className="text-[11px] text-[#333]">{approval.submittedBy}</p>
                      <p className="mt-0.5 whitespace-nowrap text-[9px] text-[#888]">{created.toLocaleDateString([], { month: "short", day: "numeric", year: "numeric" })} · {created.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</p>
                    </div>
                    <div>
                      <OrderHistoryV2PayBy payBy={approval.paymentMethod} paid={isPaid} />
                    </div>
                    <div><PendingV2ShipToChip shipTo={approval.shipTo} items={pendingApprovalRxCount(approval)} /></div>
                    <div className="flex items-center justify-between gap-3 md:justify-end"><span className="text-[12px] font-semibold text-[#171717]">${pendingApprovalTotal(approval).toFixed(2)}</span><button type="button" onClick={event => { event.stopPropagation(); setSelectedId(approval.id); }} className="inline-flex h-[30px] items-center justify-center rounded-full bg-black px-4 text-[11px] font-medium text-white transition-colors hover:bg-[#242424]">Review</button></div>
                  </article>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="w-full max-w-[1400px] overflow-x-auto bg-white">
            <table className={`w-full min-w-max text-left text-sm ${approvalsVersion === "v2" ? "table-fixed border-separate border-spacing-0" : "border-collapse"}`}>
              {approvalsVersion === "v2" && <colgroup><col className="w-[18%]" /><col className="w-[17%]" /><col className="w-[18%]" /><col className="w-[21%]" /><col className="w-[12%]" /><col className="w-[7%]" /><col className="w-[7%]" /></colgroup>}
              <thead>
                <tr>
                  {(approvalsVersion === "v2" ? ["Patient", "Pay by", "Created by", "Ship to", "Status", "Total", ""] : ["ORDER ID", "PATIENT", "CREATED BY", "CREATED AT", "PAY BY", "SHIP TO", "ITEMS", "STATUS", "TOTAL", "ACTION"]).map((header, index) => (
                    <th key={index} className={`whitespace-nowrap py-2 text-[12px] leading-5 text-[#999999] ${approvalsVersion === "v2" ? "bg-[#f5f5f5] px-4 font-normal first:rounded-l-[10px] last:rounded-r-[10px]" : `border-b border-[#e5e7eb] bg-[#fbfbfb] font-medium uppercase ${index === 4 || index === 5 ? "w-px px-2" : "px-4"}`}`}>
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredApprovals.map(approval => {
                  const created = new Date(approval.createdAt);
                  return (
                    <tr
                      key={approval.id}
                      onClick={() => setSelectedId(approval.id)}
                      className={`cursor-pointer align-middle transition-colors hover:bg-[#f1f1f1] even:hover:bg-[#f1f1f1] ${approvalsVersion === "v2" ? "h-[64px] even:bg-[#fafafa]" : "even:bg-[#fbfbfb]"}`}
                    >
                      {approvalsVersion === "v2" ? (
                        <td className={tdClass}>
                          <div className="inline-flex min-w-0 flex-col items-start gap-0.5">
                            <div className="flex min-w-0 items-center gap-2 whitespace-nowrap text-[12px] font-medium text-[#121212]"><span className="truncate">{approval.patient.firstName} {approval.patient.lastName}</span></div>
                            <span className="text-[10px] font-normal leading-[13px] text-[#686868]">Order #{approval.id.slice(-8)}</span>
                          </div>
                        </td>
                      ) : <>
                        <td className={tdClass}>#{approval.id.slice(-8)}</td>
                        <td className={tdClass}><span className="text-[14px] font-medium text-[#121212]">{approval.patient.firstName} {approval.patient.lastName}</span></td>
                      </>}
                      {approvalsVersion === "v2" ? <>
                        <td className="w-px whitespace-nowrap px-4 py-3 text-[12px] font-normal leading-5 text-[#121212]"><OrderHistoryV2PayBy payBy={approval.paymentMethod} paid={approval.paymentMethod === "clinic_ach"} /></td>
                        <td className={`${tdClass} whitespace-nowrap`}><span className="inline-flex flex-col items-start gap-[5px] leading-[13px]"><span>{approval.submittedBy}</span><span className="text-[10px] font-normal leading-[12px] text-[#777]">{created.getMonth() + 1}/{created.getDate()}/{created.getFullYear()} · {created.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</span></span></td>
                      </> : <>
                        <td className={tdClass}>{approval.submittedBy}</td>
                        <td className={tdClass}><div className="inline-flex items-center gap-2 whitespace-nowrap text-[11px] font-normal text-[#282828]"><span>{created.getMonth() + 1}/{created.getDate()}/{created.getFullYear()}</span><span className="text-[10px] text-[#686868]">{created.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}</span></div></td>
                        <td className="w-px whitespace-nowrap px-2 py-2 text-[12px] font-normal leading-5 text-[#121212]"><OrderHistoryPayByChip payBy={approval.paymentMethod} showStatus neutral /></td>
                      </>}
                      <td className={`w-px whitespace-nowrap text-[12px] font-normal leading-5 text-[#121212] ${approvalsVersion === "v2" ? "px-4 py-3" : "px-2 py-2"}`}>
                        {approvalsVersion === "v2" ? <PendingV2ShipToChip shipTo={approval.shipTo} items={pendingApprovalRxCount(approval)} /> : <PendingShipToChip shipTo={approval.shipTo} />}
                      </td>
                      {approvalsVersion === "current" && <td className={tdClass}>{pendingApprovalRxCount(approval)}</td>}
                      {approvalsVersion === "current" && <td className={tdClass}><span className="whitespace-nowrap text-[11px] font-semibold text-[#B25327]">Pending Approval</span></td>}
                      {approvalsVersion === "v2" && <td className={tdClass}><span className="whitespace-nowrap rounded-full bg-[#f1f1f1] px-2.5 py-1 text-[10px] font-medium text-[#7f1d1d]">Pending Approval</span></td>}
                      <td className={tdClass}>${pendingApprovalTotal(approval).toFixed(2)}</td>
                      <td className={tdClass}>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={event => { event.stopPropagation(); setSelectedId(approval.id); }}
                            className="inline-flex h-[30px] items-center justify-center rounded-full bg-black px-3 text-[11px] font-medium text-white transition-colors hover:bg-[#242424]"
                            aria-label={`Review order for ${approval.patient.firstName} ${approval.patient.lastName}`}
                          >
                            Review
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Pharmacies ───────────────────────────────────────────────────────────────

const PHARMACIES = [
  { name: "Optimal Balance Pharmacy", location: "Miami, FL", turnaround: "1-2 Days", products: 42, rating: 4.9, status: "Active", phone: "+1 (305) 555-0192" },
  { name: "Rush Pharmacy FL", location: "Orlando, FL", turnaround: "Same Day", products: 38, rating: 4.7, status: "Active", phone: "+1 (407) 555-0143" },
  { name: "Precision Compounding", location: "Houston, TX", turnaround: "2-3 Days", products: 65, rating: 4.8, status: "Active", phone: "+1 (713) 555-0187" },
  { name: "Westside Pharmacy", location: "Los Angeles, CA", turnaround: "1-2 Days", products: 30, rating: 4.5, status: "Active", phone: "+1 (310) 555-0121" },
  { name: "Northeast Compounding", location: "Boston, MA", turnaround: "2-4 Days", products: 22, rating: 4.3, status: "Inactive", phone: "+1 (617) 555-0167" },
];

type PharmacyCheckoutStep = "birthday" | "details" | "payment" | "success";

function PharmacyCheckout({ pharmacy, onClose, onGoHome }: { pharmacy: typeof PHARMACIES[number]; onClose: () => void; onGoHome: () => void }) {
  const [step, setStep] = useState<PharmacyCheckoutStep>("birthday");
  const [birthday, setBirthday] = useState("");
  const [copyLabel, setCopyLabel] = useState("Copy link");
  const [scheduleRefills, setScheduleRefills] = useState(false);
  const [showAllSummaryItems, setShowAllSummaryItems] = useState(false);
  const subtotal = 240.01;
  const shipping = 40;
  const total = subtotal + shipping;
  const fieldClass = "mt-1.5 h-11 w-full rounded-[9px] border border-[#d4d4d4] bg-white px-3.5 text-[13px] outline-none transition-colors placeholder:text-[#a3a3a3] focus:border-black focus:ring-2 focus:ring-black/10";

  useEffect(() => {
    if (step !== "success") return;
    const redirectTimeout = window.setTimeout(onGoHome, 6000);
    return () => window.clearTimeout(redirectTimeout);
  }, [step, onGoHome]);

  const Brand = () => (
    <button type="button" onClick={onClose} className="flex min-h-11 items-center gap-2.5" aria-label="Return to business selection">
      <img src={scriptlinkrxLogo} alt="" className="h-8 w-8 object-contain" />
      <span className="font-['Poppins',sans-serif] text-[17px] font-semibold tracking-[-0.02em] text-black">ScriptLinkRx</span>
    </button>
  );

  const Progress = () => (
    <div className="mb-7 flex items-center justify-center gap-2" aria-label="Checkout progress">
      {["Verify", "Review", "Payment"].map((label, index) => {
        const activeIndex = step === "birthday" ? 0 : step === "details" ? 1 : 2;
        return <Fragment key={label}><div className={`flex items-center gap-2 text-[11px] font-semibold ${index <= activeIndex ? "text-black" : "text-[#a3a3a3]"}`}><span className={`flex size-6 items-center justify-center rounded-full ${index < activeIndex ? "bg-black text-white" : index === activeIndex ? "border-2 border-black bg-white" : "border border-[#d4d4d4] bg-white"}`}>{index < activeIndex ? <Check size={13} /> : index + 1}</span><span className="hidden sm:inline">{label}</span></div>{index < 2 && <span className={`h-px w-8 sm:w-16 ${index < activeIndex ? "bg-black" : "bg-[#d4d4d4]"}`} />}</Fragment>;
      })}
    </div>
  );

  const prescriptions = [
    { label: "Prescription 1", name: "BPC-157", directions: "Inject 16 units (0.16mL) once daily", quantity: 1, days: 30, refills: 1, price: "$129.84" },
    { label: "Prescription 2", name: "TB-500", directions: "Inject 60 units (0.6mL) twice weekly", quantity: 1, days: 30, refills: 1, price: "$107.41" },
  ];

  const OrderRows = ({ detailed = false }: { detailed?: boolean }) => detailed ? (
    <div className="divide-y divide-[#e7ece9] text-[13px]">
      {prescriptions.map((prescription, index) => (
        <div key={prescription.name} className="py-5 first:pt-0 last:pb-0">
          <div className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.08em]"><span className="font-mono text-[#2563eb]">RX-0{index + 1}</span><span className="h-3 w-px bg-[#d6d6d6]" /><span className="text-[#777]">Prescription</span></span>
            <span className="font-semibold tabular-nums">{prescription.price}</span>
          </div>
          <p className="mt-3 font-semibold">{prescription.name}</p>
          <p className="mt-2 text-[12px] font-semibold leading-5">{prescription.directions}</p>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-[#5f6874]">
            <span><strong className="font-semibold">Qty:</strong> {prescription.quantity}</span>
            <span><strong className="font-semibold">Days:</strong> {prescription.days}</span>
            <span><strong className="font-semibold">Refills allowed:</strong> {prescription.refills}</span>
          </div>
          <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto] gap-4">
            <div>
              <p className="text-[12px] font-medium leading-5">S SQ supplies pack</p>
              <p className="mt-0.5 text-[11px] leading-4 text-[#6f7782]">Suitable needles for the injection and dosage · suitable syringe · alcohol pads</p>
              <div className="mt-1.5 flex flex-wrap gap-x-4 text-[10px] text-[#6f7782]"><span>Qty: 1</span><span>Size: Suitable amount</span></div>
            </div>
            <span className="pt-0.5 text-[12px] font-medium tabular-nums">$1.38</span>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="space-y-3 text-[13px]">
      {prescriptions.map((prescription) => <div key={prescription.name} className="flex justify-between gap-4"><div><p className="font-semibold">{prescription.name}</p><p className="mt-1 text-[11px] leading-4 text-[#6f7782]">{prescription.directions} · {prescription.days} days</p></div><span className="font-semibold">{prescription.price}</span></div>)}
      <div className="flex justify-between gap-4"><div><p className="font-semibold">S SQ supplies packs ×2</p><p className="mt-1 text-[11px] leading-4 text-[#6f7782]">Needles, syringes and alcohol pads</p></div><span className="font-semibold">$2.76</span></div>
    </div>
  );

  return (
    <div className={`business-checkout checkout-step-${step} fixed inset-0 z-[100] overflow-y-auto bg-[radial-gradient(circle_at_50%_0%,rgba(219,232,255,0.95),rgba(237,244,255,0.65)_36%,#f7f8fa_76%)] text-[#171717]`}>
      <style>{`
        .business-checkout h1::after {
          display: block;
          margin-top: 9px;
          color: #2563eb;
          font-size: 11px;
          font-weight: 600;
          line-height: 16px;
          letter-spacing: .01em;
        }
        .business-checkout.checkout-step-birthday h1::after { content: "Step 1 of 4 · Identity verification"; }
        .business-checkout.checkout-step-details h1::after { content: "Step 2 of 4 · Review prescription"; }
        .business-checkout.checkout-step-payment h1::after { content: "Step 3 of 4 · Secure payment"; }
        .business-checkout.checkout-step-success h1::after { display: none; }
        .business-checkout.checkout-step-birthday main > section > span:first-child { display: none; }
        @keyframes checkout-celebration-pop {
          0% { opacity: 0; transform: scale(.25) rotate(-20deg) translateY(8px); }
          45% { opacity: 1; transform: scale(1.3) rotate(12deg) translateY(-4px); }
          70% { transform: scale(.92) rotate(-6deg) translateY(1px); }
          100% { opacity: 1; transform: scale(1) rotate(0) translateY(0); }
        }
        .checkout-celebration-emoji {
          display: inline-block;
          animation: checkout-celebration-pop .85s cubic-bezier(.2,.8,.2,1) both;
          transform-origin: 50% 70%;
        }
        @keyframes checkout-emoji-rain {
          0% { opacity: 0; transform: translate3d(0,-70px,0) scale(.35) rotate(-20deg); }
          15% { opacity: 1; transform: translate3d(0,0,0) scale(1.18) rotate(10deg); }
          72% { opacity: 1; }
          100% { opacity: 0; transform: translate3d(var(--emoji-drift),78vh,0) scale(.8) rotate(var(--emoji-rotate)); }
        }
        .checkout-emoji-rain-item {
          position: absolute;
          top: 0;
          animation: checkout-emoji-rain var(--emoji-duration) cubic-bezier(.2,.7,.25,1) both;
          animation-delay: var(--emoji-delay);
          will-change: transform, opacity;
        }
        @media (prefers-reduced-motion: reduce) {
          .checkout-celebration-emoji { animation: none; }
          .checkout-emoji-rain { display: none; }
        }
        .business-checkout [class*="bg-[#183229]"] { background-color: #000 !important; }
        .business-checkout [class*="hover:bg-[#244438]"]:hover { background-color: #252525 !important; }
        .business-checkout [class*="text-[#183229]"],
        .business-checkout [class*="text-[#668073]"] { color: #000 !important; }
        .business-checkout [class*="border-[#183229]"] { border-color: #000 !important; }
        .business-checkout [class*="accent-[#183229]"] { accent-color: #000 !important; }
        .business-checkout [class*="bg-[#edf5f0]"],
        .business-checkout [class*="bg-[#edf3ef]"] { background-color: #eee !important; }
        .business-checkout [class*="bg-[#f7f9f8]"] { background-color: #f7f7f7 !important; }
        .business-checkout [class*="border-[#d8dfdc]"],
        .business-checkout [class*="border-[#dfe5e1]"],
        .business-checkout [class*="border-[#e1e7e3]"],
        .business-checkout [class*="border-[#e7ece9]"] { border-color: #dedede !important; }
        .business-checkout [class*="text-[#59635e]"],
        .business-checkout [class*="text-[#66706b]"],
        .business-checkout [class*="text-[#8a938e]"],
        .business-checkout [class*="text-[#89918d]"] { color: #737373 !important; }
        @media (max-width: 639px) {
          .business-checkout main {
            min-height: 100dvh;
            justify-content: flex-start;
            padding: 24px 8px 36px;
          }
          .business-checkout main > div:first-of-type { margin-bottom: 20px; }
          .business-checkout main > section { width: 100%; }
          .business-checkout input { font-size: 16px !important; }
          .business-checkout input[type="radio"] { width: 18px; height: 18px; }
          .business-checkout h1 { font-size: 25px !important; line-height: 1.15; }
          .business-checkout.checkout-step-payment main > section { display: flex; flex-direction: column; }
          .business-checkout.checkout-step-payment main > section > div,
          .business-checkout.checkout-step-payment main > section > aside { width: 100%; }
        }
      `}</style>
      <main className="mx-auto flex min-h-screen w-full max-w-[400px] flex-col justify-center px-4 py-8 sm:py-12">
        <div className="mb-6 flex justify-center sm:mb-8"><Brand /></div>
        {step === "birthday" && <section className="mx-auto max-w-[520px] rounded-[18px] border border-[#dedede] bg-white p-6 shadow-[0_18px_50px_rgba(0,0,0,0.07)] sm:p-9"><span className="flex size-11 items-center justify-center rounded-full bg-[#eeeeee] text-black"><Shield size={20} /></span><h1 className="mt-5 text-[28px] font-semibold tracking-[-0.04em]">Verify your birthday</h1><p className="mt-2 text-[13px] leading-5 text-[#6f7782]">Enter the patient date of birth to securely view the prescription from {pharmacy.name}.</p><form onSubmit={event => { event.preventDefault(); if (birthday) setStep("details"); }} className="mt-7"><label className="text-[12px] font-semibold">Date of birth<input required type="date" value={birthday} onChange={event => setBirthday(event.target.value)} className={fieldClass} /></label><button className="mt-5 h-12 w-full rounded-full bg-black text-[13px] font-semibold text-white transition-colors hover:bg-[#252525]">Continue securely</button></form><p className="mt-5 flex items-center justify-center gap-1.5 text-[10px] text-[#8a8a8a]"><Lock size={11} /> Your information is encrypted and protected.</p></section>}

        {step === "details" && (
          <section className="mx-auto w-full max-w-[540px] rounded-[18px] border border-[#dedede] bg-white px-5 py-7 shadow-[0_18px_55px_rgba(0,0,0,0.06)] sm:px-9 sm:py-9">
            <header className="max-w-[520px] text-left">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8a8a8a]">Prescription details</p>
              <h1 className="mt-3 text-[27px] font-semibold tracking-[-0.04em]">Review your order</h1>
              <p className="mt-3 text-[13px] font-medium text-[#292929]">Hi Robert,</p>
              <p className="mt-2 text-[12px] leading-5 text-[#6f7782]">Please review your pharmacy, shipping, prescription, and pricing details below before continuing to payment.</p>
            </header>

            <div className="mt-8 grid gap-7 border-b border-[#e5e5e5] pb-7 sm:grid-cols-2">
              <section>
                <h2 className="text-[12px] font-semibold text-[#202020]">Pharmacy</h2>
                <p className="mt-3 text-[12px] font-semibold text-[#505967]">{pharmacy.name}</p>
                <p className="mt-1.5 text-[12px] leading-5 text-[#606a78]">{pharmacy.location}</p>
                <p className="mt-1 text-[12px] text-[#606a78]">Phone: {pharmacy.phone}</p>
              </section>
              <section>
                <h2 className="text-[12px] font-semibold text-[#202020]">Shipping information</h2>
                <dl className="mt-3 space-y-2 text-[12px] text-[#606a78]">
                  <div className="flex gap-1"><dt>Carrier:</dt><dd className="font-medium text-[#39404a]">FedEx</dd></div>
                  <div className="flex gap-1"><dt>Method:</dt><dd className="font-medium text-[#39404a]">Standard Overnight</dd></div>
                  <div className="flex gap-1"><dt>Price:</dt><dd className="font-medium text-[#39404a]">$40.00</dd></div>
                </dl>
              </section>
            </div>

            <div className="py-6"><OrderRows detailed /></div>

            <div className="border-t border-[#e5e5e5] pt-5 text-[12px]">
              <div className="flex justify-between py-1.5"><span className="font-medium text-[#515966]">Subtotal price</span><span className="font-medium tabular-nums">${subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between py-1.5"><span className="font-medium text-[#515966]">Total shipping</span><span className="font-medium tabular-nums">${shipping.toFixed(2)}</span></div>
              <div className="mt-3 flex justify-between border-t border-[#e5e5e5] pt-4 text-[17px] font-semibold"><span>Total price</span><span className="tabular-nums">${total.toFixed(2)}</span></div>
            </div>

            <button onClick={() => setStep("payment")} className="mt-7 h-12 w-full rounded-full bg-black text-[12px] font-semibold text-white transition-colors hover:bg-[#252525]">Continue to payment</button>
            <button onClick={onClose} className="mt-3 w-full py-1 text-[11px] font-medium text-[#777] transition-colors hover:text-black">Cancel</button>
          </section>
        )}

        {step === "payment" && (
          <section className="mx-auto flex w-full max-w-[540px] flex-col gap-5">
            <div className="rounded-[18px] border border-[#dedede] bg-white p-5 sm:p-7">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#777]">Secure checkout</p>
              <h1 className="mt-3 text-[27px] font-semibold tracking-[-0.04em]">Payment details</h1>

              <div className="mt-7 space-y-4">
                <label className="block text-[12px] font-semibold">Cardholder name *<input required placeholder="Robert Johnson" className={fieldClass} /></label>
                <label className="block text-[12px] font-semibold">Card number *<div className="relative"><input required inputMode="numeric" placeholder="1234 5678 9012 3456" className={`${fieldClass} pr-11`} /><CreditCard className="absolute bottom-3.5 right-3.5 text-[#777]" size={16} /></div></label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="text-[12px] font-semibold">Expiration *<input required placeholder="MM/YY" className={fieldClass} /></label>
                  <label className="text-[12px] font-semibold">CVV *<input required inputMode="numeric" placeholder="123" className={fieldClass} /></label>
                </div>
              </div>

              <div className="mt-7 border-t border-[#e5e5e5] pt-6">
                <p className="text-[13px] font-semibold">Billing address</p>
                <label className="mt-4 flex items-center gap-3 text-[12px]"><input type="radio" defaultChecked name="billing" className="accent-black" /> Same as shipping address</label>
                <label className="mt-3 flex items-center gap-3 text-[12px]"><input type="radio" name="billing" className="accent-black" /> Use a different billing address</label>
              </div>

              <button type="button" onClick={() => setScheduleRefills(current => !current)} className={`mt-7 flex w-full items-start gap-3 rounded-[12px] p-4 text-left transition-all ${scheduleRefills ? "bg-[linear-gradient(135deg,#eaf2ff_0%,#f5f8ff_55%,#ffffff_100%)] shadow-[0_8px_24px_rgba(37,99,235,0.09)]" : "bg-[linear-gradient(135deg,#f2f6ff_0%,#fafcff_58%,#ffffff_100%)]"}`}>
                <span className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-[4px] ${scheduleRefills ? "bg-black text-white" : "bg-white shadow-[0_1px_4px_rgba(0,0,0,0.12)]"}`}>{scheduleRefills && <Check size={11} />}</span>
                <span><span className="flex items-center gap-2 text-[12px] font-semibold">Schedule refills automatically <CreditCard size={14} /></span><span className="mt-1 block text-[10px] leading-4 text-[#606875]">We will automatically charge this card for future refills. Check to enable.</span></span>
              </button>
            </div>

            <aside className="h-fit rounded-[18px] border border-[#dedede] bg-white p-5">
              <h2 className="text-[17px] font-semibold">Order summary</h2>
              <div className="mt-6 space-y-4 text-[12px]">
                {prescriptions.map(prescription => <div key={prescription.name} className="flex justify-between gap-4"><div><p className="font-semibold">{prescription.name}</p><p className="mt-1 leading-4 text-[#6f7782]">{prescription.directions} · {prescription.days} days</p></div><span className="font-semibold tabular-nums">{prescription.price}</span></div>)}
                {showAllSummaryItems && prescriptions.map(prescription => <div key={`${prescription.name}-supplies`} className="flex justify-between gap-4"><div><p className="font-semibold">S SQ supplies pack</p><p className="mt-1 leading-4 text-[#6f7782]">Suitable needles, syringe and alcohol pads</p></div><span className="font-semibold tabular-nums">$1.38</span></div>)}
              </div>
              <button type="button" onClick={() => setShowAllSummaryItems(current => !current)} className="mt-4 text-[11px] font-semibold text-[#2563eb] transition-colors hover:text-[#1d4ed8] hover:underline underline-offset-4">{showAllSummaryItems ? "Show fewer items" : "Show 2 more items"}</button>
              <div className="mt-6 space-y-3 border-t border-[#e5e5e5] pt-5 text-[12px]">
                <div className="flex justify-between"><span className="font-medium text-[#515966]">Subtotal price</span><span className="font-medium tabular-nums">${subtotal.toFixed(2)}</span></div>
                <div className="flex items-center justify-between gap-3"><span className="font-medium text-[#515966]">Total shipping</span><span className="flex items-center gap-2"><span className="rounded-full border border-[#b9b9b9] px-2 py-0.5 text-[8px] font-semibold whitespace-nowrap">FedEx Standard Overnight</span><span className="font-medium tabular-nums">${shipping.toFixed(2)}</span></span></div>
                <div className="flex justify-between border-t border-[#e5e5e5] pt-4 text-[17px] font-semibold"><span>Total price</span><span className="tabular-nums">${total.toFixed(2)}</span></div>
              </div>
              <button onClick={() => setStep("success")} className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-black text-[12px] font-semibold text-white hover:bg-[#252525]"><Lock size={13} /> Pay ${total.toFixed(2)}</button>
              <button onClick={() => setStep("details")} className="mt-3 w-full text-[11px] font-semibold text-[#666] underline underline-offset-4">Back to review</button>
            </aside>
          </section>
        )}

        {step === "success" && (<>
          <div className="checkout-emoji-rain pointer-events-none fixed inset-0 z-[110] overflow-hidden" aria-hidden="true">
            {["🎉", "✨", "🎊", "🎉", "✨", "🎊", "🎉", "🎊", "✨", "🎉", "✨", "🎊"].map((emoji, index) => (
              <span key={index} className="checkout-emoji-rain-item text-[24px] sm:text-[28px]" style={{ left: `${5 + index * 8}%`, "--emoji-delay": `${(index % 5) * 0.11}s`, "--emoji-duration": `${2.2 + (index % 4) * 0.22}s`, "--emoji-drift": `${(index % 2 === 0 ? 1 : -1) * (18 + index * 2)}px`, "--emoji-rotate": `${index % 2 === 0 ? 180 : -210}deg` } as CSSProperties}>{emoji}</span>
            ))}
          </div>
          <section className="mx-auto w-full max-w-[540px] rounded-[20px] border border-[#dedede] bg-white px-6 py-8 shadow-[0_20px_60px_rgba(0,0,0,0.06)] sm:px-8 sm:py-9">
            <div className="text-center">
              <div className="mx-auto flex h-[92px] items-center justify-center" aria-hidden="true"><span className="checkout-celebration-emoji text-[64px] leading-none">🎉</span></div>
              <h1 className="mt-5 text-[29px] font-semibold tracking-[-0.04em]">Payment authorized</h1>
              <p className="mx-auto mt-3 max-w-[470px] text-[14px] leading-6 text-[#4f5661]">Your order has been submitted to the pharmacy for processing. You will receive updates via SMS and email.</p>
            </div>

            <div className="mt-9 border-t border-[#e5e5e5] pt-6 text-left">
              <p className="text-[12px] font-semibold text-[#202020]">Your receipt</p>
              <div className="mt-2.5 flex h-11 items-center gap-3 rounded-[9px] border border-[#dcdcdc] bg-[#fafafa] px-3.5 transition-colors focus-within:border-[#a7a7a7]">
                <span className="min-w-0 flex-1 truncate text-[11px] text-[#333]">https://www.dev.scriptlinkrx.com/receipt/RFL4NI</span>
                <button onClick={() => { navigator.clipboard?.writeText("https://www.dev.scriptlinkrx.com/receipt/RFL4NI"); setCopyLabel("Copied"); }} className="flex size-7 shrink-0 items-center justify-center rounded-[6px] text-[#777] transition-colors hover:bg-white hover:text-black" aria-label={copyLabel === "Copied" ? "Receipt link copied" : "Copy receipt link"}>{copyLabel === "Copied" ? <Check size={13} /> : <Copy size={13} />}</button>
              </div>
              <p className="mt-2.5 text-[11px] leading-5 text-[#697281]">Save this link — you can view your receipt anytime by verifying your date of birth.</p>
            </div>
          </section>
        </>)}
      </main>
    </div>
  );
}

function PharmaciesPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  return (
    <>
      <Header title="Pharmacies" onNavigate={onNavigate} />

      <div className="flex items-center gap-3 mb-6">
        <div className="group flex h-[38px] w-[220px] items-center gap-2 rounded-[9px] border border-[#cfcfcf] bg-white px-3 transition-all duration-300 ease-out focus-within:w-[310px] focus-within:border-2 focus-within:border-black">
          <Search size={14} strokeWidth={1.8} className="shrink-0 text-[#686868] transition-transform duration-300 group-focus-within:scale-110" />
          <input
            className="min-w-0 flex-1 bg-transparent text-[11px] font-medium text-[#1a1a1a] outline-none placeholder:font-medium placeholder:text-[#686868]"
            placeholder="Search pharmacies..."
          />
          <span className="shrink-0 text-[10px] text-[#686868]">⌘ F</span>
        </div>
        <div className="ml-auto flex gap-2">
          <button className="flex items-center gap-1.5 border border-[#eaeaea] bg-card rounded-[8px] px-3 py-2 text-[12px] font-medium text-[#1a1a1a] hover:bg-[#f7efe9]/60 transition-colors">
            <Filter size={13} /> Filter
          </button>
          <button className="flex items-center gap-1.5 bg-black text-white rounded-[8px] px-3 py-2 text-[12px] font-medium hover:bg-[#1a1a1a]/90 transition-colors">
            <Plus size={13} /> Add Pharmacy
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {PHARMACIES.map((ph) => (
          <div key={ph.name} className="rounded-xl border border-[#eaeaea] bg-card p-5">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-[14px] font-semibold text-[#1a1a1a]">{ph.name}</h3>
                <div className="flex items-center gap-1.5 mt-1">
                  <MapPin size={11} className="text-[#9d9d9d]" />
                  <span className="text-[11px] text-[#9d9d9d]">{ph.location}</span>
                </div>
              </div>
              <Badge variant={ph.status === "Active" ? "success" : "neutral"}>
                <StatusDot status={ph.status} />
                {ph.status}
              </Badge>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: "Turnaround", value: ph.turnaround },
                { label: "Products", value: ph.products },
                { label: "Rating", value: `★ ${ph.rating}` },
              ].map(({ label, value }) => (
                <div key={label} className="bg-[#f9f0ea]/50 rounded-[8px] px-3 py-2">
                  <p className="text-[10px] text-[#9d9d9d] mb-0.5">{label}</p>
                  <p className="text-[13px] font-semibold text-[#1a1a1a]">{value}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Phone size={11} className="text-[#9d9d9d]" />
                <span className="text-[11px] text-[#9d9d9d]">{ph.phone}</span>
              </div>
              <div className="flex gap-2">
                <button onClick={event => event.stopPropagation()} className="p-1.5 rounded-[6px] border border-[#eaeaea] hover:bg-[#f7efe9] transition-colors">
                  <Edit3 size={12} className="text-[#9d9d9d]" />
                </button>
                <button onClick={event => event.stopPropagation()} className="p-1.5 rounded-[6px] border border-[#eaeaea] hover:bg-[#fee2e2] transition-colors">
                  <Trash2 size={12} className="text-[#9d9d9d]" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

// ─── Support ──────────────────────────────────────────────────────────────────

const SUPPORT_PRIMARY = "#1d5043";
const SUPPORT_PRIMARY_HOVER = "#143b32";

type SupportSender = "prescriber" | "support";

interface SupportMessage {
  id: string;
  sender: SupportSender;
  senderLabel: string;
  text: string;
  sentAt: string;
  isRead: boolean;
}

interface SupportTicket {
  id: string;
  type: "ticket" | "feature_request";
  description: string;
  isClosed: boolean;
  unread: number;
  createdAt: string;
  messages: SupportMessage[];
}

const SUPPORT_MOCK_NOW = Date.now();
const supportMinutesAgo = (minutes: number) => new Date(SUPPORT_MOCK_NOW - minutes * 60000).toISOString();

const SUPPORT_MOCK_TICKETS: SupportTicket[] = [
  {
    id: "3f8a2c91-4d67-4b2e-9a51-c0d8e7f61b24",
    type: "ticket",
    description: "Order ORD-2493 stuck in processing for 3 days",
    isClosed: false,
    unread: 2,
    createdAt: supportMinutesAgo(2980),
    messages: [
      { id: "m1-1", sender: "prescriber", senderLabel: "You", text: "Hi, order ORD-2493 for patient Sarah Mitchell has been stuck in “Processing” since Monday. Can you check what's going on?", sentAt: supportMinutesAgo(2980), isRead: true },
      { id: "m1-2", sender: "support", senderLabel: "Shayne", text: "Thanks for flagging this — let me check with the pharmacy and get right back to you.", sentAt: supportMinutesAgo(2955), isRead: true },
      { id: "m1-3", sender: "support", senderLabel: "Shayne", text: "Quick update: the pharmacy was waiting on a refrigerated packaging restock. Your order is being compounded today.", sentAt: supportMinutesAgo(1500), isRead: true },
      { id: "m1-4", sender: "support", senderLabel: "Shayne", text: "Good news — ORD-2493 just shipped. Tracking: 1Z999AA10123456784.", sentAt: supportMinutesAgo(25), isRead: true },
      { id: "m1-5", sender: "support", senderLabel: "Shayne", text: "You should see the tracking link go live within the hour.", sentAt: supportMinutesAgo(24), isRead: true },
    ],
  },
  {
    id: "7b42e9a0-1f8c-4a3d-b6e2-58d90c4a7f13",
    type: "ticket",
    description: "Patient charged twice for Semaglutide order",
    isClosed: false,
    unread: 0,
    createdAt: supportMinutesAgo(1620),
    messages: [
      { id: "m2-1", sender: "prescriber", senderLabel: "You", text: "My patient David Lim was charged twice for order ORD-2417 ($215.98 x2). Can you refund the duplicate charge?", sentAt: supportMinutesAgo(1620), isRead: true },
      { id: "m2-2", sender: "support", senderLabel: "Zee", text: "Sorry about that! I can see the duplicate authorization on our end. The second charge will be voided within 1-2 business days.", sentAt: supportMinutesAgo(1580), isRead: true },
      { id: "m2-3", sender: "prescriber", senderLabel: "You", text: "Thank you — please confirm here once the refund is through.", sentAt: supportMinutesAgo(180), isRead: false },
    ],
  },
  {
    id: "c91d47e6-8b05-42f9-9c31-7ea2d0b85f46",
    type: "feature_request",
    description: "Bulk CSV export for monthly order history",
    isClosed: false,
    unread: 0,
    createdAt: supportMinutesAgo(4390),
    messages: [
      { id: "m3-1", sender: "prescriber", senderLabel: "You", text: "It would save us hours if we could export all orders for a month as a CSV — right now we copy them one by one for bookkeeping.", sentAt: supportMinutesAgo(4390), isRead: true },
      { id: "m3-2", sender: "support", senderLabel: "Zee", text: "Love this idea — I've passed it along to our product team. I'll keep you posted here as soon as there's progress.", sentAt: supportMinutesAgo(4320), isRead: true },
    ],
  },
  {
    id: "e5a01b38-6c2f-47d1-8b9a-3f04c6d92e78",
    type: "ticket",
    description: "Unable to update patient shipping address",
    isClosed: false,
    unread: 0,
    createdAt: supportMinutesAgo(5830),
    messages: [
      { id: "m4-1", sender: "prescriber", senderLabel: "You", text: "I'm getting a validation error when updating Maria Santos' shipping address to 852 Cedar Ln, Seattle, WA 98101.", sentAt: supportMinutesAgo(5830), isRead: true },
      { id: "m4-2", sender: "support", senderLabel: "Shayne", text: "We found the bug — apartment-less addresses were failing validation. A fix went out this morning, mind trying again?", sentAt: supportMinutesAgo(5790), isRead: true },
      { id: "m4-3", sender: "prescriber", senderLabel: "You", text: "Works now, thank you!", sentAt: supportMinutesAgo(5770), isRead: true },
      { id: "m4-4", sender: "support", senderLabel: "Shayne", text: "Great — I'll keep this ticket open for a couple of days in case anything else comes up.", sentAt: supportMinutesAgo(5760), isRead: true },
    ],
  },
  {
    id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    type: "ticket",
    description: "Tracking link opens the wrong carrier page",
    isClosed: false,
    unread: 0,
    createdAt: supportMinutesAgo(7200),
    messages: [],
  },
  {
    id: "9d3b1e57-2a84-4f60-b1c5-86e7d40a92cf",
    type: "ticket",
    description: "Refund for cancelled order ORD-2311",
    isClosed: true,
    unread: 0,
    createdAt: supportMinutesAgo(20300),
    messages: [
      { id: "m6-1", sender: "prescriber", senderLabel: "You", text: "Order ORD-2311 was cancelled before it shipped but the card was still charged $55.88.", sentAt: supportMinutesAgo(20300), isRead: true },
      { id: "m6-2", sender: "support", senderLabel: "Shayne", text: "Refund processed! You should see it back on the card within 3-5 business days.", sentAt: supportMinutesAgo(20200), isRead: true },
      { id: "m6-3", sender: "prescriber", senderLabel: "You", text: "Received, thanks for the quick turnaround.", sentAt: supportMinutesAgo(20160), isRead: true },
    ],
  },
  {
    id: "5a8c4f2d-9e71-4b06-a3d8-1c5f27e94b60",
    type: "feature_request",
    description: "Dark mode for the dashboard",
    isClosed: true,
    unread: 0,
    createdAt: supportMinutesAgo(24540),
    messages: [
      { id: "m7-1", sender: "prescriber", senderLabel: "You", text: "Any chance of a dark mode? Late-night charting with a bright white screen is rough.", sentAt: supportMinutesAgo(24540), isRead: true },
      { id: "m7-2", sender: "support", senderLabel: "Zee", text: "Shipped in last night's release — check Settings → Appearance. Marking this one as resolved!", sentAt: supportMinutesAgo(24480), isRead: true },
    ],
  },
  {
    id: "1c6f9a84-3d50-4e27-b8f1-a92c07d54e36",
    type: "ticket",
    description: "Wrong quantity shipped for B-12 injection order",
    isClosed: true,
    unread: 0,
    createdAt: supportMinutesAgo(30360),
    messages: [
      { id: "m8-1", sender: "prescriber", senderLabel: "You", text: "We ordered 3 vials of B-12 on ORD-2205 but only 2 arrived.", sentAt: supportMinutesAgo(30360), isRead: true },
      { id: "m8-2", sender: "support", senderLabel: "Shayne", text: "The missing vial shipped separately at no charge — apologies for the mix-up. Closing this out now that it's delivered.", sentAt: supportMinutesAgo(30240), isRead: true },
    ],
  },
];

function supportLastActivity(ticket: SupportTicket): string {
  return ticket.messages.length > 0 ? ticket.messages[ticket.messages.length - 1].sentAt : ticket.createdAt;
}

function supportRelativeDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const now = new Date();
  const diffMin = Math.floor((now.getTime() - d.getTime()) / 60000);
  if (diffMin < 1) return "now";
  if (diffMin < 60) return `${diffMin}m`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `${diffH}h`;
  const sameDay = (a: Date, b: Date) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
  if (sameDay(d, yesterday)) return "Yesterday";
  return d.toLocaleDateString([], { month: "short", day: "numeric" });
}

function supportMessageTime(iso: string): string {
  const d = new Date(iso);
  const diffMin = Math.floor((Date.now() - d.getTime()) / 60000);
  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin} min ago`;
  const time = d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  if (new Date().toDateString() === d.toDateString()) return time;
  return `${time} · ${d.toLocaleDateString([], { month: "short", day: "numeric" })}`;
}

function supportDateSeparator(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffDays = Math.floor((today.getTime() - messageDate.getTime()) / 86400000);
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  return date.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" });
}

interface SupportSenderGroup {
  sender: SupportSender;
  senderLabel: string;
  messages: SupportMessage[];
}

function groupSupportMessages(messages: SupportMessage[]): { date: string; senderGroups: SupportSenderGroup[] }[] {
  const dateGroups: { date: string; senderGroups: SupportSenderGroup[] }[] = [];
  let currentDateKey = "";
  for (const msg of messages) {
    const msgDateKey = new Date(msg.sentAt).toDateString();
    if (msgDateKey !== currentDateKey) {
      currentDateKey = msgDateKey;
      dateGroups.push({ date: msg.sentAt, senderGroups: [{ sender: msg.sender, senderLabel: msg.senderLabel, messages: [msg] }] });
      continue;
    }
    const lastDateGroup = dateGroups[dateGroups.length - 1];
    const lastSenderGroup = lastDateGroup.senderGroups[lastDateGroup.senderGroups.length - 1];
    if (lastSenderGroup.sender === msg.sender && lastSenderGroup.senderLabel === msg.senderLabel) {
      lastSenderGroup.messages.push(msg);
    } else {
      lastDateGroup.senderGroups.push({ sender: msg.sender, senderLabel: msg.senderLabel, messages: [msg] });
    }
  }
  return dateGroups;
}

function SupportChatBubbleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <path d="M12.5 3L2.5 3.00002C1.67157 3.00002 1 3.6716 1 4.50002V9.50003C1 10.3285 1.67157 11 2.5 11H7.50003C7.63264 11 7.75982 11.0527 7.85358 11.1465L10 13.2929V11.5C10 11.2239 10.2239 11 10.5 11H12.5C13.3284 11 14 10.3285 14 9.50003V4.5C14 3.67157 13.3284 3 12.5 3ZM2.49999 2.00002L12.5 2C13.8807 2 15 3.11929 15 4.5V9.50003C15 10.8807 13.8807 12 12.5 12H11V14.5C11 14.7022 10.8782 14.8845 10.6913 14.9619C10.5045 15.0393 10.2894 14.9965 10.1464 14.8536L7.29292 12H2.5C1.11929 12 0 10.8807 0 9.50003V4.50002C0 3.11931 1.11928 2.00003 2.49999 2.00002Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
    </svg>
  );
}

function SupportSearchInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder: string }) {
  return (
    <div className="relative w-full content-center">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.5 17.5L13.1694 13.1694M13.1694 13.1694C14.3004 12.0384 15 10.4759 15 8.75C15 5.29822 12.2018 2.5 8.75 2.5C5.29822 2.5 2.5 5.29822 2.5 8.75C2.5 12.2018 5.29822 15 8.75 15C10.4759 15 12.0384 14.3004 13.1694 13.1694Z" stroke="#98A39B" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <input
        type="text"
        value={value}
        onChange={event => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-[38px] w-full rounded-[9px] border border-[#cfcfcf] bg-white pl-10 pr-[30px] text-[12px] text-[#171a18] transition-all duration-200 placeholder:text-[#98a19c] focus:border-black focus:shadow-[0_0_0_2px_rgba(0,0,0,0.06)] focus:outline-none"
      />
      {value && (
        <button type="button" onClick={() => onChange("")} aria-label="Clear search" className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center justify-center p-1 text-[#888888] transition-colors hover:text-[#132F19]">
          ×
        </button>
      )}
    </div>
  );
}

function SupportTicketListItem({ ticket, isActive, onClick }: { ticket: SupportTicket; isActive: boolean; onClick: () => void }) {
  const typeLabel = ticket.type === "feature_request" ? "Feature Request" : "Ticket";
  const typeColor = ticket.type === "feature_request" ? "#02BCB9" : "#E07C0B";
  const hasUnread = ticket.unread > 0 && !ticket.isClosed;
  const lastMessage = ticket.messages.length > 0 ? ticket.messages[ticket.messages.length - 1] : null;
  const previewLabel = lastMessage ? (lastMessage.sender === "prescriber" ? "You" : lastMessage.senderLabel || "Support") : null;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      className={`flex flex-col gap-2 rounded-[12px] border px-3.5 py-3 text-left transition-all ${
        isActive
          ? "border-[#bfc3c1] bg-[#f1f1f1]"
          : "border-[#e7e7e7] bg-white hover:border-[#cfcfcf] hover:bg-[#fafafa]"
      } ${ticket.isClosed ? "opacity-[0.78]" : ""}`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="rounded-full bg-[#f1f4f2] px-2 py-1 font-mono text-[10px] font-semibold text-[#56625b]">#{ticket.id.slice(0, 8)}</span>
        <div className="inline-flex shrink-0 items-center gap-1.5">
          {hasUnread && (
            <span className="inline-flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#e5532a] px-1.5 text-[10px] font-bold leading-none text-white" aria-label={`${ticket.unread} unread`}>
              {ticket.unread > 99 ? "99+" : ticket.unread}
            </span>
          )}
          <span className={`shrink-0 text-[11px] ${hasUnread ? "font-bold text-[#1d5043]" : "text-[#6b7280]"}`}>{supportRelativeDate(supportLastActivity(ticket))}</span>
        </div>
      </div>
      <div className={`line-clamp-1 break-words text-[12px] leading-[1.4] ${hasUnread ? "font-medium text-[#1f2937]" : "text-[#6b7280]"}`}>
        {lastMessage ? (
          <>
            <span className={`font-semibold ${hasUnread ? "text-[#1f2937]" : "text-[#4b5563]"}`}>{previewLabel}:</span>{" "}
            <span>{lastMessage.text}</span>
          </>
        ) : (
          <span className="italic text-[#9ca3af]">No messages yet</span>
        )}
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex shrink-0 items-center whitespace-nowrap rounded-full border bg-white/70 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.08em]" style={{ color: typeColor, borderColor: `${typeColor}55` }}>
          {typeLabel}
        </span>
      </div>
    </button>
  );
}

function SupportTicketChat({ ticket, onClose, onSend }: { ticket: SupportTicket; onClose: () => void; onSend: (text: string) => void }) {
  const [messageText, setMessageText] = useState("");
  const [muted, setMuted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const isResolved = ticket.isClosed;
  const canSend = messageText.trim().length > 0 && !isResolved;
  const dateGroups = groupSupportMessages(ticket.messages);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [ticket.messages.length]);

  function handleSend() {
    const trimmed = messageText.trim();
    if (!trimmed || isResolved) return;
    onSend(trimmed);
    setMessageText("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  }

  return (
    <div className="flex h-full w-full flex-col overflow-hidden bg-white">
      {/* Header */}
      <div className="flex shrink-0 items-center gap-3 border-b border-[#e6e7e4] bg-white px-4 py-3.5">
        <button type="button" onClick={onClose} aria-label="Close chat" className="inline-flex size-[34px] shrink-0 items-center justify-center rounded-full text-[#6b7280] transition-colors hover:bg-[#f3f4f6] hover:text-[#0d0e0d]">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <div className="flex min-w-0 flex-col gap-1">
          <h2 className="line-clamp-2 break-words text-[15px] font-bold leading-[1.3] text-[#0d0e0d]">{ticket.description || `Ticket #${ticket.id.slice(0, 8)}`}</h2>
          <p className="inline-flex flex-wrap items-center gap-2 text-[12px] leading-[1.3] text-[#6b7280]">
            <span className={`inline-flex items-center gap-1 rounded-xl px-2.5 py-0.5 text-[11px] font-semibold capitalize ${isResolved ? "bg-[#f3f4f6] text-[#6b7280]" : "bg-[#f0fdf4] text-[#16a34a]"}`}>
              {isResolved ? "resolved" : "open"}
            </span>
          </p>
        </div>
        <div className="flex-1" />
        <button
          type="button"
          onClick={() => setMuted(m => !m)}
          title={muted ? "Notification sound muted — click to enable" : "Mute notification sound"}
          aria-label={muted ? "Unmute notifications" : "Mute notifications"}
          aria-pressed={muted}
          className={`inline-flex size-8 shrink-0 items-center justify-center rounded-full transition-colors ${muted ? "text-[#c1281f] hover:bg-[#fdecea]" : "text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#0d0e0d]"}`}
        >
          {muted ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3 3l18 18M9 5l3-3v6m6.6 8.6A8 8 0 0019 13c0-1.5-.4-2.9-1.2-4M5.6 7.6A8 8 0 005 13c0 4.4 3.6 8 8 8 1.7 0 3.3-.5 4.6-1.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M13.7 21a2 2 0 01-3.4 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Messages */}
      <div className="relative flex min-h-0 flex-1 flex-col">
        <div className="flex flex-1 flex-col gap-3.5 overflow-y-auto p-5" role="log" aria-live="polite" aria-label="Conversation">
          {ticket.messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center p-10 text-center">
              <SupportChatBubbleIcon className="mb-4 size-16 text-[#d1d5db]" />
              <p className="text-[18px] font-semibold text-[#374151]">Start a conversation</p>
              <p className="mt-2 max-w-[280px] text-[14px] text-[#6b7280]">Send a message to our support team and we&apos;ll get back to you as soon as possible</p>
            </div>
          ) : (
            <>
              {dateGroups.map((dateGroup, gi) => {
                const label = supportDateSeparator(dateGroup.date);
                const showSeparator = gi > 0 || label !== "Today";
                return (
                  <Fragment key={`${dateGroup.date}-${gi}`}>
                    {showSeparator && (
                      <div className="my-2 flex items-center justify-center">
                        <div className="h-px flex-1 bg-[#e6e7e4]" />
                        <span className="whitespace-nowrap px-4 text-[12px] font-medium text-[#6b7280]">{label}</span>
                        <div className="h-px flex-1 bg-[#e6e7e4]" />
                      </div>
                    )}
                    {dateGroup.senderGroups.map((senderGroup, sgi) => (
                      <div key={`${dateGroup.date}-${sgi}-${senderGroup.sender}`} className="mb-3.5 flex flex-col gap-[3px] last:mb-1">
                        {senderGroup.messages.map((msg, mi) => {
                          const isUser = msg.sender === "prescriber";
                          const first = mi === 0;
                          const showTimestamp = mi === senderGroup.messages.length - 1;
                          return (
                            <div key={msg.id} className={`flex flex-col ${isUser ? "items-end" : "items-start"}`}>
                              <div
                                className={`max-w-[78%] break-words px-3.5 py-2.5 text-[14px] leading-[1.5] ${isUser ? "bg-[#111] text-white" : "bg-[#f1f1f1] text-[#0d0e0d]"}`}
                                style={{ borderRadius: isUser ? `18px ${first ? 18 : 6}px 6px 18px` : `${first ? 18 : 6}px 18px 18px 6px` }}
                              >
                                <div className="whitespace-pre-wrap break-words">{msg.text}</div>
                              </div>
                              {showTimestamp && (
                                <div className="mt-1 flex items-center gap-1 px-1">
                                  <time className="text-[11px] text-[#6b7280]" dateTime={msg.sentAt} title={new Date(msg.sentAt).toLocaleString()}>
                                    {supportMessageTime(msg.sentAt)}
                                  </time>
                                  {isUser && <span className={`text-[11px] ${msg.isRead ? "text-black" : "text-[#6b7280]"}`}>{msg.isRead ? "✓✓" : "✓"}</span>}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </Fragment>
                );
              })}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="shrink-0 border-t border-[#e6e7e4] bg-white px-4 pb-4 pt-3">
        {isResolved && (
          <div className="mb-2 rounded-lg border border-[#e5e7eb] bg-[#f3f4f6] px-2.5 py-2 text-center text-[12px] text-[#6b7280]">
            This ticket is resolved. Contact support to reopen it.
          </div>
        )}
        <div className="flex items-end gap-2 rounded-[12px] border border-[#d8d8d8] bg-white py-1.5 pl-2.5 pr-2 transition-[border-color,box-shadow] focus-within:border-black focus-within:shadow-[0_0_0_2px_rgba(0,0,0,0.06)]">
          <button
            type="button"
            aria-label="Attach files"
            title="Attach files"
            disabled={isResolved}
            className="flex size-9 shrink-0 items-center justify-center rounded-full text-[#6b7280] transition-colors hover:bg-[#f1f5f3] hover:text-[#1d5043] disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
          <textarea
            ref={textareaRef}
            rows={1}
            value={messageText}
            disabled={isResolved}
            placeholder={isResolved ? "This ticket is resolved" : "Type your message..."}
            aria-label="Type your message"
            onChange={event => {
              setMessageText(event.target.value);
              event.target.style.height = "auto";
              event.target.style.height = `${Math.min(event.target.scrollHeight, 120)}px`;
            }}
            onKeyDown={event => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                handleSend();
              }
            }}
            className="max-h-[140px] min-h-[38px] flex-1 resize-none bg-transparent px-1 py-2 text-[14.5px] leading-[1.5] text-[#0d0e0d] outline-none placeholder:text-[#9ca3af] disabled:cursor-not-allowed disabled:opacity-70"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!canSend}
            aria-label="Send message"
            className={`flex size-9 shrink-0 items-center justify-center rounded-full transition-all disabled:cursor-not-allowed ${canSend ? "bg-[#111] text-white hover:bg-[#2a2a2a]" : "bg-[#e5e7eb] text-[#9ca3af] disabled:opacity-50"}`}
          >
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function SupportCreateTicketModal({ open, onClose, onCreate }: { open: boolean; onClose: () => void; onCreate: (type: "ticket" | "feature_request", description: string) => void }) {
  const { showToast } = useAppLoading();
  const [ticketType, setTicketType] = useState<"ticket" | "feature_request">("ticket");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (open) {
      setTicketType("ticket");
      setDescription("");
    }
  }, [open]);

  if (!open) return null;

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!description.trim()) {
      showToast("Please enter a description", "error");
      return;
    }
    onCreate(ticketType, description.trim());
  }

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/35 p-4 backdrop-blur-[2px]" onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
      <div className="max-h-[90vh] w-full max-w-[500px] overflow-y-auto rounded-[10px] border border-[#e5e5e5] bg-white p-7 shadow-[0_24px_70px_rgba(0,0,0,0.18)]">
        <div className="mb-6 flex items-start justify-between">
          <div><h2 className="text-[22px] font-semibold text-[#1a1a1a]">Create Ticket</h2><p className="mt-1 text-[12px] text-[#6f7782]">Tell us what you need help with.</p></div>
          <button type="button" onClick={onClose} className="flex size-9 items-center justify-center text-[#777] transition-colors hover:text-black" aria-label="Close"><X size={19} /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <div className="mb-5">
              <label className="mb-2 block text-[14px] font-semibold leading-5 text-[#121212]">Type</label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {([["ticket", "Ticket"], ["feature_request", "Feature Request"]] as const).map(([value, label]) => (
                  <label key={value} className={`flex cursor-pointer items-center gap-2.5 rounded-[10px] border px-3 py-3 transition-colors ${ticketType === value ? "border-black bg-[#f1f1f1]" : "border-[#dedede] bg-white hover:border-[#aaa]"}`}>
                    <input type="radio" name="ticket_type" value={value} checked={ticketType === value} onChange={() => setTicketType(value)} className="sr-only" />
                    <span className={`relative flex size-5 items-center justify-center rounded-full border-2 bg-white transition-all ${ticketType === value ? "border-black" : "border-[#d8d8d8] hover:border-black"}`}>
                      {ticketType === value && <span className="size-2.5 rounded-full bg-black" />}
                    </span>
                    <span className="text-[14px] font-medium text-[#121212]">{label}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="support-ticket-description" className="mb-2 block text-[14px] font-semibold leading-5 text-[#121212]">
                Description <span className="text-[#b44b42]">*</span>
              </label>
              <textarea
                id="support-ticket-description"
                rows={3}
                value={description}
                onChange={event => setDescription(event.target.value)}
                placeholder="Describe the issue and include any relevant order or patient details..."
                className="min-h-[120px] w-full resize-y rounded-[10px] border border-[#d8d8d8] bg-white p-3.5 text-[13px] leading-5 text-[#121512] outline-none transition-all placeholder:text-[#a2aaa5] focus:border-black focus:shadow-[0_0_0_2px_rgba(0,0,0,0.06)]"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 border-t border-[#e5e9e6] pt-5">
            <button type="button" onClick={onClose} className="h-[35px] rounded-full border border-[#dedede] bg-white px-4 text-[11px] font-medium text-black transition-colors hover:bg-[#f1f1f1]">Cancel</button>
            <button type="submit" disabled={!description.trim()} className="flex h-[35px] items-center justify-center gap-2 rounded-full px-4 text-[11px] font-semibold transition-colors disabled:cursor-not-allowed disabled:bg-[#ededed] disabled:text-[#999] enabled:bg-black enabled:text-white enabled:hover:bg-[#242424]">
              Create Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function SupportPage({ onNavigate: _onNavigate }: { onNavigate: (p: Page) => void }) {
  const { showToast } = useAppLoading();
  const [tickets, setTickets] = useState<SupportTicket[]>(SUPPORT_MOCK_TICKETS);
  const [activeTab, setActiveTab] = useState<"OPEN" | "CLOSED">("OPEN");
  const [searchValue, setSearchValue] = useState("");
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [mobileShowDetail, setMobileShowDetail] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const openTickets = tickets.filter(t => !t.isClosed);
  const closedTickets = tickets.filter(t => t.isClosed);
  const tabCounts = { OPEN: openTickets.length, CLOSED: closedTickets.length };

  const filteredTickets = useMemo(() => {
    const pool = activeTab === "CLOSED" ? closedTickets : openTickets;
    const sorted = [...pool].sort((a, b) => new Date(supportLastActivity(b)).getTime() - new Date(supportLastActivity(a)).getTime());
    if (!searchValue.trim()) return sorted;
    const query = searchValue.toLowerCase();
    return sorted.filter(ticket =>
      ticket.description.toLowerCase().includes(query) ||
      ticket.id.toLowerCase().includes(query) ||
      ticket.messages.some(message => message.text.toLowerCase().includes(query)),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tickets, activeTab, searchValue]);

  // If the selected ticket leaves the visible list (filter or tab change),
  // collapse the right panel back to the empty state.
  useEffect(() => {
    if (!selectedTicketId) return;
    if (!filteredTickets.some(t => t.id === selectedTicketId)) setSelectedTicketId(null);
  }, [filteredTickets, selectedTicketId]);

  const selectedTicket = tickets.find(t => t.id === selectedTicketId) ?? null;

  function handleSelectTicket(id: string) {
    setSelectedTicketId(id);
    setMobileShowDetail(true);
    setTickets(current => current.map(t => (t.id === id && t.unread > 0 ? { ...t, unread: 0 } : t)));
  }

  function handleSendMessage(ticketId: string, text: string) {
    setTickets(current => current.map(t =>
      t.id === ticketId
        ? { ...t, messages: [...t.messages, { id: `msg-${Date.now()}`, sender: "prescriber" as const, senderLabel: "You", text, sentAt: new Date().toISOString(), isRead: false }] }
        : t,
    ));
  }

  function handleCreateTicket(type: "ticket" | "feature_request", description: string) {
    const newTicket: SupportTicket = {
      id: `${crypto.randomUUID?.() ?? `new-${Date.now()}`}`,
      type,
      description,
      isClosed: false,
      unread: 0,
      createdAt: new Date().toISOString(),
      messages: [{ id: `msg-${Date.now()}`, sender: "prescriber", senderLabel: "You", text: description, sentAt: new Date().toISOString(), isRead: false }],
    };
    setTickets(current => [newTicket, ...current]);
    setActiveTab("OPEN");
    setSelectedTicketId(newTicket.id);
    setMobileShowDetail(true);
    setIsCreateModalOpen(false);
    showToast("Ticket created");
  }

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-semibold leading-tight text-[#1a1a1a]">
            Support Tickets <span className="ml-1 text-[16px] font-medium text-[#717680]">({tabCounts.OPEN + tabCounts.CLOSED})</span>
          </h1>
        </div>
          <div className="flex flex-1 justify-end">
            <button
              type="button"
              onClick={() => setIsCreateModalOpen(true)}
              aria-label="Create Ticket"
              className="flex h-10 items-center gap-1.5 rounded-full bg-[#111] px-4 text-[12px] font-medium text-white transition-colors hover:bg-black"
            >
              <Plus size={15} />
              Create Ticket
            </button>
        </div>
      </div>

      <div className="flex h-[calc(100dvh-190px)] min-h-[480px] w-full overflow-hidden rounded-[14px] border border-[#e5e5e5] bg-white">
        {/* Left: ticket list */}
        <aside className={`flex min-h-0 w-[360px] shrink-0 flex-col border-r border-[#e5e5e5] bg-[#FAFAFA] max-md:w-full max-md:border-r-0 ${mobileShowDetail ? "max-md:hidden" : ""}`}>
          <div className="shrink-0 bg-[#FAFAFA] px-3.5 pb-2 pt-3.5">
            <SupportSearchInput value={searchValue} onChange={setSearchValue} placeholder="Search tickets" />
          </div>

          <div className="flex shrink-0 items-end gap-5 border-b border-[#e3e3e3] bg-[#FAFAFA] px-3" role="tablist" aria-label="Filter tickets by status">
            {([["OPEN", "Open"], ["CLOSED", "Closed"]] as const).map(([id, label]) => {
              const isActive = activeTab === id;
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(id)}
                  className={`relative inline-flex h-[42px] items-center gap-1.5 px-0.5 text-[12px] font-medium transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full ${
                    isActive ? "text-black after:bg-black" : "text-[#707a74] after:bg-transparent hover:text-black"
                  }`}
                >
                  {label}
                  <span className={`inline-flex h-4 min-w-[18px] items-center justify-center rounded-full px-[5px] text-[10px] font-bold ${isActive ? "bg-black text-white" : "bg-[#e5e7eb] text-[#4b5563]"}`}>
                    {tabCounts[id]}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-2.5 pb-3 pt-2.5">
            {filteredTickets.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-1.5 px-4 py-8 text-center">
                <p className="text-[14px] font-semibold text-[#374151]">
                  {searchValue ? "No tickets match your search" : activeTab === "CLOSED" ? "No closed tickets" : "No open tickets"}
                </p>
                <p className="max-w-[240px] text-[12px] leading-[1.4] text-[#6b7280]">Click &ldquo;Create Ticket&rdquo; above to start a conversation.</p>
              </div>
            ) : (
              filteredTickets.map(ticket => (
                <SupportTicketListItem key={ticket.id} ticket={ticket} isActive={selectedTicketId === ticket.id} onClick={() => handleSelectTicket(ticket.id)} />
              ))
            )}
          </div>
        </aside>

        {/* Right: chat detail */}
        <section className={`flex min-h-0 min-w-0 flex-1 flex-col bg-white max-md:hidden ${mobileShowDetail ? "max-md:flex" : ""}`}>
          {selectedTicket ? (
            <SupportTicketChat key={selectedTicket.id} ticket={selectedTicket} onClose={() => setMobileShowDetail(false)} onSend={text => handleSendMessage(selectedTicket.id, text)} />
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-2.5 p-10 text-center">
              <span className="flex size-16 items-center justify-center rounded-full bg-[#f1f1f1]"><SupportChatBubbleIcon className="size-8 text-black" /></span>
              <p className="text-[17px] font-semibold text-[#29332d]">Select a conversation</p>
              <p className="max-w-[320px] text-[13px] leading-5 text-[#737d77]">Choose a ticket to review the conversation and reply to support.</p>
            </div>
          )}
        </section>
      </div>

      <SupportCreateTicketModal open={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} onCreate={handleCreateTicket} />
    </>
  );
}

// ─── Users/Patients ───────────────────────────────────────────────────────────

const PATIENTS = [
  { firstName: "Dan", lastName: "Rahming", birthDate: "04/14/1991", gender: "M", primaryPhone: "(646) 617-1880", address1: "95 Meadowbrook Drive", address2: "", city: "Westchester County", state: "NY", zip: "10705" },
  { firstName: "Chad", lastName: "Rahming", birthDate: "04/14/1991", gender: "M", primaryPhone: "(646) 617-1880", address1: "95 Meadowbrook Drive", address2: "", city: "Westchester County", state: "NY", zip: "10705" },
  { firstName: "Alex", lastName: "Rahming", birthDate: "08/14/1991", gender: "F", primaryPhone: "(646) 617-1880", address1: "95 Meadowbrook Drive", address2: "", city: "Tuckahoe", state: "NY", zip: "10707" },
  { firstName: "Sam", lastName: "B.", birthDate: "05/31/1995", gender: "F", primaryPhone: "(646) 617-1880", address1: "95 Meadowbrook Drive", address2: "", city: "Westchester County", state: "NY", zip: "10705" },
  { firstName: "Eve", lastName: "K.", birthDate: "02/14/1991", gender: "F", primaryPhone: "(646) 617-1880", address1: "95 Meadowbrook Drive", address2: "", city: "Westchester County", state: "NY", zip: "10705" },
  { firstName: "John", lastName: "Scott", birthDate: "01/17/1993", gender: "M", primaryPhone: "(646) 617-1880", address1: "395 Oak St", address2: "Suite 500", city: "Los Angeles", state: "CA", zip: "90001" },
  { firstName: "John", lastName: "Scott", birthDate: "01/17/1993", gender: "M", primaryPhone: "(646) 617-1880", address1: "962 NEC Blvd", address2: "Floor 5", city: "Denver", state: "CO", zip: "k" },
  { firstName: "Taylor", lastName: "Mitchell", birthDate: "01/17/1993", gender: "M", primaryPhone: "(646) 617-1880", address1: "965 Dan St", address2: "Apr NJ", city: "New York", state: "NY", zip: "50001" },
  { firstName: "Mark", lastName: "Wood", birthDate: "01/17/1993", gender: "M", primaryPhone: "(646) 617-1880", address1: "965 Dan St", address2: "Floor A", city: "New York", state: "NY", zip: "50001" },
  { firstName: "John", lastName: "Scott", birthDate: "01/17/1993", gender: "M", primaryPhone: "(646) 617-1880", address1: "962 NEC Blvd", address2: "Floor 5", city: "Denver", state: "CO", zip: "k" },
  { firstName: "John", lastName: "Smith", birthDate: "01/17/1993", gender: "M", primaryPhone: "(646)617-1880", address1: "965 Dan St", address2: "Apr NJ", city: "New York", state: "NY", zip: "50001" },
  { firstName: "John", lastName: "Scott", birthDate: "01/17/1993", gender: "M", primaryPhone: "(646) 617-1880", address1: "962 NEC Blvd", address2: "Floor 5", city: "Denver", state: "CO", zip: "k" },
  { firstName: "Robert", lastName: "Wilson", birthDate: "08/03/1975", gender: "M", primaryPhone: "(646) 617-1880", address1: "395 Oak St", address2: "Suite 500", city: "Los Angeles", state: "CA", zip: "90001" },
  { firstName: "Jane", lastName: "Doe", birthDate: "03/22/1988", gender: "F", primaryPhone: "(646) 617-1880", address1: "88 Elm Ave", address2: "", city: "English", state: "WA", zip: "98001" },
  { firstName: "John", lastName: "Scott", birthDate: "01/17/1993", gender: "M", primaryPhone: "(646) 617-1880", address1: "962 NEC Blvd", address2: "Floor 5", city: "Denver", state: "CO", zip: "k" },
  { firstName: "Allison", lastName: "Johnson", birthDate: "11/25/1985", gender: "F", primaryPhone: "(646) 617-1880", address1: "902 Cedar Ln", address2: "", city: "English", state: "WA", zip: "98003" },
  { firstName: "Emily", lastName: "Davis", birthDate: "07/19/1990", gender: "F", primaryPhone: "(646) 617-1880", address1: "902 Cedar Ln", address2: "", city: "English", state: "WA", zip: "98003" },
  { firstName: "Tom", lastName: "Taylor", birthDate: "09/05/1982", gender: "M", primaryPhone: "(646) 617-1880", address1: "902 Cedar Ln", address2: "", city: "Houston", state: "TX", zip: "77001" },
  { firstName: "Sara", lastName: "Brown", birthDate: "04/11/1994", gender: "F", primaryPhone: "(646) 617-1880", address1: "962 NEC Blvd", address2: "Apr NJ", city: "Atlanta", state: "GA", zip: "30301" },
  { firstName: "Tom", lastName: "Taylor", birthDate: "09/05/1982", gender: "M", primaryPhone: "(646) 617-1880", address1: "902 Canal Dr", address2: "", city: "Houston", state: "TX", zip: "77001" },
  { firstName: "Jane", lastName: "Doe", birthDate: "03/22/1988", gender: "F", primaryPhone: "(646) 617-1880", address1: "88 Elm Ave", address2: "Suite 2001", city: "Los Angeles", state: "CA", zip: "90003" },
  { firstName: "Michael", lastName: "Chu", birthDate: "06/30/1979", gender: "M", primaryPhone: "(646) 617-1880", address1: "396 May Dr", address2: "", city: "New York", state: "NY", zip: "10001" },
];

function PatientCreateModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  const inputClass = "mt-1.5 h-10 w-full rounded-[10px] border border-[#dddcd8] bg-white px-3 text-[12px] outline-none placeholder:text-[#b8b8b5] focus:border-[#202020]";
  const fields = [
    ["First Name", "firstName", "Write...", true], ["Last Name", "lastName", "Write...", true],
    ["Primary Phone", "primaryPhone", "(000) 000-0000", true], ["Secondary Phone", "secondaryPhone", "(000) 000-0000", false],
    ["Address 1", "address1", "Start typing address...", true], ["Apt, Floor, etc.", "address2", "Write...", false],
    ["City", "city", "Write...", true], ["Zip Code", "zip", "Write...", true],
    ["Allergies", "allergies", "Write...", false], ["Email", "email", "Write...", false],
  ] as const;
  return (
    <div className="fixed inset-0 z-[80] flex justify-end bg-black/30 backdrop-blur-[2px]">
      <button className="absolute inset-0 cursor-default" onClick={onClose} aria-label="Close create patient" />
      <form onSubmit={event => { event.preventDefault(); onClose(); }} className="relative flex h-full w-full max-w-[680px] flex-col overflow-hidden rounded-l-[16px] border-l border-[#e4e1dd] bg-white shadow-[-18px_0_55px_rgba(0,0,0,0.16)]">
        <div className="flex items-center justify-between border-b border-[#ece9e5] px-6 py-5">
          <div><h2 className="text-[20px] font-semibold text-[#171717]">Create Patient</h2><p className="mt-1 text-[11px] text-[#777]">Enter the patient’s personal and contact information.</p></div>
          <button type="button" onClick={onClose} className="flex size-8 items-center justify-center rounded-full text-[#777] hover:bg-[#f4f2ef]" aria-label="Close"><X size={18} /></button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
          <div className="grid gap-x-4 gap-y-4 sm:grid-cols-2">
            {fields.slice(0, 2).map(([label, name, placeholder, required]) => <label key={name} className="block text-[11px] font-medium text-[#242424]">{label} {required && <span className="text-[#b44b42]">*</span>}<input name={name} required={required} placeholder={placeholder} className={inputClass} /></label>)}
            <label className="block text-[11px] font-medium text-[#242424]">Gender <span className="text-[#b44b42]">*</span><select required defaultValue="" className={inputClass}><option value="" disabled>Select</option><option>Female</option><option>Male</option><option>Other</option></select></label>
            <label className="block text-[11px] font-medium text-[#242424]">Birth Date <span className="text-[#b44b42]">*</span><input type="date" required className={inputClass} /></label>
            {fields.slice(2, 6).map(([label, name, placeholder, required]) => <label key={name} className="block text-[11px] font-medium text-[#242424]">{label} {required && <span className="text-[#b44b42]">*</span>}<input name={name} required={required} type={name.toLowerCase().includes("phone") ? "tel" : "text"} placeholder={placeholder} className={inputClass} /></label>)}
            <label className="block text-[11px] font-medium text-[#242424]">State <span className="text-[#b44b42]">*</span><select required defaultValue="" className={inputClass}><option value="" disabled>Select a state</option><option>Florida</option><option>New York</option><option>Texas</option><option>California</option></select></label>
            {fields.slice(6).map(([label, name, placeholder, required]) => <label key={name} className="block text-[11px] font-medium text-[#242424]">{label} {required && <span className="text-[#b44b42]">*</span>}<input name={name} required={required} type={name === "email" ? "email" : "text"} placeholder={placeholder} className={inputClass} /></label>)}
            <label className="block text-[11px] font-medium text-[#242424]">Language<select defaultValue="" className={inputClass}><option value="" disabled>Select</option><option>English</option><option>Spanish</option><option>Albanian</option></select></label>
          </div>
          <div className="mt-5 border-t border-[#ece9e5] pt-5">
            <h3 className="text-[12px] font-semibold text-[#242424]">BMI Classification</h3>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <label className="text-[11px] font-medium text-[#242424]">Weight<div className="mt-1.5 flex gap-2"><input type="number" min="0" placeholder="Write..." className={inputClass.replace("mt-1.5 ", "")} /><select className="h-10 w-20 rounded-[10px] border border-[#dddcd8] bg-white px-2 text-[12px]"><option>lb</option><option>kg</option></select></div></label>
              <label className="text-[11px] font-medium text-[#242424]">Height<div className="mt-1.5 flex gap-2"><input type="number" min="0" placeholder="Write..." className={inputClass.replace("mt-1.5 ", "")} /><select className="h-10 w-20 rounded-[10px] border border-[#dddcd8] bg-white px-2 text-[12px]"><option>in</option><option>cm</option></select></div></label>
            </div>
          </div>
        </div>
        <div className="border-t border-[#ece9e5] px-6 py-4"><button type="submit" className="h-11 w-full rounded-full bg-[#111] px-6 text-[12px] font-semibold text-white transition-colors hover:bg-black">Save Patient</button></div>
      </form>
    </div>
  );
}

function PatientDetailsView({ patient, onBack, onEdit }: { patient: typeof PATIENTS[number]; onBack: () => void; onEdit: () => void }) {
  const { runWithAppLoader } = useAppLoading();
  const ordersSectionRef = useRef<HTMLElement>(null);
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [orderDetailsOpen, setOrderDetailsOpen] = useState(false);
  const [prescriptionFormOpen, setPrescriptionFormOpen] = useState(false);
  const [medication, setMedication] = useState("");
  const [strength, setStrength] = useState("");
  const [prescriptionQty, setPrescriptionQty] = useState("1");
  const [daysSupply, setDaysSupply] = useState("");
  const [refills, setRefills] = useState("");
  const [directions, setDirections] = useState("");
  const [injectionType, setInjectionType] = useState("");
  const [compoundReason, setCompoundReason] = useState("");
  const [description, setDescription] = useState("");
  const [savedPrescriptions, setSavedPrescriptions] = useState<Array<{ medication: string; strength: string; qty: string; days: string; refills: string; directions: string; injectionType?: string; reason?: string; description?: string }>>([]);
  const [orderedPrescriptions, setOrderedPrescriptions] = useState<Array<{ medication: string; strength: string; qty: string; days: string; refills: string; directions: string; injectionType?: string; reason?: string; description?: string }>>([]);
  const [selectedPatientPharmacy, setSelectedPatientPharmacy] = useState<"DCA Pharmacy" | "Rush Pharmacy FL">("DCA Pharmacy");
  const prescriptionComplete = Boolean(medication && strength && prescriptionQty && daysSupply && refills && directions && injectionType && compoundReason);
  const selectedMedicationImage = medication === "NAD+ Injection" ? imgNadInjection : imgAminoQuad;
  const prescriptionUnitPrice = (name: string) => name === "NAD+ Injection" ? 84.50 : name === "Tirzepatide/Pyridoxine (B6)" ? 125.43 : 35;
  return (
    <div className="max-w-[1180px]">
      <div className="mb-5 flex items-center gap-3">
        <PageBackButton onClick={onBack} label="Back to patients" />
        <h1 className="text-[22px] font-semibold text-[#1a1a1a]">Patients</h1>
      </div>
      <section className="rounded-[14px] bg-[var(--app-soft)] px-6 py-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-[22px] font-semibold text-[#171717]">{patient.firstName} {patient.lastName} <span className="text-[16px] font-semibold text-[#666]">({patient.gender})</span></h1>
            <p className="mt-1 text-[11px] text-[#7a7a7a]">Date of birth {patient.birthDate}</p>
          </div>
          <button onClick={onEdit} className="inline-flex h-9 items-center gap-2 rounded-full bg-white px-4 text-[11px] font-semibold text-black shadow-sm"><Edit3 size={13} /> Edit patient</button>
        </div>
      </section>

      <section className="mt-4 rounded-[14px] bg-white">
        <button onClick={() => setDetailsOpen(current => !current)} className="flex w-full items-center justify-between px-5 py-4 text-left"><div><h2 className="text-[14px] font-semibold text-[#202020]">Patient information</h2><p className="mt-0.5 text-[10px] text-[#858585]">Contact, address, and medical details</p></div><span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#333]">{detailsOpen ? "Hide details" : "Show details"}<ChevronDown size={14} className={detailsOpen ? "rotate-180" : ""} /></span></button>
        {detailsOpen && <div className="grid gap-3 px-5 pb-5 md:grid-cols-3">
          <div className="rounded-[10px] bg-[#FBFBFB] p-4"><p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#9298a0]">Contact</p><p className="mt-3 text-[11px] text-[#777]">Primary phone</p><p className="mt-1 text-[12px] font-semibold text-[#222]">{patient.primaryPhone}</p><p className="mt-3 text-[11px] text-[#777]">Email</p><p className="mt-1 text-[12px] text-[#222]">—</p></div>
          <div className="rounded-[10px] bg-[var(--app-soft)] p-4"><p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#9298a0]">Address</p><p className="mt-3 text-[12px] font-semibold text-[#222]">{patient.address1}</p>{patient.address2 && <p className="mt-1 text-[12px] text-[#555]">{patient.address2}</p>}<p className="mt-1 text-[12px] text-[#555]">{patient.city}, {patient.state} {patient.zip}</p></div>
          <div className="rounded-[10px] bg-[#fbfffd] p-4"><p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#9298a0]">Medical</p><p className="mt-3 text-[11px] text-[#777]">Allergies</p><p className="mt-1 text-[12px] text-[#222]">None recorded</p></div>
        </div>}
      </section>


      <section ref={ordersSectionRef} className="mt-4 scroll-mt-5 rounded-[14px] bg-[var(--app-soft)] p-5">
        <div className="flex items-center justify-between"><div><h2 className="text-[16px] font-semibold text-[#202020]">Orders <span className="ml-1 text-[12px] font-normal text-[#999]">({orderedPrescriptions.length + 1})</span></h2><p className="mt-1 text-[10px] text-[#858585]">Prescription and order history</p></div><div className="group flex h-[38px] w-[220px] items-center gap-2 rounded-[9px] border border-[#cfcfcf] bg-white px-3 transition-all duration-300 ease-out focus-within:w-[310px] focus-within:border-2 focus-within:border-black"><Search size={14} strokeWidth={1.8} className="shrink-0 text-[#686868] transition-transform duration-300 group-focus-within:scale-110" /><input placeholder="Search orders" className="min-w-0 flex-1 bg-transparent text-[11px] font-medium text-[#1a1a1a] outline-none placeholder:font-medium placeholder:text-[#686868]" /><span className="shrink-0 text-[10px] text-[#686868]">⌘ F</span></div></div>
        {orderedPrescriptions.map((prescription, index) => <article key={`ordered-${prescription.medication}-${index}`} className="mt-3 flex flex-wrap items-center gap-4 rounded-[10px] bg-white px-4 py-4"><div className="flex size-12 items-center justify-center overflow-hidden"><img src={prescription.medication === "NAD+ Injection" ? imgNadInjection : imgAminoQuad} alt="" className="size-12 object-contain mix-blend-multiply" /></div><div className="min-w-0 flex-1"><div className="flex items-center gap-2"><p className="text-[12px] font-semibold text-[#222]">{prescription.medication}</p><span className="rounded-full bg-gradient-to-r from-[#FFE2D2] to-[#FFF45C] px-2 py-1 text-[8px] font-bold text-[#56203B]">Pending approval</span></div><p className="mt-1 text-[10px] text-[#777]">Qty {prescription.qty} · {prescription.days} days · {prescription.refills} refills · {selectedPatientPharmacy}</p></div><p className="text-[13px] font-semibold">${(prescriptionUnitPrice(prescription.medication) * Number(prescription.qty)).toFixed(2)}</p></article>)}
        <article className="mt-3 rounded-[10px] bg-white">
          <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-4"><div className="flex items-center gap-3"><div className="flex size-12 shrink-0 items-center justify-center overflow-hidden bg-white"><img src={imgNadInjection} alt="NAD+ Injection" className="size-12 object-contain mix-blend-multiply" /></div><div><div className="flex items-center gap-2"><p className="text-[12px] font-semibold text-[#222]">NAD+ Injection</p><span className="rounded-full bg-gradient-to-r from-[#FFE2D2] to-[#FFF45C] px-2 py-1 text-[8px] font-bold text-[#56203B]">Pending approval</span></div><p className="mt-1 text-[10px] text-[#777]">Order #449537 · Jul 13, 2026 · Qty 1</p></div></div><div className="flex items-center gap-5"><p className="text-[13px] font-semibold text-[#222]">$74.64</p><button onClick={() => setOrderDetailsOpen(current => !current)} className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#333] hover:underline">{orderDetailsOpen ? "Hide details" : "Show details"}<ChevronDown size={13} className={orderDetailsOpen ? "rotate-180" : ""} /></button></div></div>
          {orderDetailsOpen && <div className="mx-4 mb-4 grid gap-4 rounded-[9px] bg-[#FBFBFB] px-4 py-4 text-[11px] sm:grid-cols-4"><div><p className="text-[#888]">Patient</p><p className="mt-1 font-semibold">{patient.firstName} {patient.lastName}</p></div><div><p className="text-[#888]">Shipping</p><p className="mt-1 font-semibold">Ship to patient</p></div><div><p className="text-[#888]">Tracking</p><p className="mt-1 font-semibold">Not ready</p></div><div><p className="text-[#888]">Days supply / Refills</p><p className="mt-1 font-semibold">30 days · 0 refills</p></div></div>}
        </article>
      </section>
    </div>
  );
}

function UsersPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [search, setSearch] = useState("");
  const [createPatientOpen, setCreatePatientOpen] = useState(false);
  const [patients, setPatients] = useState(PATIENTS);
  const [openPatientMenu, setOpenPatientMenu] = useState<number | null>(null);
  const [selectedPatientIndex, setSelectedPatientIndex] = useState<number | null>(null);
  const filtered = patients.filter(
    (p) =>
      `${p.firstName} ${p.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      p.city.toLowerCase().includes(search.toLowerCase()) ||
      p.primaryPhone.includes(search)
  );

  function patientOrderCount(patient: typeof PATIENTS[number]) {
    const name = `${patient.firstName} ${patient.lastName}`.toLowerCase();
    return ORDERS.filter(order => {
      const orderPatients = "patients" in order ? order.patients : [order.patient];
      return orderPatients.some(orderPatient => orderPatient.name.toLowerCase() === name);
    }).length;
  }

  function patientBmi(index: number) {
    const values = [23.4, 24.8, 27.1, 22.6, 25.3, 29.2, 24.1, 26.7, 21.9, 30.4, 23.8, 28.1];
    const value = values[index % values.length];
    const classification = value < 18.5 ? "Underweight" : value < 25 ? "Normal" : value < 30 ? "Overweight" : "Obesity";
    return { value, classification };
  }

  const COLS = ["Patient", "Phone", "Address", "BMI", "Orders", ""];

  if (selectedPatientIndex !== null && patients[selectedPatientIndex]) {
    return <><PatientDetailsView patient={patients[selectedPatientIndex]} onBack={() => setSelectedPatientIndex(null)} onEdit={() => setCreatePatientOpen(true)} /><PatientCreateModal open={createPatientOpen} onClose={() => setCreatePatientOpen(false)} /></>;
  }

  return (
    <>
      <div className="max-w-[1400px]">
        <div className="mb-5 flex flex-col gap-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="flex h-[38px] items-center text-[28px] font-semibold text-[#1a1a1a] leading-tight">
              Patients{" "}
              <span className="text-[16px] font-normal text-[#9d9d9d]">({patients.length})</span>
            </h1>
          </div>

          <div className="flex w-full flex-wrap items-end gap-3">
            <div className="group mt-[17px] flex h-[38px] w-full items-center gap-2 rounded-[9px] border border-[#cfcfcf] bg-white px-3 transition-all duration-300 ease-out focus-within:border-2 focus-within:border-black sm:w-[220px] sm:focus-within:w-[310px]">
              <Search size={14} strokeWidth={1.8} className="flex-shrink-0 text-[#686868] transition-transform duration-300 group-focus-within:scale-110" />
              <input value={search} onChange={(e) => setSearch(e.target.value)} className="min-w-0 flex-1 bg-transparent text-[11px] font-medium text-[#1a1a1a] outline-none placeholder:font-medium placeholder:text-[#686868]" placeholder="Search patients" />
              <span className="shrink-0 text-[10px] text-[#686868]">⌘ F</span>
            </div>
            <div className="ml-auto flex flex-wrap items-center justify-end gap-2">
              <button className="flex h-10 items-center gap-1.5 rounded-full border border-[#d8dedb] bg-white px-4 text-[12px] font-medium text-black transition-colors hover:bg-[#f7f8f7]">
                <Upload size={15} />
                Upload Patients
              </button>
              <button onClick={() => setCreatePatientOpen(true)} className="flex h-10 items-center gap-1.5 rounded-full bg-[#111] px-4 text-[12px] font-medium text-white transition-colors hover:bg-black">
                <Plus size={15} />
                Create Patient
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-[12px] bg-[var(--app-soft)] p-2">
          <table className="w-full min-w-[940px] overflow-hidden rounded-[9px] bg-white">
            <thead>
              <tr className="bg-[#FBFBFB]">
                {COLS.map((h) => (
                  <th
                    key={h}
                    className="whitespace-nowrap px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.08em] text-[#858b88]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, i) => {
                const patientIndex = patients.indexOf(p);
                return (
                <tr
                  key={i}
                  onClick={() => setSelectedPatientIndex(patientIndex)}
                  className="group cursor-pointer transition-colors hover:bg-[var(--app-soft-hover)]"
                >
                  <td className="px-5 py-3.5">
                    <div className="min-w-0">
                      <p className="whitespace-nowrap text-[12px] font-semibold text-[#1a1a1a]">{p.firstName} {p.lastName} <span className="font-normal text-[#777]">({p.gender})</span></p>
                      <p className="mt-0.5 text-[10px] font-normal text-[#858b88]">Date of birth {p.birthDate}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-[12px] font-normal text-[#4b4b4b]">{p.primaryPhone}</td>
                  <td className="px-5 py-3.5">
                    <div className="max-w-[360px] text-[12px] leading-[17px] text-[#4b4b4b]">
                      <p className="truncate font-normal">{p.address1}{p.address2 ? `, ${p.address2}` : ""}</p>
                      <p className="text-[#6f7780]">{p.city}, {p.state} {p.zip}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5">
                    <span className="block text-[12px] font-medium text-[#333]">{patientBmi(patientIndex).value.toFixed(1)}</span>
                    <span className="mt-0.5 block text-[10px] font-normal text-[#858b88]">{patientBmi(patientIndex).classification}</span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3.5 text-[12px] font-normal text-[#4b4b4b]">{patientOrderCount(p)}</td>
                  <td onClick={event => event.stopPropagation()} className="relative px-4 py-3.5 text-right">
                    <button onClick={() => setOpenPatientMenu(current => current === patientIndex ? null : patientIndex)} className={`flex size-7 items-center justify-center rounded-[7px] text-[#777] transition-all hover:bg-[#eceae7] hover:text-[#111] ${openPatientMenu === patientIndex ? "bg-[#eceae7] opacity-100" : "opacity-0 group-hover:opacity-100"}`} aria-label={`Actions for ${p.firstName} ${p.lastName}`}>
                      <MoreHorizontal size={16} />
                    </button>
                    {openPatientMenu === patientIndex && (
                      <div className="absolute right-2 top-10 z-30 w-[150px] overflow-hidden rounded-[9px] border border-[#e2dfdb] bg-white p-1.5 text-left shadow-[0_10px_30px_rgba(0,0,0,0.14)]">
                        <button onClick={() => { setCreatePatientOpen(true); setOpenPatientMenu(null); }} className="flex h-8 w-full items-center gap-2 rounded-[6px] px-2.5 text-[11px] font-medium text-[#222] hover:bg-[#f4f2ef]"><Edit3 size={13} /> Edit</button>
                        <button onClick={() => setOpenPatientMenu(null)} className="flex h-8 w-full items-center gap-2 rounded-[6px] px-2.5 text-[11px] font-medium text-[#222] hover:bg-[#f4f2ef]"><RefreshCw size={13} /> DoseSpot Sync</button>
                        <button onClick={() => { setPatients(current => current.filter((_, index) => index !== patientIndex)); setOpenPatientMenu(null); }} className="flex h-8 w-full items-center gap-2 rounded-[6px] px-2.5 text-[11px] font-medium text-[#9f3f39] hover:bg-[#fbefee]"><Trash2 size={13} /> Delete</button>
                      </div>
                    )}
                  </td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <PatientCreateModal open={createPatientOpen} onClose={() => setCreatePatientOpen(false)} />
    </>
  );
}

// ─── Settings ─────────────────────────────────────────────────────────────────

// Centered modal shell — replica of the reference settings Modal (variant="centered", width 500)
const settingsModalInputClass = "h-11 w-full rounded-[10px] border border-white/90 bg-white px-3.5 text-[12px] text-[#222] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_5px_16px_rgba(34,46,39,0.05)] outline-none placeholder:text-[#aaa] focus:border-black";

function SettingsCenteredModal({ title, subtitle, submitLabel, onClose, onSubmit, isSubmitting, children }: { title: string; subtitle: string; submitLabel: string; onClose: () => void; onSubmit: (event: FormEvent<HTMLFormElement>) => void; isSubmitting: boolean; children: ReactNode }) {
  const handleClose = () => {
    if (!isSubmitting) onClose();
  };
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/35 p-5 backdrop-blur-[3px]">
      <button type="button" className="absolute inset-0 cursor-default" onClick={handleClose} aria-label="Close modal" tabIndex={-1} />
      <form onSubmit={onSubmit} role="dialog" aria-modal="true" className="relative z-[1] flex max-h-[calc(100vh-40px)] w-full max-w-[500px] flex-col overflow-hidden rounded-[10px] border border-white/70 bg-white shadow-[0_24px_70px_rgba(20,28,24,0.2)]">
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-[#ececec] px-6 py-5">
          <div className="min-w-0">
            <h2 className="text-[20px] font-semibold text-[#171717]">{title}</h2>
            <p className="mt-1 text-[11px] text-[#777]">{subtitle}</p>
          </div>
          <button type="button" className="flex size-9 shrink-0 items-center justify-center text-[#777] transition-colors hover:text-black" onClick={handleClose} aria-label="Close">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto p-6">{children}</div>
        <div className="flex shrink-0 flex-col gap-2 border-t border-[#ececec] bg-white px-6 py-4">
          <button type="submit" disabled={isSubmitting} className="inline-flex h-[45px] w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-black px-[22px] text-[13px] font-medium text-white transition-colors hover:bg-[#121212] disabled:cursor-not-allowed disabled:opacity-50">
            {isSubmitting ? <span className="size-3.5 animate-spin rounded-full border-2 border-current border-t-transparent opacity-80" aria-hidden="true" /> : submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}

function SettingsChangeEmailModal({ isOpen, currentEmail, onClose, onSave, isSubmitting }: { isOpen: boolean; currentEmail: string; onClose: () => void; onSave: (email: string) => void; isSubmitting: boolean }) {
  const [email, setEmail] = useState(currentEmail);

  useEffect(() => {
    setEmail(currentEmail);
  }, [currentEmail, isOpen]);

  if (!isOpen) return null;

  return (
    <SettingsCenteredModal
      title="Change email"
      subtitle="The account will sign in with the new address."
      submitLabel="Change email"
      onClose={onClose}
      isSubmitting={isSubmitting}
      onSubmit={event => {
        event.preventDefault();
        if (!isSubmitting) onSave(email);
      }}
    >
      <div className="rounded-2xl bg-[#fafafa] p-5">
        <label className="block">
          <span className="mb-2 block text-[11px] font-medium text-[#292929]">
            New email address <span className="text-[#b4473d]">*</span>
          </span>
          <input
            autoFocus
            required
            type="email"
            value={email}
            onChange={event => setEmail(event.target.value)}
            placeholder="newemail@example.com"
            className={settingsModalInputClass}
          />
        </label>
      </div>
    </SettingsCenteredModal>
  );
}

function SettingsChangePasswordModal({ isOpen, onClose, onSave, isSubmitting }: { isOpen: boolean; onClose: () => void; onSave: () => void; isSubmitting: boolean }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setPasswordError("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const fields = [
    { label: "Current password", value: currentPassword, set: setCurrentPassword, placeholder: "Enter current password" },
    { label: "New password", value: newPassword, set: setNewPassword, placeholder: "Enter new password" },
    { label: "Confirm new password", value: confirmNewPassword, set: setConfirmNewPassword, placeholder: "Confirm new password" },
  ];

  return (
    <SettingsCenteredModal
      title="Change password"
      subtitle="Set a new password for this account."
      submitLabel="Change password"
      onClose={onClose}
      isSubmitting={isSubmitting}
      onSubmit={event => {
        event.preventDefault();
        if (isSubmitting) return;
        if (newPassword !== confirmNewPassword) {
          setPasswordError("New passwords do not match");
          return;
        }
        if (newPassword.length < 6) {
          setPasswordError("New password must be at least 6 characters long");
          return;
        }
        setPasswordError("");
        onSave();
      }}
    >
      <div className="flex flex-col gap-3.5 rounded-2xl bg-[#fafafa] p-5">
        {fields.map(({ label, value, set, placeholder }, index) => (
          <label key={label} className="block">
            <span className="mb-2 block text-[11px] font-medium text-[#292929]">
              {label} <span className="text-[#b4473d]">*</span>
            </span>
            <input
              autoFocus={index === 0}
              required
              minLength={index === 0 ? undefined : 6}
              type="password"
              value={value}
              onChange={event => set(event.target.value)}
              placeholder={placeholder}
              className={settingsModalInputClass}
            />
          </label>
        ))}
        {passwordError && <p className="text-[12px] text-[#b4473d]">{passwordError}</p>}
      </div>
    </SettingsCenteredModal>
  );
}

function SettingsPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const shouldOpenPaymentSetup = () => window.sessionStorage.getItem("open-payment-setup") === "true";
  const shouldOpenPaymentOverview = () => window.sessionStorage.getItem("open-payment-overview") === "true";
  const [activeTab, setActiveTab] = useState(() => shouldOpenPaymentSetup() || shouldOpenPaymentOverview() ? "Pay by Clinic" : "Business Account");
  const [paymentTab, setPaymentTab] = useState<"Credit Card" | "Bank Account (ACH)">("Credit Card");
  const [primaryClinicPayment, setPrimaryClinicPayment] = useState<"credit" | "ach">("credit");
  const [creditCardOpen, setCreditCardOpen] = useState(() => shouldOpenPaymentSetup());
  const [cardType, setCardType] = useState("Visa");
  const [cardAuthorized, setCardAuthorized] = useState(true);
  const [cardSaving, setCardSaving] = useState(false);
  const [savedClinicCard, setSavedClinicCard] = useState(() => window.sessionStorage.getItem("clinic-card-saved") === "true");
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [inviteUserOpen, setInviteUserOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [invitePrescriberOpen, setInvitePrescriberOpen] = useState(false);
  const [invitePrescriberEmail, setInvitePrescriberEmail] = useState("");
  const [openUserMenu, setOpenUserMenu] = useState<string | null>(null);
  const [openPrescriberMenu, setOpenPrescriberMenu] = useState<string | null>(null);
  const { showToast } = useAppLoading();
  const [changeEmailTarget, setChangeEmailTarget] = useState<{ name: string; email: string } | null>(null);
  const [changePasswordTarget, setChangePasswordTarget] = useState<{ name: string } | null>(null);
  const [emailSaving, setEmailSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [showUserPassword, setShowUserPassword] = useState(false);
  const [newUserAdmin, setNewUserAdmin] = useState(false);
  const [newUserActive, setNewUserActive] = useState(true);
  const [newUser, setNewUser] = useState({ firstName: "", lastName: "", email: "", phone: "", title: "" });
  const generatedUserPassword = "Rx!8k2mQ9";
  const [addPrescriberOpen, setAddPrescriberOpen] = useState(false);
  const [showPrescriberPassword, setShowPrescriberPassword] = useState(false);
  const [newPrescriberActive, setNewPrescriberActive] = useState(true);
  const [newPrescriber, setNewPrescriber] = useState({ email: "", password: "", title: "", firstName: "", lastName: "", dob: "", npi: "", dea: "", license: "", phone: "", fax: "", cell: "", address1: "", address2: "", city: "", state: "", zip: "" });
  const generatedPrescriberPassword = "Rx!4p7vN2";
  const signatureCanvasRef = useRef<HTMLCanvasElement>(null);
  const signatureDrawingRef = useRef(false);

  useEffect(() => {
    window.sessionStorage.removeItem("open-payment-setup");
    window.sessionStorage.removeItem("open-payment-overview");
    const openPaymentSetup = () => {
      setActiveTab("Pay by Clinic");
      setPaymentTab("Credit Card");
      setCreditCardOpen(true);
      window.sessionStorage.removeItem("open-payment-setup");
    };
    window.addEventListener("open-payment-setup", openPaymentSetup);
    const openPaymentOverview = () => {
      setActiveTab("Pay by Clinic");
      setPaymentTab("Credit Card");
      setCreditCardOpen(false);
      window.sessionStorage.removeItem("open-payment-overview");
    };
    window.addEventListener("open-payment-overview", openPaymentOverview);
    return () => {
      window.removeEventListener("open-payment-setup", openPaymentSetup);
      window.removeEventListener("open-payment-overview", openPaymentOverview);
    };
  }, []);

  useEffect(() => {
    if (!creditCardOpen) return;
    const frame = window.requestAnimationFrame(() => {
      const canvas = signatureCanvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      canvas.width = rect.width * ratio;
      canvas.height = rect.height * ratio;
      const context = canvas.getContext("2d");
      if (!context) return;
      context.scale(ratio, ratio);
      context.lineCap = "round";
      context.lineJoin = "round";
      context.lineWidth = 2;
      context.strokeStyle = "#171717";
    });
    return () => window.cancelAnimationFrame(frame);
  }, [creditCardOpen]);

  function signaturePoint(event: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = signatureCanvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: Math.max(0, Math.min(event.clientX - rect.left, rect.width)),
      y: Math.max(0, Math.min(event.clientY - rect.top, rect.height)),
    };
  }

  function startSignature(event: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = signatureCanvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    signatureDrawingRef.current = true;
    canvas.setPointerCapture(event.pointerId);
    const point = signaturePoint(event);
    context.beginPath();
    context.moveTo(point.x, point.y);
  }

  function drawSignature(event: React.PointerEvent<HTMLCanvasElement>) {
    if (!signatureDrawingRef.current) return;
    const canvas = signatureCanvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const point = signaturePoint(event);
    context.lineTo(point.x, point.y);
    context.stroke();
  }

  function stopSignature() {
    signatureDrawingRef.current = false;
  }

  function clearSignature() {
    const canvas = signatureCanvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  function saveCreditCard() {
    if (!cardAuthorized || cardSaving) return;
    setCardSaving(true);
    window.setTimeout(() => {
      setCardSaving(false);
      setSavedClinicCard(true);
      window.sessionStorage.setItem("clinic-card-saved", "true");
      window.sessionStorage.setItem("clinic-card-notice-until", String(Date.now() + 8000));
      window.dispatchEvent(new Event("clinic-payment-updated"));
      setCreditCardOpen(false);
    }, 1100);
  }

  // Row menus close on any outside press, matching the reference settings tables.
  useEffect(() => {
    if (!openUserMenu && !openPrescriberMenu) return;
    const handleMouseDown = (event: MouseEvent) => {
      const target = event.target as Element;
      if (target.closest("[data-row-menu]") || target.closest("[data-menu-trigger]")) return;
      setOpenUserMenu(null);
      setOpenPrescriberMenu(null);
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [openUserMenu, openPrescriberMenu]);

  function handleSaveEmail() {
    setEmailSaving(true);
    window.setTimeout(() => {
      setEmailSaving(false);
      setChangeEmailTarget(null);
      showToast("Email updated successfully");
    }, 900);
  }

  function handleSavePassword() {
    setPasswordSaving(true);
    window.setTimeout(() => {
      setPasswordSaving(false);
      setChangePasswordTarget(null);
      showToast("Password updated successfully");
    }, 900);
  }

  const users = [
    ["1", "Adnan Godanci", "(646)-617-9881", "adnan@batchrx.com", "Manager"],
    ["2", "Anna Robinson", "(646)-690-9596", "anna@scriptlinkrx.com", "Prescriber"],
    ["3", "Rudi .", "(917)-719-4314", "rudi@scriptlinkrx.com", "Prescriber"],
    ["4", "Sam .", "(917)-267-8116", "sam@scriptlinkrx.com", "Prescriber"],
    ["5", "Test User xsOvim", "(555)-555-5555", "test+xsOvim@scriptlinkrx.com", "Manager"],
    ["6", "Test User d8nos3", "(555)-555-5555", "test+d8nos3@scriptlinkrx.com", "Manager"],
    ["7", "Mariam Makawy", "(646)-389-2493", "mariam@scriptlinkrx.com", "Prescriber"],
    ["8", "shpend support", "(646)-617-9881", "shpend-support@gmail.com", "Manager"],
    ["9", "Shpend Beqiraj", "(646)-617-9881", "shpend@scriptlinkrx.com", "Prescriber"],
  ];
  const prescribers = [
    ["1", "Chirag Support", "(646)-617-9881", "chirag_support@scriptlinkrx.com", "1234566982"],
    ["2", "Altin Selimi", "(646)-617-9881", "altin@batchrx.com", "1804612084"],
    ["3", "Altin Selimi", "(646)-617-9881", "altiin-a@scriptlinkrx.com", "-"],
    ["4", "Alex Revira", "(100)-147-1633", "alex@scriptlinkrx.com", "1121311614"],
    ["5", "Eric Garcia", "(646)-389-9683", "eric@scriptlinkrx.com", "1234232323"],
    ["6", "Zee Rabushaj", "(646)-617-9881", "demo2@scriptlinkrx.com", "1234523452"],
  ];

  function SettingsField({ label, value, required, wide }: { label: string; value: string; required?: boolean; wide?: boolean }) {
    return (
      <label className={wide ? "col-span-2 max-md:col-span-1" : ""}>
        <span className="mb-1.5 block text-[11px] text-[#9d9d9d]">
          {label}{required && <span className="text-[#d92d20]">*</span>}
        </span>
        <input
          readOnly
          value={value}
          className="w-full rounded-[9px] border border-[#EAE8E1] bg-white px-3 py-2.5 text-[13px] text-[#1a1a1a] outline-none transition-colors focus:border-[#183229]"
        />
      </label>
    );
  }

  function DataTable({ type }: { type: "users" | "prescribers" }) {
    const rows = type === "users" ? users : prescribers;
    const headers = type === "users"
      ? ["#", "Full Name", "User Phone", "User Email", "User Title", "Status", ""]
      : ["#", "Full Name", "Prescriber Phone", "Prescriber Email", "NPI Number", "Status", ""];
    return (
      <div className="rounded-[12px] bg-[#FBFBFB] p-2">
        <div className="grid grid-cols-[40px_1.25fr_1fr_1.55fr_1fr_92px_38px] rounded-t-[9px] bg-[#FBFBFB] px-4 py-3">
          {headers.map(h => (
            <span key={h} className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8c8c8c]">{h}</span>
          ))}
        </div>
        {rows.map(row => (
          <div key={`${type}-${row[0]}`} className="relative grid grid-cols-[40px_1.25fr_1fr_1.55fr_1fr_92px_38px] items-center bg-white px-4 py-3.5 text-[12px] text-[#1a1a1a] transition-colors hover:bg-[var(--app-soft-hover)]">
            {row.map((cell, index) => index === 1 ? <span key={cell} className="min-w-0 truncate font-semibold">{cell}</span> : <span key={`${index}-${cell}`} className={`min-w-0 truncate ${index === 0 ? "text-[#999]" : ""}`}>{cell}</span>)}
            <span className="inline-flex w-fit rounded-full bg-[#ecf8ef] px-3 py-1.5 text-[10px] font-semibold text-[#31583F]">Active</span>
            <div className="relative">
              <button data-menu-trigger onClick={() => type === "users" ? setOpenUserMenu(current => current === row[0] ? null : row[0]) : setOpenPrescriberMenu(current => current === row[0] ? null : row[0])} className={`flex size-7 items-center justify-center rounded-[7px] transition-colors ${(type === "users" ? openUserMenu === row[0] : openPrescriberMenu === row[0]) ? "bg-[#f2f7f4] text-[#183229]" : "text-[#8c95a1] hover:bg-[#f2f7f4] hover:text-[#183229]"}`} aria-label={`Actions for ${row[1]}`} aria-expanded={type === "users" ? openUserMenu === row[0] : openPrescriberMenu === row[0]}>
                <MoreHorizontal size={15} />
              </button>
              {type === "users" && openUserMenu === row[0] && (
                <div data-row-menu className="absolute right-0 top-8 z-50 w-[190px] overflow-hidden rounded-[9px] border border-[#e2e2e2] bg-white py-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.14)]">
                  {[
                    { label: "Edit User", color: "text-[#555]" },
                    { label: "Change Email", color: "text-[#555]", action: () => setChangeEmailTarget({ name: row[1], email: row[3] }) },
                    { label: "Change Password", color: "text-[#555]", action: () => setChangePasswordTarget({ name: row[1] }) },
                    { label: "Convert to Prescriber", color: "text-[#635BFF]" },
                    { label: "Delete User", color: "text-[#ef3030]" },
                  ].map(({ label, color, action }) => (
                    <button key={label} type="button" onClick={() => { setOpenUserMenu(null); action?.(); }} className={`flex h-10 w-full items-center gap-2 px-3 text-left text-[13px] font-medium leading-5 transition-colors hover:bg-[#f1f1f1] ${color}`}>
                      {label}
                    </button>
                  ))}
                </div>
              )}
              {type === "prescribers" && openPrescriberMenu === row[0] && (
                <div data-row-menu className="absolute right-0 top-8 z-50 w-[190px] overflow-hidden rounded-[9px] border border-[#e2e2e2] bg-white py-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.14)]">
                  {[
                    { label: "Edit User", color: "text-[#555]" },
                    { label: "Change Email", color: "text-[#555]", action: () => setChangeEmailTarget({ name: row[1], email: row[3] }) },
                    { label: "Change Password", color: "text-[#555]", action: () => setChangePasswordTarget({ name: row[1] }) },
                    { label: "EPCS Sync", color: "text-[#555]" },
                    { label: "Delete", color: "text-[#ef3030]" },
                  ].map(({ label, color, action }) => (
                    <button key={label} type="button" onClick={() => { setOpenPrescriberMenu(null); action?.(); }} className={`flex h-10 w-full items-center gap-2 px-3 text-left text-[13px] font-medium leading-5 transition-colors hover:bg-[#f1f1f1] ${color}`}>
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <Header title="Settings" onNavigate={onNavigate} />

      <SettingsChangeEmailModal
        isOpen={!!changeEmailTarget}
        currentEmail={changeEmailTarget?.email ?? ""}
        onClose={() => setChangeEmailTarget(null)}
        onSave={handleSaveEmail}
        isSubmitting={emailSaving}
      />
      <SettingsChangePasswordModal
        isOpen={!!changePasswordTarget}
        onClose={() => setChangePasswordTarget(null)}
        onSave={handleSavePassword}
        isSubmitting={passwordSaving}
      />

      <div className="grid grid-cols-[220px_1fr] gap-6">
        <nav className="flex flex-col gap-1">
          {[
            { icon: Building2, label: "Business Account" },
            { icon: Users, label: "Users" },
            { icon: User, label: "Prescribers" },
            { icon: CreditCard, label: "Pay by Clinic" },
            { icon: CreditCard, label: "Payouts ACH" },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              onClick={() => setActiveTab(label)}
              className={`flex items-center gap-2.5 rounded-[9px] px-3 py-2.5 text-left text-[12px] font-normal text-black transition-colors ${
                activeTab === label ? "bg-[var(--app-menu-bg)]" : "hover:bg-[var(--app-menu-bg)]"
              }`}
            >
              <Icon size={15} strokeWidth={1.5} className="shrink-0 text-black" />
              <span className="min-w-0 flex-1">{label}</span>
            </button>
          ))}
        </nav>

        <div className="space-y-5">
          {activeTab === "Business Account" && (
            <div className="rounded-[14px] bg-[#FBFBFB] p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-[14px] font-semibold text-[#1a1a1a]">Business Account</h3>
                <button className="h-10 rounded-full bg-black px-4 text-[12px] font-medium text-white transition-colors hover:bg-[#1a1a1a]/90">
                  Edit Profile
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
                <SettingsField label="Business Name" value="ScriptLinkRx Demo" required wide />
                <SettingsField label="Business NPI" value="2222222111" wide />
                <SettingsField label="Address Line 1" value="2823 Middletown Road" wide />
                <SettingsField label="Address Line 2" value="Line 2" wide />
                <SettingsField label="City" value="Bronx" />
                <SettingsField label="State" value="New York" />
                <SettingsField label="Zip Code" value="10461" />
                <SettingsField label="Phone" value="(646)-617-9881" />
                <SettingsField label="Fax" value="(646)-617-9881" />
                <SettingsField label="Pay By Preferred" value="Clinic" />
                <SettingsField label="Ship To Preferred" value="Clinic" />
              </div>
            </div>
          )}

          {activeTab === "Users" && (
            <div className="rounded-[14px] bg-[#FBFBFB] p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-[14px] font-semibold text-[#1a1a1a]">Users</h3>
              <div className="flex gap-2">
                <button onClick={() => setInviteUserOpen(true)} className="h-10 rounded-full border border-[#EAE8E1] bg-white px-4 text-[12px] font-medium text-[#1a1a1a] transition-colors hover:bg-[#FBFBFB]">Invite</button>
                <button onClick={() => setAddUserOpen(true)} className="flex h-10 items-center gap-1.5 rounded-full bg-black px-4 text-[12px] font-medium text-white transition-colors hover:bg-[#1a1a1a]/90">
                  <Plus size={15} /> Add User
                </button>
              </div>
            </div>
            <DataTable type="users" />
          </div>
          )}

          {activeTab === "Prescribers" && (
            <div className="rounded-[14px] bg-[#FBFBFB] p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-[14px] font-semibold text-[#1a1a1a]">Prescribers</h3>
              <div className="flex gap-2">
                <button onClick={() => setInvitePrescriberOpen(true)} className="h-10 rounded-full border border-[#EAE8E1] bg-white px-4 text-[12px] font-medium text-[#1a1a1a] transition-colors hover:bg-[#FBFBFB]">Invite</button>
                <button onClick={() => setAddPrescriberOpen(true)} className="flex h-10 items-center gap-1.5 rounded-full bg-black px-4 text-[12px] font-medium text-white transition-colors hover:bg-[#1a1a1a]/90">
                  <Plus size={15} /> Add Prescriber
                </button>
              </div>
            </div>
            <DataTable type="prescribers" />
          </div>
          )}

          {activeTab === "Pay by Clinic" && (
            <div data-payment-methods>
              <div className="mb-5 flex items-center justify-between gap-5 px-1 max-sm:items-start max-sm:flex-col">
                <div>
                  <h3 className="text-[13px] font-medium text-[#1a1a1a]">Default payment method</h3>
                  <p className="mt-1 text-[11px] text-[#737373]">Automatically selected for Pay by Clinic orders.</p>
                </div>
                <div className="relative w-[230px] max-sm:w-full">
                  <select aria-label="Default payment method" value={primaryClinicPayment} onChange={event => setPrimaryClinicPayment(event.target.value as "credit" | "ach")} className="h-10 w-full appearance-none rounded-[10px] border border-[#cfd3d8] bg-white pl-4 pr-10 text-[11px] font-medium text-[#1a1a1a] outline-none transition-colors hover:border-[#98a2b3] focus:border-[#2563EB]">
                    <option value="credit">Credit Card</option>
                    <option value="ach">Bank Account (ACH)</option>
                  </select>
                  <ChevronsUpDown size={14} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#344054]" />
                </div>
              </div>

              <div className="mb-4 flex items-end gap-5 border-b border-[#e3e3e3] px-1" role="tablist" aria-label="Payment methods">
                {(["Credit Card", "Bank Account (ACH)"] as const).map(tab => (
                  <button
                    key={tab}
                    type="button"
                    role="tab"
                    aria-selected={paymentTab === tab}
                    onClick={() => setPaymentTab(tab)}
                    className={`relative h-[46px] whitespace-nowrap px-0.5 text-[12px] font-medium transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:transition-colors ${paymentTab === tab ? "text-[#171717] after:bg-[#183229]" : "text-[#7b827e] after:bg-transparent hover:text-[#171717]"}`}
                  >
                    <span className="inline-flex items-center gap-2">
                      {tab}
                    </span>
                  </button>
                ))}
              </div>

              {paymentTab === "Credit Card" && (
            <div className="rounded-[14px] bg-[#FBFBFB] p-6">
              <div className="mb-5 flex items-center justify-between gap-3 border-b border-[#e8e9e8] pb-4">
                <div>
                  <h3 className="text-[14px] font-semibold text-[#1a1a1a]">Credit Card</h3>
                  <p className="mt-1 text-[11px] text-[#7b827e]">Manage the credit card used for clinic purchases.</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => setCreditCardOpen(true)} className="flex h-10 items-center gap-1.5 rounded-full bg-black px-4 text-[11px] font-medium text-white transition-colors hover:bg-[#1a1a1a]/90"><Plus size={14} /> Add Credit Card</button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5 max-lg:grid-cols-1">
                {savedClinicCard ? (
                  <div className="rounded-[10px] border border-[#eaeaea] bg-white p-5">
                    <div className="flex items-start justify-between gap-4 border-b border-[#eeeeee] pb-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-12 items-center justify-center rounded-[5px] border border-[#dedede] bg-white text-[12px] font-black italic text-[#1434CB]">VISA</span>
                        <div><p className="text-[13px] font-semibold text-[#1a1a1a]">Visa ending in 1234</p><p className="mt-1 text-[10px] text-[#888]">Expires 12/29</p></div>
                      </div>
                      <span className="rounded-full bg-black px-2.5 py-1 text-[9px] font-semibold text-white">Active</span>
                    </div>
                    <div className="py-4 text-[11px]"><p className="text-[#888]">Cardholder</p><p className="mt-1 font-semibold text-[#222]">ScriptLinkRx Clinic</p></div>
                    <div className="flex items-center gap-2">
                      <button type="button" onClick={() => setCreditCardOpen(true)} className="h-9 rounded-full border border-[#d8d8d8] bg-white px-5 text-[11px] font-medium text-[#1f1f1f] transition-colors hover:border-[#b8b8b8] hover:bg-[#f7f7f7]">Update card</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex min-h-[190px] flex-col items-center justify-center rounded-[10px] border border-[#eaeaea] bg-white p-6 text-center">
                    <Package size={28} strokeWidth={1.5} className="mb-3 text-[#9d9d9d]" /><p className="text-[14px] font-semibold text-[#1a1a1a]">No credit card found</p><p className="mt-2 text-[12px] text-[#8c8c8c]">Add a credit card to enable Pay by Clinic.</p>
                    <button onClick={() => setCreditCardOpen(true)} className="mt-4 flex h-10 items-center gap-1.5 rounded-full bg-black px-4 text-[11px] font-medium text-white"><Plus size={14} /> Add Credit Card</button>
                  </div>
                )}
                <div className="rounded-[10px] border border-[#eaeaea] bg-[#FAFAFA] p-5"><AlertCircle size={17} className="mb-3 text-[#667085]" /><p className="text-[12px] leading-relaxed text-[#667085]">The card on file is charged when a new prescription is submitted using Pay by Clinic.</p></div>
              </div>
            </div>
              )}

              {paymentTab === "Bank Account (ACH)" && (
                <div className="rounded-[14px] bg-[#FBFBFB] p-6">
                  <div className="mb-5 flex items-center justify-between gap-3 border-b border-[#e8e9e8] pb-4">
                    <div className="pt-[10px]">
                      <h3 className="text-[14px] font-semibold text-[#1a1a1a]">Bank Account (ACH)</h3>
                      <p className="mt-1 text-[11px] text-[#7b827e]">Use a clinic bank account to pay for patient prescriptions directly from the account.</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="flex h-10 items-center gap-1.5 rounded-full bg-black px-4 text-[11px] font-medium text-white transition-colors hover:bg-[#1a1a1a]/90"><Plus size={14} /> Add Bank Account</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-5 max-lg:grid-cols-1">
                    <div className="overflow-hidden rounded-[10px] border border-[#eaeaea] bg-white">
                      <div className="grid grid-cols-[56px_minmax(0,1fr)_100px_82px] border-b border-[#eee8e3] bg-[#fbfaf8] px-4 py-3">{["", "Bank Accounts", "Status", ""].map((h, index) => <span key={`${h}-${index}`} className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8c8c8c]">{h}</span>)}</div>
                      <div className="grid grid-cols-[56px_minmax(0,1fr)_100px_82px] items-center px-4 py-4 text-[12px] text-[#1a1a1a]"><span className="flex h-9 w-12 items-center justify-center rounded-[5px] border border-[#dedede] bg-white px-1.5"><img src={chaseLogo} alt="Chase" className="h-auto w-full object-contain" /></span><div className="min-w-0"><p className="truncate text-[13px] font-semibold">Chase Bank</p><p className="mt-1 text-[11px] text-[#8c8c8c]">**** **** **** 2826</p></div><span className="w-fit rounded-full bg-black px-2.5 py-1 text-[9px] font-medium text-white">Active</span><button className="rounded-[7px] border border-[#D9DEDB] px-2.5 py-2 text-[11px] font-medium hover:bg-[#F7F8F7]">Update</button></div>
                    </div>
                    <div className="rounded-[10px] border border-[#eaeaea] bg-[#FAFAFA] p-5"><AlertCircle size={17} className="mb-3 text-[#667085]" /><p className="text-[12px] leading-relaxed text-[#667085]">When this is your primary method, eligible Pay by Clinic orders will be charged to this bank account.</p></div>
                  </div>

                  <section className="mt-6 border-t border-[#e8e9e8] pt-5">
                    <h4 className="mb-1 text-[13px] font-semibold text-[#1a1a1a]">Bank debit authorization</h4>
                    <p className="mb-4 text-[11px] leading-5 text-[#667085]">Required once so ScriptLinkRx has permission to debit this account when the clinic places an order.</p>
                    <div className="grid grid-cols-2 gap-5 max-lg:grid-cols-1">
                      <div className="rounded-[10px] border border-[#eaeaea] bg-white p-6">
                        <div className="mb-5 flex items-center gap-4">
                          <div className="flex size-12 items-center justify-center rounded-[10px] bg-[#F1F2F2] text-[#4e5652]"><Upload size={22} strokeWidth={1.8} /></div>
                          <div><p className="text-[16px] font-semibold text-[#1a1a1a]">Authorization signed</p><p className="mt-1 text-[12px] text-[#667085]">Signed December 13, 2025 · Bank payments enabled</p></div>
                        </div>
                        <button className="rounded-[8px] bg-black px-3 py-2 text-[12px] font-medium text-white transition-colors hover:bg-[#1a1a1a]/90">View authorization</button>
                      </div>
                      <div className="rounded-[10px] border border-[#eaeaea] bg-[#FAFAFA] p-6"><AlertCircle size={17} className="mb-4 text-[#667085]" /><p className="max-w-[430px] text-[13px] leading-relaxed text-[#667085]">This authorization only allows charges for clinic orders and related fees. You can review the signed authorization at any time.</p></div>
                    </div>
                  </section>
                </div>
              )}
            </div>
          )}

          {activeTab === "Payouts ACH" && (
            <div className="space-y-4" data-payment-methods>
              <div className="rounded-[12px] bg-[#FAFAFA] px-4 py-3">
                <h3 className="text-[13px] font-semibold text-[#1a1a1a]">Receive clinic payouts</h3>
                <p className="mt-1 text-[11px] leading-5 text-[#667085]">This is separate from Pay by Clinic. Add the bank account where ScriptLinkRx should deposit money owed to your clinic.</p>
              </div>

              <div className="rounded-[14px] bg-[#FBFBFB] p-6">
                <div className="mb-5 flex items-center justify-between gap-3 border-b border-[#e8e9e8] pb-4">
                  <div>
                    <h3 className="text-[14px] font-semibold text-[#1a1a1a]">Payout bank account</h3>
                    <p className="mt-1 text-[11px] text-[#7b827e]">Clinic earnings and reimbursements are deposited into this account.</p>
                  </div>
                  <button className="flex h-10 items-center gap-1.5 rounded-full bg-black px-3 text-[11px] font-medium text-white transition-colors hover:bg-[#1a1a1a]/90"><Plus size={14} /> Add payout account</button>
                </div>

                <div className="grid grid-cols-2 gap-5 max-lg:grid-cols-1">
                  <div className="rounded-[10px] border border-[#eaeaea] bg-white p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[13px] font-semibold text-[#1a1a1a]">Chase Bank</p>
                        <p className="mt-1 text-[11px] text-[#8c8c8c]">Checking ···· 2826</p>
                      </div>
                      <span className="rounded-full bg-[#E8F0FF] px-2.5 py-1 text-[9px] font-semibold text-[#2563EB]">Verified</span>
                    </div>
                    <div className="mt-5 flex items-center gap-2 border-t border-[#eeeeee] pt-4">
                      <button className="rounded-full border border-[#d8d8d2] bg-white px-3 py-2 text-[11px] font-medium text-black transition-colors hover:border-black hover:bg-[#f1f1f1]">Update account</button>
                    </div>
                  </div>

                  <div className="rounded-[10px] border border-[#eaeaea] bg-[#FAFAFA] p-5">
                    <p className="text-[12px] font-semibold text-[#1a1a1a]">How payouts work</p>
                    <p className="mt-2 text-[12px] leading-5 text-[#667085]">Available clinic funds are sent to this verified account. This account is only for receiving deposits—not for paying patient orders.</p>
                    <div className="mt-4 flex items-center justify-between rounded-[9px] bg-white px-3 py-2.5 text-[11px]">
                      <span className="text-[#667085]">Payout schedule</span>
                      <span className="font-semibold text-[#1a1a1a]">Weekly</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {inviteUserOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/35 p-5 backdrop-blur-[3px]">
          <button type="button" className="absolute inset-0 cursor-default" onClick={() => setInviteUserOpen(false)} aria-label="Close invite user" />
          <form
            onSubmit={event => { event.preventDefault(); setInviteUserOpen(false); setInviteEmail(""); }}
            className="relative z-10 w-full max-w-[500px] overflow-hidden rounded-[10px] border border-white/70 bg-white shadow-[0_24px_70px_rgba(20,28,24,0.2)]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="invite-user-title"
          >
            <div className="flex items-start justify-between border-b border-[#ececec] px-6 py-5">
              <div>
                <h2 id="invite-user-title" className="text-[20px] font-semibold text-[#171717]">Invite user</h2>
                <p className="mt-1 text-[11px] text-[#777]">Send a secure invitation to join your account.</p>
              </div>
              <button type="button" onClick={() => setInviteUserOpen(false)} className="flex size-9 items-center justify-center text-[#777] transition-colors hover:text-black" aria-label="Close">
                <X size={19} />
              </button>
            </div>
            <div className="p-6">
              <div className="rounded-[16px] bg-[#fafafa] p-5">
                <label className="block">
                  <span className="mb-2 block text-[11px] font-medium text-[#292929]">Email address <span className="text-[#b4473d]">*</span></span>
                  <input
                    autoFocus
                    required
                    type="email"
                    value={inviteEmail}
                    onChange={event => setInviteEmail(event.target.value)}
                    placeholder="user@example.com"
                    className="h-11 w-full rounded-[10px] border border-white/90 bg-white/80 px-3.5 text-[12px] text-[#222] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_5px_16px_rgba(34,46,39,0.05)] outline-none backdrop-blur-xl placeholder:text-[#aaa] focus:border-black"
                  />
                </label>
              </div>
            </div>
            <div className="border-t border-[#ececec] bg-white px-6 py-4">
              <button type="submit" className="h-11 w-full rounded-full bg-black text-[12px] font-semibold text-white transition-colors hover:bg-[#222]">Send invite</button>
            </div>
          </form>
        </div>
      )}
      {invitePrescriberOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/35 p-5 backdrop-blur-[3px]">
          <button type="button" className="absolute inset-0 cursor-default" onClick={() => setInvitePrescriberOpen(false)} aria-label="Close invite prescriber" />
          <form
            onSubmit={event => { event.preventDefault(); setInvitePrescriberOpen(false); setInvitePrescriberEmail(""); }}
            className="relative z-10 w-full max-w-[500px] overflow-hidden rounded-[10px] border border-white/70 bg-white shadow-[0_24px_70px_rgba(20,28,24,0.2)]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="invite-prescriber-title"
          >
            <div className="flex items-start justify-between border-b border-[#ececec] px-6 py-5">
              <div>
                <h2 id="invite-prescriber-title" className="text-[20px] font-semibold text-[#171717]">Invite prescriber</h2>
                <p className="mt-1 text-[11px] text-[#777]">Send a secure invitation to join your account.</p>
              </div>
              <button type="button" onClick={() => setInvitePrescriberOpen(false)} className="flex size-9 items-center justify-center text-[#777] transition-colors hover:text-black" aria-label="Close">
                <X size={19} />
              </button>
            </div>
            <div className="p-6">
              <div className="rounded-[16px] bg-[#fafafa] p-5">
                <label className="block">
                  <span className="mb-2 block text-[11px] font-medium text-[#292929]">Email address <span className="text-[#b4473d]">*</span></span>
                  <input autoFocus required type="email" value={invitePrescriberEmail} onChange={event => setInvitePrescriberEmail(event.target.value)} placeholder="prescriber@example.com" className="h-11 w-full rounded-[10px] border border-white/90 bg-white px-3.5 text-[12px] text-[#222] outline-none placeholder:text-[#aaa] focus:border-black" />
                </label>
              </div>
            </div>
            <div className="border-t border-[#ececec] bg-white px-6 py-4">
              <button type="submit" className="h-11 w-full rounded-full bg-black text-[12px] font-semibold text-white transition-colors hover:bg-[#222]">Send invite</button>
            </div>
          </form>
        </div>
      )}
      {addPrescriberOpen && (
        <div className="fixed inset-0 z-[95] flex items-stretch justify-end bg-black/35 backdrop-blur-[2px]">
          <button className="absolute inset-0 cursor-default" onClick={() => setAddPrescriberOpen(false)} aria-label="Close add prescriber" />
          <form onSubmit={event => { event.preventDefault(); setAddPrescriberOpen(false); }} className="relative z-10 flex h-full w-full max-w-[620px] flex-col overflow-hidden rounded-[10px] border-l border-[#e3e3e3] bg-white shadow-[-20px_0_60px_rgba(0,0,0,0.16)]">
            <div className="flex shrink-0 items-start justify-between border-b border-[#ececec] px-6 py-5">
              <div><h2 className="text-[21px] font-semibold text-[#171717]">Add prescriber</h2><p className="mt-1 text-[11px] text-[#777]">Add identity, licensing, and contact information.</p></div>
              <button type="button" onClick={() => setAddPrescriberOpen(false)} className="flex size-9 items-center justify-center text-[#777] transition-colors hover:text-black" aria-label="Close"><X size={19} /></button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-6">
              <div className="flex flex-col gap-6">
              <div className="order-1 grid gap-4 sm:grid-cols-6">
                <label className="block sm:col-span-3"><span className="mb-1.5 block text-[11px] font-medium text-[#292929]">Email <span className="text-[#b4473d]">*</span></span><input required type="email" value={newPrescriber.email} onChange={event => setNewPrescriber(current => ({ ...current, email: event.target.value }))} placeholder="name@company.com" className="h-10 w-full rounded-[10px] border border-[#d8d8d8] px-3.5 text-[12px] outline-none placeholder:text-[#aaa] focus:border-black" /></label>
                <label className="block sm:col-span-3"><span className="mb-1.5 block text-[11px] font-medium text-[#292929]">Password <span className="text-[#b4473d]">*</span></span><input required type="password" value={newPrescriber.password} onChange={event => setNewPrescriber(current => ({ ...current, password: event.target.value }))} placeholder="Create a secure password" className="h-10 w-full rounded-[10px] border border-[#d8d8d8] px-3.5 text-[12px] outline-none placeholder:text-[#aaa] focus:border-black" /></label>
                <label className="block sm:col-span-2"><span className="mb-1.5 block text-[11px] font-medium text-[#292929]">Title <span className="text-[#b4473d]">*</span></span><select required value={newPrescriber.title} onChange={event => setNewPrescriber(current => ({ ...current, title: event.target.value }))} className="h-10 w-full rounded-[10px] border border-[#d8d8d8] bg-white px-3 text-[12px] outline-none focus:border-black"><option value="" disabled>Select</option><option>MD</option><option>DO</option><option>NP</option><option>PA</option></select></label>
                {([['First name','firstName'],['Last name','lastName']] as const).map(([label,key]) => <label key={key} className="block sm:col-span-2"><span className="mb-1.5 block text-[11px] font-medium text-[#292929]">{label} <span className="text-[#b4473d]">*</span></span><input required value={newPrescriber[key]} onChange={event => setNewPrescriber(current => ({ ...current, [key]: event.target.value }))} className="h-10 w-full rounded-[10px] border border-[#d8d8d8] px-3.5 text-[12px] outline-none focus:border-black" /></label>)}
                <label className="block sm:col-span-3"><span className="mb-1.5 block text-[11px] font-medium text-[#292929]">Date of birth</span><input type="date" value={newPrescriber.dob} onChange={event => setNewPrescriber(current => ({ ...current, dob: event.target.value }))} className="h-10 w-full rounded-[10px] border border-[#d8d8d8] px-3.5 text-[12px] outline-none focus:border-black" /></label>
                <label className="block sm:col-span-3"><span className="mb-1.5 block text-[11px] font-medium text-[#292929]">NPI number <span className="text-[#b4473d]">*</span></span><input required value={newPrescriber.npi} onChange={event => setNewPrescriber(current => ({ ...current, npi: event.target.value }))} className="h-10 w-full rounded-[10px] border border-[#d8d8d8] px-3.5 text-[12px] outline-none focus:border-black" /></label>
                <label className="block sm:col-span-3"><span className="mb-1.5 block text-[11px] font-medium text-[#292929]">DEA number</span><input value={newPrescriber.dea} onChange={event => setNewPrescriber(current => ({ ...current, dea: event.target.value }))} className="h-10 w-full rounded-[10px] border border-[#d8d8d8] px-3.5 text-[12px] outline-none focus:border-black" /></label>
                <label className="block sm:col-span-3"><span className="mb-1.5 block text-[11px] font-medium text-[#292929]">License number <span className="text-[#b4473d]">*</span></span><input required value={newPrescriber.license} onChange={event => setNewPrescriber(current => ({ ...current, license: event.target.value }))} className="h-10 w-full rounded-[10px] border border-[#d8d8d8] px-3.5 text-[12px] outline-none focus:border-black" /></label>
                {([['Phone number','phone',true],['Fax number','fax',false],['Cellphone','cell',false]] as const).map(([label,key,required]) => <label key={key} className="block sm:col-span-2"><span className="mb-1.5 block text-[11px] font-medium text-[#292929]">{label} {required && <span className="text-[#b4473d]">*</span>}</span><input required={required} type="tel" value={newPrescriber[key]} onChange={event => setNewPrescriber(current => ({ ...current, [key]: event.target.value }))} placeholder="(000) 000-0000" className="h-10 w-full rounded-[10px] border border-[#d8d8d8] px-3.5 text-[12px] outline-none placeholder:text-[#aaa] focus:border-black" /></label>)}
                {([['Address line 1','address1',true],['Address line 2','address2',false]] as const).map(([label,key,required]) => <label key={key} className="block sm:col-span-3"><span className="mb-1.5 block text-[11px] font-medium text-[#292929]">{label} {required && <span className="text-[#b4473d]">*</span>}</span><input required={required} value={newPrescriber[key]} onChange={event => setNewPrescriber(current => ({ ...current, [key]: event.target.value }))} className="h-10 w-full rounded-[10px] border border-[#d8d8d8] px-3.5 text-[12px] outline-none focus:border-black" /></label>)}
                {([['City','city'],['State','state'],['Zip code','zip']] as const).map(([label,key]) => <label key={key} className="block sm:col-span-2"><span className="mb-1.5 block text-[11px] font-medium text-[#292929]">{label} <span className="text-[#b4473d]">*</span></span><input required value={newPrescriber[key]} onChange={event => setNewPrescriber(current => ({ ...current, [key]: event.target.value }))} className="h-10 w-full rounded-[10px] border border-[#d8d8d8] px-3.5 text-[12px] outline-none focus:border-black" /></label>)}
                <label className="flex cursor-pointer items-center justify-between rounded-[10px] border border-[#e3e3e3] bg-[#fafafa] px-3.5 py-3 sm:col-span-6"><span><span className="block text-[12px] font-medium text-[#202020]">Active prescriber</span><span className="mt-0.5 block text-[10px] text-[#7c7c7c]">Can sign in and prescribe immediately</span></span><input type="checkbox" checked={newPrescriberActive} onChange={event => setNewPrescriberActive(event.target.checked)} className="peer sr-only" /><span className="relative h-6 w-11 rounded-full bg-[#dedede] transition-colors peer-checked:bg-black after:absolute after:left-1 after:top-1 after:size-4 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-5" /></label>
              </div>

              <aside className="order-2 rounded-[18px] border border-white/70 bg-[radial-gradient(circle_at_90%_0%,rgba(219,232,255,0.98),transparent_52%),linear-gradient(145deg,#f8fbff_0%,#edf4ff_100%)] p-5 shadow-[0_10px_28px_rgba(38,54,45,0.08)]">
                <h3 className="text-[16px] font-semibold text-[#1b1b1b]">Login credentials</h3>
                <div className="mt-4 grid gap-3 text-[11px] sm:grid-cols-3">
                  <div><p className="mb-1.5 text-[#888]">Login URL</p><div className="rounded-[12px] border border-white/90 bg-[linear-gradient(135deg,rgba(255,255,255,0.78),rgba(255,255,255,0.4))] px-4 py-4 font-semibold text-[#222] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_6px_18px_rgba(34,46,39,0.06)] backdrop-blur-xl">scriptlinkrx.com/login</div></div>
                  <div><p className="mb-1.5 text-[#888]">Email</p><div className="rounded-[12px] border border-white/90 bg-[linear-gradient(135deg,rgba(255,255,255,0.78),rgba(255,255,255,0.4))] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_6px_18px_rgba(34,46,39,0.06)] backdrop-blur-xl"><p className={`truncate font-semibold ${newPrescriber.email ? "text-[#222]" : "text-[#aaa]"}`}>{newPrescriber.email || "zee@scriptlinkrx.com"}</p></div></div>
                  <div><p className="mb-1.5 text-[#888]">Password</p><div className="flex items-center justify-between rounded-[12px] border border-white/90 bg-[linear-gradient(135deg,rgba(255,255,255,0.78),rgba(255,255,255,0.4))] px-4 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_6px_18px_rgba(34,46,39,0.06)] backdrop-blur-xl"><p className="font-mono text-[12px] font-semibold tracking-[0.08em]">{showPrescriberPassword ? (newPrescriber.password || generatedPrescriberPassword) : "•••••••••"}</p><button type="button" onClick={() => setShowPrescriberPassword(current => !current)} className="flex size-7 items-center justify-center text-[#777] hover:text-black">{showPrescriberPassword ? <EyeOff size={15} /> : <Eye size={15} />}</button></div></div>
                </div>
                <button type="button" onClick={() => navigator.clipboard?.writeText(`Login: https://scriptlinkrx.com/login\nEmail: ${newPrescriber.email}\nPassword: ${newPrescriber.password || generatedPrescriberPassword}`)} className="mt-6 flex h-10 w-full items-center justify-center gap-2 rounded-full border border-white/80 bg-white text-[11px] font-semibold shadow-[0_3px_12px_rgba(34,46,39,0.06)] transition-transform hover:-translate-y-0.5"><Copy size={14} /> Copy credentials</button>
              </aside>
              </div>
            </div>
            <div className="flex shrink-0 flex-col gap-2 border-t border-[#ececec] bg-white px-6 py-4"><button type="submit" className="h-11 w-full rounded-full bg-black px-8 text-[13px] font-semibold text-white hover:bg-[#222]">Add prescriber</button><button type="button" onClick={() => setAddPrescriberOpen(false)} className="h-11 w-full rounded-full border border-[#d8d8d8] bg-white px-6 text-[12px] font-medium hover:bg-[#f2f2f2]">Cancel</button></div>
          </form>
        </div>
      )}
      {addUserOpen && (
        <div className="fixed inset-0 z-[95] flex items-stretch justify-end bg-black/35 backdrop-blur-[2px]">
          <button className="absolute inset-0 cursor-default" onClick={() => setAddUserOpen(false)} aria-label="Close add user" />
          <form
            onSubmit={event => { event.preventDefault(); setAddUserOpen(false); }}
            className="relative z-10 flex h-full w-full max-w-[760px] flex-col overflow-hidden rounded-[10px] border-l border-[#e3e3e3] bg-white shadow-[-20px_0_60px_rgba(0,0,0,0.16)]"
          >
            <div className="flex shrink-0 items-start justify-between border-b border-[#ececec] px-6 py-5">
              <div><h2 className="text-[21px] font-semibold text-[#171717]">Add user</h2><p className="mt-1 text-[11px] text-[#777]">Create an account and choose its access level.</p></div>
              <button type="button" onClick={() => setAddUserOpen(false)} className="flex size-9 items-center justify-center text-[#777] transition-colors hover:text-black" aria-label="Close"><X size={19} /></button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-6">
              <div className="flex flex-col gap-6">
              <div className="order-1 grid h-fit content-start gap-x-4 gap-y-3 sm:grid-cols-2">
                {([
                  ["First name", "firstName", "e.g. John"],
                  ["Last name", "lastName", "e.g. Doe"],
                  ["Email", "email", "name@company.com"],
                  ["Phone number", "phone", "+1 (000) 000-0000"],
                  ["User title", "title", "e.g. Office manager"],
                ] as const).map(([label, key, placeholder]) => (
                  <label key={key} className={key === "title" ? "block sm:col-span-2" : "block"}>
                    <span className="mb-1.5 block text-[11px] font-medium text-[#292929]">{label} <span className="text-[#b4473d]">*</span></span>
                    <input
                      required
                      type={key === "email" ? "email" : key === "phone" ? "tel" : "text"}
                      value={newUser[key]}
                      onChange={event => setNewUser(current => ({ ...current, [key]: event.target.value }))}
                      placeholder={placeholder}
                      className="h-10 w-full rounded-[10px] border border-[#d8d8d8] bg-white px-3.5 text-[12px] outline-none placeholder:text-[#aaa] focus:border-black focus:shadow-[0_0_0_2px_rgba(0,0,0,0.05)]"
                    />
                  </label>
                ))}

                <div className="grid gap-3 border-t border-[#ececec] pt-4 sm:col-span-2 sm:grid-cols-2">
                  <label className="flex cursor-pointer items-center justify-between rounded-[10px] border border-[#e3e3e3] bg-[#fafafa] px-3.5 py-3">
                    <span><span className="block text-[12px] font-medium text-[#202020]">Administrator</span><span className="mt-0.5 block text-[10px] text-[#7c7c7c]">Full account access</span></span>
                    <input type="checkbox" checked={newUserAdmin} onChange={event => setNewUserAdmin(event.target.checked)} className="peer sr-only" />
                    <span className="relative h-6 w-11 rounded-full bg-[#dedede] transition-colors peer-checked:bg-black after:absolute after:left-1 after:top-1 after:size-4 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-5" />
                  </label>
                  <label className="flex cursor-pointer items-center justify-between rounded-[10px] border border-[#e3e3e3] bg-[#fafafa] px-3.5 py-3">
                    <span><span className="block text-[12px] font-medium text-[#202020]">Active user</span><span className="mt-0.5 block text-[10px] text-[#7c7c7c]">Can sign in immediately</span></span>
                    <input type="checkbox" checked={newUserActive} onChange={event => setNewUserActive(event.target.checked)} className="peer sr-only" />
                    <span className="relative h-6 w-11 rounded-full bg-[#dedede] transition-colors peer-checked:bg-black after:absolute after:left-1 after:top-1 after:size-4 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-5" />
                  </label>
                </div>
              </div>

              <aside className="order-2 rounded-[18px] border border-white/70 bg-[radial-gradient(circle_at_90%_0%,rgba(219,232,255,0.98),transparent_52%),linear-gradient(145deg,#f8fbff_0%,#edf4ff_100%)] p-5 shadow-[0_10px_28px_rgba(38,54,45,0.08)]">
                <h3 className="text-[16px] font-semibold text-[#1b1b1b]">Login credentials</h3>
                <div className="mt-4 grid gap-3 text-[11px] sm:grid-cols-3">
                  <div><p className="mb-1.5 text-[#888]">Login URL</p><div className="rounded-[12px] border border-white/90 bg-[linear-gradient(135deg,rgba(255,255,255,0.78),rgba(255,255,255,0.4))] px-4 py-4 font-semibold text-[#222] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_6px_18px_rgba(34,46,39,0.06)] backdrop-blur-xl">scriptlinkrx.com/login</div></div>
                  <div><p className="mb-1.5 text-[#888]">Email</p><div className="rounded-[12px] border border-white/90 bg-[linear-gradient(135deg,rgba(255,255,255,0.78),rgba(255,255,255,0.4))] px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_6px_18px_rgba(34,46,39,0.06)] backdrop-blur-xl"><p className={`truncate font-semibold ${newUser.email ? "text-[#222]" : "text-[#aaa]"}`}>{newUser.email || "zee@scriptlinkrx.com"}</p></div></div>
                  <div><p className="mb-1.5 text-[#888]">Temporary password</p><div className="flex items-center justify-between rounded-[12px] border border-white/90 bg-[linear-gradient(135deg,rgba(255,255,255,0.78),rgba(255,255,255,0.4))] px-4 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_6px_18px_rgba(34,46,39,0.06)] backdrop-blur-xl"><p className="font-mono text-[12px] font-semibold tracking-[0.08em] text-[#222]">{showUserPassword ? generatedUserPassword : "•••••••••"}</p><button type="button" onClick={() => setShowUserPassword(current => !current)} className="flex size-7 items-center justify-center text-[#777] hover:text-black" aria-label={showUserPassword ? "Hide password" : "Show password"}>{showUserPassword ? <EyeOff size={15} /> : <Eye size={15} />}</button></div></div>
                </div>
                <button type="button" onClick={() => navigator.clipboard?.writeText(`Login: https://scriptlinkrx.com/login\nEmail: ${newUser.email}\nPassword: ${generatedUserPassword}`)} className="mt-6 flex h-10 w-full items-center justify-center gap-2 rounded-full border border-white/80 bg-white text-[11px] font-semibold text-[#222] shadow-[0_3px_12px_rgba(34,46,39,0.06)] transition-transform hover:-translate-y-0.5"><Copy size={14} /> Copy credentials</button>
              </aside>
              </div>
            </div>

            <div className="flex shrink-0 flex-col gap-2 border-t border-[#ececec] bg-white px-6 py-4">
              <button type="submit" className="h-11 w-full rounded-full bg-black px-8 text-[13px] font-semibold text-white transition-colors hover:bg-[#222]">Add user</button>
              <button type="button" onClick={() => setAddUserOpen(false)} className="h-11 w-full rounded-full border border-[#d8d8d8] bg-white px-6 text-[12px] font-medium text-black hover:bg-[#f2f2f2]">Cancel</button>
            </div>
          </form>
        </div>
      )}
      {creditCardOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[#101512]/35 p-5 backdrop-blur-[2px]">
          <button className="absolute inset-0 cursor-default" onClick={() => setCreditCardOpen(false)} aria-label="Close add credit card" />
          <section className="relative z-10 max-h-[calc(100vh-40px)] w-full max-w-[460px] overflow-y-auto rounded-[8px] bg-white px-5 py-5 shadow-[0_20px_60px_rgba(16,35,27,0.18)]">
            <h2 className="text-[17px] font-medium text-[#171717]">Add credit card</h2>

            <div className="mt-5 space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-[11px] font-medium text-[#292929]">Card Information</span>
                <div className="flex h-10 items-center rounded-[10px] border border-[#ef8c58] bg-white px-3.5 focus-within:border-[1.5px] focus-within:border-[#e76f32]">
                  <input inputMode="numeric" placeholder="1234 1234 1234 1234" className="min-w-0 flex-1 bg-transparent text-[12px] outline-none placeholder:text-[#a5a5a5]" />
                  <div className="ml-2 flex items-center gap-1">
                    <span className="rounded-[2px] border border-[#d8d8d8] bg-white px-1 text-[9px] font-black italic text-[#1434CB]">VISA</span>
                    <span className="flex h-[18px] w-[27px] items-center justify-center rounded-[2px] bg-[#171717]"><span className="size-3 rounded-full bg-[#EB001B]" /><span className="-ml-1.5 size-3 rounded-full bg-[#F79E1B] opacity-90" /></span>
                    <span className="rounded-[2px] bg-[#176BB4] px-1 py-0.5 text-[7px] font-bold leading-[7px] text-white">AM<br />EX</span>
                    <span className="rounded-[2px] border border-[#d8d8d8] bg-white px-1 text-[6px] font-bold text-[#333]">DISCOVER</span>
                  </div>
                </div>
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label>
                  <span className="mb-1.5 block text-[11px] font-medium text-[#292929]">Expiration date</span>
                  <input inputMode="numeric" placeholder="MM/YY" className="h-10 w-full rounded-[10px] border border-[#d7d7d7] bg-white px-3.5 text-[12px] outline-none placeholder:text-[#aaa] focus:border-black" />
                </label>
                <label>
                  <span className="mb-1.5 block text-[11px] font-medium text-[#292929]">Security code</span>
                  <input inputMode="numeric" placeholder="CVC" className="h-10 w-full rounded-[10px] border border-[#d7d7d7] bg-white px-3.5 text-[12px] outline-none placeholder:text-[#aaa] focus:border-black" />
                </label>
              </div>

              <label className="block">
                <span className="mb-1.5 block text-[11px] font-medium text-[#292929]">Cardholder name <span className="text-[#b4473d]">*</span></span>
                <input placeholder="Name on card" className="h-10 w-full rounded-[10px] border border-[#d7d7d7] bg-white px-3.5 text-[12px] outline-none placeholder:text-[#aaa] focus:border-black" />
              </label>

              <div className="pt-1">
                <label className="flex cursor-pointer items-center gap-3 text-[11px] text-[#777]">
                  <input type="checkbox" checked={cardAuthorized} onChange={event => setCardAuthorized(event.target.checked)} className="size-4 accent-black" />
                  I agree
                </label>
                <p className="mt-2 max-w-[390px] text-[11px] leading-[14px] text-[#333]">I authorize ScriptLinkRx to charge this card for approved clinic purchases. A new authorization will be required if the card details change.</p>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-[11px] font-medium text-[#343434]">Sign your authorization:</span>
                  <button type="button" onClick={clearSignature} className="h-6 rounded-[5px] border border-[#d8d8d8] px-5 text-[10px] font-medium text-[#555]">Clear</button>
                </div>
                <div className="h-[90px] overflow-hidden rounded-[10px] border border-[#e0e0e0] bg-[#fafafa]">
                  <canvas
                    ref={signatureCanvasRef}
                    onPointerDown={startSignature}
                    onPointerMove={drawSignature}
                    onPointerUp={stopSignature}
                    onPointerCancel={stopSignature}
                    className="block size-full touch-none cursor-crosshair"
                    aria-label="Draw your authorization signature"
                  />
                </div>
              </div>

              <button disabled={!cardAuthorized || cardSaving} onClick={saveCreditCard} className="mt-1 flex h-[46px] w-full items-center justify-center gap-2 rounded-full bg-[#111] text-[13px] font-semibold text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:bg-[#b9b9b9]">
                {cardSaving && <Loader2 size={15} className="animate-spin" />}
                {cardSaving ? "Saving…" : "Save"}
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

// ─── Single-Patient Cart ──────────────────────────────────────────────────────

function CartModeToolbar({
  cartMode,
  setCartMode,
  onNavigate,
  onCreatePatient,
}: {
  cartMode: CartMode;
  setCartMode: (mode: CartMode) => void;
  onNavigate: (p: Page) => void;
  onCreatePatient?: () => void;
}) {
  function selectMode(mode: CartMode) {
    setCartMode(mode);
    onNavigate(mode === "multi" ? "cart-multi" : "cart-single");
  }

  return (
    <div className="mb-5 flex flex-wrap items-center gap-3">
      <div className="flex gap-1 rounded-[8px] bg-[#f6f4f5] p-1">
        <button
          onClick={() => selectMode("single")}
          className={`h-8 rounded-[6px] px-4 text-[12px] font-medium transition-all ${
            cartMode === "single" ? "bg-white text-[#1a1a1a] shadow-sm" : "text-[#9d9d9d] hover:text-[#1a1a1a]"
          }`}
        >
          Single Patient
        </button>
        <button
          onClick={() => selectMode("multi")}
          className={`flex h-8 items-center gap-1.5 rounded-[6px] px-4 text-[12px] font-medium transition-all ${
            cartMode === "multi" ? "bg-white text-[#1a1a1a] shadow-sm" : "text-[#9d9d9d] hover:text-[#1a1a1a]"
          }`}
        >
          Multi Patients
          <span className="flex size-3.5 items-center justify-center rounded-full bg-[#053c23] text-[9px] font-semibold text-white">i</span>
        </button>
      </div>

      <div className="group flex h-9 w-[220px] items-center gap-2 rounded-[9px] border border-[#cfcfcf] bg-white px-3 transition-all duration-300 ease-out focus-within:w-[310px] focus-within:border-2 focus-within:border-black">
        <Search size={14} strokeWidth={1.8} className="shrink-0 text-[#686868] transition-transform duration-300 group-focus-within:scale-110" />
        <input
          className="min-w-0 flex-1 bg-transparent text-[11px] font-medium text-[#1a1a1a] outline-none placeholder:text-[#686868]"
          placeholder="Search stock or Orders"
        />
        <span className="text-[12px] text-[#686868]">⌘ + F</span>
      </div>

      {onCreatePatient && (
        <button
          onClick={onCreatePatient}
          className="ml-auto inline-flex h-9 items-center gap-1.5 rounded-[7px] bg-[#183229] px-3 text-[12px] font-semibold text-white transition-colors hover:bg-[#244438]"
        >
          <Plus size={14} /> Create Patient
        </button>
      )}
    </div>
  );
}

function SinglePatientCartPage({
  onNavigate,
  cartMode,
  setCartMode,
}: {
  onNavigate: (p: Page) => void;
  cartMode: CartMode;
  setCartMode: (mode: CartMode) => void;
}) {
  const initialPatients = [
    { id: "zeee", name: "Zeee Rabushaj", dob: "06/14/2007", gender: "M", phone: "(646)-389-7766", address: "95 Windermere Drive, Westchester County, NY 10710" },
    { id: "altin", name: "Altin Selimi", dob: "11/12/1994", gender: "M", phone: "(646)-617-9881", address: "95 Windermere Drive, Yonkers, NY 10710" },
    { id: "jane", name: "Jane Doe", dob: "03/22/1990", gender: "F", phone: "5552345678", address: "456 Oak Ave, Los Angeles CA 90001" },
  ];
  const [patients, setPatients] = useState(initialPatients);
  const [patientByPharmacy, setPatientByPharmacy] = useState<Record<string, string>>({});
  const [patientSearch, setPatientSearch] = useState("");
  const [showCreatePatient, setShowCreatePatient] = useState(false);
  const [showPatientPicker, setShowPatientPicker] = useState(false);
  const [activePharmacy, setActivePharmacy] = useState<string | null>(null);
  const [removedItems, setRemovedItems] = useState<Set<number>>(new Set());
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewSubmissionState, setPreviewSubmissionState] = useState<CheckoutSubmissionState>("idle");
  const [paymentMethod, setPaymentMethod] = useState<"patient" | "clinic">("patient");
  const [shipTo, setShipTo] = useState<"patient" | "clinic">("clinic");
  const [prescriptionDetails, setPrescriptionDetails] = useState<Record<number, { days: string; refills: string; directions: string; reason: string }>>({});
  const visiblePatients = patients.filter(patient =>
    `${patient.name} ${patient.phone} ${patient.address}`.toLowerCase().includes(patientSearch.toLowerCase())
  );
  const baseItems = [
    { id: 1, pharmacy: "1st Choice Compounding Pharmacy", name: "Tirzepatide/Pyridoxine (B6)", detail: "20mg/25mg/mL | 1 (0.5mL) Vial", qty: 1, price: 125.43, image: blankVialReference, kind: "vial" },
    { id: 2, pharmacy: "1st Choice Compounding Pharmacy", name: "BD 27G X 1/2 Needle Only", detail: "1 Needle", qty: 1, price: 0, image: null, kind: "supply" },
    { id: 5, pharmacy: "Precision Compounding Pharmacy", name: "Aminoblend", detail: "100mg/50mg/50mg/50mg/100mg/mL | 1 (30mL) Vial", qty: 1, price: 35.99, image: img432, kind: "vial" },
  ];
  const items = baseItems.filter(item => !removedItems.has(item.id));
  const prescriptionItems = items.filter(item => item.kind !== "supply");
  const pharmacyGroups = [
    {
      name: "1st Choice Compounding Pharmacy",
      items: items.filter(item => item.pharmacy === "1st Choice Compounding Pharmacy"),
      shipping: ["UPS Next Day Air (Priority): $30.00", "FedEx Standard Overnight: $30.00"],
    },
    {
      name: "Precision Compounding Pharmacy",
      items: items.filter(item => item.pharmacy === "Precision Compounding Pharmacy"),
      shipping: ["FedEx Overnight Refrigerated: $39.00", "UPS Overnight Refrigerated: $39.00"],
    },
  ].filter(pharmacy => pharmacy.items.length > 0);
  const patientForPharmacy = (pharmacyName: string) =>
    patients.find(patient => patient.id === patientByPharmacy[pharmacyName]) ?? null;
  const activePatient = activePharmacy ? patientForPharmacy(activePharmacy) : null;
  const assignedPharmacyCount = pharmacyGroups.filter(pharmacy => patientForPharmacy(pharmacy.name)).length;
  const allPharmaciesAssigned = pharmacyGroups.length > 0 && assignedPharmacyCount === pharmacyGroups.length;
  const prescriptionsComplete = prescriptionItems.every(item => {
    const details = prescriptionDetails[item.id];
    return patientForPharmacy(item.pharmacy) && details?.days && details?.refills && details?.directions && details?.reason;
  });
  const canPreview = allPharmaciesAssigned && prescriptionsComplete;
  const previewSubmitted = previewSubmissionState === "submitted";
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shipping = pharmacyGroups.reduce((sum, pharmacy) => sum + (Number(pharmacy.shipping[0].match(/\$(\d+(?:\.\d{2})?)/)?.[1] ?? 0)), 0);
  const total = subtotal + shipping;

  function updatePrescriptionDetail(id: number, field: "days" | "refills" | "directions" | "reason", value: string) {
    setPrescriptionDetails(current => ({
      ...current,
      [id]: {
        days: current[id]?.days ?? "",
        refills: current[id]?.refills ?? "",
        directions: current[id]?.directions ?? "",
        reason: current[id]?.reason ?? "",
        [field]: value,
      },
    }));
  }

  function createPatient(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const address = String(form.get("address") ?? "").trim();
    if (!name || !phone || !address) return;

    const patient = {
      id: `patient-${Date.now()}`,
      name,
      dob: String(form.get("dob") ?? ""),
      gender: String(form.get("gender") ?? ""),
      phone,
      address,
    };
    setPatients(current => [...current, patient]);
    if (activePharmacy) {
      setPatientByPharmacy(current => ({ ...current, [activePharmacy]: patient.id }));
    }
    setShowCreatePatient(false);
    setShowPatientPicker(false);
    setActivePharmacy(null);
  }

  function SingleCartThumb({ item }: { item: (typeof items)[number] }) {
    if (item.kind === "supply") {
      return (
        <div className="flex size-12 shrink-0 items-center justify-center rounded-[8px] border border-[#eee] bg-[#f6f4f5]">
          <Syringe size={16} strokeWidth={1.7} className="text-[#183229]" />
        </div>
      );
    }

    return (
      <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-[8px] border border-[#eee] bg-gradient-to-b from-[#f7efe9] to-[#ece5b6]/45">
        {item.image && <img src={item.image} alt="" className="h-12 w-12 object-contain mix-blend-multiply" />}
      </div>
    );
  }

  return (
    <>
      <Header title="Cart" onNavigate={onNavigate} />
      <CartModeToolbar
        cartMode={cartMode}
        setCartMode={setCartMode}
        onNavigate={onNavigate}
        onCreatePatient={() => {
          setActivePharmacy(null);
          setShowPatientPicker(false);
          setShowCreatePatient(true);
        }}
      />

      <div className="grid grid-cols-1 gap-5 2xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="flex min-w-0 flex-col gap-4">
          {pharmacyGroups.map(pharmacy => {
          const cardPatient = patientForPharmacy(pharmacy.name);
          return (
          <section key={pharmacy.name} className="overflow-hidden rounded-[12px] border border-[#e8e3df] bg-white">
            <div className="flex items-center gap-2 border-b border-[#eee8e3] bg-white px-5 py-4">
              <span className="flex size-7 items-center justify-center rounded-[7px] bg-[#eef5f1] text-[#183229]">
                <Building2 size={15} strokeWidth={1.8} />
              </span>
              <h2 className="text-[15px] font-semibold text-[#1a1a1a]">{pharmacy.name} Cart</h2>
            </div>
            <div className="grid grid-cols-[minmax(0,1fr)_240px_110px_106px_110px_40px] items-center border-b border-[#eee8e3] bg-[#fbfaf8] px-5 py-3 max-lg:hidden">
              {["Product", "Patient", "Price", "Qty", "Total", ""].map(h => (
                <span key={h} className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#8c8c8c]">{h}</span>
              ))}
            </div>

            <div className="divide-y divide-[#eee8e3]">
              {pharmacy.items.map(item => (
                <div key={item.id} className="px-5 py-4 transition-colors hover:bg-[var(--app-soft-hover)]">
                  <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,1fr)_240px_110px_106px_110px_40px] lg:items-start">
                    <div className="flex min-w-0 gap-3">
                      <SingleCartThumb item={item} />
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <p className="min-w-0 max-w-full break-all text-[16px] font-semibold leading-tight text-[#1a1a1a]">{item.name}</p>
                          {item.kind === "supply" && <span className="rounded-[5px] bg-[#eef0f2] px-1.5 py-0.5 text-[10px] font-semibold text-[#667085]">Supplies</span>}
                        </div>
                        <p className="mt-1 text-[13px] text-[#6f7782]">{item.detail}</p>
                        {item.kind !== "supply" && <p className="mt-3 text-[11px] font-semibold text-[#8c95a1]">Prescription #{prescriptionItems.findIndex(product => product.id === item.id) + 1}</p>}
                      </div>
                    </div>

                    {cardPatient ? (
                      <div className="self-start">
                        <div className="mb-2 flex items-center justify-between gap-2">
                          <div className="flex min-w-0 items-center gap-2">
                            <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#e7efe9]"><User size={11} strokeWidth={1.8} className="text-[#183229]" /></span>
                            <span className="truncate text-[11px] font-semibold uppercase tracking-[0.1em] text-[#52645c]">{cardPatient.name}</span>
                          </div>
                          <button onClick={() => { setActivePharmacy(pharmacy.name); setShowPatientPicker(true); }} className="text-[10px] font-semibold text-[#183229] hover:underline">Change</button>
                        </div>
                        <div className="rounded-[8px] border border-[#eee8e3] bg-[var(--app-soft-hover)] px-3 py-2.5 text-[11px] font-medium leading-relaxed text-[#6f7782]">
                          <div className="flex items-center gap-1.5"><Phone size={12} strokeWidth={1.8} className="shrink-0 text-[#183229]" /><span>{cardPatient.phone}</span></div>
                          <div className="mt-1 flex items-start gap-1.5"><MapPin size={12} strokeWidth={1.8} className="mt-0.5 shrink-0 text-[#183229]" /><span>{cardPatient.address}</span></div>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => { setActivePharmacy(pharmacy.name); setShowPatientPicker(true); }}
                        className="inline-flex h-7 w-fit items-center gap-1.5 rounded-full border border-dashed border-[#cfd8d3] bg-white px-2.5 text-[11px] font-bold text-[#334155] transition-colors hover:border-[#183229] hover:bg-[#f8faf9]"
                      >
                        <User size={12} strokeWidth={1.8} className="text-[#52645c]" />
                        <span>Choose patient</span>
                      </button>
                    )}

                    <span className="flex h-5 items-center text-[14px] font-semibold text-[#1a1a1a] lg:justify-center">{item.price === 0 ? "Free" : `$${item.price.toFixed(2)}`}</span>
                    <div className="inline-flex h-8 w-fit overflow-hidden rounded-[7px] border border-[#d8dfdc] bg-white lg:mx-auto">
                      <button className="flex w-8 items-center justify-center border-r border-[#e1e5e3] text-[#183229]"><Minus size={13} /></button>
                      <span className="flex w-9 items-center justify-center text-[13px] font-semibold text-[#1a1a1a]">{item.qty}</span>
                      <button className="flex w-8 items-center justify-center border-l border-[#e1e5e3] text-[#183229]"><Plus size={13} /></button>
                    </div>
                    <span className="flex h-5 items-center text-[14px] font-bold text-[#1a1a1a] lg:justify-center">{item.price === 0 ? "Free" : `$${(item.price * item.qty).toFixed(2)}`}</span>
                    <button
                      onClick={() => setRemovedItems(current => new Set([...current, item.id]))}
                      className="flex size-8 items-center justify-center rounded-[7px] bg-[#f6f4f5] text-[#183229] transition-colors hover:bg-[#fbeaea] hover:text-[#d92d20]"
                      aria-label={`Remove ${item.name}`}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  {cardPatient && item.kind !== "supply" && (
                    <div className="mt-4 rounded-[10px] border border-[#e8e3df] bg-white p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-[16px] font-semibold text-[#1a1a1a]">Create Prescription</h3>
                        <span className="rounded-full bg-[#f2f7f4] px-2.5 py-1 text-[11px] font-semibold text-[#52645c]">{cardPatient.name}</span>
                      </div>
                      <div className="mt-3">
                        <label className="mb-1.5 block text-[12px] font-semibold text-[#1a1a1a]">Drug Name + Strength</label>
                        <input value={`${item.name} ${item.detail.split("|")[0].trim()}`} readOnly className="h-10 w-full cursor-not-allowed rounded-[7px] border border-[#d8dfdc] bg-[#f4f5f4] px-3 text-[13px] font-medium text-[#7b8380] outline-none" />
                      </div>
                      <div className="mt-4 grid gap-4 md:grid-cols-[minmax(0,1fr)_200px_240px]">
                        <div>
                          <label className="mb-1.5 block text-[12px] font-semibold text-[#1a1a1a]">Qty Size</label>
                          <input value={item.detail.includes("|") ? item.detail.split("|").slice(1).join("|").trim() : item.detail} readOnly className="h-10 w-full cursor-not-allowed rounded-[7px] border border-[#d8dfdc] bg-[#f4f5f4] px-3 text-[13px] font-medium text-[#7b8380] outline-none" />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-[12px] font-semibold text-[#1a1a1a]">Days Supply</label>
                          <input
                            type="number"
                            min="1"
                            value={prescriptionDetails[item.id]?.days ?? ""}
                            onChange={event => updatePrescriptionDetail(item.id, "days", event.target.value)}
                            placeholder="Days"
                            className="h-10 w-full rounded-[7px] border border-[#d8dfdc] bg-white px-3 text-[13px] font-medium text-[#6f7782] outline-none placeholder:text-[#b9c0bc] focus:border-[#183229]"
                          />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-[12px] font-semibold text-[#1a1a1a]">Authorized Refills</label>
                          <input
                            type="number"
                            min="0"
                            value={prescriptionDetails[item.id]?.refills ?? ""}
                            onChange={event => updatePrescriptionDetail(item.id, "refills", event.target.value)}
                            placeholder="Refills"
                            className="h-10 w-full rounded-[7px] border border-[#d8dfdc] bg-white px-3 text-[13px] font-medium text-[#6f7782] outline-none placeholder:text-[#b9c0bc] focus:border-[#183229]"
                          />
                        </div>
                      </div>
                      <div className="mt-4 grid gap-4 md:grid-cols-2">
                        <div>
                          <label className="mb-1.5 block text-[12px] font-semibold text-[#1a1a1a]">Directions of Use</label>
                          <select
                            value={prescriptionDetails[item.id]?.directions ?? ""}
                            onChange={event => updatePrescriptionDetail(item.id, "directions", event.target.value)}
                            className="h-10 w-full rounded-[7px] border border-[#d8dfdc] bg-white py-0 pl-3 pr-8 text-[13px] font-medium text-[#6f7782] outline-none focus:border-[#183229]"
                          >
                            <option value="" disabled>Select directions</option>
                            <option>Use as directed by prescriber</option>
                            <option>Take once daily as directed.</option>
                            <option>Inject subcutaneously once weekly.</option>
                          </select>
                        </div>
                        <div>
                          <label className="mb-1.5 block text-[12px] font-semibold text-[#1a1a1a]">Reason to Compound*</label>
                          <select
                            value={prescriptionDetails[item.id]?.reason ?? ""}
                            onChange={event => updatePrescriptionDetail(item.id, "reason", event.target.value)}
                            className="h-10 w-full rounded-[7px] border border-[#d8dfdc] bg-white py-0 pl-3 pr-8 text-[13px] font-medium text-[#6f7782] outline-none focus:border-[#183229]"
                          >
                            <option value="" disabled>Select reason below or type out your own</option>
                            <option>Patient requires a dosage form not commercially available.</option>
                            <option>Patient requires excipient avoidance.</option>
                            <option>Prescriber requested custom strength.</option>
                          </select>
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="mb-1.5 block text-[12px] font-semibold text-[#1a1a1a]">Prescription Note (Optional)</label>
                        <textarea placeholder="Enter Prescription Note" className="min-h-[72px] w-full resize-y rounded-[7px] border border-[#d8dfdc] bg-white px-3 py-3 text-[13px] font-medium text-[#6f7782] outline-none placeholder:text-[#b9c0bc] focus:border-[#183229]" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="border-t border-[#eee8e3] bg-white px-5 py-5">
              <h3 className="text-[16px] font-semibold text-[#1a1a1a]">Shipping options</h3>
              <div className="mt-4 flex flex-wrap gap-2 rounded-[10px] bg-[#f6f4f5] p-2">
                {pharmacy.shipping.map((option, index) => (
                  <button key={option} className={`h-9 rounded-[7px] px-3 text-[12px] font-medium ${index === 0 ? "bg-[#183229] text-white" : "bg-white text-[#1a1a1a]"}`}>
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </section>
          );
          })}
        </div>

        <aside className="overflow-hidden rounded-[12px] border border-[#e8e3df] bg-white 2xl:sticky 2xl:top-4">
          <div className="border-b border-[#eee8e3] bg-[#fbfaf8] px-5 py-4">
            <p className="text-[15px] font-semibold text-[#1a1a1a]">Order Total</p>
            <p className="mt-0.5 text-[12px] text-[#6f7782]">{assignedPharmacyCount} of {pharmacyGroups.length} pharmacy carts assigned</p>
          </div>
          <div className="flex flex-col gap-4 px-5 py-4">
            <div className="space-y-2">
              {pharmacyGroups.map(pharmacy => {
                const patient = patientForPharmacy(pharmacy.name);
                return (
                  <button
                    key={pharmacy.name}
                    onClick={() => { setActivePharmacy(pharmacy.name); setShowPatientPicker(true); }}
                    className={`w-full rounded-[9px] border px-3 py-2.5 text-left transition-colors ${patient ? "border-[#eee8e3] bg-[var(--app-soft-hover)]" : "border-dashed border-[#aebbb5] bg-[#f8faf9]"}`}
                  >
                    <p className="truncate text-[10px] font-semibold uppercase tracking-[0.1em] text-[#667085]">{pharmacy.name}</p>
                    {patient ? (
                      <>
                        <p className="mt-1 text-[12px] font-semibold text-[#1a1a1a]">{patient.name} ({patient.gender})</p>
                        <p className="mt-0.5 text-[11px] text-[#6f7782]">{patient.phone}</p>
                      </>
                    ) : (
                      <span className="mt-2 inline-flex h-7 w-fit items-center gap-1.5 rounded-full border border-dashed border-[#cfd8d3] bg-white px-2.5 text-[11px] font-bold text-[#334155]">
                        <User size={12} strokeWidth={1.8} className="text-[#52645c]" />
                        Choose patient
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="border-t border-[#eee8e3] pt-4">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#667085]">Items</p>
              <div className="flex flex-col gap-3">
                {prescriptionItems.map(item => (
                  <div key={item.id} className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1">
                    <p className="truncate text-[12px] font-semibold leading-tight text-[#1a1a1a]">{item.name}</p>
                    <span className="text-right text-[12px] font-semibold text-[#1a1a1a]">${(item.price * item.qty).toFixed(2)}</span>
                    <p className="col-span-2 text-[11px] text-[#6f7782]">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between text-[12px] text-[#6f7782]">
              <span>Items subtotal</span><span className="font-semibold text-[#1a1a1a]">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[12px] text-[#6f7782]">
              <span>Shipping</span><span className="font-semibold text-[#1a1a1a]">${shipping.toFixed(2)}</span>
            </div>
            <div className="flex items-end justify-between border-t border-[#eee8e3] pt-3">
              <span className="text-[14px] font-bold text-[#1a1a1a]">Total</span><span className="text-[19px] font-bold text-[#183229]">${total.toFixed(2)}</span>
            </div>
            <button disabled={!canPreview} onClick={() => { setPreviewSubmissionState("idle"); setPreviewOpen(true); }} className="h-11 w-full rounded-[8px] bg-[#183229] text-[13px] font-semibold text-white transition-colors hover:bg-[#244438] disabled:cursor-not-allowed disabled:bg-[#c8cecb]">
              {!allPharmaciesAssigned
                ? `Assign ${pharmacyGroups.length - assignedPharmacyCount} more ${pharmacyGroups.length - assignedPharmacyCount === 1 ? "patient" : "patients"}`
                : prescriptionsComplete ? "Continue: Preview" : "Complete required fields"}
            </button>
          </div>
        </aside>
      </div>

      {previewOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-[#111]/35 backdrop-blur-[3px]">
          <button className="absolute inset-0 cursor-default" onClick={() => { setPreviewOpen(false); setPreviewSubmissionState("idle"); }} aria-label="Close preview" />
          <aside className="relative h-full w-full max-w-[500px] overflow-auto border-l border-[#e8e3df] bg-[#FAFAFA] shadow-[-24px_0_70px_rgba(24,24,24,0.16)]">
            <header className="sticky top-0 z-10 border-b border-[#eee8e3] bg-white/95 px-5 pb-5 pt-6 backdrop-blur">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8c95a1]">Checkout</p>
                  <h2 className="mt-1 text-[23px] font-semibold tracking-[-0.03em] text-[#171717]">Review and submit</h2>
                  <p className="mt-1 text-[12px] leading-[18px] text-[#6f7782]">Confirm patients, prescriptions, payment, and shipping before submitting.</p>
                </div>
                <button onClick={() => { setPreviewOpen(false); setPreviewSubmissionState("idle"); }} className="flex size-8 items-center justify-center rounded-full text-[#777] transition-colors hover:bg-[#f5f3ef] hover:text-[#111]" aria-label="Close preview">
                  <X size={17} strokeWidth={1.8} />
                </button>
              </div>
            </header>

            <div className="space-y-4 px-5 pb-6 pt-5">
            <section className="rounded-[18px] bg-white p-4 shadow-[0_18px_50px_rgba(24,24,24,0.07)]">
              <h3 className="text-[14px] font-semibold text-[#1a1a1a]">Order for</h3>
              <div className="mt-3 flex flex-col gap-3">
                {pharmacyGroups.map(pharmacy => {
                  const patient = patientForPharmacy(pharmacy.name);
                  if (!patient) return null;
                  return (
                    <div key={pharmacy.name} className="rounded-[13px] bg-[#fbfaf8] px-4 py-3">
                      <p className="text-[13px] font-semibold text-[#1a1a1a]">{patient.name} ({patient.gender})</p>
                      <p className="mt-1 text-[12px] text-[#6f7782]">{patient.phone}</p>
                      <p className="mt-1 text-[12px] leading-relaxed text-[#6f7782]">{patient.address}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="rounded-[18px] bg-white p-4 shadow-[0_18px_50px_rgba(24,24,24,0.07)]">
              <h3 className="text-[14px] font-semibold text-[#1a1a1a]">Prescriptions</h3>
              <div className="mt-3 flex flex-col gap-3">
                {prescriptionItems.map(item => {
                  const patient = patientForPharmacy(item.pharmacy);
                  return (
                    <div key={item.id} className="rounded-[13px] bg-[#fbfaf8] px-4 py-4">
                      <div className="flex justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-[13px] font-semibold text-[#1a1a1a]">{item.name}</p>
                          <p className="mt-1 text-[12px] text-[#6f7782]">{item.detail}</p>
                          <p className="mt-1 text-[11px] text-[#8c95a1]">{patient ? patient.name : item.pharmacy}</p>
                        </div>
                        <p className="shrink-0 text-[13px] font-semibold text-[#1a1a1a]">${(item.price * item.qty).toFixed(2)}</p>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-[#6f7782]">
                        <span>Days Supply: <strong className="text-[#1a1a1a]">1</strong></span>
                        <span>Refills: <strong className="text-[#1a1a1a]">1</strong></span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="rounded-[18px] bg-white p-4 shadow-[0_18px_50px_rgba(24,24,24,0.07)]">
              {previewSubmitted && (
                <div className="px-1 py-1">
                  <div className="text-left">
                    <p className="text-[13px] font-semibold text-[#1a1a1a]">Order summary</p>
                    <p className="mt-0.5 text-[10px] text-[#8c8c8c]">Payment, delivery, and totals</p>
                  </div>
                  <div className="my-4 border-t border-dashed border-[#cfcfcf]" />
                  <div className="space-y-2.5 text-[12px]">
                    <div className="flex justify-between gap-5"><span className="text-[#737373]">Payment</span><span className="font-medium text-[#202020]">{paymentMethod === "patient" ? "Pay by Patient" : "Pay by Clinic"}</span></div>
                    <div className="flex justify-between gap-5"><span className="text-[#737373]">Shipping to</span><span className="font-medium text-[#202020]">{shipTo === "patient" ? "Patient" : "Clinic"}</span></div>
                  </div>
                  <div className="my-4 border-t border-dashed border-[#cfcfcf]" />
                  <div className="space-y-2.5 text-[12px]">
                    <div className="flex justify-between"><span className="text-[#737373]">Subtotal</span><span className="text-[#202020]">${subtotal.toFixed(2)}</span></div>
                    <div className="flex justify-between"><span className="text-[#737373]">Shipping &amp; handling</span><span className="text-[#202020]">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span></div>
                  </div>
                  <div className="my-4 border-t border-dashed border-[#cfcfcf]" />
                  <div className="flex items-center justify-between text-[15px] font-semibold text-[#171717]">
                    <span>Total</span><span>${total.toFixed(2)}</span>
                  </div>
                </div>
              )}
              {!previewSubmitted && reviewVariant === "v1" && (
                <div className="space-y-6">
                  <div>
                    <div className="mb-3">
                      <p className="text-[14px] font-semibold text-[#171717]">Who will pay for this order?</p>
                      <p className="mt-1 text-[10px] text-[#7d838d]">Choose a payment method</p>
                    </div>
                    <div className="space-y-2">
                      <button type="button" onClick={() => setPaymentMethod("patient")} className={`flex min-h-[58px] w-full items-start gap-3 rounded-[9px] border bg-white px-3.5 py-3 text-left transition-all ${paymentMethod === "patient" ? "border-[#2563eb] ring-1 ring-[#2563eb]" : "border-[#dfe2e6] hover:border-[#aeb9cf]"}`}>
                        <span className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border ${paymentMethod === "patient" ? "border-[#2563eb]" : "border-[#c4c8cf]"}`}>{paymentMethod === "patient" && <span className="size-2 rounded-full bg-[#2563eb]" />}</span>
                        <span><span className="block text-[11px] font-semibold text-[#202124]">Pay by Patient</span><span className="mt-1 block text-[9px] text-[#7d838d]">The patient receives a secure payment request.</span></span>
                      </button>
                      <button type="button" onClick={() => setPaymentMethod("clinic")} className={`flex min-h-[58px] w-full items-start gap-3 rounded-[9px] border bg-white px-3.5 py-3 text-left transition-all ${paymentMethod === "clinic" ? "border-[#2563eb] ring-1 ring-[#2563eb]" : "border-[#dfe2e6] hover:border-[#aeb9cf]"}`}>
                        <span className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border ${paymentMethod === "clinic" ? "border-[#2563eb]" : "border-[#c4c8cf]"}`}>{paymentMethod === "clinic" && <span className="size-2 rounded-full bg-[#2563eb]" />}</span>
                        <span><span className="block text-[11px] font-semibold text-[#202124]">Pay by Clinic</span><span className="mt-1 block text-[9px] text-[#7d838d]">Charge the clinic's saved payment method.</span></span>
                      </button>
                    </div>
                    <button type="button" className="mt-2 text-[10px] font-medium text-[#2563eb] hover:text-[#1d4ed8]">+ Add credit card</button>
                  </div>
                  <div>
                    <div className="mb-3">
                      <p className="text-[14px] font-semibold text-[#171717]">Where should we ship it?</p>
                      <p className="mt-1 text-[10px] text-[#7d838d]">Choose a delivery destination</p>
                    </div>
                    <div className="space-y-2">
                      <button type="button" onClick={() => setShipTo("patient")} className={`flex min-h-[58px] w-full items-start gap-3 rounded-[9px] border bg-white px-3.5 py-3 text-left transition-all ${shipTo === "patient" ? "border-[#2563eb] ring-1 ring-[#2563eb]" : "border-[#dfe2e6] hover:border-[#aeb9cf]"}`}>
                        <span className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border ${shipTo === "patient" ? "border-[#2563eb]" : "border-[#c4c8cf]"}`}>{shipTo === "patient" && <span className="size-2 rounded-full bg-[#2563eb]" />}</span>
                        <span><span className="block text-[11px] font-semibold text-[#202124]">Ship to Patient</span><span className="mt-1 block text-[9px] text-[#7d838d]">Deliver directly to the patient's address.</span></span>
                      </button>
                      <button type="button" onClick={() => setShipTo("clinic")} className={`flex min-h-[58px] w-full items-start gap-3 rounded-[9px] border bg-white px-3.5 py-3 text-left transition-all ${shipTo === "clinic" ? "border-[#2563eb] ring-1 ring-[#2563eb]" : "border-[#dfe2e6] hover:border-[#aeb9cf]"}`}>
                        <span className={`mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border ${shipTo === "clinic" ? "border-[#2563eb]" : "border-[#c4c8cf]"}`}>{shipTo === "clinic" && <span className="size-2 rounded-full bg-[#2563eb]" />}</span>
                        <span><span className="block text-[11px] font-semibold text-[#202124]">Ship to Clinic</span><span className="mt-1 block text-[9px] text-[#7d838d]">Send the complete order to the clinic.</span></span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {!previewSubmitted && reviewVariant === "v2" && (
                <div>
                  <div className="mb-4"><h3 className="text-[16px] font-medium text-[#181818]">Order preferences</h3><p className="mt-1 text-[10px] text-[#7a818c]">Confirm who pays and where the order will be delivered.</p></div>
                  <div className="overflow-hidden rounded-[12px] border border-[#e1e5eb] bg-[#f8fafc]">
                    <div className="p-4">
                      <div className="flex items-center justify-between gap-3"><div className="flex items-center gap-2"><span className="flex size-7 items-center justify-center rounded-[8px] bg-white text-[#2563eb] shadow-sm"><CreditCard size={14} /></span><div><p className="text-[12px] font-medium text-[#202020]">Payment</p><p className="text-[9px] text-[#818894]">Choose the payer</p></div></div><button type="button" className="text-[10px] font-medium text-[#2563eb] hover:underline">Add credit card</button></div>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <button type="button" onClick={() => setPaymentMethod("patient")} className={`flex h-10 items-center justify-between rounded-[8px] border px-3 text-[11px] font-medium transition-all ${paymentMethod === "patient" ? "border-[#7da2ff] bg-white text-[#1d4ed8] shadow-[0_3px_10px_rgba(37,99,235,0.10)]" : "border-transparent bg-[#eef1f5] text-[#68717d] hover:bg-white"}`}><span className="flex items-center gap-2"><User size={13} />Patient</span>{paymentMethod === "patient" && <CheckCircle2 size={14} />}</button>
                        <button type="button" onClick={() => setPaymentMethod("clinic")} className={`flex h-10 items-center justify-between rounded-[8px] border px-3 text-[11px] font-medium transition-all ${paymentMethod === "clinic" ? "border-[#7da2ff] bg-white text-[#1d4ed8] shadow-[0_3px_10px_rgba(37,99,235,0.10)]" : "border-transparent bg-[#eef1f5] text-[#68717d] hover:bg-white"}`}><span className="flex items-center gap-2"><Building2 size={13} />Clinic</span>{paymentMethod === "clinic" && <CheckCircle2 size={14} />}</button>
                      </div>
                    </div>
                    <div className="border-t border-[#e1e5eb] p-4">
                      <div className="flex items-center gap-2"><span className="flex size-7 items-center justify-center rounded-[8px] bg-white text-[#2563eb] shadow-sm"><Truck size={14} /></span><div><p className="text-[12px] font-medium text-[#202020]">Delivery</p><p className="text-[9px] text-[#818894]">Choose the destination</p></div></div>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <button type="button" onClick={() => setShipTo("patient")} className={`flex h-10 items-center justify-between rounded-[8px] border px-3 text-[11px] font-medium transition-all ${shipTo === "patient" ? "border-[#7da2ff] bg-white text-[#1d4ed8] shadow-[0_3px_10px_rgba(37,99,235,0.10)]" : "border-transparent bg-[#eef1f5] text-[#68717d] hover:bg-white"}`}><span className="flex items-center gap-2"><User size={13} />Patient</span>{shipTo === "patient" && <CheckCircle2 size={14} />}</button>
                        <button type="button" onClick={() => setShipTo("clinic")} className={`flex h-10 items-center justify-between rounded-[8px] border px-3 text-[11px] font-medium transition-all ${shipTo === "clinic" ? "border-[#7da2ff] bg-white text-[#1d4ed8] shadow-[0_3px_10px_rgba(37,99,235,0.10)]" : "border-transparent bg-[#eef1f5] text-[#68717d] hover:bg-white"}`}><span className="flex items-center gap-2"><Building2 size={13} />Clinic</span>{shipTo === "clinic" && <CheckCircle2 size={14} />}</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className={previewSubmitted || reviewVariant !== "current" ? "hidden" : ""}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#667085]">Payment</p>
                <p className="mt-1 text-[13px] text-[#1a1a1a]">{previewSubmitted ? "Payment method used for this order" : "Select the payment method for the prescription"}</p>
                {previewSubmitted ? (
                  <div className="mt-3 inline-flex h-9 items-center gap-2 rounded-full border border-[#dce8df] bg-[#f7faf8] px-3 text-[12px] font-semibold text-[#183229]">
                    {paymentMethod === "patient" ? "Pay by Patient" : "Pay by Clinic"} {paymentMethod === "patient" ? <User size={13} /> : <Building2 size={13} />}
                  </div>
                ) : (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      onClick={() => setPaymentMethod("patient")}
                      className={`inline-flex h-9 items-center gap-2 rounded-full border px-3 text-[12px] font-semibold transition-colors ${
                        paymentMethod === "patient"
                          ? "border-[#2563EB] bg-[#EFF6FF] text-[#1D4ED8]"
                          : "border-[#d8dfdc] bg-white text-[#6f7782] hover:border-[#183229]/45"
                      }`}
                    >
                      Pay by Patient <User size={13} />
                    </button>
                    <button
                      onClick={() => setPaymentMethod("clinic")}
                      className={`inline-flex h-9 items-center gap-2 rounded-full border px-3 text-[12px] font-semibold transition-colors ${
                        paymentMethod === "clinic"
                          ? "border-[#2563EB] bg-[#EFF6FF] text-[#1D4ED8]"
                          : "border-[#d8dfdc] bg-white text-[#6f7782] hover:border-[#183229]/45"
                      }`}
                    >
                      Pay by Clinic <Building2 size={13} />
                    </button>
                    <button className="inline-flex h-9 items-center gap-1.5 rounded-full border border-dashed border-[#2563EB] bg-white px-3 text-[12px] font-semibold text-[#2563EB] transition-colors hover:bg-[#EFF6FF]">
                      <Plus size={13} /> Credit Card
                    </button>
                  </div>
                )}
              </div>

              <div className={previewSubmitted || reviewVariant !== "current" ? "hidden" : "mt-5 border-t border-[#eee8e3] pt-5"}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#667085]">Shipping</p>
                <p className="mt-1 text-[13px] text-[#1a1a1a]">{previewSubmitted ? "Shipping destination for this order" : "Choose where to ship the prescription"}</p>
                {previewSubmitted ? (
                  <div className="mt-3 inline-flex h-9 items-center gap-2 rounded-full border border-[#dce8df] bg-[#f7faf8] px-3 text-[12px] font-semibold text-[#183229]">
                    {shipTo === "patient" ? "Ship to Patient" : "Ship to Clinic"} {shipTo === "patient" ? <User size={13} /> : <Building2 size={13} />}
                  </div>
                ) : (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      onClick={() => setShipTo("patient")}
                      className={`inline-flex h-9 items-center gap-2 rounded-full border px-3 text-[12px] font-semibold transition-colors ${
                        shipTo === "patient"
                          ? "border-[#2563EB] bg-[#EFF6FF] text-[#1D4ED8]"
                          : "border-[#d8dfdc] bg-white text-[#6f7782] hover:border-[#183229]/45"
                      }`}
                    >
                      Ship to Patient <User size={13} />
                    </button>
                    <button
                      onClick={() => setShipTo("clinic")}
                      className={`inline-flex h-9 items-center gap-2 rounded-full border px-3 text-[12px] font-semibold transition-colors ${
                        shipTo === "clinic"
                          ? "border-[#2563EB] bg-[#EFF6FF] text-[#1D4ED8]"
                          : "border-[#d8dfdc] bg-white text-[#6f7782] hover:border-[#183229]/45"
                      }`}
                    >
                      Ship to Clinic <Building2 size={13} />
                    </button>
                  </div>
                )}
              </div>
            </section>

            <section className={previewSubmitted ? "hidden" : "rounded-[18px] bg-white p-4 shadow-[0_18px_50px_rgba(24,24,24,0.07)]"}>
              <h3 className="text-[14px] font-semibold text-[#1a1a1a]">Summary</h3>
              <div className="mt-4 space-y-3 text-[14px]">
                <div className="flex justify-between text-[#6f7782]"><span>Items subtotal</span><span className="font-semibold text-[#1a1a1a]">${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-[#6f7782]"><span>Shipping</span><span className="font-semibold text-[#1a1a1a]">${shipping.toFixed(2)}</span></div>
                <div className="flex justify-between border-t border-[#eee8e3] pt-4 font-bold text-[#1a1a1a]"><span>Total</span><span className="text-[#183229]">${total.toFixed(2)}</span></div>
              </div>
            </section>

            <div className="sticky bottom-0 -mx-5 mt-2 border-t border-[#eee8e3] bg-white/95 px-5 py-4 backdrop-blur">
              <CheckoutSubmissionFooter
                state={previewSubmissionState}
                submitLabel="Submit for Approval"
                onEdit={() => { setPreviewOpen(false); setPreviewSubmissionState("idle"); }}
                onSubmit={() => {
                  setPreviewSubmissionState("submitting");
                  window.setTimeout(() => setPreviewSubmissionState("submitted"), 2000);
                }}
                onGoToOrders={() => onNavigate("orders")}
              />
            </div>
            </div>
          </aside>
        </div>
      )}

      {(showPatientPicker || showCreatePatient) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 p-4" role="dialog" aria-modal="true" aria-label={showCreatePatient ? "Create patient" : "Choose patient"}>
          <div className="w-full max-w-[620px] overflow-hidden rounded-[10px] border border-[#e8e3df] bg-white">
            <div className="flex items-center justify-between border-b border-[#eee8e3] px-5 py-4">
              <div>
                <h2 className="text-[16px] font-semibold text-[#1a1a1a]">{showCreatePatient ? "Create Patient" : "Choose Patient"}</h2>
                <p className="mt-0.5 text-[11px] text-[#6f7782]">{showCreatePatient ? (activePharmacy ? `Add and assign to ${activePharmacy}.` : "Add a patient to your patient list.") : `Assign a patient to ${activePharmacy ?? "this pharmacy cart"}.`}</p>
              </div>
              <button
                onClick={() => {
                  setShowPatientPicker(false);
                  setShowCreatePatient(false);
                }}
                className="flex size-8 items-center justify-center rounded-[7px] text-[#6f7782] hover:bg-[#f6f4f5]"
                aria-label="Close"
              >
                <XCircle size={17} />
              </button>
            </div>

            {showCreatePatient ? (
              <form onSubmit={createPatient} className="p-5">
                <div className="grid gap-3 sm:grid-cols-2">
                  <input name="name" required placeholder="Full name" className="h-10 rounded-[7px] border border-[#d8dfdc] bg-white px-3 text-[12px] outline-none placeholder:text-[#9da4ae] focus:border-[#183229]" />
                  <input name="phone" required placeholder="Phone number" className="h-10 rounded-[7px] border border-[#d8dfdc] bg-white px-3 text-[12px] outline-none placeholder:text-[#9da4ae] focus:border-[#183229]" />
                  <input name="dob" type="date" aria-label="Date of birth" className="h-10 rounded-[7px] border border-[#d8dfdc] bg-white px-3 text-[12px] text-[#6f7782] outline-none focus:border-[#183229]" />
                  <select name="gender" defaultValue="" aria-label="Gender" className="h-10 rounded-[7px] border border-[#d8dfdc] bg-white px-3 text-[12px] text-[#6f7782] outline-none focus:border-[#183229]">
                    <option value="" disabled>Gender</option>
                    <option value="F">Female</option>
                    <option value="M">Male</option>
                    <option value="X">Other</option>
                  </select>
                  <input name="address" required placeholder="Full shipping address" className="h-10 rounded-[7px] border border-[#d8dfdc] bg-white px-3 text-[12px] outline-none placeholder:text-[#9da4ae] focus:border-[#183229] sm:col-span-2" />
                </div>
                <div className="mt-5 flex justify-end gap-2">
                  <button type="button" onClick={() => setShowCreatePatient(false)} className="h-9 rounded-[7px] border border-[#d8dfdc] bg-white px-3 text-[12px] font-semibold text-[#183229]">Cancel</button>
                  <button type="submit" className="h-9 rounded-[7px] bg-[#183229] px-4 text-[12px] font-semibold text-white">Save and select</button>
                </div>
              </form>
            ) : (
              <div className="p-5">
                <div className="flex h-10 items-center gap-2 rounded-[8px] border border-[#d8dfdc] bg-white px-3">
                  <Search size={14} strokeWidth={1.8} className="shrink-0 text-[#6f7782]" />
                  <input autoFocus value={patientSearch} onChange={event => setPatientSearch(event.target.value)} className="min-w-0 flex-1 bg-transparent text-[12px] outline-none placeholder:text-[#9da4ae]" placeholder="Search patients" />
                </div>
                <div className="mt-3 max-h-[320px] space-y-2 overflow-y-auto pr-1">
                  {visiblePatients.map(patient => {
                    const isSelected = activePatient?.id === patient.id;
                    return (
                      <button
                        key={patient.id}
                        onClick={() => {
                          if (activePharmacy) {
                            setPatientByPharmacy(current => ({ ...current, [activePharmacy]: patient.id }));
                          }
                          setShowPatientPicker(false);
                          setPatientSearch("");
                          setActivePharmacy(null);
                        }}
                        className={`flex w-full items-center justify-between gap-4 rounded-[8px] border px-3 py-3 text-left transition-colors ${isSelected ? "border-[#183229] bg-[#f2f7f4]" : "border-[#e8e3df] hover:border-[#183229]/35"}`}
                      >
                        <div className="min-w-0">
                          <p className="text-[12px] font-semibold text-[#1a1a1a]">{patient.name} ({patient.gender})</p>
                          <p className="mt-1 text-[11px] text-[#6f7782]">{patient.phone} · {patient.address}</p>
                        </div>
                        {isSelected && <CheckCircle2 size={15} className="shrink-0 text-[#183229]" />}
                      </button>
                    );
                  })}
                  {visiblePatients.length === 0 && <p className="py-8 text-center text-[12px] text-[#6f7782]">No patients found.</p>}
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-[#eee8e3] pt-4">
                  <p className="text-[11px] text-[#6f7782]">Patient not listed?</p>
                  <button
                    onClick={() => {
                      setShowPatientPicker(false);
                      setShowCreatePatient(true);
                    }}
                    className="inline-flex h-9 items-center gap-1.5 rounded-[7px] bg-[#183229] px-3 text-[12px] font-semibold text-white"
                  >
                    <Plus size={14} /> Create Patient
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// ─── Multi-Patient Cart ───────────────────────────────────────────────────────

const MULTI_CART_DATA = {
  pharmacy: "Optimal Balance Pharmacy",
  patients: [
    {
      name: "Altin Selimi",
      dob: "05/01/1986",
      phone: "(646)-389-7766",
      email: "altin.selimi@example.com",
      identification: "NY:23444244343 (State-Issued ID)",
      address: "2823 Middletown Road\nThe Bronx, NY 10461",
      items: [
        { id: 1, name: "Tirzepatide/Pyridoxine (B6)", detail: "20mg/25mg/mL | 1 (0.5mL) Vial", qty: 7, price: 125.43, badge: null, kind: "vial", pharmacy: "Optimal Balance Pharmacy" },
        { id: 2, name: "BD 27G X 1/2 Needle Only", detail: "1 Needle", qty: 1, price: 0, badge: "Supplies", kind: "supply" },
      ],
    },
    {
      name: "Jane Doe",
      dob: "03/22/1988",
      phone: "(646)-617-1880",
      email: "jane.doe@example.com",
      identification: "NY:98221443819 (State-Issued ID)",
      address: "95 Windermere Drive\nWestchester County, NY 10710",
      items: [
        { id: 3, name: "Tirzepatide/Pyridoxine (B6)", detail: "20mg/25mg/mL | 1 (0.5mL) Vial", qty: 1, price: 125.43, badge: null, kind: "vial", pharmacy: "Optimal Balance Pharmacy" },
        { id: 4, name: "BD 27G X 1/2 Needle Only", detail: "1 Needle", qty: 1, price: 0, badge: "Supplies", kind: "supply" },
      ],
    },
    {
      name: "Emily Krause",
      dob: "08/14/1991",
      phone: "(646)-389-4455",
      email: "emily.krause@example.com",
      identification: "NY:77120549331 (State-Issued ID)",
      address: "2823 Middletown Road\nBronx, NY 10461",
      items: [
        { id: 5, name: "NAD+ Injection", detail: "20mg/25mg/mL | 1 (0.5mL) Vial", qty: 1, price: 84.50, badge: null, kind: "vial", pharmacy: "DCA Pharmacy", image: imgNadInjection },
      ],
    },
  ],
  shipping: [
    { label: "UPS Next Day Air (Priority)", price: 35.00 },
    { label: "FedEx Standard Overnight", price: 35.00 },
  ],
};

const DEFAULT_CART_DATA = {
  ...MULTI_CART_DATA,
  pharmacy: "DCA Pharmacy",
  patients: MULTI_CART_DATA.patients.filter(patient =>
    patient.items.some(item => item.pharmacy === "DCA Pharmacy")
  ),
};

// Shipping capability is configured per pharmacy. Pharmacies without multi-patient
// shipping create one shipment (and one shipping charge) for each patient.
const PHARMACY_MULTI_PATIENT_SHIPPING: Record<string, boolean> = {
  "1st Choice Compounding Pharmacy": true,
  "Optimal Balance Pharmacy": true,
  "DCA Pharmacy": false,
  "Thesis Pharmacy": true,
  "Rush Pharmacy TX": false,
  "Spring Creek Pharmacy": false,
};

function supportsMultiPatientShipping(pharmacy: string) {
  return PHARMACY_MULTI_PATIENT_SHIPPING[pharmacy] ?? false;
}

type MultiCartItem = {
  id: number;
  name: string;
  detail: string;
  qty: number;
  price: number;
  badge: string | null;
  kind: "vial" | "supply";
  image?: string;
  pharmacy?: string;
  catalogType?: "503A" | "503B";
  vialPalette?: VialPalette;
};

function cartCatalogType(item: MultiCartItem) {
  return item.catalogType;
}

function is503BCartItem(item: MultiCartItem) {
  return item.catalogType === "503B";
}

function CartItemImage({ item }: { item: MultiCartItem }) {
  if (item.kind === "supply") {
    return (
      <div className="w-12 h-12 rounded-[8px] bg-[#f6f4f5] border border-[#eee] flex items-center justify-center shrink-0">
        <div className="w-7 h-7 rounded-full bg-white border border-[#e8e8e8] flex items-center justify-center">
          <Syringe size={15} strokeWidth={1.7} className="text-[#183229]" />
        </div>
      </div>
    );
  }

  const [strength, size] = item.detail.split("|").map(value => value.trim());
  const palette = item.vialPalette ?? ALL_CARDS.find(card => card.name === item.name)?.vialPalette;
  let mockup: ReactNode = null;
  if (item.image === blankVialReference || item.image === blankLyophilizedVialReference) {
    mockup = <ManualVialPreview name={item.name} strength={strength} size={size ?? "Multi-Dose Vial"} palette={palette} baseImage={item.image} compact flatLabel />;
  } else if (item.image === blankNasalSprayReference || item.image === blankTopicalDropperReference) {
    mockup = <ManualNasalSprayPreview name={item.name} strength={strength} palette={palette} baseImage={item.image} variant={item.image === blankTopicalDropperReference ? "topical" : "nasal"} compact flatLabel />;
  } else if (item.image === blankCapsuleBottleReference) {
    mockup = <ManualCapsulePreview name={item.name} strength={strength} palette={palette} compact flatLabel />;
  } else if (item.image === blankPatchPackageReference) {
    mockup = <ManualPatchPreview name={item.name} strength={strength} compact />;
  }

  return (
    <div className="relative flex h-14 w-12 shrink-0 items-center justify-center overflow-hidden bg-white">
      {mockup ? <div className="absolute h-[245px] w-[184px] shrink-0 scale-[0.23]">{mockup}</div> : <img src={item.image ?? imgAminoQuad} alt={item.name} className="h-14 w-14 object-contain mix-blend-multiply" />}
    </div>
  );
}

function MultiPatientCartPage({
  cartScope: scope = "standard",
  onNavigate,
  cartMode,
  setCartMode,
  selectedPatientIds,
  cartEntries,
  extraVariants,
  onUpdateEntryQuantity,
}: {
  cartScope?: CartScope;
  onNavigate: (p: Page) => void;
  cartMode: CartMode;
  setCartMode: (mode: CartMode) => void;
  selectedPatientIds: number[];
  cartEntries: PatientCartEntry[];
  extraVariants: boolean;
  onUpdateEntryQuantity: (id: number, quantity: number) => void;
}) {
  const cartData = useMemo(() => cartEntries.length > 0
    ? {
        ...MULTI_CART_DATA,
        pharmacy: [...new Set(cartEntries.map(entry => entry.pharmacy))].length === 1 ? cartEntries[0].pharmacy : "Multiple Pharmacies",
        patients: [...new Set(cartEntries.filter(entry => entry.qty > 0).map(entry => entry.patientId))].map(patientId => {
          const patient = patientId === null ? { firstName: "Clinic", lastName: "order", birthDate: "", primaryPhone: "", address1: "", address2: "", city: "", state: "", zip: "" } : PATIENTS[patientId] ?? PATIENTS[0];
          const entries = cartEntries.filter(entry => entry.patientId === patientId && entry.qty > 0);
          const addressLines = patientId === null ? [PENDING_APPROVALS_CLINIC.address] : [patient.address1, patient.address2, `${patient.city}, ${patient.state} ${patient.zip}`].filter(Boolean);
          return {
            name: `${patient.firstName} ${patient.lastName}`,
            dob: patient.birthDate,
            phone: patient.primaryPhone,
            email: `${patient.firstName}.${patient.lastName}`.replace(/[^a-z0-9.]/gi, "").toLowerCase() + "@example.com",
            identification: `${patient.state}:23444244343 (State-Issued ID)`,
            address: addressLines.join("\n"),
            items: entries.map(entry => ({
              id: entry.id,
              name: entry.product.name,
              detail: `${entry.strength} | ${entry.size}`,
              qty: entry.qty,
              price: entry.unitPrice,
              badge: null,
              kind: "vial" as const,
              image: entry.product.img,
              vialPalette: entry.product.vialPalette,
              pharmacy: entry.pharmacy,
              catalogType: entry.catalogType,
            })),
          };
        }),
      }
    : { ...MULTI_CART_DATA, patients: [] }, [cartEntries]);
  const [quantities, setQuantities] = useState<Record<number, number>>(() => {
    const init: Record<number, number> = {};
    cartData.patients.forEach(p => p.items.forEach(i => { init[i.id] = i.qty; }));
    return init;
  });
  const [selectedShippingByPharmacy, setSelectedShippingByPharmacy] = useState<Record<string, number>>({});
  const [removed, setRemoved] = useState<Set<number>>(new Set());
  const [showAllSummaryItems, setShowAllSummaryItems] = useState(false);
  const [cartCardVariant, setCartCardVariant] = useState<1 | 2 | 3 | 4 | 5 | 6>(4);
  const [expandedSupplies, setExpandedSupplies] = useState<Set<number>>(new Set([1]));
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewSubmissionState, setPreviewSubmissionState] = useState<CheckoutSubmissionState>("idle");
  const [reviewVariant, setReviewVariant] = useState<"current" | "v1" | "v2">("v1");
  const [paymentMethod, setPaymentMethod] = useState<"patient" | "clinic">(scope === "503B" ? "clinic" : "patient");
  const [shipTo, setShipTo] = useState<"patient" | "clinic">("clinic");
  const [voucherCode, setVoucherCode] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState<string | null>(null);
  const [prescriptionDetails, setPrescriptionDetails] = useState<Record<number, { days: string; refills: string; directions: string; reason: string }>>({});
  const [prescriptionValidationAttempted, setPrescriptionValidationAttempted] = useState(false);
  const [addedPrescriptionIds, setAddedPrescriptionIds] = useState<Set<number>>(new Set());
  const [addingPrescriptionId, setAddingPrescriptionId] = useState<number | null>(null);
  const [editingPrescription, setEditingPrescription] = useState<{ id: number; original: { days: string; refills: string; directions: string; reason: string } } | null>(null);
  const [sigBuilderItemId, setSigBuilderItemId] = useState<number | null>(null);
  const [sigBuilder, setSigBuilder] = useState({ action: "Inject", route: "intramuscularly", dose: "", unit: "units", frequency: "", timing: "Any time", sites: [] as string[] });
  const [sigCustomDirections, setSigCustomDirections] = useState<string | null>(null);
  const [openPrescriptionNoteIds, setOpenPrescriptionNoteIds] = useState<Set<number>>(new Set());
  const [expandedPrescriptionIds, setExpandedPrescriptionIds] = useState<Set<number>>(() => {
    const firstPrescription = cartData.patients.flatMap(patient => patient.items).find(item => item.kind !== "supply");
    return new Set(firstPrescription ? [firstPrescription.id] : []);
  });

  useEffect(() => {
    setQuantities(prev => {
      const next = { ...prev };
      cartData.patients.forEach(patient => patient.items.forEach(item => {
        next[item.id] = item.qty;
      }));
      return next;
    });
  }, [cartData]);

  useEffect(() => {
    if (!extraVariants) setCartCardVariant(4);
  }, [extraVariants]);

  const pharmacyNames = [...new Set(cartData.patients.flatMap(patient =>
    patient.items.filter(item => item.kind !== "supply").map(item => item.pharmacy ?? cartData.pharmacy)
  ))];
  const shipping = pharmacyNames.reduce((sum, pharmacy) => {
    const shippingIndex = selectedShippingByPharmacy[pharmacy] ?? 0;
    const patientCount = new Set(cartData.patients
      .filter(patient => patient.items.some(item => item.kind !== "supply" && !removed.has(item.id) && (item.pharmacy ?? cartData.pharmacy) === pharmacy))
      .map(patient => patient.name)).size;
    const shipmentCount = supportsMultiPatientShipping(pharmacy) ? 1 : Math.max(1, patientCount);
    return sum + cartData.shipping[shippingIndex].price * shipmentCount;
  }, 0);
  const subtotal = cartData.patients.flatMap(p => p.items)
    .filter(i => !removed.has(i.id))
    .reduce((sum, i) => sum + i.price * (quantities[i.id] ?? 1), 0);
  const voucherDiscount = appliedVoucher ? Math.min(subtotal * 0.1, 50) : 0;
  const total = subtotal + shipping - voucherDiscount;
  const previewSubmitted = previewSubmissionState === "submitted";

  function applyVoucher() {
    const normalizedCode = voucherCode.trim().toUpperCase();
    if (!normalizedCode) return;
    setVoucherCode(normalizedCode);
    setAppliedVoucher(normalizedCode);
  }

  function removeVoucher() {
    setAppliedVoucher(null);
    setVoucherCode("");
  }

  function adjust(id: number, delta: number) {
    const nextQuantity = Math.max(1, (quantities[id] ?? 1) + delta);
    setQuantities(prev => ({ ...prev, [id]: nextQuantity }));
    onUpdateEntryQuantity(id, nextQuantity);
  }

  function removeItem(id: number) {
    setRemoved(current => new Set([...current, id]));
    onUpdateEntryQuantity(id, 0);
  }

  function toggleSupplies(id: number) {
    setExpandedSupplies(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function togglePrescriptionNote(id: number) {
    setOpenPrescriptionNoteIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function updatePrescriptionDetail(id: number, field: "days" | "refills" | "directions" | "reason", value: string) {
    setPrescriptionDetails(current => ({
      ...current,
      [id]: {
        days: current[id]?.days ?? "1",
        refills: current[id]?.refills ?? "1",
        directions: current[id]?.directions ?? "Inject (2.5 mg) subcutaneously once weekly.",
        reason: current[id]?.reason ?? "",
        [field]: value,
      },
    }));
  }

  function selectDirections(id: number, value: string) {
    if (value === "__sig_builder__") {
      setSigCustomDirections(null);
      setSigBuilderItemId(id);
      return;
    }
    updatePrescriptionDetail(id, "directions", value);
  }

  function applySigBuilder() {
    const finalDirections = sigCustomDirections ?? (sigBuilder.dose.trim() && sigBuilder.frequency ? buildSigText() : "");
    if (sigBuilderItemId === null || !finalDirections.trim()) return;
    updatePrescriptionDetail(sigBuilderItemId, "directions", finalDirections.trim());
    setSigBuilderItemId(null);
    setSigCustomDirections(null);
    setSigBuilder({ action: "Inject", route: "intramuscularly", dose: "", unit: "units", frequency: "", timing: "Any time", sites: [] });
  }

  function buildSigText() {
    const timing = sigBuilder.timing === "Any time" ? "" : ` ${sigBuilder.timing.toLowerCase()}`;
    const sites = sigBuilder.sites.length ? ` in the ${sigBuilder.sites.join(" or ").toLowerCase()}` : "";
    return `${sigBuilder.action} ${sigBuilder.dose.trim() || "[dose]"} ${sigBuilder.unit} ${sigBuilder.route} ${sigBuilder.frequency}${timing}${sites}.`;
  }

  function toggleSigSite(site: string) {
    setSigBuilder(current => ({ ...current, sites: current.sites.includes(site) ? current.sites.filter(value => value !== site) : [...current.sites, site] }));
  }

  const resolvedSigDirections = sigCustomDirections ?? (sigBuilder.dose.trim() && sigBuilder.frequency ? buildSigText() : "");

  function prescriptionFieldClass(value: string) {
    const complete = value.trim().length > 0;
    const state = complete
      ? "border-[#78a98f] bg-[#f6fbf8] focus:border-[#315a47]"
      : "border-[#e39a91] bg-[#fff8f7] focus:border-[#c94f43]";
    return `h-10 w-full rounded-[8px] border px-3 text-[13px] font-medium text-[#4f5b56] outline-none transition-colors ${state}`;
  }

  function PrescriptionFieldStatus({ value }: { value: string }) {
    const complete = value.trim().length > 0;
    return (
      <span className={`ml-2 inline-flex items-center gap-1 text-[9px] font-semibold ${complete ? "text-[#397052]" : "text-[#c94f43]"}`}>
        {complete ? <CheckCircle2 size={11} /> : <AlertCircle size={11} />}
        {complete ? "Complete" : "Required"}
      </span>
    );
  }

  const allItems = cartData.patients.flatMap(p => p.items).filter(i => !removed.has(i.id));
  const summaryItemPreviewCount = 3;
  const hiddenSummaryItemCount = Math.max(0, allItems.length - summaryItemPreviewCount);
  const visibleSummaryItems = showAllSummaryItems ? allItems : allItems.slice(0, summaryItemPreviewCount);
  const cartRows = cartData.patients.flatMap(patient =>
    patient.items
      .filter(item => item.kind !== "supply")
      .map(item => ({ patient, item }))
  ).filter(({ item }) => !removed.has(item.id));
  const activeSigItem = cartRows.find(({ item }) => item.id === sigBuilderItemId)?.item;
  const cartRowsWithNumbers = cartRows.map((row, index) => ({ ...row, prescriptionNumber: index + 1 }));
  const prescriptionCount = cartData.patients.length;
  const prescriptionsComplete = cartRows.every(({ item }) => {
    if (is503BCartItem(item)) return true;
    const details = prescriptionDetails[item.id];
    return cartCardVariant === 3
      ? Boolean(details?.days.trim() && details?.refills.trim() && details?.directions.trim())
      : Boolean(details?.days.trim() && details?.refills.trim() && details?.directions.trim() && details?.reason.trim());
  });

  function isPrescriptionComplete(id: number) {
    if (cartRows.some(({ item }) => item.id === id && is503BCartItem(item))) return true;
    const details = prescriptionDetails[id];
    return cartCardVariant === 3
      ? Boolean(details?.days.trim() && details?.refills.trim() && details?.directions.trim())
      : Boolean(details?.days.trim() && details?.refills.trim() && details?.directions.trim() && details?.reason.trim());
  }

  function addPrescriptionOrder(id: number) {
    const isEditing = editingPrescription?.id === id;
    const hasChanges = isEditing && JSON.stringify(prescriptionDetails[id]) !== JSON.stringify(editingPrescription.original);
    if (!isPrescriptionComplete(id) || addingPrescriptionId !== null || (isEditing && !hasChanges)) return;
    setAddingPrescriptionId(id);
    window.setTimeout(() => {
      setAddedPrescriptionIds(current => new Set([...current, id]));
      setExpandedPrescriptionIds(current => {
        const next = new Set(current);
        next.delete(id);
        const currentIndex = cartRows.findIndex(row => row.item.id === id);
        const nextPrescription = cartRows[currentIndex + 1];
        if (nextPrescription) next.add(nextPrescription.item.id);
        return next;
      });
      setAddingPrescriptionId(null);
      setEditingPrescription(null);
    }, 300);
  }

  function startEditingPrescription(id: number) {
    const original = prescriptionDetails[id] ?? { days: "", refills: "", directions: "", reason: "" };
    setEditingPrescription({ id, original: { ...original } });
    setAddedPrescriptionIds(current => { const next = new Set(current); next.delete(id); return next; });
    setExpandedPrescriptionIds(new Set([id]));
  }

  function cancelPrescriptionEdit(id: number) {
    if (editingPrescription?.id === id) {
      setPrescriptionDetails(current => ({ ...current, [id]: { ...editingPrescription.original } }));
      setAddedPrescriptionIds(current => new Set([...current, id]));
      setEditingPrescription(null);
    }
    setExpandedPrescriptionIds(current => { const next = new Set(current); next.delete(id); return next; });
  }

  function requiredFieldClass(value: string | undefined) {
    if (!value?.trim()) {
      return "border-[#7F9EE3] bg-white focus:border-[#7F9EE3]";
    }
    return "border-[#EAE8E1] bg-white focus:border-[#183229]";
  }

  function renderInlineSigBuilder() {
    return (
      <section className="mt-4 overflow-hidden rounded-[10px] border border-[#dbe5f7] bg-[#FAFAFA]">
        <div className="flex items-start justify-between gap-4 border-b border-[#e9e9e9] px-5 py-4">
          <div><h3 className="text-[14px] font-semibold text-[#171717]">SIG Builder</h3><p className="mt-0.5 text-[10px] text-[#667085]">Build clear, standardized directions for this prescription.</p></div>
          <button type="button" onClick={() => setSigBuilderItemId(null)} className="text-[#777] hover:text-black" aria-label="Close SIG Builder"><X size={17} /></button>
        </div>
        <div className="grid lg:grid-cols-[minmax(0,1fr)_300px]">
          <div className="grid gap-4 px-5 py-4 sm:grid-cols-2">
            <label><span className="mb-1.5 block text-[11px] font-semibold text-[#171717]">Action</span><select value={sigBuilder.action} onChange={event => setSigBuilder(current => ({ ...current, action: event.target.value }))} className="h-[34px] w-full rounded-[8px] border border-[#EAE8E1] bg-white px-3 text-[12px] outline-none focus:border-[#183229]"><option>Inject</option><option>Take</option><option>Apply</option><option>Administer</option></select></label>
            <label><span className="mb-1.5 block text-[11px] font-semibold text-[#171717]">Route</span><select value={sigBuilder.route} onChange={event => setSigBuilder(current => ({ ...current, route: event.target.value }))} className="h-[34px] w-full rounded-[8px] border border-[#EAE8E1] bg-white px-3 text-[12px] outline-none focus:border-[#183229]"><option value="intramuscularly">Intramuscular (IM)</option><option value="subcutaneously">Subcutaneous (SQ)</option><option value="intravenously">Intravenous (IV)</option><option value="orally">Oral</option></select></label>
            <label><span className="mb-1.5 block text-[11px] font-semibold text-[#171717]">Dose <span className="text-[#b44b42]">*</span></span><input autoFocus value={sigBuilder.dose} onChange={event => setSigBuilder(current => ({ ...current, dose: event.target.value }))} placeholder="Amount" className={"h-[34px] w-full rounded-[8px] border px-3 text-[12px] outline-none " + requiredFieldClass(sigBuilder.dose)} /></label>
            <label><span className="mb-1.5 block text-[11px] font-semibold text-[#171717]">Unit</span><select value={sigBuilder.unit} onChange={event => setSigBuilder(current => ({ ...current, unit: event.target.value }))} className="h-[34px] w-full rounded-[8px] border border-[#EAE8E1] bg-white px-3 text-[12px] outline-none focus:border-[#183229]"><option>units</option><option>mg</option><option>mL</option><option>mcg</option><option>tablet(s)</option></select></label>
            <label><span className="mb-1.5 block text-[11px] font-semibold text-[#171717]">Frequency <span className="text-[#b44b42]">*</span></span><select value={sigBuilder.frequency} onChange={event => setSigBuilder(current => ({ ...current, frequency: event.target.value }))} className={"h-[34px] w-full rounded-[8px] border px-3 text-[12px] outline-none " + requiredFieldClass(sigBuilder.frequency)}><option value="" disabled>How often</option><option>once daily</option><option>twice daily</option><option>once weekly</option><option>twice weekly</option><option>as directed</option></select></label>
            <label><span className="mb-1.5 block text-[11px] font-semibold text-[#171717]">Timing <span className="font-normal text-[#8a8a8a]">optional</span></span><select value={sigBuilder.timing} onChange={event => setSigBuilder(current => ({ ...current, timing: event.target.value }))} className="h-[34px] w-full rounded-[8px] border border-[#EAE8E1] bg-white px-3 text-[12px] outline-none focus:border-[#183229]"><option>Any time</option><option>In the morning</option><option>In the evening</option><option>At bedtime</option><option>Before meals</option><option>After meals</option></select></label>
            <div className="sm:col-span-2"><p className="mb-2 text-[11px] font-semibold text-[#171717]">Injection sites <span className="font-normal text-[#8a8a8a]">optional</span></p><div className="flex flex-wrap gap-2">{["Abdomen", "Thigh", "Upper Arm", "Buttock"].map(site => <button key={site} type="button" onClick={() => toggleSigSite(site)} className={`h-8 rounded-full border px-3 text-[10px] font-medium transition-colors ${sigBuilder.sites.includes(site) ? "border-black bg-black text-white" : "border-[#EAE8E1] bg-white text-[#344054] hover:bg-[#f1f1f1]"}`}>{site}</button>)}</div></div>
          </div>
          <aside className="border-t border-white/80 bg-[radial-gradient(circle_at_100%_0%,rgba(147,197,253,0.42),transparent_48%),linear-gradient(145deg,#f8fbff_0%,#eaf2ff_100%)] px-5 py-4 lg:border-l lg:border-t-0">
            <div className="flex items-center justify-between gap-3"><div className="flex items-center gap-2.5"><span className="flex size-8 items-center justify-center rounded-full bg-white/80 text-[#2563EB]"><CheckCircle2 size={16} /></span><div><p className="text-[12px] font-semibold text-[#172554]">Live directions</p><p className="text-[9px] text-[#64748b]">Updates as you complete the fields</p></div></div><span className="rounded-full bg-white/70 px-2.5 py-1 text-[9px] font-semibold text-[#2563EB]">SIG</span></div>
            {sigCustomDirections === null ? <div className="mt-3 min-h-[120px] rounded-[10px] border border-white/90 bg-white/70 px-4 py-3 text-[12px] leading-5 text-[#202938]">{resolvedSigDirections || <span className="text-[#8491a6]">Directions will appear here.</span>}</div> : <textarea autoFocus value={sigCustomDirections} onChange={event => setSigCustomDirections(event.target.value)} placeholder="Type custom directions" className="mt-3 min-h-[120px] w-full resize-none rounded-[10px] border border-[#7F9EE3] bg-white/80 px-4 py-3 text-[12px] leading-5 outline-none" />}
            <button type="button" onClick={() => setSigCustomDirections(current => current === null ? resolvedSigDirections : null)} className="mt-2 text-[10px] font-semibold text-[#171717] hover:underline">{sigCustomDirections === null ? "+ Edit directions" : "− Use generated directions"}</button>
          </aside>
        </div>
        <div className="flex justify-end gap-3 border-t border-[#e9e9e9] px-5 py-3"><button type="button" onClick={() => setSigBuilderItemId(null)} className="text-[11px] font-medium text-[#202020]">Cancel</button><button type="button" disabled={!resolvedSigDirections.trim()} onClick={applySigBuilder} className="h-8 rounded-full bg-black px-4 text-[11px] font-medium text-white disabled:cursor-not-allowed disabled:bg-[#dfdfdc] disabled:text-[#92928f]">Save directions</button></div>
      </section>
    );
  }

  function handleCheckout() {
    if (prescriptionsComplete) {
      setPreviewSubmissionState("idle");
      setPreviewOpen(true);
      return;
    }
    setPrescriptionValidationAttempted(true);
    setExpandedPrescriptionIds(new Set(cartRows.filter(({ item }) => !isPrescriptionComplete(item.id)).map(({ item }) => item.id)));
  }

  const cartCardThemes = {
    1: { label: "Current", shell: "#fffaf7", border: "#fffaf7", item: "#ffffff" },
    2: { label: "Silver", shell: "#FBFBFB", border: "#FBFBFB", item: "#ffffff" },
    3: { label: "Boom", shell: "#ffffff", border: "#E8E8E8", item: "#ffffff" },
    4: { label: "Compact", shell: "#FAFAFA", border: "#FAFAFA", item: "#ffffff" },
    5: { label: "Zee", shell: "#FAFAFA", border: "#FAFAFA", item: "#ffffff" },
    6: { label: "Simple", shell: "#FAFAFA", border: "#FAFAFA", item: "#ffffff" },
  } as const;
  const activeCardTheme = cartCardThemes[cartCardVariant];
  const hasBoomOpenForm = cartCardVariant === 3 && cartRows.some(({ item }) => !is503BCartItem(item) && expandedPrescriptionIds.has(item.id) && !addedPrescriptionIds.has(item.id));
  const hasCompactOpenForm = cartCardVariant === 4 && cartRows.some(({ item }) => !is503BCartItem(item) && expandedPrescriptionIds.has(item.id) && !addedPrescriptionIds.has(item.id));
  const hasZeeOpenForm = cartCardVariant === 5 && cartRows.some(({ item }) => !is503BCartItem(item) && expandedPrescriptionIds.has(item.id) && !addedPrescriptionIds.has(item.id));
  const hasSimpleOpenForm = cartCardVariant === 6 && cartRows.some(({ item }) => !is503BCartItem(item) && expandedPrescriptionIds.has(item.id) && !addedPrescriptionIds.has(item.id));
  const hasFocusedOpenForm = hasBoomOpenForm || hasCompactOpenForm || hasZeeOpenForm || hasSimpleOpenForm;

  if (cartRows.length === 0) return (
    <>
      <Header title={scope === "503B" ? "503B Cart" : "Cart"} onNavigate={onNavigate} />
      <div className="rounded-xl border border-[#e8e3df] bg-white px-6 py-16 text-center">
        <ShoppingCart size={32} className="mx-auto text-[#9ca9a2]" />
        <h2 className="mt-4 text-lg font-semibold">{scope === "503B" ? "Your 503B cart is empty" : "Your cart is empty"}</h2>
        <p className="mt-2 text-sm text-[#6f7782]">{scope === "503B" ? "Add items from the 503B catalog." : "Add items from the catalog or 503A catalog."}</p>
        <button onClick={() => onNavigate(scope === "503B" ? "catalog-503b" : "products")} className="mt-6 rounded-full bg-[#183229] px-6 py-3 text-sm font-medium text-white">Browse catalog</button>
      </div>
    </>
  );

  return (
    <>
      <Header title={scope === "503B" ? "503B Cart" : "Cart"} onNavigate={onNavigate} />

      <div className="max-w-[1400px]">
        {extraVariants && <div className="mb-5 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#777]">Card style</span>
          {([1, 4, 3, 5, 6] as const).map(variant => (
            <button
              key={variant}
              onClick={() => setCartCardVariant(variant)}
              className={`h-8 rounded-full px-3 text-[11px] font-semibold transition-colors ${cartCardVariant === variant ? "bg-[#111] text-white" : "border border-[#ddd] bg-white text-[#555] hover:border-[#999]"}`}
            >
              {variant === 1 ? "1. Current" : variant === 4 ? "2. Adnan Suggestion" : variant === 3 ? "3. Boom" : variant === 5 ? "4. Zee version" : "5. Simple"}
            </button>
          ))}
        </div>}
        <div className="grid grid-cols-1 items-start gap-10 xl:grid-cols-[minmax(0,1fr)_290px]">
          <section className="min-w-0">
            {cartRowsWithNumbers.map(({ patient, item }, rowIndex) => {
              const pharmacy = item.pharmacy ?? cartData.pharmacy;
              const pharmacyCatalogTypes = (["503A", "503B"] as const).filter(type =>
                cartRowsWithNumbers.some(row => (row.item.pharmacy ?? cartData.pharmacy) === pharmacy && cartCatalogType(row.item) === type)
              );
              const isFirstInPharmacy = rowIndex === 0 || (cartRowsWithNumbers[rowIndex - 1].item.pharmacy ?? cartData.pharmacy) !== pharmacy;
              const isLastInPharmacy = rowIndex === cartRowsWithNumbers.length - 1 || (cartRowsWithNumbers[rowIndex + 1].item.pharmacy ?? cartData.pharmacy) !== pharmacy;
              const includedSupplies = patient.items.filter(supply => supply.kind === "supply" && !removed.has(supply.id));
              const isExpanded = !is503BCartItem(item) && expandedPrescriptionIds.has(item.id);
              const showBoomCompletedCard = cartCardVariant === 3 && addedPrescriptionIds.has(item.id) && !isExpanded;
              const isBoomDimmed = cartCardVariant === 3 && hasBoomOpenForm && !(isExpanded && !addedPrescriptionIds.has(item.id));
              const isAdnanStyleVariant = cartCardVariant === 4 || cartCardVariant === 5 || cartCardVariant === 6;
              const isCompactActive = isAdnanStyleVariant && isExpanded && !addedPrescriptionIds.has(item.id);
              const isCompactDimmed = isAdnanStyleVariant && (hasCompactOpenForm || hasZeeOpenForm || hasSimpleOpenForm) && !isCompactActive;
              const isCompactCompleted = isAdnanStyleVariant && addedPrescriptionIds.has(item.id) && !isExpanded;
              const details = prescriptionDetails[item.id];
              const selectedShipping = selectedShippingByPharmacy[pharmacy] ?? 0;
              const pharmacyPatientCount = new Set(cartRowsWithNumbers.filter(row => (row.item.pharmacy ?? cartData.pharmacy) === pharmacy).map(row => row.patient.name)).size;
              const multiPatientShipping = supportsMultiPatientShipping(pharmacy);
              const shipmentCount = multiPatientShipping ? 1 : Math.max(1, pharmacyPatientCount);
              const pharmacyShippingTotal = cartData.shipping[selectedShipping].price * shipmentCount;
              const isActivePharmacy = hasFocusedOpenForm && cartRowsWithNumbers.some(row => (row.item.pharmacy ?? cartData.pharmacy) === pharmacy && expandedPrescriptionIds.has(row.item.id) && !addedPrescriptionIds.has(row.item.id));

              return (
                <Fragment key={item.id}>
                  {isFirstInPharmacy && (
                    <div style={{ backgroundColor: activeCardTheme.shell, borderColor: activeCardTheme.border }} className={(rowIndex === 0 ? "" : "mt-8 ") + `transition-opacity ${hasFocusedOpenForm && !isActivePharmacy ? "opacity-55 hover:opacity-85" : ""} ${cartCardVariant === 3 ? "border-b px-0 pb-3 pt-1" : "rounded-t-[10px] px-5 pb-4 pt-5"}`}>
                      <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className={cartCardVariant === 3 ? "text-[13px] font-medium text-[#171717]" : "text-[16px] font-medium text-[#171717]"}>{pharmacy} Cart</h2>
                          {pharmacyCatalogTypes.map(type => (
                            <span key={type} className="shrink-0 rounded-full bg-[#eef3ff] px-2 py-1 text-[10px] font-semibold leading-none text-[#2563EB]">
                              {type}
                            </span>
                          ))}

                        </div>
                        <div className="flex items-center gap-3">
                          <select
                            value={selectedShipping}
                            onChange={event => setSelectedShippingByPharmacy(current => ({ ...current, [pharmacy]: Number(event.target.value) }))}
                            aria-label={`Shipping method for ${pharmacy}`}
                            className="h-9 rounded-[9px] border border-[#dedede] bg-white px-3 text-[11px] font-medium text-[#262626] outline-none transition-colors focus:border-[#183229]"
                          >
                            {cartData.shipping.map((option, index) => <option key={option.label} value={index}>{option.label}</option>)}
                          </select>
                          <span className="min-w-[50px] text-right text-[12px] font-semibold text-[#202020]">{"$" + pharmacyShippingTotal.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <article
                    style={{ backgroundColor: activeCardTheme.item, borderColor: activeCardTheme.border }}
                    onClick={event => {
                      if (!(cartCardVariant === 3 || cartCardVariant === 4 || cartCardVariant === 5 || cartCardVariant === 6) || !hasFocusedOpenForm || isCompactActive) return;
                      if ((event.target as HTMLElement).closest("button, input, select, textarea, a")) return;
                      setExpandedPrescriptionIds(new Set([item.id]));
                    }}
                    className={`relative transition-opacity ${hasFocusedOpenForm && !isCompactActive ? "cursor-pointer" : ""} ${
                      cartCardVariant === 3
                        ? `${isExpanded ? "border-l-2 border-l-[#183229] bg-[#FCFCFC] px-5" : "px-3"} border-b py-7 ${isBoomDimmed ? "opacity-45 hover:opacity-75" : ""}`
                        : isAdnanStyleVariant
                          ? `border-x-[12px] border-b-[12px] px-5 py-5 ${isCompactActive ? "z-10 rounded-[12px] shadow-[0_18px_42px_rgba(24,50,41,0.12)] ring-1 ring-[#DDE8E2]" : ""} ${isCompactDimmed ? "opacity-55 hover:opacity-85" : ""}`
                          : "border-x-[12px] border-b-[12px] px-5 py-5"
                    }`}
                  >
                    {cartCardVariant === 5 && !showBoomCompletedCard && (
                      <div className="mb-4 hidden grid-cols-[minmax(270px,1fr)_210px_112px_90px] gap-5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8c8c88] lg:grid">
                        <span>Product Details</span>
                        <span>Patient</span>
                        <span className="text-center">Qty</span>
                        <span className="text-right">Price</span>
                      </div>
                    )}

                    {!showBoomCompletedCard && <div className={cartCardVariant === 3 ? "grid grid-cols-1 gap-5 lg:grid-cols-[minmax(250px,1fr)_210px_90px_66px] lg:items-start" : "grid grid-cols-1 gap-5 lg:grid-cols-[minmax(270px,1fr)_210px_112px_90px] lg:items-start"}>
                      <div className="flex min-w-0 gap-4">
                        <CartItemImage item={item} />
                        <div className="min-w-0">
                          <div className="flex min-w-0 items-center gap-2">
                            <p className="whitespace-nowrap text-[14px] font-semibold leading-tight text-[#191919]">{item.name}</p>
                          </div>
                          <p className="mt-1 whitespace-nowrap text-[13px] text-[#858585]">{item.detail}</p>
                          {addedPrescriptionIds.has(item.id) && <p className="mt-1.5 whitespace-nowrap text-[12px] font-medium text-[#2f7a43]">Prescription complete</p>}
                          {includedSupplies.length > 0 && (
                            <button onClick={() => toggleSupplies(item.id)} className="mt-2 inline-flex whitespace-nowrap items-center gap-1 text-[12px] text-[#666] underline underline-offset-4">
                              Included Supplies
                              <ChevronDown size={13} className={expandedSupplies.has(item.id) ? "rotate-180 transition-transform" : "transition-transform"} />
                            </button>
                          )}
                        </div>
                      </div>

                      <div className={cartCardVariant === 3 ? "text-[10px] leading-[14px] text-[#333]" : "text-[12px] leading-[18px] text-[#555]"}>
                        <p className={cartCardVariant === 3 ? "text-[12px] font-medium text-[#202020]" : "text-[14px] font-medium text-[#292929]"}>{patient.name}</p>
                        <p className={cartCardVariant === 3 ? "mt-1 whitespace-pre-line" : "mt-1 whitespace-pre-line"}>{patient.address}</p>
                        <p>{patient.phone}</p>
                      </div>

                      <div className={cartCardVariant === 3 ? "inline-flex h-8 w-fit items-center overflow-hidden rounded-full border border-[#e2e2e2] bg-white" : "inline-flex h-10 w-fit items-center overflow-hidden rounded-full border border-[#e2e2e2] bg-white"}>
                        {(quantities[item.id] ?? 1) === 1 ? (
                          <button onClick={() => removeItem(item.id)} className={cartCardVariant === 3 ? "flex h-8 w-8 items-center justify-center text-[#202020] hover:bg-[#f7f7f7]" : "flex h-10 w-10 items-center justify-center text-[#202020] hover:bg-[#f7f7f7]"} aria-label={"Remove " + item.name}><Trash2 size={cartCardVariant === 3 ? 12 : 15} /></button>
                        ) : (
                          <button onClick={() => adjust(item.id, -1)} className={cartCardVariant === 3 ? "flex h-8 w-8 items-center justify-center text-[#202020] hover:bg-[#f7f7f7]" : "flex h-10 w-10 items-center justify-center text-[#202020] hover:bg-[#f7f7f7]"} aria-label={"Decrease " + item.name}><Minus size={cartCardVariant === 3 ? 12 : 16} /></button>
                        )}
                        <span className={cartCardVariant === 3 ? "flex h-8 w-6 items-center justify-center text-[11px] font-medium" : "flex h-10 w-8 items-center justify-center text-[13px] font-medium"}>{quantities[item.id] ?? 1}</span>
                        <button onClick={() => adjust(item.id, 1)} className={cartCardVariant === 3 ? "flex h-8 w-8 items-center justify-center text-[#202020] hover:bg-[#f7f7f7]" : "flex h-10 w-10 items-center justify-center text-[#202020] hover:bg-[#f7f7f7]"} aria-label={"Increase " + item.name}><Plus size={cartCardVariant === 3 ? 12 : 16} /></button>
                      </div>

                      <p className={cartCardVariant === 3 ? "pt-1 text-right text-[12px] font-medium text-[#171717]" : "pt-2 text-right text-[14px] font-medium text-[#171717]"}>{item.price === 0 ? "Free" : "$" + (item.price * (quantities[item.id] ?? 1)).toFixed(2)}</p>
                    </div>}

                    {!showBoomCompletedCard && expandedSupplies.has(item.id) && includedSupplies.length > 0 && (
                      <div className="ml-16 mt-3 space-y-2 border-l border-[#dedede] pl-4">
                        {includedSupplies.map(supply => <p key={supply.id} className="text-[11px] text-[#777]">{supply.name} · {supply.detail}</p>)}
                      </div>
                    )}

                    {!is503BCartItem(item) && (
                    <div className={showBoomCompletedCard ? "mt-0" : "mt-5"}>
                      {!isExpanded ? (
                        addedPrescriptionIds.has(item.id) ? (
                          cartCardVariant === 3 ? (
                            <div className="rounded-[6px] border border-[#E1E3E6] bg-white">
                              <div className="grid grid-cols-1 gap-5 px-5 py-5 md:grid-cols-[minmax(210px,1fr)_minmax(210px,1fr)_150px_54px] md:items-start">
                                <div className="flex min-w-0 gap-3">
                                  <CartItemImage item={item} />
                                  <div className="min-w-0">
                                    <p className="whitespace-nowrap text-[13px] font-semibold leading-tight text-[#1f2933]">{item.name}</p>
                                    <p className="mt-1 whitespace-nowrap text-[11px] text-[#69727d]">{item.detail}</p>
                                    {includedSupplies.length > 0 && (
                                      <button onClick={() => toggleSupplies(item.id)} className="mt-2 text-[12px] text-[#666] underline underline-offset-4">
                                        Included Supplies
                                      </button>
                                    )}
                                  </div>
                                </div>
                                <div className="text-[11px] leading-[16px] text-[#69727d]">
                                  <p className="text-[13px] font-medium text-[#1f2933]">{patient.name}</p>
                                  <p className="mt-1 whitespace-pre-line">{patient.address}</p>
                                  <p>{patient.phone}</p>
                                </div>
                                <div className="flex items-center justify-end gap-3 pt-7">
                                  <p className="text-[13px] font-semibold text-[#171717]">{item.price === 0 ? "Free" : "$" + item.price.toFixed(2)}</p>
                                  <span className="text-[12px] font-semibold text-[#171717]">×</span>
                                  <div className="inline-flex h-8 w-fit items-center overflow-hidden rounded-[5px] bg-[#EEF0F2]">
                                    <button onClick={() => adjust(item.id, -1)} className="flex h-8 w-8 items-center justify-center text-[#333] hover:bg-[#e2e4e7]" aria-label={"Decrease " + item.name}><Minus size={12} /></button>
                                    <span className="flex h-8 w-8 items-center justify-center text-[11px] font-medium">{quantities[item.id] ?? 1}</span>
                                    <button onClick={() => adjust(item.id, 1)} className="flex h-8 w-8 items-center justify-center text-[#333] hover:bg-[#e2e4e7]" aria-label={"Increase " + item.name}><Plus size={12} /></button>
                                  </div>
                                </div>
                                <div className="flex items-start justify-end gap-3">
                                  <button onClick={() => setExpandedPrescriptionIds(current => cartCardVariant === 3 || cartCardVariant === 4 || cartCardVariant === 5 || cartCardVariant === 6 ? new Set([item.id]) : new Set([...current, item.id]))} className="text-[#183229] hover:text-black" aria-label="Edit prescription">
                                    <Edit3 size={14} />
                                  </button>
                                  <button onClick={() => setAddedPrescriptionIds(current => { const next = new Set(current); next.delete(item.id); return next; })} className="text-[#183229] hover:text-black" aria-label="Remove prescription">
                                    <X size={15} />
                                  </button>
                                </div>
                              </div>
                              <button onClick={() => setExpandedPrescriptionIds(current => cartCardVariant === 3 || cartCardVariant === 4 || cartCardVariant === 5 || cartCardVariant === 6 ? new Set([item.id]) : new Set([...current, item.id]))} className="flex w-full items-center gap-1 border-t border-[#ECECEC] px-3 py-2 text-left text-[11px] font-medium text-[#1f2933] hover:bg-[#FAFAFA]">
                                <span className="text-[9px]">▶</span>
                                Show details
                              </button>
                            </div>
                          ) : (
                            isCompactCompleted ? (
                              <div className="ml-16 flex flex-wrap items-center">
                                <button onClick={() => startEditingPrescription(item.id)} className="inline-flex h-8 items-center text-[11px] font-medium text-[#202020] underline decoration-[#8a8a8a] underline-offset-4 transition-colors hover:text-black hover:decoration-black">
                                  Show details
                                </button>
                              </div>
                            ) : (
                              <div className="ml-16 flex items-center gap-4">
                                <button onClick={() => setExpandedPrescriptionIds(current => cartCardVariant === 3 || cartCardVariant === 4 || cartCardVariant === 5 || cartCardVariant === 6 ? new Set([item.id]) : new Set([...current, item.id]))} className="text-[12px] font-medium text-[#202020] hover:underline hover:underline-offset-4">
                                  Show Details
                                </button>
                                <span className="inline-flex items-center gap-2 rounded-[8px] bg-[#eaf4ed] px-3 py-2 text-[11px] font-semibold text-[#315f49]">
                                  <CheckCircle2 size={14} />
                                  Prescription complete
                                </span>
                              </div>
                            )
                          )
                        ) : (
                          <button
                            onClick={() => setExpandedPrescriptionIds(current => cartCardVariant === 3 || cartCardVariant === 4 || cartCardVariant === 5 || cartCardVariant === 6 ? new Set([item.id]) : new Set([...current, item.id]))}
                            className={cartCardVariant === 3 ? "ml-16 inline-flex items-center gap-2 rounded-full bg-[#f3f3f3] px-3 py-2 text-[11px] font-semibold text-[#202020] transition-colors hover:bg-[#e8e8e8]" : cartCardVariant === 4 ? "ml-16 inline-flex items-center gap-2 rounded-full bg-[#f5f5f3] px-3 py-2 text-[11px] font-semibold text-[#4d4d4d] transition-colors hover:bg-[#ececea] hover:text-[#202020]" : "ml-16 inline-flex items-center gap-2 rounded-full bg-[#f0f0ee] px-3 py-2 text-[11px] font-semibold text-[#202020] transition-colors hover:bg-[#e5e5e2]"}
                          >
                            <Plus size={14} />
                            Add a prescription
                          </button>
                        )
                      ) : addedPrescriptionIds.has(item.id) ? (
                        <div>
                          <div className="ml-16 flex items-center justify-between gap-3">
                            <button onClick={() => setExpandedPrescriptionIds(current => { const next = new Set(current); next.delete(item.id); return next; })} className="text-[12px] font-medium text-[#202020] hover:underline hover:underline-offset-4">Hide Details</button>
                            <button onClick={() => setAddedPrescriptionIds(current => { const next = new Set(current); next.delete(item.id); return next; })} className="inline-flex items-center gap-1.5 pr-3 text-[12px] font-semibold text-[#202020] hover:text-black">
                              <Edit3 size={14} /> Edit
                            </button>
                          </div>
                          <div className="ml-16 mt-3 grid gap-5 rounded-[7px] bg-[var(--app-soft)] px-5 py-4 md:grid-cols-[2fr_1.8fr_0.42fr_0.58fr]">
                            <div>
                              <p className="text-[11px] font-medium text-[#343434]">Directions of Use</p>
                              <p className="mt-1.5 flex min-h-10 cursor-default items-center rounded-[8px] border border-[#e5e5e2] bg-[#f0f0ee] px-3 py-2 text-[12px] leading-[17px] text-[#777]">{details?.directions}</p>
                            </div>
                            <div>
                              <p className="text-[11px] font-medium text-[#343434]">Reason to Compound</p>
                              <p className="mt-1.5 flex min-h-10 cursor-default items-center rounded-[8px] border border-[#e5e5e2] bg-[#f0f0ee] px-3 py-2 text-[12px] leading-[17px] text-[#777]">{details?.reason}</p>
                            </div>
                            <div>
                              <p className="text-[11px] font-medium text-[#343434]">Days Supply</p>
                              <p className="mt-1.5 flex h-10 cursor-default items-center rounded-[8px] border border-[#e5e5e2] bg-[#f0f0ee] px-3 text-[12px] text-[#777]">{details?.days}</p>
                            </div>
                            <div>
                              <p className="text-[11px] font-medium text-[#343434]">Authorized Refills</p>
                              <p className="mt-1.5 flex h-10 cursor-default items-center rounded-[8px] border border-[#e5e5e2] bg-[#f0f0ee] px-3 text-[12px] text-[#777]">{details?.refills}</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className={cartCardVariant === 3 ? "px-0 py-0" : `rounded-[8px] px-6 py-5 ${cartCardVariant === 2 || cartCardVariant === 4 || cartCardVariant === 5 || cartCardVariant === 6 ? "bg-[#FAFAFA]" : "bg-[#fffdfb]"}`}>
                          <div className={cartCardVariant === 3 ? "hidden" : "mb-5 flex items-center justify-between gap-3"}>
                            <div className="flex items-center gap-2">
                              <h3 className="text-[14px] font-medium text-[#202020]">{cartCardVariant === 4 || cartCardVariant === 5 || cartCardVariant === 6 ? `Prescription for ${item.name}` : "Create Prescription"}</h3>
                              {(cartCardVariant === 4 || cartCardVariant === 5 || cartCardVariant === 6) && (
                                <span className="rounded-full bg-[#183229] px-2.5 py-1 text-[9px] font-semibold text-white">Active</span>
                              )}
                            </div>
                            {rowIndex > 0 && <button onClick={() => setExpandedPrescriptionIds(current => { const next = new Set(current); next.delete(item.id); return next; })} className="text-[11px] text-[#777] underline">Hide Details</button>}
                          </div>

                          {cartCardVariant === 3 ? (
                            <div className="rounded-[8px] bg-white px-5 py-5 ring-1 ring-[#E6E6E6]">
                              <div className="grid gap-x-5 gap-y-4 md:grid-cols-[1.1fr_1.1fr_0.56fr_0.56fr]">
                                <label className="block">
                                  <span className="mb-1.5 block text-[11px] font-semibold text-[#858585]">Strength</span>
                                  <input disabled value={item.detail.split("|")[0]?.trim() ?? item.detail} className="h-[34px] w-full rounded-[4px] border border-[#EAE8E1] bg-white px-3 text-[12px] font-medium text-[#cfcfcd] outline-none" />
                                </label>
                                <label className="block">
                                  <span className="mb-1.5 block text-[11px] font-semibold text-[#858585]">Size</span>
                                  <input disabled value={item.detail.split("|")[1]?.trim() ?? item.detail} className="h-[34px] w-full rounded-[4px] border border-[#EAE8E1] bg-white px-3 text-[12px] font-medium text-[#cfcfcd] outline-none" />
                                </label>
                                <label className="block">
                                  <span className="mb-1.5 block text-[11px] font-semibold text-[#171717]">Authorized Refills <span className="text-[#b44b42]">*</span></span>
                                  <input type="number" min="0" placeholder="Refills" value={details?.refills ?? ""} onChange={event => updatePrescriptionDetail(item.id, "refills", event.target.value)} className={"h-[34px] w-full rounded-[4px] border px-3 text-[12px] text-[#171717] outline-none " + requiredFieldClass(details?.refills)} />
                                </label>
                                <label className="block">
                                  <span className="mb-1.5 block text-[11px] font-semibold text-[#171717]">Days Supply <span className="text-[#b44b42]">*</span></span>
                                  <input type="number" min="1" placeholder="Days" value={details?.days ?? ""} onChange={event => updatePrescriptionDetail(item.id, "days", event.target.value)} className={"h-[34px] w-full rounded-[4px] border px-3 text-[12px] text-[#171717] outline-none " + requiredFieldClass(details?.days)} />
                                </label>
                                <div className="grid gap-x-5 gap-y-4 md:col-span-4 md:grid-cols-2">
                                  <label className="block min-w-0">
                                    <span className="mb-1.5 block text-[11px] font-semibold text-[#171717]">Reason to Compound <span className="text-[#b44b42]">*</span></span>
                                    <select value={details?.reason ?? ""} onChange={event => updatePrescriptionDetail(item.id, "reason", event.target.value)} className={"h-[34px] w-full rounded-[4px] border px-3 text-[12px] text-[#171717] outline-none " + requiredFieldClass(details?.reason)}>
                                      <option value="" disabled>Select reason below or type out your own</option>
                                      <option>Patient requires a dosage form not commercially available.</option>
                                      <option>Patient requires excipient avoidance.</option>
                                      <option>Prescriber requested custom strength.</option>
                                    </select>
                                  </label>
                                  <label className="block min-w-0">
                                    <span className="mb-1.5 block text-[11px] font-semibold text-[#171717]">Directions of Use <span className="text-[#b44b42]">*</span></span>
                                    <select value={details?.directions ?? ""} onChange={event => updatePrescriptionDetail(item.id, "directions", event.target.value)} className={"h-[34px] w-full rounded-[4px] border px-3 text-[12px] text-[#171717] outline-none " + requiredFieldClass(details?.directions)}>
                                      <option value="" disabled>Select directions</option>
                                      <option>Inject (10 mg) subcutaneously once weekly.</option>
                                      <option>Inject (2.5 mg) subcutaneously once weekly.</option>
                                      <option>Inject (5 mg) subcutaneously once weekly.</option>
                                      <option>Use as directed by prescriber</option>
                                    </select>
                                  </label>
                                </div>
                              </div>
                              {openPrescriptionNoteIds.has(item.id) && (
                                <label className="mt-4 block rounded-[4px] bg-[#FAFAFA] px-4 py-3">
                                  <span className="mb-2 block text-[11px] font-semibold text-[#171717]">Prescription Note (Optional)</span>
                                  <textarea placeholder="Enter Prescription Note" className="min-h-[64px] w-full resize-y rounded-[4px] border border-[#EAE8E1] bg-white px-3 py-3 text-[12px] outline-none placeholder:text-[#b7b7b4] focus:border-[#183229]" />
                                </label>
                              )}
                              <div className="mt-5 flex items-center justify-between gap-4">
                                  <button onClick={() => togglePrescriptionNote(item.id)} className="text-[12px] font-semibold text-[#171717]">
                                    {openPrescriptionNoteIds.has(item.id) ? "- Hide prescription note" : "+ Add a prescription note"}
                                  </button>
                                <div className="flex items-center gap-4">
                                  <button
                                    onClick={() => {
                                      if (!isPrescriptionComplete(item.id)) return;
                                      setAddedPrescriptionIds(current => new Set([...current, item.id]));
                                      setExpandedPrescriptionIds(current => {
                                        const next = new Set(current);
                                        next.delete(item.id);
                                        const currentIndex = cartRows.findIndex(row => row.item.id === item.id);
                                        const nextPrescription = cartRows[currentIndex + 1];
                                        if (nextPrescription) next.add(nextPrescription.item.id);
                                        return next;
                                      });
                                    }}
                                    disabled={!isPrescriptionComplete(item.id)}
                                    className="h-8 min-w-[86px] rounded-full bg-[#183229] px-4 text-[12px] font-medium text-white transition-colors hover:bg-[#0d211b] disabled:cursor-not-allowed disabled:bg-[#dfdfdc] disabled:text-[#92928f]"
                                  >
                                    Add Order
                                  </button>
                                  <button onClick={() => setExpandedPrescriptionIds(current => { const next = new Set(current); next.delete(item.id); return next; })} className="text-[12px] font-medium text-[#202020]">
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
	                          ) : cartCardVariant === 6 ? (
	                            <div className="rounded-[10px] bg-white px-5 py-5 ring-1 ring-[#DDE8E2]">
	                              <div className="grid gap-x-3 gap-y-3 md:grid-cols-[minmax(150px,0.44fr)_76px_76px_minmax(280px,1fr)]">
	                                <label className="block">
	                                  <span className="mb-1 flex h-[20px] items-end text-[11px] font-semibold text-[#858585]">Strength</span>
	                                  <input disabled value={item.detail} className="h-[34px] w-full rounded-[8px] border border-[#EAE8E1] bg-white px-3 text-[12px] font-medium text-[#cfcfcd] outline-none" />
	                                </label>
	                                <label className="block">
	                                  <span className="mb-1 flex h-[20px] items-end text-[10px] font-semibold leading-[10px] text-[#171717]">Authorized<br />Refills <span className="text-[#b44b42]">*</span></span>
	                                  <input type="number" min="0" placeholder="Days" value={details?.refills ?? ""} onChange={event => updatePrescriptionDetail(item.id, "refills", event.target.value)} className={"h-[34px] w-full rounded-[8px] border px-3 text-[11px] outline-none " + requiredFieldClass(details?.refills)} />
	                                </label>
	                                <label className="block">
	                                  <span className="mb-1 flex h-[20px] items-end whitespace-nowrap text-[10px] font-semibold text-[#171717]">Days Supply <span className="text-[#b44b42]">*</span></span>
	                                  <input type="number" min="1" placeholder="Days" value={details?.days ?? ""} onChange={event => updatePrescriptionDetail(item.id, "days", event.target.value)} className={"h-[34px] w-full rounded-[8px] border px-3 text-[11px] outline-none " + requiredFieldClass(details?.days)} />
	                                </label>
	                                <label className="block min-w-0">
	                                  <span className="mb-1 flex h-[20px] items-end whitespace-nowrap text-[10px] font-semibold text-[#171717]">Directions of Use <span className="text-[#b44b42]">*</span></span>
	                                  <select value={details?.directions ?? ""} onChange={event => updatePrescriptionDetail(item.id, "directions", event.target.value)} className={"h-[34px] w-full rounded-[8px] border px-3 text-[11px] outline-none " + requiredFieldClass(details?.directions)}>
	                                    <option value="" disabled>Select directions</option>
	                                    <option>Apply a small amount to affected areas twice daily (morning and evening).</option>
	                                    <option>Inject (10 mg) subcutaneously once weekly.</option>
	                                    <option>Inject (2.5 mg) subcutaneously once weekly.</option>
	                                    <option>Use as directed by prescriber</option>
	                                  </select>
	                                </label>
	                                <label className="block md:col-span-4">
	                                  <span className="mb-1.5 block text-[10px] font-semibold text-[#171717]">Reason to Compound <span className="text-[#b44b42]">*</span></span>
	                                  <select value={details?.reason ?? ""} onChange={event => updatePrescriptionDetail(item.id, "reason", event.target.value)} className={"h-[34px] w-full rounded-[8px] border px-3 text-[11px] outline-none " + requiredFieldClass(details?.reason)}>
	                                    <option value="" disabled>Select reason below or type out your own</option>
	                                    <option>Patient has an allergy to X ingredient in the commercially available product.</option>
	                                    <option>Patient requires a dosage form not commercially available.</option>
	                                    <option>Patient requires excipient avoidance.</option>
	                                    <option>Prescriber requested custom strength.</option>
	                                  </select>
	                                </label>
	                              </div>
	                              {openPrescriptionNoteIds.has(item.id) && (
	                                <label className="mt-4 block rounded-[10px] bg-[#FAFAFA] px-4 py-3">
	                                  <span className="mb-2 block text-[11px] font-semibold text-[#171717]">Prescription Note (Optional)</span>
	                                  <textarea placeholder="Enter Prescription Note" className="min-h-[72px] w-full resize-y rounded-[8px] border border-[#EAE8E1] bg-white px-3 py-3 text-[12px] outline-none placeholder:text-[#b7b7b4] focus:border-[#183229]" />
	                                </label>
	                              )}
	                              <div className="mt-5 flex items-center justify-between gap-4">
	                                <button onClick={() => togglePrescriptionNote(item.id)} className="text-[12px] font-semibold text-[#171717]">
	                                  {openPrescriptionNoteIds.has(item.id) ? "- Hide prescription note" : "+ Add a prescription note"}
	                                </button>
	                                <div className="flex items-center gap-4">
	                                  <button
	                                    onClick={() => {
	                                      if (!isPrescriptionComplete(item.id)) return;
	                                      setAddedPrescriptionIds(current => new Set([...current, item.id]));
	                                      setExpandedPrescriptionIds(current => {
	                                        const next = new Set(current);
	                                        next.delete(item.id);
	                                        const currentIndex = cartRows.findIndex(row => row.item.id === item.id);
	                                        const nextPrescription = cartRows[currentIndex + 1];
	                                        if (nextPrescription) next.add(nextPrescription.item.id);
	                                        return next;
	                                      });
	                                    }}
	                                    disabled={!isPrescriptionComplete(item.id)}
	                                    className="h-8 min-w-[76px] rounded-full bg-[#111] px-4 text-[11px] font-medium text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:bg-[#dfdfdc] disabled:text-[#92928f]"
	                                  >
	                                    Add Order
	                                  </button>
	                                  <button
	                                    onClick={() => setExpandedPrescriptionIds(current => {
	                                      const next = new Set(current);
	                                      next.delete(item.id);
	                                      return next;
	                                    })}
	                                    className="text-[11px] font-medium text-[#202020]"
	                                  >
	                                    Cancel
	                                  </button>
	                                </div>
	                              </div>
	                            </div>
	                          ) : cartCardVariant === 5 ? (
                            <div className="rounded-[10px] bg-white px-5 py-5 ring-1 ring-[#DDE8E2]">
                              <div className="grid gap-x-4 gap-y-3 md:grid-cols-[150px_150px_88px_88px_minmax(0,1fr)]">
                                <label className="block">
                                  <span className="mb-1.5 block text-[10px] font-semibold text-[#676767]">Strength</span>
                                  <input disabled value={item.detail.split("|")[0]?.trim() ?? item.detail} className="h-[34px] w-full rounded-[8px] border border-[#EAE8E1] bg-white px-3 text-[11px] font-medium text-[#cfcfcd] outline-none" />
                                </label>
                                <label className="block">
                                  <span className="mb-1.5 block text-[10px] font-semibold text-[#676767]">Size</span>
                                  <input disabled value={item.detail.split("|")[1]?.trim() ?? item.detail} className="h-[34px] w-full rounded-[8px] border border-[#EAE8E1] bg-white px-3 text-[11px] font-medium text-[#cfcfcd] outline-none" />
                                </label>
                                <label className="block">
                                  <span className="mb-1.5 block whitespace-nowrap text-[10px] font-semibold text-[#171717]">Authorized Refills <span className="text-[#b44b42]">*</span></span>
                                  <input type="number" min="0" placeholder="Days" value={details?.refills ?? ""} onChange={event => updatePrescriptionDetail(item.id, "refills", event.target.value)} className={"h-[34px] w-full rounded-[8px] border px-3 text-[11px] outline-none " + requiredFieldClass(details?.refills)} />
                                </label>
                                <label className="block">
                                  <span className="mb-1.5 block text-[10px] font-semibold text-[#171717]">Days Supply <span className="text-[#b44b42]">*</span></span>
                                  <input type="number" min="1" placeholder="Days" value={details?.days ?? ""} onChange={event => updatePrescriptionDetail(item.id, "days", event.target.value)} className={"h-[34px] w-full rounded-[8px] border px-3 text-[11px] outline-none " + requiredFieldClass(details?.days)} />
                                </label>
                                <label className="block md:col-span-5">
                                  <span className="mb-1.5 block text-[10px] font-semibold text-[#171717]">Directions of Use <span className="text-[#b44b42]">*</span></span>
                                  <select value={details?.directions ?? ""} onChange={event => updatePrescriptionDetail(item.id, "directions", event.target.value)} className={"h-[34px] w-full rounded-[8px] border px-3 text-[11px] outline-none " + requiredFieldClass(details?.directions)}>
                                    <option value="" disabled>Select reason below or type out your own</option>
                                    <option>Inject (10 mg) subcutaneously once weekly.</option>
                                    <option>Inject (2.5 mg) subcutaneously once weekly.</option>
                                    <option>Inject (5 mg) subcutaneously once weekly.</option>
                                    <option>Use as directed by prescriber</option>
                                  </select>
                                </label>
                                <label className="block md:col-span-5">
                                  <span className="mb-1.5 block text-[10px] font-semibold text-[#171717]">Reason to Compound <span className="text-[#b44b42]">*</span></span>
                                  <select value={details?.reason ?? ""} onChange={event => updatePrescriptionDetail(item.id, "reason", event.target.value)} className={"h-[34px] w-full rounded-[8px] border px-3 text-[11px] outline-none " + requiredFieldClass(details?.reason)}>
                                    <option value="" disabled>Select reason below or type out your own</option>
                                    <option>Patient requires a dosage form not commercially available.</option>
                                    <option>Patient requires excipient avoidance.</option>
                                    <option>Prescriber requested custom strength.</option>
                                  </select>
                                </label>
                              </div>
                              {openPrescriptionNoteIds.has(item.id) && (
                                <label className="mt-4 block rounded-[10px] bg-white px-4 py-3">
                                  <span className="mb-2 block text-[10px] font-semibold text-[#171717]">Prescription Note (Optional)</span>
                                  <textarea placeholder="Enter Prescription Note" className="min-h-[64px] w-full resize-y rounded-[8px] border border-[#EAE8E1] bg-white px-3 py-3 text-[11px] outline-none placeholder:text-[#b7b7b4] focus:border-[#183229]" />
                                </label>
                              )}
                              <div className="mt-5 flex items-center justify-between gap-4">
                                <button onClick={() => togglePrescriptionNote(item.id)} className="text-[11px] font-semibold text-[#171717]">
                                  {openPrescriptionNoteIds.has(item.id) ? "- Hide prescription note" : "+ Add a prescription note"}
                                </button>
                                <div className="flex items-center gap-4">
                                  <button
                                    onClick={() => {
                                      if (!isPrescriptionComplete(item.id)) return;
                                      setAddedPrescriptionIds(current => new Set([...current, item.id]));
                                      setExpandedPrescriptionIds(current => {
                                        const next = new Set(current);
                                        next.delete(item.id);
                                        const currentIndex = cartRows.findIndex(row => row.item.id === item.id);
                                        const nextPrescription = cartRows[currentIndex + 1];
                                        if (nextPrescription) next.add(nextPrescription.item.id);
                                        return next;
                                      });
                                    }}
                                    disabled={!isPrescriptionComplete(item.id)}
                                    className="h-8 min-w-[76px] rounded-full bg-[#111] px-4 text-[11px] font-medium text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:bg-[#dfdfdc] disabled:text-[#92928f]"
                                  >
                                    Add Order
                                  </button>
                                  <button
                                    onClick={() => setExpandedPrescriptionIds(current => {
                                      const next = new Set(current);
                                      next.delete(item.id);
                                      return next;
                                    })}
                                    className="text-[11px] font-medium text-[#202020]"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          ) : cartCardVariant === 4 ? (
                            <div className="rounded-[10px] bg-white px-5 py-5 ring-1 ring-[#DDE8E2]">
                              <div className="grid gap-x-5 gap-y-4 md:grid-cols-[1.1fr_1.1fr_0.56fr_0.56fr]">
                                <label className="block">
                                  <span className="mb-1.5 block text-[11px] font-semibold text-[#858585]">Strength</span>
                                  <input disabled value={item.detail.split("|")[0]?.trim() ?? item.detail} className="h-[34px] w-full rounded-[8px] border border-[#EAE8E1] bg-white px-3 text-[12px] font-medium text-[#cfcfcd] outline-none" />
                                </label>
                                <label className="block">
                                  <span className="mb-1.5 block text-[11px] font-semibold text-[#858585]">Size</span>
                                  <input disabled value={item.detail.split("|")[1]?.trim() ?? item.detail} className="h-[34px] w-full rounded-[8px] border border-[#EAE8E1] bg-white px-3 text-[12px] font-medium text-[#cfcfcd] outline-none" />
                                </label>
                                <label className="block">
                                  <span className="mb-1.5 block text-[11px] font-semibold text-[#171717]">Authorized Refills <span className="text-[#b44b42]">*</span></span>
                                  <input type="number" min="0" placeholder="Days" value={details?.refills ?? ""} onChange={event => updatePrescriptionDetail(item.id, "refills", event.target.value)} className={"h-[34px] w-full rounded-[8px] border px-3 text-[12px] outline-none " + requiredFieldClass(details?.refills)} />
                                </label>
                                <label className="block">
                                  <span className="mb-1.5 block text-[11px] font-semibold text-[#171717]">Days Supply <span className="text-[#b44b42]">*</span></span>
                                  <input type="number" min="1" placeholder="Days" value={details?.days ?? ""} onChange={event => updatePrescriptionDetail(item.id, "days", event.target.value)} className={"h-[34px] w-full rounded-[8px] border px-3 text-[12px] outline-none " + requiredFieldClass(details?.days)} />
                                </label>
                                <div className="grid gap-x-5 gap-y-4 md:col-span-4 md:grid-cols-2">
                                  <label className="block min-w-0">
                                    <span className="mb-1.5 block text-[11px] font-semibold text-[#171717]">Reason to Compound <span className="text-[#b44b42]">*</span></span>
                                    <select value={details?.reason ?? ""} onChange={event => updatePrescriptionDetail(item.id, "reason", event.target.value)} className={"h-[34px] w-full rounded-[8px] border px-3 text-[12px] outline-none " + requiredFieldClass(details?.reason)}>
                                      <option value="" disabled>Select reason below or type out your own</option>
                                      <option>Patient requires a dosage form not commercially available.</option>
                                      <option>Patient requires excipient avoidance.</option>
                                      <option>Prescriber requested custom strength.</option>
                                    </select>
                                  </label>
                                  <label className="block min-w-0">
                                    <span className="mb-1.5 block text-[11px] font-semibold text-[#171717]">Directions of Use <span className="text-[#b44b42]">*</span></span>
                                    <select value={details?.directions ?? ""} onChange={event => selectDirections(item.id, event.target.value)} className={"h-[34px] w-full rounded-[8px] border px-3 text-[12px] outline-none " + requiredFieldClass(details?.directions)}>
                                      <option value="" disabled>Select directions</option>
                                      <option value="__sig_builder__">Use our SIG Builder</option>
                                      <option>Inject (10 mg) subcutaneously once weekly.</option>
                                      <option>Inject (2.5 mg) subcutaneously once weekly.</option>
                                      <option>Inject (5 mg) subcutaneously once weekly.</option>
                                      <option>Use as directed by prescriber</option>
                                    </select>
                                  </label>
                                </div>
                              </div>
                              {openPrescriptionNoteIds.has(item.id) && (
                                <label className="mt-4 block rounded-[10px] bg-[#FAFAFA] px-4 py-3">
                                  <span className="mb-2 block text-[11px] font-semibold text-[#171717]">Prescription Note (Optional)</span>
                                  <textarea placeholder="Enter Prescription Note" className="min-h-[72px] w-full resize-y rounded-[8px] border border-[#EAE8E1] bg-white px-3 py-3 text-[12px] outline-none placeholder:text-[#b7b7b4] focus:border-[#183229]" />
                                </label>
                              )}
                              <div className="mt-5 flex items-center justify-between gap-4">
                                <button onClick={() => togglePrescriptionNote(item.id)} className="text-[12px] font-semibold text-[#171717]">
                                  {openPrescriptionNoteIds.has(item.id) ? "- Hide prescription note" : "+ Add a prescription note"}
                                </button>
                                <div className="flex items-center gap-4">
                                  <button
                                    onClick={() => addPrescriptionOrder(item.id)}
                                    disabled={!isPrescriptionComplete(item.id) || addingPrescriptionId !== null || (editingPrescription?.id === item.id && JSON.stringify(prescriptionDetails[item.id]) === JSON.stringify(editingPrescription.original))}
                                    className="inline-flex h-8 min-w-[98px] items-center justify-center gap-1.5 rounded-full bg-[#111] px-4 text-[12px] font-medium text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:bg-[#dfdfdc] disabled:text-[#92928f]"
                                  >
                                    {addingPrescriptionId === item.id ? <><Loader2 size={13} className="animate-spin" /> {editingPrescription?.id === item.id ? "Saving" : "Adding"}</> : editingPrescription?.id === item.id ? "Save changes" : "Add Order"}
                                  </button>
                                  <button
                                    onClick={() => cancelPrescriptionEdit(item.id)}
                                    className="text-[12px] font-medium text-[#202020]"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <>
                              <div className="grid gap-x-5 gap-y-4 md:grid-cols-[minmax(145px,0.24fr)_minmax(0,1fr)]">
                              <label className="block">
                                <span className="mb-1.5 block text-[10px] font-semibold text-[#303030]">Strength</span>
                                <input disabled value={item.detail} className="h-[34px] w-full rounded-[8px] border border-[#EAE8E1] bg-white px-3 text-[12px] font-medium text-[#9a9a9a] outline-none" />
                              </label>
                              <label className="block">
                                <span className="mb-1.5 block text-[10px] font-semibold text-[#303030]">Size</span>
                                <input disabled value={item.detail.split("|")[1]?.trim() ?? item.detail} className="h-[34px] w-full rounded-[8px] border border-[#EAE8E1] bg-white px-3 text-[12px] font-medium text-[#9a9a9a] outline-none" />
                              </label>
                            </div>

                              <div className="grid gap-x-5 gap-y-4 md:grid-cols-[minmax(145px,0.24fr)_minmax(0,1fr)]">
                            <label className="block">
                              <span className="mb-1.5 block text-[11px] font-semibold text-[#303030]">Days Supply <span className="text-[#b44b42]">*</span></span>
                              <input type="number" min="1" placeholder="Enter Days" value={details?.days ?? ""} onChange={event => updatePrescriptionDetail(item.id, "days", event.target.value)} className={"h-[34px] w-full rounded-[10px] border px-3 text-[12px] outline-none " + requiredFieldClass(details?.days)} />
                            </label>

                            <label className="block">
                              <span className="mb-1.5 block text-[11px] font-semibold text-[#303030]">Directions of Use <span className="text-[#b44b42]">*</span></span>
                              <select value={details?.directions ?? ""} onChange={event => updatePrescriptionDetail(item.id, "directions", event.target.value)} className={"h-[34px] w-full rounded-[10px] border px-3 text-[12px] outline-none " + requiredFieldClass(details?.directions)}>
                                <option value="" disabled>Select directions</option>
                                <option>Inject (2.5 mg) subcutaneously once weekly.</option>
                                <option>Inject (5 mg) subcutaneously once weekly.</option>
                                <option>Use as directed by prescriber</option>
                              </select>
                            </label>

                            <label className="block">
                              <span className="mb-1.5 block text-[11px] font-semibold text-[#303030]">Authorized Refills <span className="text-[#b44b42]">*</span></span>
                              <input type="number" min="0" placeholder="Refills" value={details?.refills ?? ""} onChange={event => updatePrescriptionDetail(item.id, "refills", event.target.value)} className={"h-[34px] w-full rounded-[10px] border px-3 text-[12px] outline-none " + requiredFieldClass(details?.refills)} />
                            </label>

                            <label className="block">
                              <span className="mb-1.5 block text-[11px] font-semibold text-[#303030]">Reason to Compound <span className="text-[#b44b42]">*</span></span>
                              <select value={details?.reason ?? ""} onChange={event => updatePrescriptionDetail(item.id, "reason", event.target.value)} className={"h-[34px] w-full rounded-[10px] border px-3 text-[12px] outline-none " + requiredFieldClass(details?.reason)}>
                                <option value="" disabled>Select reason below or type out your own</option>
                                <option>Patient requires a dosage form not commercially available.</option>
                                <option>Patient requires excipient avoidance.</option>
                                <option>Prescriber requested custom strength.</option>
                              </select>
                            </label>
                              </div>

                              <label className="mt-4 block">
                            <span className="mb-1.5 block text-[11px] font-semibold text-[#303030]">Prescription Note (Optional)</span>
                            <textarea placeholder="Enter Prescription Note" className="min-h-[64px] w-full resize-y rounded-[7px] border border-[#dedede] bg-white px-3 py-3 text-[12px] outline-none focus:border-[#183229]" />
                              </label>

                              <div className="mt-4 flex justify-end gap-2">
                            <button
                              onClick={() => setExpandedPrescriptionIds(current => {
                                const next = new Set(current);
                                next.delete(item.id);
                                return next;
                              })}
                              className="h-9 rounded-[7px] border border-[#d3d3d0] bg-white px-4 text-[12px] font-semibold text-[#202020] transition-colors hover:bg-[#f3f3f1]"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => {
                                if (!isPrescriptionComplete(item.id)) return;
                                setAddedPrescriptionIds(current => new Set([...current, item.id]));
                                setExpandedPrescriptionIds(current => {
                                  const next = new Set(current);
                                  next.delete(item.id);
                                  const currentIndex = cartRows.findIndex(row => row.item.id === item.id);
                                  const nextPrescription = cartRows[currentIndex + 1];
                                  if (nextPrescription) next.add(nextPrescription.item.id);
                                  return next;
                                });
                              }}
                              disabled={!isPrescriptionComplete(item.id)}
                              className="h-9 min-w-[118px] rounded-[7px] bg-[#111] px-4 text-[12px] font-semibold text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:bg-[#dfdfdc] disabled:text-[#92928f]"
                            >
                              {addedPrescriptionIds.has(item.id) ? "Added to order" : "Add to order"}
                            </button>
                              </div>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                    )}
                  </article>

                  {isLastInPharmacy && !is503BCartItem(item) && (
                    <div style={{ backgroundColor: activeCardTheme.shell, borderColor: activeCardTheme.border }} className={`rounded-b-[10px] px-5 transition-opacity ${hasFocusedOpenForm ? "opacity-55 hover:opacity-85" : ""} ${cartCardVariant === 3 ? "border-x border-b pb-4 pt-2" : cartCardVariant === 4 ? "pb-5 pt-1" : "pb-5 pt-2"}`}>
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="max-w-[620px] text-[10px] font-medium leading-[16px] text-[#303030]">
                          {multiPatientShipping ? "Multi-patient shipping is supported — one shipping fee covers all patients." : "Multi-patient shipping is not supported — shipping is charged separately for each patient (" + shipmentCount + " shipping fees)."}
                        </p>
                      </div>
                    </div>
                  )}
                </Fragment>
              );
            })}
          </section>

          <aside className={`self-start bg-white transition-opacity xl:sticky xl:top-6 ${hasFocusedOpenForm ? "opacity-55 hover:opacity-85" : ""}`}>
            <h2 className="text-[24px] font-normal text-[#171717]">Order Total</h2>

            <div className="mt-5">
              <div className="flex items-center justify-between">
                <p className="text-[13px] font-semibold text-[#202020]">Do you have a Voucher Code?</p>
                <ChevronDown size={17} className="rotate-180" />
              </div>
              <div className="mt-3 flex gap-2">
                <div className={`flex h-[31px] min-w-0 flex-1 items-center rounded-[8px] bg-white px-3 shadow-[inset_0_1px_0_#9E9EA0,inset_-1px_0_0_#9E9EA0,inset_0_-1px_0_#9E9EA0,inset_1px_0_0_#9E9EA0] ${appliedVoucher ? "text-[#202020] shadow-[inset_0_0_0_1px_#93B4FF]" : "focus-within:shadow-[inset_0_0_0_1px_#183229]"}`}>
                  <input
                    value={voucherCode}
                    onChange={event => { setVoucherCode(event.target.value); if (appliedVoucher) setAppliedVoucher(null); }}
                    onKeyDown={event => { if (event.key === "Enter") applyVoucher(); }}
                    placeholder="Enter voucher code"
                    className="min-w-0 flex-1 bg-transparent text-[12px] font-medium uppercase outline-none placeholder:normal-case placeholder:text-[#999]"
                  />
                </div>
                <button onClick={applyVoucher} disabled={Boolean(appliedVoucher) || !voucherCode.trim()} className="h-[31px] rounded-full border-0 bg-white px-5 text-[12px] font-medium text-[#666] shadow-[inset_0_1px_0_#9E9EA0,inset_-1px_0_0_#9E9EA0,inset_0_-1px_0_#9E9EA0,inset_1px_0_0_#9E9EA0] transition-colors hover:bg-[#f7f7f7] disabled:cursor-not-allowed disabled:opacity-45">Apply</button>
              </div>
              {appliedVoucher && <p className="mt-2 text-[10px] font-medium text-[#202020]">Voucher applied — 10% off, up to $50.</p>}
            </div>

            <div className="mt-5 space-y-3 text-[12px] text-[#262626]">
              <div className="flex justify-between gap-4"><span>Subtotal</span><span>{"$" + subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between gap-4"><span>Estimated Shipping & Handling</span><span>{"$" + shipping.toFixed(2)}</span></div>
              {appliedVoucher && <div className="flex justify-between gap-4 font-medium text-[#2563EB]"><span>Voucher ({appliedVoucher})</span><span>−${voucherDiscount.toFixed(2)}</span></div>}
              <div className="flex justify-between gap-4"><span>Estimated Tax</span><span>—</span></div>
              <div className="flex justify-between gap-4 border-y border-[#ececec] py-4 text-[13px] font-semibold"><span>Total</span><span>{"$" + total.toFixed(2)}</span></div>
            </div>

            <p className="mt-4 text-[11px] leading-[18px] text-[#4f4f4f]">Shipping fees are calculated by pharmacy and patient based on the selected method.</p>

            <button onClick={handleCheckout} className="mt-5 h-[46px] w-full rounded-full bg-[#111] text-[12px] font-medium text-white transition-opacity hover:opacity-90">
              Checkout
            </button>
          </aside>
        </div>
      </div>
      {previewOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-[#111]/35 backdrop-blur-[3px]">
          <button className="absolute inset-0 cursor-default" onClick={() => { setPreviewOpen(false); setPreviewSubmissionState("idle"); }} aria-label="Close preview" />
          <aside className="relative h-full w-full max-w-[500px] overflow-auto bg-white shadow-[-24px_0_70px_rgba(24,24,24,0.16)]">
            <header className="sticky top-0 z-10 border-b border-[#eee8e3] bg-white/95 px-5 pb-5 pt-6 backdrop-blur">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8c95a1]">Checkout</p>
                  <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.03em] text-[#171717]">{reviewVariant === "current" ? "Review order" : "Review and submit"}</h2>
                  <p className="mt-1 text-[12px] leading-[18px] text-[#6f7782]">Confirm items, payment, shipping, and totals before submitting.</p>
                  <div className="mt-4 inline-flex rounded-[8px] bg-[#f1f1f1] p-1">
                    {(["current", "v1", "v2"] as const).map(variant => (
                      <button key={variant} type="button" onClick={() => setReviewVariant(variant)} className={`h-7 rounded-[6px] px-3 text-[10px] font-medium transition-all ${reviewVariant === variant ? "bg-white text-[#111] shadow-[0_1px_5px_rgba(0,0,0,0.10)]" : "text-[#777] hover:text-[#111]"}`}>
                        {variant === "current" ? "Current" : variant.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
                <button onClick={() => { setPreviewOpen(false); setPreviewSubmissionState("idle"); }} className="flex size-8 items-center justify-center rounded-full text-[#777] transition-colors hover:bg-[#f5f3ef] hover:text-[#111]" aria-label="Close preview">
                  <X size={17} strokeWidth={1.8} />
                </button>
              </div>
            </header>
            <div className="px-6 pb-6 pt-2">

            <section className={`py-5 ${reviewVariant === "v2" ? "border-b border-dashed border-[#cfcfcf]" : "border-b border-[#e8e8e8]"}`}>
              <h3 className="text-[16px] font-medium text-[#181818]">Order for</h3>
              <div className="mt-3 rounded-[10px] border border-[#e3e5e8] px-4 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.035)]">
                <p className="text-[13px] font-medium text-[#202020]">{cartData.patients.map(patient => patient.name.replace(/\s*\([^)]*\)\s*$/, "")).join(", ")}</p>
                <p className="mt-1 text-[11px] text-[#717985]">{cartRowsWithNumbers.length} item{cartRowsWithNumbers.length === 1 ? "" : "s"}</p>
                {reviewVariant === "current" && (
                  <details className="group/patient mt-2">
                    <summary className="flex cursor-pointer list-none items-center gap-1 text-[11px] font-medium text-[#202020] marker:content-none"><ChevronRight size={12} className="transition-transform group-open/patient:rotate-90" /><span className="group-open/patient:hidden">Show details</span><span className="hidden group-open/patient:inline">Hide details</span></summary>
                    <div className="mt-2 border-t border-[#ededed] pt-2 text-[10px] leading-[16px] text-[#717985]">{cartData.patients[0]?.phone}<br />{cartData.patients[0]?.address}</div>
                  </details>
                )}
              </div>
            </section>

            <section className={`py-5 ${reviewVariant !== "v1" ? "border-b border-dashed border-[#cfcfcf]" : "border-b border-[#e8e8e8]"}`}>
              <div className="pb-1">
                <p className="text-[16px] font-medium text-[#181818]">Order items</p>
              </div>
              {(showAllSummaryItems ? cartRowsWithNumbers : cartRowsWithNumbers.slice(0, 4)).map(({ patient, item, prescriptionNumber }, index) => {
                const supplies = patient.items.filter(candidate => candidate.kind === "supply" && !removed.has(candidate.id));
                const quantity = quantities[item.id] ?? 1;
                return (
                  <div key={item.id} className={`mt-3 p-4 ${reviewVariant !== "v1" ? "border-t border-dashed border-[#d6d6d6] bg-white px-0 shadow-none" : "rounded-[10px] border border-[#e3e5e8] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.035)]"}`}>
                    <div className="flex items-center gap-2 border-b border-[#ededed] pb-3">
                      <p className="min-w-0 truncate text-[11px] font-medium text-[#222]">{is503BCartItem(item) ? "503B Item" : cartCatalogType(item) === "503A" ? "503A Prescription" : "Prescription"} {prescriptionNumber}</p>
                    </div>
                    <div className="mt-3 flex items-start gap-3">
                      <CartItemImage item={item} />
                      <div className="min-w-0 flex-1">
                        <p className="text-[13px] font-semibold leading-[17px] text-[#1a1a1a]">{item.name}</p>
                        <p className="mt-1 text-[11px] leading-[15px] text-[#687078]">{item.detail}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <p className="text-[13px] font-semibold text-[#1a1a1a]">${(item.price * quantity).toFixed(2)}</p>
                        <p className="mt-1 whitespace-nowrap text-[10px] text-[#747b82]">{quantity} × ${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div>{supplies.map(supply => {
                      const supplyQuantity = quantities[supply.id] ?? 1;
                      return (
                          <div key={supply.id} className="mt-3 flex items-start gap-3 border-t border-[#ededed] pt-3">
                          <CartItemImage item={supply} />
                          <div className="min-w-0 flex-1">
                            <p className="text-[12px] font-semibold leading-[16px] text-[#1a1a1a]">{supply.name} <span className="rounded bg-[#efefef] px-1.5 py-0.5 text-[8px] font-medium text-[#7b7b7b]">Supplies</span></p>
                            <p className="mt-1 text-[10px] text-[#747b82]">{supply.detail}</p>
                          </div>
                          <div className="shrink-0 text-right text-[10px] text-[#747b82]">
                            <p className="text-[12px] font-semibold text-[#1a1a1a]">${(supply.price * supplyQuantity).toFixed(2)}</p>
                            <p className="whitespace-nowrap">{supplyQuantity} × ${supply.price.toFixed(2)}</p>
                          </div>
                        </div>
                      );
                    })}</div>
                    {!is503BCartItem(item) && (
                    <details className="group/details mt-3 border-t border-[#ededed] pt-3">
                      <summary className="flex cursor-pointer list-none items-center gap-1.5 text-[11px] font-medium text-[#202020] marker:content-none">
                        <ChevronRight size={13} className="transition-transform group-open/details:rotate-90" />
                        <span className="group-open/details:hidden">Show details</span><span className="hidden group-open/details:inline">Hide details</span>
                      </summary>
                      <dl className="mt-3 grid grid-cols-[104px_1fr] gap-x-3 gap-y-2 text-[11px] leading-[16px]">
                        <dt className="text-[#7a818c]">Directions</dt><dd className="text-[#242424]">{prescriptionDetails[item.id]?.directions || "Not provided"}</dd>
                        <dt className="text-[#7a818c]">Reason</dt><dd className="text-[#242424]">{prescriptionDetails[item.id]?.reason || "Not provided"}</dd>
                        <dt className="text-[#7a818c]">Days supply</dt><dd className="text-[#242424]">{prescriptionDetails[item.id]?.days || "—"}</dd>
                        <dt className="text-[#7a818c]">Refills</dt><dd className="text-[#242424]">{prescriptionDetails[item.id]?.refills || "—"}</dd>
                        <dt className="text-[#7a818c]">Pharmacy</dt><dd className="text-[#242424]">{cartData.pharmacy}</dd>
                      </dl>
                    </details>
                    )}
                  </div>
                );
              })}
              {cartRowsWithNumbers.length > 4 && (
                <button
                  onClick={() => setShowAllSummaryItems(current => !current)}
                  className="flex w-full items-center justify-center gap-1.5 border-t border-[#e6e6e6] py-3 text-[11px] font-semibold text-[#202020] hover:bg-[#fbfaf8]"
                >
                  {showAllSummaryItems ? "Show fewer items" : `Show ${cartRowsWithNumbers.length - 4} more item${cartRowsWithNumbers.length - 4 === 1 ? "" : "s"}`}
                  <ChevronDown size={13} className={showAllSummaryItems ? "rotate-180 transition-transform" : "transition-transform"} />
                </button>
              )}
            </section>

            <section className={`py-5 ${reviewVariant === "v2" ? "border-b border-dashed border-[#cfcfcf]" : "border-b border-[#e8e8e8]"}`}>
              {previewSubmitted && (
                <div>
                  <div className="px-1 py-1">
                    <div className="text-left"><p className="text-[13px] font-semibold text-[#1a1a1a]">Order summary</p><p className="mt-0.5 text-[10px] text-[#8c8c8c]">Payment, delivery, and totals</p></div>
                    <div className="my-4 border-t border-dashed border-[#cfcfcf]" />
                    <div className="space-y-2.5 text-[12px]">
                      <div className="flex justify-between gap-5"><span className="text-[#737373]">Payment</span><span className="font-medium text-[#202020]">{paymentMethod === "patient" ? "Pay by Patient" : "Pay by Clinic"}</span></div>
                      <div className="flex justify-between gap-5"><span className="text-[#737373]">Shipping to</span><span className="font-medium text-[#202020]">{shipTo === "patient" ? "Patient" : "Clinic"}</span></div>
                    </div>
                    <div className="my-4 border-t border-dashed border-[#cfcfcf]" />
                    <div className="space-y-2.5 text-[12px]">
                      <div className="flex justify-between"><span className="text-[#737373]">Subtotal</span><span className="text-[#202020]">${subtotal.toFixed(2)}</span></div>
                      <div className="flex justify-between"><span className="text-[#737373]">Shipping &amp; handling</span><span className="text-[#202020]">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span></div>
                    </div>
                    <div className="my-4 border-t border-dashed border-[#cfcfcf]" />
                    <div className="flex items-center justify-between text-[15px] font-semibold text-[#171717]"><span>Total</span><span>${total.toFixed(2)}</span></div>
                  </div>
                </div>
              )}
              {!previewSubmitted && reviewVariant === "v1" && (
                <div className="space-y-5">
                  <div>
                    <p className="mb-3 text-[16px] font-medium text-[#181818]">Payment</p>
                    <div className="flex flex-wrap gap-2">
                      <button type="button" onClick={() => setPaymentMethod("patient")} className={`relative inline-flex h-9 items-center gap-2 rounded-[7px] border px-3 text-[11px] font-semibold transition-colors ${paymentMethod === "patient" ? "border-2 border-[#2563EB] bg-white text-[#171a20]" : "border-[#d8dedd] bg-white text-[#6f7782] hover:border-[#9fa8b5]"}`}>
                        {paymentMethod === "patient" && <CheckCircle2 size={16} strokeWidth={2.2} className="absolute -right-2 -top-2 fill-[#2563EB] text-white" />}
                        <User size={13} strokeWidth={1.8} /> Pay by Patient
                      </button>
                      <button type="button" onClick={() => setPaymentMethod("clinic")} className={`relative inline-flex h-9 items-center gap-2 rounded-[7px] border px-3 text-[11px] font-semibold transition-colors ${paymentMethod === "clinic" ? "border-2 border-[#2563EB] bg-white text-[#171a20]" : "border-[#d8dedd] bg-white text-[#6f7782] hover:border-[#9fa8b5]"}`}>
                        {paymentMethod === "clinic" && <CheckCircle2 size={16} strokeWidth={2.2} className="absolute -right-2 -top-2 fill-[#2563EB] text-white" />}
                        <Building2 size={13} strokeWidth={1.8} /> Pay by Clinic
                      </button>
                    </div>
                    <button type="button" className="mt-2.5 text-[10px] font-medium text-[#2563EB] transition-colors hover:text-[#1D4ED8]">+ Add credit card</button>
                    <p className="mt-2 text-[10px] text-[#7a837f]">Choose who will pay for this order.</p>
                  </div>
                  <div>
                    <p className="mb-3 text-[16px] font-medium text-[#181818]">Shipping</p>
                    <div className="flex flex-wrap gap-2">
                      <button type="button" onClick={() => setShipTo("patient")} className={`relative inline-flex h-9 items-center gap-2 rounded-[7px] border px-3 text-[11px] font-semibold transition-colors ${shipTo === "patient" ? "border-2 border-[#2563EB] bg-white text-[#171a20]" : "border-[#d8dedd] bg-white text-[#6f7782] hover:border-[#9fa8b5]"}`}>
                        {shipTo === "patient" && <CheckCircle2 size={16} strokeWidth={2.2} className="absolute -right-2 -top-2 fill-[#2563EB] text-white" />}
                        <User size={13} strokeWidth={1.8} /> Ship to Patient
                      </button>
                      <button type="button" onClick={() => setShipTo("clinic")} className={`relative inline-flex h-9 items-center gap-2 rounded-[7px] border px-3 text-[11px] font-semibold transition-colors ${shipTo === "clinic" ? "border-2 border-[#2563EB] bg-white text-[#171a20]" : "border-[#d8dedd] bg-white text-[#6f7782] hover:border-[#9fa8b5]"}`}>
                        {shipTo === "clinic" && <CheckCircle2 size={16} strokeWidth={2.2} className="absolute -right-2 -top-2 fill-[#2563EB] text-white" />}
                        <Building2 size={13} strokeWidth={1.8} /> Ship to Clinic
                      </button>
                    </div>
                    <p className="mt-2 text-[10px] text-[#7a837f]">{shipTo === "clinic" ? "You can select multiple patients for one clinic shipment." : "The order will be delivered to the patient address."}</p>
                  </div>
                </div>
              )}
              {!previewSubmitted && reviewVariant === "v2" && (
                <div className="space-y-6">
                  <div>
                    <p className="text-[17px] font-semibold leading-[22px] text-[#171717]">Who will pay?</p>
                    <p className="mb-3 mt-1 text-[10px] text-[#7d838d]">Select the payment method for this order.</p>
                    <div className="space-y-2">
                      {([['patient', 'Pay by Patient', 'The patient receives a secure payment link.'], ['clinic', 'Pay by Clinic', "Use the clinic's saved payment method."]] as const).map(([value, title, description]) => {
                        const selected = paymentMethod === value;
                        return (
                          <button key={value} type="button" onClick={() => setPaymentMethod(value)} className={`flex min-h-[68px] w-full items-center gap-3 rounded-[10px] border px-4 py-3 text-left transition-all duration-200 ${selected ? "border-[#4aa9ed] bg-[#e9f7ff] shadow-[0_5px_14px_rgba(37,99,235,0.10)]" : "border-[#e0e2e5] bg-white hover:border-[#b9cde0] hover:bg-[#fafcff]"}`}>
                            <span className="min-w-0 flex-1"><span className="block text-[12px] font-semibold text-[#202124]">{title}</span><span className="mt-1 block text-[9px] text-[#777f8a]">{description}</span></span>
                            <span className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 ${selected ? "border-[#3b9ee8]" : "border-[#d2d5da]"}`}>{selected && <span className="size-2.5 rounded-full bg-[#3b9ee8]" />}</span>
                          </button>
                        );
                      })}
                    </div>
                    <button type="button" className="mt-2.5 text-[10px] font-medium text-[#2563eb] hover:text-[#1d4ed8]">+ Add credit card</button>
                  </div>
                  <div>
                    <p className="text-[17px] font-semibold leading-[22px] text-[#171717]">Where should we ship?</p>
                    <p className="mb-3 mt-1 text-[10px] text-[#7d838d]">Select one delivery destination.</p>
                    <div className="space-y-2">
                      {([['patient', 'Ship to Patient', "Deliver directly to the patient's address."], ['clinic', 'Ship to Clinic', 'Send the complete order to the clinic.']] as const).map(([value, title, description]) => {
                        const selected = shipTo === value;
                        return (
                          <button key={value} type="button" onClick={() => setShipTo(value)} className={`flex min-h-[68px] w-full items-center gap-3 rounded-[10px] border px-4 py-3 text-left transition-all duration-200 ${selected ? "border-[#4aa9ed] bg-[#e9f7ff] shadow-[0_5px_14px_rgba(37,99,235,0.10)]" : "border-[#e0e2e5] bg-white hover:border-[#b9cde0] hover:bg-[#fafcff]"}`}>
                            <span className="min-w-0 flex-1"><span className="block text-[12px] font-semibold text-[#202124]">{title}</span><span className="mt-1 block text-[9px] text-[#777f8a]">{description}</span></span>
                            <span className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 ${selected ? "border-[#3b9ee8]" : "border-[#d2d5da]"}`}>{selected && <span className="size-2.5 rounded-full bg-[#3b9ee8]" />}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
              <div className={previewSubmitted || reviewVariant !== "current" ? "hidden" : ""}>
                <div>
                  <p className="text-[13px] font-semibold text-[#171717]">Payment</p>
                  <p className="mt-0.5 text-[10px] text-[#8c8c8c]">{previewSubmitted ? "Payment method used for this order" : "Select the payment method for the prescription"}</p>
                </div>
                {previewSubmitted ? (
                  <div className="mt-3 inline-flex h-9 items-center gap-2 rounded-full border border-[#dce8df] bg-[#f7faf8] px-3 text-[12px] font-semibold text-[#183229]">
                    {paymentMethod === "patient" ? "Pay by Patient" : "Pay by Clinic"} {paymentMethod === "patient" ? <User size={13} /> : <Building2 size={13} />}
                  </div>
                ) : (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      onClick={() => setPaymentMethod("patient")}
                      className={`inline-flex h-9 items-center gap-2 rounded-full border px-3 text-[12px] font-semibold transition-colors ${
                        paymentMethod === "patient"
                          ? "border-[#2563EB] bg-[#EFF6FF] text-[#1D4ED8]"
                          : "border-[#d8dfdc] bg-white text-[#6f7782] hover:border-[#183229]/45"
                      }`}
                    >
                      Pay by Patient <User size={13} />
                    </button>
                    <button
                      onClick={() => setPaymentMethod("clinic")}
                      className={`inline-flex h-9 items-center gap-2 rounded-full border px-3 text-[12px] font-semibold transition-colors ${
                        paymentMethod === "clinic"
                          ? "border-[#2563EB] bg-[#EFF6FF] text-[#1D4ED8]"
                          : "border-[#d8dfdc] bg-white text-[#6f7782] hover:border-[#183229]/45"
                      }`}
                    >
                      Pay by Clinic <Building2 size={13} />
                    </button>
                    <button className="inline-flex h-9 items-center gap-1.5 rounded-full border border-dashed border-[#2563EB] bg-white px-3 text-[12px] font-semibold text-[#2563EB] transition-colors hover:bg-[#EFF6FF]">
                      <Plus size={13} /> Credit Card
                    </button>
                  </div>
                )}
              </div>

              <div className={previewSubmitted || reviewVariant !== "current" ? "hidden" : "mt-5 border-t border-[#eee8e3] pt-5"}>
                <div>
                  <p className="text-[13px] font-semibold text-[#171717]">Shipping</p>
                  <p className="mt-0.5 text-[10px] text-[#8c8c8c]">{previewSubmitted ? "Shipping destination for this order" : "Choose where to ship the prescription"}</p>
                </div>
                {previewSubmitted ? (
                  <div className="mt-3 inline-flex h-9 items-center gap-2 rounded-full border border-[#dce8df] bg-[#f7faf8] px-3 text-[12px] font-semibold text-[#183229]">
                    {shipTo === "patient" ? "Ship to Patient" : "Ship to Clinic"} {shipTo === "patient" ? <User size={13} /> : <Building2 size={13} />}
                  </div>
                ) : (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      onClick={() => setShipTo("patient")}
                      className={`inline-flex h-9 items-center gap-2 rounded-full border px-3 text-[12px] font-semibold transition-colors ${
                        shipTo === "patient"
                          ? "border-[#2563EB] bg-[#EFF6FF] text-[#1D4ED8]"
                          : "border-[#d8dfdc] bg-white text-[#6f7782] hover:border-[#183229]/45"
                      }`}
                    >
                      Ship to Patient <User size={13} />
                    </button>
                    <button
                      onClick={() => setShipTo("clinic")}
                      className={`inline-flex h-9 items-center gap-2 rounded-full border px-3 text-[12px] font-semibold transition-colors ${
                        shipTo === "clinic"
                          ? "border-[#2563EB] bg-[#EFF6FF] text-[#1D4ED8]"
                          : "border-[#d8dfdc] bg-white text-[#6f7782] hover:border-[#183229]/45"
                      }`}
                    >
                      Ship to Clinic <Building2 size={13} />
                    </button>
                  </div>
                )}
              </div>
            </section>

            <section className={previewSubmitted ? "hidden" : "py-5"}>
              <h3 className="mb-4 text-[16px] font-medium text-[#181818]">Summary</h3>
              <div className="space-y-3 text-[13px]">
                <div className="flex justify-between text-[#222]"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-[#222]"><span>Estimated Shipping &amp; Handling</span><span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span></div>
                <div className="flex justify-between border-y border-[#ededed] py-4 text-[14px] font-semibold text-[#1a1a1a]"><span>Total</span><span>${total.toFixed(2)}</span></div>
              </div>
            </section>

              <div className="sticky bottom-0 -mx-5 mt-2 border-t border-[#eee8e3] bg-white/95 px-5 py-4 backdrop-blur">
                <p className="rounded-[10px] bg-[#fbfaf8] px-3 py-3 text-[11px] leading-[16px] text-[#333]">Multi-Patient Orders can only be shipped to Clinic's address.</p>
                <div className="mt-4">
                  <CheckoutSubmissionFooter
                    state={previewSubmissionState}
                    submitLabel="Review and submit"
                    onSubmit={() => {
                      setPreviewSubmissionState("submitting");
                      window.setTimeout(() => setPreviewSubmissionState("submitted"), 2000);
                    }}
                    onGoToOrders={() => onNavigate("orders")}
                  />
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}
      {sigBuilderItemId !== null && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/40 p-5 backdrop-blur-[2px]">
          <button type="button" className="absolute inset-0 cursor-default" onClick={() => setSigBuilderItemId(null)} aria-label="Close SIG Builder" />
          <section className="relative z-10 max-h-[92vh] w-full max-w-[840px] overflow-y-auto rounded-[10px] bg-[#fbfbfb] shadow-[0_24px_70px_rgba(0,0,0,0.2)]">
            <div className="flex items-start justify-between gap-4 border-b border-[#ededed] bg-white px-6 py-5">
              <div className="min-w-0"><div className="flex items-center gap-2"><h2 className="text-[18px] font-semibold text-[#171717]">Build directions</h2><span className="rounded-full bg-[#f1f1f1] px-2 py-1 text-[9px] font-semibold text-[#555]">SIG Builder</span></div><p className="mt-1 truncate text-[11px] text-[#667085]">{activeSigItem?.name ?? "Prescription"} · Complete the required dose instructions below.</p></div>
              <button type="button" onClick={() => setSigBuilderItemId(null)} className="mt-0.5 text-[#777] hover:text-black" aria-label="Close"><X size={19} /></button>
            </div>
            <div className="grid lg:grid-cols-[minmax(0,1fr)_300px]">
              <div className="grid content-start gap-4 bg-white px-6 py-5 sm:grid-cols-2">
                <div className="flex items-center justify-between sm:col-span-2"><p className="text-[11px] font-semibold text-[#171717]">Dose instructions</p><p className="text-[9px] text-[#8a8a8a]"><span className="text-[#b44b42]">*</span> Required</p></div>
                <label><span className="mb-1.5 block text-[11px] font-semibold text-[#171717]">Action</span><select value={sigBuilder.action} onChange={event => setSigBuilder(current => ({ ...current, action: event.target.value }))} className="h-[34px] w-full rounded-[8px] border border-[#EAE8E1] bg-white px-3 text-[12px] outline-none focus:border-[#183229]"><option>Inject</option><option>Take</option><option>Apply</option><option>Administer</option></select></label>
                <label><span className="mb-1.5 block text-[11px] font-semibold text-[#171717]">Route</span><select value={sigBuilder.route} onChange={event => setSigBuilder(current => ({ ...current, route: event.target.value }))} className="h-[34px] w-full rounded-[8px] border border-[#EAE8E1] bg-white px-3 text-[12px] outline-none focus:border-[#183229]"><option value="intramuscularly">Intramuscular (IM)</option><option value="subcutaneously">Subcutaneous (SQ)</option><option value="intravenously">Intravenous (IV)</option><option value="orally">Oral</option></select></label>
                <label><span className="mb-1.5 block text-[11px] font-semibold text-[#171717]">Dose <span className="text-[#b44b42]">*</span></span><input autoFocus value={sigBuilder.dose} onChange={event => setSigBuilder(current => ({ ...current, dose: event.target.value }))} placeholder="Amount" className={"h-[34px] w-full rounded-[8px] border px-3 text-[12px] outline-none " + requiredFieldClass(sigBuilder.dose)} /></label>
                <label><span className="mb-1.5 block text-[11px] font-semibold text-[#171717]">Unit</span><select value={sigBuilder.unit} onChange={event => setSigBuilder(current => ({ ...current, unit: event.target.value }))} className="h-[34px] w-full rounded-[8px] border border-[#EAE8E1] bg-white px-3 text-[12px] outline-none focus:border-[#183229]"><option>units</option><option>mg</option><option>mL</option><option>mcg</option><option>tablet(s)</option></select></label>
                <label><span className="mb-1.5 block text-[11px] font-semibold text-[#171717]">Frequency <span className="text-[#b44b42]">*</span></span><select value={sigBuilder.frequency} onChange={event => setSigBuilder(current => ({ ...current, frequency: event.target.value }))} className={"h-[34px] w-full rounded-[8px] border px-3 text-[12px] outline-none " + requiredFieldClass(sigBuilder.frequency)}><option value="" disabled>How often</option><option>once daily</option><option>twice daily</option><option>once weekly</option><option>twice weekly</option><option>as directed</option></select></label>
                <label><span className="mb-1.5 block text-[11px] font-semibold text-[#171717]">Timing <span className="font-normal text-[#8a8a8a]">optional</span></span><select value={sigBuilder.timing} onChange={event => setSigBuilder(current => ({ ...current, timing: event.target.value }))} className="h-[34px] w-full rounded-[8px] border border-[#EAE8E1] bg-white px-3 text-[12px] outline-none focus:border-[#183229]"><option>Any time</option><option>In the morning</option><option>In the evening</option><option>At bedtime</option><option>Before meals</option><option>After meals</option></select></label>
                <div className="sm:col-span-2"><p className="mb-2 text-[11px] font-semibold text-[#171717]">Injection sites <span className="font-normal text-[#8a8a8a]">optional</span></p><div className="flex flex-wrap gap-2">{["Abdomen", "Thigh", "Upper Arm", "Buttock"].map(site => <button key={site} type="button" onClick={() => toggleSigSite(site)} className={`h-8 rounded-full border px-3 text-[10px] font-medium transition-colors ${sigBuilder.sites.includes(site) ? "border-black bg-black text-white" : "border-[#EAE8E1] bg-white text-[#344054] hover:bg-[#f1f1f1]"}`}>{site}</button>)}</div></div>
              </div>
              <aside className="m-4 rounded-[12px] border border-white/80 bg-[radial-gradient(circle_at_100%_0%,rgba(147,197,253,0.42),transparent_48%),linear-gradient(145deg,#f8fbff_0%,#eaf2ff_100%)] px-4 py-4 shadow-[0_10px_28px_rgba(37,99,235,0.08)]">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-8 items-center justify-center rounded-full bg-white/80 text-[#2563EB] shadow-[0_4px_14px_rgba(37,99,235,0.12)]"><CheckCircle2 size={16} /></span>
                    <div><p className="text-[12px] font-semibold text-[#172554]">Live directions</p><p className="text-[9px] text-[#64748b]">Updates as you complete the fields</p></div>
                  </div>
                  <span className="rounded-full bg-white/70 px-2.5 py-1 text-[9px] font-semibold tracking-[0.08em] text-[#2563EB]">SIG</span>
                </div>
                <textarea value={resolvedSigDirections} onChange={event => setSigCustomDirections(event.target.value)} placeholder="Your completed directions will appear here after you enter the dose and frequency. You can edit them directly." className="mt-4 min-h-[180px] w-full resize-none rounded-[12px] border border-white/90 bg-white/80 px-4 py-4 text-[13px] leading-6 text-[#202938] outline-none shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_10px_26px_rgba(37,99,235,0.08)] backdrop-blur-sm placeholder:text-[#8491a6] focus:border-[#7F9EE3]" />
                <div className="mt-3 flex items-center justify-between text-[9px] text-[#718096]"><span>{resolvedSigDirections.trim() ? "Editable · Ready to save" : "Enter dose and frequency, or type directions"}</span><span>{resolvedSigDirections.length} characters</span></div>
              </aside>
            </div>
            <div className="sticky bottom-0 flex items-center justify-between gap-4 border-t border-[#ededed] bg-white/95 px-6 py-4 backdrop-blur">
              <p className="hidden text-[9px] text-[#777] sm:block">Review the live directions before saving.</p>
              <div className="ml-auto flex items-center gap-3"><button type="button" onClick={() => setSigBuilderItemId(null)} className="text-[11px] font-medium text-[#202020]">Cancel</button><button type="button" disabled={!resolvedSigDirections.trim()} onClick={applySigBuilder} className="h-[35px] min-w-[120px] rounded-full bg-black px-5 text-[11px] font-semibold text-white hover:bg-[#121212] disabled:cursor-not-allowed disabled:bg-[#e5e5e5] disabled:text-[#999]">Save directions</button></div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

function CheckoutPrescriptionPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewSubmissionState, setReviewSubmissionState] = useState<CheckoutSubmissionState>("idle");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ "altin-rx": true });
  const [shippingMethod, setShippingMethod] = useState<"ups" | "fedex">("ups");

  const patient = {
    name: "Altin Selimi",
    dob: "05/01/1986",
    phone: "+1 (646) 389-7766",
    email: "altin.selimi@example.com",
    identification: "NY:23444244343 (State-Issued ID)",
    address: "2823 Middletown Road\nThe Bronx, NY 10461",
  };

  const prescriptions = [
    {
      id: "altin-rx",
      patientName: "Altin Selimi",
      name: "Tirzepatide/Pyridoxine (B6)",
      detail: "20mg/25mg/mL | 1 (0.5mL) Vial",
      price: 125.43,
      qty: 1,
      badge: null,
      details: [
        ["Strength", "20mg/25mg/mL"],
        ["Format", "0.5mL vial"],
        ["Supply", "30 days"],
        ["Directions", "Inject 0.5mL subcutaneously once weekly as directed."],
      ],
      pharmacy: [
        ["Name", "Optimal Balance Pharmacy"],
        ["Phone", "800-518-9831"],
        ["Fax", "800-537-5193"],
        ["Address", "2823 Middletown Road\nThe Bronx, NY 10461"],
      ],
    },
    {
      id: "altin-supply",
      patientName: "Altin Selimi",
      name: "BD 27G X 1/2 Needle Only",
      detail: "1 Needle",
      price: 0,
      qty: 1,
      badge: "Supplies",
      details: [
        ["Format", "Needle"],
        ["Quantity", "1"],
        ["Supply", "Included with prescription"],
        ["Directions", "Use with prescribed injection."],
      ],
      pharmacy: [
        ["Name", "Optimal Balance Pharmacy"],
        ["Phone", "800-518-9831"],
        ["Fax", "800-537-5193"],
        ["Address", "2823 Middletown Road\nThe Bronx, NY 10461"],
      ],
    },
    {
      id: "jane-rx",
      patientName: "Jane Doe",
      name: "Tirzepatide/Pyridoxine (B6)",
      detail: "20mg/25mg/mL | 1 (0.5mL) Vial",
      price: 125.43,
      qty: 1,
      badge: null,
      details: [
        ["Strength", "20mg/25mg/mL"],
        ["Format", "0.5mL vial"],
        ["Supply", "30 days"],
        ["Directions", "Inject 0.5mL subcutaneously once weekly as directed."],
      ],
      pharmacy: [
        ["Name", "Optimal Balance Pharmacy"],
        ["Phone", "800-518-9831"],
        ["Fax", "800-537-5193"],
        ["Address", "2823 Middletown Road\nThe Bronx, NY 10461"],
      ],
    },
    {
      id: "jane-supply",
      patientName: "Jane Doe",
      name: "BD 27G X 1/2 Needle Only",
      detail: "1 Needle",
      price: 0,
      qty: 1,
      badge: "Supplies",
      details: [
        ["Format", "Needle"],
        ["Quantity", "1"],
        ["Supply", "Included with prescription"],
        ["Directions", "Use with prescribed injection."],
      ],
      pharmacy: [
        ["Name", "Optimal Balance Pharmacy"],
        ["Phone", "800-518-9831"],
        ["Fax", "800-537-5193"],
        ["Address", "2823 Middletown Road\nThe Bronx, NY 10461"],
      ],
    },
  ];

  const subtotal = prescriptions.reduce((sum, rx) => sum + rx.price * rx.qty, 0);
  const shipping = shippingMethod === "ups" ? 35 : 35;
  const total = subtotal + shipping;

  function ProductThumb({ badge }: { badge: string | null }) {
    if (badge) {
      return (
        <div className="flex size-11 items-center justify-center rounded-[8px] border border-[#eee] bg-[#f6f4f5]">
          <Syringe size={16} className="text-[#183229]" />
        </div>
      );
    }
    return (
      <div className="flex size-11 items-center justify-center overflow-hidden rounded-[8px] border border-[#eee] bg-gradient-to-b from-[#f7efe9] to-[#ece5b6]/45">
        <img src={blankVialReference} alt="" className="h-12 w-12 object-contain mix-blend-multiply" />
      </div>
    );
  }

  function PrescriptionCard({ rx }: { rx: (typeof prescriptions)[number] }) {
    const isOpen = expanded[rx.id] ?? false;
    return (
      <article className="rounded-[10px] border border-[#e8e3df] bg-white p-4 shadow-sm transition-colors hover:bg-[var(--app-soft-hover)]">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 gap-3">
            <ProductThumb badge={rx.badge} />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-[14px] font-semibold leading-snug text-[#1a1a1a]">{rx.name}</h3>
                {rx.badge && <span className="rounded-[5px] bg-[#eef0f2] px-2 py-0.5 text-[10px] font-semibold text-[#667085]">{rx.badge}</span>}
              </div>
              <p className="mt-1 text-[12px] text-[#6f7782]">{rx.detail}</p>
              <p className="mt-1 text-[11px] font-medium text-[#8c95a1]">For {rx.patientName}</p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-2 text-[#183229]">
            <button className="flex size-8 items-center justify-center rounded-[7px] hover:bg-[#f2f7f4]" aria-label="Edit prescription"><Edit3 size={15} /></button>
            <button className="flex size-8 items-center justify-center rounded-[7px] hover:bg-[#f2f7f4]" aria-label="Remove prescription"><XCircle size={16} /></button>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-[14px] text-[#1a1a1a]">
          <span className="font-bold">{rx.price === 0 ? "Free" : `$${rx.price.toFixed(2)}`}</span>
          <span>x</span>
          <div className="inline-flex h-8 items-center overflow-hidden rounded-[8px] bg-[#eef0f2]">
            <button className="flex h-8 w-8 items-center justify-center text-[#183229]"><Minus size={13} /></button>
            <span className="flex h-8 min-w-8 items-center justify-center text-[13px] font-semibold">{rx.qty}</span>
            <button className="flex h-8 w-8 items-center justify-center text-[#183229]"><Plus size={13} /></button>
          </div>
        </div>

        <div className="mt-4 border-t border-[#eee8e3] pt-3">
          <button onClick={() => setExpanded((prev) => ({ ...prev, [rx.id]: !isOpen }))} className="flex items-center gap-1.5 text-[12px] font-semibold text-[#1a1a1a]">
            <ChevronDown size={14} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
            {isOpen ? "Hide details" : "Show details"}
          </button>
          {isOpen && (
            <div className="mt-3 grid gap-4 border-t border-[#f1ede9] pt-3 md:grid-cols-2">
              <div className="grid grid-cols-[92px_minmax(0,1fr)] gap-y-2 text-[12px]">
                {rx.details.map(([label, value]) => <div key={label} className="contents"><span className="font-semibold text-[#6f7782]">{label}</span><span className="text-[#1a1a1a]">{value}</span></div>)}
              </div>
              <div className="grid grid-cols-[92px_minmax(0,1fr)] gap-y-2 text-[12px]">
                {rx.pharmacy.map(([label, value]) => <div key={label} className="contents"><span className="font-semibold text-[#6f7782]">{label}</span><span className="whitespace-pre-line text-[#1a1a1a]">{value}</span></div>)}
              </div>
            </div>
          )}
        </div>
      </article>
    );
  }

  return (
    <div className="-m-8 min-h-screen bg-[var(--app-soft-hover)] px-6 py-8">
      <div className="mx-auto max-w-[940px]">
        <div className="flex items-center gap-3">
          <PageBackButton onClick={() => onNavigate("cart-multi")} label="Back to cart" />
          <h1 className="text-[30px] font-semibold tracking-[-0.01em] text-[#1a1a1a]">New Prescription Order</h1>
        </div>

        <section className="mt-10">
          <h2 className="border-b border-[#e8e3df] pb-2 text-[16px] font-semibold text-[#1a1a1a]">Patient</h2>
          <div className="mt-4 grid gap-5 rounded-[12px] border border-[#e8e3df] bg-white p-5 shadow-sm md:grid-cols-2">
            <div className="grid grid-cols-[104px_minmax(0,1fr)] gap-y-2 text-[13px]">
              <span className="font-semibold text-[#1a1a1a]">Name</span><span className="text-[#6f7782]">{patient.name}</span>
              <span className="font-semibold text-[#1a1a1a]">DoB</span><span className="text-[#6f7782]">{patient.dob}</span>
              <span className="font-semibold text-[#1a1a1a]">Phone</span><span className="text-[#6f7782]">{patient.phone}</span>
              <span className="font-semibold text-[#1a1a1a]">Email</span><span className="text-[#6f7782] underline">{patient.email}</span>
              <span className="font-semibold text-[#1a1a1a]">Identification</span><span className="text-[#6f7782]">{patient.identification}</span>
            </div>
            <div className="grid grid-cols-[104px_minmax(0,1fr)] gap-y-2 self-start text-[13px]">
              <span className="font-semibold text-[#1a1a1a]">Address</span>
              <span className="whitespace-pre-line text-[#6f7782]">{patient.address}</span>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="border-b border-[#e8e3df] pb-2 text-[16px] font-semibold text-[#1a1a1a]">Prescriptions</h2>
          <div className="mt-4 flex flex-col gap-3">
            {prescriptions.map((rx) => <PrescriptionCard key={rx.id} rx={rx} />)}
          </div>
          <button className="mt-4 flex h-10 items-center gap-2 rounded-[8px] border border-[#183229] bg-white px-4 text-[13px] font-semibold text-[#183229] transition-colors hover:bg-[#f2f7f4]">
            <Plus size={16} /> Add another prescription
          </button>
        </section>

        <section className="mt-8 pb-20">
          <h2 className="border-b border-[#e8e3df] pb-2 text-[16px] font-semibold text-[#1a1a1a]">Shipping</h2>
          <div className="mt-4 rounded-[12px] border border-[#e8e3df] bg-white p-5 shadow-sm">
            <p className="text-[13px] font-semibold text-[#1a1a1a]">Shipping method</p>
            <p className="mt-1 max-w-[760px] text-[12px] leading-relaxed text-[#6f7782]">Shipping time covers transit only. Pharmacy processing may take up to 3-5 business days, and pharmacies do not ship on weekends.</p>
            <div className="mt-4 flex flex-col gap-3">
              {[
                { id: "ups" as const, price: "$35.00", label: "UPS Next Day Air (Priority)" },
                { id: "fedex" as const, price: "$35.00", label: "FedEx Standard Overnight" },
              ].map((option) => (
                <button key={option.id} onClick={() => setShippingMethod(option.id)} className={`flex min-h-14 items-center gap-4 rounded-[9px] border px-4 text-left transition-colors ${shippingMethod === option.id ? "border-[#183229] bg-[#f2f7f4]" : "border-[#d8dfdc] bg-white hover:border-[#183229]/40"}`}>
                  <span className={`flex size-6 items-center justify-center rounded-full border ${shippingMethod === option.id ? "border-[#183229]" : "border-[#8c95a1]"}`}>{shippingMethod === option.id && <span className="size-3 rounded-full bg-[#183229]" />}</span>
                  <span className="text-[14px] font-bold text-[#1a1a1a]">{option.price}</span>
                  <span className="text-[14px] font-semibold text-[#1a1a1a]">{option.label}</span>
                </button>
              ))}
            </div>

            <label className="mt-5 flex flex-col gap-1">
              <span className="text-[13px] font-semibold text-[#1a1a1a]">Ship to</span>
              <button className="flex h-11 items-center justify-between rounded-[8px] border border-[#d8dfdc] px-3 text-left text-[13px] text-[#1a1a1a]">
                ScriptLinkRx Demo - 2823 Middletown Road
                <ChevronDown size={15} className="text-[#6f7782]" />
              </button>
            </label>

            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => onNavigate("cart-multi")} className="h-10 rounded-[8px] border border-[#d8dfdc] bg-white px-4 text-[13px] font-semibold text-[#183229] transition-colors hover:bg-[#f2f7f4]">Cancel</button>
              <button onClick={() => { setReviewSubmissionState("idle"); setReviewOpen(true); }} className="h-10 rounded-[8px] bg-[#183229] px-5 text-[13px] font-semibold text-white transition-colors hover:bg-[#244438]">Review order</button>
            </div>
          </div>
        </section>
      </div>

      {reviewOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-[#1a1a1a]/35 backdrop-blur-[2px]">
          <button className="absolute inset-0 cursor-default" onClick={() => { setReviewOpen(false); setReviewSubmissionState("idle"); }} aria-label="Close review" />
          <aside className="relative h-full w-full max-w-[430px] overflow-auto border-l border-[#e8e3df] bg-white px-6 py-6 shadow-2xl">
            <button onClick={() => { setReviewOpen(false); setReviewSubmissionState("idle"); }} className="mb-6 flex size-8 items-center justify-center rounded-[7px] text-[#183229] hover:bg-[#f6f4f5]" aria-label="Close review"><XCircle size={18} /></button>
            <h2 className="text-[22px] font-semibold text-[#1a1a1a]">Review order</h2>

            <section className="mt-7">
              <h3 className="border-b border-[#eee8e3] pb-3 text-[15px] font-semibold text-[#1a1a1a]">Order for</h3>
              <div className="mt-4 rounded-[10px] border border-[#e8e3df] bg-[var(--app-soft-hover)] px-4 py-3">
                <p className="text-[13px] font-semibold text-[#1a1a1a]">{patient.name}</p>
                <p className="mt-1 whitespace-pre-line text-[12px] text-[#6f7782]">{patient.address}</p>
              </div>
            </section>

            <section className="mt-6">
              <h3 className="border-b border-[#eee8e3] pb-3 text-[15px] font-semibold text-[#1a1a1a]">Shipping to</h3>
              <div className="mt-4 rounded-[10px] border border-[#e8e3df] px-4 py-3">
                <p className="text-[13px] font-semibold text-[#1a1a1a]">ScriptLinkRx Demo</p>
                <p className="mt-1 text-[12px] leading-relaxed text-[#6f7782]">2823 Middletown Road<br />The Bronx, NY 10461</p>
              </div>
            </section>

            <section className="mt-6">
              <h3 className="border-b border-[#eee8e3] pb-3 text-[15px] font-semibold text-[#1a1a1a]">Prescriptions</h3>
              <div className="mt-4 flex flex-col gap-3">
                {prescriptions.map((rx) => (
                  <div key={rx.id} className="rounded-[10px] border border-[#e8e3df] px-4 py-4">
                    <div className="flex justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-[13px] font-semibold text-[#1a1a1a]">{rx.name}</p>
                          {rx.badge && <span className="rounded-[5px] bg-[#eef0f2] px-1.5 py-0.5 text-[9px] font-semibold text-[#667085]">{rx.badge}</span>}
                        </div>
                        <p className="mt-1 text-[12px] text-[#6f7782]">{rx.detail}</p>
                        <p className="mt-1 text-[11px] text-[#8c95a1]">{rx.patientName}</p>
                      </div>
                      <p className="text-[13px] font-semibold text-[#1a1a1a]">{rx.price === 0 ? "Free" : `$${(rx.price * rx.qty).toFixed(2)}`}</p>
                    </div>
                    <div className="mt-3 inline-flex h-8 items-center overflow-hidden rounded-[8px] bg-[#eef0f2]">
                      <button className="flex h-8 w-8 items-center justify-center text-[#183229]"><Minus size={13} /></button>
                      <span className="flex h-8 min-w-8 items-center justify-center text-[13px] font-semibold">{rx.qty}</span>
                      <button className="flex h-8 w-8 items-center justify-center text-[#183229]"><Plus size={13} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-6">
              <h3 className="border-b border-[#eee8e3] pb-3 text-[15px] font-semibold text-[#1a1a1a]">Summary</h3>
              <div className="mt-4 space-y-3 text-[14px]">
                <div className="flex justify-between text-[#6f7782]"><span>Subtotal</span><span className="font-semibold text-[#1a1a1a]">${subtotal.toFixed(2)}</span></div>
                <div className="flex justify-between text-[#6f7782]"><span>Shipping</span><span className="font-semibold text-[#1a1a1a]">${shipping.toFixed(2)}</span></div>
                <div className="flex justify-between border-t border-[#eee8e3] pt-4 font-bold text-[#1a1a1a]"><span>Total</span><span className="text-[#183229]">${total.toFixed(2)}</span></div>
              </div>
            </section>

            <div className="sticky bottom-0 -mx-6 mt-8 border-t border-[#eee8e3] bg-white px-6 py-4">
              <CheckoutSubmissionFooter
                state={reviewSubmissionState}
                submitLabel="Submit and pay"
                onEdit={() => { setReviewOpen(false); setReviewSubmissionState("idle"); }}
                onSubmit={() => {
                  setReviewSubmissionState("submitting");
                  window.setTimeout(() => setReviewSubmissionState("submitted"), 2000);
                }}
                onGoToOrders={() => onNavigate("orders")}
              />
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

function LoginPage({ onLogin, onRegister, onSingleSignOn, onBackToLanding }: { onLogin: (destination: "business" | "setup" | "catalog") => void; onRegister: () => void; onSingleSignOn: () => void; onBackToLanding: () => void }) {
  const [loginRole, setLoginRole] = useState<"provider" | "pharmacy">("provider");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  function submitLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!password.trim()) {
      setLoginError("");
      onLogin("catalog");
      return;
    }
    if (password !== "test123" && password !== "12345") {
      setLoginError("Incorrect password. Please try again.");
      return;
    }
    setLoginError("");
    onLogin(password === "test123" ? "business" : "setup");
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-white font-['Inter',sans-serif] text-[#1a1a1a]">
      <div className={`pointer-events-none absolute inset-0 ${loginRole === "pharmacy" ? "bg-[radial-gradient(ellipse_72%_82%_at_50%_0%,#ffe1e5_0%,#ffedf0_30%,#fff5f6_52%,#fffafa_70%,#ffffff_88%)]" : "bg-[radial-gradient(ellipse_72%_82%_at_50%_0%,#dce9ff_0%,#eaf2ff_30%,#f4f8ff_52%,#fbfdff_70%,#ffffff_88%)]"}`} />
      <div className="relative mx-auto flex min-h-screen w-full max-w-[620px] flex-col items-center px-6 pt-7">
        <button type="button" onClick={onBackToLanding} className="flex min-h-[42px] cursor-pointer items-center gap-2.5 rounded-[8px] px-2 py-1 transition-opacity hover:opacity-70" aria-label="Return to landing page">
          {loginRole === "pharmacy" ? (
            <img src={maxrxLogo} alt="MaxRx" className="h-[38px] w-auto object-contain" />
          ) : (
            <><img src={scriptlinkrxLogo} alt="ScriptLinkRx" className="h-[30px] w-9 object-contain" /><span className="font-['Poppins',sans-serif] text-[18px] font-semibold uppercase tracking-wide text-[#183229]">S<span className="lowercase">CRIPTLINKrx</span></span></>
          )}
        </button>

        <section className="mt-[110px] w-full max-w-[430px] text-center">
          <h1 className="text-[48px] font-semibold leading-none tracking-[-0.02em] text-[#1a1a1a]">
            Welcome back
          </h1>
          <p className="mt-5 text-[15px] text-[#1a1a1a]">Let’s get you logged in.</p>

          <form onSubmit={submitLogin} className="mt-8">
            <label className="block text-left">
              <span className="text-[13px] font-medium text-[#1a1a1a]">Email address</span>
              <input
                type="email"
                value={loginRole === "provider" ? "demo@scriptlinkrx.com" : "pharmacy@scriptlinkrx.com"}
                readOnly
                className="mt-2 h-[52px] w-full rounded-[8px] border border-[#1a1a1a] bg-white px-4 text-[13px] font-medium text-[#1a1a1a] outline-none placeholder:text-[#6f7782] focus:border-[#183229]"
                placeholder="Email"
              />
            </label>
            <label className="mt-4 block text-left">
              <span className="text-[13px] font-medium text-[#1a1a1a]">Password</span>
              <div className="mt-2 flex h-[52px] items-center rounded-[8px] border border-[#1a1a1a] bg-white px-4 focus-within:border-[#183229]">
                <input
                  type="password"
                  value={password}
                  onChange={event => { setPassword(event.target.value); if (loginError) setLoginError(""); }}
                  className="min-w-0 flex-1 bg-transparent text-[13px] font-medium text-[#1a1a1a] outline-none placeholder:text-[#6f7782]"
                  placeholder="Password"
                />
                <Eye size={17} className="text-[#6f7782]" />
              </div>
            </label>
            {loginError && <p className="mt-2 text-left text-[11px] font-medium text-[#c94f43]">{loginError}</p>}
            <button type="submit" className="mt-3 flex h-[46px] w-full items-center justify-center rounded-[999px] bg-[#1a1a1a] text-[13px] font-semibold text-white transition-colors hover:bg-[#121212]">
              Continue to log in
            </button>
          </form>

          <div className="my-8 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <span className="h-px bg-[#1a1a1a]/45" />
            <span className="text-[12px] text-[#6f7782]">Or other log-in options</span>
            <span className="h-px bg-[#1a1a1a]/45" />
          </div>

          <button
            onClick={onSingleSignOn}
            className="flex h-[48px] w-full items-center justify-center gap-5 rounded-[999px] border border-[#cfd6d2] bg-white text-[14px] font-semibold text-[#1a1a1a] transition-colors hover:border-[#183229]/50 hover:bg-[#fbfaf8]"
          >
            Sign in with Single-Sign-On Link
          </button>

          <div className="mt-7 space-y-3 text-[12px] font-medium text-[#6f7782]">
            <p>
              Don't have an account?{" "}
              <button type="button" onClick={onRegister} className="inline cursor-pointer align-baseline text-[12px] font-medium leading-none text-[#6f7782] transition-colors hover:text-[#1a1a1a]">
                Register here
              </button>
            </p>
            <p>
              Are you a MaxRx user?{" "}
              <button type="button" onClick={() => setLoginRole("pharmacy")} className="inline cursor-pointer align-baseline text-[12px] font-medium leading-none text-[#6f7782] transition-colors hover:text-[#1a1a1a]">
                Login here
              </button>
            </p>
          </div>

          <button type="button" className="mt-8 text-[12px] font-semibold text-[#1a1a1a] underline underline-offset-4 hover:text-[#183229]">
            Forgot password?
          </button>
        </section>
      </div>
    </main>
  );
}

function BusinessSelectionPage({ onSelect, onBack }: { onSelect: (business: string) => void; onBack: () => void }) {
  const [selectedBusiness, setSelectedBusiness] = useState<string | null>(null);
  const businesses = [
    { name: "Shpend Clinic", location: "Bronx, NY" },
    { name: "ScriptLinkRx Demo", location: "Bronx, NY" },
  ];

  if (selectedBusiness) {
    return (
      <PharmacyCheckout
        pharmacy={{
          name: selectedBusiness,
          location: "Bronx, NY",
          turnaround: "1-2 Days",
          products: 42,
          rating: 4.9,
          status: "Active",
          phone: "+1 (718) 555-0124",
        }}
        onClose={() => setSelectedBusiness(null)}
        onGoHome={() => onSelect(selectedBusiness)}
      />
    );
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#fafafa] px-5 py-10 font-['Inter',sans-serif] text-[#171717]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_50%_0%,rgba(219,232,255,0.9),rgba(237,244,255,0.55)_38%,rgba(250,250,250,0)_76%)]" />
      <div className="relative w-full max-w-[520px]">
        <div className="mb-5 flex items-center justify-center gap-2.5">
            <img src={scriptlinkrxLogo} alt="ScriptLinkRx" className="h-[26px] w-8 object-contain" />
            <span className="font-['Poppins',sans-serif] text-[14px] font-semibold uppercase tracking-wide text-[#183229]">S<span className="lowercase">CRIPTLINKrx</span></span>
        </div>
        <section className="w-full overflow-hidden rounded-[10px] border border-white/80 bg-white/65 shadow-[0_20px_60px_rgba(25,35,50,0.12)] backdrop-blur-[18px]">
        <div className="border-b border-white/70 px-6 pb-6 pt-11 text-center">
          <h1 className="text-[22px] font-semibold tracking-[-0.03em]">Select a business</h1>
          <p className="mt-1.5 text-[12px] leading-5 text-[#6f7782]">Choose the business you want to access for this session.</p>
        </div>
        <div className="space-y-3 p-6">
          {businesses.map(business => (
            <button key={business.name} type="button" onClick={() => setSelectedBusiness(business.name)} className="group flex w-full items-center gap-3 rounded-[10px] border border-[#e2e4e8] bg-white px-4 py-4 text-left transition-colors hover:border-[#c7d7f7] hover:bg-[#f5f8ff]">
              <span className="min-w-0 flex-1"><span className="block text-[14px] font-semibold text-[#171717]">{business.name}</span><span className="mt-1 block text-[11px] text-[#737b88]">{business.location}</span></span>
              <ChevronRight size={17} className="text-[#a2a8b1] transition-transform group-hover:translate-x-0.5 group-hover:text-[#2563EB]" />
            </button>
          ))}
          <button type="button" onClick={onBack} className="h-10 w-full rounded-full bg-white text-[12px] font-semibold text-[#171A18] transition-colors hover:bg-[#f1f1f1]">Cancel</button>
        </div>
        </section>
      </div>
    </main>
  );
}

function OrganizationSetupPage({ onCreate }: { onCreate: () => void }) {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [visiblePassword, setVisiblePassword] = useState<"current" | "new" | "confirm" | null>(null);

  function submitOrganization(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (currentPassword !== "12345") {
      setPasswordError("Current password is incorrect.");
      return;
    }
    if (newPassword.length < 2) {
      setPasswordError("New password must be at least 2 characters long.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.");
      return;
    }
    setPasswordError("");
    setCurrentStep(2);
  }

  const canContinue = currentPassword.length > 0 && newPassword.length >= 2 && confirmPassword.length > 0;
  const stepContent: Record<typeof currentStep, { title: string; subtitle: string }> = {
    1: {
      title: "Set Your Password",
      subtitle: "Create a secure password for your account. You'll use this to log in.",
    },
    2: {
      title: "Confirm Your Profile Details",
      subtitle: "Please review and confirm your professional information.",
    },
    3: {
      title: "Provider Credentials",
      subtitle: "Please provide your professional credentials.",
    },
    4: {
      title: "Set Your Digital Signature",
      subtitle: "Draw your signature below. This will be used on your prescriptions.",
    },
    5: {
      title: "Add Pay by Clinic Card",
      subtitle: "Add a credit card for subscription and payment processing.",
    },
  };
  const activeStepContent = stepContent[currentStep];

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-6 py-10 font-['Inter',sans-serif] text-[#171717]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_50%_0%,rgba(219,232,255,0.9),rgba(237,244,255,0.55)_38%,rgba(255,255,255,0)_76%)]" />
      <section className="relative w-full max-w-[470px] px-5 py-8">
        <div className="mx-auto w-full">
          <div className="mb-5 flex items-center justify-center gap-2.5">
            <img src={scriptlinkrxLogo} alt="ScriptLinkRx" className="h-[27px] w-8 object-contain" />
            <span className="font-['Poppins',sans-serif] text-[15px] font-semibold uppercase tracking-wide text-[#183229]">
              S<span className="lowercase">CRIPTLINKrx</span>
            </span>
          </div>

          <div className="rounded-[14px] border border-white/80 bg-white/65 px-7 py-8 shadow-[0_14px_40px_rgba(24,50,41,0.08)] backdrop-blur-[18px] sm:px-9">
            <div className="text-center">
              <h1 className="text-[21px] font-semibold tracking-[-0.025em]">{activeStepContent.title}</h1>
              <p className="mt-1.5 text-[11px] text-[#747c78]">{activeStepContent.subtitle}</p>
              <p className="mt-2.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#3974d8]">Step {currentStep} of 5</p>
            </div>

            <div className="my-6 h-px bg-[#eceeec]" />
            {currentStep === 1 ? <>
              <form onSubmit={submitOrganization} className="space-y-3.5">
              {[
                { id: "current" as const, label: "Current Password", value: currentPassword, setValue: setCurrentPassword, placeholder: "Enter your current password" },
                { id: "new" as const, label: "New Password", value: newPassword, setValue: setNewPassword, placeholder: "Enter your new password" },
                { id: "confirm" as const, label: "Confirm New Password", value: confirmPassword, setValue: setConfirmPassword, placeholder: "Re-enter your new password" },
              ].map(field => (
                <label key={field.id} className="block">
                  <span className="mb-1.5 block text-[11px] font-medium">{field.label} <span className="text-[#b4473d]">*</span></span>
                  <div className="flex h-10 items-center rounded-[8px] border border-[#d7dcda] bg-white px-3 focus-within:border-[1.5px] focus-within:border-[#183229]">
                    <input type={visiblePassword === field.id ? "text" : "password"} value={field.value} onChange={event => { field.setValue(event.target.value); if (passwordError) setPasswordError(""); }} placeholder={field.placeholder} className="min-w-0 flex-1 bg-transparent text-[12px] outline-none placeholder:text-[#a3aaa6]" />
                    <button type="button" onClick={() => setVisiblePassword(current => current === field.id ? null : field.id)} className="text-[#7d8581]" aria-label={`Show ${field.label.toLowerCase()}`}><Eye size={14} /></button>
                  </div>
                  {field.id === "new" && <span className="mt-1 block text-[9px] text-[#818985]">Password must be at least 2 characters long</span>}
                </label>
              ))}

              {passwordError && <p className="text-[10px] font-medium text-[#c94f43]">{passwordError}</p>}
              <button type="submit" disabled={!canContinue} className="flex h-10 w-full items-center justify-center rounded-[8px] bg-[#111] text-[12px] font-semibold text-white transition-colors hover:bg-[#183229] disabled:cursor-not-allowed disabled:bg-[#d5d8d6] disabled:text-[#8b918e]">Continue</button>
              </form>
            </> : currentStep === 2 ? <>
              <form onSubmit={event => { event.preventDefault(); setCurrentStep(3); }} className="space-y-3.5">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-[76px_minmax(0,1fr)_minmax(0,1fr)]">
                  <ProfileField label="Title" defaultValue="Mr" required />
                  <ProfileField label="First Name" defaultValue="Adnan" required />
                  <ProfileField label="Last Name" defaultValue="Godanci" required />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <ProfileField label="Phone Number" defaultValue="(646)-617-9881" required />
                  <ProfileField label="Fax Number" placeholder="Enter fax (optional)" />
                </div>
                <div className="h-px bg-[#eceeec]" />
                <ProfileField label="Address Line 1" defaultValue="123 Main Street" required />
                <ProfileField label="Address Line 2" placeholder="Apt, Suite, Floor (optional)" />
                <div className="grid grid-cols-[1fr_1fr_.8fr] gap-3">
                  <ProfileField label="City" defaultValue="Bronx" required />
                  <label className="block">
                    <span className="mb-1.5 block text-[11px] font-medium">State <span className="text-[#b4473d]">*</span></span>
                    <select defaultValue="New York" className="h-10 w-full rounded-[8px] border border-[#d7dcda] bg-white pl-3 pr-9 text-[11px] outline-none focus:border-[1.5px] focus:border-[#183229]">
                      <option>New York</option>
                      <option>Florida</option>
                      <option>Texas</option>
                    </select>
                  </label>
                  <ProfileField label="Zipcode" defaultValue="11710" required />
                </div>
                <div className="space-y-2 pt-1">
                  <button type="submit" className="h-10 w-full rounded-[8px] bg-[#111] px-6 text-[11px] font-semibold text-white hover:bg-[#183229]">Continue</button>
                  <button type="button" onClick={() => setCurrentStep(1)} className="h-9 w-full rounded-[8px] text-[11px] font-semibold text-[#4f5753] hover:bg-white/70 hover:text-[#183229]">Back</button>
                </div>
              </form>
            </> : currentStep === 3 ? <>
              <form onSubmit={event => { event.preventDefault(); setCurrentStep(4); }} className="space-y-3.5">
                <div className="grid grid-cols-2 gap-3">
                  <ProfileField label="NPI Number" defaultValue="1770027724" required />
                  <ProfileField label="License Number" defaultValue="LEA1240812470" required />
                </div>
                <ProfileField label="DEA Number" defaultValue="MK5054793" />
                <div className="space-y-2 pt-1">
                  <button type="submit" className="h-10 w-full rounded-[8px] bg-[#111] px-6 text-[11px] font-semibold text-white hover:bg-[#183229]">Continue</button>
                  <button type="button" onClick={() => setCurrentStep(2)} className="h-9 w-full rounded-[8px] text-[11px] font-semibold text-[#4f5753] hover:bg-white/70 hover:text-[#183229]">Back</button>
                </div>
              </form>
            </> : currentStep === 4 ? <>
              <SignaturePad />
              <div className="mt-4 space-y-2">
                <button type="button" onClick={() => setCurrentStep(5)} className="h-10 w-full rounded-[8px] bg-[#111] px-6 text-[11px] font-semibold text-white hover:bg-[#183229]">Continue</button>
                <button type="button" onClick={() => setCurrentStep(3)} className="h-9 w-full rounded-[8px] text-[11px] font-semibold text-[#4f5753] hover:bg-white/70 hover:text-[#183229]">Back</button>
              </div>
            </> : <>
              <PaymentMethodOnboardingStep onBack={() => setCurrentStep(4)} onComplete={onCreate} />
            </>}
          </div>
        </div>
      </section>
    </main>
  );
}

function ProfileField({ label, defaultValue, placeholder, required = false }: { label: string; defaultValue?: string; placeholder?: string; required?: boolean }) {
  return (
    <label className="block min-w-0">
      <span className="mb-1.5 block text-[11px] font-medium">{label} {required && <span className="text-[#b4473d]">*</span>}</span>
      <input required={required} defaultValue={defaultValue} placeholder={placeholder} className="h-10 w-full rounded-[8px] border border-[#d7dcda] bg-white px-3 text-[11px] outline-none placeholder:text-[#a3aaa6] focus:border-[1.5px] focus:border-[#183229]" />
    </label>
  );
}

function PaymentMethodOnboardingStep({ onBack, onComplete }: { onBack: () => void; onComplete: () => void }) {
  const [authorized, setAuthorized] = useState(true);
  const [authorizationSigned, setAuthorizationSigned] = useState(false);
  const inputClass = "h-10 w-full rounded-[8px] border border-[#d7dcda] bg-white px-3 text-[11px] outline-none placeholder:text-[#a3aaa6] focus:border-[1.5px] focus:border-[#183229]";
  const selectClass = `${inputClass} appearance-auto !pl-3 !pr-9`;

  return (
    <form onSubmit={(event) => { event.preventDefault(); onComplete(); }} className="space-y-4">
      <div className="px-0 py-1">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[10px] leading-[14px] text-[#6f7782]">You can add a payment method later from settings.</p>
          <button type="button" onClick={onComplete} className="flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-[#8db5ff] bg-[#eaf2ff] px-4 text-[11px] font-semibold text-[#1d4ed8] transition-colors hover:border-[#2563eb] hover:bg-[#dce9ff]">
            Skip for now <ArrowUpRight size={13} strokeWidth={2.25} />
          </button>
        </div>
      </div>

      <div className="space-y-3.5">
        <label className="block">
          <span className="mb-1.5 block text-[11px] font-medium">Cardholder Name <span className="text-[#b4473d]">*</span></span>
          <input required placeholder="Enter name as it appears on card" className={inputClass} />
        </label>

        <div>
          <div className="space-y-3">
            <label className="block">
              <span className="mb-1.5 block text-[10px] text-[#4f5753]">Card Number</span>
              <div className="flex h-10 items-center rounded-[8px] border border-[#d7dcda] bg-white px-3 focus-within:border-[1.5px] focus-within:border-[#183229]">
                <input required inputMode="numeric" placeholder="4111 1111 1111 1111" className="min-w-0 flex-1 bg-transparent text-[11px] outline-none placeholder:text-[#6f7782]" />
                <span className="ml-3 flex items-center gap-1 text-[9px] font-bold">
                  <span className="italic text-[#1434CB]">VISA</span>
                  <span className="size-4 rounded-full bg-[#EB001B]" />
                  <span className="-ml-2 size-4 rounded-full bg-[#F79E1B] opacity-90" />
                  <span className="rounded-[3px] bg-[#1F72CD] px-1.5 py-1 text-[7px] leading-none text-white">AMEX</span>
                  <span className="rounded-[3px] bg-[#333] px-1.5 py-1 text-[7px] leading-none text-white">DISC</span>
                </span>
              </div>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="mb-1.5 block text-[10px] text-[#4f5753]">Expiration</span>
                <input required placeholder="MM / YY" className={inputClass} />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[10px] text-[#4f5753]">CVV/CVC</span>
                <input required placeholder="CVC" className={inputClass} />
              </label>
            </div>
            <label className="block">
              <span className="mb-1.5 block text-[10px] text-[#4f5753]">Address Line 1</span>
              <input required placeholder="Address Line 1" className={inputClass} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[10px] text-[#4f5753]">Address Line 2</span>
              <input placeholder="Address Line 2" className={inputClass} />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="mb-1.5 block text-[10px] text-[#4f5753]">City</span>
                <input required placeholder="City" className={inputClass} />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[10px] text-[#4f5753]">State</span>
                <select required defaultValue="" className={selectClass}>
                  <option value="" disabled>Select State</option>
                  <option>New York</option>
                  <option>Florida</option>
                  <option>Texas</option>
                  <option>California</option>
                </select>
              </label>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="mb-1.5 block text-[10px] text-[#4f5753]">Country</span>
                <select required defaultValue="United States" className={selectClass}>
                  <option>United States</option>
                </select>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-[10px] text-[#4f5753]">Zip</span>
                <input required placeholder="12345" className={inputClass} />
              </label>
            </div>
          </div>
        </div>
      </div>

      <label className="flex items-start gap-3 text-[10px] font-semibold leading-[14px] text-[#333b36]">
        <input type="checkbox" checked={authorized} onChange={event => setAuthorized(event.target.checked)} className="mt-0.5 size-3.5 accent-black" />
        <span>I authorize SCRIPTLINKRX.COM LLC to charge the credit card account listed. If this credit card needs to be updated, a new Credit Card Authorization form will be required to be filled out.</span>
      </label>

      <SignaturePad label="Sign your authorization:" onSignatureChange={setAuthorizationSigned} />

      <div className="space-y-2 pt-1">
        <button type="submit" disabled={!authorized || !authorizationSigned} className="h-10 w-full rounded-[8px] bg-[#111] px-6 text-[11px] font-semibold text-white hover:bg-[#2a2a2a] disabled:cursor-not-allowed disabled:bg-[#d5d8d6] disabled:text-[#8b918e]">Complete Setup</button>
        <button type="button" onClick={onBack} className="h-9 w-full rounded-[8px] text-[11px] font-semibold text-[#4f5753] hover:bg-white/70 hover:text-[#183229]">Back</button>
      </div>
    </form>
  );
}

function SignaturePad({ label = "Sign your signature:", onSignatureChange }: { label?: string; onSignatureChange?: (signed: boolean) => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawingRef = useRef(false);

  function getPoint(event: ReactPointerEvent<HTMLCanvasElement>) {
    const canvas = event.currentTarget;
    const bounds = canvas.getBoundingClientRect();
    return {
      x: (event.clientX - bounds.left) * (canvas.width / bounds.width),
      y: (event.clientY - bounds.top) * (canvas.height / bounds.height),
    };
  }

  function startDrawing(event: ReactPointerEvent<HTMLCanvasElement>) {
    const context = event.currentTarget.getContext("2d");
    if (!context) return;
    const point = getPoint(event);
    drawingRef.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    context.beginPath();
    context.moveTo(point.x, point.y);
    onSignatureChange?.(true);
  }

  function draw(event: ReactPointerEvent<HTMLCanvasElement>) {
    if (!drawingRef.current) return;
    const context = event.currentTarget.getContext("2d");
    if (!context) return;
    const point = getPoint(event);
    context.lineWidth = 2.5;
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = "#183229";
    context.lineTo(point.x, point.y);
    context.stroke();
  }

  function clearSignature() {
    const canvas = canvasRef.current;
    canvas?.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
    onSignatureChange?.(false);
  }

  return (
    <div className="mt-5">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[11px] font-medium">{label}</span>
        <button type="button" onClick={clearSignature} className="rounded-[7px] border border-[#d7dcda] bg-white px-3 py-1 text-[10px] font-medium text-[#4f5753] hover:bg-[#f6f7f6]">Clear</button>
      </div>
      <canvas
        ref={canvasRef}
        width={720}
        height={220}
        onPointerDown={startDrawing}
        onPointerMove={draw}
        onPointerUp={() => { drawingRef.current = false; }}
        onPointerCancel={() => { drawingRef.current = false; }}
        className="h-[145px] w-full touch-none rounded-[9px] border border-[#d7dcda] bg-white/80"
        aria-label="Digital signature drawing area"
      />
    </div>
  );
}

function SingleSignOnPage({ onBackToLogin }: { onBackToLogin: () => void }) {
  function submitSingleSignOn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onBackToLogin();
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-white font-['Inter',sans-serif] text-[#1a1a1a]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_50%_0%,rgba(197,216,83,0.28),rgba(217,251,244,0.26)_32%,rgba(255,255,255,0)_72%)]" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-[620px] flex-col items-center px-6 pt-7">
        <button type="button" onClick={onBackToLogin} className="flex cursor-pointer items-center gap-2.5">
          <img src={scriptlinkrxLogo} alt="ScriptLinkRx" className="h-[30px] w-9 object-contain" />
          <span className="font-['Poppins',sans-serif] text-[18px] font-semibold uppercase tracking-wide text-[#183229]">
            S<span className="lowercase">CRIPTLINKrx</span>
          </span>
        </button>

        <section className="mt-[110px] w-full max-w-[430px] text-center">
          <h1 className="text-[48px] font-semibold leading-none tracking-[-0.02em] text-[#1a1a1a]">
            Single sign-on
          </h1>
          <p className="mx-auto mt-5 max-w-[340px] text-[15px] leading-6 text-[#1a1a1a]">
            Get a single sign-on link sent to your email to log in without a password.
          </p>

          <form onSubmit={submitSingleSignOn} className="mt-8">
            <label className="block text-left">
              <span className="text-[13px] font-medium text-[#1a1a1a]">Email address</span>
              <input
                type="email"
                className="mt-2 h-[52px] w-full rounded-[8px] border border-[#1a1a1a] bg-white px-4 text-[13px] font-medium text-[#1a1a1a] outline-none placeholder:text-[#6f7782] focus:border-[#183229]"
                placeholder="info@mail.com"
              />
            </label>
            <button type="submit" className="mt-3 flex h-[46px] w-full items-center justify-center rounded-[999px] bg-[#1a1a1a] text-[13px] font-semibold text-white transition-colors hover:bg-[#183229]">
              Send Single Sign-On Link
            </button>
          </form>

          <button type="button" onClick={onBackToLogin} className="mt-8 cursor-pointer text-[12px] font-semibold text-[#1a1a1a] underline underline-offset-4 hover:text-[#183229]">
            Back to Login
          </button>
        </section>
      </div>
    </main>
  );
}

function RegisterPage({ onBackToLogin }: { onBackToLogin: () => void }) {
  function submitRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onBackToLogin();
  }

  const inputClass = "mt-2 h-[52px] w-full rounded-[8px] border border-[#1a1a1a] bg-white px-4 text-[13px] font-medium text-[#1a1a1a] outline-none placeholder:text-[#6f7782] focus:border-[#183229]";
  const selectClass = `${inputClass} appearance-none pr-10`;

  return (
    <main className="relative min-h-screen overflow-hidden bg-white font-['Inter',sans-serif] text-[#1a1a1a]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_50%_0%,rgba(197,216,83,0.28),rgba(217,251,244,0.26)_32%,rgba(255,255,255,0)_72%)]" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-[620px] flex-col items-center px-6 pt-7">
        <button type="button" onClick={onBackToLogin} className="flex cursor-pointer items-center gap-2.5">
          <img src={scriptlinkrxLogo} alt="ScriptLinkRx" className="h-[30px] w-9 object-contain" />
          <span className="font-['Poppins',sans-serif] text-[18px] font-semibold uppercase tracking-wide text-[#183229]">
            S<span className="lowercase">CRIPTLINKrx</span>
          </span>
        </button>

        <section className="mt-[88px] w-full max-w-[520px] text-center">
          <h1 className="text-[48px] font-semibold leading-none tracking-[-0.02em] text-[#1a1a1a]">
            Create account
          </h1>
          <p className="mx-auto mt-5 max-w-[390px] text-[15px] leading-6 text-[#1a1a1a]">
            Join ScriptLinkRx as a provider and tell us where your business operates.
          </p>

          <form onSubmit={submitRegister} className="mt-8 text-left">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-left">
                <span className="text-[13px] font-medium text-[#1a1a1a]">Business Name <span className="text-[#c7532f]">*</span></span>
                <input className={inputClass} placeholder="Enter business name" />
              </label>
              <label className="block text-left">
                <span className="text-[13px] font-medium text-[#1a1a1a]">NPI Number <span className="text-[#8c95a1]">(Optional)</span></span>
                <input className={inputClass} placeholder="1234567890" />
              </label>
              <label className="relative block text-left">
                <span className="text-[13px] font-medium text-[#1a1a1a]">Business Type <span className="text-[#c7532f]">*</span></span>
                <select className={selectClass} defaultValue="">
                  <option value="" disabled>Select a type</option>
                  <option>Clinic</option>
                  <option>Prescriber Group</option>
                  <option>Pharmacy</option>
                </select>
                <ChevronDown size={15} className="pointer-events-none absolute bottom-4 right-4 text-[#6f7782]" />
              </label>
              <label className="relative block text-left">
                <span className="text-[13px] font-medium text-[#1a1a1a]">User Type <span className="text-[#c7532f]">*</span></span>
                <select className={selectClass} defaultValue="">
                  <option value="" disabled>Select user type...</option>
                  <option>Manager</option>
                  <option>Prescriber</option>
                </select>
                <ChevronDown size={15} className="pointer-events-none absolute bottom-4 right-4 text-[#6f7782]" />
              </label>
            </div>

            <div className="my-7 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
              <span className="h-px bg-[#1a1a1a]/45" />
              <span className="text-[12px] text-[#6f7782]">Business address</span>
              <span className="h-px bg-[#1a1a1a]/45" />
            </div>

            <div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block text-left">
                  <span className="text-[13px] font-medium text-[#1a1a1a]">Address Line 1 <span className="text-[#c7532f]">*</span></span>
                  <input className={inputClass} placeholder="Start typing address..." />
                </label>
                <label className="block text-left">
                  <span className="text-[13px] font-medium text-[#1a1a1a]">Address Line 2</span>
                  <input className={inputClass} placeholder="Apt, suite, floor (optional)" />
                </label>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <label className="block text-left">
                  <span className="text-[13px] font-medium text-[#1a1a1a]">City <span className="text-[#c7532f]">*</span></span>
                  <input className={inputClass} placeholder="City" />
                </label>
                <label className="relative block text-left">
                  <span className="text-[13px] font-medium text-[#1a1a1a]">State <span className="text-[#c7532f]">*</span></span>
                  <select className={selectClass} defaultValue="">
                    <option value="" disabled>Select state</option>
                    <option>New York</option>
                    <option>California</option>
                    <option>Texas</option>
                    <option>Florida</option>
                  </select>
                  <ChevronDown size={15} className="pointer-events-none absolute bottom-4 right-4 text-[#6f7782]" />
                </label>
                <label className="block text-left">
                  <span className="text-[13px] font-medium text-[#1a1a1a]">Zip Code <span className="text-[#c7532f]">*</span></span>
                  <input className={inputClass} placeholder="12345" />
                </label>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <label className="block text-left">
                  <span className="text-[13px] font-medium text-[#1a1a1a]">Business Phone <span className="text-[#c7532f]">*</span></span>
                  <input className={inputClass} placeholder="(555) 123-4567" />
                </label>
                <label className="block text-left">
                  <span className="text-[13px] font-medium text-[#1a1a1a]">Business Fax</span>
                  <input className={inputClass} placeholder="(555) 123-4567" />
                </label>
              </div>
            </div>

            <button type="submit" className="mt-6 flex h-[46px] w-full items-center justify-center rounded-[999px] bg-[#1a1a1a] text-[13px] font-semibold text-white transition-colors hover:bg-[#183229]">
              Continue registration
            </button>

            <div className="mt-7 text-center text-[12px] font-medium text-[#6f7782]">
              Already have an account?{" "}
              <button type="button" onClick={onBackToLogin} className="cursor-pointer font-semibold text-[#1a1a1a] underline underline-offset-4 hover:text-[#183229]">
                Back to login
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

function RequestDemoPage({ onBackToLanding, onLoginClick }: { onBackToLanding: () => void; onLoginClick: () => void }) {
  function submitDemo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onLoginClick();
  }

  const inputClass = "mt-2 h-[52px] w-full rounded-[8px] border border-[#1a1a1a] bg-white px-4 text-[13px] font-medium text-[#1a1a1a] outline-none placeholder:text-[#6f7782] focus:border-[#183229]";
  const selectClass = `${inputClass} appearance-none pr-10`;

  return (
    <main className="relative min-h-screen overflow-hidden bg-white font-['Inter',sans-serif] text-[#1a1a1a]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_50%_0%,rgba(197,216,83,0.28),rgba(217,251,244,0.26)_32%,rgba(255,255,255,0)_72%)]" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-[980px] flex-col items-center px-6 pt-7">
        <button type="button" onClick={onBackToLanding} className="flex cursor-pointer items-center gap-2.5">
          <img src={scriptlinkrxLogo} alt="ScriptLinkRx" className="h-[30px] w-9 object-contain" />
          <span className="font-['Poppins',sans-serif] text-[18px] font-semibold uppercase tracking-wide text-[#183229]">
            S<span className="lowercase">CRIPTLINKrx</span>
          </span>
        </button>

        <section className="mt-[88px] w-full max-w-[620px] text-center">
          <h1 className="text-[48px] font-semibold leading-none tracking-[-0.02em] text-[#1a1a1a]">
            Request a demo
          </h1>
          <p className="mx-auto mt-5 max-w-[440px] text-[15px] leading-6 text-[#1a1a1a]">
            See how ScriptLinkRx can simplify compounding workflows for your clinic or pharmacy.
          </p>

          <form onSubmit={submitDemo} className="mt-8 text-left">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-[13px] font-medium text-[#1a1a1a]">Business Name <span className="text-[#c7532f]">*</span></span>
                <input className={inputClass} placeholder="Enter your business name" />
              </label>
              <label className="relative block">
                <span className="text-[13px] font-medium text-[#1a1a1a]">Business Type <span className="text-[#c7532f]">*</span></span>
                <select className={selectClass} defaultValue="">
                  <option value="" disabled>Select business type</option>
                  <option>Clinic</option>
                  <option>Prescriber Group</option>
                  <option>Pharmacy</option>
                </select>
                <ChevronDown size={15} className="pointer-events-none absolute bottom-4 right-4 text-[#6f7782]" />
              </label>
              <label className="block">
                <span className="text-[13px] font-medium text-[#1a1a1a]">Contact Name <span className="text-[#c7532f]">*</span></span>
                <input className={inputClass} placeholder="Enter your full name" />
              </label>
              <label className="block">
                <span className="text-[13px] font-medium text-[#1a1a1a]">Business Address <span className="text-[#c7532f]">*</span></span>
                <input className={inputClass} placeholder="Enter your business address" />
              </label>
              <label className="block">
                <span className="text-[13px] font-medium text-[#1a1a1a]">Contact Email <span className="text-[#c7532f]">*</span></span>
                <input type="email" className={inputClass} placeholder="Enter your email address" />
              </label>
              <label className="block">
                <span className="text-[13px] font-medium text-[#1a1a1a]">Contact Phone <span className="text-[#c7532f]">*</span></span>
                <input className={inputClass} placeholder="(555) 123-4567" />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-[13px] font-medium text-[#1a1a1a]">Notes</span>
                <textarea className="mt-2 min-h-[118px] w-full resize-none rounded-[8px] border border-[#1a1a1a] bg-white px-4 py-3 text-[13px] font-medium text-[#1a1a1a] outline-none placeholder:text-[#6f7782] focus:border-[#183229]" placeholder="Any additional details or questions..." />
              </label>
            </div>

            <button type="submit" className="mt-5 flex h-[46px] w-full items-center justify-center rounded-[999px] bg-[#1a1a1a] text-[13px] font-semibold text-white transition-colors hover:bg-[#183229]">
              Submit request
            </button>

            <div className="mt-7 text-center text-[12px] font-medium text-[#6f7782]">
              Already have access?{" "}
              <button type="button" onClick={onLoginClick} className="cursor-pointer font-semibold text-[#1a1a1a] underline underline-offset-4 hover:text-[#183229]">
                Back to login
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

function ContactPage({ onBackToLanding }: { onBackToLanding: () => void }) {
  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onBackToLanding();
  }

  const inputClass = "mt-2 h-[46px] w-full rounded-[8px] border border-[#1a1a1a] bg-white px-4 text-[13px] font-medium text-[#1a1a1a] outline-none placeholder:text-[#6f7782] focus:border-[#183229]";

  return (
    <main className="relative min-h-screen overflow-hidden bg-white font-['Inter',sans-serif] text-[#1a1a1a]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(circle_at_50%_0%,rgba(197,216,83,0.28),rgba(217,251,244,0.26)_32%,rgba(255,255,255,0)_72%)]" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-[980px] flex-col items-center px-6 pt-7">
        <button type="button" onClick={onBackToLanding} className="flex cursor-pointer items-center gap-2.5">
          <img src={scriptlinkrxLogo} alt="ScriptLinkRx" className="h-[30px] w-9 object-contain" />
          <span className="font-['Poppins',sans-serif] text-[18px] font-semibold uppercase tracking-wide text-[#183229]">
            S<span className="lowercase">CRIPTLINKrx</span>
          </span>
        </button>

        <section className="mt-[92px] w-full text-center">
          <h1 className="text-[48px] font-semibold leading-none tracking-[-0.02em] text-[#1a1a1a]">Reach ScriptLinkRx</h1>
          <p className="mx-auto mt-5 max-w-[460px] text-[15px] leading-6 text-[#1a1a1a]">
            A simple place for support, partnership questions, and compliance verification.
          </p>

          <div className="mt-12 grid items-stretch gap-6 text-left md:grid-cols-2">
            <section className="relative h-full overflow-hidden rounded-[22px] border border-white/70 bg-white/45 p-7 shadow-[0_24px_70px_rgba(24,50,41,0.10),inset_0_1px_0_rgba(255,255,255,0.92)] backdrop-blur-xl">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/65 to-transparent" />
              <div className="relative">
                <p className="text-[11px] font-normal uppercase tracking-[0.16em] text-[#8c95a1]">Contact details</p>
                <h2 className="mt-2 text-[22px] font-semibold tracking-[-0.04em] text-[#1a1a1a]">ScriptLinkRx</h2>
                <div className="mt-6 divide-y divide-white/70 rounded-[14px] border border-white/70 bg-white/45 px-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.78)]">
                  {[
                    ["Support", "support@scriptlinkrx.com"],
                    ["Sales", "sales@scriptlinkrx.com"],
                    ["Phone", "(917) 284-8124"],
                  ].map(([label, value]) => (
                    <div key={label} className="grid grid-cols-[82px_1fr] gap-5 py-3">
                      <span className="text-[12px] font-medium text-[#6f7782]">{label}</span>
                      <span className="break-words text-[13px] font-semibold text-[#1a1a1a]">{value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8 border-t border-white/70 pt-7">
                  <p className="text-[11px] font-normal uppercase tracking-[0.16em] text-[#8c95a1]">Get help faster</p>
                  <h3 className="mt-2 text-[17px] font-semibold tracking-[-0.03em] text-[#1a1a1a]">A few details go a long way</h3>
                  <p className="mt-2 text-[11px] leading-5 text-[#69736d]">When sending a message, include anything that helps us identify your request:</p>
                  <div className="mt-4 rounded-[14px] bg-white/50 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                    <div className="grid gap-3 sm:grid-cols-2">
                      {["Order or receipt number", "Patient initials", "Product or prescription", "A short description"].map(item => (
                        <div key={item} className="flex items-center gap-2.5 text-[11px] font-medium text-[#343b37]"><span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#e7efff] text-[#2563eb]"><Check size={11} strokeWidth={2.5} /></span>{item}</div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-3 flex items-start gap-2.5 rounded-[12px] bg-[#f2f6ff]/75 px-3.5 py-3 text-[10px] leading-4 text-[#596575]">
                    <Shield size={14} className="mt-0.5 shrink-0 text-[#2563eb]" />
                    <p>Please don’t include sensitive medical details beyond what is necessary for support.</p>
                  </div>
                </div>
              </div>
            </section>

            <form id="contact-form" onSubmit={submitContact} className="flex h-full scroll-mt-8 flex-col rounded-[18px] border border-[#e7e4dd] bg-white p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8c95a1]">Send a message</p>
              <div className="mt-5 grid flex-1 gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="text-[13px] font-medium text-[#1a1a1a]">Name <span className="text-[#c7532f]">*</span></span>
                  <input className={inputClass} placeholder="Your name" />
                </label>
                <label className="block">
                  <span className="text-[13px] font-medium text-[#1a1a1a]">Organization</span>
                  <input className={inputClass} placeholder="Company name" />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-[13px] font-medium text-[#1a1a1a]">Email <span className="text-[#c7532f]">*</span></span>
                  <input type="email" className={inputClass} placeholder="you@company.com" />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-[13px] font-medium text-[#1a1a1a]">Message <span className="text-[#c7532f]">*</span></span>
                  <textarea className="mt-2 min-h-[104px] w-full resize-none rounded-[8px] border border-[#1a1a1a] bg-white px-4 py-3 text-[13px] font-medium text-[#1a1a1a] outline-none placeholder:text-[#6f7782] focus:border-[#183229]" placeholder="How can we help?" />
                </label>
              </div>
              <button type="submit" className="mt-5 flex h-[46px] w-full items-center justify-center rounded-[999px] bg-[#1a1a1a] text-[13px] font-semibold text-white transition-colors hover:bg-[#183229]">
                Send message
              </button>
            </form>
          </div>

        </section>
      </div>
    </main>
  );
}

function LandingPage({ onLoginClick, onRegisterClick, onRequestDemoClick, onContactClick }: { onLoginClick: () => void; onRegisterClick: () => void; onRequestDemoClick: () => void; onContactClick: () => void }) {
  const pharmacyLogos = [
    "R Pharmacy",
    "pharm a",
    "Precision Medicine",
    "Precision Medicine",
    "Silver Pharmacy",
    "1st Choice",
    "R TX",
    "R TX",
    "THESIS",
    "DCA",
    "Optimal",
    "Optimal",
    "DCA",
    "Optimal",
  ];

  const products = [
    { image: landingNadInjection, name: "NAD+ Injection", dosage: "20mg/mL" },
    { image: landingTestosterone, name: "Testosterone Cypionate", dosage: "200mg/mL" },
    { image: landingGlutathione, name: "Glutathione", dosage: "200mg/mL" },
    { image: landingTriMix, name: "TRI-MIX", dosage: "30mg/mL" },
    { image: landingNadInjection, name: "NAD+ Injection", dosage: "20mg/mL" },
  ];

  const treatments = [
    { title: "Hormone Therapy", text: "Peptides, injectables, and oral HRT for treatment plans.", tone: "from-[#55331f]" },
    { title: "Peptides & Longevity", text: "Formulas that support performance, age-management, and recovery.", tone: "from-[#314433]" },
    { title: "Weight Management", text: "Injectable, capsules, and oral GLP-1 support for care plans.", tone: "from-[#4b5338]" },
    { title: "General Health & Wellness", text: "Topical, oral, and injectable support across categories.", tone: "from-[#3e3328]" },
  ];

  const stats = [
    ["30+", "Pharmacies"],
    ["5,000+", "Product SKUs"],
    ["1250+", "Clinics"],
    ["50+", "States"],
  ];

  const heroBottles = [
    { id: "nad", image: landingNadInjection, label: "NAD+ Injection", left: "45px", top: 480, x: 45, y: 255, height: 360, width: 132, baseY: 0, rotate: -14, entranceRotate: -24 },
    { id: "testosterone", image: landingTestosterone, label: "Testosterone Cypionate", left: "392px", top: 455, x: 392, y: 238, height: 350, width: 126, baseY: -20, rotate: 0, entranceRotate: 18 },
    { id: "glutathione", image: landingGlutathione, label: "Glutathione", left: "calc(100% - 520px)", top: 545, x: 760, y: 288, height: 330, width: 122, baseY: 20, rotate: 7, entranceRotate: 24 },
    { id: "tri-mix", image: landingTriMix, label: "TRI-MIX", left: "calc(100% - 335px)", top: 280, x: 1060, y: 150, height: 580, width: 205, baseY: -55, rotate: 1, entranceRotate: 20 },
  ];

  const heroRef = useRef<HTMLElement>(null);
  const heroStageRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const activeBottleRef = useRef<{ id: string; offsetX: number; offsetY: number; lastX: number; lastY: number; lastTime: number } | null>(null);
  const [heroProgress, setHeroProgress] = useState(0);
  const [bottleBodies, setBottleBodies] = useState(() => heroBottles.map((bottle, index) => ({
    id: bottle.id,
    x: bottle.x,
    y: bottle.y - 520 - index * 30,
    vx: (index - 1.5) * 1.2,
    vy: 0,
    rotation: bottle.rotate - 18 + index * 8,
    angularVelocity: (index - 1.5) * 0.8,
  })));
  const bottleProgress = Math.min(0.62, Math.max(0, (heroProgress - 0.08) / 0.78));
  const bottleOpacity = Math.min(1, Math.max(0, (heroProgress - 0.06) / 0.22));
  const bottleLift = 360 - bottleProgress * 580;
  const bottlePlaygroundActive = heroProgress > 0.72;

  useEffect(() => {
    function updateHeroProgress() {
      const hero = heroRef.current;
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const scrollable = Math.max(1, rect.height - window.innerHeight);
      setHeroProgress(Math.min(1, Math.max(0, -rect.top / scrollable)));
    }

    updateHeroProgress();
    window.addEventListener("scroll", updateHeroProgress, { passive: true });
    window.addEventListener("resize", updateHeroProgress);
    return () => {
      window.removeEventListener("scroll", updateHeroProgress);
      window.removeEventListener("resize", updateHeroProgress);
    };
  }, []);

  useEffect(() => {
    const stage = heroStageRef.current;
    if (!stage || !bottlePlaygroundActive) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    const bounds = stage.getBoundingClientRect();
    setBottleBodies(heroBottles.map((bottle, index) => ({
      id: bottle.id,
      x: Math.min(Math.max(26, bottle.x), Math.max(26, bounds.width - bottle.width - 26)),
      y: -bottle.height - index * 92,
      vx: (index - 1.5) * 1.65,
      vy: 2 + index * 0.55,
      rotation: bottle.rotate + (index - 1.5) * 10,
      angularVelocity: (index - 1.5) * 1.1,
    })));
  }, [bottlePlaygroundActive]);

  useEffect(() => {
    if (!bottlePlaygroundActive) return;

    let lastTime = performance.now();

    function tick(now: number) {
      const stage = heroStageRef.current;
      if (!stage) return;

      const bounds = stage.getBoundingClientRect();
      const delta = Math.min(2.2, (now - lastTime) / 16.67);
      lastTime = now;

      setBottleBodies((currentBodies) => {
        const nextBodies = currentBodies.map((body) => {
          const bottle = heroBottles.find((item) => item.id === body.id);
          if (!bottle || activeBottleRef.current?.id === body.id) return body;

          let x = body.x + body.vx * delta;
          let y = body.y + body.vy * delta;
          let vx = body.vx * 0.998;
          let vy = body.vy + 0.58 * delta;
          let rotation = body.rotation + body.angularVelocity * delta;
          let angularVelocity = body.angularVelocity * 0.996;
          const floor = bounds.height - bottle.height - 22;
          const right = bounds.width - bottle.width - 22;

          if (y > floor) {
            y = floor;
            vy = -Math.abs(vy) * 0.58;
            vx *= 0.9;
            angularVelocity += vx * 0.08;
          }
          if (x < 22) {
            x = 22;
            vx = Math.abs(vx) * 0.72;
            angularVelocity += 1.5;
          }
          if (x > right) {
            x = right;
            vx = -Math.abs(vx) * 0.72;
            angularVelocity -= 1.5;
          }

          return { ...body, x, y, vx, vy, rotation, angularVelocity };
        });

        for (let i = 0; i < nextBodies.length; i += 1) {
          for (let j = i + 1; j < nextBodies.length; j += 1) {
            const firstBottle = heroBottles.find((item) => item.id === nextBodies[i].id);
            const secondBottle = heroBottles.find((item) => item.id === nextBodies[j].id);
            if (!firstBottle || !secondBottle) continue;

            const firstRadius = Math.max(firstBottle.width, firstBottle.height * 0.36) / 2;
            const secondRadius = Math.max(secondBottle.width, secondBottle.height * 0.36) / 2;
            const firstCenterX = nextBodies[i].x + firstBottle.width / 2;
            const firstCenterY = nextBodies[i].y + firstBottle.height / 2;
            const secondCenterX = nextBodies[j].x + secondBottle.width / 2;
            const secondCenterY = nextBodies[j].y + secondBottle.height / 2;
            const dx = secondCenterX - firstCenterX;
            const dy = secondCenterY - firstCenterY;
            const distance = Math.max(1, Math.hypot(dx, dy));
            const minDistance = (firstRadius + secondRadius) * 0.58;

            if (distance < minDistance) {
              const nx = dx / distance;
              const ny = dy / distance;
              const overlap = (minDistance - distance) / 2;
              nextBodies[i] = { ...nextBodies[i], x: nextBodies[i].x - nx * overlap, y: nextBodies[i].y - ny * overlap };
              nextBodies[j] = { ...nextBodies[j], x: nextBodies[j].x + nx * overlap, y: nextBodies[j].y + ny * overlap };

              const firstPush = nextBodies[i].vx * nx + nextBodies[i].vy * ny;
              const secondPush = nextBodies[j].vx * nx + nextBodies[j].vy * ny;
              const impulse = (secondPush - firstPush) * 0.74;
              nextBodies[i] = {
                ...nextBodies[i],
                vx: nextBodies[i].vx + impulse * nx,
                vy: nextBodies[i].vy + impulse * ny,
                angularVelocity: nextBodies[i].angularVelocity - impulse * 0.32,
              };
              nextBodies[j] = {
                ...nextBodies[j],
                vx: nextBodies[j].vx - impulse * nx,
                vy: nextBodies[j].vy - impulse * ny,
                angularVelocity: nextBodies[j].angularVelocity + impulse * 0.32,
              };
            }
          }
        }

        return nextBodies;
      });

      animationFrameRef.current = requestAnimationFrame(tick);
    }

    animationFrameRef.current = requestAnimationFrame(tick);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [bottlePlaygroundActive]);

  function bottleStyle(bottle: (typeof heroBottles)[number]): CSSProperties {
    const physicsBody = bottleBodies.find((body) => body.id === bottle.id);
    if (bottlePlaygroundActive && physicsBody) {
      return {
        left: 0,
        top: 0,
        height: bottle.height,
        opacity: 1,
        transform: `translate3d(${physicsBody.x}px, ${physicsBody.y}px, 0) rotate(${physicsBody.rotation}deg)`,
        transition: "none",
      };
    }

    const easeIn = Math.min(1, Math.max(0, bottleProgress / 0.45));
    const scale = 0.9 + easeIn * 0.2;
    const activeRotate = bottle.rotate + bottle.entranceRotate * (1 - easeIn);
    return {
      left: bottle.left,
      top: bottle.top,
      height: bottle.height,
      opacity: bottleOpacity,
      transform: `translate3d(0, ${bottleLift + bottle.baseY}px, 0) rotate(${activeRotate}deg) scale(${scale})`,
      transition: "opacity 120ms linear",
    };
  }

  function handleBottlePointerDown(event: ReactPointerEvent<HTMLImageElement>, id: string) {
    if (!bottlePlaygroundActive) return;
    const stage = heroStageRef.current;
    const bottle = heroBottles.find((item) => item.id === id);
    const body = bottleBodies.find((item) => item.id === id);
    if (!stage || !bottle || !body) return;

    const rect = stage.getBoundingClientRect();
    event.currentTarget.setPointerCapture(event.pointerId);
    activeBottleRef.current = {
      id,
      offsetX: event.clientX - rect.left - body.x,
      offsetY: event.clientY - rect.top - body.y,
      lastX: event.clientX,
      lastY: event.clientY,
      lastTime: performance.now(),
    };
  }

  function handleBottlePointerMove(event: ReactPointerEvent<HTMLImageElement>) {
    const active = activeBottleRef.current;
    const stage = heroStageRef.current;
    if (!active || !stage) return;

    const rect = stage.getBoundingClientRect();
    const bottle = heroBottles.find((item) => item.id === active.id);
    if (!bottle) return;

    const now = performance.now();
    const elapsed = Math.max(16, now - active.lastTime);
    const vx = ((event.clientX - active.lastX) / elapsed) * 16.67;
    const vy = ((event.clientY - active.lastY) / elapsed) * 16.67;
    const x = Math.min(Math.max(22, event.clientX - rect.left - active.offsetX), Math.max(22, rect.width - bottle.width - 22));
    const y = Math.min(Math.max(18, event.clientY - rect.top - active.offsetY), Math.max(18, rect.height - bottle.height - 22));

    activeBottleRef.current = { ...active, lastX: event.clientX, lastY: event.clientY, lastTime: now };
    setBottleBodies((currentBodies) => currentBodies.map((body) => (
      body.id === active.id
        ? { ...body, x, y, vx, vy, angularVelocity: vx * 0.16 }
        : body
    )));
  }

  function handleBottlePointerUp(event: ReactPointerEvent<HTMLImageElement>) {
    if (activeBottleRef.current) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    activeBottleRef.current = null;
  }

  return (
    <main className="min-h-screen bg-white font-['Inter',sans-serif] text-[#183229]">
      <div className="w-full px-5 py-5">
        <section ref={heroRef} className="relative h-[205vh] rounded-[18px]">
          <div ref={heroStageRef} className="sticky top-5 h-[calc(100vh-40px)] min-h-[760px] overflow-hidden rounded-[18px] bg-[#eeeade]">
          <header className="relative z-20 flex items-center justify-between px-10 py-8">
            <button type="button" onClick={onLoginClick} className="flex cursor-pointer items-center gap-2">
              <img src={scriptlinkrxLandingLogo} alt="ScriptLinkRx" className="h-[18px] w-auto object-contain" />
            </button>
            <div className="flex items-center gap-4 text-[14px] font-medium text-[#2a342f]">
              <button
                type="button"
                onClick={onRegisterClick}
                className="cursor-pointer hover:text-[#00a83b]"
              >
                Login
              </button>
              <button
                type="button"
                onClick={onLoginClick}
                className="flex h-[43px] w-[97px] cursor-pointer items-center justify-center gap-2.5 rounded-[32px] bg-white px-5 py-[11px] text-[14px] font-medium text-[#2a342f] shadow-none hover:bg-[#f8f8f8]"
              >
                Register
              </button>
            </div>
          </header>

          <div className="relative z-10 mx-auto mt-[122px] max-w-[820px] text-center">
            <h1 className="text-[64px] font-normal leading-[0.82] tracking-[-0.065em] text-[#1e2522]">
              Scale Your Compounding
              <span className="block text-[#56766c]">Pharmacy Network Through</span>
              <span className="block">One Platform</span>
            </h1>
            <p className="mx-auto mt-[58px] max-w-[430px] text-[28px] font-normal leading-[0.82] tracking-[-0.055em] text-[#1e2522]">
              Simplify compounding, boost your
              <span className="block">offerings, and elevate <span className="text-[#517367]">patient care</span></span>
              <span className="block text-[#517367]">no matter your specialty.</span>
            </p>
            <div className="mt-5 flex justify-center gap-3">
              <button type="button" onClick={onLoginClick} className="h-8 cursor-pointer rounded-full bg-white px-5 text-[10px] font-semibold text-[#183229] shadow-sm hover:bg-[#f7f7f4]">See how it works</button>
              <button type="button" onClick={onRequestDemoClick} className="h-8 cursor-pointer rounded-full bg-[#90958b] px-5 text-[10px] font-semibold text-white shadow-sm hover:bg-[#7e8579]">Request a demo</button>
            </div>
          </div>

          {heroBottles.map((bottle) => (
            <img
              key={bottle.id}
              src={bottle.image}
              alt={bottle.label}
              draggable={false}
              onPointerDown={(event) => handleBottlePointerDown(event, bottle.id)}
              onPointerMove={handleBottlePointerMove}
              onPointerUp={handleBottlePointerUp}
              onPointerCancel={handleBottlePointerUp}
              style={bottleStyle(bottle)}
              className={`absolute z-20 w-auto select-none object-contain drop-shadow-[0_20px_24px_rgba(0,0,0,0.13)] will-change-transform ${bottlePlaygroundActive ? "cursor-grab touch-none active:cursor-grabbing" : "pointer-events-none"}`}
            />
          ))}
          <div style={{ opacity: bottleOpacity }} className="absolute right-[260px] top-[480px] flex h-7 w-7 items-center justify-center rounded-full border border-[#dce889] bg-[#f4f8c9] text-[12px] text-[#9ea71d] transition-opacity duration-150">
            <Plus size={13} />
          </div>
          </div>
        </section>

        <section className="mx-auto mt-12 max-w-[1060px] text-center">
          <h2 className="text-[20px] font-medium tracking-[-0.03em] text-[#343936]">Trusted by leading compounding pharmacies</h2>
          <div className="mx-auto mt-8 grid max-w-[850px] grid-cols-4 gap-4">
            {pharmacyLogos.map((logo, index) => (
              <div key={`${logo}-${index}`} className="flex h-[72px] items-center justify-center rounded-[8px] border border-[#e5e5e0] bg-white text-[17px] font-semibold tracking-[-0.04em] text-[#37423d] shadow-[0_8px_22px_rgba(24,50,41,0.04)]">
                {logo}
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-[1180px] text-center">
          <h2 className="text-[21px] font-medium tracking-[-0.03em] text-[#343936]">We've Got You Covered.</h2>
          <div className="mt-9 grid grid-cols-5 gap-5">
            {products.map((product) => (
              <article key={product.name} className="rounded-[8px] border border-[#eeeae3] bg-[#fdfcf9] px-5 py-6 text-left">
                <div className="flex h-[150px] items-center justify-center">
                  <img src={product.image} alt={product.name} className="max-h-[138px] w-auto object-contain" />
                </div>
                <h3 className="mt-4 text-[12px] font-semibold text-[#1f2723]">{product.name}</h3>
                <p className="mt-1 text-[9px] font-medium text-[#9a9f9a]">{product.dosage}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-20 max-w-[1120px] rounded-[18px] bg-[#fafaf7] px-16 py-16 text-center">
          <h2 className="mx-auto max-w-[420px] text-[22px] font-medium leading-tight tracking-[-0.04em]">
            Watch an order travel from your clinic to your patient's door
          </h2>
          <div className="mx-auto mt-12 grid max-w-[760px] grid-cols-2 overflow-hidden rounded-[4px] bg-white shadow-[0_20px_45px_rgba(24,50,41,0.06)]">
            <div className="flex min-h-[330px] flex-col justify-end bg-[#f7f8f3] p-10 text-left">
              <div className="relative h-[210px]">
                <div className="absolute left-12 top-20 h-24 w-24 rounded-full bg-[#bad1aa]" />
                <div className="absolute left-24 top-8 h-28 w-[90px] rounded-t-full bg-[#e6eadf]" />
                <div className="absolute right-20 top-12 flex h-12 w-12 items-center justify-center rounded-full bg-[#557a56] text-white">
                  <MapPin size={22} />
                </div>
                <div className="absolute left-36 top-20 h-px w-24 rotate-[-22deg] border-t border-dashed border-[#8fa18c]" />
                <div className="absolute left-20 top-28 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#5b805f] shadow">
                  <Plus size={18} />
                </div>
              </div>
              <h3 className="text-[16px] font-semibold">Spot the need</h3>
              <p className="mt-2 max-w-[250px] text-[12px] leading-5 text-[#6f7670]">
                A patient needs a custom formula, strength, or delivery method you don't stock. With ScriptLinkRx, you say yes anyway.
              </p>
            </div>
            <div className="min-h-[330px] bg-white p-10 text-left">
              <h3 className="text-[20px] font-semibold tracking-[-0.04em]">Order<br />Status</h3>
              <div className="mt-8 space-y-5">
                {["Order Created", "In Progress", "Shipped", "Delivered"].map((step, index) => (
                  <div key={step} className="flex items-center gap-4">
                    <span className={`flex h-7 w-7 items-center justify-center rounded-full ${index === 3 ? "bg-[#bde6bc]" : "bg-[#c7d46e]"} text-white`}>
                      <CheckCircle2 size={14} />
                    </span>
                    <div>
                      <p className="text-[12px] font-semibold text-[#24302b]">{step}</p>
                      <p className="text-[9px] text-[#96a09a]">Jun 18 - 1:16 PM</p>
                    </div>
                  </div>
                ))}
                <div className="mt-8 rounded-[16px] bg-[#f3f5e7] p-5">
                  <p className="text-[12px] font-semibold">Live updates</p>
                  <p className="mt-1 text-[10px] text-[#71786f]">Always in the know.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-20 max-w-[1120px] rounded-[16px] bg-[#fafaf7] p-16">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-10">
            <div className="rounded-[14px] bg-white p-10">
              <p className="text-[11px] font-semibold uppercase text-[#9d7b62]">The old way</p>
              <h3 className="mt-3 text-[30px] font-medium leading-[0.98] tracking-[-0.05em]">Complex. Costly.<br />Hard to Scale.</h3>
              <ul className="mt-8 space-y-3 text-[12px] text-[#5f6862]">
                {["30 Pharmacies", "30 Logins", "30 Workflows", "Multiple Vendors", "High Overhead"].map(item => <li key={item}>x {item}</li>)}
              </ul>
            </div>
            <span className="text-[18px] font-semibold">VS</span>
            <div className="rounded-[14px] bg-white p-10">
              <p className="text-[11px] font-semibold uppercase text-[#64746b]">The ScriptLinkRx Way</p>
              <h3 className="mt-3 text-[30px] font-medium leading-[0.98] tracking-[-0.05em]">Simple. Unified.<br />Built for Growth.</h3>
              <ul className="mt-8 space-y-3 text-[12px] text-[#5f6862]">
                {["30 Pharmacies", "1 Login", "1 Platform", "1 Workflow", "Lower Overhead"].map(item => <li key={item}>✓ {item}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-20 max-w-[1280px] text-center">
          <h2 className="mx-auto max-w-[520px] text-[24px] font-medium leading-tight tracking-[-0.04em]">
            We provide custom compounding solutions for a wide range of specialties
          </h2>
          <div className="mt-10 grid grid-cols-4 gap-5">
            {treatments.map((item) => (
              <article key={item.title} className={`flex h-[360px] flex-col justify-end overflow-hidden rounded-[8px] bg-gradient-to-t ${item.tone} to-[#d5d3c8] p-6 text-left text-white shadow-[0_12px_28px_rgba(24,50,41,0.08)]`}>
                <h3 className="text-[18px] font-semibold">{item.title}</h3>
                <p className="mt-2 text-[11px] leading-5 text-white/80">{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-20 max-w-[1120px] rounded-[18px] bg-[#fafaf7] p-12">
          <h2 className="text-center text-[23px] font-medium tracking-[-0.04em]">Pharmacy-grade quality, in every formulation your patients need.</h2>
          <div className="mt-10 grid grid-cols-2 gap-6">
            <div className="rounded-[8px] bg-[#eef7ef] p-8">
              <h3 className="text-[18px] font-semibold">Why clinics choose us</h3>
              <ul className="mt-7 space-y-4 text-[12px] leading-5 text-[#4f5c56]">
                {["Every ticket built in checkout for parity and freedom from unnecessary extras.", "Ingredients come only from FDA-registered suppliers.", "Easy medication is independently verified through every step.", "A wide range of dosage forms tailored to each patient's treatment plan."].map(item => (
                  <li key={item} className="flex gap-3"><CheckCircle2 size={14} className="mt-0.5 shrink-0 text-[#00a83b]" />{item}</li>
                ))}
              </ul>
            </div>
            <div className="relative overflow-hidden rounded-[8px] bg-[#f4ecd7] p-8">
              <h3 className="max-w-[240px] text-[28px] font-medium leading-none tracking-[-0.05em]">Available in multiple formulations</h3>
              <img src={landingNadInjection} alt="" className="absolute bottom-4 right-28 h-[255px] w-auto rotate-[-15deg] object-contain" />
              <img src={landingTestosterone} alt="" className="absolute -right-4 bottom-8 h-[245px] w-auto rotate-[15deg] object-contain" />
            </div>
          </div>
        </section>

        <section className="mx-auto mt-20 max-w-[1120px]">
          <h2 className="max-w-[260px] text-[22px] font-medium leading-tight tracking-[-0.04em]">Here's what our great customers say</h2>
          <div className="mt-8 grid grid-cols-2 gap-5">
            {["I can now offer precise dermatology prescriptions without sourcing headaches. My patients get exactly what they need.", "ScriptLinkRx cut our turnaround time and boosted client satisfaction with clear workflows and fewer reworks."].map((quote, index) => (
              <article key={quote} className="rounded-[8px] bg-[#f7f8ef] p-8">
                <p className="text-[16px] leading-6 tracking-[-0.03em] text-[#27312d]">{quote}</p>
                <div className="mt-8 flex items-center justify-between">
                  <p className="text-[10px] font-semibold text-[#66706b]">{index === 0 ? "Dr. Michael Chen" : "Sarah Johnson"}</p>
                  <div className="flex gap-1 text-[#77826e]">{Array.from({ length: 5 }).map((_, starIndex) => <Star key={starIndex} size={14} fill="currentColor" />)}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-20 max-w-[1120px] text-center">
          <h2 className="text-left text-[20px] font-medium tracking-[-0.04em]">Certifications Behind Every Partnership</h2>
          <div className="mt-8 flex items-center justify-center gap-16 rounded-[8px] bg-[#f8faf4] py-12 text-[18px] font-semibold text-[#26322d]">
            <span>LegitScript</span>
            <span>PCAB</span>
            <span>NABP</span>
          </div>
        </section>

        <section className="mx-auto mt-20 max-w-[1120px] text-center">
          <h2 className="text-[24px] font-medium leading-tight tracking-[-0.04em]">Proudly Serving<br />Nationwide</h2>
          <div className="relative mx-auto mt-10 h-[410px] max-w-[720px] rounded-[18px] bg-[#eef2e8]">
            <div className="absolute left-12 top-14 h-[290px] w-[500px] rounded-[45%] bg-[#b7c0a6] opacity-80" />
            <div className="absolute left-[340px] top-[120px] rounded-[8px] bg-white p-5 text-left shadow-[0_20px_40px_rgba(24,50,41,0.12)]">
              <p className="text-[13px] font-semibold">Texas</p>
              <p className="mt-1 text-[10px] text-[#8a938e]">5 Pharmacies Active</p>
              <div className="mt-4 space-y-2 text-[10px] text-[#435047]">
                {["DCA Pharmacy", "Optimal Balance Pharmacy", "Thesis Pharmacy", "Precision Compounding Pharmacy"].map(item => <p key={item}>{item}</p>)}
              </div>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-4 gap-3">
            {stats.map(([number, label]) => (
              <div key={label} className="rounded-[8px] border border-[#ededed] bg-white p-8 text-left">
                <p className="text-[48px] font-semibold tracking-[-0.06em] text-[#1f2723]">{number}</p>
                <p className="mt-4 text-[11px] font-medium text-[#9a9f9a]">{label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-20 max-w-[1430px] overflow-hidden rounded-[26px] bg-[#8a5a28] px-6 py-14 text-center text-white">
          <div className="mx-auto max-w-[760px] rounded-[18px] bg-black/20 px-8 py-12 backdrop-blur-sm">
            <h2 className="text-[42px] font-medium leading-none tracking-[-0.05em]">Ready to Simplify Pharmacy Fulfillment?</h2>
            <p className="mx-auto mt-5 max-w-[430px] text-[12px] leading-5 text-white/80">Discover how ScriptLinkRx can help your clinic streamline operations and expand treatment offerings.</p>
            <div className="mt-8 flex justify-center gap-3">
              <button type="button" onClick={onRequestDemoClick} className="h-10 cursor-pointer rounded-full bg-white px-6 text-[12px] font-semibold text-[#183229]">Request Demo</button>
              <button type="button" onClick={onLoginClick} className="h-10 cursor-pointer rounded-full bg-[#1d1d1a] px-6 text-[12px] font-semibold text-white">Talk to Sales</button>
            </div>
          </div>
        </section>

        <footer className="mx-auto mt-6 overflow-hidden rounded-[20px] bg-[#050609] px-10 pb-10 pt-16 text-white">
          <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr] gap-12 text-[11px] text-white/55">
            <p>Trusted compounding, patient care, efficiency, and access under one modern ordering platform.</p>
            <div>
              <p className="mb-4 font-semibold text-white">Company</p>
              <p>Blog Management</p>
              <p>About Us</p>
              <button type="button" onClick={onContactClick} className="cursor-pointer text-left transition-colors hover:text-white">Contact</button>
            </div>
            <div><p className="mb-4 font-semibold text-white">Info</p><p>Mission</p><p>Request a demo</p><p>View Catalog</p></div>
            <div><p className="mb-4 font-semibold text-white">Menu</p><p>Privacy Policy</p><p>Terms</p></div>
          </div>
          <h2 className="mt-28 w-fit cursor-pointer text-[96px] font-semibold tracking-[-0.07em] text-white/20 transition-colors duration-300 hover:text-white">
            Scriptlinkrx
          </h2>
        </footer>
      </div>
    </main>
  );
}

function PageContentSkeleton({ page }: { page: Page }) {
  const isTablePage = ["orders", "order-history", "pending-approvals", "users"].includes(page);
  const isCartPage = page === "cart-503b" || page === "cart-single" || page === "cart-multi" || page === "checkout-prescription";
  const isSupportPage = page === "support";

  if (isTablePage) {
    return (
      <div aria-live="polite" aria-busy="true" aria-label="Loading page" className="animate-pulse">
        <div className="h-9 w-56 rounded bg-[#e8e8e6]" />
        <div className="mt-8 flex items-center justify-between gap-6">
          <div className="h-10 w-[310px] rounded-[9px] bg-[#eeeeec]" />
          <div className="flex gap-3"><div className="h-10 w-28 rounded-[9px] bg-[#eeeeec]" /><div className="h-10 w-36 rounded-[9px] bg-[#eeeeec]" /></div>
        </div>
        <div className="mt-8 overflow-hidden rounded-[10px]">
          <div className="grid h-12 grid-cols-[1.2fr_1fr_1fr_1fr_.8fr] items-center gap-8 bg-[#f1f1ef] px-5">
            {Array.from({ length: 5 }, (_, index) => <div key={index} className="h-3 rounded bg-[#dcdcd9]" />)}
          </div>
          {Array.from({ length: 7 }, (_, row) => (
            <div key={row} className={`grid h-[72px] grid-cols-[1.2fr_1fr_1fr_1fr_.8fr] items-center gap-8 px-5 ${row % 2 ? "bg-[#fafafa]" : "bg-white"}`}>
              {Array.from({ length: 5 }, (_, column) => <div key={column} className={`h-4 rounded bg-[#e8e8e5] ${column === 0 ? "w-[82%]" : column === 4 ? "w-[60%]" : "w-full"}`} />)}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isCartPage) {
    return (
      <div aria-live="polite" aria-busy="true" aria-label="Loading cart" className="animate-pulse">
        <div className="h-9 w-24 rounded bg-[#e8e8e6]" />
        <div className="mt-10 rounded-[12px] bg-[#f7f7f6] p-6">
          <div className="flex justify-between"><div className="h-6 w-52 rounded bg-[#dededb]" /><div className="h-10 w-64 rounded-[9px] bg-[#e6e6e3]" /></div>
          {Array.from({ length: 2 }, (_, index) => (
            <div key={index} className="mt-6 grid min-h-[190px] grid-cols-[120px_1.2fr_1fr_230px] items-center gap-8 bg-white p-6">
              <div className="mx-auto h-28 w-16 rounded-[24px] bg-[#e9e9e6]" />
              <div className="space-y-3"><div className="h-5 w-44 rounded bg-[#dededb]" /><div className="h-4 w-56 rounded bg-[#eeeeeb]" /><div className="mt-8 h-10 w-full rounded-[9px] bg-[#f1f1ef]" /></div>
              <div className="space-y-3"><div className="h-5 w-36 rounded bg-[#e2e2df]" /><div className="h-4 w-52 rounded bg-[#eeeeeb]" /><div className="h-4 w-40 rounded bg-[#eeeeeb]" /></div>
              <div className="h-11 rounded-full bg-[#e8e8e5]" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isSupportPage) {
    return (
      <div aria-live="polite" aria-busy="true" aria-label="Loading support tickets" className="animate-pulse">
        <div className="flex items-center justify-between"><div className="h-9 w-52 rounded bg-[#e7e7e4]" /><div className="h-10 w-36 rounded-full bg-[#e4e4e1]" /></div>
        <div className="mt-8 grid min-h-[650px] grid-cols-[360px_1fr] overflow-hidden rounded-[12px] border border-[#ededeb]">
          <div className="border-r border-[#ededeb] p-4"><div className="h-10 rounded-[9px] bg-[#ededeb]" />{Array.from({ length: 6 }, (_, index) => <div key={index} className="mt-3 h-[82px] rounded-[9px] bg-[#f3f3f1]" />)}</div>
          <div className="flex items-center justify-center"><div className="space-y-3 text-center"><div className="mx-auto size-14 rounded-full bg-[#ececea]" /><div className="mx-auto h-5 w-44 rounded bg-[#e4e4e1]" /><div className="mx-auto h-4 w-64 rounded bg-[#eeeeeb]" /></div></div>
        </div>
      </div>
    );
  }

  return (
    <div aria-live="polite" aria-busy="true" aria-label="Loading page" className="animate-pulse">
      <div className="h-9 w-56 rounded bg-[#e7e7e4]" />
      <div className="mt-8 flex gap-4"><div className="h-10 w-36 rounded-[9px] bg-[#ededeb]" /><div className="h-10 w-36 rounded-[9px] bg-[#ededeb]" /></div>
      <div className="mt-8 grid grid-cols-[1.35fr_.9fr] gap-5">
        <div className="min-h-[520px] rounded-[12px] bg-[#f7f7f5] p-6"><div className="h-6 w-48 rounded bg-[#ddddda]" /><div className="mt-7 h-[360px] rounded-[10px] bg-white" /></div>
        <div className="space-y-5"><div className="h-[245px] rounded-[12px] bg-[#f3f3f1] p-6"><div className="h-5 w-36 rounded bg-[#ddddda]" /><div className="mt-5 h-12 rounded-[9px] bg-white" /><div className="mt-3 h-12 rounded-[9px] bg-white" /></div><div className="h-[210px] rounded-[12px] bg-[#f3f3f1]" /></div>
      </div>
    </div>
  );
}

// ─── App Shell ────────────────────────────────────────────────────────────────

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [authView, setAuthView] = useState<"landing" | "login" | "business-select" | "organization" | "register" | "single-sign-on" | "request-demo" | "contact">("landing");
  const [appTheme, setAppTheme] = useState<AppTheme>(() => {
    const savedTheme = window.localStorage.getItem("scriptlinkrx-theme");
    return savedTheme === "orange" ? "orange" : "default";
  });
  const [extraVariants, setExtraVariants] = useState(() => window.localStorage.getItem("scriptlinkrx-extra-variants") === "true");
  const [oldCatalog, setOldCatalog] = useState(() => window.localStorage.getItem("scriptlinkrx-old-catalog") === "true");
  const [pharmacyCatalog, setPharmacyCatalog] = useState(() => window.localStorage.getItem("scriptlinkrx-pharmacy-catalog") === "true");
  const [page, setPage] = useState<Page>(DEFAULT_PAGE);
  const [pageLoading, setPageLoading] = useState(false);
  const previousPageRef = useRef<Page>(DEFAULT_PAGE);
  const [cartMode, setCartMode] = useState<CartMode>("single");
  const [multiCartPatientIds, setMultiCartPatientIds] = useState<number[]>([]);
  const [patientCartEntries, setPatientCartEntries] = useState<PatientCartEntry[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<CardDef>(POPULAR_CARDS[0]);
  const [productCatalogType, setProductCatalogType] = useState<"503A" | "503B" | undefined>();
  function selectProduct(product: CardDef) {
    setSelectedProduct(product);
    setProductCatalogType(page === "catalog-503b" || page === "cart-503b" ? "503B" : page === "product-detail" ? productCatalogType : page === "catalog-503a" ? "503A" : undefined);
  }
  const mainScrollRef = useRef<HTMLElement>(null);
  const [selectedOrder, setSelectedOrder] = useState<typeof ORDERS[number]>(ORDERS[0]);
  const [favoriteProductIds, setFavoriteProductIds] = useState<Set<number>>(
    () => new Set(ALL_CARDS.filter((card) => card.heartVariant === "green").map((card) => card.id)),
  );
  const favoriteProducts = useMemo(
    () => ALL_CARDS.filter((card) => favoriteProductIds.has(card.id)),
    [favoriteProductIds],
  );
  const cartPage: Page = "cart-multi";
  const [cartPreviewItems, setCartPreviewItems] = useState<CartPreviewItem[]>([]);
  const [appLoading, setAppLoading] = useState(false);
  const [appToast, setAppToast] = useState<{ id: number; type: "success" | "error"; message: string } | null>(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMenuOpen, setChatMenuOpen] = useState(false);
  const [chatMuted, setChatMuted] = useState(false);
  const [showChatTutorial, setShowChatTutorial] = useState(
    () => window.localStorage.getItem("scriptlinkrx-chat-tutorial-seen") !== "true",
  );
  const [showPlatformTour, setShowPlatformTour] = useState(false);
  const [platformTourStep, setPlatformTourStep] = useState(0);
  const [platformTourTooltipVisible, setPlatformTourTooltipVisible] = useState(false);
  const [chatInput, setChatInput] = useState("");

  useLayoutEffect(() => {
    if (previousPageRef.current === page) return;
    previousPageRef.current = page;
    if (page === "products") {
      setPageLoading(false);
      return;
    }
    setPageLoading(true);
    const pageLoadingTimer = window.setTimeout(() => setPageLoading(false), 560);
    return () => window.clearTimeout(pageLoadingTimer);
  }, [page]);

  useLayoutEffect(() => {
    if (page !== "product-detail") return;
    const scroller = mainScrollRef.current;
    if (!scroller) return;
    scroller.scrollTop = 0;
    scroller.scrollLeft = 0;
    window.scrollTo(0, 0);
  }, [page, selectedProduct.id]);
  const [alexTyping, setAlexTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const [chatMessages, setChatMessages] = useState<Array<{ id: number; sender: "alex" | "user"; text: string }>>([
    { id: 1, sender: "alex", text: "Hi! I’m Alex. How can I help with your pharmacy or product order today?" },
  ]);

  useEffect(() => {
    window.localStorage.setItem("scriptlinkrx-authenticated", String(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    window.localStorage.setItem("scriptlinkrx-theme", appTheme);
  }, [appTheme]);

  useEffect(() => {
    window.localStorage.setItem("scriptlinkrx-extra-variants", String(extraVariants));
  }, [extraVariants]);

  useEffect(() => {
    window.localStorage.setItem("scriptlinkrx-old-catalog", String(oldCatalog));
  }, [oldCatalog]);

  useEffect(() => {
    window.localStorage.setItem("scriptlinkrx-pharmacy-catalog", String(pharmacyCatalog));
  }, [pharmacyCatalog]);

  useEffect(() => {
    if (!chatOpen) return;
    window.requestAnimationFrame(() => {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    });
  }, [chatMessages, alexTyping, chatOpen]);

  function getAlexReply(message: string) {
    const question = message.toLowerCase().replace(/[^a-z0-9\s-]/g, " ");
    const includesAny = (...terms: string[]) => terms.some((term) => question.includes(term));

    if (includesAny("thank", "thanks", "thx")) {
      return "You’re welcome! If you need anything else, I can help with products, patients, prescriptions, shipping, or order tracking.";
    }
    if (includesAny("hello", "hi ", "hey", "good morning", "good afternoon") || question.trim() === "hi") {
      return "Hi! How can I help?";
    }
    if (includesAny("multi shipping", "multi shiping", "multiple shipping", "multiple shiping", "multi-shipping", "multiple patient", "multi patient")) {
      if (includesAny("where", "find", "which pharmacy", "which pharmacies")) {
        return "Open Catalog and check the pharmacy options beside the search bar. Pharmacies that support it have a green “Multi-shipping” badge. Hover over the badge for details; pharmacies without the badge charge shipping per patient.";
      }
      return "Multi-shipping lets one supported pharmacy ship prescriptions for several patients with one shipping fee for that pharmacy cart. Look for the green Multi-shipping badge in Catalog.";
    }
    if (includesAny("where to find product", "where to find a product", "where can i find product", "where can i find a product", "how can i find product", "find a product", "find product", "search product", "look for product")) {
      return "Open Catalog from the left menu, then use the search field near the top. You can search by product name and use the pharmacy filter to narrow the results.";
    }
    if (includesAny("how to order", "how do i order", "how can i order", "place an order", "order a product", "buy a product", "how to buy")) {
      return "Open Catalog → choose a product → select its size, strength, and pharmacy → choose one or more patients → select Add to cart. In Cart, complete each prescription, choose shipping, then continue to checkout.";
    }
    if (includesAny("best product", "best products", "which product", "recommend product", "recommendation")) {
      return "There isn’t one best product for every patient. The right option depends on the treatment goal, medical history, and prescriber’s decision. You can browse Catalog and compare formulations and pharmacies, but confirm the clinical choice with the prescriber.";
    }
    if (includesAny("shipping", "delivery", "arrive", "how long")) {
      return "Delivery depends on the pharmacy and shipping method you select. Most orders are processed within one business day, then arrive in about 1–3 business days. Your cart shows the exact method and fee before checkout.";
    }
    if (includesAny("tracking", "track", "where is my order", "order status")) {
      return "Open Orders and select the order to see its live status and tracking. If it says “Tracking Not Ready,” the pharmacy hasn’t created the shipping label yet.";
    }
    if (includesAny("semaglutide", "tirzepatide", "pt-141", "bremelanotide", "available", "availability", "injectable")) {
      return "Availability can vary by product strength, size, and pharmacy. Open the product in Catalog, choose its options, and the available pharmacy choices and prices will update there.";
    }
    if (includesAny("price", "cost", "how much", "cheapest")) {
      return "The price changes with the product configuration and pharmacy. Choose the size and strength on the product page to compare options; the cart will show the final product price plus shipping.";
    }
    if (includesAny("prescription", "prescriber", "open rx", " rx ", "doctor")) {
      return "Prescription details are completed for each patient in the cart. The assigned prescriber and prescription status are also shown in Order Details after the order is created.";
    }
    if (includesAny("patient", "address", "add person")) {
      return "Choose a patient on the product page, or create a new one from the patient menu. You can add several patients, set a quantity for each, and review every patient’s address in the cart.";
    }
    if (includesAny("cancel", "refund", "return")) {
      return "Open the order in Orders and use Request Cancellation. If the pharmacy has already started processing it, create a support ticket so the team can review the available options.";
    }
    if (includesAny("support", "human", "agent", "ticket", "someone")) {
      return "You can open Support Tickets from the left menu. You can also use the three-dot menu here and choose Support tickets to contact the team.";
    }
    if (includesAny("pharmacy", "pharmacies")) {
      return "Catalog lets you filter across all six pharmacies. Each product page shows available pharmacy prices, and pharmacies that combine shipping for multiple patients have a Multi-shipping badge.";
    }
    if (includesAny("cart", "checkout", "add to cart")) {
      return "After choosing a pharmacy and at least one patient, add the product to the cart. Items are grouped by pharmacy, with each patient’s quantity, price, prescription fields, address, and shipping option shown together.";
    }

    return "I’m not completely sure what you mean yet. Could you tell me whether this is about a product, patient, prescription, pharmacy, shipping, or an existing order?";
  }

  function sendChatMessage(event: FormEvent) {
    event.preventDefault();
    const message = chatInput.trim();
    if (!message) return;
    setChatMessages(current => [...current, { id: Date.now(), sender: "user", text: message }]);
    setChatInput("");
    setAlexTyping(true);
    window.setTimeout(() => {
      setChatMessages(current => [...current, {
        id: Date.now() + 1,
        sender: "alex",
        text: getAlexReply(message),
      }]);
      setAlexTyping(false);
    }, 900);
  }

  function dismissChatTutorial() {
    setShowChatTutorial(false);
    window.localStorage.setItem("scriptlinkrx-chat-tutorial-seen", "true");
  }

  function startChatWelcome() {
    setChatMessages([]);
    setChatOpen(true);
    setAlexTyping(true);
    window.setTimeout(() => {
      setChatMessages(current => [...current, { id: Date.now(), sender: "alex", text: "Hi! I’m Alex. How can I help with your pharmacy or product order today?" }]);
      setAlexTyping(false);
    }, 1100);
  }

  function finishPlatformTour() {
    window.localStorage.setItem("scriptlinkrx-platform-tour-seen", "true");
    setShowPlatformTour(false);
    setPlatformTourTooltipVisible(false);
    setPlatformTourStep(0);
    startChatWelcome();
  }

  const cart503BItemCount = cartPreviewItems.filter(item => cartScope(item) === "503B").reduce((count, item) => count + (item.qty ?? 1), 0);
  const cartItemCount = cartPreviewItems.filter(item => cartScope(item) === "standard").reduce((count, item) => count + (item.qty ?? 1), 0);

  function addCartItems(count = 1, product?: CartPreviewItem) {
    if (product) {
      setCartPreviewItems((current) => {
        const existingIndex = current.findIndex((item) => item.id === product.id && cartScope(item) === cartScope(product));
        if (existingIndex === -1) {
          return [{ ...product, qty: product.qty ?? count }, ...current];
        }
        const next = [...current];
        const existing = next[existingIndex];
        next.splice(existingIndex, 1);
        return [{ ...existing, ...product, qty: (existing.qty ?? 1) + (product.qty ?? count) }, ...next];
      });
    }
  }

  function updateCartItemQty(id: number, delta: number, scope: CartScope = "standard", syncEntries = false) {
    if (syncEntries) setPatientCartEntries(current => {
      const matching = current.filter(entry => entry.product.id === id && cartScope(entry) === scope && entry.qty > 0);
      const target = delta > 0 ? matching[0] : matching[matching.length - 1];
      return target ? current.map(entry => entry.id === target.id ? { ...entry, qty: Math.max(0, entry.qty + delta) } : entry).filter(entry => entry.qty > 0) : current;
    });
    setCartPreviewItems((current) =>
      current
        .map((item) => item.id === id && cartScope(item) === scope ? { ...item, qty: Math.max(0, (item.qty ?? 1) + delta) } : item)
        .filter((item) => (item.qty ?? 1) > 0),
    );
  }

  function removeCartItem(id: number, scope: CartScope = "standard") {
    setCartPreviewItems(current => current.filter(item => !(item.id === id && cartScope(item) === scope)));
    setPatientCartEntries(current => current.filter(entry => !(entry.product.id === id && cartScope(entry) === scope)));
  }

  function clearCartItems(scope: CartScope = "standard") {
    setCartPreviewItems(current => current.filter(item => cartScope(item) !== scope));
    setPatientCartEntries(current => current.filter(entry => cartScope(entry) !== scope));
    if (scope === "standard") setMultiCartPatientIds([]);
  }

  function addToPatientCart(entries: PatientCartEntry[]) {
    setPatientCartEntries(current => [...current, ...entries]);
    setMultiCartPatientIds(current => [...new Set([...current, ...entries.flatMap(entry => entry.patientId === null ? [] : [entry.patientId])])]);
  }

  function updateCartEntryQuantity(id: number, quantity: number) {
    const entry = patientCartEntries.find(item => item.id === id);
    if (!entry) return;
    updateCartItemQty(entry.product.id, quantity - entry.qty, cartScope(entry));
    setPatientCartEntries(current => current.map(item => item.id === id ? { ...item, qty: quantity } : item));
  }

  function updatePatientCartQuantity(productId: number, patientId: number, quantity: number) {
    setPatientCartEntries(current => {
      const matching = current.filter(entry => entry.product.id === productId && entry.patientId === patientId);
      if (quantity === 0) return current.filter(entry => !(entry.product.id === productId && entry.patientId === patientId));
      if (matching.length === 0) return current;
      const firstMatchingId = matching[0].id;
      return current
        .filter(entry => entry.id === firstMatchingId || entry.product.id !== productId || entry.patientId !== patientId)
        .map(entry => entry.id === firstMatchingId ? { ...entry, qty: quantity } : entry);
    });
    if (quantity === 0) {
      setMultiCartPatientIds(current => current.filter(id => id !== patientId || patientCartEntries.some(entry => entry.patientId === id && entry.product.id !== productId)));
    }
  }

  function runWithAppLoader(action: () => void, delayMs = 500) {
    if (appLoading) return;
    setAppLoading(true);
    window.setTimeout(() => {
      try {
        action();
      } catch {
        showToast("Failed to update", "error");
      } finally {
        setAppLoading(false);
      }
    }, delayMs);
  }

  function showToast(message: string, type: "success" | "error" = "success") {
    const id = Date.now();
    setAppToast({ id, type, message });
    window.setTimeout(() => {
      setAppToast((current) => current?.id === id ? null : current);
    }, 4200);
  }

  function renderPage() {
    switch (page) {
      case "dashboard":
        return <DashboardPage onNavigate={setPage} />;
      case "products":
      case "catalog-503a":
      case "catalog-503b":
        return (
          <ProductsPage
            onNavigate={setPage}
            cartMode={cartMode}
            setCartMode={setCartMode}
            onProductSelect={selectProduct}
            oldCatalog={oldCatalog}
            pharmacyCatalog={pharmacyCatalog}
          />
        );
      case "favorites":
        return <FavoritesPage onNavigate={setPage} cartPage={cartPage} onProductSelect={selectProduct} />;
      case "product-detail":
        return <ProductDetailPage onNavigate={setPage} cartMode={cartMode} setCartMode={setCartMode} onAddToPatientCart={addToPatientCart} onUpdatePatientCartQuantity={updatePatientCartQuantity} product={selectedProduct} extraVariants={extraVariants} catalogType={productCatalogType} />;
      case "pharmacies":
        return <PharmaciesPage onNavigate={setPage} />;
      case "orders":
        return <OrdersPage onNavigate={setPage} onOrderSelect={(order) => { setSelectedOrder(order); setPage("order-detail"); }} extraVariants={extraVariants} />;
      case "order-detail":
        return <OrderDetailPage order={selectedOrder} onNavigate={setPage} />;
      case "order-history":
        return <OrderHistoryPage onNavigate={setPage} />;
      case "pending-approvals":
        return <PendingApprovalsPage onNavigate={setPage} />;
      case "support":
        return <SupportPage onNavigate={setPage} />;
      case "users":
        return <UsersPage onNavigate={setPage} />;
      case "settings":
        return <SettingsPage onNavigate={setPage} />;
      case "cart-503b":
        return <MultiPatientCartPage key="503B" cartScope="503B" onNavigate={setPage} cartMode="single" setCartMode={setCartMode} selectedPatientIds={[]} cartEntries={patientCartEntries.filter(entry => cartScope(entry) === "503B" && entry.qty > 0)} extraVariants={extraVariants} onUpdateEntryQuantity={updateCartEntryQuantity} />;
      case "cart-single":
        return <MultiPatientCartPage onNavigate={setPage} cartMode={cartMode} setCartMode={setCartMode} selectedPatientIds={multiCartPatientIds} key="standard" cartEntries={patientCartEntries.filter(entry => cartScope(entry) === "standard" && entry.qty > 0)} extraVariants={extraVariants} onUpdateEntryQuantity={updateCartEntryQuantity} />;
      case "cart-multi":
        return <MultiPatientCartPage onNavigate={setPage} cartMode={cartMode} setCartMode={setCartMode} selectedPatientIds={multiCartPatientIds} key="standard" cartEntries={patientCartEntries.filter(entry => cartScope(entry) === "standard" && entry.qty > 0)} extraVariants={extraVariants} onUpdateEntryQuantity={updateCartEntryQuantity} />;
      case "checkout-prescription":
        return <CheckoutPrescriptionPage onNavigate={setPage} />;
      default:
        return (
          <ProductsPage
            onNavigate={setPage}
            cartMode={cartMode}
            setCartMode={setCartMode}
            onProductSelect={selectProduct}
            oldCatalog={oldCatalog}
            pharmacyCatalog={pharmacyCatalog}
          />
        );
    }
  }

  if (!isAuthenticated) {
    if (authView === "login") {
      return (
        <LoginPage
          onBackToLanding={() => setAuthView("landing")}
          onRegister={() => setAuthView("register")}
          onSingleSignOn={() => setAuthView("single-sign-on")}
          onLogin={destination => {
            if (destination === "catalog") {
              setIsAuthenticated(true);
              setPage("products");
              return;
            }
            setAuthView(destination === "business" ? "business-select" : "organization");
          }}
        />
      );
    }

    if (authView === "business-select") {
      return (
        <BusinessSelectionPage
          onBack={() => setAuthView("login")}
          onSelect={business => {
            window.localStorage.setItem("scriptlinkrx-selected-business", business);
            setIsAuthenticated(true);
            setPage("products");
          }}
        />
      );
    }

    if (authView === "organization") {
      return (
        <OrganizationSetupPage
          onCreate={() => {
            setIsAuthenticated(true);
            setPlatformTourStep(0);
            setPage("products");
            setShowPlatformTour(false);
            setPlatformTourTooltipVisible(false);
          }}
        />
      );
    }

    if (authView === "single-sign-on") {
      return <SingleSignOnPage onBackToLogin={() => setAuthView("login")} />;
    }

    if (authView === "register") {
      return <RegisterPage onBackToLogin={() => setAuthView("login")} />;
    }

    if (authView === "request-demo") {
      return <RequestDemoPage onBackToLanding={() => setAuthView("landing")} onLoginClick={() => setAuthView("login")} />;
    }

    if (authView === "contact") {
      return <ContactPage onBackToLanding={() => setAuthView("landing")} />;
    }

    return <LandingPage onLoginClick={() => setAuthView("login")} onRegisterClick={() => setAuthView("register")} onRequestDemoClick={() => setAuthView("request-demo")} onContactClick={() => setAuthView("contact")} />;
  }

  const platformTourSteps = [
    {
      icon: <BookOpen size={23} />,
      title: "Catalog",
      description: "Browse and search all available products, then compare configurations, pharmacy prices, and availability.",
      hint: "This is where every new product order begins.",
      card: "left-[260px] top-[145px]",
      arrow: "-left-2 top-7",
    },
    {
      icon: <ClipboardList size={23} />,
      title: "Orders",
      description: "Review submitted orders and follow approval, payment, pharmacy processing, tracking, and delivery.",
      hint: "Open an order to see its full details and patient tracking link.",
      card: "left-[260px] top-[182px]",
      arrow: "-left-2 top-7",
    },
    {
      icon: <ShoppingCart size={23} />,
      title: "Cart",
      description: "Review products by patient and pharmacy, complete prescription fields, and choose shipping before checkout.",
      hint: "Continue becomes available when all required information is complete.",
      card: "left-[260px] top-[219px]",
      arrow: "-left-2 top-7",
    },
    {
      icon: <Truck size={23} />,
      title: "Multi-shipping pharmacies",
      description: "In Catalog, supported pharmacies display a green Multi-shipping badge in the pharmacy filter row.",
      hint: "It means one shipping fee can cover prescriptions for multiple patients from that pharmacy.",
      card: "left-[310px] top-[245px]",
      arrow: "left-10 -top-2",
    },
  ];
  const activeTourStep = platformTourSteps[platformTourStep];

  return (
    <AppLoadingContext.Provider value={{ runWithAppLoader, showToast }}>
      <CartSummaryContext.Provider value={{ cartItemCount, cart503BItemCount, cartPreviewItems, addCartItems, updateCartItemQty, removeCartItem, clearCartItems }}>
        <ProductFavoritesContext.Provider value={{ favoriteProductIds, setFavoriteProductIds, favoriteProducts }}>
          <div className={`app-theme app-theme-${appTheme} flex h-screen overflow-hidden bg-[var(--app-soft-hover)] font-['Inter',sans-serif]`}>
            {/* Sidebar Navigation */}
            <Sidebar
              active={page}
              onNavigate={setPage}
              cartPage={cartPage}
              onLogout={() => {
                setAuthView("login");
                setIsAuthenticated(false);
                setChatOpen(false);
                setChatMenuOpen(false);
              }}
              appTheme={appTheme}
              setAppTheme={setAppTheme}
              extraVariants={extraVariants}
              setExtraVariants={setExtraVariants}
              oldCatalog={oldCatalog}
              setOldCatalog={setOldCatalog}
              pharmacyCatalog={pharmacyCatalog}
              setPharmacyCatalog={setPharmacyCatalog}
            />

            {/* Main content area */}
            <main ref={mainScrollRef} className="app-main-scroll h-screen min-w-0 flex-1 overflow-y-scroll p-3 pl-1.5">
              <div className="bg-card rounded-[10px] min-h-full p-7 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
                <div className="w-full max-w-[1400px]">
                  {pageLoading ? <PageContentSkeleton page={page} /> : renderPage()}
                </div>
              </div>
            </main>

            {showPlatformTour && platformTourTooltipVisible && (
                <div className={`chat-welcome-in fixed z-[82] w-[330px] rounded-[18px] bg-[#171717] p-5 text-white shadow-[0_22px_65px_rgba(0,0,0,0.32)] ${activeTourStep.card}`}>
                  <span className={`absolute size-4 rotate-45 bg-[#171717] ${activeTourStep.arrow}`} aria-hidden="true" />
                  <div className="relative flex items-center justify-between">
                    <div className="flex size-10 items-center justify-center rounded-[12px] bg-[#dff2a8] text-[#064b2f]">{activeTourStep.icon}</div>
                    <button onClick={finishPlatformTour} className="rounded-full px-2.5 py-1.5 text-[11px] text-white/55 hover:bg-white/10 hover:text-white">End tips</button>
                  </div>
                  <p className="relative mt-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#b9d879]">Quick tip</p>
                  <h2 className="relative mt-1.5 text-[18px] font-semibold leading-[24px]">{activeTourStep.title}</h2>
                  <p className="relative mt-2 text-[12px] leading-[18px] text-white/70">{activeTourStep.description}</p>
                  <div className="relative mt-4 rounded-[11px] bg-white/[0.08] px-3 py-2.5 text-[11px] leading-[16px] text-white/65">{activeTourStep.hint}</div>
                  <div className="relative mt-5 flex items-center gap-2">
                    <div className="flex flex-1 gap-1.5">{platformTourSteps.map((_, index) => <span key={index} className={`h-1.5 rounded-full transition-all ${index === platformTourStep ? "w-6 bg-[#d8ffa2]" : index < platformTourStep ? "w-2.5 bg-white/40" : "w-2.5 bg-white/20"}`} />)}</div>
                    <button onClick={() => {
                      if (platformTourStep === platformTourSteps.length - 1) finishPlatformTour();
                      else setPlatformTourStep(step => step + 1);
                    }} className="h-9 rounded-[9px] bg-[#d8ffa2] px-4 text-[11px] font-semibold text-[#123422] hover:bg-[#c9ef96]">{platformTourStep === platformTourSteps.length - 1 ? "Finish" : "Next"}</button>
                  </div>
                </div>
            )}

            {/* Chat popup */}
            {chatOpen && (
              <div className="chat-welcome-in fixed bottom-[76px] right-5 z-50 flex h-[430px] w-[385px] flex-col overflow-hidden rounded-[21px] bg-white shadow-[0_20px_55px_rgba(5,60,35,0.24)]">
                <div className="flex h-[101px] items-center bg-[#004b2d] px-[35px] pb-[15px] pt-[14px] text-white">
                  <div className="flex size-[34px] items-center justify-center overflow-hidden rounded-full bg-[#f0b33a] text-[18px]">👨🏾</div>
                  <div className="ml-[11px]">
                    <p className="text-[14px] font-medium leading-tight">Alex Rivera</p>
                    <p className="mt-[2px] text-[12px] leading-tight text-white/70">Online</p>
                  </div>
                  <button onClick={() => setChatMenuOpen(current => !current)} className="ml-auto flex size-8 items-center justify-center text-[24px] leading-none text-white" aria-expanded={chatMenuOpen} aria-label="Chat options">⋮</button>
                </div>
                {chatMenuOpen && (
                  <div className="absolute right-4 top-[62px] z-20 w-[205px] overflow-hidden rounded-[10px] border border-[#dfe5e2] bg-white p-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.18)]">
                    <button onClick={() => { setChatMuted(current => !current); setChatMenuOpen(false); }} className="flex h-9 w-full items-center gap-2 rounded-[7px] px-2.5 text-left text-[11px] font-medium text-[#1a1a1a] hover:bg-[#f3f6f4]"><Bell size={14} /> {chatMuted ? "Unmute notifications" : "Mute notifications"}</button>
                    <button onClick={() => { setChatMessages([{ id: Date.now(), sender: "alex", text: "Hi! I’m Alex. How can I help with your pharmacy or product order today?" }]); setChatInput(""); setAlexTyping(false); setChatMenuOpen(false); }} className="flex h-9 w-full items-center gap-2 rounded-[7px] px-2.5 text-left text-[11px] font-medium text-[#1a1a1a] hover:bg-[#f3f6f4]"><RefreshCw size={14} /> New conversation</button>
                    <button onClick={() => { setPage("support"); setChatOpen(false); setChatMenuOpen(false); }} className="flex h-9 w-full items-center gap-2 rounded-[7px] px-2.5 text-left text-[11px] font-medium text-[#1a1a1a] hover:bg-[#f3f6f4]"><MessageSquare size={14} /> Support tickets</button>
                    <div className="my-1 h-px bg-[#e8ece9]" />
                    <button onClick={() => { setChatOpen(false); setChatMenuOpen(false); }} className="flex h-9 w-full items-center gap-2 rounded-[7px] px-2.5 text-left text-[11px] font-medium text-[#1a1a1a] hover:bg-[#f3f6f4]"><X size={14} /> Close chat</button>
                  </div>
                )}
                <div className="relative -mt-[15px] flex min-h-0 flex-1 flex-col rounded-t-[21px] bg-white">
                  <div className="flex-1 space-y-4 overflow-y-auto px-[19px] pb-4 pt-[31px]">
                    {chatMessages.map(message => message.sender === "alex" ? (
                      <div key={message.id} className="flex items-start gap-[12px]">
                        <div className="flex size-[23px] shrink-0 items-center justify-center rounded-full bg-[#f0b33a] text-[11px]">👨🏾</div>
                        <div className="w-fit max-w-[278px] rounded-[20px] bg-[#eaf2bd] px-[15px] py-[13px] text-[13px] leading-[16px] text-[#111]">{message.text}</div>
                      </div>
                    ) : (
                      <div key={message.id} className="ml-auto w-fit max-w-[275px] rounded-[20px] bg-black px-[15px] py-[13px] text-[13px] leading-[16px] text-white">{message.text}</div>
                    ))}
                    {alexTyping && <div className="flex items-center gap-[12px]"><div className="flex size-[23px] shrink-0 items-center justify-center rounded-full bg-[#f0b33a] text-[11px]">👨🏾</div><div className="flex gap-1 rounded-[16px] bg-[#eaf2bd] px-4 py-3"><span className="size-1.5 animate-pulse rounded-full bg-[#60712d]" /><span className="size-1.5 animate-pulse rounded-full bg-[#60712d] [animation-delay:150ms]" /><span className="size-1.5 animate-pulse rounded-full bg-[#60712d] [animation-delay:300ms]" /></div></div>}
                    <div ref={chatEndRef} aria-hidden="true" />
                  </div>
                  <form onSubmit={sendChatMessage} className="flex items-center gap-2 border-t border-[#e9ecea] bg-white px-4 py-3">
                    <input value={chatInput} onChange={event => setChatInput(event.target.value)} placeholder="Write a message..." className="h-10 min-w-0 flex-1 rounded-full border border-[#dce2df] bg-[#f7f9f8] px-4 text-[12px] outline-none placeholder:text-[#929b96] focus:border-[#004b2d]" />
                    <button type="submit" disabled={!chatInput.trim()} className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#004b2d] text-white transition-colors hover:bg-[#063c27] disabled:cursor-not-allowed disabled:bg-[#b8c4be]" aria-label="Send message"><ArrowUpRight size={16} /></button>
                  </form>
                </div>
              </div>
            )}

            {/* Chat bubble */}
            <div className="fixed bottom-5 right-5 z-50">
              {showChatTutorial && !chatOpen && (
                <div className="chat-welcome-in absolute bottom-[60px] right-0 w-[310px] rounded-[18px] bg-[#171717] p-4 text-white shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
                  <span className="absolute -bottom-2 right-[14px] size-4 rotate-45 bg-[#171717]" aria-hidden="true" />
                  <div className="relative flex items-start justify-between gap-3">
                    <div>
                      <p className="text-[14px] font-semibold">Meet Alex, your assistant</p>
                      <p className="mt-1 text-[11px] leading-[16px] text-white/65">Ask questions and get help while you work.</p>
                    </div>
                    <button onClick={dismissChatTutorial} className="flex size-7 shrink-0 items-center justify-center rounded-full text-white/65 hover:bg-white/10 hover:text-white" aria-label="Dismiss chat tutorial"><X size={14} /></button>
                  </div>
                  <div className="relative mt-3 rounded-[13px] bg-[#eaf2bd] p-3 text-[#142218]">
                    <div className="flex items-center gap-2 text-[11px] font-semibold"><MessageSquare size={13} /> Ask Alex about:</div>
                    <p className="mt-2 text-[11px] leading-[16px] text-[#435047]">Finding products, placing orders, multi-shipping, prescriptions, delivery, and tracking.</p>
                  </div>
                  <button onClick={() => { dismissChatTutorial(); setChatOpen(true); }} className="relative mt-3 h-10 w-full rounded-[10px] bg-[#2f2f2f] text-[12px] font-semibold text-white transition-colors hover:bg-[#3a3a3a]">Try the chat</button>
                </div>
              )}
              <button onClick={() => {
                if (chatOpen) setChatOpen(false);
                else { dismissChatTutorial(); setChatOpen(true); }
              }} className="w-11 h-11 bg-[#053c23] rounded-full flex items-center justify-center shadow-lg hover:bg-[#183229] transition-colors" aria-expanded={chatOpen} aria-label={chatOpen ? "Close chat" : "Open chat"}>
                <MessageSquare size={16} className="text-[#d8ffa2]" />
              </button>
            </div>
          </div>
          <AppActionOverlay active={appLoading} />
          <AppToast toast={appToast} onClose={() => setAppToast(null)} />
        </ProductFavoritesContext.Provider>
      </CartSummaryContext.Provider>
    </AppLoadingContext.Provider>
  );
}
