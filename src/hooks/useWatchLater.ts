import { useState, useEffect } from 'react'
import { watchLaterApi } from '@/lib/api/api'

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

export const useWatchLater = () => {
  const [videos, setVideos] = useState<WatchLaterVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)

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
          console.error('Error syncing localStorage:', error)
        }
      }

      setVideos(backendVideos)
    } catch (error) {
      console.error('Error fetching watch later videos:', error)
    } finally {
      setLoading(false)
    }
  }

  const removeVideo = async (videoId: string) => {
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
    } catch (error) {
      console.error('Failed to remove video from watch later:', error)
      alert("Failed to remove video from Watch Later")
    } finally {
      setDeletingId(null)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      fetchWatchLaterVideos()
    }
  }, [])

  return {
    videos,
    loading,
    deletingId,
    removeVideo,
    fetchWatchLaterVideos
  }
}