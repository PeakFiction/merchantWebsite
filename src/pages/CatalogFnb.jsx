import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCatalog } from "../api/catalog.js";

export default function CatalogFnb() {
  const [items, setItems] = useState(null);

  useEffect(() => {
    getCatalog().then((c) => setItems(c.fnb)).catch(() => setItems([]));
  }, []);

  if (!items) return <div className="panel sectionPad">Loading…</div>;

  return (
    <div>
      <div className="h2">Food & Beverage</div>
      <p className="p">Items are managed in the admin page.</p>

      <div style={{ marginTop: 14, display: "grid", gap: 12 }}>
        {items.map((p) => (
          <div key={p.slug} className="panel sectionPad">
            <div className="h3" style={{ margin: 0 }}>{p.name}</div>
            <div className="small">Rp {p.price} / {p.unit} • Lead time: {p.leadTime}</div>
            <p className="p">{p.description}</p>
            <div className="row" style={{ marginTop: 10 }}>
              <Link className="btn primary" to={`/fnb/${p.slug}`}>View</Link>
              <Link className="btn" to={`/order/${p.slug}`}>Order</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
