

'use client'
import UnauthenticatedPrompt from '@/components/UnauthenticatedPrompt'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { WatchLaterSkeleton } from '@/components/skeletons'
import {
  WatchLaterHeader,
  WatchLaterVideoCard,
  WatchLaterEmptyState,
  useWatchLater
} from '@/components/watch-later'

interface WatchLaterVideo {
  _id: string
  title: string
  thumbnail: string
  duration: number
  views: number
  createdAt: string
  owner: {
    username: string
    avatar: string
    fullName: string
  }
}

const WatchLater = () => {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const { videos, loading, deletingId, removeVideo } = useWatchLater()
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    setIsAuthenticated(!!token)
    setAuthLoading(false)
  }, [])

  const handleVideoClick = (video: WatchLaterVideo) => {
    router.push(`/watch/${video._id}`)
  }

  const toggleMenu = (id: string) => {
    setActiveMenu(activeMenu === id ? null : id)
  }

  if(authLoading){
    return <WatchLaterSkeleton count={6} />
  }

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <UnauthenticatedPrompt
        pageTitle="Watch Later"
        pageDescription="Save videos to watch later and never miss content you want to see by signing in to your account."
        features={[
          'Save videos to watch later',
          'Access your saved videos anytime',
          'Create and manage playlists',
          'Get personalized recommendations',
          'Continue watching where you left off',
          'Like and comment on videos'
        ]}
      />
    )
  }


  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-3 lg:px-6 py-4 lg:py-8">
        <WatchLaterHeader />

        {videos.length > 0 ? (
          <div className="space-y-4 lg:space-y-6">
            {videos.map((video) => (
              <WatchLaterVideoCard
                key={video._id}
                video={video}
                onVideoClick={handleVideoClick}
                onRemoveVideo={removeVideo}
                deletingId={deletingId}
                activeMenu={activeMenu}
                toggleMenu={toggleMenu}
              />
            ))}
          </div>
        ) : (
          <WatchLaterEmptyState />
        )}
      </div>
    </div>
  )
}

export default WatchLater