'use client'

import { ThumbsUp } from 'lucide-react'
import LikedVideoCard from './LikedVideoCard'

interface Video {
  _id: string
  title: string
  description: string
  thumbnail: string
  duration: number
  views: number
  owner: {
    _id: string
    username: string
    fullName: string
  }
  createdAt: string
  updatedAt: string
}

interface LikedVideo {
  _id: string
  video: Video
  createdAt: string
  updatedAt: string
}

interface LikedVideosListProps {
  likedVideos: LikedVideo[]
}

export default function LikedVideosList({ likedVideos }: LikedVideosListProps) {
  if (likedVideos.length === 0) {
    return (
      <div className="text-center py-20">
        <ThumbsUp className="h-20 w-20 mx-auto text-gray-300 mb-4" />
        <p className="text-gray-700 text-xl font-medium">
          No liked videos yet
        </p>
        <p className="text-gray-500 text-sm mt-2">
          Videos you like will appear here
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {likedVideos.map((likedVideo) => (
        <LikedVideoCard key={likedVideo._id} likedVideo={likedVideo} />
      ))}
    </div>
  )
}