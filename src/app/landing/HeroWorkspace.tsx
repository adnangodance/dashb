import { ArrowUpRight, Check, ChevronDown, LayoutGrid, ListFilter, Package, Plus, Search, Settings2, ShieldCheck, Users } from "lucide-react";
import firstChoiceLogo from "../../assets/pharmacies/first-choice.png";
import optimalBalanceLogo from "../../assets/pharmacies/optimal-balance.png";
import precisionLogo from "../../assets/pharmacies/precision.png";
import { landingAsset } from "./assets";
import { partnerCount } from "./LandingInteractions";

// Illustrative rows use the products, pharmacies and status labels already in App.tsx.
const orders = [
  { initials: "EK", product: "Semaglutide", pharmacy: "Precision Compounding", status: "Processing", tone: "processing" },
  { initials: "JR", product: "Testosterone Cypionate", pharmacy: "Rush Pharmacy FL", status: "Shipped", tone: "shipped" },
  { initials: "ZR", product: "Tesamorelin/Ipamorelin", pharmacy: "Optimal Balance Pharmacy", status: "Pending Approval", tone: "pending" },
  { initials: "SM", product: "NAD+ Injection", pharmacy: "1st Choice Compounding Pharmacy", status: "Delivered", tone: "delivered" },
];

const network = [
  { name: "1st Choice Compounding Pharmacy", logo: firstChoiceLogo },
  { name: "Optimal Balance Pharmacy", logo: optimalBalanceLogo },
  { name: "Precision Fulfillment Pharmacy", logo: precisionLogo },
];

export function HeroWorkspace() {
  return (
    <div className="slrx-hero-workspace" aria-hidden="true">
      <div className="slrx-workspace-frame">
        <div className="slrx-workspace-chrome">
          <span className="slrx-workspace-window-controls"><i /><i /><i /></span>
          <span className="slrx-workspace-chrome-title">ScriptLinkRx <span>/ Your workspace</span></span>
          <span className="slrx-workspace-chrome-mark"><ShieldCheck size={13} /></span>
        </div>
        <div className="slrx-workspace-app">
          <div className="slrx-workspace-sidebar">
            <img src={landingAsset("new_logo.svg")} width="25" height="21" alt="" />
            <LayoutGrid size={17} />
            <span className="slrx-workspace-sidebar-active"><Package size={17} /></span>
            <Users size={17} />
            <Settings2 size={17} className="slrx-workspace-sidebar-settings" />
          </div>
          <div className="slrx-workspace-content">
            <div className="slrx-workspace-heading">
              <div><span className="slrx-workspace-eyebrow">YOUR PRACTICE, CONNECTED</span><strong>Orders</strong></div>
              <span className="slrx-workspace-new"><Plus size={13} /><span>New order</span></span>
            </div>
            <div className="slrx-workspace-stats">
              <div><strong>{partnerCount}</strong><span>Partner pharmacies</span></div>
              <div><strong>503A</strong><span>Patient prescriptions</span></div>
              <div><strong>503B</strong><span>Office-use supply</span></div>
            </div>
            <div className="slrx-workspace-toolbar">
              <span className="slrx-workspace-tab">All orders</span>
              <span className="slrx-workspace-pharmacy-filter">All pharmacies <ChevronDown size={11} /></span>
              <span className="slrx-workspace-tools"><Search size={14} /><ListFilter size={14} /></span>
            </div>
            <div className="slrx-workspace-table">
              <div className="slrx-workspace-table-head"><span>Patient</span><span>Product / Pharmacy</span><span>Status</span></div>
              {orders.map(order => (
                <div className="slrx-workspace-order" key={order.initials}>
                  <span className={`slrx-workspace-avatar slrx-workspace-avatar-${order.tone}`}>{order.initials}</span>
                  <div className="slrx-workspace-product"><strong>{order.product}</strong><span>{order.pharmacy}</span></div>
                  <span className={`slrx-workspace-status slrx-workspace-status-${order.tone}`}>{order.status}</span>
                </div>
              ))}
            </div>
            <div className="slrx-workspace-footer"><Check size={12} /><span>Every order. One connected workspace.</span></div>
          </div>
        </div>
      </div>
      <div className="slrx-workspace-network">
        <div className="slrx-workspace-network-heading"><span className="slrx-workspace-network-icon"><LayoutGrid size={17} /></span><div><strong>Pharmacy network</strong><span>503A &amp; 503B partners</span></div><ArrowUpRight size={15} /></div>
        <div className="slrx-workspace-network-logos">
          {network.map(partner => <div key={partner.name}><img src={partner.logo} alt="" width="100" height="38" decoding="async" /></div>)}
        </div>
        <div className="slrx-workspace-network-footer"><span>Connected through ScriptLinkRx</span><Check size={13} /></div>
      </div>
    </div>
  );
}
