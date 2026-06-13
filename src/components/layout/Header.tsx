import { useState } from 'react'
import { Menu, X, Search, Sun, Moon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Sidebar } from './Sidebar'
import { useTheme } from '@/providers/ThemeProvider'

export function Header() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { theme, toggleTheme } = useTheme()

  return (
    <>
      <header className="flex h-14 items-center justify-between border-b border-border bg-sidebar px-4 lg:hidden">
        <button
          onClick={() => setOpen(true)}
          className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <span className="text-lg font-bold text-foreground">
          Cine<span className="text-primary">scope</span>
        </span>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/search')}
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Mobile drawer overlay */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-64 border-r border-border bg-sidebar">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-4 rounded-lg p-1.5 text-muted-foreground hover:bg-accent"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
            <Sidebar onNavClick={() => setOpen(false)} />
          </aside>
        </div>
      )}
    </>
  )
}
