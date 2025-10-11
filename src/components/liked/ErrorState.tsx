'use client'

import { ThumbsUp } from 'lucide-react'

interface ErrorStateProps {
  error: string
  onRetry: () => void
}

export default function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center mb-8">
          <ThumbsUp className="h-8 w-8 mr-3 text-gray-900" />
          <h1 className="text-3xl font-semibold text-gray-900">Liked Videos</h1>
        </div>
        <div className="text-center py-20">
          <div className="text-red-500 text-2xl mb-3">⚠️</div>
          <p className="text-red-600 font-medium text-lg">
            Error loading liked videos
          </p>
          <p className="text-gray-600 text-sm mt-2">{error}</p>
          <button
            onClick={onRetry}
            className="mt-6 px-6 py-2.5 bg-gray-900 text-white rounded-full hover:bg-gray-800 font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  )
}