'use client'
import { formatDuration, formatViews } from "@/lib/utils"
import { useRouter } from 'next/navigation'

export interface Video {
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

export interface LikedVideo {
  _id: string
  video: Video
  createdAt: string
  updatedAt: string
}

interface LikedVideoCardProps {
  item: LikedVideo
  onVideoClick: (video: Video) => void
  onRemove?: (id: string) => void
  removingId?: string | null
  activeMenu?: string | null
  onToggleMenu?: (id: string) => void
  onCloseMenu?: () => void
}

export default function LikedVideoCard({
  item,
  onVideoClick,
  onRemove,
  removingId,
  activeMenu,
  onToggleMenu,
  onCloseMenu,
}: LikedVideoCardProps) {
  const video = item.video

  if (!video) return null

  const handleVideoClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onVideoClick(video)
  }

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation()
    onRemove?.(item._id)
  }

  const handleMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    onToggleMenu?.(item._id)
  }

  const router = useRouter()
  const handleChannelClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (video.owner?.username) {
      router.push(`/channel/${video.owner.username}`)
    }
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
          </div>
        </div>
      </div>
    </>
  )
}