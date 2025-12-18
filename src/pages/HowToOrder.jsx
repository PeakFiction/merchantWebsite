import { Link } from "react-router-dom";

export default function HowToOrder() {
  return (
    <div className="card sectionPad">
      <div className="h2">How to Order</div>
      <p className="p">
        The website collects your details. Final confirmation (availability, shipping tariff, total) happens via WhatsApp.
      </p>

      <hr className="hr" />

      <div className="grid2">
        <div className="panel sectionPad">
          <div className="h3">Food & Beverage</div>
          <ol className="p" style={{ marginTop: 10 }}>
            <li>Choose product + variant + quantity.</li>
            <li>Enter name, phone, full address, date + time window.</li>
            <li>Submit → get an order code → send to WhatsApp.</li>
            <li>We confirm shipping tariff + total.</li>
            <li>Pay via QRIS/Transfer → production → pickup/shipping.</li>
          </ol>
        </div>

        <div className="panel sectionPad">
          <div className="h3">Tailoring</div>
          <ol className="p" style={{ marginTop: 10 }}>
            <li>Pick a service or category.</li>
            <li>Submit quote request with measurements + references + deadline.</li>
            <li>Submit → get a quote code → send to WhatsApp.</li>
            <li>We confirm price + timeline.</li>
            <li>Pay via QRIS/Transfer → production → pickup/shipping.</li>
          </ol>
        </div>
      </div>

      <div className="row" style={{ marginTop: 16 }}>
        <Link className="btn primary" to="/catalog/fnb">Browse F&B</Link>
        <Link className="btn" to="/tailoring">Browse Tailoring</Link>
        <Link className="btn ghost" to="/policies">Policies</Link>
      </div>
    </div>
  );
}
