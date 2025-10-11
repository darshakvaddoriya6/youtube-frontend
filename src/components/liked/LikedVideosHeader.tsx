'use client'

import { ThumbsUp } from 'lucide-react'

export default function LikedVideosHeader() {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center">
        <ThumbsUp className="h-8 w-8 mr-3 text-gray-900" />
        <h1 className="text-3xl font-semibold text-gray-900">Liked Videos</h1>
      </div>
    </div>
  )
}