import { Star } from 'lucide-react'
import { cn, getRatingBg } from '@/lib/utils'

interface RatingBadgeProps {
  rating: number
  size?: 'sm' | 'md'
  className?: string
}

export function RatingBadge({ rating, size = 'sm', className }: RatingBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border font-bold font-mono',
        size === 'sm' ? 'px-1.5 py-0.5 text-xs' : 'px-2 py-1 text-sm',
        getRatingBg(rating),
        className
      )}
    >
      <Star className={cn('fill-current', size === 'sm' ? 'h-2.5 w-2.5' : 'h-3.5 w-3.5')} />
      {rating.toFixed(1)}
    </span>
  )
}
