import type { ReactNode } from "react";
import Link from "next/link";

import { CompactStoreFooter } from "@/components/storefront/store-footer";
import { StoreNavbar } from "@/components/storefront/store-navbar";
import { accountRoutes } from "@/store/navigation";
import { cn } from "@/lib/utils";

type AccountShellProps = {
  title: string;
  description: string;
  activeHref: string;
  children: ReactNode;
};

export async function AccountShell({
  title,
  description,
  activeHref,
  children,
}: AccountShellProps) {
  return (
    <>
      <StoreNavbar />
      <main className="mx-auto flex max-w-7xl flex-col gap-10 px-6 pb-20 pt-24 lg:flex-row lg:px-8">
        <aside className="w-full shrink-0 lg:w-72">
          <div className="rounded-[2rem] bg-surface-container-low p-6">
            <h1 className="text-3xl font-extrabold tracking-tight text-on-surface">
              {title}
            </h1>
            <p className="mt-3 text-sm leading-6 text-on-surface-variant">
              {description}
            </p>
          </div>

          <nav className="mt-6 space-y-2">
            {accountRoutes.map((route) => (
              <Link
                key={route.href}
                className={cn(
                  "flex items-center rounded-[1.25rem] px-5 py-4 text-sm font-semibold transition-colors",
                  activeHref === route.href
                    ? "bg-primary/10 text-primary"
                    : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface",
                )}
                href={route.href}
              >
                {route.label}
              </Link>
            ))}
            <a
              className="flex items-center rounded-[1.25rem] px-5 py-4 text-sm font-semibold text-error transition-opacity hover:opacity-80"
              href="/auth/logout"
            >
              Гарах
            </a>
          </nav>
        </aside>

        <section className="min-w-0 flex-1">{children}</section>
      </main>
      <CompactStoreFooter variant="profile" />
    </>
  );
}
