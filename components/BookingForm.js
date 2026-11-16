"use client";

import { useState } from "react";
import { SEATS_PER_SLOT } from "../data";
import { useBookings } from "../context/BookingsContext";

function getLocalDate() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export default function BookingForm({ room }) {
  const [name, setName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [date, setDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const { bookings, addBooking, isHydrated } = useBookings();
  const today = getLocalDate();
  const selectedDate = date || today;

  function seatsLeft(timeSlot) {
    const booked = bookings.filter(
      (booking) =>
        booking.roomId === room.id &&
        booking.date === selectedDate &&
        booking.timeSlot === timeSlot,
    ).length;
    return Math.max(0, SEATS_PER_SLOT - booked);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSuccess("");

    const nextErrors = {};
    if (!name.trim()) nextErrors.name = "Enter your name.";
    if (!purpose.trim()) nextErrors.purpose = "Tell us what you’ll use the room for.";
    if (!date) nextErrors.date = "Choose a date.";
    if (date && date < today) nextErrors.date = "Choose today or a future date.";
    if (!selectedSlot) nextErrors.slot = "Choose a time slot.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const result = addBooking({
      roomId: room.id,
      name,
      purpose,
      date,
      timeSlot: selectedSlot,
    });

    if (!result.ok) {
      setErrors({ slot: result.error });
      setSelectedSlot("");
      return;
    }

    setName("");
    setPurpose("");
    setSelectedSlot("");
    setErrors({});
    setSuccess("Seat booked! This booking is saved on this device.");
  }

  return (
    <aside className="h-fit rounded-[28px] border border-ink/10 bg-white p-5 shadow-[0_12px_36px_-26px_rgba(23,36,32,0.3)] sm:p-7">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-forest">
          Make it yours
        </p>
        <h2 className="mt-2 text-2xl font-extrabold tracking-tight text-ink">
          Book a seat
        </h2>
        <p className="mt-1 text-sm text-ink/55">
          Each time slot includes four bookable seats.
        </p>
      </div>

      <form className="mt-6 space-y-5" onSubmit={handleSubmit} noValidate>
        <div>
          <label
            htmlFor="booking-name"
            className="mb-1.5 block text-sm font-bold text-ink"
          >
            Your name
          </label>
          <input
            id="booking-name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
              setErrors((current) => ({ ...current, name: "" }));
            }}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "booking-name-error" : undefined}
            className="h-12 w-full rounded-xl border border-ink/15 bg-canvas px-3 text-sm text-ink outline-none focus:border-forest focus:ring-4 focus:ring-forest/10"
          />
          {errors.name && (
            <p
              id="booking-name-error"
              role="alert"
              className="mt-1.5 text-sm font-medium text-red-700"
            >
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="booking-purpose"
            className="mb-1.5 block text-sm font-bold text-ink"
          >
            Purpose
          </label>
          <textarea
            id="booking-purpose"
            rows={2}
            value={purpose}
            onChange={(event) => {
              setPurpose(event.target.value);
              setErrors((current) => ({ ...current, purpose: "" }));
            }}
            aria-invalid={Boolean(errors.purpose)}
            aria-describedby={
              errors.purpose ? "booking-purpose-error" : undefined
            }
            placeholder="e.g. Biology group study"
            className="w-full resize-y rounded-xl border border-ink/15 bg-canvas px-3 py-3 text-sm text-ink outline-none placeholder:text-ink/35 focus:border-forest focus:ring-4 focus:ring-forest/10"
          />
          {errors.purpose && (
            <p
              id="booking-purpose-error"
              role="alert"
              className="mt-1.5 text-sm font-medium text-red-700"
            >
              {errors.purpose}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="booking-date"
            className="mb-1.5 block text-sm font-bold text-ink"
          >
            Date
          </label>
          <input
            id="booking-date"
            type="date"
            min={today}
            value={date}
            onChange={(event) => {
              setDate(event.target.value);
              setSelectedSlot("");
              setErrors((current) => ({ ...current, date: "", slot: "" }));
            }}
            aria-invalid={Boolean(errors.date)}
            aria-describedby={errors.date ? "booking-date-error" : undefined}
            className="h-12 w-full rounded-xl border border-ink/15 bg-canvas px-3 text-sm text-ink outline-none focus:border-forest focus:ring-4 focus:ring-forest/10"
          />
          {errors.date && (
            <p
              id="booking-date-error"
              role="alert"
              className="mt-1.5 text-sm font-medium text-red-700"
            >
              {errors.date}
            </p>
          )}
        </div>

        <fieldset>
          <legend className="mb-2 text-sm font-bold text-ink">
            Choose a time slot
          </legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {room.timeSlots.map((timeSlot) => {
              const remaining = seatsLeft(timeSlot);
              const full = remaining === 0;
              const selected = selectedSlot === timeSlot;

              return (
                <button
                  key={timeSlot}
                  type="button"
                  disabled={full || !isHydrated}
                  aria-pressed={selected}
                  onClick={() => {
                    setSelectedSlot(timeSlot);
                    setErrors((current) => ({ ...current, slot: "" }));
                  }}
                  className={`rounded-xl border p-3 text-left transition ${
                    full
                      ? "cursor-not-allowed border-ink/10 bg-slate-50 text-ink/40"
                      : selected
                        ? "border-forest bg-mint ring-2 ring-forest/15"
                        : "border-ink/10 bg-white hover:border-forest/40 hover:bg-canvas"
                  }`}
                >
                  <span className="block text-sm font-bold">{timeSlot}</span>
                  <span className="mt-1 block text-xs font-medium">
                    {full
                      ? "Fully booked"
                      : `${remaining} of ${SEATS_PER_SLOT} seats left`}
                  </span>
                </button>
              );
            })}
          </div>
          {errors.slot && (
            <p role="alert" className="mt-2 text-sm font-medium text-red-700">
              {errors.slot}
            </p>
          )}
        </fieldset>

        {success && (
          <p
            role="status"
            className="rounded-xl bg-mint px-3 py-2.5 text-sm font-semibold text-forest"
          >
            {success}
          </p>
        )}

        <button
          type="submit"
          disabled={!isHydrated}
          className="flex h-12 w-full items-center justify-center rounded-full bg-forest px-5 text-sm font-bold text-white transition hover:bg-ink disabled:cursor-wait disabled:opacity-60"
        >
          {!isHydrated ? "Loading availability…" : "Confirm booking"}
        </button>
        <p className="text-center text-xs leading-5 text-ink/45">
          You can cancel your booking any time from My Bookings.
        </p>
      </form>
    </aside>
  );
}
