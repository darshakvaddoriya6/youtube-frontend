'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import api, { publicApi } from '@/lib/api/api'

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
  const [playlists, setPlaylists] = useState<any[]>([])

  const fetchChannelData = async () => {
    if (!username) return
    try {
      setLoading(true)
      setError(null)

      const res = await publicApi.get(`/users/c/${username}`)

      if (res.data?.data) {
        const userData = res.data.data
        setUser(userData)
        // Fetch user videos and playlists after setting the user
        if (userData._id) {
          await Promise.all([
            fetchUserVideos(userData._id),
            fatchPlaylists()
          ]);
        }
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

  const fatchPlaylists = async () => {
    try {
      if (!user?._id) return;
      const res = await publicApi.get(`playlist/user/${user._id}`);
      const playlistsData = res.data?.statusCode || res.data?.data;
      if (Array.isArray(playlistsData)) {
        const formattedPlaylists = playlistsData.map(playlist => ({
          ...playlist,
          videoCount: playlist.videos?.length || 0,
          firstVideoId: Array.isArray(playlist.videos) && playlist.videos.length > 0 ? playlist.videos[0] : undefined
        }));
        
        setPlaylists(formattedPlaylists);
      } else {
        console.error('Invalid playlists data structure:', res.data);
        setPlaylists([]);
      }
    } catch (error) {
      console.error('Error fetching playlists:', error);
      setPlaylists([]);
    }
  }

  const fetchUserVideos = async (userId: string) => {
    try {
      const res = await publicApi.get(`/dashboard/videos?userId=${userId}`)

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

      const response = await api.post(`/subscriptions/c/${user._id}`)

      if (response.data) {
        setUser(prev => prev ? {
          ...prev,
          isSubscribed: !prev.isSubscribed,
          subscribersCount: prev.isSubscribed
            ? (prev.subscribersCount || 0) - 1
            : (prev.subscribersCount || 0) + 1
        } : null)
      }
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  const handleVideoClick = async (videoId: string) => {
    try {
      const token = localStorage.getItem('accessToken')
      if (token) {
        await api.post('/users/history/add', { videoId })
      }
    } catch (err: any) {
    }
  }

  const handleDeletePlaylist = async (playlistId: string) => {
    const response = await api.delete(`/playlist/${playlistId}`)
    await refetch()
    return response.data
  }


  useEffect(() => {
    if (username) {
      fetchChannelData()
      fetchCurrentUser()
    }
  }, [username])

  useEffect(() => {
    if (user?._id) {
      fatchPlaylists()
    }
  }, [user?._id])

  useEffect(() => {
    if (user?._id) fetchUserVideos(user._id)
  }, [user])


  // Function to refetch all channel data
  const refetch = async () => {
    if (user?._id) {
      await Promise.all([
        fetchChannelData(),
        fetchUserVideos(user._id),
        fatchPlaylists()
      ]);
    }
  };

  return {
    user,
    userVideos,
    playlists,
    loading,
    error,
    isLoading,
    currentUser,
    handleSubscribeToggle,
    handleVideoClick,
    handleDeletePlaylist,
    refetch,
  }
}