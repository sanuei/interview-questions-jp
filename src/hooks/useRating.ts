'use client'

import { useState, useEffect } from 'react'
import { UserRating } from '@/types'

export function useRating() {
  const [ratings, setRatings] = useState<UserRating[]>([])

  useEffect(() => {
    const savedRatings = localStorage.getItem('question-ratings')
    if (savedRatings) {
      try {
        const parsedRatings = JSON.parse(savedRatings).map((rating: any) => ({
          ...rating,
          timestamp: new Date(rating.timestamp)
        }))
        setRatings(parsedRatings)
      } catch (error) {
        console.error('Error parsing saved ratings:', error)
      }
    }
  }, [])

  const saveRatings = (newRatings: UserRating[]) => {
    setRatings(newRatings)
    localStorage.setItem('question-ratings', JSON.stringify(newRatings))
  }

  const rateQuestion = (questionId: string, rating: number) => {
    const existingIndex = ratings.findIndex(r => r.questionId === questionId)
    const newRating: UserRating = {
      questionId,
      rating,
      timestamp: new Date()
    }

    let newRatings: UserRating[]
    if (existingIndex >= 0) {
      newRatings = [...ratings]
      newRatings[existingIndex] = newRating
    } else {
      newRatings = [...ratings, newRating]
    }

    saveRatings(newRatings)
  }

  const getRating = (questionId: string): number => {
    const rating = ratings.find(r => r.questionId === questionId)
    return rating?.rating || 0
  }

  const removeRating = (questionId: string) => {
    const newRatings = ratings.filter(r => r.questionId !== questionId)
    saveRatings(newRatings)
  }

  return {
    ratings,
    rateQuestion,
    getRating,
    removeRating
  }
} 