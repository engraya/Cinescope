import { Link } from 'react-router-dom'
import { Film } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFoundPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 py-24 text-center">
      <div className="rounded-full bg-muted p-8">
        <Film className="h-16 w-16 text-muted-foreground" />
      </div>
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-foreground">404</h1>
        <p className="text-lg font-medium text-foreground">Page not found</p>
        <p className="text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
      </div>
      <Button asChild>
        <Link to="/home">Go to Home</Link>
      </Button>
    </div>
  )
}
