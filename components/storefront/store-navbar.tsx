import Image from "next/image";
import Link from "next/link";

import { getCurrentUser } from "@/lib/auth";
import { getCartSummary } from "@/lib/commerce/cart-service";
import { cn } from "@/lib/utils";

import { MaterialIcon } from "./material-icon";
import { brandName, navItems, type NavKey } from "./store-data";

type StoreNavbarProps = {
  activeKey?: NavKey;
};

export async function StoreNavbar({ activeKey }: StoreNavbarProps) {
  const [user, cart] = await Promise.all([getCurrentUser(), getCartSummary()]);

  return (
    <nav className="fixed top-0 z-50 w-full bg-background/80 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-8">
        <Link
          className="flex items-center gap-3"
          href="/"
        >
          <div className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-primary/10">
            <Image
              fill
              alt={`${brandName} лого`}
              className="object-cover"
              sizes="44px"
              src="/logo.jpg"
            />
          </div>
          <div className="hidden sm:block">
            <p className="text-2xl font-bold tracking-tight text-primary">
              {brandName}
            </p>
            <p className="font-label text-[10px] uppercase tracking-[0.24em] text-text-muted">
              Хүүхдийн загварын дэлгүүр
            </p>
          </div>
        </Link>

        <div className="hidden items-center space-x-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              className={cn(
                "font-headline text-sm font-semibold tracking-wide text-slate-600 transition-colors hover:text-primary",
                activeKey === item.key && "border-b-2 border-primary pb-1 text-primary",
              )}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-6 text-primary">
          {user?.isAdmin ? (
            <Link
              className="hidden rounded-full bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary/15 lg:inline-flex"
              href="/admin"
            >
              Админ
            </Link>
          ) : null}
          <Link
            aria-label={user ? "Профайл" : "Нэвтрэх"}
            className="transition-all duration-300 hover:opacity-80 active:scale-95"
            href={user ? "/profile" : "/login"}
          >
            {user ? (
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                {user.name.charAt(0).toUpperCase()}
              </span>
            ) : (
              <MaterialIcon name="person" />
            )}
          </Link>
          <Link
            aria-label="Сагс"
            className="relative transition-all duration-300 hover:opacity-80 active:scale-95"
            href="/cart"
          >
            <MaterialIcon name="shopping_cart" />
            {cart.itemCount > 0 ? (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary-container px-1 text-[10px] text-white">
                {cart.itemCount}
              </span>
            ) : null}
          </Link>
        </div>
      </div>
    </nav>
  );
}
