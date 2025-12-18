import { clearCookie } from "./_lib/auth.js";

export const handler = async (event) => {
  const setCookie = clearCookie(event);
  return {
    statusCode: 200,
    headers: { "content-type": "application/json", "set-cookie": setCookie },
    body: JSON.stringify({ ok: true }),
  };
};
