import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date)
}

export function getAverageRating(ratings: number[]): number {
  if (ratings.length === 0) return 0
  return ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
} 