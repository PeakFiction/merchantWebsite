export function buildWhatsAppLink(phoneDigitsOnly, message) {
  const text = encodeURIComponent(message);
  const phone = phoneDigitsOnly.replace(/[^\d]/g, "");
  return `https://wa.me/${phone}?text=${text}`;
}

export function formatMoneyIDR(value) {
  // Simple formatting; adjust if you want decimals.
  return new Intl.NumberFormat("id-ID").format(value);
}
