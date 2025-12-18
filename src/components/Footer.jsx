import { Link } from "react-router-dom";
import { siteConfig } from "../config/siteConfig.js";

export default function Footer() {
  return (
    <footer className="container footer">
      <div className="row" style={{ justifyContent: "space-between" }}>
        <div>
          <div style={{ fontWeight: 700, color: "var(--text)" }}>{siteConfig.businessName}</div>
          <div className="small">{siteConfig.opsNotes.madeToOrder}</div>
          <div className="small">{siteConfig.opsNotes.payment}</div>
          <div className="small">{siteConfig.opsNotes.shipping}</div>
        </div>
        <div className="row">
          <a href={siteConfig.socials.instagram} target="_blank" rel="noreferrer">Instagram</a>
          <a href={siteConfig.socials.facebook} target="_blank" rel="noreferrer">Facebook</a>
          <a href={siteConfig.socials.tiktok} target="_blank" rel="noreferrer">TikTok</a>
          <Link to="/admin/login" style={{ opacity: 0.5, fontSize: 12 }}>Admin</Link>
        </div>
      </div>
    </footer>
  );
}
