'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Video } from '@/types'
import api, { publicApi } from '@/lib/api'
import { VideoCardSkeleton } from '@/components/skeletons'

export default function HomePage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [, setLastUpdated] = useState<Date | null>(null)

  useEffect(() => {
    fetchVideos()

    // Refresh videos when user returns to the page (e.g., from watching a video)
    const handleFocus = () => {
      fetchVideos()
    }

    window.addEventListener('focus', handleFocus)

    // Also refresh when the page becomes visible again
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchVideos()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      window.removeEventListener('focus', handleFocus)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  const fetchVideos = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await publicApi.get('/videos')

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
        views: video.views || video.view || 0, // Handle both field names
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
      setLastUpdated(new Date())
    } catch (error) {
      setError('Failed to load videos. Please check if the backend server is running.')
      setVideos([])
    } finally {
      setLoading(false)
    }
  }

  // ✅ Add to watch history when a user clicks a video (only if authenticated)
  const handleVideoClick = async (videoId: string) => {
    try {
      // Check if user is authenticated before trying to add to history
      const token = localStorage.getItem('accessToken')
      if (token) {
        await api.post('/users/history/add', { videoId })
      }
    } catch (err: any) {
    }
  }
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

  if (loading) {
    return (
      <div className="p-3 lg:p-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            <VideoCardSkeleton variant="grid" count={12} />
          </div>
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
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-3 lg:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {videos.map((video) => (
            <div key={video._id} className="group cursor-pointer">
              <Link
                href={`/watch/${video._id}`}
                onClick={() => handleVideoClick(video._id)}
                className="block"
              >
                <div className="relative">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-60 object-cover rounded-lg"
                  />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    {formatDuration(video.duration)}
                  </div>
                </div>
              </Link>

              <div className="mt-3">
                <div className="flex items-start space-x-3">
                  <Link
                    href={`/channel/${video.owner.username}`}
                    className="flex-shrink-0 hover:opacity-80 transition-opacity"
                  >
                    <img
                      src={video.owner.avatar}
                      alt={video.owner.fullName}
                      className="w-8 h-8 lg:w-10 lg:h-10 rounded-full"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/watch/${video._id}`}
                      onClick={() => handleVideoClick(video._id)}
                      className="block"
                    >
                      <h3 className="text-sm lg:text-base font-medium text-gray-900 line-clamp-2 group-hover:text-red-600">
                        {video.title}
                      </h3>
                    </Link>
                    <Link
                      href={`/channel/${video.owner.username}`}
                      className="text-xs lg:text-sm text-gray-600 mt-1 hover:text-gray-900 transition-colors"
                    >
                      {video.owner.fullName}
                    </Link>
                    <div className="flex items-center text-xs lg:text-sm text-gray-600 mt-1">
                      <span className="font-medium">{formatViews(video.views)}</span>
                      <span className="mx-1">•</span>
                      <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
