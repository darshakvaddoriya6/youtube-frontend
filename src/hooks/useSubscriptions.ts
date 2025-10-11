'use client'

import { useState, useEffect } from 'react'

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

export const useSubscriptions = (isAuthenticated: boolean) => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [subscribingChannels, setSubscribingChannels] = useState<Set<string>>(new Set())

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

  // Fetch subscriptions when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchSubscriptions()
    } else {
      setLoading(false)
    }
  }, [isAuthenticated])

  return {
    subscriptions,
    loading,
    error,
    subscribingChannels,
    handleSubscriptionToggle,
    refetchSubscriptions: fetchSubscriptions
  }
}