import Link from "next/link";

export default function RoomCard({ room, availableSlot, seatsLeft }) {
  const isAvailable = Boolean(availableSlot);

  return (
    <article className="group overflow-hidden rounded-[24px] border border-ink/10 bg-white shadow-[0_8px_24px_-20px_rgba(23,36,32,0.35)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_36px_-22px_rgba(23,36,32,0.35)]">
      <Link
        href={`/rooms/${room.id}`}
        className="relative block aspect-[1.65/1] overflow-hidden bg-mint"
        aria-label={`View ${room.name} details`}
      >
        <div
          role="img"
          aria-label={`${room.name} at ${room.building}`}
          className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url("${room.image}")` }}
        />
        <span
          className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-bold ${
            isAvailable
              ? "bg-white text-forest"
              : "bg-ink/90 text-white"
          }`}
        >
          <span
            aria-hidden="true"
            className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${
              isAvailable ? "bg-emerald-500" : "bg-slate-400"
            }`}
          />
          {isAvailable ? "Available" : "Fully booked"}
        </span>
        <span className="absolute bottom-4 right-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-ink">
          Up to {room.capacity} people
        </span>
      </Link>

      <div className="p-5">
        <p className="text-xs font-bold uppercase tracking-[0.13em] text-forest/70">
          {room.building}
        </p>
        <Link
          href={`/rooms/${room.id}`}
          className="mt-1 inline-block text-xl font-extrabold tracking-tight text-ink hover:text-forest"
        >
          {room.name}
        </Link>
        <div className="mt-4 flex min-h-12 items-center justify-between gap-3 border-t border-ink/10 pt-4">
          {availableSlot ? (
            <div>
              <p className="text-xs font-semibold text-ink/50">Next opening</p>
              <p className="mt-0.5 text-sm font-bold text-ink">
                {availableSlot} · {seatsLeft} of 4 seats left
              </p>
            </div>
          ) : (
            <p className="text-sm font-semibold text-ink/55">
              No seats available on this date
            </p>
          )}
          <span
            aria-hidden="true"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-mint text-lg text-forest transition group-hover:bg-forest group-hover:text-white"
          >
            →
          </span>
        </div>
      </div>
    </article>
  );
}
