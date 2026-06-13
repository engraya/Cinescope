import { useQuery } from '@tanstack/react-query'
import { fetchNowPlaying } from '@/api/movies'
import { movieKeys } from '@/lib/constants'

export function useNowPlaying(page = 1) {
  return useQuery({
    queryKey: movieKeys.nowPlaying(page),
    queryFn: () => fetchNowPlaying(page),
    staleTime: 5 * 60_000,
  })
}
