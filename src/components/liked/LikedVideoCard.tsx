'use client'

import { useState } from 'react'
import { MoreVertical, ListPlus, Clock, Bookmark, Download, Share2, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

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

interface LikedVideoCardProps {
  likedVideo: LikedVideo
}

export default function LikedVideoCard({ likedVideo }: LikedVideoCardProps) {
  const router = useRouter()
  const video = likedVideo.video

  if (!video) return null

const formatDuration = (seconds: number) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)

  if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`
  } else {
    return `${secs}s`
  }
}


  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M views`
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K views`
    }
    return `${views} views`
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) {
      const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
      if (diffInHours === 0) {
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
        return `${diffInMinutes} minutes ago`
      }
      return `${diffInHours} hours ago`
    } else if (diffInDays === 1) {
      return '1 day ago'
    } else if (diffInDays < 30) {
      return `${diffInDays} days ago`
    } else if (diffInDays < 365) {
      const diffInMonths = Math.floor(diffInDays / 30)
      return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`
    } else {
      const diffInYears = Math.floor(diffInDays / 365)
      return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`
    }
  }

  const handleVideoClick = () => {
    router.push(`/watch/${video._id}`)
  }

  const handleChannelClick = () => {
    router.push(`/channel/${video.owner?.username}`)
  }

  return (
    <>
      {/* Mobile Layout: Video first, then info below */}
      <div className="lg:hidden">
        {/* Video Thumbnail */}
        <div
          className="relative cursor-pointer mb-3"
          onClick={handleVideoClick}
        >
          <div className="relative">
            <img
              src={video.thumbnail || '/api/placeholder/240/135'}
              alt={video.title || 'Video'}
              className="w-full h-60 object-cover rounded-lg"
            />
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
              {video.duration ? formatDuration(video.duration) : "0:00"}
            </div>
          </div>
        </div>

        {/* Video Info Below */}
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3
              className="font-medium text-sm text-gray-900 mb-2 cursor-pointer hover:text-gray-700 line-clamp-2"
              onClick={handleVideoClick}
            >
              {video.title || 'Untitled Video'}
            </h3>
            <p
              className="text-xs text-gray-600 mb-1 cursor-pointer w-fit hover:text-red-600"
              onClick={handleChannelClick}
            >
              {video.owner?.fullName || video.owner?.username || "Unknown Channel"}
            </p>
            <div className="flex items-center text-xs text-gray-600">
              <span>
                {video.views ? formatViews(video.views) : "0 views"}
              </span>
              <span className="mx-1">•</span>
              <span>Liked {formatTimeAgo(likedVideo.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout: Side by side */}
      <div className="hidden lg:flex items-start gap-4 group">
        {/* Thumbnail */}
        <div
          className="relative flex-shrink-0 cursor-pointer w-60"
          onClick={handleVideoClick}
        >
          <div className="relative">
            <img
              src={video.thumbnail || '/api/placeholder/240/135'}
              alt={video.title || 'Video'}
              className="w-60 h-40 object-cover rounded-lg"
            />
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
              {video.duration ? formatDuration(video.duration) : "0:00"}
            </div>
          </div>
        </div>

        {/* Video Info */}
        <div className="flex-1 min-w-0">
          <h3
            className="font-medium w-fit text-base text-gray-900 mb-1 cursor-pointer hover:text-gray-700 line-clamp-2"
            onClick={handleVideoClick}
          >
            {video.title || 'Untitled Video'}
          </h3>
          <p
            className="text-sm text-gray-600 mb-1 cursor-pointer w-fit hover:text-red-600"
            onClick={handleChannelClick}
          >
            {video.owner?.fullName || video.owner?.username || "Unknown Channel"}
          </p>
          <div className="flex items-center text-sm text-gray-600">
            <span>
              {video.views ? formatViews(video.views) : "0 views"}
            </span>
            <span className="mx-1">•</span>
            <span>Liked {formatTimeAgo(likedVideo.createdAt)}</span>
          </div>
        </div>
      </div>
    </>
  )
}