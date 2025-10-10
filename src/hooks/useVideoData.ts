'use client'

import { useState, useEffect } from 'react'
import api from '@/lib/api'

interface VideoData {
  _id: string
  title: string
  description: string
  videoFile: string
  thumbnail: string
  duration: number
  views?: number
  view?: number
  isPublished: boolean
  likeCount?: number
  isLiked?: boolean
  Owner: {
    _id: string
    username: string
    fullName: string
    avatar: string
  }
  createdAt: string
}

interface Comment {
  _id: string
  content: string
  owner: {
    _id: string
    username: string
    fullName: string
    avatar: string
  }
  createdAt: string
  likesCount?: number
  isLiked?: boolean
}

export const useVideoData = (videoId: string | string[]) => {
  const [video, setVideo] = useState<VideoData | null>(null)
  const [recommended, setRecommended] = useState<VideoData[]>([])
  const [comments, setComments] = useState<Comment[]>([])
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [subscriberCount, setSubscriberCount] = useState<number | undefined>(undefined)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)

  // Helper functions for localStorage-based like status and count persistence
  const getLikeDataFromStorage = (videoId: string, userId: string) => {
    try {
      const likedVideos = JSON.parse(localStorage.getItem('likedVideos') || '{}')
      const videoLikeData = likedVideos[`${userId}_${videoId}`]

      if (typeof videoLikeData === 'boolean') {
        // Legacy format - just boolean
        return { isLiked: videoLikeData, likeCount: null }
      } else if (typeof videoLikeData === 'object' && videoLikeData !== null) {
        // New format - object with isLiked and likeCount
        return {
          isLiked: videoLikeData.isLiked || false,
          likeCount: videoLikeData.likeCount || null
        }
      }

      return { isLiked: false, likeCount: null }
    } catch {
      return { isLiked: false, likeCount: null }
    }
  }

  const saveLikeDataToStorage = (videoId: string, userId: string, isLiked: boolean, likeCount: number) => {
    try {
      const likedVideos = JSON.parse(localStorage.getItem('likedVideos') || '{}')

      if (isLiked) {
        likedVideos[`${userId}_${videoId}`] = {
          isLiked: true,
          likeCount: likeCount,
          timestamp: Date.now()
        }
      } else {
        delete likedVideos[`${userId}_${videoId}`]
      }

      localStorage.setItem('likedVideos', JSON.stringify(likedVideos))
    } catch (error) {
      // Handle error silently
    }
  }

  const getVideoLikeCountFromStorage = (videoId: string) => {
    try {
      const videoLikeCounts = JSON.parse(localStorage.getItem('videoLikeCounts') || '{}')
      return videoLikeCounts[videoId] || null
    } catch {
      return null
    }
  }

  const saveVideoLikeCountToStorage = (videoId: string, likeCount: number) => {
    try {
      const videoLikeCounts = JSON.parse(localStorage.getItem('videoLikeCounts') || '{}')
      videoLikeCounts[videoId] = likeCount
      localStorage.setItem('videoLikeCounts', JSON.stringify(videoLikeCounts))
    } catch (error) {
      // Handle error silently
    }
  }

  const fetchVideo = async () => {
    try {
      const response = await api.get(`/videos/${videoId}`)
      const v = response.data?.statusCode || response.data

      let videoFileUrl = v?.videoFile
      if (!videoFileUrl && v?.video?.videoFile) {
        videoFileUrl = v.video.videoFile
      }

      if (!v || !videoFileUrl) {
        throw new Error(`Video file not found. Video data: ${JSON.stringify(v)}`)
      }

      setVideo({
        _id: v._id,
        title: v.title,
        description: v.description,
        videoFile: videoFileUrl,
        thumbnail: v.thumbnail,
        duration: v.duration,
        views: v.view || v.views || 0,
        isPublished: v.isPublished,
        likeCount: v.likeCount || 0,
        isLiked: v.isLiked || false,
        Owner: {
          _id: v.owner?._id || v.Owner?._id,
          username: v.owner?.username || v.Owner?.username,
          fullName: v.owner?.fullName || v.Owner?.fullName,
          avatar: v.owner?.avatar || v.Owner?.avatar,
        },
        createdAt: v.createdAt,
      })

      // Get like count from localStorage first, then fallback to backend
      const storedLikeCount = getVideoLikeCountFromStorage(v._id)
      const finalLikeCount = storedLikeCount !== null ? storedLikeCount : (v.likeCount || 0)
      setLikeCount(finalLikeCount)

      // Save the current like count to localStorage for future reference
      saveVideoLikeCountToStorage(v._id, finalLikeCount)

      let userLikeStatus = v.isLiked
      if (userLikeStatus === undefined || userLikeStatus === null) {
        const token = localStorage.getItem('accessToken')
        if (token && currentUser) {
          const likeData = getLikeDataFromStorage(v._id, currentUser._id || currentUser.username)
          userLikeStatus = likeData.isLiked
        } else {
          userLikeStatus = false
        }
      }

      setIsLiked(userLikeStatus || false)
    } catch (err: any) {
      setError(err.message || 'Failed to load video')
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

  const fetchRecommended = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      if (!token) return

      const res = await api.get('/videos')
      const allVideos = res.data?.statusCode || res.data?.data || res.data || []

      if (Array.isArray(allVideos)) {
        setRecommended(allVideos)
      }
    } catch (err: any) {
      // Handle error silently
    }
  }

  const fetchComments = async () => {
    try {
      const response = await api.get(`/comments/${videoId}`)
      const commentsData = response.data?.data || response.data || []
      setComments(Array.isArray(commentsData) ? commentsData : [])
    } catch (error) {
      setComments([])
    }
  }

  const fetchSubscriberCount = async () => {
    try {
      if (!video?.Owner?._id) return

      let subscribersCount = 0
      let isSubscribed = false

      try {
        const currentUserResponse = await api.get('/users/current-user')
        const currentUserId = currentUserResponse.data?.data?._id || currentUserResponse.data?._id

        if (currentUserId) {
          const subscriptionsResponse = await api.get(`/subscriptions/u/${currentUserId}`)
          const subscriptions = subscriptionsResponse.data?.statusCode || subscriptionsResponse.data?.data || []
          isSubscribed = Array.isArray(subscriptions) && subscriptions.some(sub => {
            const channel = sub.channel || sub
            return channel._id === video.Owner._id || channel.username === video.Owner.username
          })
        }
      } catch (error) {
        // Handle error silently
      }

      try {
        const channelResponse = await api.get(`/users/c/${video.Owner.username}`)
        const channelData = channelResponse.data?.data || channelResponse.data
        subscribersCount = channelData?.subscribersCount || channelData?.totalSubscribers || channelData?.subscribers || 0
      } catch (channelError) {
        subscribersCount = 0
      }

      setSubscriberCount(subscribersCount)
      setIsSubscribed(isSubscribed)
    } catch (error) {
      setSubscriberCount(0)
    }
  }

  const toggleLike = async () => {
    if (!currentUser || !video) return

    const previousIsLiked = isLiked
    const previousLikeCount = likeCount

    try {
      // Optimistically update UI
      const newIsLiked = !previousIsLiked
      const newLikeCount = newIsLiked ? previousLikeCount + 1 : Math.max(0, previousLikeCount - 1)

      setIsLiked(newIsLiked)
      setLikeCount(newLikeCount)

      // Save to localStorage immediately for persistence
      saveLikeDataToStorage(video._id, currentUser._id || currentUser.username, newIsLiked, newLikeCount)
      saveVideoLikeCountToStorage(video._id, newLikeCount)

      // Make API call
      const response = await api.post(`/likes/toggle/v/${video._id}`)
      const responseData = response.data?.data || response.data

      if (responseData) {
        // Update with backend response if available
        if (responseData.isLiked !== undefined) {
          const backendLikeCount = responseData.likeCount || newLikeCount
          setIsLiked(responseData.isLiked)
          setLikeCount(backendLikeCount)

          // Update localStorage with backend data
          saveLikeDataToStorage(video._id, currentUser._id || currentUser.username, responseData.isLiked, backendLikeCount)
          saveVideoLikeCountToStorage(video._id, backendLikeCount)
        }
      }
    } catch (error: any) {
      // Revert optimistic update on error
      setIsLiked(previousIsLiked)
      setLikeCount(previousLikeCount)

      // Revert localStorage
      saveLikeDataToStorage(video._id, currentUser._id || currentUser.username, previousIsLiked, previousLikeCount)
      saveVideoLikeCountToStorage(video._id, previousLikeCount)

      alert('Failed to toggle like. Please try again.')
    }
  }

  const handleSubscribeToggle = async () => {
    if (!video?.Owner?._id) return

    try {
      const endpointsToTry = [
        { method: 'POST', url: `/subscriptions/c/${video.Owner._id}` },
        { method: 'POST', url: `/subscription/toggle/${video.Owner._id}` },
        { method: 'POST', url: `/users/${video.Owner._id}/subscribe` },
      ]

      let success = false
      for (const endpoint of endpointsToTry) {
        try {
          await api.post(endpoint.url)
          success = true
          break
        } catch (error) {
          continue
        }
      }

      if (success) {
        const newIsSubscribed = !isSubscribed
        setIsSubscribed(newIsSubscribed)
        setSubscriberCount(prev => newIsSubscribed ? (prev || 0) + 1 : Math.max((prev || 0) - 1, 0))
      }
    } catch (error) {
      alert('Failed to toggle subscription.')
    }
  }

  const addComment = async (content: string) => {
    if (!content.trim() || !currentUser) return

    try {
      const response = await api.post(`/comments/${videoId}`, {
        content: content.trim()
      })

      const newCommentData = response.data?.data || response.data
      if (newCommentData) {
        setComments(prev => [newCommentData, ...prev])
      }
    } catch (error) {
      // Handle error silently
    }
  }

  useEffect(() => {
    if (videoId) {
      fetchVideo()
      fetchCurrentUser()
    }
  }, [videoId])

  useEffect(() => {
    if (currentUser && videoId && video) {
      const likeData = getLikeDataFromStorage(videoId as string, currentUser._id || currentUser.username)
      setIsLiked(likeData.isLiked)

      // If we have stored like count, use it
      if (likeData.likeCount !== null) {
        setLikeCount(likeData.likeCount)
        saveVideoLikeCountToStorage(video._id, likeData.likeCount)
      }
    } else if (!currentUser) {
      setIsLiked(false)
      // Still show the stored like count even if user is not logged in
      const storedLikeCount = getVideoLikeCountFromStorage(videoId as string)
      if (storedLikeCount !== null) {
        setLikeCount(storedLikeCount)
      }
    }
  }, [currentUser, videoId, video])

  useEffect(() => {
    if (video && videoId) {
      fetchRecommended()
      fetchComments()
      fetchSubscriberCount()
    }
  }, [video, videoId])

  return {
    video,
    recommended,
    comments,
    currentUser,
    error,
    isSubscribed,
    subscriberCount,
    isLiked,
    likeCount,
    toggleLike,
    handleSubscribeToggle,
    addComment
  }
}