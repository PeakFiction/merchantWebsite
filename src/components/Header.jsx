import { Link } from "react-router-dom";
import { siteConfig } from "../config/siteConfig.js";

export default function Header() {
  return (
    <header className="header">
      <div className="headerInner">
        <div className="brand">
          <div className="brandMark" />
          <Link to="/" style={{ fontWeight: 700 }}>
            {siteConfig.businessName}
          </Link>
        </div>
        <nav className="nav">
          <Link to="/catalog/fnb">Food & Beverage</Link>
          <Link to="/tailoring">Tailoring</Link>
          <Link to="/how-to-order">How to Order</Link>
          <Link to="/policies">Policies</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
