export interface Genre {
  id: number
  name: string
}

export interface Movie {
  id: number
  title: string
  overview: string
  poster_path: string | null
  backdrop_path: string | null
  release_date: string
  vote_average: number
  vote_count: number
  genre_ids: number[]
  popularity: number
  adult: boolean
  original_language: string
  original_title: string
}

export interface ProductionCompany {
  id: number
  name: string
  logo_path: string | null
  origin_country: string
}

export interface SpokenLanguage {
  iso_639_1: string
  name: string
  english_name: string
}

export interface MovieDetail extends Omit<Movie, 'genre_ids'> {
  genres: Genre[]
  runtime: number | null
  status: string
  tagline: string | null
  budget: number
  revenue: number
  production_companies: ProductionCompany[]
  spoken_languages: SpokenLanguage[]
  homepage: string | null
  imdb_id: string | null
}

export interface CastMember {
  id: number
  name: string
  character: string
  profile_path: string | null
  order: number
}

export interface CrewMember {
  id: number
  name: string
  job: string
  department: string
  profile_path: string | null
}

export interface Credits {
  id: number
  cast: CastMember[]
  crew: CrewMember[]
}

export interface PaginatedMovies {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export interface GenresResponse {
  genres: Genre[]
}

export type SortOption =
  | 'popularity.desc'
  | 'popularity.asc'
  | 'vote_average.desc'
  | 'release_date.desc'
  | 'release_date.asc'

export interface SearchFilters {
  query: string
  genreId: string
  year: string
  minRating: string
  sort: SortOption
}
