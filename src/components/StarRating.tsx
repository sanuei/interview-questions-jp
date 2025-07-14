'use client'

import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number
  onRate?: (rating: number) => void
  readonly?: boolean
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function StarRating({ 
  rating, 
  onRate, 
  readonly = false, 
  size = 'md',
  className 
}: StarRatingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  const handleClick = (star: number) => {
    if (!readonly && onRate) {
      onRate(star)
    }
  }

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleClick(star)}
          disabled={readonly}
          title={`Rate ${star} star${star > 1 ? 's' : ''}`}
          aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
          className={cn(
            "transition-colors",
            !readonly && "hover:scale-110 cursor-pointer",
            readonly && "cursor-default"
          )}
        >
          <Star
            className={cn(
              sizeClasses[size],
              star <= rating 
                ? "fill-yellow-400 text-yellow-400" 
                : "text-gray-300 hover:text-yellow-400"
            )}
          />
        </button>
      ))}
      {rating > 0 && (
        <span className="ml-2 text-sm text-muted-foreground">
          {rating}/5
        </span>
      )}
    </div>
  )
} 