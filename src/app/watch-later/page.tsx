

'use client'
import UnauthenticatedPrompt from '@/components/UnauthenticatedPrompt'

import { useState, useEffect } from 'react'
import { Clock, MoreVertical, Play } from 'lucide-react'

const WatchLater = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)


  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    setIsAuthenticated(!!token)
  }, [])

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
  // Mock data for watch later videos - in a real app this would come from an API
  const watchLaterVideos = [
    {
      id: 1,
      title: 'Advanced TypeScript Patterns',
      channel: 'TypeScript Pro',
      thumbnail: '/api/placeholder/160/90',
      duration: '1:05:30',
      addedAt: '2 days ago',
      views: '750K views',
      description: 'Deep dive into advanced TypeScript patterns and best practices...'
    },
    {
      id: 2,
      title: 'Machine Learning Basics',
      channel: 'AI Explained',
      thumbnail: '/api/placeholder/160/90',
      duration: '2:15:45',
      addedAt: '5 days ago',
      views: '1.8M views',
      description: 'Introduction to machine learning concepts and algorithms...'
    },
    {
      id: 3,
      title: 'CSS Grid vs Flexbox',
      channel: 'CSS Masters',
      thumbnail: '/api/placeholder/160/90',
      duration: '18:22',
      addedAt: '1 week ago',
      views: '320K views',
      description: 'When to use CSS Grid vs Flexbox for modern layouts...'
    }
  ]

  return (
    <div className="p-6 max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <Clock className="h-6 w-6 mr-3 text-blue-500" />
          <h1 className="text-2xl font-bold">Watch Later</h1>
        </div>

        <div className="space-y-3">
          {watchLaterVideos.map((video) => (
            <div key={video.id} className="flex items-start space-x-4 p-3 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-40 h-24 object-cover rounded-lg cursor-pointer hover:opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play className="h-6 w-6 text-white bg-black bg-opacity-70 rounded-full p-1" />
                </div>
                <span className="absolute bottom-1 right-1 bg-black bg-opacity-80 text-white text-xs px-1 py-0.5 rounded">
                  {video.duration}
                </span>
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1 cursor-pointer hover:text-blue-600">
                  {video.title}
                </h3>
                <p className="text-gray-600 text-sm mb-1">{video.channel}</p>
                <div className="flex items-center space-x-2 text-gray-500 text-xs mb-2">
                  <span>{video.views}</span>
                  <span>•</span>
                  <span>Added {video.addedAt}</span>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2">{video.description}</p>
              </div>

              <button className="p-1 hover:bg-gray-100 rounded-full">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>

        {watchLaterVideos.length === 0 && (
          <div className="text-center py-12">
            <Clock className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No videos in Watch Later</p>
            <p className="text-gray-400 text-sm mt-1">Videos you add to watch later will appear here</p>
          </div>
        )}
      </div>
  )
}

export default WatchLater
