import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface GenreBadgeProps {
  name: string
  className?: string
}

export function GenreBadge({ name, className }: GenreBadgeProps) {
  return (
    <Badge variant="outline" className={cn('text-xs', className)}>
      {name}
    </Badge>
  )
}
