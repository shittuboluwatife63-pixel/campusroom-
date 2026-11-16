"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useBookings } from "../context/BookingsContext";

export default function SiteHeader() {
  const pathname = usePathname();
  const { bookings } = useBookings();

  function navClass(href) {
    const active = pathname === href || (href !== "/" && pathname.startsWith(href));
    return `rounded-full px-4 py-2 text-sm font-semibold transition ${
      active
        ? "bg-forest text-white"
        : "text-ink/70 hover:bg-mint hover:text-forest"
    }`;
  }

  return (
    <header className="sticky top-0 z-30 border-b border-ink/10 bg-canvas/95 backdrop-blur">
      <div className="mx-auto flex min-h-[76px] w-[min(1160px,calc(100%-32px))] items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-forest text-lg font-black text-white">
            C
          </span>
          <span className="text-lg font-extrabold tracking-tight text-ink">
            campus<span className="text-forest">room</span>
          </span>
        </Link>
        <nav aria-label="Main navigation" className="flex items-center gap-1">
          <Link href="/" className={navClass("/")}>
            Find a room
          </Link>
          <Link href="/my-bookings" className={navClass("/my-bookings")}>
            <span className="hidden sm:inline">My bookings</span>
            <span className="sm:hidden">Bookings</span>
            <span className="ml-1.5 rounded-full bg-white/20 px-2 py-0.5 text-xs">
              {bookings.length}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
