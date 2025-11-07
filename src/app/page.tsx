'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Video } from '@/types'
import api, { publicApi } from '@/lib/api/api'

export default function HomePage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const limit = 6 // ✅ how many videos per page

  useEffect(() => {
    fetchVideos(page)
  }, [page])

  useEffect(() => {
    // ✅ Detect when user reaches bottom
    const handleScroll = () => {
      if (loading || !hasMore) return
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) {
        setPage((prev) => prev + 1)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loading, hasMore])

  const fetchVideos = async (pageNumber: number) => {
    try {
      setLoading(true)
      setError(null)

      const response = await publicApi.get(`/videos?page=${pageNumber}&limit=${limit}`)
      let videosData: any[] = []

      // ✅ handle backend data structure
      if (response.data?.statusCode && Array.isArray(response.data.statusCode)) {
        videosData = response.data.statusCode
      } else if (Array.isArray(response.data?.data)) {
        videosData = response.data.data
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

      // ✅ Append instead of replace
      setVideos((prev) => [...prev, ...mappedVideos])

      // ✅ Check if more videos exist
      if (videosData.length < limit) {
        setHasMore(false)
      }
    } catch (error) {
      setError('Failed to load videos. Please check backend.')
    } finally {
      setLoading(false)
    }
  }

  const handleVideoClick = async (videoId: string) => {
    try {
      const token = localStorage.getItem('accessToken')
      if (token) {
        await api.post('/users/history/add', { videoId })
      }
    } catch {}
  }

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = Math.floor(seconds % 60)
    if (hours > 0) return `${hours}h ${minutes}m ${secs}s`
    if (minutes > 0) return `${minutes}m ${secs}s`
    return `${secs}s`
  }

  const formatViews = (views: number) => {
    if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M views`
    if (views >= 1000) return `${(views / 1000).toFixed(1)}K views`
    return `${views} views`
  }

  return (
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

      {/* ✅ Loading skeletons */}
      {loading && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 mt-6">
          {Array.from({ length: limit }).map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-200 h-60 rounded-lg"></div>
          ))}
        </div>
      )}

      {!hasMore && videos.length > 0 && (
        <div className="text-center text-gray-500 py-6">No more videos to load</div>
      )}

      {videos.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No videos found</p>
          <p className="text-gray-400 mt-2">Be the first to upload a video!</p>
        </div>
      )}
    </div>
  )
}
