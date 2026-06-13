import { Link } from 'react-router-dom'
import { Play, Info } from 'lucide-react'
import { backdropUrl } from '@/lib/constants'
import { formatYear } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { RatingBadge } from './RatingBadge'
import { Skeleton } from '@/components/ui/skeleton'
import type { Movie } from '@/types'

interface HeroBannerProps {
  movie?: Movie
  isLoading?: boolean
}

export function HeroBanner({ movie, isLoading }: HeroBannerProps) {
  if (isLoading) {
    return <Skeleton className="h-[420px] w-full rounded-none" />
  }

  if (!movie) return null

  const backdrop = backdropUrl(movie.backdrop_path, 'w1280')
  const year = formatYear(movie.release_date)

  return (
    <div className="relative -mx-0 h-[420px] overflow-hidden sm:rounded-2xl">
      {/* Backdrop */}
      {backdrop ? (
        <img
          src={backdrop}
          alt={movie.title}
          className="h-full w-full object-cover object-top"
        />
      ) : (
        <div className="h-full w-full bg-muted" />
      )}

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 p-6 sm:p-10">
        <div className="max-w-lg space-y-3">
          <div className="flex items-center gap-3">
            <RatingBadge rating={movie.vote_average} size="md" />
            {year && (
              <span className="text-sm font-medium text-white/70">{year}</span>
            )}
          </div>

          <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl">
            {movie.title}
          </h1>

          {movie.overview && (
            <p className="line-clamp-2 text-sm text-white/75 sm:text-base">
              {movie.overview}
            </p>
          )}

          <div className="flex gap-3 pt-1">
            <Button asChild size="lg" className="gap-2">
              <Link to={`/movie/${movie.id}`}>
                <Play className="h-4 w-4 fill-current" />
                View Details
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2 border-white/30 bg-white/10 text-white hover:bg-white/20">
              <Link to="/search">
                <Info className="h-4 w-4" />
                Browse All
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
