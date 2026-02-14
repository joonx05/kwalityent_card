import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-zinc-50 font-sans dark:bg-zinc-950">
      <a href="/" className="absolute left-6 top-6 text-xl font-medium text-zinc-600 dark:text-zinc-100">
        Kwality Enterprises
      </a>
      {/* Subtle gradient background */}
      <div
        className="pointer-events-none absolute inset-0 bg-linear-to-b from-amber-50/60 via-transparent to-transparent dark:from-amber-950/20"
        aria-hidden
      />

      <main className="relative flex min-h-screen w-full flex-col items-center justify-center px-6 py-20 sm:px-10">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          {/* Eyebrow / tagline */}
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-amber-600 dark:text-amber-400">
            Digital Business Cards
          </p>

          {/* Main headline - short & punchy like TapOnn */}
          <h1 className="text-4xl font-bold leading-[1.15] tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl md:text-6xl">
            Impress. Connect.{" "}
            <span className="text-amber-600 dark:text-amber-400">Repeat.</span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-xl">
            Share your best self instantly—digital cards that make every
            introduction count. No paper. Always up to date.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-4">
            <Link
              href="#"
              className="inline-flex h-12 min-w-[180px] items-center justify-center rounded-full bg-zinc-900 px-6 font-semibold text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Try it
            </Link>
            <Link
              href="#"
              className="inline-flex h-12 min-w-[180px] items-center justify-center rounded-full border-2 border-zinc-300 px-6 font-semibold text-zinc-800 transition hover:border-zinc-400 hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-200 dark:hover:border-zinc-500 dark:hover:bg-zinc-800/50"
            >
              See How It Works
            </Link>
          </div>

          {/* Small trust line */}
          <p className="mt-12 text-sm text-zinc-500 dark:text-zinc-500">
            Upgrade your first impression—in one tap.
          </p>
        </div>
      </main>
    </div>
  );
}
