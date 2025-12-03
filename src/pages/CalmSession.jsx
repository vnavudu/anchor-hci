import { useEffect, useState, useId } from 'react'
import { Link } from 'react-router-dom'

const sessionOptions = [
  {
    id: 'short',
    label: 'short',
    description: '2-3 minutes · discreet grounding practices.',
  },
  {
    id: 'medium',
    label: 'medium',
    description: '5 minutes · breathwork and body resets.',
  },
  {
    id: 'long',
    label: 'long',
    description: '10 minutes · deeper visualization and reflection.',
  },
]

const exerciseLibrary = {
  short: [
    {
      title: 'Butterfly Hugs',
      icon: '🦋',
      duration: '10 seconds, repeat 3x',
      totalDurationSeconds: 60,
      cycles: 3,
      cadenceSeconds: 5,
      animation: 'pulse',
      description:
        'Cross your arms over your chest and tap alternately to self-soothe.',
      steps: [
        'Rest each hand on the opposite upper arm or shoulder.',
        'Tap left then right in a gentle, steady rhythm.',
        'Match the taps to a slow inhale and exhale.',
      ],
      tip: 'This bilateral stimulation technique is used in trauma therapy to calm the nervous system.',
    },
    {
      title: 'Progressive Release',
      icon: '🤲',
      duration: '90 seconds',
      totalDurationSeconds: 90,
      cadenceSeconds: 10,
      animation: 'body',
      description:
        'Discreetly squeeze and relax muscle groups to melt tension.',
      steps: [
        'Start with hands: squeeze fists gently for 5 seconds, release for 5.',
        'Move to shoulders, then jaw, relaxing after each squeeze.',
        'End with a long exhale and notice softened muscles.',
      ],
      tip: 'Progressive muscle relaxation is clinically shown to lower heart rate and anxiety.',
    },
    {
      title: 'Triangle Breathing',
      icon: '🔺',
      duration: '2 minutes',
      totalDurationSeconds: 120,
      cycles: 4,
      cadenceSeconds: 4,
      animation: 'triangle',
      description: 'Trace an imaginary triangle with your breath.',
      steps: [
        'Inhale for 4 counts while tracing up one side.',
        'Hold gently for 4 counts along the top.',
        'Exhale for 4 counts down the third side.',
      ],
      tip: 'Visual shapes give your mind a simple anchor when panic hits.',
    },
    {
      title: '5-4-3-2-1 Grounding',
      icon: '🌍',
      duration: '2 minutes',
      totalDurationSeconds: 150,
      cadenceSeconds: 8,
      animation: 'ground',
      description: 'Name your senses to return to the present.',
      steps: [
        'Silently list 5 things you can see.',
        'List 4 things you can feel and 3 you can hear.',
        'Name 2 scents and 1 thing you can taste or wish to taste.',
      ],
      tip: 'Common in CBT, this exercise quickly orients you to safety.',
    },
    {
      title: 'Calm Visualization',
      icon: '🌊',
      duration: '2 minutes',
      totalDurationSeconds: 120,
      cadenceSeconds: 10,
      animation: 'wave',
      description: 'Picture a place where your body feels weightless.',
      steps: [
        'Close your eyes and imagine floating in warm, gentle water.',
        'Notice colors, temperature, and any soothing sounds.',
        'Pair each breath with a wave gliding underneath you.',
      ],
      tip: 'Imagery taps into the same neural pathways as real experiences.',
    },
    {
      title: 'Mantra Breathing',
      icon: '🧘‍♀️',
      duration: '90 seconds',
      totalDurationSeconds: 90,
      cycles: 2,
      cadenceSeconds: 5,
      animation: 'breathe',
      description:
        'Pair words with inhales and exhales without changing your breath.',
      steps: [
        'Quietly repeat “breathing in calm” on the in-breath.',
        'Whisper “breathing out worry” on the out-breath.',
        'Continue for 6–8 natural breaths.',
      ],
      tip: 'Mantras keep your prefrontal cortex online, slowing panic spirals.',
    },
    {
      title: 'Autogenic Affirmations',
      icon: '💬',
      duration: '2 minutes',
      totalDurationSeconds: 120,
      cadenceSeconds: 6,
      animation: 'glow',
      description:
        'Mentally repeat warm statements to influence your body state.',
      steps: [
        'Place a hand on your abdomen.',
        'Repeat: “My breath is steady. My body is heavy and safe.”',
        'Let the words sync with your natural rhythm.',
      ],
      tip: 'Autogenic training is widely used in clinical relaxation protocols.',
    },
  ],
  medium: [
    {
      title: 'Wave Breath Ladder',
      icon: '🌫️',
      duration: '5 minutes',
      totalDurationSeconds: 300,
      cycles: 6,
      cadenceSeconds: 5,
      animation: 'wave',
      description: 'Lengthen your exhale to signal your vagus nerve to relax.',
      steps: [
        'Inhale for 4 counts, exhale for 6 counts.',
        'Repeat for 6 rounds, imagining a wave rolling in and out.',
        'On each exhale, picture stress leaving through your fingertips.',
      ],
      tip: 'Longer exhales activate the parasympathetic “rest” response.',
    },
    {
      title: 'Body Scan Reset',
      icon: '🧠',
      duration: '5 minutes',
      totalDurationSeconds: 300,
      cycles: 2,
      cadenceSeconds: 12,
      animation: 'body',
      description:
        'Mentally scan from toes to scalp, pausing wherever tension sits.',
      steps: [
        'Breathe into your feet and imagine warmth spreading upward.',
        'Pause at each area, silently labeling tight vs. soft.',
        'On each exhale, imagine tension melting downward like wax.',
      ],
      tip: 'Mindfulness-based body scans reduce rumination and cortisol.',
    },
    {
      title: 'Mini Compassion Letter',
      icon: '💌',
      duration: '5 minutes',
      totalDurationSeconds: 300,
      cadenceSeconds: 15,
      animation: 'writing',
      description: 'Write a 4-sentence note to yourself with kindness.',
      steps: [
        'Sentence 1: Describe what happened factually.',
        'Sentence 2: Validate how you feel (“Anyone would feel…”).',
        'Sentence 3: Offer kindness, and Sentence 4: State one gentle next step.',
      ],
      tip: 'Self-compassion practices build resilience and emotional regulation.',
    },
  ],
  long: [
    {
      title: 'Haven Visual Journey',
      icon: '🏝️',
      duration: '10 minutes',
      totalDurationSeconds: 600,
      cadenceSeconds: 20,
      animation: 'horizon',
      description: 'Create a detailed mental safe space.',
      steps: [
        'Close your eyes and imagine a sanctuary (beach, forest, favorite room).',
        'Engage all five senses, lingering on textures and scents.',
        'Imagine future-you arriving there feeling rested and proud.',
      ],
      tip: 'Guided imagery rewires stress associations with calming cues.',
    },
    {
      title: 'Express & Release',
      icon: '📝',
      duration: '10 minutes',
      totalDurationSeconds: 600,
      cadenceSeconds: 15,
      animation: 'writing',
      description:
        'Free-write everything on your mind, then read it with compassion.',
      steps: [
        'Write without editing for 5 minutes.',
        'Underline one fear and reframe it as a possibility.',
        'Close by writing one sentence of gratitude toward yourself.',
      ],
      tip: 'Expressive writing lowers intrusive thoughts and improves mood.',
    },
    {
      title: 'Loving-Kindness Flow',
      icon: '💗',
      duration: '10 minutes',
      totalDurationSeconds: 600,
      cycles: 3,
      cadenceSeconds: 10,
      animation: 'heart',
      description: 'Send compassion to yourself and others to widen calm.',
      steps: [
        'Inhale “May I feel safe.” Exhale “May I feel peaceful.”',
        'Repeat for someone you care about, then for a neutral person.',
        'Close by returning to yourself with the same phrases.',
      ],
      tip: 'Loving-kindness meditations are linked to reduced anxiety and increased joy.',
    },
  ],
}

