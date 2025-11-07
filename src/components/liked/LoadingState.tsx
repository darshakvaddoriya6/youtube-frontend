'use client'

import { ThumbsUp } from 'lucide-react'
import { VideoCardSkeleton } from '@/components/skeletons'

export default function LoadingState() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-3 lg:px-6 py-4 lg:py-8">
        <div className="flex items-center mb-8">
            <div className="h-8 w-8 mr-3 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-7 lg:h-8 bg-gray-200 rounded w-40 animate-pulse"></div>
        </div>
        <div className="space-y-4">
          <VideoCardSkeleton variant="like" count={6} />
        </div>
      </div>
    </div>
  )
}