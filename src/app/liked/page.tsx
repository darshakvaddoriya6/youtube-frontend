'use client'

import { Loader2 } from 'lucide-react'
import dynamic from 'next/dynamic'
import { useLikedVideos } from '@/hooks/useLikedVideos'
import LikedVideosHeader from '@/components/liked/LikedVideosHeader'
import LikedVideosList from '@/components/liked/LikedVideosList'
import LoadingState from '@/components/liked/LoadingState'
import ErrorState from '@/components/liked/ErrorState'

// Dynamically import the component to avoid SSR issues
const UnauthenticatedPrompt = dynamic(() => import('@/components/UnauthenticatedPrompt'), {
  ssr: false,
  loading: () => <div className="flex items-center justify-center py-12">
    <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
  </div>
})

export default function LikedVideosPage() {
  const { isAuthenticated, likedVideos, loading, error, retryFetch } = useLikedVideos()

  if (loading) {
    return <LoadingState />
  }

  if (error) {
    return <ErrorState error={error} onRetry={retryFetch} />
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
      <div className="max-w-6xl mx-auto px-6 py-8">
        <LikedVideosHeader />
        <LikedVideosList likedVideos={likedVideos} />
      </div>
    </div>
  )
}