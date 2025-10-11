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

export function useLikedVideos() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [likedVideos, setLikedVideos] = useState<LikedVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchLikedVideos = async (token: string) => {
    try {
      setError(null)
      console.log('Fetching liked videos with token:', token ? 'Token exists' : 'No token')

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/likes/videos`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      console.log('Response status:', response.status)

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem('accessToken')
          setIsAuthenticated(false)
          throw new Error('Please login again')
        }
        const errorText = await response.text()
        console.error('API Error Response:', errorText)
        throw new Error(`Failed to fetch liked videos (${response.status})`)
      }

      const data = await response.json()
      console.log('Full API Response:', data)

      // Handle the response structure based on ApiResponse format
      let videosArray = []
      if (data && data.data && Array.isArray(data.data)) {
        videosArray = data.data
      } else if (Array.isArray(data)) {
        videosArray = data
      }

      console.log('Processed videos array:', videosArray)
      console.log('Number of liked videos:', videosArray.length)

      setLikedVideos(videosArray)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      console.error('Error fetching liked videos:', err)
    }
  }

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      console.log('Token check:', token ? 'Token exists' : 'No token found')
      setIsAuthenticated(!!token)

      if (token) {
        await fetchLikedVideos(token)
      } else {
        console.log('No token found, user not authenticated')
      }
    } catch (error) {
      console.error('Error checking authentication:', error)
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  const retryFetch = () => {
    const token = localStorage.getItem('accessToken')
    if (token) fetchLikedVideos(token)
  }

  useEffect(() => {
    checkAuth()
  }, [])

  return {
    isAuthenticated,
    likedVideos,
    loading,
    error,
    retryFetch
  }
}