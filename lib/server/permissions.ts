import "server-only";

import { redirect } from "next/navigation";

import type { AuthenticatedUser } from "@/lib/auth";
import { getSessionUser } from "@/lib/server/session";

export function isAdminUser(user: Pick<AuthenticatedUser, "role"> | null) {
  return user?.role === "admin";
}

export async function requireAdminPageAccess() {
  const user = await getSessionUser();

  if (!user) {
    redirect("/login");
  }

  if (!isAdminUser(user)) {
    redirect("/profile");
  }

  return user;
}
