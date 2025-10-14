'use client'

import { ThumbsUp } from 'lucide-react'
import { VideoCardSkeleton } from '@/components/skeletons'

export default function LoadingState() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-3 lg:px-6 py-4 lg:py-8">
        <div className="flex items-center mb-8">
          <ThumbsUp className="h-8 w-8 mr-3 text-gray-900" />
          <h1 className="text-3xl font-semibold text-gray-900">Liked Videos</h1>
        </div>
        <div className="space-y-4">
          <VideoCardSkeleton variant="list" count={6} />
        </div>
      </div>
    </div>
  )
}