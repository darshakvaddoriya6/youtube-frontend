'use client'

import { useState, useEffect } from 'react'

interface Video {
  _id: string
  title: string
  description: string
  thumbnail: string
  duration: number
  views: number
  owner: {
    _id: string
    username: string
    fullName: string
  }
  createdAt: string
  updatedAt: string
}

interface LikedVideo {
  _id: string
  video: Video
  createdAt: string
  updatedAt: string
}

export function useLikedVideos(isAuthenticated: boolean) {
  const [likedVideos, setLikedVideos] = useState<LikedVideo[]>([])
  const [loading, setLoading] = useState(isAuthenticated) 
  const [error, setError] = useState<string | null>(null)

  const fetchLikedVideos = async () => {
    try {
      setLoading(true)
      setError(null)

      if (!isAuthenticated) {
        setLikedVideos([])
        return
      }

      const token = localStorage.getItem('accessToken')
      if (!token) {
        setLikedVideos([])
        return
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/likes/videos`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('accessToken')
          throw new Error('Please login again')
        }
        const errorText = await response.text()
        console.error('API Error Response:', errorText)
        throw new Error(`Failed to fetch liked videos (${response.status})`)
      }

      const data = await response.json()

      // Handle the response structure based on ApiResponse format
      let videosArray = []
      if (data && data.data && Array.isArray(data.data)) {
        videosArray = data.data
      } else if (Array.isArray(data)) {
        videosArray = data
      }

      setLikedVideos(videosArray)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      console.error('Error fetching liked videos:', err)
    } finally {
      setLoading(false)
    }
  }

  const retryFetch = () => {
    fetchLikedVideos()
  }

  useEffect(() => {
    fetchLikedVideos()
  }, [isAuthenticated])

  return {
    likedVideos,
    loading,
    error,
    retryFetch
  }
}