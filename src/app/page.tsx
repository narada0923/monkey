export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
      <main 
        className="flex flex-col items-center justify-center text-center px-6"
        aria-label="Coming soon page"
      >
        <div className="mb-8">
          <span className="text-6xl">🐵</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
          Monkey Closet
        </h1>
        <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full mb-8" />
        <p className="text-2xl md:text-3xl text-zinc-300 font-light mb-4">
          Coming Soon
        </p>
        <p className="text-lg text-zinc-400 max-w-md mb-12">
          We&apos;re working hard to bring you an amazing online shopping experience. Stay tuned!
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="px-6 py-3 bg-zinc-800 rounded-lg border border-zinc-700">
            <p className="text-zinc-400 text-sm">Get notified when we launch</p>
            <p className="text-white font-medium">hello@monkeycloset.com</p>
          </div>
        </div>
        <p className="text-zinc-500 text-sm mt-16">
          © 2024 Monkey Closet. All rights reserved.
        </p>
      </main>
    </div>
  );
}
