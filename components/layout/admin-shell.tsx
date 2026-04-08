import type { ReactNode } from "react";
import Link from "next/link";

import { StoreNavbar } from "@/components/storefront/store-navbar";
import type { AuthenticatedUser } from "@/lib/auth";
import { adminRoutes } from "@/store/navigation";
import { cn } from "@/lib/utils";

type AdminShellProps = {
  user: AuthenticatedUser;
  activeHref: string;
  children: ReactNode;
};

export async function AdminShell({
  user,
  activeHref,
  children,
}: AdminShellProps) {
  return (
    <>
      <StoreNavbar />
      <main className="mx-auto flex max-w-7xl flex-col gap-8 px-6 pb-20 pt-24 lg:flex-row lg:px-8">
        <aside className="w-full shrink-0 lg:w-80">
          <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-xl">
            <p className="font-label text-xs font-bold uppercase tracking-[0.22em] text-white/60">
              Админ самбар
            </p>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight">
              {user.name}
            </h1>
            <p className="mt-2 text-sm leading-6 text-white/70">
              {user.email}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
                {user.role}
              </span>
              <Link
                className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white"
                href="/profile"
              >
                Профайл
              </Link>
            </div>
          </div>

          <nav className="mt-6 space-y-2 rounded-[2rem] bg-surface-container-low p-4">
            {adminRoutes.map((route) => (
              <Link
                key={route.href}
                className={cn(
                  "flex items-center rounded-[1.25rem] px-4 py-3 text-sm font-semibold transition-colors",
                  activeHref === route.href
                    ? "bg-primary text-white"
                    : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface",
                )}
                href={route.href}
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </aside>

        <section className="min-w-0 flex-1">{children}</section>
      </main>
    </>
  );
}
