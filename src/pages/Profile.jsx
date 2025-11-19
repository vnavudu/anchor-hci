import React, { useMemo, useState } from 'react'
import { getEntries } from '../lib/journalStore'

function countByType(entries, year, month) {
  const start = new Date(year, month, 1)
  const end = new Date(year, month + 1, 1)
  const byType = { short: 0, medium: 0, long: 0 }
  entries.forEach((e) => {
    const d = new Date(e.date)
    if (d >= start && d < end) byType[e.type] = (byType[e.type] || 0) + 1
  })
  return byType
}

function currentStreak(entries) {
  // count consecutive days up to today with a 'long' entry
  const days = new Set(entries.map((e) => new Date(e.date).toDateString()))
  let streak = 0
  let d = new Date()
  while (days.has(d.toDateString())) {
    streak += 1
    d.setDate(d.getDate() - 1)
  }
  return streak
}

function MonthCalendar({ entries, year, month }) {
  // simple month grid marking days with long entries
  const firstDay = new Date(year, month, 1)
  const startWeekday = firstDay.getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const daySet = new Set(entries.map((e) => new Date(e.date).toDateString()))

  const cells = []
  for (let i = 0; i < startWeekday; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d)
    const hasEntry = daySet.has(date.toDateString())
    cells.push({ d, hasEntry })
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-7 gap-2 text-xs text-anchor-muted">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((h) => (
          <div key={h} className="text-center font-semibold">{h}</div>
        ))}
      </div>
      <div className="mt-2 grid grid-cols-7 gap-2">
        {cells.map((c, i) => (
          <div key={i} className="h-10">
            {!c ? null : (
              <div className={`flex h-10 items-center justify-center rounded ${c.hasEntry ? 'bg-anchor-primary/90 text-white' : 'bg-white/80 text-anchor-deep'}`}>
                {c.d}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

const Profile = () => {
  const entries = useMemo(() => getEntries(), [])
  const now = new Date()
  const [monthOffset, setMonthOffset] = useState(0)
  const viewDate = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1)

  const byType = useMemo(() => countByType(entries, viewDate.getFullYear(), viewDate.getMonth()), [entries, viewDate])
  const streak = useMemo(() => currentStreak(entries), [entries])

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Profile</h2>
        <div className="text-sm text-anchor-muted">You</div>
      </div>

      <section className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl bg-white/80 p-4">
          <div className="text-sm text-anchor-muted">This month</div>
          <div className="mt-3 flex gap-3">
            <div className="rounded p-3 text-center">
              <div className="text-xs text-anchor-muted">Grounding</div>
              <div className="text-lg font-semibold">{byType.short}</div>
            </div>
            <div className="rounded p-3 text-center">
              <div className="text-xs text-anchor-muted">Breathing</div>
              <div className="text-lg font-semibold">{byType.medium}</div>
            </div>
            <div className="rounded p-3 text-center">
              <div className="text-xs text-anchor-muted">Journaling</div>
              <div className="text-lg font-semibold">{byType.long}</div>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white/80 p-4">
          <div className="text-sm text-anchor-muted">Journaling streak</div>
          <div className="mt-3 text-2xl font-semibold">{streak} days</div>
        </div>
      </section>

      <section className="mt-6 rounded-xl bg-white/80 p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-anchor-muted">Journaling Timeline</div>
            <div className="text-xs text-anchor-deep">{viewDate.toLocaleString(undefined, { month: 'long', year: 'numeric' })}</div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setMonthOffset((m) => m - 1)} className="rounded bg-white/80 px-3 py-1">Prev</button>
            <button onClick={() => setMonthOffset((m) => m + 1)} className="rounded bg-white/80 px-3 py-1">Next</button>
          </div>
        </div>

        <div className="mt-4">
          <MonthCalendar entries={entries} year={viewDate.getFullYear()} month={viewDate.getMonth()} />
        </div>
      </section>

      <section className="mt-6 rounded-xl bg-white/80 p-4">
        <div className="text-sm text-anchor-muted">Recent entries</div>
        <ul className="mt-3 space-y-2">
          {entries.slice(0, 8).map((e) => (
            <li key={e.id} className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">{e.title}</div>
                <div className="text-xs text-anchor-muted">{new Date(e.date).toDateString()} • {e.type}</div>
                <div className="mt-2 flex gap-2">
                  {(e.attachments || []).map((a, i) => {
                    if (a.type === 'image') return <img key={i} src={a.data} className="h-12 w-12 rounded object-cover" />
                    if (a.type === 'audio') return <audio key={i} src={a.data} controls className="h-12" />
                    return null
                  })}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default Profile
