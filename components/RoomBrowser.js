"use client";

import { useEffect, useMemo, useState } from "react";
import { rooms, SEATS_PER_SLOT } from "../data";
import { useBookings } from "../context/BookingsContext";
import RoomCard from "./RoomCard";

function getLocalDate() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export default function RoomBrowser() {
  const [search, setSearch] = useState("");
  const [building, setBuilding] = useState("all");
  const [minimumCapacity, setMinimumCapacity] = useState("all");
  const [availabilityDate, setAvailabilityDate] = useState("");
  const { bookings } = useBookings();
  const today = getLocalDate();
  const selectedDate = availabilityDate || today;
  const buildings = [...new Set(rooms.map((room) => room.building))].sort();

  const matchingRooms = useMemo(() => {
      const query = search.trim().toLowerCase();
      return rooms.filter(
        (room) =>
          room.name.toLowerCase().includes(query) &&
          (building === "all" || room.building === building) &&
          (minimumCapacity === "all" ||
            room.capacity >= Number(minimumCapacity)),
      );
    }, [building, minimumCapacity, search]);

  useEffect(() => {
    setAvailabilityDate(today);
  }, [today]);

  function clearFilters() {
    setSearch("");
    setBuilding("all");
    setMinimumCapacity("all");
    setAvailabilityDate(today);
  }

  return (
    <div>
      <div className="mb-6 grid gap-3 rounded-3xl border border-ink/10 bg-white p-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative sm:col-span-2 lg:col-span-1">
          <label
            htmlFor="room-search"
            className="mb-1.5 block text-xs font-bold text-ink/60"
          >
            Search by name
          </label>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-3 left-3 text-lg text-ink/40"
          >
            ⌕
          </span>
          <input
            id="room-search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Try Willow Commons"
            className="h-11 w-full rounded-xl border border-ink/15 bg-canvas pl-10 pr-3 text-sm text-ink outline-none transition placeholder:text-ink/40 focus:border-forest focus:ring-4 focus:ring-forest/10"
          />
        </div>
        <div>
          <label
            htmlFor="building-filter"
            className="mb-1.5 block text-xs font-bold text-ink/60"
          >
            Building
          </label>
          <select
            id="building-filter"
            value={building}
            onChange={(event) => setBuilding(event.target.value)}
            className="h-11 w-full rounded-xl border border-ink/15 bg-canvas px-3 text-sm text-ink outline-none focus:border-forest focus:ring-4 focus:ring-forest/10"
          >
            <option value="all">All buildings</option>
            {buildings.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="capacity-filter"
            className="mb-1.5 block text-xs font-bold text-ink/60"
          >
            Minimum capacity
          </label>
          <select
            id="capacity-filter"
            value={minimumCapacity}
            onChange={(event) => setMinimumCapacity(event.target.value)}
            className="h-11 w-full rounded-xl border border-ink/15 bg-canvas px-3 text-sm text-ink outline-none focus:border-forest focus:ring-4 focus:ring-forest/10"
          >
            <option value="all">Any group size</option>
            <option value="4">4+ people</option>
            <option value="6">6+ people</option>
            <option value="8">8+ people</option>
            <option value="10">10+ people</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="availability-date"
            className="mb-1.5 block text-xs font-bold text-ink/60"
          >
            Check availability for
          </label>
          <input
            id="availability-date"
            type="date"
            min={today}
            value={availabilityDate}
            onChange={(event) => setAvailabilityDate(event.target.value)}
            className="h-11 w-full rounded-xl border border-ink/15 bg-canvas px-3 text-sm text-ink outline-none focus:border-forest focus:ring-4 focus:ring-forest/10"
          />
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <p className="text-sm font-medium text-ink/55" aria-live="polite">
          {matchingRooms.length}{" "}
          {matchingRooms.length === 1 ? "room" : "rooms"} to explore
        </p>
        <p className="text-xs font-medium text-ink/45">
          Showing seats for{" "}
          <time dateTime={selectedDate}>
            {new Date(`${selectedDate}T00:00:00`).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </time>
        </p>
      </div>
      {matchingRooms.length ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {matchingRooms.map((room) => {
            const availableSlot = room.timeSlots.find((timeSlot) => {
              const seatsTaken = bookings.filter(
                (booking) =>
                  booking.roomId === room.id &&
                  booking.date === selectedDate &&
                  booking.timeSlot === timeSlot,
              ).length;
              return seatsTaken < SEATS_PER_SLOT;
            });
            const seatsTaken = bookings.filter(
              (booking) =>
                booking.roomId === room.id &&
                booking.date === selectedDate &&
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
          <h3 className="mt-4 text-lg font-extrabold text-ink">No rooms found</h3>
          <p className="mt-1 text-sm text-ink/55">
            Try changing your search or filters to find a room.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-5 rounded-full bg-mint px-4 py-2 text-sm font-bold text-forest transition hover:bg-forest hover:text-white"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
