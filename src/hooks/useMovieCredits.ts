import { useQuery } from '@tanstack/react-query'
import { fetchMovieCredits } from '@/api/movies'
import { movieKeys } from '@/lib/constants'

export function useMovieCredits(id: number) {
  return useQuery({
    queryKey: movieKeys.credits(id),
    queryFn: () => fetchMovieCredits(id),
    enabled: !isNaN(id) && id > 0,
    staleTime: 10 * 60_000,
  })
}
