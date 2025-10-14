

'use client'
import UnauthenticatedPrompt from '@/components/UnauthenticatedPrompt'

import { useState, useEffect } from 'react'
import { FolderOpen, MoreVertical, Play, Plus } from 'lucide-react'

const Playlists = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Simulate authentication check - in real app this would check auth state
  useEffect(() => {
    const checkAuth = () => {
      // For demo purposes, assume user is not authenticated
      // In real app, this would check JWT token, auth state, etc.
      setIsAuthenticated(false)
    }

    checkAuth()
  }, [])

  // Show login prompt if not authenticated
  if (!isAuthenticated) {
    return (
      <UnauthenticatedPrompt
        pageTitle="Playlists"
        pageDescription="Create and manage your video playlists by signing in to your account."
        features={[
          'Create unlimited playlists',
          'Organize videos by topic or mood',
          'Share playlists with friends',
          'Access playlists across devices',
          'Collaborate on playlists',
          'Get playlist recommendations'
        ]}
      />
    )
  }
  // Mock data for playlists - in a real app this would come from an API
  const playlists = [
    {
      id: 1,
      title: 'React Tutorials',
      description: 'Collection of React learning videos',
      thumbnail: '/api/placeholder/160/90',
      videoCount: 12,
      lastUpdated: '3 days ago',
      isPublic: true
    },
    {
      id: 2,
      title: 'Music Favorites',
      description: 'My favorite music videos',
      thumbnail: '/api/placeholder/160/90',
      videoCount: 25,
      lastUpdated: '1 week ago',
      isPublic: false
    },
    {
      id: 3,
      title: 'Tech News',
      description: 'Latest technology news and updates',
      thumbnail: '/api/placeholder/160/90',
      videoCount: 8,
      lastUpdated: '2 days ago',
      isPublic: true
    }
  ]

  return (
    <div className="p-6 max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <FolderOpen className="h-6 w-6 mr-3" />
            <h1 className="text-2xl font-bold">Playlists</h1>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            New Playlist
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {playlists.map((playlist) => (
            <div key={playlist.id} className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
              <div className="relative">
                <img
                  src={playlist.thumbnail}
                  alt={playlist.title}
                  className="w-full h-60 object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-t-lg">
                  <Play className="h-8 w-8 text-white" />
                </div>
                <span className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-2 py-1 rounded">
                  {playlist.videoCount} videos
                </span>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-lg hover:text-blue-600">
                    {playlist.title}
                  </h3>
                  <button className="p-1 hover:bg-gray-100 rounded-full">
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>

                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                  {playlist.description}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{playlist.lastUpdated}</span>
                  <span className={`px-2 py-1 rounded ${playlist.isPublic ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {playlist.isPublic ? 'Public' : 'Private'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {playlists.length === 0 && (
          <div className="text-center py-12">
            <FolderOpen className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No playlists yet</p>
            <p className="text-gray-400 text-sm mt-1">Create playlists to organize your favorite videos</p>
          </div>
        )}
      </div>
  )
}

export default Playlists
