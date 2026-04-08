import { afterEach, beforeEach, describe, expect, it } from "vitest";

import {
  buildAuthLoginHref,
  resolvePostLoginPath,
} from "@/lib/auth-routing";
import { extractRolesFromClaims, resolveUserRole } from "@/lib/auth";

const originalEnv = { ...process.env };

describe("auth role and routing helpers", () => {
  beforeEach(() => {
    process.env.AUTH0_DOMAIN = "tenant.example.auth0.com";
    process.env.AUTH0_CLIENT_ID = "client-id";
    process.env.AUTH0_CLIENT_SECRET = "client-secret";
    process.env.AUTH0_SECRET = "12345678901234567890123456789012";
    process.env.APP_BASE_URL = "http://localhost:3000";
    process.env.AUTH0_ROLE_CLAIM_NAMESPACE = "https://monkeycloset.mn";
    process.env.AUTH0_ADMIN_ROLE = "admin";
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("extracts roles from namespaced and app metadata claims", () => {
    const roles = extractRolesFromClaims({
      "https://monkeycloset.mn/roles": ["admin", "editor"],
      app_metadata: {
        roles: ["support"],
      },
    });

    expect(roles).toEqual(expect.arrayContaining(["admin", "editor", "support"]));
  });

  it("resolves admin users from role claims", () => {
    expect(
      resolveUserRole({
        "https://monkeycloset.mn/roles": ["admin"],
      }),
    ).toBe("admin");

    expect(
      resolveUserRole({
        roles: ["customer"],
      }),
    ).toBe("user");
  });

  it("forces admins to the dashboard after login", () => {
    expect(resolvePostLoginPath({ role: "admin" }, "/profile")).toBe("/admin");
  });

  it("keeps normal users out of admin-only return paths", () => {
    expect(resolvePostLoginPath({ role: "user" }, "/admin/orders")).toBe(
      "/profile",
    );
    expect(resolvePostLoginPath({ role: "user" }, "/checkout")).toBe(
      "/checkout",
    );
  });

  it("builds Auth0 login hrefs through the auth redirect page", () => {
    const href = buildAuthLoginHref("/checkout", { screenHint: "signup" });
    const params = new URLSearchParams(href.split("?")[1]);

    expect(href).toContain("/auth/login?");
    expect(href).toContain("screen_hint=signup");
    expect(href).toContain("returnTo=");
    expect(params.get("returnTo")).toBe("/auth-redirect?next=%2Fcheckout");
  });
});
