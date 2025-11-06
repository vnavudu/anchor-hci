import { NavLink, Outlet } from 'react-router-dom'

const navLinkClasses = ({ isActive }) =>
  [
    'text-xs uppercase tracking-[0.4em] transition-colors duration-200 ease-smooth',
    isActive
      ? 'text-anchor-primary'
      : 'text-anchor-muted hover:text-anchor-deep',
  ].join(' ')

const App = () => (
  <div className="flex min-h-screen flex-col bg-anchor-background text-anchor-deep">
    <div className="relative mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 py-12 sm:px-10">
      <div className="pointer-events-none absolute inset-x-0 top-16 -z-10 mx-auto hidden h-80 w-[80%] rounded-[3.5rem] bg-white/60 blur-3xl sm:block" />
      <header className="mb-12 flex flex-col items-center text-center">
        <span className="text-sm font-semibold uppercase tracking-[0.6em] text-anchor-primary">
          Anchor
        </span>
        <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">
          Find calm in a single tap
        </h1>
        <p className="mt-4 max-w-2xl text-base text-anchor-muted">
          A minimalist companion for quick, discreet stress relief and gentle
          reflection throughout your day.
        </p>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center">
        <div className="w-full animate-fade-in-up">
          <Outlet />
        </div>
      </main>
      <footer className="mt-16 flex items-center justify-center">
        <nav className="flex gap-6">
          <NavLink to="/" end className={navLinkClasses}>
            Home
          </NavLink>
          <NavLink to="/calm" className={navLinkClasses}>
            Calm
          </NavLink>
          <NavLink to="/log" className={navLinkClasses}>
            Log
          </NavLink>
        </nav>
      </footer>
    </div>
  </div>
)

export default App
