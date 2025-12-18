import { Link } from "react-router-dom";

export default function CardLink({ to, title, desc, badges = [] }) {
  return (
    <Link to={to} className="card sectionPad" style={{ display: "block" }}>
      <div className="h2">{title}</div>
      <p className="p">{desc}</p>
      <div className="row" style={{ marginTop: 14 }}>
        {badges.map((b) => (
          <span key={b} className="badge">{b}</span>
        ))}
      </div>
    </Link>
  );
}
