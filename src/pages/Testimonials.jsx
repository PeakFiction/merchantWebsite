export default function Testimonials() {
  return (
    <div className="card sectionPad">
      <div className="h2">Testimonials</div>
      <p className="p">Replace these placeholders with real customer feedback.</p>

      <hr className="hr" />

      <div style={{ display: "grid", gap: 12 }}>
        <div className="panel sectionPad">
          <div className="h3">Food & Beverage</div>
          <div className="small">“On-time delivery and great taste.”</div>
        </div>
        <div className="panel sectionPad">
          <div className="h3">Tailoring</div>
          <div className="small">“Fit was accurate and the finish was clean.”</div>
        </div>
        <div className="panel sectionPad">
          <div className="h3">Service</div>
          <div className="small">“Fast response on WhatsApp and clear confirmation.”</div>
        </div>
      </div>
    </div>
  );
}
