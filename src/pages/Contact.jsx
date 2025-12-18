import { siteConfig } from "../config/siteConfig.js";

export default function Contact() {
  return (
    <div className="card sectionPad">
      <div className="h2">Contact</div>
      <p className="p">
        Primary confirmation channel is WhatsApp. Social links are provided for browsing and updates.
      </p>

      <hr className="hr" />

      <div className="panel sectionPad">
        <div className="kv">
          <div className="k">WhatsApp</div>
          <div className="v">{siteConfig.whatsappNumber}</div>
        </div>
        <div className="kv">
          <div className="k">Instagram</div>
          <div className="v"><a href={siteConfig.socials.instagram} target="_blank" rel="noreferrer">{siteConfig.socials.instagram}</a></div>
        </div>
        <div className="kv">
          <div className="k">Facebook</div>
          <div className="v"><a href={siteConfig.socials.facebook} target="_blank" rel="noreferrer">{siteConfig.socials.facebook}</a></div>
        </div>
        <div className="kv">
          <div className="k">TikTok</div>
          <div className="v"><a href={siteConfig.socials.tiktok} target="_blank" rel="noreferrer">{siteConfig.socials.tiktok}</a></div>
        </div>
      </div>
    </div>
  );
}
