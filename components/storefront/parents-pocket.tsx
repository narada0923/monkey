import Image from "next/image";
import Link from "next/link";

import { MaterialIcon } from "./material-icon";
import { parentsPocketItems } from "./store-data";

export function ParentsPocket() {
  return (
    <div className="fixed bottom-6 left-6 right-6 z-50 h-16 items-center justify-between rounded-full border border-white/20 bg-surface-container-lowest/80 px-6 shadow-2xl backdrop-blur-xl md:hidden">
      <div className="flex items-center justify-between">
        <div className="flex -space-x-3">
          {parentsPocketItems.map((item) => (
            <div
              key={item}
              className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white"
            >
              <Image
                fill
                alt="Сүүлд үзсэн бараа"
                className="object-cover"
                sizes="40px"
                src={item}
              />
            </div>
          ))}
        </div>
        <p className="font-label text-[10px] font-bold uppercase text-on-surface-variant">
          Сүүлд үзсэн
        </p>
        <Link
          aria-label="Сагс руу очих"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white"
          href="/checkout"
        >
          <MaterialIcon className="text-sm" name="shopping_bag" />
        </Link>
      </div>
    </div>
  );
}
