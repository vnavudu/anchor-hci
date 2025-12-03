import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { addEntry } from '../lib/journalStore'

const Log = () => {
  const [entry, setEntry] = useState('')
  const [status, setStatus] = useState('')
  const [images, setImages] = useState([])
  const [audioUrl, setAudioUrl] = useState(null)
  const mediaRecorderRef = useRef(null)
  const audioChunksRef = useRef([])

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!entry.trim()) {
      setStatus('Take a breath and jot down even a sentence to begin.')
      return
    }

    // prepare attachments array
    const attachments = []
    images.forEach((dataUrl) => attachments.push({ type: 'image', data: dataUrl }))
    if (audioUrl) attachments.push({ type: 'audio', data: audioUrl })

    addEntry({ date: new Date(), type: 'long', title: entry.split('\n')[0] || 'Journal', attachments })

    setStatus('Saved. Your reflection is safe with us.')
    setEntry('')
    setImages([])
    setAudioUrl(null)
  }

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files || [])
    if (!files.length) return
    const promises = files.map((f) => {
      return new Promise((res) => {
        const reader = new FileReader()
        reader.onload = () => res(reader.result)
        reader.readAsDataURL(f)
      })
    })
    const results = await Promise.all(promises)
    setImages((prev) => [...prev, ...results])
  }

  const startRecording = async () => {
    setStatus('Recording...')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mr = new MediaRecorder(stream)
      audioChunksRef.current = []
      mr.ondataavailable = (ev) => {
        if (ev.data && ev.data.size) audioChunksRef.current.push(ev.data)
      }
      mr.onstop = async () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        const reader = new FileReader()
        reader.onload = () => {
          setAudioUrl(reader.result)
          setStatus('Recording saved')
        }
        reader.readAsDataURL(blob)
      }
      mr.start()
      mediaRecorderRef.current = mr
    } catch (err) {
      setStatus('Unable to access microphone.')
    }
  }

  const stopRecording = () => {
    setStatus('Stopping...')
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      mediaRecorderRef.current = null
    }
  }

  return (
    <section className="flex w-full flex-col items-center gap-8 text-center">
      <div className="w-full max-w-2xl rounded-[3.5rem] border border-white/70 bg-white/95 p-10 text-left shadow-soft backdrop-blur-sm transition-transform duration-300 ease-smooth hover:-translate-y-0.5">
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
          <div className="flex flex-col gap-3">
            <label className="text-sm text-anchor-muted">Add images (optional)</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="max-w-md rounded-full border border-anchor-muted/25 bg-white/90 px-4 py-2 text-sm text-anchor-deep shadow-soft file:mr-4 file:rounded-full file:border-0 file:bg-anchor-primary/90 file:px-4 file:py-2 file:text-white file:font-semibold file:uppercase file:tracking-[0.2em] hover:file:bg-anchor-primary"
            />
            <div className="flex gap-2">
              {images.map((src, i) => (
                <img key={i} src={src} alt={`attachment-${i}`} className="h-16 w-16 rounded-2xl object-cover shadow-soft" />
              ))}
            </div>

            <label className="text-sm text-anchor-muted">Audio (optional)</label>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={startRecording}
                className="rounded-full bg-anchor-primary/90 px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-soft transition-colors duration-200 hover:bg-anchor-primary"
              >
                Record
              </button>
              <button
                type="button"
                onClick={stopRecording}
                className="rounded-full bg-white/90 px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-anchor-deep shadow-soft transition-colors duration-200 hover:bg-[#EAF1F8]"
              >
                Stop
              </button>
              {audioUrl && <audio src={audioUrl} controls className="ml-2" />}
            </div>
          </div>
          <button
            type="submit"
            className="w-full rounded-[3rem] bg-anchor-primary px-10 py-5 text-sm font-semibold uppercase tracking-[0.3em] text-white shadow-soft transition-transform transition-colors duration-300 ease-smooth hover:-translate-y-1 hover:bg-[#003B8E] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-anchor-primary/60"
          >
            Save Entry
          </button>
        </form>
        {status && <p className="mt-6 text-sm text-anchor-muted">{status}</p>}
        <div className="mt-8 flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full border border-anchor-primary/35 bg-white/95 px-8 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-anchor-primary shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-anchor-primary hover:text-white"
          >
            Return Home
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Log
