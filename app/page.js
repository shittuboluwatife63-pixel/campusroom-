import RoomBrowser from "../components/RoomBrowser";

export default function HomePage() {
  return (
    <div className="mx-auto w-[min(1160px,calc(100%-32px))] pb-16 pt-8 sm:pt-12">
      <section className="relative isolate overflow-hidden rounded-[32px] bg-forest px-6 py-10 text-white sm:px-12 sm:py-14 lg:min-h-[380px]">
        <div className="absolute -right-20 -top-32 -z-10 h-96 w-96 rounded-full bg-emerald-300/15 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 -z-10 h-80 w-80 rounded-full bg-lime-200/10 blur-3xl" />
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-emerald-100">
            <span className="h-1.5 w-1.5 rounded-full bg-lime-300" />
            Your next great study session
          </span>
          <h1 className="mt-5 max-w-xl text-4xl font-black leading-[1.05] tracking-tight sm:text-6xl">
            Find a space to <span className="text-lime-200">make it happen.</span>
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-white/75 sm:text-lg">
            Book a room for your next big idea, group project, or quiet study
            break. Your perfect campus spot is waiting.
          </p>
          <a
            href="#rooms"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-forest transition hover:bg-lime-100"
          >
            Explore rooms <span aria-hidden="true">↓</span>
          </a>
        </div>
        <div
          aria-hidden="true"
          className="absolute bottom-5 right-9 hidden text-8xl font-black leading-none text-white/10 lg:block"
        >
          06
        </div>
      </section>

      <section id="rooms" className="scroll-mt-24 pt-12">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-forest">
              Thoughtfully picked for you
            </p>
            <h2 className="text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
              Spaces to get things done
            </h2>
          </div>
          <p className="text-sm text-ink/55">
            Six rooms, plenty of room for ideas.
          </p>
        </div>
        <RoomBrowser />
      </section>
    </div>
  );
}
