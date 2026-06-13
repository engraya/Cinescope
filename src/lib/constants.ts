import type { SortOption } from '@/types'

const IMAGE_BASE = import.meta.env.VITE_TMDB_IMAGE_BASE_URL as string

export function posterUrl(
  path: string | null,
  size: 'w185' | 'w342' | 'w500' | 'w780' = 'w342'
): string | null {
  return path ? `${IMAGE_BASE}/${size}${path}` : null
}

export function backdropUrl(
  path: string | null,
  size: 'w780' | 'w1280' | 'original' = 'w1280'
): string | null {
  return path ? `${IMAGE_BASE}/${size}${path}` : null
}

export function profileUrl(path: string | null): string | null {
  return path ? `${IMAGE_BASE}/w185${path}` : null
}

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'popularity.desc', label: 'Most Popular' },
  { value: 'popularity.asc', label: 'Least Popular' },
  { value: 'vote_average.desc', label: 'Highest Rated' },
  { value: 'release_date.desc', label: 'Newest First' },
  { value: 'release_date.asc', label: 'Oldest First' },
]

export const CURRENT_YEAR = new Date().getFullYear()
export const YEAR_OPTIONS = Array.from(
  { length: CURRENT_YEAR - 1970 + 1 },
  (_, i) => String(CURRENT_YEAR - i)
)

export const RATING_OPTIONS = [
  { value: '9', label: '9+ Exceptional' },
  { value: '8', label: '8+ Excellent' },
  { value: '7', label: '7+ Good' },
  { value: '6', label: '6+ Average' },
]

export const movieKeys = {
  nowPlaying: (page?: number) => ['movies', 'now_playing', page ?? 1] as const,
  popular: (page?: number) => ['movies', 'popular', page ?? 1] as const,
  topRated: (page?: number) => ['movies', 'top_rated', page ?? 1] as const,
  upcoming: (page?: number) => ['movies', 'upcoming', page ?? 1] as const,
  search: (query: string, page: number, year?: string) =>
    ['movies', 'search', query, page, year] as const,
  discover: (params: object) => ['movies', 'discover', params] as const,
  detail: (id: number) => ['movies', 'detail', id] as const,
  credits: (id: number) => ['movies', 'credits', id] as const,
  similar: (id: number) => ['movies', 'similar', id] as const,
  genres: () => ['movies', 'genres'] as const,
}
