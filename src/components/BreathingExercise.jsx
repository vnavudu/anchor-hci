import React, { useEffect, useState } from 'react'

const BreathingExercise = ({ onClose }) => {
  const inhale = 5
  const hold = 5
  const exhale = 5
  const cycleSeconds = inhale + hold + exhale // 15
  const dotsCount = inhale // 5 dots representing seconds within a phase

  // track elapsed ms so we can animate within each second
  const [elapsedMs, setElapsedMs] = useState(0)

  useEffect(() => {
    const start = Date.now()
    const id = setInterval(() => {
      setElapsedMs((Date.now() - start) % (cycleSeconds * 1000))
    }, 100)
    return () => clearInterval(id)
  }, [])

  const totalMs = cycleSeconds * 1000
  const t = elapsedMs % totalMs
  const secondIndex = Math.floor(t / 1000) // 0..14
  const withinSecond = (t % 1000) / 1000 // 0..1

  let phaseLabel = 'Breathe'
  let secondsRemaining = 0

  if (secondIndex < inhale) {
    phaseLabel = 'Breathe In'
    secondsRemaining = inhale - secondIndex
  } else if (secondIndex < inhale + hold) {
    phaseLabel = 'Hold'
    secondsRemaining = inhale + hold - secondIndex
  } else {
    phaseLabel = 'Breathe Out'
    secondsRemaining = cycleSeconds - secondIndex
  }

  const phase = Math.floor(secondIndex / dotsCount) // 0: inhale, 1: hold, 2: exhale
  const phaseSecond = secondIndex % dotsCount // which of the 5 seconds within current phase

  const dots = Array.from({ length: dotsCount })

  const computeFill = (i) => {
    // return fraction 0..1 of how filled this dot should be
    if (phase === 0) {
      // inhale: dots fill left-to-right
      if (i < phaseSecond) return 1
      if (i === phaseSecond) return withinSecond
      return 0
    }
    if (phase === 1) {
      // hold: all full
      return 1
    }
    // exhale: dots unfill right-to-left (reverse order)
    const revIndex = dotsCount - 1 - i
    if (revIndex < phaseSecond) return 0
    if (revIndex === phaseSecond) return 1 - withinSecond
    return 1
  }

  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <div className="text-sm font-semibold uppercase tracking-wider text-anchor-primary">{phaseLabel}</div>
        <div className="text-2xl font-bold text-anchor-deep">{secondsRemaining}s</div>
      </div>

      <div className="flex w-full items-center justify-center gap-3 px-4">
        {dots.map((_, i) => {
          const frac = computeFill(i)
          const pct = Math.round(frac * 100)
          return (
            <div key={i} className="relative h-4 w-4 rounded-full bg-white/30 border border-white/30 overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full rounded-full bg-anchor-primary transition-[width] duration-100 ease-linear"
                style={{ width: `${pct}%` }}
              />
            </div>
          )
        })}
      </div>

      <div className="flex w-full items-center justify-center gap-4">
        <button
          type="button"
          onClick={onClose}
          className="rounded-full bg-white/80 px-6 py-2 text-sm font-semibold text-anchor-deep shadow-soft"
        >
          Stop
        </button>
      </div>
    </div>
  )
}

export default BreathingExercise
