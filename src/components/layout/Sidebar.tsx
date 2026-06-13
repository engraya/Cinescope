import { NavLink, useLocation } from 'react-router-dom'
import { Clapperboard, Home, Search, TrendingUp, Star, Calendar, Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTheme } from '@/providers/ThemeProvider'

const NAV_ITEMS = [
  { to: '/home', label: 'Home', icon: Home },
  { to: '/search', label: 'Discover', icon: Search },
  { to: '/search?sort=popularity.desc', label: 'Popular', icon: TrendingUp },
  { to: '/search?sort=vote_average.desc', label: 'Top Rated', icon: Star },
  { to: '/search?sort=release_date.desc', label: 'New Releases', icon: Calendar },
]

function NavItem({
  to,
  label,
  icon: Icon,
  onNavClick,
}: {
  to: string
  label: string
  icon: React.ElementType
  onNavClick?: () => void
}) {
  const location = useLocation()
  const [toPath, toQuery] = to.split('?')
  const isActive =
    location.pathname === toPath &&
    location.search === (toQuery ? `?${toQuery}` : '')

  return (
    <NavLink
      to={to}
      onClick={onNavClick}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
        isActive
          ? 'border-l-2 border-primary bg-primary/10 text-primary'
          : 'text-muted-foreground hover:bg-accent hover:text-foreground'
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {label}
    </NavLink>
  )
}

export function Sidebar({ onNavClick }: { onNavClick?: () => void }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
          <Clapperboard className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="text-xl font-bold tracking-tight text-foreground">
          Cine<span className="text-primary">scope</span>
        </span>
      </div>

      <div className="px-3 pb-2">
        <p className="px-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Menu
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-3">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavItem key={label} to={to} label={label} icon={Icon} onNavClick={onNavClick} />
        ))}
      </nav>

      <div className="px-3 pb-2">
        <button
          onClick={toggleTheme}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:bg-accent hover:text-foreground"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? (
            <Sun className="h-4 w-4 shrink-0" />
          ) : (
            <Moon className="h-4 w-4 shrink-0" />
          )}
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>

      <div className="p-4 text-center">
        <p className="text-xs text-muted-foreground">Powered by TMDB</p>
      </div>
    </div>
  )
}
