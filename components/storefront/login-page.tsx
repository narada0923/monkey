import Image from "next/image";

import { MaterialIcon } from "./material-icon";
import { brandName, loginPageData } from "./store-data";

type LoginPageProps = {
  isAuthConfigured: boolean;
  loginHref?: string;
  signupHref?: string;
  title?: string;
  subtitle?: string;
};

export function LoginPage({
  isAuthConfigured,
  loginHref = "/auth/login",
  signupHref = "/auth/login?screen_hint=signup",
  title = loginPageData.title,
  subtitle = loginPageData.subtitle,
}: LoginPageProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 text-on-background">
      <main className="relative grid w-full max-w-[1100px] grid-cols-1 overflow-hidden rounded-[2rem] bg-surface-container-lowest shadow-[0_20px_40px_rgba(27,27,30,0.06)] md:grid-cols-2">
        <section className="relative hidden flex-col justify-between overflow-hidden bg-surface-container-low p-12 md:flex">
          <div className="relative z-10">
            <div className="mb-4 flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-full ring-4 ring-white/70">
                <Image
                  fill
                  alt={`${brandName} лого`}
                  className="object-cover"
                  sizes="64px"
                  src="/logo.jpg"
                />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-primary">
                  {brandName}
                </h1>
                <p className="font-label text-[10px] uppercase tracking-[0.28em] text-text-muted">
                  Хүүхдийн загварын дэлгүүр
                </p>
              </div>
            </div>
            <p className="max-w-[280px] text-lg leading-relaxed text-on-surface-variant">
              {loginPageData.brandDescription}
            </p>
          </div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-xs font-medium text-secondary shadow-sm backdrop-blur-md">
              <MaterialIcon className="text-[18px]" name="verified" />
              <span>{loginPageData.trustLabel}</span>
            </div>
          </div>

          <div className="absolute -right-20 bottom-0 h-[60%] w-[80%] overflow-hidden rounded-tl-[2rem]">
            <Image
              fill
              alt="Зөөлөн хүүхдийн өрөөний интерьер"
              className="object-cover"
              sizes="40vw"
              src={loginPageData.image}
            />
          </div>
        </section>

        <section className="flex flex-col justify-center p-8 md:p-16">
          <div className="mb-10 text-center md:text-left">
            <h2 className="mb-2 text-3xl font-bold text-on-surface">
              {title}
            </h2>
            <p className="font-body text-on-surface-variant">
              {subtitle}
            </p>
          </div>

          <div className="space-y-6">
            <div className="rounded-[1.5rem] bg-surface-container-low p-6 text-sm leading-7 text-on-surface-variant">
              {isAuthConfigured ? (
                <>
                  Энэхүү төслийн хэрэглэгчийн нэвтрэлт нь Auth0 Universal Login
                  дээр ажиллаж байна. Нэвтэрсний дараа таны захиалгын түүх,
                  хүргэлтийн мэдээлэл болон QPay төлбөрийн эрх нээгдэнэ.
                </>
              ) : (
                <>
                  Auth0 орчны хувьсагч бүрэн тохируулагдаагүй тул нэвтрэх урсгал
                  идэвхгүй байна. `.env` файл дахь Auth0 тохиргоогоо шалгана уу.
                </>
              )}
            </div>

            {isAuthConfigured ? (
              <div className="space-y-4">
                <a
                  className="block w-full rounded-[1.5rem] bg-gradient-to-br from-primary to-primary-container py-4 text-center font-bold text-white shadow-lg shadow-primary/20 transition-all hover:opacity-90"
                  href={loginHref}
                >
                  Нэвтрэх
                </a>
                <a
                  className="block w-full rounded-[1.5rem] bg-surface-container-low py-4 text-center font-bold text-on-surface transition-all hover:bg-surface-container-high"
                  href={signupHref}
                >
                  Бүртгэл үүсгэх
                </a>
              </div>
            ) : null}
          </div>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-outline-variant/30" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-surface-container-lowest px-4 font-label text-on-surface-variant">
                Эсвэл үүгээр үргэлжлүүлэх
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 rounded-[1rem] bg-surface-container-low px-4 py-3 text-sm font-medium text-on-surface transition-colors hover:bg-surface-container-high">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              <span>Google</span>
            </button>

            <button className="flex items-center justify-center gap-3 rounded-[1rem] bg-surface-container-low px-4 py-3 text-sm font-medium text-on-surface transition-colors hover:bg-surface-container-high">
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C4.7 17.3 3.92 12.04 6.29 8.24c1.13-1.8 2.87-2.9 4.73-2.93 1.4-.04 2.37.7 3.25.7.86 0 2.1-.85 3.73-.68 1.67.17 2.94.8 3.7 1.93-3.26 1.96-2.73 6.25.5 7.55-.78 1.98-1.83 3.96-3.15 5.47zM12.03 5.3c-.1 0-.21.01-.32.01-.15-2.13 1.62-4.04 3.56-4.3.2 2.31-2.07 4.27-3.24 4.29z"
                  fill="currentColor"
                />
              </svg>
              <span>Apple</span>
            </button>
          </div>

          <p className="mt-10 text-center text-sm text-on-surface-variant">
            Бүртгэлгүй юу?{" "}
            {isAuthConfigured ? (
              <a
                className="font-bold text-primary transition-all hover:underline"
                href={signupHref}
              >
                Бүртгэл үүсгэх
              </a>
            ) : (
              <span className="font-bold text-primary">Тохиргоо хүлээгдэж байна</span>
            )}
          </p>
        </section>
      </main>

      <footer className="pointer-events-none fixed bottom-8 left-0 w-full text-center">
        <p className="pointer-events-auto font-label text-[10px] uppercase tracking-widest text-on-surface-variant/40">
          © 2024 {brandName}. Баяр баясгалан бүрийг танд.
        </p>
      </footer>

      <div className="fixed right-0 top-0 -z-10 h-[40%] w-[40%] rounded-full bg-primary/5 blur-[100px]" />
      <div className="fixed bottom-0 left-0 -z-10 h-[40%] w-[40%] rounded-full bg-secondary/5 blur-[100px]" />
    </div>
  );
}
