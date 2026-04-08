import Image from "next/image";
import Link from "next/link";

import { MaterialIcon } from "./material-icon";
import { brandName, socialLinks } from "./store-data";

export function StoreFooter() {
  return (
    <footer className="mt-12 w-full rounded-t-[3rem] bg-[#f6f2f7]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-12 py-24 md:grid-cols-3">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-primary/10">
              <Image
                fill
                alt={`${brandName} лого`}
                className="object-cover"
                sizes="56px"
                src="/logo.jpg"
              />
            </div>
            <div>
              <div className="text-xl font-bold text-secondary">{brandName}</div>
              <p className="font-label text-[10px] uppercase tracking-[0.24em] text-text-muted">
                Хүүхдийн загварын дэлгүүр
              </p>
            </div>
          </div>
          <p className="max-w-xs font-body leading-relaxed text-slate-500">
            Таны бяцхан үрсэд зориулсан мөнхийн загвар, тогтвортой чанарыг урлан
            бүтээв.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-4">
            <h5 className="font-headline font-bold text-primary">Дэлгүүр</h5>
            <ul className="space-y-2 font-body text-sm text-slate-500">
              <li>
                <Link className="inline-block transition-all hover:text-primary hover:-translate-y-0.5" href="/#boys">
                  Хөвгүүд
                </Link>
              </li>
              <li>
                <Link className="inline-block transition-all hover:text-primary hover:-translate-y-0.5" href="/#girls">
                  Охид
                </Link>
              </li>
              <li>
                <Link className="inline-block transition-all hover:text-primary hover:-translate-y-0.5" href="/#new-arrivals">
                  Шинээр ирсэн
                </Link>
              </li>
              <li>
                <Link className="inline-block transition-all hover:text-primary hover:-translate-y-0.5" href="/products">
                  Хямдрал
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h5 className="font-headline font-bold text-primary">Тусламж</h5>
            <ul className="space-y-2 font-body text-sm text-slate-500">
              <li>
                <Link className="inline-block transition-all hover:text-primary hover:-translate-y-0.5" href="/orders">
                  Харилцагчийн үйлчилгээ
                </Link>
              </li>
              <li>
                <Link className="inline-block transition-all hover:text-primary hover:-translate-y-0.5" href="/checkout">
                  Хүргэлт
                </Link>
              </li>
              <li>
                <Link className="inline-block transition-all hover:text-primary hover:-translate-y-0.5" href="/checkout">
                  Буцаалт
                </Link>
              </li>
              <li>
                <Link className="inline-block transition-all hover:text-primary hover:-translate-y-0.5" href="/login">
                  Бидний тухай
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <h5 className="font-headline font-bold text-primary">Мэдээлэл хүлээн авах</h5>
          <p className="font-body text-sm text-slate-500">
            Шинэ цуглуулгуудын мэдээллийг түрүүлж аваарай.
          </p>
          <div className="flex gap-2">
            <input
              className="flex-1 rounded-full border-none bg-white px-6 py-3 text-sm focus:ring-1 focus:ring-primary/20"
              placeholder="Имэйл хаяг"
              type="email"
            />
            <button className="rounded-full bg-primary px-6 py-3 text-white transition-all hover:opacity-90">
              Бүртгүүлэх
            </button>
          </div>
          <div className="mt-8 flex gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                className="text-slate-400 transition-all hover:text-primary"
                href={link.href}
                rel="noreferrer"
                target="_blank"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-4 border-t border-outline-variant/10 px-12 py-8 text-center md:flex-row">
        <div className="font-body text-sm text-slate-500">
          © 2024 {brandName}. Баяр хөөр бэлэглэнэ.
        </div>
        <div className="flex gap-8 font-label text-xs text-slate-400">
          <Link href="/login">Нууцлалын бодлого</Link>
          <Link href="/login">Үйлчилгээний нөхцөл</Link>
        </div>
      </div>
    </footer>
  );
}

type CompactStoreFooterProps = {
  variant: "checkout" | "profile";
};

