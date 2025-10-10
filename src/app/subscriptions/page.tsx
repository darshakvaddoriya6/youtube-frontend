
'use client'

import { useState, useEffect } from 'react'
import { Users, Bell, MoreVertical, Play, Loader2, AlertCircle } from 'lucide-react'
import UnauthenticatedPrompt from '@/components/UnauthenticatedPrompt'

interface SubscriptionChannel {
  _id: string
  username: string
  fullName: string
  avatar: string
  coverImage?: string
}

interface Subscription {
  _id: string
  channel: SubscriptionChannel
  createdAt: string
  totalSubscribersCount?: number
}

interface ApiResponse {
  statusCode: Subscription[]
  message: string
  success: boolean
}

const Subscriptions = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [subscribingChannels, setSubscribingChannels] = useState<Set<string>>(new Set())

  // Real authentication check
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('accessToken')
      setIsAuthenticated(!!token)
    }

    checkAuth()
  }, [])

  // Fetch subscriptions when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchSubscriptions()
    } else {
      setLoading(false)
    }
  }, [isAuthenticated])

  const fetchSubscriptions = async () => {
    try {
      setLoading(true)
      setError(null)

      const token = localStorage.getItem('accessToken')
      // First get current user info to get their ID
      const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/current-user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!userResponse.ok) {
        throw new Error('Failed to get user info')
      }

      const userData = await userResponse.json()
      console.log('User data response:', userData)
      const subscriberId = userData.data._id

      // Now fetch subscriptions using the user ID
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscriptions/u/${subscriberId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch subscriptions')
      }

      const data: ApiResponse = await response.json()
      console.log('Subscriptions API response:', data)
      setSubscriptions(data.statusCode || [])
    } catch (error) {
      console.error('Error fetching subscriptions:', error)
      setError(error instanceof Error ? error.message : 'Failed to load subscriptions')
    } finally {
      setLoading(false)
    }
  }

  const handleSubscriptionToggle = async (channelId: string) => {
    if (subscribingChannels.has(channelId)) return // Prevent multiple clicks

    setSubscribingChannels(prev => new Set(prev).add(channelId))

    try {
      const token = localStorage.getItem('accessToken')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscriptions/c/${channelId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        // Refresh subscriptions list
        fetchSubscriptions()
      } else {
        console.error('Failed to toggle subscription')
      }
    } catch (error) {
      console.error('Error toggling subscription:', error)
    } finally {
      setSubscribingChannels(prev => {
        const newSet = new Set(prev)
        newSet.delete(channelId)
        return newSet
      })
    }
  }

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <UnauthenticatedPrompt
        pageTitle="Subscriptions"
        pageDescription="Keep up with your favorite channels and creators by signing in to your account."
        features={[
          'Get notified about new videos',
          'Access your personalized feed',
          'Manage your subscriptions',
          'Continue watching where you left off',
          'Save videos to watch later',
          'Like and comment on videos'
        ]}
      />
    )
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Subscriptions</h1>

      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          <span className="ml-2 text-gray-600">Loading subscriptions...</span>
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center py-12 text-red-600">
          <AlertCircle className="h-6 w-6 mr-2" />
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && (
        <div className="space-y-4">
          {subscriptions.length > 0 ? (
            subscriptions.map((subscription) => {
              // Handle different possible response formats
              const channel = subscription.channel || subscription
              return (
                <div key={subscription._id} className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                  <img
                    src={channel.avatar || '/api/placeholder/40/40'}
                    alt={channel.fullName || channel.username || 'Channel'}
                    className="w-12 h-12 rounded-full flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg text-gray-900 truncate">
                          {channel.fullName || channel.username}
                        </h3>
                        <p className="text-gray-600 text-sm">@{channel.username}</p>
                        <div className="flex items-center space-x-4 text-gray-500 text-sm mt-1">
                          <span>Subscribed {new Date(subscription.createdAt).toLocaleDateString()}</span>
                          {subscription.totalSubscribersCount && (
                            <span>• {subscription.totalSubscribersCount.toLocaleString()} subscribers</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleSubscriptionToggle(channel._id)}
                          disabled={subscribingChannels.has(channel._id)}
                          className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-full hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {subscribingChannels.has(channel._id) ? 'Loading...' : 'Unsubscribe'}
                        </button>
                        <button className="p-2 hover:bg-gray-100 rounded-full">
                          <MoreVertical className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="text-center py-16">
              <Users className="h-20 w-20 mx-auto text-gray-300 mb-4" />
              <p className="text-xl font-medium text-gray-500 mb-2">No subscriptions yet</p>
              <p className="text-gray-400">Subscribe to channels to see their latest videos here</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Subscriptions
