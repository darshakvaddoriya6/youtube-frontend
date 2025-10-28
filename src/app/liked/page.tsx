'use client'
import { useLikedVideos } from '@/hooks/useLikedVideos'
import LikedVideosHeader from '@/components/liked/LikedVideosHeader'
import LikedVideosList from '@/components/liked/LikedVideosList'
import LoadingState from '@/components/liked/LoadingState'
import ErrorState from '@/components/liked/ErrorState'
import UnauthenticatedPrompt from '@/components/UnauthenticatedPrompt'
import { useState, useEffect } from 'react'


export default function LikedVideosPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('accessToken')
      setIsAuthenticated(!!token)
      setAuthLoading(false)
    }

    checkAuth()
  }, [])

  const { likedVideos, loading, error, retryFetch } = useLikedVideos(isAuthenticated)

  if (authLoading) {
    return <LoadingState />
  }

  if (!isAuthenticated) {
    return (
      <UnauthenticatedPrompt
        pageTitle="Liked Videos"
        pageDescription="Keep track of all your favorite videos in one place by signing in to your account."
        features={[
          'Access all your liked videos',
          'Create and manage playlists',
          'Get personalized recommendations',
          'Continue watching where you left off',
          'Save videos to watch later',
          'Share videos with friends'
        ]}
      />
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-3 lg:px-6 py-4 lg:py-8">
        {loading && <LoadingState />}
        {error && <ErrorState error={error} onRetry={retryFetch} />}

        {!loading && !error && (
          <LikedVideosHeader />
        )}
        {!loading && !error && (
        <LikedVideosList likedVideos={likedVideos} />
        )}

      </div>
    </div>
  )
}