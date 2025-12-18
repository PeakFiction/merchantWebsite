import { parse, serialize } from "cookie";
import { jwtVerify, SignJWT } from "jose";

const COOKIE_NAME = "admin_token";

function secretBytes() {
  const s = process.env.ADMIN_JWT_SECRET;
  if (!s) throw new Error("Missing ADMIN_JWT_SECRET");
  return new TextEncoder().encode(s);
}

function isSecure(event) {
  const proto = event.headers["x-forwarded-proto"];
  if (proto) return proto === "https";
  const host = event.headers.host || "";
  return !(host.includes("localhost") || host.includes("127.0.0.1"));
}

export async function issueCookie(event) {
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretBytes());

  return serialize(COOKIE_NAME, token, {
    httpOnly: true,
    secure: isSecure(event),
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export function clearCookie(event) {
  return serialize(COOKIE_NAME, "", {
    httpOnly: true,
    secure: isSecure(event),
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
}

export async function isAdmin(event) {
  const raw = event.headers.cookie || "";
  const cookies = parse(raw);
  const token = cookies[COOKIE_NAME];
  if (!token) return false;

  try {
    const { payload } = await jwtVerify(token, secretBytes());
    return payload?.role === "admin";
  } catch {
    return false;
  }
}
