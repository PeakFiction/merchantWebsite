import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="panel sectionPad">
      <div className="h2">404</div>
      <p className="p">Page not found.</p>
      <div className="row" style={{ marginTop: 12 }}>
        <Link className="btn primary" to="/">Home</Link>
        <Link className="btn" to="/catalog/fnb">Food & Beverage</Link>
        <Link className="btn" to="/tailoring">Tailoring</Link>
      </div>
    </div>
  );
}
