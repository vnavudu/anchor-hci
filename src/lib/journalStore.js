// Minimal in-memory journal store with sample entries for demo/testing
const today = new Date()

function startOfDay(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate())
}

function daysAgo(n) {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return startOfDay(d)
}

// Types: 'short' = grounding, 'medium' = breathing, 'long' = journaling
const sampleEntries = [
  { id: 1, date: daysAgo(0).toISOString(), type: 'long', title: 'Woke up grateful', attachments: [] },
  { id: 2, date: daysAgo(1).toISOString(), type: 'medium', title: 'Box breath', attachments: [] },
  { id: 3, date: daysAgo(2).toISOString(), type: 'short', title: 'Butterfly Hugs', attachments: [] },
  { id: 4, date: daysAgo(3).toISOString(), type: 'long', title: 'Evening journal', attachments: [] },
  { id: 5, date: daysAgo(4).toISOString(), type: 'long', title: 'Check-in', attachments: [] },
  { id: 6, date: daysAgo(6).toISOString(), type: 'short', title: 'Progressive release', attachments: [] },
  { id: 7, date: daysAgo(7).toISOString(), type: 'medium', title: 'Wave breath', attachments: [] },
  { id: 8, date: daysAgo(9).toISOString(), type: 'long', title: 'Gratitude', attachments: [] },
]

// load from localStorage if available
const STORAGE_KEY = 'anchor:journal'
let entries = (() => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) {
    // ignore
  }
  return sampleEntries.slice()
})()

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
  } catch (e) {
    // ignore
  }
}

export function getEntries() {
  // return a copy
  return entries.slice()
}

export function addEntry({ date = new Date(), type = 'long', title = '', attachments = [] }) {
  const id = entries.length ? Math.max(...entries.map((e) => e.id)) + 1 : 1
  const item = { id, date: startOfDay(new Date(date)).toISOString(), type, title, attachments }
  entries = [item, ...entries]
  persist()
  return item
}

export function clearEntries() {
  entries = []
  persist()
}

export default { getEntries, addEntry, clearEntries }
