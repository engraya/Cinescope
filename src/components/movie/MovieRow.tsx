import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { MovieCard } from './MovieCard'
import { MovieCardSkeleton } from './MovieCardSkeleton'
import { ErrorState } from '@/components/shared/ErrorState'
import type { Movie } from '@/types'

interface MovieRowProps {
  title: string
  movies: Movie[]
  isLoading: boolean
  error?: Error | null
  viewAllHref?: string
  onRetry?: () => void
}

export function MovieRow({
  title,
  movies,
  isLoading,
  error,
  viewAllHref,
  onRetry,
}: MovieRowProps) {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">{title}</h2>
        {viewAllHref && (
          <Link
            to={viewAllHref}
            className="flex items-center gap-1 text-sm text-primary transition-colors hover:text-primary/80"
          >
            View all <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>

      {error ? (
        <ErrorState message="Failed to load movies." onRetry={onRetry} className="py-8" />
      ) : (
        <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
          {isLoading
            ? Array.from({ length: 8 }).map((_, i) => (
                <MovieCardSkeleton key={i} className="w-36 shrink-0" />
              ))
            : movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} className="w-36 shrink-0" />
              ))}
        </div>
      )}
    </section>
  )
}
