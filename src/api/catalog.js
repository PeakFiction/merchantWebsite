export async function getCatalog() {
  const res = await fetch("/api/catalog", { credentials: "include" });
  if (!res.ok) throw new Error("Failed to load catalog");
  return res.json();
}

export async function putCatalog(next) {
  const res = await fetch("/api/catalog", {
    method: "PUT",
    credentials: "include",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(next),
  });
  if (!res.ok) throw new Error("Save failed");
  return res.json();
}

export async function loginAdmin(username, password) {
  const res = await fetch("/api/login", {
    method: "POST",
    credentials: "include",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error("Bad credentials");
  return res.json();
}

export async function logoutAdmin() {
  await fetch("/api/logout", { method: "POST", credentials: "include" }).catch(() => {});
}

export async function isAuthed() {
  const res = await fetch("/api/me", { credentials: "include" });
  return res.ok;
}
