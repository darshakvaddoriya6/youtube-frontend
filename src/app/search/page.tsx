'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Video } from '@/types'
import api from '@/lib/api'

export default function SearchPage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''

  useEffect(() => {
    if (query.trim()) {
      searchVideos(query)
    } else {
      setVideos([])
      setLoading(false)
    }
  }, [query])

  const searchVideos = async (searchQuery: string) => {
    try {
      setLoading(true)
      setError(null)
      const response = await api.get(`/videos/search?query=${encodeURIComponent(searchQuery)}`)

      let videosData = []
      if (response.data && response.data.statusCode && Array.isArray(response.data.statusCode)) {
        videosData = response.data.statusCode
      } else if (response.data && Array.isArray(response.data)) {
        videosData = response.data
      } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
        videosData = response.data.data
      } else {
        videosData = []
      }

      const mappedVideos = videosData.map((video: any) => ({
        _id: video._id,
        title: video.title,
        description: video.description,
        videoFile: video.videoFile,
        thumbnail: video.thumbnail,
        duration: video.duration,
        views: video.views || video.view || 0,
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
      setError('Failed to search videos. Please try again.')
      setVideos([])
    } finally {
      setLoading(false)
    }
  }

  const handleVideoClick = async (videoId: string) => {
    try {
      await api.post('/users/history/add', { videoId })
    } catch (err: any) {
      // Ignore auth errors for history
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
          <p className="mt-4 text-gray-600">Searching videos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-3 lg:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4 lg:mb-6">
          <h1 className="text-lg lg:text-2xl font-semibold text-gray-900">
            Search results for "{query}"
          </h1>
          <p className="text-sm lg:text-base text-gray-600 mt-1">
            {videos.length} {videos.length === 1 ? 'result' : 'results'} found
          </p>
        </div>

        {error && (
          <div className="text-center py-8">
            <p className="text-red-600 text-sm lg:text-base">{error}</p>
            <button
              onClick={() => searchVideos(query)}
              className="mt-4 px-4 py-2 text-sm lg:text-base bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        )}

        <div className="space-y-3 lg:space-y-4">
          {videos.map((video) => (
            <div key={video._id} className="flex flex-col lg:flex-row gap-3 lg:gap-4 p-3 lg:p-4 hover:bg-gray-50 rounded-lg">
              <Link
                href={`/watch/${video._id}`}
                onClick={() => handleVideoClick(video._id)}
                className="flex-shrink-0"
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

              <div className="flex-1 min-w-0">
                <Link
                  href={`/watch/${video._id}`}
                  onClick={() => handleVideoClick(video._id)}
                  className="block"
                >
                  <h3 className="text-base lg:text-lg font-medium text-gray-900 hover:text-red-600 line-clamp-2">
                    {video.title}
                  </h3>
                </Link>
                
                <div className="flex items-center text-xs lg:text-sm text-gray-600 mt-2">
                  <span>{formatViews(video.views)}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center mt-3">
                  <Link
                    href={`/channel/${video.owner.username}`}
                    className="flex items-center hover:opacity-80 transition-opacity"
                  >
                    <img
                      src={video.owner.avatar}
                      alt={video.owner.fullName}
                      className="w-5 h-5 lg:w-6 lg:h-6 rounded-full mr-2"
                    />
                    <span className="text-xs lg:text-sm text-gray-600 hover:text-gray-900">
                      {video.owner.fullName}
                    </span>
                  </Link>
                </div>

                <p className="text-xs lg:text-sm text-gray-600 mt-2 line-clamp-2">
                  {video.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {videos.length === 0 && !loading && !error && query.trim() && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No videos found for "{query}"</p>
            <p className="text-gray-400 mt-2">Try different keywords or check your spelling</p>
          </div>
        )}

        {!query.trim() && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Enter a search term to find videos</p>
          </div>
        )}
      </div>
    </div>
  )
}