import { useQuery } from '@tanstack/react-query'
import { fetchMovieDetail } from '@/api/movies'
import { movieKeys } from '@/lib/constants'

export function useMovieDetail(id: number) {
  return useQuery({
    queryKey: movieKeys.detail(id),
    queryFn: () => fetchMovieDetail(id),
    enabled: !isNaN(id) && id > 0,
    staleTime: 10 * 60_000,
  })
}
