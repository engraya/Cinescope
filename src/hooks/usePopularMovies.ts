import { useQuery } from '@tanstack/react-query'
import { fetchPopular } from '@/api/movies'
import { movieKeys } from '@/lib/constants'

export function usePopularMovies(page = 1) {
  return useQuery({
    queryKey: movieKeys.popular(page),
    queryFn: () => fetchPopular(page),
    staleTime: 5 * 60_000,
  })
}
