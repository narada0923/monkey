import "server-only";

import {
  buildAuthLoginHref,
  getCurrentUser,
  isAuthConfigured,
  resolvePostLoginPath,
} from "@/lib/auth";

export {
  buildAuthLoginHref,
  getCurrentUser,
  isAuthConfigured,
  resolvePostLoginPath,
};

export async function getCurrentUserProfile() {
  return getCurrentUser();
}
