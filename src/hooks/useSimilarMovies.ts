import { useQuery } from '@tanstack/react-query'
import { fetchSimilarMovies } from '@/api/movies'
import { movieKeys } from '@/lib/constants'

export function useSimilarMovies(id: number) {
  return useQuery({
    queryKey: movieKeys.similar(id),
    queryFn: () => fetchSimilarMovies(id),
    enabled: !isNaN(id) && id > 0,
    staleTime: 5 * 60_000,
  })
}
