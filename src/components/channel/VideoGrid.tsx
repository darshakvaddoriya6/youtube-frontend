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

  const formatDuration = (sec: number) => {
    const h = Math.floor(sec / 3600)
    const m = Math.floor((sec % 3600) / 60)
    const s = sec % 60
    return h ? `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}` : `${m}:${s.toString().padStart(2, '0')}`
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
      <h2 className="text-2xl font-semibold mb-6 flex items-center text-gray-900">
        <Play className="h-6 w-6 mr-2 text-red-600" /> Latest Videos
      </h2>

      {videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((v) => (
            <Link
              key={v._id}
              href={`/watch/${v._id}`}
              className="group cursor-pointer"
              onClick={() => onVideoClick(v._id)}
            >
              <div className="relative rounded-xl overflow-hidden bg-gray-100">
                <img src={v.thumbnail} alt={v.title} className="w-full h-48 object-cover rounded-lg" />
                <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {formatDuration(v.duration)}
                </span>
              </div>
              <div className="mt-2">
                <h3 className="font-medium text-gray-900 group-hover:text-red-600 line-clamp-2">{v.title}</h3>
                <p className="text-sm text-gray-500">
                  {formatViews(v.views)} • {new Date(v.createdAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Play className="h-20 w-20 mx-auto text-gray-400 mb-4" />
          <p className="text-xl font-medium text-gray-500 mb-2">No videos uploaded yet</p>
          <p className="text-gray-400">This channel hasn't uploaded any videos yet.</p>
        </div>
      )}
    </div>
  )
}