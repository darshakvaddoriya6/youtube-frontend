'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Video } from '@/types'
import api from '@/lib/api'

export default function HomePage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.get('/videos')

      let videosData = []
      if (response.data && response.data.statusCode && Array.isArray(response.data.statusCode)) {
        videosData = response.data.statusCode
      } else if (response.data && Array.isArray(response.data)) {
        videosData = response.data
      } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
        videosData = response.data.data
      } else if (response.data && response.data.videos && Array.isArray(response.data.videos)) {
        videosData = response.data.videos
      } else {
        videosData = []
      }

      if (videosData.length === 0) {
        videosData = []
      }

      const mappedVideos = videosData.map((video: any) => ({
        _id: video._id,
        title: video.title,
        description: video.description,
        videoFile: video.videoFile,
        thumbnail: video.thumbnail,
        duration: video.duration,
        views: video.views || 0,
        isPublished: video.isPublished,
        owner: {
          _id: video.Owner?._id || video.owner?._id,
          username: video.Owner?.username || video.owner?.username,
          fullName: video.Owner?.fullName || video.owner?.fullName,
          avatar: video.Owner?.avatar || video.owner?.avatar,
        },
        createdAt: video.createdAt,
        updatedAt: video.updatedAt,
      }))

      setVideos(mappedVideos)
    } catch (error) {
      setError('Failed to load videos. Please check if the backend server is running.')
      setVideos([])
    } finally {
      setLoading(false)
    }
  }

  // ✅ Add to watch history when a user clicks a video
  const handleVideoClick = async (videoId: string) => {
    try {
      await api.post('/users/history/add', { videoId })
    } catch (err: any) {
      if (err.response?.status === 401) {
      }
    }
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
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M views`
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K views`
    }
    return `${views} views`
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading videos...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchVideos}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 ml-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map((video) => (
            <Link
              key={video._id}
              href={`/watch/${video._id}`}
              className="group cursor-pointer"
              onClick={() => handleVideoClick(video._id)} // ✅ Add here
            >
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                  {formatDuration(video.duration)}
                </div>
              </div>

              <div className="mt-3">
                <div className="flex items-start space-x-3">
                  <Link
                    href={`/channel/${video.owner.username}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex-shrink-0 hover:opacity-80 transition-opacity"
                  >
                    <img
                      src={video.owner.avatar}
                      alt={video.owner.fullName}
                      className="w-10 h-10 rounded-full"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-red-600">
                      {video.title}
                    </h3>
                    <Link
                      href={`/channel/${video.owner.username}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-sm text-gray-600 mt-1 hover:text-gray-900 transition-colors"
                    >
                      {video.owner.fullName}
                    </Link>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <span>{formatViews(video.views)}</span>
                      <span className="mx-1">•</span>
                      <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {videos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No videos found</p>
            <p className="text-gray-400 mt-2">Be the first to upload a video!</p>
          </div>
        )}
      </div>
    </div>
  )
}
