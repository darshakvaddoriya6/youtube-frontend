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
  const [activeMenu, setActiveMenu] = useState(false)
  const video = likedVideo.video

  if (!video) return null

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
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
    <div className="flex items-start gap-4 group">
      {/* Thumbnail */}
      <div
        className="relative flex-shrink-0 cursor-pointer w-60"
        onClick={handleVideoClick}
      >
        <img
          src={video.thumbnail || '/api/placeholder/240/135'}
          alt={video.title || 'Video'}
          className="w-60 h-36 object-cover rounded-lg hover:opacity-90 transition-opacity"
        />
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-90 text-white text-xs font-semibold px-1.5 py-0.5 rounded">
          {video.duration ? formatDuration(video.duration) : "0:00"}
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

      {/* Menu Button */}
      <div className="relative flex-shrink-0 flex">
        <button
          onClick={() => setActiveMenu(!activeMenu)}
          className="p-2 rounded-full hover:bg-gray-100 transition-opacity"
        >
          <MoreVertical className="h-5 w-5 text-gray-700" />
        </button>

        {/* Dropdown Menu */}
        {activeMenu && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setActiveMenu(false)}
            ></div>
            <div className="absolute right-0 top-10 z-20 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 py-2">
              <button className="w-full px-4 py-2.5 text-left hover:bg-gray-100 flex items-center gap-3 text-sm">
                <ListPlus className="h-5 w-5" />
                <span>Add to queue</span>
              </button>
              <button className="w-full px-4 py-2.5 text-left hover:bg-gray-100 flex items-center gap-3 text-sm">
                <Clock className="h-5 w-5" />
                <span>Save to Watch later</span>
              </button>
              <button className="w-full px-4 py-2.5 text-left hover:bg-gray-100 flex items-center gap-3 text-sm">
                <Bookmark className="h-5 w-5" />
                <span>Save to playlist</span>
              </button>
              <button className="w-full px-4 py-2.5 text-left hover:bg-gray-100 flex items-center gap-3 text-sm">
                <Download className="h-5 w-5" />
                <span>Download</span>
              </button>
              <button className="w-full px-4 py-2.5 text-left hover:bg-gray-100 flex items-center gap-3 text-sm">
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </button>
              <button className="w-full px-4 py-2.5 text-left hover:bg-red-100 flex items-center gap-3 text-sm text-red-600">
                <X className="h-5 w-5" />
                <span>Remove from Liked videos</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}