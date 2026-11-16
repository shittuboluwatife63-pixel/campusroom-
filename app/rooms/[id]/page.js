import { notFound } from "next/navigation";
import BookingForm from "../../../components/BookingForm";
import { rooms } from "../../../data";

export default async function RoomPage({ params }) {
  const { id } = await params;
  const room = rooms.find((item) => item.id === id);

  if (!room) {
    notFound();
  }

  return (
    <div className="mx-auto w-[min(1160px,calc(100%-32px))] pb-16 pt-8 sm:pt-12">
      <a
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-forest hover:text-ink"
      >
        <span aria-hidden="true">←</span> All rooms
      </a>
      <section className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div
            role="img"
            aria-label={`${room.name} in ${room.building}`}
            className="aspect-[1.45/1] overflow-hidden rounded-[28px] bg-mint bg-cover bg-center sm:aspect-[1.7/1] lg:aspect-[1.2/1]"
            style={{ backgroundImage: `url("${room.image}")` }}
          />
          <div className="mt-7">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-forest">
              {room.building}
            </p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-ink sm:text-4xl">
              {room.name}
            </h1>
            <p className="mt-3 text-sm leading-6 text-ink/60">
              A welcoming campus space ready for your next study session,
              project meeting, or creative brainstorm.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full bg-mint px-3 py-1.5 text-sm font-bold text-forest">
                Up to {room.capacity} people
              </span>
              {room.amenities.map((amenity) => (
                <span
                  key={amenity}
                  className="rounded-full border border-ink/10 bg-white px-3 py-1.5 text-sm font-semibold text-ink/70"
                >
                  {amenity}
                </span>
              ))}
            </div>
          </div>
        </div>
        <BookingForm room={room} />
      </section>
    </div>
  );
}
