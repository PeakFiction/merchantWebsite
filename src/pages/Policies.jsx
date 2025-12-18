export default function Policies() {
  return (
    <div className="card sectionPad">
      <div className="h2">Policies</div>
      <p className="p">
        These rules match the operational workflow: confirmation via WhatsApp, then payment, then production/shipping.
      </p>

      <hr className="hr" />

      <div className="panel sectionPad">
        <div className="h3">Shipping and courier issues</div>
        <p className="p">
          Once an order is handed to the expedition/courier, delivery issues are handled through the courier process.
          We support with tracking and claim steps where applicable.
        </p>
      </div>

      <div className="panel sectionPad" style={{ marginTop: 12 }}>
        <div className="h3">Cancellation</div>
        <p className="p">
          Cancellation is allowed before the product is shipped/handed to the courier (and before production cutoff for made-to-order).
        </p>
      </div>

      <div className="panel sectionPad" style={{ marginTop: 12 }}>
        <div className="h3">Returns</div>
        <p className="p">
          Returns are handled for seller errors (wrong item, incorrect production versus confirmed agreement).
        </p>
      </div>

      <div className="panel sectionPad" style={{ marginTop: 12 }}>
        <div className="h3">Refunds</div>
        <p className="p">
          Refunds are by mutual agreement between both parties, depending on the situation and status of production/shipping.
        </p>
      </div>
    </div>
  );
}
