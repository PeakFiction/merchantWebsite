import { useEffect, useMemo, useState } from "react";
import { getCatalog, putCatalog, logoutAdmin, isAuthed } from "../api/catalog.js";

function slugify(s) {
  return String(s || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function EditorRow({ item, kind, onChange, onDelete }) {
  const isFnb = kind === "fnb";

  function onNameChange(e) {
    const name = e.target.value;
    const currentSlug = String(item.slug || "").trim();
    onChange({
      ...item,
      name,
      // only auto-fill slug if it's currently empty
      slug: currentSlug ? item.slug : slugify(name),
    });
  }

  function onSlugChange(e) {
    // force slug format while typing
    onChange({ ...item, slug: slugify(e.target.value) });
  }

  return (
    <div className="panel sectionPad" style={{ display: "grid", gap: 10 }}>
      <div className="grid2">
        <div className="field">
          <div className="label">Name</div>
          <input className="input" value={item.name || ""} onChange={onNameChange} />
        </div>

        <div className="field">
          <div className="label">Slug (unique)</div>
          <input
            className="input"
            value={item.slug || ""}
            onChange={onSlugChange}
            placeholder="e.g. cookies-box"
          />
          <div className="small">Used in the URL. Keep stable once shared.</div>
        </div>
      </div>

      {isFnb ? (
        <div className="grid3">
          <div className="field">
            <div className="label">Price (number)</div>
            <input
              className="input"
              inputMode="numeric"
              value={item.price ?? 0}
              onChange={(e) => onChange({ ...item, price: Number(e.target.value) || 0 })}
            />
          </div>

          <div className="field">
            <div className="label">Unit</div>
            <input className="input" value={item.unit || ""} onChange={(e) => onChange({ ...item, unit: e.target.value })} />
          </div>

          <div className="field">
            <div className="label">Lead time</div>
            <input
              className="input"
              value={item.leadTime || ""}
              onChange={(e) => onChange({ ...item, leadTime: e.target.value })}
            />
          </div>
        </div>
      ) : (
        <div className="grid2">
          <div className="field">
            <div className="label">Price mode</div>
            <select
              className="select"
              value={item.priceMode || "quote"}
              onChange={(e) => onChange({ ...item, priceMode: e.target.value })}
            >
              <option value="quote">quote</option>
              <option value="estimate">estimate</option>
            </select>
          </div>

          <div className="field">
            <div className="label">Lead time</div>
            <input
              className="input"
              value={item.leadTime || ""}
              onChange={(e) => onChange({ ...item, leadTime: e.target.value })}
            />
          </div>
        </div>
      )}

      <div className="field">
        <div className="label">Description</div>
        <textarea
          className="textarea"
          value={item.description || ""}
          onChange={(e) => onChange({ ...item, description: e.target.value })}
        />
      </div>

      <div className="field">
        <div className="label">Image URL (optional)</div>
        <input
          className="input"
          value={item.imageUrl || ""}
          onChange={(e) => onChange({ ...item, imageUrl: e.target.value })}
        />
      </div>

      <div className="row" style={{ justifyContent: "space-between" }}>
        <span className="small">Keep slugs stable once shared with customers.</span>
        <button className="btn danger" type="button" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default function Admin({ onAuthedFail }) {
  const [tab, setTab] = useState("fnb");
  const [catalog, setCatalog] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    (async () => {
      const ok = await isAuthed();
      if (!ok) return onAuthedFail();
      const data = await getCatalog();
      setCatalog(data);
    })();
  }, [onAuthedFail]);

  const list = useMemo(() => {
    if (!catalog) return [];
    return tab === "fnb" ? catalog.fnb : catalog.tailoring;
  }, [catalog, tab]);

  function setList(nextList) {
    const key = tab === "fnb" ? "fnb" : "tailoring";
    setCatalog((c) => ({ ...(c || {}), [key]: nextList }));
  }

  function add() {
    if (!catalog) return;

    if (tab === "fnb") {
      setList([
        ...(catalog.fnb || []),
        { name: "", slug: "", price: 0, unit: "", leadTime: "", description: "", imageUrl: "" },
      ]);
    } else {
      setList([
        ...(catalog.tailoring || []),
        { name: "", slug: "", priceMode: "quote", leadTime: "", description: "", imageUrl: "" },
      ]);
    }
  }

  async function save() {
    setStatus("Saving…");
    try {
      const key = tab === "fnb" ? "fnb" : "tailoring";

      const normalized = (catalog[key] || []).map((item) => {
        const rawSlug = String(item.slug ?? "").trim();
        const autoSlug = slugify(item.name);
        return { ...item, slug: rawSlug || autoSlug };
      });

      const slugs = new Set();
      for (const item of normalized) {
        const s = String(item.slug || "").trim();
        if (!s) throw new Error("Empty slug exists.");
        if (slugs.has(s)) throw new Error(`Duplicate slug: ${s}`);
        slugs.add(s);
      }

      const nextCatalog = { ...catalog, [key]: normalized };
      setCatalog(nextCatalog);
      await putCatalog(nextCatalog);

      setStatus("Saved.");
    } catch (e) {
      setStatus(String(e?.message || "Save failed."));
    }
  }

  async function logout() {
    await logoutAdmin();
    onAuthedFail();
  }

  if (!catalog) return <div className="panel sectionPad">Loading…</div>;

  return (
    <div>
      <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
        <div className="row">
          <button className={`btn ${tab === "fnb" ? "primary" : ""}`} onClick={() => setTab("fnb")}>
            F&B
          </button>
          <button className={`btn ${tab === "tailoring" ? "primary" : ""}`} onClick={() => setTab("tailoring")}>
            Tailoring
          </button>
        </div>
        <div className="row">
          <button className="btn" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      <div className="row" style={{ marginTop: 12 }}>
        <button className="btn primary" onClick={add}>
          Add
        </button>
        <button className="btn" onClick={save}>
          Save changes
        </button>
        <span className="small">{status}</span>
      </div>

      <div style={{ marginTop: 14, display: "grid", gap: 12 }}>
        {list.map((item, i) => (
          <EditorRow
            key={(item.slug || "") + i}
            kind={tab}
            item={item}
            onChange={(next) => {
              const copy = list.slice();
              copy[i] = next;
              setList(copy);
            }}
            onDelete={() => {
              const copy = list.slice();
              copy.splice(i, 1);
              setList(copy);
            }}
          />
        ))}
      </div>
    </div>
  );
}
