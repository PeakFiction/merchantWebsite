import { Link } from "react-router-dom";

export default function ListCard({ to, title, subtitle, desc, badges = [], cta = "Open" }) {
  return (
    <div className="panel sectionPad">
      <div className="row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ minWidth: 0 }}>
          <div className="h3" style={{ margin: 0 }}>{title}</div>
          {subtitle ? <div className="small" style={{ marginTop: 4 }}>{subtitle}</div> : null}
          <p className="p">{desc}</p>
          <div className="row" style={{ marginTop: 10 }}>
            {badges.map((b) => (
              <span key={b} className="badge">{b}</span>
            ))}
          </div>
        </div>
        <Link to={to} className="btn primary" style={{ flexShrink: 0 }}>{cta}</Link>
      </div>
    </div>
  );
}
