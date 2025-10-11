'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import api, { publicApi } from '@/lib/api'

interface ChannelUser {
  _id: string
  username: string
  fullName: string
  avatar: string
  coverImage?: string
  subscribersCount?: number
  channelsSubscribedToCount?: number
  isSubscribed?: boolean
  email?: string
}

interface ChannelVideo {
  _id: string
  title: string
  thumbnail: string
  duration: number
  views: number
  createdAt: string
}

export function useChannelData(username: string) {
  const [user, setUser] = useState<ChannelUser | null>(null)
  const [userVideos, setUserVideos] = useState<ChannelVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)

  const fetchChannelData = async () => {
    if (!username) return
    try {
      setLoading(true)
      setError(null)

      const res = await publicApi.get(`/users/c/${username}`)

      if (res.data?.data) {
        const userData = res.data.data
        setUser(userData)
      } else {
        throw new Error('Invalid response structure')
      }
    } catch (err: any) {
      if (axios.isAxiosError(err)) {  
        if (err.response?.status === 404) setError('Channel not found')
        else setError(err.message)
      } else setError('Failed to load channel')
    } finally {
      setLoading(false)
    }
  }

  const fetchCurrentUser = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      if (!token) return

      const response = await api.get('/users/current-user')
      setCurrentUser(response.data?.data || response.data)
    } catch (error) {
      // Handle error silently
    }
  }

  const fetchUserVideos = async (userId: string) => {
    try {
      const res = await publicApi.get(`/dashboard/videos?userId=${userId}`)

      // Handle the actual response structure
      if (res.data?.statusCode && Array.isArray(res.data.statusCode)) {
        const videosData = res.data.statusCode
        setUserVideos(videosData)
      } else if (res.data?.data && Array.isArray(res.data.data)) {
        const videosData = res.data.data
        setUserVideos(videosData)
      } else {
        setUserVideos([])
      }
    } catch (error) {
      setUserVideos([])
    }
  }

  const handleSubscribeToggle = async () => {
    if (!user || !currentUser) return

    try {
      setIsLoading(true)

      // Call the subscription API
      const response = await api.post(`/subscriptions/c/${user._id}`)

      if (response.data) {
        // Update the user state to reflect the new subscription status
        setUser(prev => prev ? {
          ...prev,
          isSubscribed: !prev.isSubscribed,
          subscribersCount: prev.isSubscribed
            ? (prev.subscribersCount || 0) - 1
            : (prev.subscribersCount || 0) + 1
        } : null)
      }
    } catch (error) {
      // You might want to show a toast notification here
    } finally {
      setIsLoading(false)
    }
  }

  const handleVideoClick = async (videoId: string) => {
    try {
      // Check if user is authenticated before trying to add to history
      const token = localStorage.getItem('accessToken')
      if (token) {
        await api.post('/users/history/add', { videoId })
      }
      // If no token, just continue to video without adding to history
    } catch (err: any) {
      // Silently handle errors - don't redirect to login for video watching
      console.log('Could not add to watch history:', err.message)
    }
  }

  useEffect(() => {
    if (username) {
      fetchChannelData()
      fetchCurrentUser()
    }
  }, [username])

  useEffect(() => {
    if (user?._id) fetchUserVideos(user._id)
  }, [user])

  return {
    user,
    userVideos,
    loading,
    error,
    isLoading,
    currentUser,
    handleSubscribeToggle,
    handleVideoClick
  }
}