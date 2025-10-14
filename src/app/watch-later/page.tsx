

'use client'
import UnauthenticatedPrompt from '@/components/UnauthenticatedPrompt'
import { watchLaterApi } from '@/lib/api'
import { useState, useEffect } from 'react'
import { Clock, MoreVertical, Trash2, X } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { formatDuration, formatViews } from '@/lib/utils'
import { WatchLaterSkeleton } from '@/components/skeletons'

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

const WatchLater = () => {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [videos, setVideos] = useState<WatchLaterVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [clearingAll, setClearingAll] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    setIsAuthenticated(!!token)

    if (token) {
      fetchWatchLaterVideos()
    }
  }, [])

  const fetchWatchLaterVideos = async () => {
    try {
      setLoading(true)

      // First, try to get data from backend
      let backendVideos: WatchLaterVideo[] = []
      try {
        const response = await watchLaterApi.getWatchLater()
        backendVideos = response.data.data.watchLater || []
      } catch (error) {
        console.error('Backend API error:', error)
      }

      // Get localStorage data to find videos that might not be synced yet
      const token = localStorage.getItem('accessToken')
      if (token) {
        try {
          // Get current user to build localStorage key
          const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'}/users/current-user`, {
            headers: { 'Authorization': `Bearer ${token}` }
          })

          if (userResponse.ok) {
            const userData = await userResponse.json()
            const currentUser = userData.data

            // Get localStorage watch-later data
            const watchLaterStorage = JSON.parse(localStorage.getItem('watchLaterVideos') || '{}')
            const userKey = currentUser._id || currentUser.username

            // Find video IDs that are saved locally but not in backend response
            const localVideoIds: string[] = []
            Object.keys(watchLaterStorage).forEach(key => {
              if (key.startsWith(`${userKey}_`) && watchLaterStorage[key]) {
                const videoId = key.replace(`${userKey}_`, '')
                const isInBackend = backendVideos.some(v => v._id === videoId)
                if (!isInBackend) {
                  localVideoIds.push(videoId)
                }
              }
            })


            // Fetch video details for locally saved videos that aren't in backend
            if (localVideoIds.length > 0) {
              const localVideos = await Promise.all(
                localVideoIds.map(async (videoId) => {
                  try {
                    const videoResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'}/videos/${videoId}`)
                    if (videoResponse.ok) {
                      const videoData = await videoResponse.json()
                      const video = videoData.statusCode || videoData
                      return {
                        _id: video._id,
                        title: video.title,
                        thumbnail: video.thumbnail,
                        duration: video.duration,
                        views: video.view || video.views || 0,
                        createdAt: video.createdAt,
                        owner: {
                          username: video.owner?.username || video.Owner?.username,
                          avatar: video.owner?.avatar || video.Owner?.avatar,
                          fullName: video.owner?.fullName || video.Owner?.fullName
                        }
                      }
                    }
                    return null
                  } catch (error) {
                    return null
                  }
                })
              )

              // Filter out null values and add to backend videos
              const validLocalVideos = localVideos.filter(v => v !== null) as WatchLaterVideo[]
              backendVideos = [...backendVideos, ...validLocalVideos]
            }
          }
        } catch (error) {
        }
      }

      setVideos(backendVideos)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveVideo = async (videoId: string) => {
    if (!confirm("Remove from Watch Later?")) return

    try {
      setDeletingId(videoId)
      await watchLaterApi.toggleWatchLater(videoId)

      // Remove from localStorage as well
      const token = localStorage.getItem('accessToken')
      if (token) {
        try {
          const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'}/users/current-user`, {
            headers: { 'Authorization': `Bearer ${token}` }
          })

          if (userResponse.ok) {
            const userData = await userResponse.json()
            const currentUser = userData.data
            const userKey = currentUser._id || currentUser.username

            const watchLaterStorage = JSON.parse(localStorage.getItem('watchLaterVideos') || '{}')
            delete watchLaterStorage[`${userKey}_${videoId}`]
            localStorage.setItem('watchLaterVideos', JSON.stringify(watchLaterStorage))
          }
        } catch (error) {
          console.error('Failed to update localStorage:', error)
        }
      }

      setVideos(videos.filter(video => video._id !== videoId))
      setActiveMenu(null)
    } catch (error) {
      console.error('Failed to remove video from watch later:', error)
      alert("Failed to remove video from Watch Later")
    } finally {
      setDeletingId(null)
    }
  }

  const handleClearAll = async () => {
    if (!confirm("Clear all Watch Later videos? This action cannot be undone.")) return

    try {
      setClearingAll(true)
      // Remove all videos one by one
      await Promise.all(videos.map(video => watchLaterApi.toggleWatchLater(video._id)))
      setVideos([])
      setActiveMenu(null)
    } catch (error) {
      alert("Failed to clear Watch Later")
    } finally {
      setClearingAll(false)
    }
  }

  const handleVideoClick = (video: WatchLaterVideo) => {
    router.push(`/watch/${video._id}`)
  }

  const toggleMenu = (id: string) => {
    setActiveMenu(activeMenu === id ? null : id)
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

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <UnauthenticatedPrompt
        pageTitle="Watch Later"
        pageDescription="Save videos to watch later and never miss content you want to see by signing in to your account."
        features={[
          'Save videos to watch later',
          'Access your saved videos anytime',
          'Create and manage playlists',
          'Get personalized recommendations',
          'Continue watching where you left off',
          'Like and comment on videos'
        ]}
      />
    )
  }
  if (loading) {
    return <WatchLaterSkeleton count={6} />
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-3 lg:px-6 py-4 lg:py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Clock className="h-8 w-8 mr-3 text-gray-900" />
            <h1 className="text-3xl font-semibold text-gray-900">Watch Later</h1>
          </div>
        </div>

        {/* Video List */}
        {videos.length > 0 ? (
          <div className="space-y-4 lg:space-y-6">
            {videos.map((video) => (
              <div key={video._id}>
                {/* Mobile Layout */}
                <div className="lg:hidden">
                  <div
                    className="relative cursor-pointer mb-3"
                    onClick={() => handleVideoClick(video)}
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
                        onClick={() => handleVideoClick(video)}
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
                        onClick={() => handleRemoveVideo(video._id)}
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
                    onClick={() => handleVideoClick(video)}
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
                      onClick={() => handleVideoClick(video)}
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
                      onClick={() => handleRemoveVideo(video._id)}
                      disabled={deletingId === video._id}
                      className="p-2 rounded-full hover:bg-red-100 transition-opacity mr-1"
                    >
                      <Trash2 className="h-5 w-5 text-red-600" />
                    </button>
             
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <Clock className="h-20 w-20 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-700 text-xl font-medium">
              Save videos to watch later
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Videos you add to watch later will appear here
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default WatchLater