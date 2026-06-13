import { describe, it, expect } from 'vitest'
import { cn, formatDate, formatYear, formatCurrency, formatRuntime, getRatingBg } from './utils'

describe('cn', () => {
  it('merges class strings', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('handles conditional classes', () => {
    expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz')
  })

  it('deduplicates conflicting Tailwind classes', () => {
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
  })
})

describe('formatDate', () => {
  it('returns "Unknown" for empty string', () => {
    expect(formatDate('')).toBe('Unknown')
  })

  it('formats a valid ISO date string', () => {
    expect(formatDate('2024-07-04')).toMatch(/July 4, 2024/)
  })
})

describe('formatYear', () => {
  it('returns "" for empty string', () => {
    expect(formatYear('')).toBe('')
  })

  it('extracts the 4-digit year', () => {
    expect(formatYear('2023-11-15')).toBe('2023')
  })
})

describe('formatCurrency', () => {
  it('returns "N/A" for 0', () => {
    expect(formatCurrency(0)).toBe('N/A')
  })

  it('formats millions compactly', () => {
    expect(formatCurrency(150_000_000)).toMatch(/\$150(\.\d+)?M/)
  })

  it('formats thousands compactly', () => {
    expect(formatCurrency(500_000)).toMatch(/\$500(\.\d+)?K/)
  })
})

describe('formatRuntime', () => {
  it('returns "N/A" for null', () => {
    expect(formatRuntime(null)).toBe('N/A')
  })

  it('returns "N/A" for 0', () => {
    expect(formatRuntime(0)).toBe('N/A')
  })

  it('formats less than 1 hour', () => {
    expect(formatRuntime(90)).toBe('1h 30m')
  })

  it('formats exactly 60 minutes', () => {
    expect(formatRuntime(60)).toBe('1h 0m')
  })

  it('formats minutes only when under an hour', () => {
    expect(formatRuntime(45)).toBe('45m')
  })
})

describe('getRatingBg', () => {
  it('returns green classes for rating >= 7.5', () => {
    const result = getRatingBg(8.0)
    expect(result).toContain('green')
  })

  it('returns yellow classes for rating >= 6.0', () => {
    const result = getRatingBg(6.5)
    expect(result).toContain('yellow')
  })

  it('returns red classes for rating < 6.0', () => {
    const result = getRatingBg(4.0)
    expect(result).toContain('red')
  })

  it('treats exactly 7.5 as green', () => {
    expect(getRatingBg(7.5)).toContain('green')
  })

  it('treats exactly 6.0 as yellow', () => {
    expect(getRatingBg(6.0)).toContain('yellow')
  })
})
