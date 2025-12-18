import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCatalog } from "../api/catalog.js";

export default function TailoringDetail() {
  const { slug } = useParams();
  const [catalog, setCatalog] = useState(null);

  useEffect(() => {
    getCatalog().then(setCatalog).catch(() => setCatalog({ fnb: [], tailoring: [] }));
  }, []);

  const service = useMemo(
    () => (catalog?.tailoring || []).find((x) => x.slug === slug),
    [catalog, slug]
  );

  if (!catalog) return <div className="panel sectionPad">Loading…</div>;

  if (!service) {
    return (
      <div className="panel sectionPad">
        <div className="h2">Not found</div>
        <Link className="btn" to="/tailoring">Back to Tailoring</Link>
      </div>
    );
  }

  return (
    <div className="card sectionPad">
      <div className="h2">{service.name}</div>
      <div className="small">Pricing: {service.priceMode} • Lead time: {service.leadTime}</div>
      <p className="p">{service.description}</p>

      <div className="row" style={{ marginTop: 12 }}>
        <Link className="btn primary" to={`/quote/${service.slug}`}>Request Quote</Link>
        <Link className="btn" to="/tailoring">Back</Link>
      </div>
    </div>
  );
}
