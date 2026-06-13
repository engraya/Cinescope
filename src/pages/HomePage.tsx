import { HeroBanner } from '@/components/movie/HeroBanner'
import { MovieRow } from '@/components/movie/MovieRow'
import { useNowPlaying } from '@/hooks/useNowPlaying'
import { usePopularMovies } from '@/hooks/usePopularMovies'
import { useTopRated } from '@/hooks/useTopRated'
import { useUpcoming } from '@/hooks/useUpcoming'

export default function HomePage() {
  const nowPlaying = useNowPlaying()
  const popular = usePopularMovies()
  const topRated = useTopRated()
  const upcoming = useUpcoming()

  const featuredMovie = popular.data?.results[0]

  return (
    <div className="space-y-8 p-4 sm:p-6">
      <HeroBanner movie={featuredMovie} isLoading={popular.isLoading} />

      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">Discover Movies</h1>
        <p className="text-sm text-muted-foreground">
          Find and explore your next favorite movie.
        </p>
      </div>

      <MovieRow
        title="Now Playing"
        movies={nowPlaying.data?.results.slice(0, 20) ?? []}
        isLoading={nowPlaying.isLoading}
        error={nowPlaying.error}
        viewAllHref="/search?sort=popularity.desc"
        onRetry={() => nowPlaying.refetch()}
      />

      <MovieRow
        title="Popular Movies"
        movies={popular.data?.results.slice(0, 20) ?? []}
        isLoading={popular.isLoading}
        error={popular.error}
        viewAllHref="/search?sort=popularity.desc"
        onRetry={() => popular.refetch()}
      />

      <MovieRow
        title="Top Rated"
        movies={topRated.data?.results.slice(0, 20) ?? []}
        isLoading={topRated.isLoading}
        error={topRated.error}
        viewAllHref="/search?sort=vote_average.desc"
        onRetry={() => topRated.refetch()}
      />

      <MovieRow
        title="Upcoming"
        movies={upcoming.data?.results.slice(0, 20) ?? []}
        isLoading={upcoming.isLoading}
        error={upcoming.error}
        viewAllHref="/search?sort=release_date.desc"
        onRetry={() => upcoming.refetch()}
      />
    </div>
  )
}
