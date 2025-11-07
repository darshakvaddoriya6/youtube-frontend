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
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [subscribingChannels, setSubscribingChannels] = useState<Set<string>>(new Set())

  const limit = 4 // show 4 per page

  const fetchSubscriptions = async (pageNumber = 1) => {
    try {
      setLoading(true)
      setError(null)

      const token = localStorage.getItem('accessToken')
      const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/current-user`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!userResponse.ok) throw new Error('Failed to get user info')

      const userData = await userResponse.json()
      const subscriberId = userData.data._id

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/subscriptions/u/${subscriberId}?page=${pageNumber}&limit=${limit}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (!response.ok) throw new Error('Failed to fetch subscriptions')
      const data: ApiResponse = await response.json()
      const newSubs = data.statusCode || []

      // ✅ Merge new subscriptions without duplicates
      setSubscriptions(prev => {
        const existingIds = new Set(prev.map(sub => sub._id))
        const unique = newSubs.filter(sub => !existingIds.has(sub._id))
        return [...prev, ...unique]
      })

      // ✅ Stop when no more data
      if (newSubs.length < limit) setHasMore(false)
    } catch (error) {
      console.error('Error fetching subscriptions:', error)
      setError(error instanceof Error ? error.message : 'Failed to load subscriptions')
    } finally {
      setLoading(false)
    }
  }

  const handleSubscriptionToggle = async (channelId: string) => {
    if (subscribingChannels.has(channelId)) return
    setSubscribingChannels(prev => new Set(prev).add(channelId))

    try {
      const token = localStorage.getItem('accessToken')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscriptions/c/${channelId}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (response.ok) {
        setSubscriptions(prev => prev.filter(s => s.channel._id !== channelId))
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

  useEffect(() => {
    if (isAuthenticated) fetchSubscriptions(page)
  }, [isAuthenticated, page])

  return {
    subscriptions,
    loading,
    error,
    subscribingChannels,
    handleSubscriptionToggle,
    fetchMore: () => {
      if (hasMore && !loading) setPage(p => p + 1)
    },
    hasMore,
  }
}
