# Campus Room Booking

A responsive campus study-room booking app built with Next.js, React, and
Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Create a production build
with `npm run build`.

## Features

- Browse six campus rooms and filter by room name, building, capacity, and date.
- Book a seat by entering a name, purpose, date, and available time slot.
- Each room and time slot has four seats; availability updates as bookings are
  added or cancelled.
- Review and cancel reservations on **My Bookings**.
- Bookings persist in the browser using local storage.
- Responsive layouts, clear availability badges, and empty states.

## Project structure

- `app/` — home, room detail, bookings, and shared layout routes
- `components/` — room cards, search filters, and booking form
- `context/BookingsContext.js` — React Context state and local-storage persistence
- `data.js` — room catalog and per-slot seat limit

Bookings are stored per browser and are not synchronized between devices; a
shared, production booking service would require a backend.

## Deploy

Import the repository into [Vercel](https://vercel.com/) and deploy with the
default Next.js build settings.
