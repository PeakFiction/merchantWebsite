import CardLink from "../components/CardLink.jsx";
import { siteConfig } from "../config/siteConfig.js";

export default function Home() {
  return (
    <div className="card sectionPad">
      <div className="h1">{siteConfig.businessName}</div>
      <p className="p" style={{ maxWidth: 760 }}>
        Food & Beverage uses fixed pricing and scheduled made-to-order production. Tailoring is quote-based depending on the requested model.
        Orders are confirmed via WhatsApp. Payment: transfer or QRIS. Shipping: courier tariff; free shipping may apply when active.
      </p>

      <div className="row" style={{ marginTop: 16 }}>
        <span className="badge">Made-to-order / Pre-order</span>
        <span className="badge">Transfer + QRIS</span>
        <span className="badge">Courier tariff shipping</span>
      </div>

      <div className="grid2" style={{ marginTop: 18 }}>
        <CardLink
          to="/catalog/fnb"
          title="Food & Beverage"
          desc="Browse products with fixed prices. Choose quantity + schedule, then submit an order."
          badges={["Fixed pricing", "Schedule delivery", "WhatsApp confirmation"]}
        />
        <CardLink
          to="/tailoring"
          title="Tailoring"
          desc="Browse services and portfolio. Submit a quote request with measurements, references, and deadlines."
          badges={["Quote-based", "Made-to-order", "WhatsApp consultation"]}
        />
      </div>

      <hr className="hr" />
      <div className="grid3">
        <div className="panel sectionPad">
          <div className="h3">Fast ordering</div>
          <div className="small">Submit details once. Confirmation happens via WhatsApp.</div>
        </div>
        <div className="panel sectionPad">
          <div className="h3">Clear policies</div>
          <div className="small">Cancellation, courier issues, returns, refunds.</div>
        </div>
        <div className="panel sectionPad">
          <div className="h3">Production dates</div>
          <div className="small">Made-to-order lead times are shown per item/service.</div>
        </div>
      </div>
    </div>
  );
}
