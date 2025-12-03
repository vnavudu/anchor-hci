import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
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
              <div className={`flex h-10 items-center justify-center rounded-2xl shadow-soft ${c.hasEntry ? 'bg-anchor-primary/85 text-white' : 'bg-white/90 text-anchor-deep'}`}>
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
      <div className="flex items-center justify-between rounded-[2rem] bg-white/70 px-5 py-4 shadow-soft">
        <h2 className="text-2xl font-semibold text-anchor-deep">Profile</h2>
        <div className="rounded-full bg-anchor-background/80 px-4 py-2 text-sm font-semibold text-anchor-deep">Sally Smith</div>
      </div>

      <section className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-[2rem] border border-white/60 bg-white/85 p-6 shadow-soft">
          <div className="text-sm text-anchor-muted">This month</div>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="w-full rounded-2xl bg-anchor-background/70 px-4 py-4 text-center shadow-soft">
              <div className="text-xs text-anchor-muted">Grounding</div>
              <div className="text-lg font-semibold text-anchor-deep">{byType.short}</div>
            </div>
            <div className="w-full rounded-2xl bg-anchor-background/70 px-4 py-4 text-center shadow-soft">
              <div className="text-xs text-anchor-muted">Breathing</div>
              <div className="text-lg font-semibold text-anchor-deep">{byType.medium}</div>
            </div>
            <div className="w-full rounded-2xl bg-anchor-background/70 px-4 py-4 text-center shadow-soft">
              <div className="text-xs text-anchor-muted">Journaling</div>
              <div className="text-lg font-semibold text-anchor-deep">{byType.long}</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center rounded-[2rem] border border-white/60 bg-white/85 p-6 shadow-soft">
          <div className="text-sm text-anchor-muted">Journaling streak</div>
          <div className="mt-3 rounded-2xl bg-anchor-background/70 px-4 py-3 text-2xl font-semibold text-anchor-deep shadow-soft">{streak} days</div>
        </div>
      </section>

      <section className="mt-6 rounded-[2.25rem] border border-white/60 bg-white/90 p-6 shadow-soft">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="text-sm text-anchor-muted">Journaling Timeline</div>
            <div className="text-xs text-anchor-deep">{viewDate.toLocaleString(undefined, { month: 'long', year: 'numeric' })}</div>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setMonthOffset((m) => m - 1)} className="rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-anchor-deep shadow-soft transition-colors duration-200 hover:bg-[#EAF1F8]">Prev</button>
            <button onClick={() => setMonthOffset((m) => m + 1)} className="rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-anchor-deep shadow-soft transition-colors duration-200 hover:bg-[#EAF1F8]">Next</button>
          </div>
        </div>

        <div className="mt-4">
          <MonthCalendar entries={entries} year={viewDate.getFullYear()} month={viewDate.getMonth()} />
        </div>
      </section>

      <section className="mt-6 rounded-[2.25rem] border border-white/60 bg-white/90 p-6 shadow-soft">
        <div className="text-sm text-anchor-muted">Recent entries</div>
        <ul className="mt-4 space-y-3">
          {entries.slice(0, 8).map((e) => (
            <li key={e.id} className="rounded-2xl bg-white/80 px-4 py-3 shadow-soft">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-anchor-deep">{e.title}</div>
                  <div className="text-xs text-anchor-muted">{new Date(e.date).toDateString()} • {e.type}</div>
                  <div className="mt-2 flex gap-2">
                    {(e.attachments || []).map((a, i) => {
                      if (a.type === 'image') return <img key={i} src={a.data} className="h-12 w-12 rounded-2xl object-cover shadow-soft" />
                      if (a.type === 'audio') return <audio key={i} src={a.data} controls className="h-12 rounded-2xl bg-white/80 px-2" />
                      return null
                    })}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-8 flex justify-center">
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-full border border-anchor-primary/35 bg-white/95 px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-anchor-primary shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-anchor-primary hover:text-white"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}

export default Profile
