import { useQuery } from '@tanstack/react-query'
import { fetchUpcoming } from '@/api/movies'
import { movieKeys } from '@/lib/constants'

export function useUpcoming(page = 1) {
  return useQuery({
    queryKey: movieKeys.upcoming(page),
    queryFn: () => fetchUpcoming(page),
    staleTime: 5 * 60_000,
  })
}
