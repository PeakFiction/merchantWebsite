import { issueCookie } from "./_lib/auth.js";

export const handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method not allowed" };

  let body = {};
  try { body = JSON.parse(event.body || "{}"); } catch {}

  const ok =
    body.username === process.env.ADMIN_USERNAME &&
    body.password === process.env.ADMIN_PASSWORD;

  if (!ok) return { statusCode: 401, body: "Unauthorized" };

  const setCookie = await issueCookie(event);

  return {
    statusCode: 200,
    headers: {
      "content-type": "application/json",
      "set-cookie": setCookie,
    },
    body: JSON.stringify({ ok: true }),
  };
};
