import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { AccountLoginPage } from "@/components/account/login-page";
import { getCurrentUser, isAuthConfigured, resolvePostLoginPath } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Monkey Closet | Нэвтрэх",
  description: "Monkey Closet хэрэглэгчийн нэвтрэх хуудас.",
};

export default async function LoginRoute() {
  const user = await getCurrentUser();

  if (user) {
    redirect(resolvePostLoginPath(user));
  }

  return <AccountLoginPage isAuthConfigured={isAuthConfigured()} />;
}
