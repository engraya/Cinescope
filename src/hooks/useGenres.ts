import { useQuery } from '@tanstack/react-query'
import { fetchGenres } from '@/api/movies'
import { movieKeys } from '@/lib/constants'

export function useGenres() {
  return useQuery({
    queryKey: movieKeys.genres(),
    queryFn: fetchGenres,
    staleTime: Infinity,
  })
}
