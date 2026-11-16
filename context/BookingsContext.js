"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { rooms, SEATS_PER_SLOT } from "../data";

const BookingsContext = createContext(null);
const STORAGE_KEY = "campus-rooms:bookings";

function isBooking(value) {
  return (
    value &&
    typeof value.id === "string" &&
    rooms.some((room) => room.id === value.roomId) &&
    typeof value.name === "string" &&
    typeof value.purpose === "string" &&
    typeof value.date === "string" &&
    typeof value.timeSlot === "string"
  );
}

function getLocalDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function BookingsProvider({ children }) {
  const [bookings, setBookings] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const bookingsRef = useRef([]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!Array.isArray(parsed)) {
          throw new TypeError("Saved bookings must be an array.");
        }
        const validBookings = parsed.filter(isBooking);
        bookingsRef.current = validBookings;
        setBookings(validBookings);
      }
    } catch (error) {
      console.error("Could not load bookings from local storage.", error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    } catch (error) {
      console.error("Could not save bookings to local storage.", error);
    }
  }, [bookings, isHydrated]);

  function addBooking(details) {
    const room = rooms.find((item) => item.id === details.roomId);
    if (!room || !room.timeSlots.includes(details.timeSlot)) {
      return { ok: false, error: "Choose a valid room and time slot." };
    }
    if (
      !details.name.trim() ||
      !details.purpose.trim() ||
      !details.date ||
      details.date < getLocalDate()
    ) {
      return {
        ok: false,
        error: "Enter your name, purpose, a future date, and a time slot.",
      };
    }

    const seatsTaken = bookingsRef.current.filter(
      (booking) =>
        booking.roomId === details.roomId &&
        booking.date === details.date &&
        booking.timeSlot === details.timeSlot,
    ).length;

    if (seatsTaken >= SEATS_PER_SLOT) {
      return {
        ok: false,
        error: "This time slot is full. Please choose another slot.",
      };
    }

    const booking = {
      ...details,
      id: window.crypto.randomUUID(),
      name: details.name.trim(),
      purpose: details.purpose.trim(),
    };
    const nextBookings = [...bookingsRef.current, booking];
    bookingsRef.current = nextBookings;
    setBookings(nextBookings);
    return { ok: true, booking };
  }

  function cancelBooking(id) {
    const nextBookings = bookingsRef.current.filter(
      (booking) => booking.id !== id,
    );
    bookingsRef.current = nextBookings;
    setBookings(nextBookings);
  }

  return (
    <BookingsContext.Provider
      value={{ bookings, addBooking, cancelBooking, isHydrated }}
    >
      {children}
    </BookingsContext.Provider>
  );
}

export function useBookings() {
  const context = useContext(BookingsContext);
  if (!context) {
    throw new Error("useBookings must be used within a BookingsProvider.");
  }
  return context;
}
