import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "apc_admin";

function adminPassword() {
  return process.env.ADMIN_PASSWORD ?? "almasparacristo2026";
}

export function createAdminToken() {
  return createHmac("sha256", adminPassword())
    .update("almas-para-cristo-admin")
    .digest("hex");
}

export function checkAdminPassword(input: string) {
  const expected = Buffer.from(adminPassword());
  const provided = Buffer.from(input ?? "");

  if (expected.length !== provided.length) return false;
  return timingSafeEqual(expected, provided);
}

export async function isAdmin() {
  const store = await cookies();
  return store.get(ADMIN_COOKIE)?.value === createAdminToken();
}
