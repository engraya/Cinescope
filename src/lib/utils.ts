import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  if (!dateString) return 'Unknown'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatYear(dateString: string): string {
  if (!dateString) return ''
  return dateString.slice(0, 4)
}

export function formatCurrency(amount: number): string {
  if (!amount) return 'N/A'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(amount)
}

export function formatRuntime(minutes: number | null): string {
  if (!minutes) return 'N/A'
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return h > 0 ? `${h}h ${m}m` : `${m}m`
}

export function getRatingBg(rating: number): string {
  if (rating >= 7.5) return 'bg-green-500/20 text-green-400 border-green-500/40'
  if (rating >= 6.0) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40'
  return 'bg-red-500/20 text-red-400 border-red-500/40'
}
