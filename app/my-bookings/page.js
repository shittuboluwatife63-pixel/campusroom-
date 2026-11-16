"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useBookings } from "../../context/BookingsContext";
import { rooms } from "../../data";

function formatBookingDate(value) {
  return new Date(`${value}T00:00:00`).toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function MyBookingsPage() {
  const { bookings, cancelBooking, isHydrated } = useBookings();
  const sortedBookings = useMemo(
    () =>
      [...bookings].sort(
        (a, b) =>
          a.date.localeCompare(b.date) ||
          a.timeSlot.localeCompare(b.timeSlot),
      ),
    [bookings],
  );

  return (
    <div className="mx-auto w-[min(960px,calc(100%-32px))] pb-16 pt-10 sm:pt-14">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-forest">
          Your schedule
        </p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-ink sm:text-4xl">
          My bookings
        </h1>
        <p className="mt-2 text-sm text-ink/55">
          Your saved room reservations, all in one place.
        </p>
      </div>

      {!isHydrated ? (
        <div
          role="status"
          className="rounded-3xl border border-ink/10 bg-white px-6 py-16 text-center text-sm font-semibold text-ink/55"
        >
          Loading your bookings…
        </div>
      ) : sortedBookings.length ? (
        <div className="space-y-4">
          {sortedBookings.map((booking) => {
            const room = rooms.find((item) => item.id === booking.roomId);
            if (!room) return null;

            return (
              <article
                key={booking.id}
                className="grid gap-4 rounded-3xl border border-ink/10 bg-white p-4 shadow-[0_8px_24px_-20px_rgba(23,36,32,0.35)] sm:grid-cols-[180px_1fr_auto] sm:items-center sm:gap-6 sm:p-5"
              >
                <Link
                  href={`/rooms/${room.id}`}
                  aria-label={`View ${room.name}`}
                  className="aspect-[1.7/1] overflow-hidden rounded-2xl bg-mint bg-cover bg-center sm:aspect-square"
                  style={{ backgroundImage: `url("${room.image}")` }}
                />
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-forest">
                    {room.building}
                  </p>
                  <Link
                    href={`/rooms/${room.id}`}
                    className="mt-1 inline-block text-xl font-extrabold tracking-tight text-ink hover:text-forest"
                  >
                    {room.name}
                  </Link>
                  <p className="mt-2 text-sm font-bold text-ink">
                    {formatBookingDate(booking.date)} · {booking.timeSlot}
                  </p>
                  <p className="mt-1 text-sm leading-5 text-ink/60">
                    <span className="font-semibold">{booking.name}</span>
                    {" · "}
                    {booking.purpose}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => cancelBooking(booking.id)}
                  className="h-10 rounded-full border border-ink/15 px-4 text-sm font-bold text-ink/70 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 sm:self-center"
                  aria-label={`Cancel booking for ${room.name} on ${formatBookingDate(booking.date)}`}
                >
                  Cancel booking
                </button>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-ink/20 bg-white px-6 py-16 text-center">
          <span
            aria-hidden="true"
            className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-mint text-2xl text-forest"
          >
            ◷
          </span>
          <h2 className="mt-4 text-lg font-extrabold text-ink">
            No bookings yet
          </h2>
          <p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-ink/55">
            When you book a seat, you’ll find all the details right here.
          </p>
          <Link
            href="/"
            className="mt-5 inline-flex rounded-full bg-forest px-5 py-2.5 text-sm font-bold text-white transition hover:bg-ink"
          >
            Find a room
          </Link>
        </div>
      )}
    </div>
  );
}
