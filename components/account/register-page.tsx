import { LoginPage as StorefrontLoginPage } from "@/components/storefront/login-page";
import { buildAuthLoginHref } from "@/lib/auth-routing";

type RegisterPageProps = {
  isAuthConfigured: boolean;
};

export function RegisterPage({ isAuthConfigured }: RegisterPageProps) {
  return (
    <StorefrontLoginPage
      isAuthConfigured={isAuthConfigured}
      loginHref={buildAuthLoginHref("/profile")}
      signupHref={buildAuthLoginHref("/profile", { screenHint: "signup" })}
      subtitle="Шинэ хэрэглэгчийн бүртгэлээ үүсгээд захиалга, төлбөр, хаягийн мэдээллээ хадгалаарай."
      title="Шинэ бүртгэл"
    />
  );
}
