'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useChannelData } from '@/hooks/useChannelData'
import ChannelHeader from '@/components/channel/ChannelHeader'
import VideoGrid from '@/components/channel/VideoGrid'
import LoadingState from '@/components/channel/LoadingState'
import ErrorState from '@/components/channel/ErrorState'
import PlaylistGrid from '@/components/channel/PlaylistGrid'
import { Plus } from 'lucide-react'
import toast from 'react-hot-toast'
import CreatePlaylistModal from '@/components/channel/CreatePlaylistModal'

export default function ChannelPage() {
  const params = useParams()
  const [isCreatePlaylistModalOpen, setIsCreatePlaylistModalOpen] = useState(false)
  const username = params?.username as string
  const [activeTab, setActiveTab] = useState<'videos' | 'playlists'>('videos')
  const {
    user,
    userVideos,
    loading,
    error,
    isLoading,
    currentUser,
    handleSubscribeToggle,
    handleVideoClick,
    handleDeletePlaylist,
    playlists,
    refetch: refetchChannelData,
  } = useChannelData(username)
  
  const isOwner = currentUser && user && currentUser._id === user._id;

  const handleRefresh = () => {
    refetchChannelData()
  }

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
      <div className="flex flex-wrap max-w-6xl mx-auto justify-start gap-4 px-8 pt-12">
        <button
          onClick={() => setActiveTab('videos')}
          className={`px-6 py-2 rounded-xl transition-colors duration-200 font-medium shadow-sm ${activeTab === 'videos'
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
        >
          Latest Videos
        </button>
        <button
          onClick={() => setActiveTab('playlists')}
          className={`px-6 py-2 rounded-xl transition-colors duration-200 font-medium shadow-sm ${activeTab === 'playlists'
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
        >
          Playlists
        </button>
        {isOwner && (
          <button
            onClick={() => setIsCreatePlaylistModalOpen(true)}
            className="flex items-center space-x-1 lg:space-x-2 px-2 lg:px-4 py-2 hover:bg-green-700 bg-green-600 text-white rounded-full"
          >
            <Plus className="h-4 w-4 lg:h-5 lg:w-5" />
          <span className="text-xs lg:text-sm font-medium hidden lg:inline">Create playlist</span>
        </button>
      )}
        <button
          onClick={handleRefresh}
          title="Refresh data"
          className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl transition-colors duration-200 font-medium shadow-sm bg-gray-100 text-gray-700 hover:bg-gray-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>

      {activeTab === 'videos' ? (
        <VideoGrid
          videos={userVideos}
          onVideoClick={handleVideoClick}
        />
      ) : (
        <PlaylistGrid
          playlists={playlists}
          handleDeletePlaylist={handleDeletePlaylist}
          currentUser={currentUser}
          ownerId={user._id}
        />
      )}

      <CreatePlaylistModal
        isOpen={isCreatePlaylistModalOpen}
        onClose={() => setIsCreatePlaylistModalOpen(false)}
        onPlaylistCreated={() => {
          refetchChannelData();
        }}
      />

    </div>
  )
}