const CalmSession = () => {
  const [selected, setSelected] = useState(null)
  const [exercise, setExercise] = useState(null)
  const [phase, setPhase] = useState('choose')
  const [mode, setMode] = useState('guided')
  const [sessionDuration, setSessionDuration] = useState(0)
  const [sessionTimeLeft, setSessionTimeLeft] = useState(0)
  const [feedbackMessage, setFeedbackMessage] = useState('')

  const handleSelect = (optionId) => {
    setSelected(optionId)
    const exercises = exerciseLibrary[optionId] ?? []
    if (exercises.length) {
      const randomExercise =
        exercises[Math.floor(Math.random() * exercises.length)]
      const duration =
        randomExercise.totalDurationSeconds ??
        Math.max(randomExercise.steps.length * 20, 60)
      setExercise({ ...randomExercise, category: optionId })
      setMode('guided')
      setPhase('prepare')
      setSessionDuration(duration)
      setSessionTimeLeft(duration)
      setFeedbackMessage('')
    }
  }

  const animationCadence = exercise?.cadenceSeconds ?? 8
  const isGuidedMode = mode === 'guided'

  const handleModeChange = (value) => {
    if (!exercise) return
    setMode(value)
    setPhase(value === 'guided' ? 'prepare' : 'manual')
    setSessionTimeLeft(sessionDuration)
    setFeedbackMessage('')
  }

  const handleStartGuided = () => {
    if (!exercise) return
    setPhase('guide')
    setSessionTimeLeft(sessionDuration)
    setFeedbackMessage('')
  }

  const handleManualComplete = () => {
    setPhase('reflect')
  }

  const handleChangeSession = () => {
    setExercise(null)
    setPhase('choose')
    setMode('guided')
    setSessionTimeLeft(0)
    setSessionDuration(0)
    setFeedbackMessage('')
  }

  const handleRestartExercise = () => {
    if (!exercise) return
    setPhase(mode === 'guided' ? 'prepare' : 'manual')
    setSessionTimeLeft(sessionDuration)
    setFeedbackMessage('')
  }

  useEffect(() => {
    if (phase !== 'guide' || !sessionDuration) return undefined
    setSessionTimeLeft(sessionDuration)
    const interval = setInterval(() => {
      setSessionTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          setPhase('reflect')
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [phase, sessionDuration])

  const buttonBase =
    'w-full rounded-full bg-white/95 px-12 py-7 text-center text-lg font-semibold tracking-[0.25em] shadow-soft transition-all duration-300 ease-smooth hover:-translate-y-1 hover:bg-[#DDE7F5]'
  const pairedActionButton =
    'flex-1 rounded-[2rem] border border-anchor-muted/30 bg-white/92 px-6 py-4 text-sm font-semibold uppercase tracking-[0.28em] text-anchor-deep shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-anchor-primary hover:text-white'
  const pillToggleBase =
    'flex-1 rounded-full border border-anchor-muted/25 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] transition-all duration-200'

  return (
    <section className="flex w-full flex-col items-center gap-14 text-center">
      <div className="flex w-full flex-col items-center gap-6">
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white text-4xl text-anchor-primary shadow-soft">
          ⚓
          <div className="absolute inset-0 -z-10 rounded-full bg-[#9BBEF8]/30 blur-2xl" />
        </div>
        <h2 className="text-2xl font-semibold text-anchor-deep sm:text-3xl">
          {phase === 'choose'
            ? "Let's get you anchored."
            : `Ready for your ${exercise?.category ?? ''} session.`}
        </h2>
        {phase === 'choose' ? (
          <>
            <p className="mx-auto max-w-md text-base text-anchor-muted">
              How much time do you have, Sally?
            </p>
            <p className="mx-auto max-w-xl text-sm text-anchor-muted">
              Choose the pace that feels right for this moment.
            </p>
          </>
        ) : (
          <p className="mx-auto max-w-xl text-sm text-anchor-muted">
            Switch modes or start when you&apos;re ready. You can always return
            home.
          </p>
        )}
      </div>

      {phase === 'choose' && (
        <div className="w-full max-w-xl space-y-4">
          {sessionOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              className={`${buttonBase} ${
                selected === option.id
                  ? 'border-anchor-primary bg-[#F1F6FD] text-anchor-deep shadow-soft'
                  : 'text-anchor-deep/90'
              }`}
              onClick={() => handleSelect(option.id)}
            >
              <div className="flex flex-col items-center gap-1 text-center">
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
      )}

      {exercise && phase !== 'choose' && (
        <div className="w-full max-w-3xl animate-fade-in-up rounded-[3.5rem] bg-transparent p-6 text-left">
          <div className="flex flex-col gap-5 pb-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF1F8] text-3xl shadow-soft">
                {exercise.icon}
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.35em] text-anchor-muted">
                  {exercise.category} session
                </p>
                <h3 className="text-2xl font-semibold text-anchor-deep">
                  {exercise.title}
                </h3>
                <p className="text-sm text-anchor-muted">{exercise.duration}</p>
              </div>
            </div>
            <div className="flex flex-col items-end gap-3 text-right">
              <span className="rounded-full bg-[#D7E4F3] px-5 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-anchor-primary shadow-soft">
                {mode} mode
              </span>
              <button
                type="button"
                className="text-xs font-semibold uppercase tracking-[0.3em] text-anchor-muted transition-colors duration-200 hover:text-anchor-deep"
                onClick={handleChangeSession}
              >
                change session
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
            {['guided', 'manual'].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => handleModeChange(value)}
                className={`${pillToggleBase} ${
                  mode === value
                    ? 'bg-anchor-primary text-white shadow-soft'
                    : 'bg-white/90 text-anchor-deep'
                } hover:bg-[#003B8E] hover:text-white`}
                aria-pressed={mode === value}
              >
                {value} mode
              </button>
            ))}
          </div>

          {(phase === 'prepare' || phase === 'manual') && (
            <div className="mt-8 space-y-6 rounded-[3rem] bg-white/70 p-6 shadow-soft backdrop-blur-sm">
              <p className="text-base text-anchor-muted">
                {exercise.description}
              </p>
              {isGuidedMode ? (
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="flex flex-col items-center justify-center gap-4 rounded-[3rem] bg-[#F7FAFF] p-6 shadow-soft">
                    <ExerciseAnimation
                      type={exercise.animation}
                      duration={(animationCadence || 8) + 2}
                    />
                    <p className="text-center text-sm text-anchor-muted">
                      Preview how the guided pace will feel. Tap start when you
                      are ready.
                    </p>
                  </div>
                  <InstructionPill
                    steps={exercise.steps}
                    tip={exercise.tip}
                    label="Full instructions"
                  />
                </div>
              ) : (
                <InstructionPill
                  steps={exercise.steps}
                  tip={exercise.tip}
                  label="Manual instructions"
                />
              )}
              {isGuidedMode ? (
                <div className="flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={handleStartGuided}
                    className="flex-1 rounded-[999px] bg-anchor-primary px-10 py-5 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-soft transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#003B8E]"
                  >
                    Start guided session
                  </button>
                  <button
                    type="button"
                    onClick={() => handleModeChange('manual')}
                    className="flex-1 rounded-[999px] bg-white/92 px-10 py-5 text-sm font-semibold uppercase tracking-[0.2em] text-anchor-muted shadow-soft transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#EEF2F8]"
                  >
                    I&apos;ll do this manually
                  </button>
                </div>
              ) : (
                <div className="flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={handleManualComplete}
                    className="flex-1 rounded-[999px] border border-anchor-muted/30 bg-white/95 px-10 py-5 text-sm font-semibold uppercase tracking-[0.2em] text-anchor-deep shadow-soft transition-transform transition-colors duration-200 hover:-translate-y-0.5 hover:bg-[#003B8E] hover:text-white"
                  >
                    I followed the steps
                  </button>
                  <button
                    type="button"
                    onClick={() => handleModeChange('guided')}
                    className="flex-1 rounded-[999px] border border-anchor-muted/30 bg-white/95 px-10 py-5 text-sm font-semibold uppercase tracking-[0.2em] text-anchor-deep shadow-soft transition-transform transition-colors duration-200 hover:-translate-y-0.5 hover:bg-[#003B8E] hover:text-white"
                  >
                    Switch to guided run
                  </button>
                </div>
              )}
            </div>
          )}

          {phase === 'guide' && (
            <div className="mt-6 space-y-6">
              <div className="flex flex-col gap-4 rounded-[2.75rem] border border-anchor-muted/15 bg-[#F7FAFF] p-6 text-anchor-deep shadow-soft sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-anchor-muted">
                    Guided pacing
                  </p>
                  <p className="mt-2 text-lg font-semibold text-anchor-deep">
                    Time remaining: {formatTime(sessionTimeLeft)}
                  </p>
                  <p className="text-sm text-anchor-muted">
                    Total session: {formatTime(sessionDuration)}
                  </p>
                </div>
                <div className="w-full max-w-[200px]">
                  <div className="h-2 w-full overflow-hidden rounded-full bg-[#EAF1F8]">
                    <div
                      className="h-full rounded-full bg-anchor-primary transition-all duration-700 ease-smooth"
                      style={{
                        width: `${
                          sessionDuration
                            ? ((sessionDuration - sessionTimeLeft) /
                                sessionDuration) *
                              100
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
                <div className="flex flex-col items-center justify-center rounded-[3rem] bg-white/94 p-6 shadow-soft">
                  <ExerciseAnimation
                    type={exercise.animation}
                    duration={(animationCadence || 8) + 2}
                  />
                  <p className="mt-4 text-center text-sm text-anchor-muted">
                    Stay with the visual as it guides your rhythm.
                  </p>
                </div>
                <div className="rounded-[3.25rem] bg-[#F7FAFF] p-7 shadow-soft">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-anchor-muted">
                    Full instructions
                  </p>
                  <InstructionList steps={exercise.steps} />
                  <div className="mt-6 flex flex-wrap gap-4">
                    <button
                      type="button"
                      onClick={handleManualComplete}
                      className="flex-1 rounded-full border border-anchor-muted/25 bg-white/95 px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-anchor-deep shadow-soft transition-colors duration-200 hover:bg-[#003B8E] hover:text-white"
                    >
                      finish early
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPhase('prepare')
                        setSessionTimeLeft(sessionDuration)
                      }}
                      className="flex-1 rounded-full border border-anchor-muted/25 bg-white/95 px-6 py-3 text-xs font-semibold uppercase tracking-[0.25em] text-anchor-deep shadow-soft transition-colors duration-200 hover:bg-[#003B8E] hover:text-white"
                    >
                      pause &amp; view steps
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {phase === 'reflect' && (
            <div className="mt-6 space-y-5">
              <div className="rounded-[2.5rem] border border-anchor-muted/20 bg-[#F7FAFF] p-6 text-anchor-deep shadow-[0_18px_40px_-28px_rgba(0,71,171,0.28)]">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-anchor-muted">
                  Nice work
                </p>
                <p className="mt-2 text-xl">
                  Did this exercise feel supportive for you today?
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  className={pairedActionButton}
                  onClick={() =>
                    setFeedbackMessage(
                      "Thanks! We'll remember you loved this vibe for future sessions.",
                    )
                  }
                >
                  yes, loved it
                </button>
                <button
                  type="button"
                  className={pairedActionButton}
                  onClick={() =>
                    setFeedbackMessage(
                      "Thanks for sharing. We'll keep tuning recommendations for you.",
                    )
                  }
                >
                  not really
                </button>
              </div>
              {feedbackMessage && (
                <p className="rounded-[2rem] bg-[#EAF1F8] px-6 py-3 text-sm text-anchor-deep">
                  {feedbackMessage}
                </p>
              )}
              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={handleRestartExercise}
                  className="flex-1 rounded-[2rem] border border-anchor-muted/30 bg-white/95 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-anchor-deep shadow-soft transition-colors duration-200 hover:bg-anchor-primary hover:text-white"
                >
                  replay instructions
                </button>
                <button
                  type="button"
                  onClick={() => exercise && handleSelect(exercise.category)}
                  className="flex-1 rounded-[2rem] border border-anchor-muted/30 bg-white/95 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-anchor-deep shadow-soft transition-colors duration-200 hover:bg-anchor-primary hover:text-white"
                >
                  try another {exercise.category} exercise
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      <Link
        to="/"
        className="mt-6 inline-flex items-center justify-center rounded-full border border-anchor-primary/35 bg-white/95 px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-anchor-primary shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-anchor-primary hover:text-white"
      >
        return home
      </Link>
    </section>
  )
}

const formatTime = (seconds) => {
  if (!seconds && seconds !== 0) return '0:00'
  const clamped = Math.max(0, Math.round(seconds))
  const mins = Math.floor(clamped / 60)
  const secs = String(clamped % 60).padStart(2, '0')
  return `${mins}:${secs}`
}

const InstructionList = ({ steps }) => (
  <ul className="mt-4 space-y-3">
    {steps.map((step) => (
      <li key={step} className="flex gap-3 text-sm">
        <span className="mt-1 h-2 w-2 rounded-full bg-anchor-primary/60" />
        <span className="text-anchor-deep">{step}</span>
      </li>
    ))}
  </ul>
)

const InstructionPill = ({ steps, tip, label }) => (
  <div className="rounded-[3rem] bg-white/92 p-6 shadow-soft">
    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-anchor-muted">
      {label}
    </p>
    <div className="mt-4 rounded-[2.5rem] bg-white p-6 text-left shadow-soft">
      <InstructionList steps={steps} />
      {tip && (
        <p className="mt-4 text-xs text-anchor-muted">Why it helps: {tip}</p>
      )}
    </div>
  </div>
)

const ExerciseAnimation = ({ type, duration = 8 }) => {
  const safeDuration = Math.max(duration, 6)
  switch (type) {
    case 'triangle':
      return <TriangleAnimation duration={safeDuration} />
    case 'wave':
      return <WaveAnimation duration={safeDuration} />
    case 'breathe':
      return <BreatheAnimation duration={safeDuration} />
    case 'ground':
      return <GroundAnimation duration={safeDuration} />
    case 'body':
      return <BodyAnimation duration={safeDuration} />
    case 'writing':
      return <WritingAnimation duration={safeDuration} />
    case 'glow':
      return <GlowAnimation duration={safeDuration} />
    case 'heart':
      return <HeartAnimation duration={safeDuration} />
    case 'horizon':
      return <HorizonAnimation duration={safeDuration} />
    case 'pulse':
    default:
      return <PulseAnimation duration={safeDuration} />
  }
}

const TriangleAnimation = ({ duration }) => {
  const id = useId()
  const pathId = `${id}-triangle-path`
  return (
    <svg viewBox="0 0 180 160" className="h-32 w-32 text-anchor-primary">
      <defs>
        <path id={pathId} d="M90 15 L165 145 L15 145 Z" />
      </defs>
      <polygon
        points="90,15 165,145 15,145"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeDasharray="12 8"
        strokeLinecap="round"
        opacity="0.8"
      />
      <circle r="8" fill="currentColor">
        <animateMotion dur={`${duration}s`} repeatCount="indefinite">
          <mpath href={`#${pathId}`} />
        </animateMotion>
      </circle>
    </svg>
  )
}

const WaveAnimation = ({ duration }) => {
  const id = useId()
  const pathId = `${id}-wave-path`
  return (
    <svg viewBox="0 0 220 110" className="h-28 w-full text-anchor-primary">
      <defs>
        <path
          id={pathId}
          d="M0 70 Q 27.5 20 55 70 T 110 70 T 165 70 T 220 70"
        />
      </defs>
      <use
        href={`#${pathId}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeDasharray="14 10"
        strokeLinecap="round"
        opacity="0.7"
      />
      <circle r="7" fill="currentColor">
        <animateMotion dur={`${duration}s`} repeatCount="indefinite">
          <mpath href={`#${pathId}`} />
        </animateMotion>
      </circle>
    </svg>
  )
}

const PulseAnimation = ({ duration }) => (
  <svg viewBox="0 0 140 140" className="h-28 w-28 text-anchor-primary">
    <circle cx="70" cy="70" r="15" fill="currentColor" opacity="0.3">
      <animate
        attributeName="r"
        values="15;60;15"
        dur={`${duration}s`}
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        values="0.4;0;0.4"
        dur={`${duration}s`}
        repeatCount="indefinite"
      />
    </circle>
    <circle cx="70" cy="70" r="12" fill="currentColor" opacity="0.6">
      <animate
        attributeName="r"
        values="12;35;12"
        dur={`${duration / 1.4}s`}
        repeatCount="indefinite"
      />
      <animate
        attributeName="opacity"
        values="1;0.3;1"
        dur={`${duration / 1.4}s`}
        repeatCount="indefinite"
      />
    </circle>
    <circle cx="70" cy="70" r="6" fill="currentColor" />
  </svg>
)

const BreatheAnimation = ({ duration }) => (
  <svg viewBox="0 0 180 120" className="h-28 w-40 text-anchor-primary">
    <ellipse
      cx="60"
      cy="60"
      rx="20"
      ry="35"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      opacity="0.4"
    >
      <animate
        attributeName="rx"
        values="20;32;20"
        dur={`${duration}s`}
        repeatCount="indefinite"
      />
      <animate
        attributeName="ry"
        values="35;20;35"
        dur={`${duration}s`}
        repeatCount="indefinite"
      />
    </ellipse>
    <ellipse
      cx="120"
      cy="60"
      rx="32"
      ry="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      opacity="0.4"
    >
      <animate
        attributeName="rx"
        values="32;20;32"
        dur={`${duration}s`}
        repeatCount="indefinite"
      />
      <animate
        attributeName="ry"
        values="20;35;20"
        dur={`${duration}s`}
        repeatCount="indefinite"
      />
    </ellipse>
    <circle cx="60" cy="60" r="6" fill="currentColor" />
    <circle cx="120" cy="60" r="6" fill="currentColor" />
  </svg>
)

const GroundAnimation = ({ duration }) => (
  <svg viewBox="0 0 160 120" className="h-28 w-40 text-anchor-primary">
    {[0, 1, 2, 3, 4].map((index) => (
      <rect
        key={index}
        x="10"
        y={15 + index * 20}
        width={140 - index * 20}
        height="12"
        rx="6"
        fill="currentColor"
        opacity="0.25"
      >
        <animate
          attributeName="opacity"
          values="0.2;0.9;0.2"
          begin={`${index * 0.3}s`}
          dur={`${Math.max(duration / 2, 3)}s`}
          repeatCount="indefinite"
        />
      </rect>
    ))}
  </svg>
)

const BodyAnimation = ({ duration }) => (
  <svg viewBox="0 0 120 180" className="h-32 w-24 text-anchor-primary">
    {[0, 1, 2, 3, 4].map((part) => (
      <rect
        key={part}
        x="40"
        y={20 + part * 30}
        width="40"
        height="20"
        rx="10"
        fill="currentColor"
        opacity="0.25"
      >
        <animate
          attributeName="opacity"
          values="0.3;1;0.3"
          begin={`${part * 0.2}s`}
          dur={`${Math.max(duration / 1.5, 4)}s`}
          repeatCount="indefinite"
        />
      </rect>
    ))}
    <circle cx="60" cy="165" r="12" fill="currentColor" opacity="0.25">
      <animate
        attributeName="opacity"
        values="0.2;0.8;0.2"
        dur={`${Math.max(duration / 2, 4)}s`}
        repeatCount="indefinite"
      />
    </circle>
  </svg>
)

const WritingAnimation = ({ duration }) => (
  <svg viewBox="0 0 220 120" className="h-28 w-full text-anchor-primary">
    {[0, 1, 2].map((line) => (
      <line
        key={line}
        x1="10"
        y1={30 + line * 30}
        x2="210"
        y2={30 + line * 30}
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="200"
        strokeDashoffset="200"
        opacity="0.4"
      >
        <animate
          attributeName="stroke-dashoffset"
          values="200;0"
          begin={`${line * 0.4}s`}
          dur={`${Math.max(duration / 2, 4)}s`}
          repeatCount="indefinite"
        />
      </line>
    ))}
    <circle cx="30" cy="95" r="6" fill="currentColor">
      <animate
        attributeName="cx"
        values="30;200;30"
        dur={`${Math.max(duration / 1.5, 4)}s`}
        repeatCount="indefinite"
      />
    </circle>
  </svg>
)

const GlowAnimation = ({ duration }) => {
  const id = useId()
  const gradientId = `${id}-glow`
  return (
    <svg viewBox="0 0 160 160" className="h-32 w-32 text-anchor-primary">
      <defs>
        <radialGradient id={gradientId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="80" cy="80" r="45" fill={`url(#${gradientId})`}>
        <animate
          attributeName="r"
          values="30;70;30"
          dur={`${duration}s`}
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="80" cy="80" r="12" fill="currentColor" opacity="0.5">
        <animate
          attributeName="opacity"
          values="0.4;0.9;0.4"
          dur={`${duration / 2}s`}
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  )
}

const HeartAnimation = ({ duration }) => (
  <svg viewBox="0 0 160 140" className="h-32 w-32 text-anchor-primary">
    <path
      d="M80 125 L25 70 C5 45 20 15 50 20 C65 22 75 35 80 45 C85 35 95 22 110 20 C140 15 155 45 135 70 Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      opacity="0.7"
    >
      <animateTransform
        attributeName="transform"
        type="scale"
        values="1;1.05;1"
        dur={`${Math.max(duration / 2, 4)}s`}
        repeatCount="indefinite"
        additive="sum"
      />
    </path>
    <circle cx="80" cy="85" r="10" fill="currentColor" opacity="0.5">
      <animate
        attributeName="r"
        values="10;16;10"
        dur={`${Math.max(duration / 2, 4)}s`}
        repeatCount="indefinite"
      />
    </circle>
  </svg>
)

const HorizonAnimation = ({ duration }) => (
  <svg viewBox="0 0 220 140" className="h-32 w-full text-anchor-primary">
    <rect
      x="0"
      y="80"
      width="220"
      height="40"
      fill="currentColor"
      opacity="0.2"
    />
    <circle cx="110" cy="100" r="22" fill="currentColor" opacity="0.3">
      <animate
        attributeName="cy"
        values="110;70;110"
        dur={`${Math.max(duration, 8)}s`}
        repeatCount="indefinite"
      />
    </circle>
    <line
      x1="0"
      y1="80"
      x2="220"
      y2="80"
      stroke="currentColor"
      strokeWidth="3"
      strokeDasharray="8 10"
      opacity="0.5"
    />
  </svg>
)

export default CalmSession
