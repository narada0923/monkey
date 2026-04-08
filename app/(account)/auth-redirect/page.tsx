import { redirect } from "next/navigation";

import { getCurrentUser, resolvePostLoginPath } from "@/lib/auth";

type AuthRedirectRouteProps = {
  searchParams: Promise<{
    next?: string | string[];
  }>;
};

export default async function AuthRedirectRoute({
  searchParams,
}: AuthRedirectRouteProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const params = await searchParams;
  const nextParam = params.next;
  const next =
    typeof nextParam === "string" ? nextParam : Array.isArray(nextParam) ? nextParam[0] : null;

  redirect(resolvePostLoginPath(user, next));
}
