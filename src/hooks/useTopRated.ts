import { useQuery } from '@tanstack/react-query'
import { fetchTopRated } from '@/api/movies'
import { movieKeys } from '@/lib/constants'

export function useTopRated(page = 1) {
  return useQuery({
    queryKey: movieKeys.topRated(page),
    queryFn: () => fetchTopRated(page),
    staleTime: 5 * 60_000,
  })
}
