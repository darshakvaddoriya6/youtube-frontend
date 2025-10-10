

'use client'
import UnauthenticatedPrompt from '@/components/UnauthenticatedPrompt'

import { useState, useEffect } from 'react'
import { ThumbsUp, MoreVertical, Play } from 'lucide-react'

const LikedVideos = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)


    useEffect(() => {
      const token = localStorage.getItem("accessToken");
      setIsAuthenticated(!!token);
    }, []);

  // Show login prompt if not authenticated
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
  // Mock data for liked videos - in a real app this would come from an API
  const likedVideos = [
    {
      id: 1,
      title: 'Amazing Nature Documentary',
      channel: 'Nature Films',
      thumbnail: '/api/placeholder/160/90',
      duration: '28:45',
      likedAt: '1 day ago',
      views: '500K views',
      description: 'An incredible journey through the world\'s most beautiful landscapes...'
    },
   
  ]

  return (
    <div className="p-6 max-w-6xl mx-auto">
        <div className="flex items-center mb-6">
          <ThumbsUp className="h-6 w-6 mr-3 text-red-500" />
          <h1 className="text-2xl font-bold">Liked Videos</h1>
        </div>

        <div className="space-y-3">
          {likedVideos.map((video) => (
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
                  <span>Liked {video.likedAt}</span>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2">{video.description}</p>
              </div>

              <button className="p-1 hover:bg-gray-100 rounded-full">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>

        {likedVideos.length === 0 && (
          <div className="text-center py-12">
            <ThumbsUp className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No liked videos yet</p>
            <p className="text-gray-400 text-sm mt-1">Videos you like will appear here</p>
          </div>
        )}
      </div>
  )
}

export default LikedVideos
