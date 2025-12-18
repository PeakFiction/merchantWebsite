import { isAdmin } from "./_lib/auth.js";

export const handler = async (event) => {
  const authed = await isAdmin(event);
  return {
    statusCode: authed ? 200 : 401,
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ authed }),
  };
};
