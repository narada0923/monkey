import { LoginPage as StorefrontLoginPage } from "@/components/storefront/login-page";
import { buildAuthLoginHref } from "@/lib/auth-routing";

type AccountLoginPageProps = {
  isAuthConfigured: boolean;
};

export function AccountLoginPage({
  isAuthConfigured,
}: AccountLoginPageProps) {
  return (
    <StorefrontLoginPage
      isAuthConfigured={isAuthConfigured}
      loginHref={buildAuthLoginHref("/profile")}
      signupHref={buildAuthLoginHref("/profile", { screenHint: "signup" })}
    />
  );
}
