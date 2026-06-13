import { useSearchParams } from 'react-router-dom'
import type { SearchFilters, SortOption } from '@/types'

export function useMovieFilters() {
  const [params, setParams] = useSearchParams()

  const filters: SearchFilters = {
    query: params.get('q') ?? '',
    genreId: params.get('genre') ?? '',
    year: params.get('year') ?? '',
    minRating: params.get('rating') ?? '',
    sort: (params.get('sort') as SortOption) ?? 'popularity.desc',
  }

  const page = Math.max(1, parseInt(params.get('page') ?? '1', 10) || 1)

  function setFilter(key: keyof SearchFilters | 'page', value: string) {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        const keyMap: Record<string, string> = { query: 'q', genreId: 'genre', minRating: 'rating' }
        const paramKey = keyMap[key] ?? key
        if (value) next.set(paramKey, value)
        else next.delete(paramKey)
        if (key !== 'page') next.set('page', '1')
        return next
      },
      { replace: true }
    )
  }

  function resetFilters() {
    setParams({}, { replace: true })
  }

  const hasActiveFilters =
    !!filters.query ||
    !!filters.genreId ||
    !!filters.year ||
    !!filters.minRating ||
    filters.sort !== 'popularity.desc'

  return { filters, page, setFilter, resetFilters, hasActiveFilters }
}
