/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";

import type { AuthenticatedUser } from "@/lib/auth";
import type { OrderSummaryCard } from "@/types/commerce";

import { MaterialIcon } from "./material-icon";
import { profileSidebar } from "./store-data";
import { CompactStoreFooter } from "./store-footer";
import { StoreNavbar } from "./store-navbar";

const profileRouteMap: Record<string, string> = {
  "Миний мэдээлэл": "/profile",
  "Захиалгын түүх": "/orders",
  "Хадгалсан бараа": "/wishlist",
  "Тохиргоо": "/addresses",
};

type ProfilePageProps = {
  user: AuthenticatedUser;
  orders: OrderSummaryCard[];
  latestPhone?: string;
  latestAddress?: string[];
};

export function ProfilePage({
  user,
  orders,
  latestPhone,
  latestAddress,
}: ProfilePageProps) {
  return (
    <>
      <StoreNavbar />
      <main className="mx-auto flex max-w-7xl flex-col gap-12 px-6 pb-20 pt-24 lg:flex-row lg:px-8">
        <aside className="flex w-full flex-col gap-2 lg:w-72">
          <div className="mb-4 p-6">
            <h2 className="text-3xl font-extrabold tracking-tight text-on-surface">
              Хувийн бүртгэл
            </h2>
            <p className="mt-1 text-sm text-on-surface-variant">
              Таны дэлгүүрийн мэдээллийн хэсэг
            </p>
          </div>

          <nav className="space-y-1">
            {profileSidebar.map((item) => (
              <Link
                key={item.label}
                className={`group flex items-center gap-3 rounded-[1.5rem] px-6 py-4 transition-all ${
                  item.active
                    ? "border-l-4 border-primary bg-primary-container/10 font-bold text-primary"
                    : "text-slate-600 hover:bg-surface-container-low"
                }`}
                href={profileRouteMap[item.label] ?? "/profile"}
              >
                <MaterialIcon
                  filled={item.active}
                  name={item.icon}
                  className={`transition-colors ${item.active ? "" : "group-hover:text-primary"}`}
                />
                <span className="font-headline text-sm tracking-wide">
                  {item.label}
                </span>
              </Link>
            ))}

            <div className="px-6 pt-8">
              <button className="flex items-center gap-3 text-sm font-semibold text-error transition-opacity hover:opacity-70">
                <MaterialIcon name="logout" />
                Гарах
              </button>
            </div>
          </nav>
        </aside>

        <div className="flex-1 space-y-12">
          <section className="relative overflow-hidden rounded-[2rem] bg-surface-container-low p-8 lg:p-12">
            <div className="absolute right-0 top-0 h-32 w-32 translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5" />
            <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-6">
                <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-primary-fixed shadow-sm">
                  {user.picture ? (
                    <img
                      alt={user.name}
                      className="h-full w-full object-cover"
                      src={user.picture}
                    />
                  ) : (
                    <Image
                      fill
                      alt={user.name}
                      className="object-cover"
                      sizes="80px"
                      src="/logo.jpg"
                    />
                  )}
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{user.name}</h3>
                  <p className="mt-1 font-label text-xs uppercase tracking-widest text-on-surface-variant">
                    Auth0 хэрэглэгчийн бүртгэл
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                      {user.isAdmin ? "Админ" : "Хэрэглэгч"}
                    </span>
                    {user.isAdmin ? (
                      <Link
                        className="rounded-full bg-secondary/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-secondary"
                        href="/admin"
                      >
                        Хянах самбар
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>

              <a
                className="flex items-center gap-2 rounded-full bg-surface-container-highest px-6 py-3 text-sm font-bold text-on-surface transition-all hover:opacity-80"
                href="/auth/logout"
              >
                <MaterialIcon className="text-sm" name="logout" />
                Гарах
              </a>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <div>
                  <label className="mb-2 block font-label text-xs font-semibold uppercase tracking-widest text-on-surface-variant/60">
                    Имэйл хаяг
                  </label>
                  <div className="flex items-center justify-between rounded-[1.5rem] border border-outline-variant/10 bg-surface-container-lowest p-4 shadow-sm">
                    <span className="font-medium">{user.email}</span>
                    <span className="text-sm font-semibold text-primary">
                      Auth0
                    </span>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block font-label text-xs font-semibold uppercase tracking-widest text-on-surface-variant/60">
                    Утасны дугаар
                  </label>
                  <div className="flex items-center justify-between rounded-[1.5rem] border border-outline-variant/10 bg-surface-container-lowest p-4 shadow-sm">
                    <span className="font-medium">
                      {latestPhone || "Сүүлийн захиалгын үеэр оруулаагүй"}
                    </span>
                    <span className="text-sm font-semibold text-primary">
                      Захиалгын мэдээлэл
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="mb-2 block font-label text-xs font-semibold uppercase tracking-widest text-on-surface-variant/60">
                  Үндсэн хүргэлтийн хаяг
                </label>
                <div className="relative rounded-[2rem] border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-sm">
                  <p className="font-medium leading-relaxed text-on-surface">
                    {(latestAddress?.length
                      ? latestAddress
                      : [
                          "Одоогоор хүргэлтийн хаяг хадгалагдаагүй байна.",
                          "Эхний захиалга хийх үед автоматаар харагдана.",
                        ]
                    ).map((line) => (
                      <span key={line}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </p>
                  <button className="mt-6 flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                    <MaterialIcon className="text-sm" name="edit_location" />
                    Дараагийн захиалгаар шинэчлэх
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className="mb-8 flex items-end justify-between px-2">
              <div>
                <h3 className="text-2xl font-bold">Сүүлийн захиалгууд</h3>
                <p className="mt-1 text-sm text-on-surface-variant">
                  Таны хамгийн сүүлд хийсэн захиалгууд
                </p>
              </div>
              <Link
                className="flex items-center gap-1 text-sm font-bold text-primary transition-all hover:gap-2"
                href="/orders"
              >
                Бүх захиалгыг харах{" "}
                <MaterialIcon className="text-sm" name="arrow_forward" />
              </Link>
            </div>

            <div className="space-y-4">
              {orders.length ? orders.map((order) => (
                <div
                  key={order.orderNumber}
                  className={`rounded-[2rem] border border-outline-variant/5 bg-surface-container-lowest p-6 shadow-sm transition-shadow hover:shadow-md ${
                    order.delivered ? "opacity-80" : ""
                  }`}
                >
                  <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-6">
                      <div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-surface-container-low">
                        <MaterialIcon
                          className={`text-3xl ${
                            order.delivered
                              ? "text-on-surface-variant/40"
                              : "text-primary-container"
                          }`}
                          name={order.delivered ? "check_circle" : "package_2"}
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-headline font-bold">
                            Захиалга #{order.orderNumber}
                          </span>
                          <span
                            className={`rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest ${
                              order.delivered
                                ? "bg-surface-container-high text-on-surface-variant"
                                : "bg-secondary-container text-on-secondary-container"
                            }`}
                          >
                            {order.statusLabel}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-on-surface-variant">
                          Захиалсан огноо: {order.createdAt}
                        </p>
                      </div>
                    </div>

                    <div className="flex w-full items-center justify-between gap-12 md:w-auto md:justify-end">
                      <div className="text-right">
                        <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
                          Нийт
                        </p>
                        <p className={`text-lg font-bold ${order.delivered ? "" : "text-primary"}`}>
                          {order.totalLabel}
                        </p>
                      </div>
                      <Link
                        className={`rounded-full px-6 py-2.5 text-sm font-bold transition-all ${
                          order.delivered
                            ? "bg-surface-container-highest text-on-surface"
                            : "bg-primary text-white"
                        }`}
                        href={`/order/${order.orderNumber}`}
                      >
                        {order.delivered ? "Дэлгэрэнгүй" : "Захиалга хянах"}
                      </Link>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="rounded-[2rem] border border-dashed border-outline-variant/40 bg-surface-container-lowest p-8 text-center text-text-soft">
                  Одоогоор захиалгын түүх алга. Бараа сагсалж QPay-ээр төлбөр
                  үүсгэсний дараа энд харагдана.
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
      <CompactStoreFooter variant="profile" />
    </>
  );
}
