import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { RegisterPage } from "@/components/account/register-page";
import { getCurrentUser, isAuthConfigured, resolvePostLoginPath } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Monkey Closet | Бүртгэл",
  description: "Monkey Closet хэрэглэгчийн шинэ бүртгэлийн хуудас.",
};

export default async function RegisterRoute() {
  const user = await getCurrentUser();

  if (user) {
    redirect(resolvePostLoginPath(user));
  }

  return <RegisterPage isAuthConfigured={isAuthConfigured()} />;
}
