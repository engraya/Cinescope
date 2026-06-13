import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

const IMAGE_BASE = 'https://image.tmdb.org/t/p'

describe('URL builders', () => {
  beforeEach(() => {
    vi.stubEnv('VITE_TMDB_IMAGE_BASE_URL', IMAGE_BASE)
  })

  afterEach(() => {
    vi.unstubAllEnvs()
    vi.resetModules()
  })

  describe('posterUrl', () => {
    it('returns null for null path', async () => {
      const { posterUrl } = await import('./constants')
      expect(posterUrl(null)).toBeNull()
    })

    it('builds URL with default size w342', async () => {
      const { posterUrl } = await import('./constants')
      expect(posterUrl('/abc.jpg')).toBe(`${IMAGE_BASE}/w342/abc.jpg`)
    })

    it('builds URL with specified size', async () => {
      const { posterUrl } = await import('./constants')
      expect(posterUrl('/abc.jpg', 'w500')).toBe(`${IMAGE_BASE}/w500/abc.jpg`)
    })
  })

  describe('backdropUrl', () => {
    it('returns null for null path', async () => {
      const { backdropUrl } = await import('./constants')
      expect(backdropUrl(null)).toBeNull()
    })

    it('builds URL with default size w1280', async () => {
      const { backdropUrl } = await import('./constants')
      expect(backdropUrl('/backdrop.jpg')).toBe(`${IMAGE_BASE}/w1280/backdrop.jpg`)
    })
  })

  describe('profileUrl', () => {
    it('returns null for null path', async () => {
      const { profileUrl } = await import('./constants')
      expect(profileUrl(null)).toBeNull()
    })

    it('builds URL with w185 size', async () => {
      const { profileUrl } = await import('./constants')
      expect(profileUrl('/person.jpg')).toBe(`${IMAGE_BASE}/w185/person.jpg`)
    })
  })
})

describe('movieKeys', () => {
  it('nowPlaying defaults page to 1', async () => {
    const { movieKeys } = await import('./constants')
    expect(movieKeys.nowPlaying()).toEqual(['movies', 'now_playing', 1])
  })

  it('nowPlaying uses provided page', async () => {
    const { movieKeys } = await import('./constants')
    expect(movieKeys.nowPlaying(3)).toEqual(['movies', 'now_playing', 3])
  })

  it('detail includes movie id', async () => {
    const { movieKeys } = await import('./constants')
    expect(movieKeys.detail(42)).toEqual(['movies', 'detail', 42])
  })

  it('search includes query and page', async () => {
    const { movieKeys } = await import('./constants')
    const key = movieKeys.search('batman', 2)
    expect(key[0]).toBe('movies')
    expect(key[1]).toBe('search')
    expect(key[2]).toBe('batman')
    expect(key[3]).toBe(2)
  })

  it('genres returns fixed key', async () => {
    const { movieKeys } = await import('./constants')
    expect(movieKeys.genres()).toEqual(['movies', 'genres'])
  })
})
