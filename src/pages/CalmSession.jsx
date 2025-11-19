import { useEffect, useMemo, useState, useId } from 'react'
import { Link } from 'react-router-dom'
import BreathingExercise from '../components/BreathingExercise'

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

const MIN_STEP_SECONDS = 5

function ShortSelector({ onBack, onStart }) {
  const choices = [5, 4, 3]
  const [active, setActive] = useState(5)
  return (
    <div className="flex w-full flex-col items-center gap-6">
      <div className="flex w-full flex-col items-center gap-2">
        <h3 className="text-lg font-semibold text-anchor-deep">Choose pace</h3>
        <p className="text-sm text-anchor-muted">Pick how many seconds per phase</p>
      </div>

      <div className="flex gap-3">
        {choices.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              active === c
                ? 'bg-anchor-primary text-white'
                : 'bg-white/80 text-anchor-deep'
            }`}
          >
            {c}s
          </button>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => onStart(active)}
          className="rounded-full bg-anchor-primary px-6 py-2 text-sm font-semibold text-white shadow-soft"
        >
          Start
        </button>
        <button
          type="button"
          onClick={onBack}
          className="rounded-full bg-white/80 px-6 py-2 text-sm font-semibold text-anchor-deep shadow-soft"
        >
          Back
        </button>
      </div>
    </div>
  )
}

const CalmSession = () => {
  const [selected, setSelected] = useState(null)
  const buttonBase =
    'w-full rounded-[3rem] border border-white/60 bg-white px-8 py-6 text-center shadow-soft transition-all duration-300 ease-smooth focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-anchor-primary/35 hover:-translate-y-1 hover:bg-[#D7E4F3]'

  return (
    <section className="flex w-full flex-col items-center gap-10 text-center">
      <div className="flex w-full flex-col items-center gap-5">
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-white text-4xl text-anchor-primary shadow-soft">
          ⚓
          <div className="absolute inset-0 -z-10 rounded-full bg-[#9BBEF8]/30 blur-2xl" />
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
        {selected && typeof selected === 'object' && selected.mode === 'short' ? (
          <BreathingExercise
            phaseSeconds={selected.secs}
            onClose={() => setSelected(null)}
          />
        ) : selected === 'short' ? (
          <ShortSelector
            onBack={() => setSelected(null)}
            onStart={(secs) => setSelected({ mode: 'short', secs })}
          />
        ) : (
          sessionOptions.map((option) => (
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
              <div className="flex flex-col items-center gap-1 text-center">
                <span className="text-lg font-semibold uppercase tracking-[0.3em] text-anchor-primary">
                  {option.label}
                </span>
                <span className="text-sm text-anchor-muted">
                  {option.description}
                </span>
              </div>
            </button>
          ))
        )}
      </div>
      <Link
        to="/"
        className="text-xs font-semibold uppercase tracking-[0.35em] text-anchor-muted transition-colors duration-200 hover:text-anchor-deep"
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

export default CalmSession

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
