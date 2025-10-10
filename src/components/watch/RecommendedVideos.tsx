'use client'

import Link from 'next/link'

interface VideoData {
  _id: string
  title: string
  description: string
  videoFile: string
  thumbnail: string
  duration: number
  views?: number
  view?: number
  isPublished: boolean
  likeCount?: number
  isLiked?: boolean
  Owner: {
    _id: string
    username: string
    fullName: string
    avatar: string
  }
  createdAt: string
}

interface RecommendedVideosProps {
  videos: VideoData[]
}

const formatDuration = (seconds: number) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`
}

const formatViews = (views: number) => {
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M views`
  if (views >= 1000) return `${(views / 1000).toFixed(1)}K views`
  return `${views} views`
}

export default function RecommendedVideos({ videos }: RecommendedVideosProps) {
  return (
    <div className="xl:col-span-4 lg:col-span-1">
      <h2 className="text-lg font-semibold mb-4">Recommended</h2>
      {videos.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No videos available</p>
        </div>
      ) : (
        <div className="space-y-3">
          {videos.slice(0, 12).map((video) => (
            <Link 
              key={video._id} 
              href={`/watch/${video._id}`} 
              className="flex gap-3 hover:bg-gray-50 rounded-lg p-2 transition-colors"
            >
              <div className="relative flex-shrink-0">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="xl:w-44 xl:h-28 lg:w-36 lg:h-24 w-40 h-24 object-cover rounded-lg"
                />
                <div className="absolute bottom-1 right-1 bg-black bg-opacity-90 text-white text-xs font-semibold px-1.5 py-0.5 rounded">
                  {video.duration ? formatDuration(video.duration) : '0:00'}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm leading-tight line-clamp-2 hover:text-blue-600 mb-1">
                  {video.title}
                </h3>
                <p className="text-xs text-gray-600 mb-1">
                  {video.Owner?.fullName || video.Owner?.username}
                </p>
                <div className="flex items-center text-xs text-gray-500">
                  <span>
                    {video.view || video.views ? formatViews((video.view || video.views)!) : '0 views'}
                  </span>
                  <span className="mx-1">•</span>
                  <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}