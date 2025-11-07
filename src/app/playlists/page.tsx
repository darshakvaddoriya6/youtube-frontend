'use client'
import UnauthenticatedPrompt from '@/components/UnauthenticatedPrompt'
import { useState, useEffect } from 'react'
import { FolderOpen, MoreVertical, Play, Plus, Bookmark, Loader2, Cog, BookmarkCheck, RefreshCw } from 'lucide-react'
import { toast } from 'react-hot-toast'
import LoadingState from '@/components/history/LoadingState'
import { playlistApi } from '@/lib/api/api'
import Image from 'next/image'
import Link from 'next/link'

interface Playlist {
  _id: string;
  name: string;
  description?: string;
  thumbnail?: string;
  videoCount?: number;
  isPublic: boolean;
  owner: {
    _id: string;
    username: string;
    avatar?: string;
  };
  lastUpdated?: string;
  videos?: Array<{
    _id: string;
    // Add other video properties as needed
  }>;
}

const Playlists = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [savedPlaylists, setSavedPlaylists] = useState<Playlist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [savedPlaylistIds, setSavedPlaylistIds] = useState<Set<string>>(new Set());
  const [isSaving, setIsSaving] = useState<Record<string, boolean>>({});

  const fetchSavedPlaylists = async () => {
    if (!isAuthenticated) return;
    setIsLoading(true);
    
    setIsLoading(true);
    try {
      const response = await playlistApi.getSavedPlaylists();
      const playlists = response.data.data.savedPlaylists || [];
      setSavedPlaylists(playlists);
      // Initialize saved playlist IDs
      const ids = new Set<string>(playlists.map((p: Playlist) => p._id));
      setSavedPlaylistIds(ids);
    } catch (err: any) {
      setError('Failed to load saved playlists');
      console.error('Error fetching saved playlists:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('accessToken');
      setIsAuthenticated(!!token);
      setAuthLoading(false);
    };

    checkAuth();
    if (isAuthenticated) {
      fetchSavedPlaylists();
    }
  }, [isAuthenticated]);

  const handleToggleSave = async (e: React.MouseEvent, playlistId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast.error('Please sign in to save playlists');
      return;
    }

    setIsSaving(prev => ({ ...prev, [playlistId]: true }));
    
    try {
      const response = await playlistApi.toggleSave(playlistId);
      const wasSaved = savedPlaylistIds.has(playlistId);
      
      // Show toast based on the action
      if (wasSaved) {
        toast.success('Playlist removed from saved');
      } else {
        toast.success('Playlist saved successfully');
      }
      
      // Update the saved playlists state
      setSavedPlaylistIds(prev => {
        const newSet = new Set(prev);
        if (wasSaved) {
          newSet.delete(playlistId);
        } else {
          newSet.add(playlistId);
        }
        return newSet;
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Failed to save playlist';
      toast.error(errorMessage);
    } finally {
      setIsSaving(prev => ({ ...prev, [playlistId]: false }));
    }
  };

  if (authLoading) {
    return <LoadingState />
  }
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

  return (
    <div className="max-w-6xl mx-auto px-3 lg:px-4 xl:px-8 py-6 lg:py-10">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Cog className="h-8 w-8 text-red-600 mr-3" />
          <h1 className="text-2xl font-bold text-gray-900">Your Playlists</h1>
        </div>
        <button 
          onClick={fetchSavedPlaylists}
          disabled={isLoading}
          className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded-full transition-colors"
          title="Refresh playlists"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <div className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5" />
              <span>Refresh</span>
            </div>
          )}
        </button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {isLoading ? (
        <div className="col-span-full flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-red-600" />
        </div>
      ) : savedPlaylists.length > 0 ? (
        savedPlaylists.map(playlist => (
          <div key={playlist._id} className="group">
            <Link
             href={playlist.videos && playlist.videos.length > 0 ? `/watch/${playlist.videos[0]._id}` : '#'}
              className="block"
            >
              <div className="bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="relative aspect-video bg-gray-200">
                  {playlist.thumbnail ? (
                    <Image
                      src={playlist.thumbnail}
                      alt={playlist.name}
                      fill
                      className="object-cover"
                      unoptimized
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = '/placeholder-playlist.jpg';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <span className="text-gray-400 text-4xl">📁</span>
                    </div>
                  )}
                  <div className="absolute bottom-0 right-0 p-3 bg-black/60 text-white font-bold flex items-center space-x-1 rounded-tl-xl">
                    <svg className="w-4 h-4" fill="white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 10h12v2H4zM4 14h12v2H4zM4 6h12v2H4zM18 6h2v10h-2z" />
                    </svg>
                    <span className="text-sm">{(playlist.videoCount ?? playlist.videos?.length ?? 0)} videos</span>
                  </div>
                </div>

                <div className='flex justify-between w-full'>
                  <div className="p-4 flex-1">
                    <div className="flex items-start space-x-3">
                      <h3 className="font-medium text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2 flex-1">
                        {playlist.name}
                      </h3>
                    </div>
                    {playlist.description && (
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                        {playlist.description}
                      </p>
                    )}
                  </div>
                  <div className="p-2 flex items-center">
                    <button 
                      onClick={(e) => handleToggleSave(e, playlist._id)}
                      disabled={isSaving[playlist._id]}
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      {savedPlaylistIds.has(playlist._id) ? (
                        <BookmarkCheck className="h-5 w-5 text-red-600 fill-current" />
                      ) : (
                        <Bookmark className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <Bookmark className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No saved playlists</p>
          <p className="text-gray-400 text-sm mt-1">Save playlists to find them here</p>
        </div>
      )}
      </div>
    </div>
  )
}

export default Playlists
