import "server-only";

import { Auth0Client } from "@auth0/nextjs-auth0/server";

import {
  buildAuthLoginHref,
  resolvePostLoginPath,
  sanitizeReturnPath,
  type RouteAwareUserRole,
} from "@/lib/auth-routing";
import { AppError } from "@/lib/error-utils";
import { hasAuth0Env, readAuth0Env } from "@/lib/env";

export type AppUserRole = RouteAwareUserRole;

export type AuthenticatedUser = {
  id: string;
  name: string;
  email: string;
  picture?: string;
  role: AppUserRole;
  roles: string[];
  isAdmin: boolean;
};

type AuthSessionClaims = Record<string, unknown> & {
  sub?: string;
  name?: string;
  email?: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
};

let auth0Client: Auth0Client | null = null;

function buildAuth0Client() {
  const env = readAuth0Env();

  return new Auth0Client({
    domain: env.AUTH0_DOMAIN,
    clientId: env.AUTH0_CLIENT_ID,
    clientSecret: env.AUTH0_CLIENT_SECRET,
    secret: env.AUTH0_SECRET,
    appBaseUrl: env.APP_BASE_URL,
    authorizationParameters: {
      audience: env.AUTH0_AUDIENCE,
      scope: env.AUTH0_SCOPE || "openid profile email",
    },
    signInReturnToPath: "/auth-redirect",
  });
}

function normalizeRoleValue(value: unknown) {
  if (typeof value !== "string") {
    return [];
  }

  return value
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
}

function extractRolesFromUnknown(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .flatMap((item) => normalizeRoleValue(item))
      .filter(Boolean);
  }

  return normalizeRoleValue(value);
}

function getRoleClaimKeys() {
  const env = readAuth0Env();
  const keys = new Set<string>();

  if (env.AUTH0_ROLE_CLAIM) {
    keys.add(env.AUTH0_ROLE_CLAIM);
  }

  if (env.AUTH0_ROLE_CLAIM_NAMESPACE) {
    keys.add(`${env.AUTH0_ROLE_CLAIM_NAMESPACE.replace(/\/$/, "")}/roles`);
  }

  keys.add("roles");
  keys.add("role");

  return keys;
}

export function extractRolesFromClaims(claims: AuthSessionClaims) {
  const explicitKeys = getRoleClaimKeys();
  const collected = new Set<string>();

  for (const key of explicitKeys) {
    extractRolesFromUnknown(claims[key]).forEach((role) => collected.add(role));
  }

  for (const [key, value] of Object.entries(claims)) {
    if (key.endsWith("/roles") || key.endsWith("/role")) {
      extractRolesFromUnknown(value).forEach((role) => collected.add(role));
    }
  }

  const appMetadata =
    claims.app_metadata && typeof claims.app_metadata === "object"
      ? (claims.app_metadata as Record<string, unknown>)
      : null;

  if (appMetadata) {
    extractRolesFromUnknown(appMetadata.roles).forEach((role) =>
      collected.add(role),
    );
    extractRolesFromUnknown(appMetadata.role).forEach((role) =>
      collected.add(role),
    );
  }

  return Array.from(collected);
}

export function resolveUserRole(claims: AuthSessionClaims): AppUserRole {
  const env = readAuth0Env();
  const adminRole = (env.AUTH0_ADMIN_ROLE || "admin").trim().toLowerCase();
  const roles = extractRolesFromClaims(claims);

  return roles.includes(adminRole) ? "admin" : "user";
}

export function isAuthConfigured() {
  return hasAuth0Env();
}

export { buildAuthLoginHref, resolvePostLoginPath, sanitizeReturnPath };

export function getAuth0Client() {
  if (!hasAuth0Env()) {
    throw new AppError("Auth0 тохиргоо олдсонгүй.", {
      statusCode: 500,
      code: "AUTH0_NOT_CONFIGURED",
      expose: true,
    });
  }

  if (!auth0Client) {
    auth0Client = buildAuth0Client();
  }

  return auth0Client;
}

function mapSessionUser(user: AuthSessionClaims) {
  if (!user.sub || !user.email) {
    return null;
  }

  const roles = extractRolesFromClaims(user);
  const role = resolveUserRole(user);
  const displayName =
    user.name ||
    [user.given_name, user.family_name].filter(Boolean).join(" ").trim() ||
    user.email;

  return {
    id: user.sub,
    name: displayName,
    email: user.email,
    picture: user.picture,
    role,
    roles,
    isAdmin: role === "admin",
  } satisfies AuthenticatedUser;
}

export async function getCurrentUser() {
  if (!hasAuth0Env()) {
    return null;
  }

  const session = await getAuth0Client().getSession();

  if (!session?.user) {
    return null;
  }

  return mapSessionUser(session.user as AuthSessionClaims);
}

export async function requireCurrentUser() {
  const user = await getCurrentUser();

  if (!user) {
    throw new AppError("Нэвтэрсний дараа үргэлжлүүлнэ үү.", {
      statusCode: 401,
      code: "AUTH_REQUIRED",
    });
  }

  return user;
}
