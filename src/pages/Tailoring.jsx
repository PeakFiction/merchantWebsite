import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCatalog } from "../api/catalog.js";

export default function Tailoring() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    getCatalog().then((c) => setItems(c.tailoring)).catch(() => setItems([]));
  }, []);

  if (!items) return <div className="panel sectionPad">Loading…</div>;

  return (
    <div>
      <div className="h2">Tailoring</div>
      <p className="p">Quote-based services. Managed in the admin page.</p>

      <div style={{ marginTop: 14, display: "grid", gap: 12 }}>
        {items.map((s) => (
          <div key={s.slug} className="panel sectionPad">
            <div className="h3" style={{ margin: 0 }}>{s.name}</div>
            <div className="small">Pricing: {s.priceMode} • Lead time: {s.leadTime}</div>
            <p className="p">{s.description}</p>
            <div className="row" style={{ marginTop: 10 }}>
              <Link className="btn primary" to={`/tailoring/${s.slug}`}>View</Link>
              <Link className="btn" to={`/quote/${s.slug}`}>Request Quote</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