export function CompactStoreFooter({ variant }: CompactStoreFooterProps) {
  if (variant === "checkout") {
    return (
      <footer className="mt-12 w-full rounded-t-[3rem] bg-surface-container-low">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-12 py-16 md:grid-cols-3">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-primary/10">
                <Image
                  fill
                  alt={`${brandName} лого`}
                  className="object-cover"
                  sizes="48px"
                  src="/logo.jpg"
                />
              </div>
              <div className="text-lg font-bold text-secondary">{brandName}</div>
            </div>
            <p className="max-w-xs text-sm text-slate-500">
              © 2024 {brandName}. Баяр баясгалан бүхэнд. Хүүхэд насны нандин
              дурсамжийг бүтээлцэнэ.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <Link className="block text-sm text-slate-500 transition-all hover:-translate-y-0.5 hover:text-primary" href="/orders">
                Харилцагчийн үйлчилгээ
              </Link>
              <Link className="block text-sm text-slate-500 transition-all hover:-translate-y-0.5 hover:text-primary" href="/login">
                Бидний тухай
              </Link>
              <Link className="block text-sm text-slate-500 transition-all hover:-translate-y-0.5 hover:text-primary" href="/checkout">
                Хүргэлт
              </Link>
            </div>
            <div className="space-y-3">
              <Link className="block text-sm text-slate-500 transition-all hover:-translate-y-0.5 hover:text-primary" href="/checkout">
                Буцаалт
              </Link>
              <a
                className="block text-sm text-slate-500 transition-all hover:-translate-y-0.5 hover:text-primary"
                href={socialLinks[1].href}
                rel="noreferrer"
                target="_blank"
              >
                Instagram
              </a>
              <a
                className="block text-sm text-slate-500 transition-all hover:-translate-y-0.5 hover:text-primary"
                href={socialLinks[0].href}
                rel="noreferrer"
                target="_blank"
              >
                Facebook
              </a>
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-[2rem] bg-surface-container-high p-6">
            <p className="mb-2 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
              Бидэнтэй нэгдэх
            </p>
            <p className="mb-4 text-sm text-on-surface-variant">
              Эхний захиалгадаа 10% хөнгөлөлт аваарай.
            </p>
            <div className="flex">
              <input
                className="w-full rounded-l-full border-none bg-surface-container-lowest px-4 text-sm"
                placeholder="Имэйл хаяг"
                type="email"
              />
              <button className="rounded-r-full bg-primary px-4 py-2 text-white transition-all hover:opacity-90">
                <MaterialIcon name="arrow_forward" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="mt-12 w-full rounded-t-[3rem] bg-[#f6f2f7]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-12 py-16 md:grid-cols-3">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12 overflow-hidden rounded-full ring-2 ring-primary/10">
              <Image
                fill
                alt={`${brandName} лого`}
                className="object-cover"
                sizes="48px"
                src="/logo.jpg"
              />
            </div>
            <div className="text-lg font-bold text-secondary">{brandName}</div>
          </div>
          <p className="max-w-xs text-sm text-slate-500">
            Бид таны бяцхан үрсэд зориулж хамгийн дээд зэрэглэлийн, загварлаг
            хүүхдийн хувцаснуудыг сонгон хүргэж байна.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-3">
            <Link className="text-sm text-slate-500 transition-all hover:-translate-y-0.5 hover:text-primary" href="/orders">
              Харилцагчийн үйлчилгээ
            </Link>
            <Link className="text-sm text-slate-500 transition-all hover:-translate-y-0.5 hover:text-primary" href="/login">
              Бидний тухай
            </Link>
            <Link className="text-sm text-slate-500 transition-all hover:-translate-y-0.5 hover:text-primary" href="/checkout">
              Хүргэлт
            </Link>
          </div>
          <div className="flex flex-col gap-3">
            <Link className="text-sm text-slate-500 transition-all hover:-translate-y-0.5 hover:text-primary" href="/checkout">
              Буцаалт
            </Link>
            <a
              className="text-sm text-slate-500 transition-all hover:-translate-y-0.5 hover:text-primary"
              href={socialLinks[1].href}
              rel="noreferrer"
              target="_blank"
            >
              Инстаграм
            </a>
            <a
              className="text-sm text-slate-500 transition-all hover:-translate-y-0.5 hover:text-primary"
              href={socialLinks[0].href}
              rel="noreferrer"
              target="_blank"
            >
              Фэйсбүүк
            </a>
          </div>
        </div>

        <div className="flex flex-col items-start gap-4 md:items-end">
          <p className="text-sm text-slate-500">© 2024 {brandName}. Аз жаргалыг бэлэглэнэ.</p>
          <div className="flex gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container">
              <MaterialIcon className="text-primary" name="local_mall" />
            </div>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container">
              <MaterialIcon className="text-primary" name="heart_plus" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
