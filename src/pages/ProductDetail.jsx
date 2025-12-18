import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCatalog } from "../api/catalog.js";

export default function ProductDetail() {
  const { slug } = useParams();
  const [catalog, setCatalog] = useState(null);

  useEffect(() => {
    getCatalog().then(setCatalog).catch(() => setCatalog({ fnb: [], tailoring: [] }));
  }, []);

  const product = useMemo(
    () => (catalog?.fnb || []).find((x) => x.slug === slug),
    [catalog, slug]
  );

  if (!catalog) return <div className="panel sectionPad">Loading…</div>;

  if (!product) {
    return (
      <div className="panel sectionPad">
        <div className="h2">Not found</div>
        <Link className="btn" to="/catalog/fnb">Back to F&B</Link>
      </div>
    );
  }

  return (
    <div className="card sectionPad">
      <div className="h2">{product.name}</div>
      <div className="small">Rp {product.price} / {product.unit} • Lead time: {product.leadTime}</div>
      <p className="p">{product.description}</p>

      <div className="row" style={{ marginTop: 12 }}>
        <Link className="btn primary" to={`/order/${product.slug}`}>Order</Link>
        <Link className="btn" to="/catalog/fnb">Back</Link>
      </div>
    </div>
  );
}
