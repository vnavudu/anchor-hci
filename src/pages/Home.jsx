import { Link } from 'react-router-dom'

const Home = () => (
  <section className="flex w-full flex-col items-center justify-center gap-14 text-center">
    <div className="flex flex-col items-center gap-3">
      <span className="text-sm font-bold uppercase tracking-[0.6em] text-anchor-primary">
        Anchor
      </span>
      <h2 className="text-2xl font-semibold text-anchor-deep sm:text-3xl">
        Hi, Sally!
      </h2>
      <p className="mx-auto max-w-xl text-base text-anchor-muted">
        Wherever you are right now, you deserve a gentle pause. We&apos;re here
        to help you find it.
      </p>
    </div>
    <div className="w-full max-w-xl space-y-6">
      <Link
        to="/calm"
        className="block w-full rounded-[3.5rem] bg-anchor-primary px-12 py-7 text-lg font-semibold uppercase tracking-[0.4em] text-white shadow-soft transition-transform transition-colors duration-300 ease-smooth hover:-translate-y-1 hover:bg-[#003B8E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-anchor-primary/50"
      >
        Calm Me Down
      </Link>
      <Link
        to="/log"
        className="block w-full rounded-[3.5rem] border border-white/70 bg-white px-12 py-7 text-lg font-semibold uppercase tracking-[0.35em] text-anchor-deep shadow-soft transition-transform transition-colors duration-300 ease-smooth hover:-translate-y-1 hover:bg-[#D7E4F3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-anchor-deep/40"
      >
        Create A Log
      </Link>
    </div>
    <p className="max-w-sm text-sm italic text-anchor-muted">
      “You are the anchor in your own calm, even when the waves rise.”
    </p>
  </section>
)

export default Home
