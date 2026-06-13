import { SlidersHorizontal, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { MovieGrid } from '@/components/movie/MovieGrid'
import { useMovieFilters } from '@/hooks/useMovieFilters'
import { useDebounce } from '@/hooks/useDebounce'
import { useSearchMovies } from '@/hooks/useSearchMovies'
import { useGenres } from '@/hooks/useGenres'
import { SORT_OPTIONS, YEAR_OPTIONS, RATING_OPTIONS } from '@/lib/constants'

export default function SearchPage() {
  const { filters, page, setFilter, resetFilters, hasActiveFilters } = useMovieFilters()
  const debouncedQuery = useDebounce(filters.query, 400)
  const { data: genresData } = useGenres()

  const { data, isLoading, error, refetch } = useSearchMovies(
    { ...filters, query: debouncedQuery },
    page
  )

  const movies = data?.results ?? []
  const totalResults = data?.total_results ?? 0
  const totalPages = data?.total_pages ?? 1

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Discover</h1>
        <p className="text-sm text-muted-foreground">Search and filter movies</p>
      </div>

      {/* Search + filter bar */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              placeholder="Search movies..."
              value={filters.query}
              onChange={(e) => setFilter('query', e.target.value)}
              className="pl-4 pr-9"
            />
            {filters.query && (
              <button
                onClick={() => setFilter('query', '')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filters row */}
        <div className="flex flex-wrap items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 shrink-0 text-muted-foreground" />

          {/* Genre */}
          <Select
            value={filters.genreId || 'all'}
            onValueChange={(v) => setFilter('genreId', v === 'all' ? '' : v)}
          >
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genres</SelectItem>
              {genresData?.genres.map((g) => (
                <SelectItem key={g.id} value={String(g.id)}>
                  {g.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Year */}
          <Select
            value={filters.year || 'all'}
            onValueChange={(v) => setFilter('year', v === 'all' ? '' : v)}
          >
            <SelectTrigger className="w-28">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {YEAR_OPTIONS.map((y) => (
                <SelectItem key={y} value={y}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Rating */}
          <Select
            value={filters.minRating || 'all'}
            onValueChange={(v) => setFilter('minRating', v === 'all' ? '' : v)}
          >
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Ratings</SelectItem>
              {RATING_OPTIONS.map((r) => (
                <SelectItem key={r.value} value={r.value}>
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select
            value={filters.sort}
            onValueChange={(v) => setFilter('sort', v)}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((s) => (
                <SelectItem key={s.value} value={s.value}>
                  {s.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="text-primary hover:text-primary/80"
            >
              <X className="mr-1 h-3.5 w-3.5" />
              Clear filters
            </Button>
          )}
        </div>

        {/* Result count */}
        {!isLoading && totalResults > 0 && (
          <p className="text-sm text-muted-foreground">
            {totalResults.toLocaleString()} movie{totalResults !== 1 ? 's' : ''} found
          </p>
        )}
      </div>

      {/* Results grid */}
      <MovieGrid
        movies={movies}
        isLoading={isLoading}
        error={error}
        onRetry={() => refetch()}
        emptyTitle="No results found"
        emptyMessage="Try a different search term or adjust your filters."
      />

      {/* Pagination */}
      {!isLoading && totalPages > 1 && movies.length > 0 && (
        <div className="flex items-center justify-center gap-4 pt-4">
          <Button
            variant="outline"
            size="sm"
            disabled={page <= 1}
            onClick={() => setFilter('page', String(page - 1))}
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {page} of {Math.min(totalPages, 500)}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={page >= Math.min(totalPages, 500)}
            onClick={() => setFilter('page', String(page + 1))}
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
