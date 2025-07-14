'use client'

import { Language } from '@/types'

interface LogoProps {
  language: Language
  className?: string
  onClick?: () => void
}

export function Logo({ language, className = '', onClick }: LogoProps) {
  const siteName = {
    zh: 'InterviewAce',
    ja: 'InterviewAce'
  }

  const tagline = {
    zh: 'IT面试准备专家',
    ja: 'IT面接準備のエキスパート'
  }

  return (
    <div 
      className={`flex items-center gap-3 cursor-pointer ${className}`}
      onClick={onClick}
    >
      {/* Logo SVG */}
      <div className="relative">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform hover:scale-105"
        >
          {/* Background Circle */}
          <circle
            cx="20"
            cy="20"
            r="18"
            fill="url(#gradient)"
            className="drop-shadow-lg"
          />
          
          {/* Code Brackets */}
          <path
            d="M12 14L8 20L12 26"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M28 14L32 20L28 26"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          
          {/* Question Mark */}
          <path
            d="M17 16C17 14.3431 18.3431 13 20 13C21.6569 13 23 14.3431 23 16C23 17.2876 22.2315 18.4153 21.1 18.8285L20 19.2V21"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <circle
            cx="20"
            cy="24"
            r="1.5"
            fill="white"
          />
          
          {/* Gradient Definition */}
          <defs>
            <linearGradient
              id="gradient"
              x1="0"
              y1="0"
              x2="40"
              y2="40"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="50%" stopColor="#1D4ED8" />
              <stop offset="100%" stopColor="#1E40AF" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Sparkle Effects */}
        <div className="absolute -top-1 -right-1">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z"
              fill="#FCD34D"
              className="animate-pulse"
            />
          </svg>
        </div>
      </div>

      {/* Site Name and Tagline */}
      <div className="min-w-0">
        <h1 className="text-xl font-bold text-gray-900 leading-tight">
          {siteName[language]}
        </h1>
        <p className="text-xs text-gray-600 leading-tight">
          {tagline[language]}
        </p>
      </div>
    </div>
  )
} 