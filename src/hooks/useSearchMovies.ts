import { useQuery } from '@tanstack/react-query'
import { searchMovies, discoverMovies } from '@/api/movies'
import { movieKeys } from '@/lib/constants'
import type { SearchFilters } from '@/types'

export function useSearchMovies(filters: SearchFilters, page: number) {
  const hasQuery = filters.query.trim().length > 0
  
  return useQuery({
    queryKey: hasQuery
      ? movieKeys.search(filters.query, page, filters.year || undefined)
      : movieKeys.discover({ ...filters, page }),
    queryFn: () => {
      if (hasQuery) {
        return searchMovies(filters.query, page, filters.year || undefined)
      }
      const params: Record<string, string | number> = {
        sort_by: filters.sort,
        page,
        ...(filters.genreId ? { with_genres: filters.genreId } : {}),
        ...(filters.year ? { primary_release_year: filters.year } : {}),
        ...(filters.minRating ? { 'vote_average.gte': filters.minRating } : {}),
      }
      return discoverMovies(params)
    },
    enabled: true,
    staleTime: 2 * 60_000,
  })
}
