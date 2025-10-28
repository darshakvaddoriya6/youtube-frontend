import { MoreVertical, Trash2, X } from 'lucide-react'
import Link from 'next/link'
import { formatDuration, formatViews } from '@/lib/utils'

interface WatchLaterVideo {
  _id: string
  title: string
  thumbnail: string
  duration: number
  views: number
  createdAt: string
  owner: {
    username: string
    avatar: string
    fullName: string
  }
}

interface WatchLaterVideoCardProps {
  video: WatchLaterVideo
  onVideoClick: (video: WatchLaterVideo) => void
  onRemoveVideo: (videoId: string) => void
  deletingId: string | null
  activeMenu: string | null
  toggleMenu: (id: string) => void
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 1) return '1 day ago'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`
  return `${Math.floor(diffDays / 30)} months ago`
}

const WatchLaterVideoCard = ({
  video,
  onVideoClick,
  onRemoveVideo,
  deletingId,
  toggleMenu
}: WatchLaterVideoCardProps) => {
  return (
    <div key={video._id}>
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div
          className="relative cursor-pointer mb-3"
          onClick={() => onVideoClick(video)}
        >
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-60 object-cover rounded-lg"
          />
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
            {formatDuration(video.duration)}
          </div>
        </div>

        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3
              className="font-medium text-sm text-gray-900 mb-2 cursor-pointer hover:text-gray-700 line-clamp-2"
              onClick={() => onVideoClick(video)}
            >
              {video.title}
            </h3>
            {video.owner?.username ? (
              <Link
                href={`/channel/${video.owner.username}`}
                className="text-xs text-gray-600 mb-1 hover:text-red-600 block w-fit"
              >
                {video.owner?.fullName || video.owner?.username || "Unknown Channel"}
              </Link>
            ) : (
              <p className="text-xs text-gray-600 mb-1">
                {video.owner?.fullName || video.owner?.username || "Unknown Channel"}
              </p>
            )}
            <div className="flex items-center text-xs text-gray-600">
              <span>{formatViews(video.views)}</span>
              <span className="mx-1">•</span>
              <span>Added {formatDate(video.createdAt)}</span>
            </div>
          </div>

          <div className="relative flex-shrink-0 flex ml-2">
            <button
              onClick={() => onRemoveVideo(video._id)}
              disabled={deletingId === video._id}
              className="p-1 rounded-full hover:bg-red-100 mr-1"
            >
              <X className="h-4 w-4 text-red-600" />
            </button>
            <button
              onClick={() => toggleMenu(video._id)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <MoreVertical className="h-4 w-4 text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex items-start gap-4 group">
        <div
          className="relative flex-shrink-0 cursor-pointer w-60"
          onClick={() => onVideoClick(video)}
        >
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-60 h-40 object-cover rounded-lg"
          />
          <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
            {formatDuration(video.duration)}
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3
            className="font-medium w-fit text-base text-gray-900 mb-1 cursor-pointer hover:text-gray-700 line-clamp-2"
            onClick={() => onVideoClick(video)}
          >
            {video.title}
          </h3>
          {video.owner?.username ? (
            <Link
              href={`/channel/${video.owner.username}`}
              className="text-sm text-gray-600 mb-1 hover:text-red-600 block w-fit"
            >
              {video.owner?.fullName || video.owner?.username || "Unknown Channel"}
            </Link>
          ) : (
            <p className="text-sm text-gray-600 mb-1">
              {video.owner?.fullName || video.owner?.username || "Unknown Channel"}
            </p>
          )}
          <div className="flex items-center text-sm text-gray-600">
            <span>{formatViews(video.views)}</span>
            <span className="mx-2">•</span>
            <span>Added {formatDate(video.createdAt)}</span>
          </div>
        </div>

        <div className="relative flex-shrink-0 flex">
          <button
            onClick={() => onRemoveVideo(video._id)}
            disabled={deletingId === video._id}
            className="p-2 rounded-full hover:bg-red-100 transition-opacity mr-1"
          >
            <Trash2 className="h-5 w-5 text-red-600" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default WatchLaterVideoCard