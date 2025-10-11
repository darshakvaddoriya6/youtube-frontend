'use client'

import { useParams } from 'next/navigation'
import { useChannelData } from '@/hooks/useChannelData'
import ChannelHeader from '@/components/channel/ChannelHeader'
import VideoGrid from '@/components/channel/VideoGrid'
import LoadingState from '@/components/channel/LoadingState'
import ErrorState from '@/components/channel/ErrorState'

export default function ChannelPage() {
  const params = useParams()
  const username = params?.username as string

  const {
    user,
    userVideos,
    loading,
    error,
    isLoading,
    currentUser,
    handleSubscribeToggle,
    handleVideoClick
  } = useChannelData(username)

  if (loading) return <LoadingState />
  if (error || !user) return <ErrorState error={error} />

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <ChannelHeader
        user={user}
        currentUser={currentUser}
        isLoading={isLoading}
        onSubscribeToggle={handleSubscribeToggle}
      />
      <VideoGrid
        videos={userVideos}
        onVideoClick={handleVideoClick}
      />
    </div>
  )
}
