'use client'

import { ThumbsUp, Share, Bookmark, Download, MoreHorizontal } from 'lucide-react'

interface VideoActionsProps {
  isLiked: boolean
  likeCount: number
  currentUser: any
  onToggleLike: () => void
}

export default function VideoActions({ 
  isLiked, 
  likeCount, 
  currentUser, 
  onToggleLike 
}: VideoActionsProps) {
  return (
    <div className="flex items-center flex-wrap gap-2">
      <div className="flex items-center bg-gray-100 rounded-full">
        <button
          onClick={onToggleLike}
          title={!currentUser ? 'Sign in to like this video' : isLiked ? 'Unlike' : 'Like'}
          className={`flex items-center space-x-2 px-3 py-2 hover:bg-gray-200 rounded-full transition-colors ${
            isLiked ? 'text-black' : 'text-black'
          } ${!currentUser ? 'cursor-not-allowed opacity-75' : ''}`}
        >
          <ThumbsUp
            className="h-4 w-4 transition-transform"
            style={{
              fill: isLiked ? 'currentColor' : 'none',
              color: isLiked ? '#000' : undefined,
              stroke: isLiked ? 'none' : undefined,
            }}
            aria-hidden="true"
          />
          <span className="text-sm font-medium">
            {likeCount > 0 ? (
              likeCount >= 1000 ? `${(likeCount / 1000).toFixed(1)}K` : likeCount.toString()
            ) : '0'}
          </span>
        </button>
      </div>

      <button className="flex items-center space-x-2 px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
        <Share className="h-4 w-4" />
        <span className="text-sm font-medium hidden sm:inline">Share</span>
      </button>

      <button className="flex items-center space-x-2 px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
        <Bookmark className="h-4 w-4" />
        <span className="text-sm font-medium hidden sm:inline">Save</span>
      </button>

      <button className="flex items-center space-x-2 px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
        <Download className="h-4 w-4" />
        <span className="text-sm font-medium hidden sm:inline">Download</span>
      </button>

      <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
        <MoreHorizontal className="h-4 w-4" />
      </button>
    </div>
  )
}