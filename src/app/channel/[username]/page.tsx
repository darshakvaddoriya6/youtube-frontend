'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Users, Play, ExternalLink } from 'lucide-react'
import axios from 'axios'
import api from '@/lib/api'

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

export default function ChannelPage() {
  const params = useParams()
  const username = params?.username as string

  const [user, setUser] = useState<ChannelUser | null>(null)
  const [userVideos, setUserVideos] = useState<ChannelVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchChannelData = async () => {
    if (!username) return
    try {
      setLoading(true)
      setError(null)

      const res = await api.get(`/users/c/${username}`)

      if (res.data?.data) {
        const userData = res.data.data
        setUser(userData)
      } else {
        throw new Error('Invalid response structure')
      }
    } catch (err: any) {
      if (axios.isAxiosError(err)) {  
        if (err.response?.status === 404) setError('Channel not found')
        else if (err.response?.status === 401) window.location.href = '/login'
        else setError(err.message)
      } else setError('Failed to load channel')
    } finally {
      setLoading(false)
    }
  }

  const fetchUserVideos = async (userId: string) => {
    try {
      const res = await api.get(`/dashboard/videos?userId=${userId}`)

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
    if (!user) return

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

  useEffect(() => {
    if (username) fetchChannelData()
  }, [username])

  useEffect(() => {
    if (user?._id) fetchUserVideos(user._id)
  }, [user])

  const formatViews = (views: number) =>
    views >= 1_000_000 ? `${(views / 1_000_000).toFixed(1)}M views`
    : views >= 1_000 ? `${(views / 1_000).toFixed(1)}K views`
    : `${views} views`

  const formatDuration = (sec: number) => {
    const h = Math.floor(sec / 3600)
    const m = Math.floor((sec % 3600) / 60)
    const s = sec % 60
    return h ? `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}` : `${m}:${s.toString().padStart(2, '0')}`
  }

  // ✅ Add to watch history when a user clicks a video
  const handleVideoClick = async (videoId: string) => {
    try {
      await api.post('/users/history/add', { videoId })
      console.log('Video added to history successfully')
    } catch (err: any) {
      console.error('Failed to add video to history:', err)
      // Show user-friendly error message
      if (err.response?.status === 401) {
        console.log('User not authenticated - redirecting to login')
        // Optionally redirect to login or show a toast notification
        // window.location.href = '/login'
      }
    }
  }

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="h-16 w-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4" />
      <p className="text-gray-600">Loading channel...</p>
    </div>
  )

  if (error || !user) return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-white text-gray-700">
      <div className="text-6xl mb-4">⚠️</div>
      <h1 className="text-2xl font-semibold mb-2">Channel Not Found</h1>
      <p className="text-gray-500 mb-4">{error}</p>
      <a href="/" className="text-blue-600 hover:underline">← Back to Home</a>
    </div>
  )

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Cover Image */}
      <div className="w-full h-56 md:h-72 lg:h-80 bg-gray-100">
        <img
          src={user.coverImage || '/api/placeholder/1200/400'}
          alt="cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Channel Info Section */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-start md:items-center gap-5">
          {/* Avatar */}
          <img
            src={user.avatar}
            alt={user.fullName}
            className="w-28 h-28 md:w-32 md:h-32 rounded-full object-contain border border-gray-300"
          />

          {/* Channel Details */}
          <div>
            <h1 className="text-3xl font-bold">{user.fullName}</h1>
            <p className="text-gray-500">@{user.username}</p>
            <p className="text-gray-600 mt-1">
              {user.subscribersCount} subscriber{user.subscribersCount !== 1 && 's'}
            </p>    
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-6 md:mt-0">
          <button
            onClick={handleSubscribeToggle}
            disabled={isLoading}
            className={`flex items-center gap-2 px-6 py-2.5 font-medium rounded-full border transition-all ${
              isLoading ? 'opacity-50 cursor-not-allowed' :
              user.isSubscribed
                ? 'bg-gray-200 text-gray-800 hover:bg-gray-300 border-gray-300'
                : 'bg-red-600 text-white hover:bg-red-700 border-transparent'
            }`}
          >
            <Users className="h-5 w-5" />
            {isLoading ? 'Loading...' : (user.isSubscribed ? 'Unsubscribe' : 'Subscribe')}
          </button>

          <button className="flex items-center gap-2 px-6 py-2.5 bg-gray-100 text-gray-800 font-medium rounded-full border border-gray-300 hover:bg-gray-200 transition-all">
            <ExternalLink className="h-5 w-5" /> Share
          </button>
        </div>
      </div>

      {/* Horizontal Divider */}
      <div className="border-b border-gray-300 mt-6"></div>

      {/* Videos Section */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-10">
        <h2 className="text-2xl font-semibold mb-6 flex items-center text-gray-900">
          <Play className="h-6 w-6 mr-2 text-red-600" /> Latest Videos
        </h2>

        {userVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {userVideos.map((v) => (
              <Link
                key={v._id}
                href={`/watch/${v._id}`}
                className="group cursor-pointer"
                onClick={() => handleVideoClick(v._id)}
              >
                <div className="relative rounded-xl overflow-hidden bg-gray-100">
                  <img src={v.thumbnail} alt={v.title} className="w-full h-48 object-cover rounded-lg" />
                  <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {formatDuration(v.duration)}
                  </span>
                </div>
                <div className="mt-2">
                  <h3 className="font-medium text-gray-900 group-hover:text-red-600 line-clamp-2">{v.title}</h3>
                  <p className="text-sm text-gray-500">
                    {formatViews(v.views)} • {new Date(v.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Play className="h-20 w-20 mx-auto text-gray-400 mb-4" />
            <p className="text-xl font-medium text-gray-500 mb-2">No videos uploaded yet</p>
            <p className="text-gray-400">This channel hasn't uploaded any videos yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
