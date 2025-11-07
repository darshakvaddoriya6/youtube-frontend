import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MoreVertical, Trash2, Cog, Bookmark, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { playlistApi } from "@/lib/api/api"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import toast from 'react-hot-toast'

interface Video {
  _id: string
}
interface Playlist {
  _id: string
  name: string
  description?: string
  thumbnail?: string
  videoCount?: number
  videos?: Video[]
  owner: User
}

interface User {
  _id: string;
  // Add other user properties as needed
}

interface PlaylistGridProps {
  playlists: Playlist[]
  handleDeletePlaylist: (playlistId: string) => Promise<void>
  currentUser?: User | null
  ownerId: string
}

const PlaylistGrid: React.FC<PlaylistGridProps> = ({ playlists = [], handleDeletePlaylist, currentUser, ownerId }) => {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<{[key: string]: boolean}>({});
  const [savedPlaylists, setSavedPlaylists] = useState<Set<string>>(new Set());
  const isOwner = currentUser && currentUser._id === ownerId;

  // Fetch and initialize saved playlists
  useEffect(() => {
    const fetchSavedPlaylists = async () => {
      if (!currentUser?._id) return;
      
      try {
        const response = await playlistApi.getSavedPlaylists();
        const savedPlaylistIds = response.data.data.savedPlaylists.map((p: Playlist) => p._id);
        setSavedPlaylists(new Set(savedPlaylistIds));
      } catch (error) {
        console.error('Failed to fetch saved playlists:', error);
        // Fallback to local check if API fails
        const userSavedPlaylists = playlists
          .filter(playlist => playlist.owner?._id === currentUser._id)
          .map(playlist => playlist._id);
        setSavedPlaylists(new Set(userSavedPlaylists));
      }
    };

    fetchSavedPlaylists();
  }, [currentUser?._id, playlists]);

  const handleToggleSave = async (e: React.MouseEvent, playlistId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsSaving(prev => ({ ...prev, [playlistId]: true }));
    
    try {
      const response = await playlistApi.toggleSave(playlistId);
      const wasSaved = savedPlaylists.has(playlistId);
      
      // Show toast based on the action
      if (wasSaved) {
        toast.success('Playlist removed from saved');
      } else {
        toast.success('Playlist saved successfully');
      }
      
      // Update the saved playlists state
      setSavedPlaylists(prev => {
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

  const handleDelete = async (e: React.MouseEvent, playlistId: string) => {
    e.preventDefault();
    e.stopPropagation();

    if (!confirm('Are you sure you want to delete this playlist? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(playlistId);
    try {
      await handleDeletePlaylist(playlistId);
      toast.success('Playlist deleted successfully');
    } catch (error: any) {
      console.error('Error deleting playlist:', error);
      const errorMessage = error.response?.data?.message || 'Failed to delete playlist';
      toast.error(errorMessage);
    } finally {
      setIsDeleting(null);
    }
  };



  if (playlists.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-gray-500 text-lg mb-4">No playlists found</div>
        <p className="text-gray-400">This channel hasn't created any playlists yet</p>
      </div>
    )
  }



  return (
    
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-3 lg:px-4 xl:px-8 py-6 lg:py-10">
      {playlists.map((playlist) => (
        <Link
          key={playlist._id}
          href={playlist.videos && playlist.videos.length > 0 ? `/watch/${playlist.videos[0]._id}` : '#'}
          className="group"
        >
          <div className="bg-gray-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="relative aspect-video bg-gray-200">

              {playlist.thumbnail ? (
                <Image
                  src={playlist.thumbnail}
                  alt={playlist.name}
                  fill
                  className="object-cover"
                  unoptimized={true}
                  // unoptimized={process.env.NODE_ENV !== 'production'}
                  // unoptimized={process.env.NODE_ENV !== 'production' || playlist.thumbnail.includes('cloudinary')}
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
                <Link href={`/dashboard/${playlist._id}`} className="w-full">
                  <span
                    onSelect={(e) => e.preventDefault()} className="text-sm">{playlist.videoCount || 0} videos</span>
                </Link>
              </div>
            </div>

            <div className='flex justify-between  items-center w-full'>
              <div className="p-4">
                <h3 className="font-medium text-gray-900 group-hover:text-red-600 transition-colors line-clamp-2">
                  {playlist.name}
                </h3>
                {playlist.description && (
                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                    {playlist.description}
                  </p>
                )}
              </div>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild onClick={(e) => e.preventDefault()}>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Open playlist options"
                    className="p-1.5 hover:bg-black/10 rounded-full mr-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                  >
                    <MoreVertical className="h-5 w-5 text-gray-700 " />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-44" align="end">
                  <DropdownMenuGroup>

                    <DropdownMenuItem 
                      onSelect={(e) => e.preventDefault()}
                      onClick={(e) => handleToggleSave(e, playlist._id)}
                      disabled={isSaving[playlist._id]}
                    >
                      {savedPlaylists.has(playlist._id) ? (
                        <>
                          <Check className="mr-2 h-4 w-4 text-green-500" />
                          <span className="text-green-600">Saved</span>
                        </>
                      ) : (
                        <>
                          <Bookmark className="mr-2 h-4 w-4" />
                          {isSaving[playlist._id] ? 'Saving...' : 'Save Playlist'}
                        </>
                      )}
                    </DropdownMenuItem>

                    {isOwner && (
                      <>
                      <Link href={`/dashboard/${playlist._id}`} className="w-full">
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <Cog className="mr-2 h-4 w-4" />
                          Manage Playlist
                        </DropdownMenuItem>
                      </Link>


                      <DropdownMenuItem
                        className="text-red-600 focus:text-red-700"
                        onClick={(e) => handleDelete(e, playlist._id)}
                        disabled={isDeleting === playlist._id}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        {isDeleting === playlist._id ? 'Deleting...' : 'Delete Playlist'}
                      </DropdownMenuItem>
                    </>
                    )}

                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

            </div>

          </div>
        </Link>
      ))}
    </div>
  )
}

export default PlaylistGrid 
