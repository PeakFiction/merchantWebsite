import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { tailoringServices } from "../data/tailoring.js";
import { siteConfig } from "../config/siteConfig.js";
import { makeOrderCode } from "../utils/orderCode.js";
import { buildWhatsAppLink } from "../utils/whatsapp.js";
import { Field } from "../components/FormField.jsx";

export default function Quote() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const service = useMemo(() => tailoringServices.find((x) => x.slug === slug), [slug]);

  const [step, setStep] = useState(1);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [jobType, setJobType] = useState("Custom / By request");
  const [garmentType, setGarmentType] = useState("");
  const [deadline, setDeadline] = useState("");
  const [measurements, setMeasurements] = useState("");
  const [fabric, setFabric] = useState("Customer provides fabric");
  const [references, setReferences] = useState("");
  const [notes, setNotes] = useState("");
  const [agree, setAgree] = useState(false);

  const [code, setCode] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!service) {
    return (
      <div className="panel sectionPad">
        <div className="h2">Not found</div>
        <p className="p">This service does not exist.</p>
        <Link className="btn" to="/tailoring">Back</Link>
      </div>
    );
  }

  const message = [
    `Quote Code: ${code || "(pending)"}`,
    `Type: Tailoring quote`,
    `Service: ${service.name}`,
    `Job type: ${jobType}`,
    `Garment type: ${garmentType || "-"}`,
    `Deadline: ${deadline || "-"}`,
    `Name: ${name || "-"}`,
    `Phone: ${phone || "-"}`,
    `Address: ${address || "-"}`,
    `Measurements: ${measurements || "-"}`,
    `Fabric: ${fabric || "-"}`,
    `References (links): ${references || "-"}`,
    `Notes: ${notes || "-"}`,
    "",
    "Please confirm price and timeline. Payment via QRIS/Transfer after agreement.",
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
    const newCode = makeOrderCode("QTE");
    setCode(newCode);
    setSubmitted(true);
    setStep(4);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const canContinue1 = name.trim() && phone.trim() && address.trim();
  const canContinue2 = garmentType.trim() && deadline.trim();
  const canSubmit = canContinue1 && canContinue2 && agree;

  if (step === 4) {
    const finalMessage = message.replace("(pending)", code);
    const finalWaLink = buildWhatsAppLink(siteConfig.whatsappNumber, finalMessage);

    return (
      <div className="card sectionPad">
        <div className="h2">Quote request submitted</div>
        <p className="p">Next step: send the quote details to WhatsApp to confirm price and timeline.</p>

        <hr className="hr" />

        <div className="panel sectionPad">
          <div className="kv"><div className="k">Quote code</div><div className="v" style={{ fontWeight: 800 }}>{code}</div></div>
          <div className="row" style={{ marginTop: 14 }}>
            <a className="btn primary" href={finalWaLink} target="_blank" rel="noreferrer">Send to WhatsApp</a>
            <button className="btn" onClick={() => navigator.clipboard.writeText(finalMessage)} type="button">
              Copy message
            </button>
            <button className="btn ghost" type="button" onClick={() => navigate("/tailoring")}>Back to tailoring</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card sectionPad">
      <div className="row" style={{ justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div className="h2">Request quote: {service.name}</div>
          <div className="small">Step {step} / 3</div>
        </div>
        <span className="badge">Quote-based</span>
      </div>

      <hr className="hr" />

      {step === 1 && (
        <div className="panel sectionPad">
          <div className="h3">Customer</div>

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

          <div className="row" style={{ marginTop: 14 }}>
            <button className="btn primary" type="button" onClick={next} disabled={!canContinue1}>
              Continue
            </button>
            <Link className="btn ghost" to={`/tailoring/${service.slug}`}>Back</Link>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="panel sectionPad">
          <div className="h3">Job details</div>

          <div className="grid2" style={{ marginTop: 12 }}>
            <Field label="Job type">
              <select className="select" value={jobType} onChange={(e) => setJobType(e.target.value)}>
                <option>Repairs / Alterations</option>
                <option>Custom / By request</option>
              </select>
            </Field>

            <Field label="Garment type (example: dress, pants, uniform)">
              <input className="input" value={garmentType} onChange={(e) => setGarmentType(e.target.value)} />
            </Field>
          </div>

          <div className="grid2" style={{ marginTop: 12 }}>
            <Field label="Deadline / needed-by date">
              <input className="input" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
            </Field>

            <Field label="Fabric">
              <select className="select" value={fabric} onChange={(e) => setFabric(e.target.value)}>
                <option>Customer provides fabric</option>
                <option>Seller provides fabric (discuss options)</option>
              </select>
            </Field>
          </div>

          <div className="row" style={{ marginTop: 14 }}>
            <button className="btn" type="button" onClick={back}>Back</button>
            <button className="btn primary" type="button" onClick={next} disabled={!canContinue2}>
              Continue
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="grid2">
          <div className="panel sectionPad">
            <div className="h3">Measurements and references</div>

            <Field label="Measurements / sizing notes">
              <textarea className="textarea" value={measurements} onChange={(e) => setMeasurements(e.target.value)} />
            </Field>

            <div style={{ height: 10 }} />

            <Field label="Reference links (photos, model examples)">
              <textarea className="textarea" value={references} onChange={(e) => setReferences(e.target.value)} />
            </Field>

            <div style={{ height: 10 }} />

            <Field label="Notes (anything important)">
              <textarea className="textarea" value={notes} onChange={(e) => setNotes(e.target.value)} />
            </Field>

            <div className="panel sectionPad" style={{ marginTop: 12 }}>
              <div className="row" style={{ gap: 10 }}>
                <input
                  id="agree2"
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                />
                <label htmlFor="agree2" className="small">
                  I understand cancellations are handled before shipment/production cutoff; returns only for seller error; refunds by mutual agreement.
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
            <div className="h3">Preview</div>
            <div className="small">This is what will be sent to WhatsApp for confirmation.</div>

            <div className="row" style={{ marginTop: 14 }}>
              <a className="btn" href={waLink} target="_blank" rel="noreferrer">Preview WhatsApp message</a>
              <Link className="btn ghost" to="/policies">Policies</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
