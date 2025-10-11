
'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import UnauthenticatedPrompt from '@/components/UnauthenticatedPrompt'
import SubscriptionsList from '@/components/subscriptions/SubscriptionsList'
import LoadingState from '@/components/subscriptions/LoadingState'
import ErrorState from '@/components/subscriptions/ErrorState'
import { useSubscriptions } from '@/hooks/useSubscriptions'

const Subscriptions = () => {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Real authentication check
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('accessToken')
      setIsAuthenticated(!!token)
    }

    checkAuth()
  }, [])

  const {
    subscriptions,
    loading,
    error,
    subscribingChannels,
    handleSubscriptionToggle
  } = useSubscriptions(isAuthenticated)

  const handleChannelClick = (username: string) => {
    router.push(`/channel/${username}`)
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

      {loading && <LoadingState />}
      {error && <ErrorState error={error} />}
      {!loading && !error && (
        <SubscriptionsList
          subscriptions={subscriptions}
          onChannelClick={handleChannelClick}
          onUnsubscribe={handleSubscriptionToggle}
          subscribingChannels={subscribingChannels}
        />
      )}
    </div>
  )
}

export default Subscriptions
