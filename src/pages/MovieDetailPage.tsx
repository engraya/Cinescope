import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Heart, Globe, Clock, Calendar, DollarSign, Users } from 'lucide-react'
import { useMovieDetail } from '@/hooks/useMovieDetail'
import { useMovieCredits } from '@/hooks/useMovieCredits'
import { useSimilarMovies } from '@/hooks/useSimilarMovies'
import { posterUrl, backdropUrl, profileUrl } from '@/lib/constants'
import { formatDate, formatCurrency, formatRuntime, cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { RatingBadge } from '@/components/movie/RatingBadge'
import { GenreBadge } from '@/components/movie/GenreBadge'
import { MovieRow } from '@/components/movie/MovieRow'
import { Skeleton } from '@/components/ui/skeleton'
import { ErrorState } from '@/components/shared/ErrorState'
import { Film, User } from 'lucide-react'
import type { CastMember } from '@/types'

function DetailSkeleton() {
  return (
    <div className="animate-pulse space-y-6 p-4 sm:p-6">
      <Skeleton className="h-64 w-full rounded-2xl" />
      <div className="flex gap-6">
        <Skeleton className="h-52 w-36 shrink-0 rounded-xl" />
        <div className="flex-1 space-y-3 pt-4">
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      </div>
    </div>
  )
}

function CastCard({ member }: { member: CastMember }) {
  const photo = profileUrl(member.profile_path)
  return (
    <div className="w-28 shrink-0 text-center">
      <div className="mb-2 overflow-hidden rounded-xl bg-muted aspect-[2/3] flex items-center justify-center">
        {photo ? (
          <img
            src={photo}
            alt={member.name}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <User className="h-8 w-8 text-muted-foreground/40" />
        )}
      </div>
      <p className="line-clamp-1 text-xs font-medium text-foreground">{member.name}</p>
      <p className="line-clamp-1 text-xs text-muted-foreground">{member.character}</p>
    </div>
  )
}

function MetaRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  if (!value || value === 'N/A') return null
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground">{value}</p>
      </div>
    </div>
  )
}

export default function MovieDetailPage() {
  const { id } = useParams<{ id: string }>()
  const movieId = parseInt(id ?? '', 10)
  const navigate = useNavigate()

  const { data: movie, isLoading, error } = useMovieDetail(movieId)
  const { data: credits } = useMovieCredits(movieId)
  const { data: similar } = useSimilarMovies(movieId)

  if (isLoading) return <DetailSkeleton />
  if (error || !movie) {
    return (
      <div className="p-6">
        <ErrorState
          message="Failed to load movie details."
          onRetry={() => navigate(-1)}
        />
      </div>
    )
  }

  const backdrop = backdropUrl(movie.backdrop_path, 'w1280')
  const poster = posterUrl(movie.poster_path, 'w500')
  const director = credits?.crew.find((c) => c.job === 'Director')
  const topCast = credits?.cast.slice(0, 10) ?? []
  const similarMovies = similar?.results.slice(0, 15) ?? []

  const language = movie.spoken_languages.find(
    (l) => l.iso_639_1 === movie.original_language
  )?.english_name ?? movie.original_language.toUpperCase()

  return (
    <div className="space-y-8">
      {/* Backdrop */}
      <div className="relative h-48 overflow-hidden sm:h-72 lg:h-96">
        {backdrop ? (
          <img
            src={backdrop}
            alt={movie.title}
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <div className="h-full w-full bg-muted" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute left-4 top-4 flex items-center gap-2 rounded-lg bg-black/40 px-3 py-1.5 text-sm text-white backdrop-blur-sm transition-colors hover:bg-black/60"
          aria-label="Go back"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </div>

      {/* Main content */}
      <div className="px-4 sm:px-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          {/* Poster */}
          <div className="-mt-24 sm:-mt-32 shrink-0 sm:w-44 lg:w-52">
            <div
              className={cn(
                'overflow-hidden rounded-2xl border-2 border-border shadow-2xl shadow-black/60',
                'aspect-[2/3] w-36 sm:w-full'
              )}
            >
              {poster ? (
                <img src={poster} alt={movie.title} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted">
                  <Film className="h-12 w-12 text-muted-foreground/40" />
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 space-y-4 pt-2 sm:pt-4">
            {/* Title + badges */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <RatingBadge rating={movie.vote_average} size="md" />
                <span className="text-sm text-muted-foreground">
                  ({movie.vote_count.toLocaleString()} votes)
                </span>
              </div>
              <h1 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl">
                {movie.title}
              </h1>
              {movie.tagline && (
                <p className="text-base italic text-muted-foreground">{movie.tagline}</p>
              )}
            </div>

            {/* Genres */}
            {movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((g) => (
                  <GenreBadge key={g.id} name={g.name} />
                ))}
              </div>
            )}

            {/* Quick stats */}
            <div className="flex flex-wrap gap-4 text-sm">
              {movie.release_date && (
                <span className="text-muted-foreground">
                  <span className="font-medium text-foreground">
                    {movie.release_date.slice(0, 4)}
                  </span>
                </span>
              )}
              {movie.runtime && (
                <span className="text-muted-foreground">
                  <span className="font-medium text-foreground">{formatRuntime(movie.runtime)}</span>
                </span>
              )}
              {movie.status && (
                <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  {movie.status}
                </span>
              )}
            </div>

            {/* Overview */}
            {movie.overview && (
              <div>
                <h2 className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  Overview
                </h2>
                <p className="text-sm leading-relaxed text-foreground/85">{movie.overview}</p>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-3 pt-1">
              <Button size="sm" className="gap-2">
                <Heart className="h-4 w-4" />
                Add to Favorites
              </Button>
              {movie.homepage && (
                <Button variant="outline" size="sm" asChild className="gap-2">
                  <a href={movie.homepage} target="_blank" rel="noopener noreferrer">
                    <Globe className="h-4 w-4" />
                    Website
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Metadata grid */}
        <div className="mt-8 grid grid-cols-2 gap-4 rounded-2xl border border-border bg-card p-5 sm:grid-cols-3 lg:grid-cols-4">
          <MetaRow icon={Calendar} label="Release Date" value={formatDate(movie.release_date)} />
          <MetaRow icon={Clock} label="Runtime" value={formatRuntime(movie.runtime)} />
          <MetaRow icon={Globe} label="Language" value={language} />
          {director && <MetaRow icon={Users} label="Director" value={director.name} />}
          <MetaRow icon={DollarSign} label="Budget" value={formatCurrency(movie.budget)} />
          <MetaRow icon={DollarSign} label="Revenue" value={formatCurrency(movie.revenue)} />
        </div>

        {/* Cast */}
        {topCast.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-4 text-lg font-semibold text-foreground">Cast</h2>
            <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
              {topCast.map((member) => (
                <CastCard key={member.id} member={member} />
              ))}
            </div>
          </div>
        )}

        {/* Similar movies */}
        {similarMovies.length > 0 && (
          <div className="mt-8">
            <MovieRow
              title="Similar Movies"
              movies={similarMovies}
              isLoading={false}
              viewAllHref={`/search?sort=popularity.desc`}
            />
          </div>
        )}
      </div>

      <div className="pb-8" />
    </div>
  )
}
