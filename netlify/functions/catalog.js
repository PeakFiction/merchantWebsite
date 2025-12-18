import { getStore } from "@netlify/blobs";
import { isAdmin } from "./_lib/auth.js";
import fs from "node:fs/promises";
import path from "node:path";

const STORE = "catalog";
const KEY = "catalog.json";

function defaultCatalog() {
  return { fnb: [], tailoring: [], updatedAt: null };
}

const LOCAL_DIR = path.join(process.cwd(), ".localdata");
const LOCAL_FILE = path.join(LOCAL_DIR, "catalog.json");

async function readLocalCatalog() {
  try {
    const raw = await fs.readFile(LOCAL_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : defaultCatalog();
  } catch {
    return defaultCatalog();
  }
}

async function writeLocalCatalog(data) {
  await fs.mkdir(LOCAL_DIR, { recursive: true });
  await fs.writeFile(LOCAL_FILE, JSON.stringify(data, null, 2), "utf-8");
}

async function tryGetBlobStore() {
  try {
    return getStore({ name: STORE, consistency: "strong" });
  } catch {
    return null;
  }
}

export const handler = async (event) => {
  const blobStore = await tryGetBlobStore();

  // GET (public)
  if (event.httpMethod === "GET") {
    if (blobStore) {
      try {
        const data = (await blobStore.get(KEY, { type: "json" })) ?? defaultCatalog();
        return {
          statusCode: 200,
          headers: { "content-type": "application/json" },
          body: JSON.stringify(data),
        };
      } catch {
        // fall through to local
      }
    }

    const data = await readLocalCatalog();
    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    };
  }

  // PUT (admin only)
  if (event.httpMethod === "PUT") {
    const authed = await isAdmin(event);
    if (!authed) return { statusCode: 401, body: "Unauthorized" };

    let body = null;
    try { body = JSON.parse(event.body || ""); } catch {}
    if (!body || typeof body !== "object") return { statusCode: 400, body: "Bad request" };

    const next = {
      fnb: Array.isArray(body.fnb) ? body.fnb : [],
      tailoring: Array.isArray(body.tailoring) ? body.tailoring : [],
      updatedAt: Date.now(),
    };

    if (blobStore) {
      try {
        await blobStore.setJSON(KEY, next);
        return {
          statusCode: 200,
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ ok: true, updatedAt: next.updatedAt, storage: "blobs" }),
        };
      } catch {
        // fall through to local
      }
    }

    await writeLocalCatalog(next);
    return {
      statusCode: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ok: true, updatedAt: next.updatedAt, storage: "local" }),
    };
  }

  return { statusCode: 405, body: "Method not allowed" };
};
