import { useState } from 'react'
import { Link } from 'react-router-dom'

const options = [
  {
    id: 'short',
    label: 'short',
    description: '2-3 minutes · a quick grounding to reset your breath.',
  },
  {
    id: 'medium',
    label: 'medium',
    description: '5 minutes · a gentle pause to release tension.',
  },
  {
    id: 'long',
    label: 'long',
    description: '10 minutes · a deeper release with visualization.',
  },
]

const CalmSession = () => {
  const [selected, setSelected] = useState(null)
  const buttonBase =
    'w-full rounded-[3rem] border border-white/60 bg-white px-8 py-6 text-left shadow-soft transition-all duration-300 ease-smooth focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-anchor-primary/35 hover:-translate-y-1 hover:bg-[#D7E4F3]'

  return (
    <section className="flex w-full flex-col items-center gap-10 text-center">
      <div className="flex w-full flex-col items-center gap-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/80 text-3xl text-anchor-primary shadow-soft">
          ⚓
        </div>
        <h2 className="text-2xl font-semibold text-anchor-deep sm:text-3xl">
          Let&apos;s get you anchored.
        </h2>
        <p className="mx-auto max-w-md text-base text-anchor-muted">
          How much time do you have, Sally?
        </p>
        <p className="mx-auto max-w-xl text-sm text-anchor-muted">
          Choose the pace that feels right for this moment.
        </p>
      </div>
      <div className="w-full max-w-xl space-y-4">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            className={`${buttonBase} ${
              selected === option.id
                ? 'border-anchor-primary bg-[#F1F6FD] text-anchor-deep shadow-soft'
                : 'text-anchor-deep/90'
            }`}
            onClick={() => setSelected(option.id)}
          >
            <div className="flex flex-col items-start gap-1 text-left">
              <span className="text-lg font-semibold uppercase tracking-[0.3em] text-anchor-primary">
                {option.label}
              </span>
              <span className="text-sm text-anchor-muted">
                {option.description}
              </span>
            </div>
          </button>
        ))}
      </div>
      <Link
        to="/"
        className="text-xs font-semibold tracking-[0.3em] text-anchor-muted transition-colors duration-200 hover:text-anchor-deep"
      >
        go back
      </Link>
    </section>
  )
}

export default CalmSession
