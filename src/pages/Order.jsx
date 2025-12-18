import { useMemo, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { fnbProducts } from "../data/fnb.js";
import { siteConfig } from "../config/siteConfig.js";
import { makeOrderCode } from "../utils/orderCode.js";
import { buildWhatsAppLink, formatMoneyIDR } from "../utils/whatsapp.js";
import { Field } from "../components/FormField.jsx";

export default function Order() {
  const { slug } = useParams();
  const [search] = useSearchParams();
  const navigate = useNavigate();

  const product = useMemo(() => fnbProducts.find((x) => x.slug === slug), [slug]);
  const initialVariant = search.get("variant") || (product?.variants?.[0] ?? "");
  const initialQty = Number(search.get("qty") || 1);

  const [step, setStep] = useState(1);

  const [variant, setVariant] = useState(initialVariant);
  const [qty, setQty] = useState(Number.isFinite(initialQty) && initialQty > 0 ? initialQty : 1);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("");
  const [timeWindow, setTimeWindow] = useState("");
  const [notes, setNotes] = useState("");
  const [agree, setAgree] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [code, setCode] = useState("");

  if (!product) {
    return (
      <div className="panel sectionPad">
        <div className="h2">Not found</div>
        <p className="p">This product does not exist.</p>
        <Link className="btn" to="/catalog/fnb">Back to catalog</Link>
      </div>
    );
  }

  const itemsTotal = product.price * Math.max(1, Number(qty) || 1);

  const message = [
    `Order Code: ${code || "(pending)"}`,
    `Type: Food & Beverage`,
    `Item: ${product.name}`,
    `Variant: ${variant}`,
    `Qty: ${qty}`,
    `Requested date: ${date || "-"}`,
    `Time window: ${timeWindow || "-"}`,
    `Name: ${name || "-"}`,
    `Phone: ${phone || "-"}`,
    `Address: ${address || "-"}`,
    `Notes: ${notes || "-"}`,
    `Items total (shipping not included): Rp ${formatMoneyIDR(itemsTotal)}`,
    "",
    "Please confirm availability, shipping tariff, total, and payment instructions (QRIS/Transfer).",
  ].join("\n");

  const waLink = buildWhatsAppLink(siteConfig.whatsappNumber, message);

  function next() {
    setStep((s) => Math.min(3, s + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function back() {
    setStep((s) => Math.max(1, s - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function submit() {
    const newCode = makeOrderCode("ORD");
    setCode(newCode);
    setSubmitted(true);
    setStep(4);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const canContinueStep1 = variant.trim() && qty >= 1;
  const canContinueStep2 = name.trim() && phone.trim() && address.trim() && date.trim() && timeWindow.trim();
  const canSubmit = canContinueStep1 && canContinueStep2 && agree;

  if (step === 4) {
    const finalMessage = message.replace("(pending)", code);
    const finalWaLink = buildWhatsAppLink(siteConfig.whatsappNumber, finalMessage);

    return (
      <div className="card sectionPad">
        <div className="h2">Order submitted</div>
        <p className="p">
          Use WhatsApp to confirm shipping tariff, total, and production schedule. Payment happens after confirmation.
        </p>

        <hr className="hr" />

        <div className="panel sectionPad">
          <div className="kv">
            <div className="k">Order code</div>
            <div className="v" style={{ fontWeight: 800 }}>{code}</div>
          </div>
          <div className="kv">
            <div className="k">Next step</div>
            <div className="v">Send details to WhatsApp for confirmation</div>
          </div>

          <div className="row" style={{ marginTop: 14 }}>
            <a className="btn primary" href={finalWaLink} target="_blank" rel="noreferrer">
              Send to WhatsApp
            </a>
            <button
              className="btn"
              onClick={() => navigator.clipboard.writeText(finalMessage)}
              type="button"
            >
              Copy message
            </button>
            <button className="btn ghost" type="button" onClick={() => navigate("/catalog/fnb")}>
              Back to catalog
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card sectionPad">
      <div className="row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div className="h2">Order: {product.name}</div>
          <div className="small">Step {step} / 3</div>
        </div>
        <span className="badge">Shipping confirmed via WhatsApp</span>
      </div>

      <hr className="hr" />

      {step === 1 && (
        <div className="grid2">
          <div className="panel sectionPad">
            <div className="h3">Item</div>

            <Field label="Variant">
              <select className="select" value={variant} onChange={(e) => setVariant(e.target.value)}>
                {product.variants.map((v) => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </Field>

            <div style={{ height: 10 }} />

            <Field label="Quantity">
              <input className="input" type="number" min="1" value={qty} onChange={(e) => setQty(Number(e.target.value))} />
            </Field>

            <div className="row" style={{ marginTop: 14 }}>
              <button className="btn primary" type="button" onClick={next} disabled={!canContinueStep1}>
                Continue
              </button>
              <Link className="btn ghost" to={`/fnb/${product.slug}`}>Back</Link>
            </div>
          </div>

          <div className="panel sectionPad">
            <div className="h3">Estimate</div>
            <div className="small">Items total (shipping not included)</div>
            <div style={{ fontSize: 26, fontWeight: 900, marginTop: 8 }}>
              Rp {formatMoneyIDR(itemsTotal)}
            </div>
            <p className="p">
              Shipping follows courier tariff. Free shipping may apply above a threshold when active.
            </p>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="panel sectionPad">
          <div className="h3">Customer and delivery</div>

          <div className="grid2" style={{ marginTop: 12 }}>
            <Field label="Name">
              <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
            </Field>
            <Field label="Phone (WhatsApp preferred)">
              <input className="input" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </Field>
          </div>

          <div style={{ height: 10 }} />

          <Field label="Full address">
            <textarea className="textarea" value={address} onChange={(e) => setAddress(e.target.value)} />
          </Field>

          <div className="grid2" style={{ marginTop: 12 }}>
            <Field label="Requested delivery/pickup date">
              <input className="input" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </Field>
            <Field label="Time window (example: 10:00–12:00)">
              <input className="input" value={timeWindow} onChange={(e) => setTimeWindow(e.target.value)} />
            </Field>
          </div>

          <div className="row" style={{ marginTop: 14 }}>
            <button className="btn" type="button" onClick={back}>Back</button>
            <button className="btn primary" type="button" onClick={next} disabled={!canContinueStep2}>
              Continue
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="grid2">
          <div className="panel sectionPad">
            <div className="h3">Notes</div>
            <Field label="Special notes" hint={product.notesHint}>
              <textarea className="textarea" value={notes} onChange={(e) => setNotes(e.target.value)} />
            </Field>

            <div style={{ marginTop: 12 }} className="panel sectionPad">
              <div className="row" style={{ gap: 10 }}>
                <input
                  id="agree"
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                />
                <label htmlFor="agree" className="small">
                  I understand cancellation is before shipment; courier issues after handover follow the expedition process; returns only for seller error; refunds by mutual agreement.
                </label>
              </div>
            </div>

            <div className="row" style={{ marginTop: 14 }}>
              <button className="btn" type="button" onClick={back}>Back</button>
              <button className="btn primary" type="button" onClick={submit} disabled={!canSubmit || submitted}>
                Submit
              </button>
            </div>
          </div>

          <div className="panel sectionPad">
            <div className="h3">Review</div>
            <div className="kv"><div className="k">Item</div><div className="v">{product.name}</div></div>
            <div className="kv"><div className="k">Variant</div><div className="v">{variant}</div></div>
            <div className="kv"><div className="k">Quantity</div><div className="v">{qty}</div></div>
            <div className="kv"><div className="k">Date</div><div className="v">{date || "-"}</div></div>
            <div className="kv"><div className="k">Time</div><div className="v">{timeWindow || "-"}</div></div>
            <div className="kv"><div className="k">Name</div><div className="v">{name || "-"}</div></div>
            <div className="kv"><div className="k">Phone</div><div className="v">{phone || "-"}</div></div>
            <div className="kv"><div className="k">Address</div><div className="v">{address || "-"}</div></div>
            <div className="kv"><div className="k">Items total</div><div className="v">Rp {formatMoneyIDR(itemsTotal)}</div></div>

            <div className="row" style={{ marginTop: 14 }}>
              <a className="btn" href={waLink} target="_blank" rel="noreferrer">
                Preview WhatsApp message
              </a>
              <Link className="btn ghost" to="/policies">Policies</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
