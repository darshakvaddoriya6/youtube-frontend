'use client'

import Link from 'next/link'
import { Play } from 'lucide-react'

interface ChannelVideo {
  _id: string
  title: string
  thumbnail: string
  duration: number
  views: number
  createdAt: string
}

interface VideoGridProps {
  videos: ChannelVideo[]
  onVideoClick: (videoId: string) => void
}

export default function VideoGrid({ videos, onVideoClick }: VideoGridProps) {

  const formatViews = (views: number) =>
    views >= 1_000_000 ? `${(views / 1_000_000).toFixed(1)}M views`
      : views >= 1_000 ? `${(views / 1_000).toFixed(1)}K views`
        : `${views} views`

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


  return (
    <div className="max-w-6xl mx-auto px-3 lg:px-4 xl:px-8 py-6 lg:py-10">
      {videos.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3  gap-4 lg:gap-6">
          {videos.map((v) => (
            <Link
              key={v._id}
              href={`/watch/${v._id}`}
              className="group cursor-pointer"
              onClick={() => onVideoClick(v._id)}
            >
              <div className="relative rounded-xl overflow-hidden bg-gray-100">
                <img src={v.thumbnail} alt={v.title} className="w-full h-60 object-cover rounded-lg" />
                <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {formatDuration(v.duration)}
                </span>
              </div>
              <div className="mt-2">
                <h3 className="text-sm lg:text-base font-medium text-gray-900 group-hover:text-red-600 line-clamp-2">{v.title}</h3>
                <p className="text-xs lg:text-sm text-gray-500">
                  {formatViews(v.views)} • {new Date(v.createdAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 lg:py-16">
          <Play className="h-16 w-16 lg:h-20 lg:w-20 mx-auto text-gray-400 mb-4" />
          <p className="text-lg lg:text-xl font-medium text-gray-500 mb-2">No videos uploaded yet</p>
          <p className="text-sm lg:text-base text-gray-400">This channel hasn't uploaded any videos yet.</p>
        </div>
      )}
    </div>
  )
}