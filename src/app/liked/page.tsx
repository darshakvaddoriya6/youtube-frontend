'use client'
import { useLikedVideos } from '@/hooks/useLikedVideos'
import LikedVideosHeader from '@/components/liked/LikedVideosHeader'
import LikedVideosList from '@/components/liked/LikedVideosList'
import ErrorState from '@/components/liked/ErrorState'
import UnauthenticatedPrompt from '@/components/UnauthenticatedPrompt'
import { useState, useEffect } from 'react'
import { VideoCardSkeleton } from '@/components/skeletons'
import { groupHistoryByDate } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export default function LikedVideosPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authLoading, setAuthLoading] = useState(true)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('accessToken')
      setIsAuthenticated(!!token)
      setAuthLoading(false)
    }

    checkAuth()
  }, [])

  const { likedVideos, loading, error, retryFetch, removeLikedVideo } = useLikedVideos(isAuthenticated)

  const handleVideoClick = (video: any) => {
    router.push(`/watch/${video._id}`)
  }

  const handleRemoveLikedVideo = async (id: string) => {
    await removeLikedVideo(id)
  }

  const handleToggleMenu = (id: string) => {
    setActiveMenu(activeMenu === id ? null : id)
  }

  const handleCloseMenu = () => {
    setActiveMenu(null)
  }

  if (authLoading || loading) {
    return <VideoCardSkeleton variant="like" count={4} />
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

  const groupedHistory = groupHistoryByDate(likedVideos)

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-3 lg:px-6 py-4 lg:py-8">
        {error ? (
          <ErrorState error={error} onRetry={retryFetch} />
        ) : (
          <>
            <LikedVideosHeader />
            <LikedVideosList
              groupedHistory={groupedHistory}
              onVideoClick={handleVideoClick}
              onRemoveLikedVideo={handleRemoveLikedVideo}
            />
          </>
        )}
      </div>
    </div>
  )
}