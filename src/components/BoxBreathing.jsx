import React, { useEffect, useState } from 'react'

// phases: array of seconds [5,4,3,2,1]
const BoxBreathing = ({ onClose, phases = [5, 4, 3, 2, 1] }) => {
  // each phase is inhale/hold/exhale of length phaseSec
  const phaseDurations = phases.map((s) => s * 3)
  const totalSeconds = phaseDurations.reduce((a, b) => a + b, 0)
  const totalMs = totalSeconds * 1000

  const [elapsedMs, setElapsedMs] = useState(0)

  useEffect(() => {
    const start = Date.now()
    const id = setInterval(() => {
      setElapsedMs((Date.now() - start) % totalMs)
    }, 100)
    return () => clearInterval(id)
  }, [totalMs])

  // determine current phase index and ms within that phase
  let acc = 0
  let phaseIndex = 0
  let msIntoPhase = 0
  for (let i = 0; i < phaseDurations.length; i++) {
    const durMs = phaseDurations[i] * 1000
    if (elapsedMs < acc + durMs) {
      phaseIndex = i
      msIntoPhase = elapsedMs - acc
      break
    }
    acc += durMs
  }

  const phaseSec = phases[phaseIndex]
  const withinSecond = (msIntoPhase % 1000) / 1000
  const secondIndex = Math.floor(msIntoPhase / 1000) // 0..(phaseSec*3 -1)

  // determine inhale/hold/exhale inside current phase
  const part = Math.floor(secondIndex / phaseSec) // 0: inhale,1:hold,2:exhale
  const secondWithinPart = secondIndex % phaseSec

  let phaseLabel = ''
  if (part === 0) phaseLabel = 'Breathe In'
  else if (part === 1) phaseLabel = 'Hold'
  else phaseLabel = 'Breathe Out'

  // Show remaining seconds for the current sub-phase (inhale/hold/exhale)
  // compute fractional seconds left in current part and round up so it shows e.g. 5,4,3...
  const fractionalLeft = phaseSec - (secondWithinPart + withinSecond)
  const secondsRemaining = Math.max(0, Math.ceil(fractionalLeft))

  const dotsCount = phaseSec

  const computeFill = (i) => {
    // similar behavior: inhale fills left->right, hold full, exhale unfill right->left
    if (part === 0) {
      if (i < secondWithinPart) return 1
      if (i === secondWithinPart) return withinSecond
      return 0
    }
    if (part === 1) {
      return 1
    }
    // exhale: unfill right-to-left
    const revIndex = dotsCount - 1 - i
    if (revIndex < secondWithinPart) return 0
    if (revIndex === secondWithinPart) return 1 - withinSecond
    return 1
  }

  const dots = Array.from({ length: dotsCount })

  return (
    <div className="flex w-full max-w-xl flex-col items-center gap-6">
      <div className="flex flex-col items-center gap-2">
        <div className="text-sm font-semibold uppercase tracking-wider text-anchor-primary">
          Box Breathing
        </div>
        <div className="text-base text-anchor-muted">Phase {phaseIndex + 1} of {phases.length} • {phaseSec}s</div>
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

export default BoxBreathing
