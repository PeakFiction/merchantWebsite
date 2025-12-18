import { useState } from "react";
import { loginAdmin } from "../api/catalog.js";

export default function AdminLogin({ onSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  async function submit(e) {
    e.preventDefault();
    setErr("");
    try {
      await loginAdmin(username, password);
      onSuccess();
    } catch {
      setErr("Wrong username or password.");
    }
  }

  return (
    <div className="card sectionPad" style={{ maxWidth: 520, margin: "24px auto" }}>
      <div className="h2">Admin Login</div>
      <form onSubmit={submit} style={{ display: "grid", gap: 10, marginTop: 12 }}>
        <input className="input" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input className="input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
        <button className="btn primary" type="submit">Login</button>
        {err ? <div className="small" style={{ color: "var(--danger)" }}>{err}</div> : null}
      </form>
    </div>
  );
}
