'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import UnauthenticatedPrompt from '@/components/UnauthenticatedPrompt'
import SubscriptionsList from '@/components/subscriptions/SubscriptionsList'
import ErrorState from '@/components/subscriptions/ErrorState'
import { useSubscriptions } from '@/hooks/useSubscriptions'
import VideoCardSkeleton from '@/components/skeletons/VideoCardSkeleton'
import { useAuth } from '@/contexts/AuthContext'

const Subscriptions = () => {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { loading: authLoading } = useAuth()

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    setIsAuthenticated(!!token)
  }, [])

  const {
    subscriptions,
    loading,
    error,
    subscribingChannels,
    handleSubscriptionToggle,
    fetchMore,
    hasMore
  } = useSubscriptions(isAuthenticated)

  const handleChannelClick = (username: string) => {
    router.push(`/channel/${username}`)
  }



  // Show loading state while checking auth or initial data loading
  if (authLoading || (isAuthenticated && loading && subscriptions.length === 0)) {
    return (
      <div className="min-h-screen pb-24 flex items-center justify-center">
        <VideoCardSkeleton variant="subscriptions" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <UnauthenticatedPrompt
        pageTitle="Subscriptions"
        pageDescription="Keep up with your favorite channels and creators by signing in."
        features={[
          'Get notified about new videos',
          'Access your personalized feed',
          'Manage your subscriptions',
          'Continue watching where you left off',
        ]}
      />
    )
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-lg lg:text-2xl font-bold mb-3 lg:mb-6 text-gray-900 px-1">
          Subscriptions
        </h1>

        {error ? (
          <ErrorState error={error} />
        ) : (
          <SubscriptionsList
            subscriptions={subscriptions}
            onChannelClick={handleChannelClick}
            onUnsubscribe={handleSubscriptionToggle}
            subscribingChannels={subscribingChannels}
          />
        )}
      </div>
    </div>
  )
}

export default Subscriptions
