export type RouteAwareUserRole = "admin" | "user";

export function sanitizeReturnPath(next?: string | null) {
  if (!next || !next.startsWith("/") || next.startsWith("//")) {
    return null;
  }

  if (
    next.startsWith("/auth") ||
    next.startsWith("/login") ||
    next.startsWith("/register")
  ) {
    return null;
  }

  return next;
}

export function resolvePostLoginPath(
  user: { role: RouteAwareUserRole },
  next?: string | null,
) {
  if (user.role === "admin") {
    return "/admin";
  }

  const safePath = sanitizeReturnPath(next);

  if (!safePath || safePath.startsWith("/admin")) {
    return "/profile";
  }

  return safePath;
}

export function buildAuthLoginHref(
  next = "/profile",
  options?: { screenHint?: "signup" },
) {
  const params = new URLSearchParams();
  const returnTo = sanitizeReturnPath(next) || "/profile";
  params.set("returnTo", `/auth-redirect?next=${encodeURIComponent(returnTo)}`);

  if (options?.screenHint) {
    params.set("screen_hint", options.screenHint);
  }

  return `/auth/login?${params.toString()}`;
}
