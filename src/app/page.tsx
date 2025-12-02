import { Button } from "@/components/ui/button";
import { SiFacebook, SiInstagram } from "@icons-pack/react-simple-icons";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-zinc-900 via-zinc-800 to-zinc-900">
      <main
        className="flex flex-col items-center justify-center text-center px-6"
        aria-label="Coming soon page"
      >
        <div className="mb-8">
          <Image src="/logo.jpg" alt="Monkey Closet Logo" width={100} height={100} className="w-24 h-24 rounded-full" />
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          Monkey Closet
        </h1>
        <div className="w-24 h-1 bg-linear-to-r from-amber-400 to-orange-500 rounded-full mb-8" />
        <p className="text-2xl md:text-3xl text-zinc-300 font-light mb-4">
          Тун удахгүй
        </p>
        <p className="text-lg text-zinc-400 max-w-md mb-12">
          Сүүлийн шинэлэг загварын хүүхдийн хувцаснууд болон бусад хэрэгцээт барааны төрөлжсөн дэлгүүр тун удахгүй нээгдэнэ. Бидэнтэй хамт байгаарай!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="px-6 py-3 bg-zinc-800 rounded-lg border border-zinc-700">
            <p className="text-zinc-400 text-sm">Бидэнтэй холбогдох сувгууд</p>
            <div className="flex items-center justify-center gap-4 mt-2">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://www.facebook.com/share/1AEbHse7y2/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer">
                  <SiFacebook className="w-10 h-10 text-blue-600" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://www.instagram.com/monkey_closet_newtrend?igsh=ZDQ2ODU5ZWZrZDZ0" target="_blank" rel="noopener noreferrer">
                  <SiInstagram className="w-10 h-10 text-pink-500" />
                </a>
              </Button>
            </div>
          </div>
        </div>
        <p className="text-zinc-500 text-sm mt-16">
          © {new Date().getFullYear()} Monkey Closet. All rights reserved. Tel: 88661818
        </p>
      </main>
    </div>
  );
}
