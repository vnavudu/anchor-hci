import { useState } from 'react'
import { Link } from 'react-router-dom'

const Log = () => {
  const [entry, setEntry] = useState('')
  const [status, setStatus] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!entry.trim()) {
      setStatus('Take a breath and jot down even a sentence to begin.')
      return
    }

    setStatus('Saved. Your reflection is safe with us.')
    setEntry('')
  }

  return (
    <section className="flex w-full flex-col items-center gap-8 text-center">
      <div className="w-full max-w-2xl rounded-[3rem] border border-white/70 bg-white p-10 text-left shadow-soft backdrop-blur-sm transition-transform duration-300 ease-smooth hover:-translate-y-0.5">
        <header className="mb-6">
          <h2 className="text-2xl font-semibold text-anchor-deep sm:text-3xl">
            Create a Log.
          </h2>
          <p className="mt-2 text-sm text-anchor-muted">
            Capture a quick reflection. You can always come back to it later.
          </p>
        </header>
        <form onSubmit={handleSubmit} className="space-y-6">
          <textarea
            id="log-entry"
            name="log-entry"
            value={entry}
            onChange={(event) => {
              setEntry(event.target.value)
              setStatus('')
            }}
            placeholder="Write about what you noticed, felt, or want to remember from today..."
            className="min-h-[200px] w-full resize-none rounded-4xl border border-anchor-muted/20 bg-anchor-background/80 p-6 text-base text-anchor-deep outline-none transition-colors duration-200 focus:border-anchor-primary focus:bg-white"
          />
          <button
            type="submit"
            className="w-full rounded-[3rem] bg-anchor-primary px-10 py-5 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-soft transition-transform transition-colors duration-300 ease-smooth hover:-translate-y-1 hover:bg-[#003B8E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-anchor-primary/60"
          >
            Save Entry
          </button>
        </form>
        {status && <p className="mt-6 text-sm text-anchor-muted">{status}</p>}
        <div className="mt-8">
          <Link
            to="/"
            className="text-xs font-semibold uppercase tracking-[0.3em] text-anchor-muted transition-colors duration-200 hover:text-anchor-deep"
          >
            Go Back
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Log
