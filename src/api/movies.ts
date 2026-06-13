import tmdbClient from './axiosClient'
import type { PaginatedMovies, MovieDetail, Credits, GenresResponse } from '@/types'

export const fetchNowPlaying = (page = 1) =>
  tmdbClient
    .get<PaginatedMovies>('/movie/now_playing', { params: { page } })
    .then((r) => r.data)

export const fetchPopular = (page = 1) =>
  tmdbClient
    .get<PaginatedMovies>('/movie/popular', { params: { page } })
    .then((r) => r.data)

export const fetchTopRated = (page = 1) =>
  tmdbClient
    .get<PaginatedMovies>('/movie/top_rated', { params: { page } })
    .then((r) => r.data)

export const fetchUpcoming = (page = 1) =>
  tmdbClient
    .get<PaginatedMovies>('/movie/upcoming', { params: { page } })
    .then((r) => r.data)

export const searchMovies = (query: string, page = 1, year?: string) =>
  tmdbClient
    .get<PaginatedMovies>('/search/movie', {
      params: { query, page, ...(year ? { year } : {}) },
    })
    .then((r) => r.data)

export const discoverMovies = (params: Record<string, string | number>) =>
  tmdbClient
    .get<PaginatedMovies>('/discover/movie', { params })
    .then((r) => r.data)

export const fetchMovieDetail = (id: number) =>
  tmdbClient.get<MovieDetail>(`/movie/${id}`).then((r) => r.data)

export const fetchMovieCredits = (id: number) =>
  tmdbClient.get<Credits>(`/movie/${id}/credits`).then((r) => r.data)

export const fetchSimilarMovies = (id: number) =>
  tmdbClient
    .get<PaginatedMovies>(`/movie/${id}/similar`)
    .then((r) => r.data)

export const fetchGenres = () =>
  tmdbClient.get<GenresResponse>('/genre/movie/list').then((r) => r.data)
