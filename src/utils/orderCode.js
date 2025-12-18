export function makeOrderCode(prefix = "ORD") {
  // Works in modern browsers; fallback if needed.
  const base =
    (globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`)
      .replaceAll("-", "")
      .toUpperCase();
  return `${prefix}-${base.slice(0, 8)}`;
}
