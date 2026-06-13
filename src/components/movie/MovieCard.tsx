import { Link } from 'react-router-dom'
import { Film } from 'lucide-react'
import { posterUrl } from '@/lib/constants'
import { cn, formatYear } from '@/lib/utils'
import { RatingBadge } from './RatingBadge'
import type { Movie } from '@/types'

interface MovieCardProps {
  movie: Movie
  className?: string
}

export function MovieCard({ movie, className }: MovieCardProps) {
  const poster = posterUrl(movie.poster_path, 'w342')
  const year = formatYear(movie.release_date)

  return (
    <Link
      to={`/movie/${movie.id}`}
      className={cn(
        'group relative block overflow-hidden rounded-xl border border-border/50 bg-card transition-all duration-300 hover:scale-[1.03] hover:border-border hover:shadow-2xl hover:shadow-black/60',
        className
      )}
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden bg-muted">
        {poster ? (
          <img
            src={poster}
            alt={movie.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Film className="h-12 w-12 text-muted-foreground/40" />
          </div>
        )}

        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Rating badge — always visible */}
        <div className="absolute right-2 top-2">
          <RatingBadge rating={movie.vote_average} />
        </div>

        {/* Title overlay shown on hover */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-2 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="line-clamp-2 text-sm font-semibold text-white">{movie.title}</p>
          {year && <p className="text-xs text-white/70">{year}</p>}
        </div>
      </div>

      {/* Info below poster */}
      <div className="p-3">
        <p className="line-clamp-1 text-sm font-medium text-foreground">{movie.title}</p>
        {year && <p className="text-xs text-muted-foreground">{year}</p>}
      </div>
    </Link>
  )
}
