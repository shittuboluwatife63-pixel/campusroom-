"use client";

import { useMemo, useState } from "react";
import { rooms, SEATS_PER_SLOT } from "../data";
import { useBookings } from "../context/BookingsContext";
import RoomCard from "./RoomCard";

function getLocalDate() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export default function RoomBrowser() {
  const [search, setSearch] = useState("");
  const { bookings } = useBookings();
  const availabilityDate = getLocalDate();

  const matchingRooms = useMemo(
    () =>
      rooms.filter((room) =>
        room.name.toLowerCase().includes(search.trim().toLowerCase()),
      ),
    [search],
  );

  return (
    <div>
      <label htmlFor="room-search" className="sr-only">
        Search rooms by name
      </label>
      <div className="relative mb-6 max-w-xl">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-ink/40"
        >
          ⌕
        </span>
        <input
          id="room-search"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search rooms by name"
          className="h-14 w-full rounded-2xl border border-ink/15 bg-white pl-12 pr-4 text-sm text-ink outline-none transition placeholder:text-ink/40 focus:border-forest focus:ring-4 focus:ring-forest/10"
        />
      </div>

      <p className="mb-4 text-sm font-medium text-ink/55" aria-live="polite">
        {matchingRooms.length} {matchingRooms.length === 1 ? "room" : "rooms"} to
        explore
      </p>
      {matchingRooms.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {matchingRooms.map((room) => {
            const availableSlot = room.timeSlots.find((timeSlot) => {
              const seatsTaken = bookings.filter(
                (booking) =>
                  booking.roomId === room.id &&
                  booking.date === availabilityDate &&
                  booking.timeSlot === timeSlot,
              ).length;
              return seatsTaken < SEATS_PER_SLOT;
            });
            const seatsTaken = bookings.filter(
              (booking) =>
                booking.roomId === room.id &&
                booking.date === availabilityDate &&
                booking.timeSlot === availableSlot,
            ).length;

            return (
              <RoomCard
                key={room.id}
                room={room}
                availableSlot={availableSlot}
                seatsLeft={SEATS_PER_SLOT - seatsTaken}
              />
            );
          })}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-ink/20 bg-white px-6 py-16 text-center">
          <span aria-hidden="true" className="text-4xl">
            ⌕
          </span>
          <h3 className="mt-4 text-lg font-extrabold text-ink">
            No rooms found
          </h3>
          <p className="mt-1 text-sm text-ink/55">
            Try a different room name.
          </p>
        </div>
      )}
    </div>
  );
}
