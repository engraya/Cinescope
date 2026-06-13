import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useDebounce } from './useDebounce'

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('returns the initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('hello'))
    expect(result.current).toBe('hello')
  })

  it('does not update before the delay elapses', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
      initialProps: { value: 'initial' },
    })

    rerender({ value: 'updated' })
    act(() => { vi.advanceTimersByTime(200) })

    expect(result.current).toBe('initial')
  })

  it('updates after the default 400ms delay', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
      initialProps: { value: 'initial' },
    })

    rerender({ value: 'updated' })
    act(() => { vi.advanceTimersByTime(400) })

    expect(result.current).toBe('updated')
  })

  it('only applies the last value when updated rapidly', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
      initialProps: { value: 'a' },
    })

    rerender({ value: 'b' })
    act(() => { vi.advanceTimersByTime(100) })
    rerender({ value: 'c' })
    act(() => { vi.advanceTimersByTime(400) })

    expect(result.current).toBe('c')
  })

  it('respects a custom delay', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 1000),
      { initialProps: { value: 'first' } }
    )

    rerender({ value: 'second' })
    act(() => { vi.advanceTimersByTime(999) })
    expect(result.current).toBe('first')

    act(() => { vi.advanceTimersByTime(1) })
    expect(result.current).toBe('second')
  })
})
