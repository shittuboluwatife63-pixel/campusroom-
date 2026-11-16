import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[65vh] w-[min(640px,calc(100%-32px))] flex-col items-center justify-center py-16 text-center">
      <span className="rounded-full bg-mint px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-forest">
        Room not found
      </span>
      <h1 className="mt-5 text-3xl font-black tracking-tight text-ink sm:text-4xl">
        This space is off the map.
      </h1>
      <p className="mt-3 max-w-md text-sm leading-6 text-ink/60">
        The room may have moved, or the link may be incorrect. Browse the
        available campus spaces to find another spot.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-full bg-forest px-5 py-3 text-sm font-bold text-white transition hover:bg-ink"
      >
        Explore all rooms
      </Link>
    </div>
  );
}
