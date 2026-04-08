import "server-only";

import { getCurrentUser, requireCurrentUser } from "@/lib/auth";

export async function getSessionUser() {
  return getCurrentUser();
}

export async function requireSessionUser() {
  return requireCurrentUser();
}
