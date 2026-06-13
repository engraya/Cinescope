import { MovieCard } from './MovieCard'
import { MovieCardSkeleton } from './MovieCardSkeleton'
import { EmptyState } from '@/components/shared/EmptyState'
import { ErrorState } from '@/components/shared/ErrorState'
import type { Movie } from '@/types'

interface MovieGridProps {
  movies: Movie[]
  isLoading: boolean
  error: Error | null
  onRetry?: () => void
  emptyTitle?: string
  emptyMessage?: string
}

const SKELETON_COUNT = 12

export function MovieGrid({
  movies,
  isLoading,
  error,
  onRetry,
  emptyTitle,
  emptyMessage,
}: MovieGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <ErrorState
        message={error.message || 'Failed to load movies.'}
        onRetry={onRetry}
      />
    )
  }

  if (movies.length === 0) {
    return <EmptyState title={emptyTitle} message={emptyMessage} />
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}
