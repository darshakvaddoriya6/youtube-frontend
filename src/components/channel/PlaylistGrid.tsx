import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MoreVertical, Plus, Trash2, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
}

interface PlaylistGridProps {
  playlists: Playlist[]
  handleDeletePlaylist: (playlistId: string) => Promise<void>
}

const PlaylistGrid: React.FC<PlaylistGridProps> = ({ playlists = [], handleDeletePlaylist }) => {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (e: React.MouseEvent, playlistId: string) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!confirm('Are you sure you want to delete this playlist? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(playlistId);
    try {
      await handleDeletePlaylist(playlistId);
    } catch (error) {
      console.error('Error deleting playlist:', error);
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
                  // unoptimized={process.env.NODE_ENV !== 'production'}
                  unoptimized={playlist.thumbnail.includes('cloudinary')}
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
                <span className="text-sm">{playlist.videoCount || 0} videos</span>
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
                    <DropdownMenuItem >
                      <Plus className="mr-2 h-4 w-4" />
                      Add Video
                    </DropdownMenuItem>
                    <DropdownMenuItem >
                      <Minus className="mr-2 h-4 w-4" />
                      Remove Video
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600 focus:text-red-700"
                      onClick={(e) => handleDelete(e, playlist._id)}
                      disabled={isDeleting === playlist._id}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      {isDeleting === playlist._id ? 'Deleting...' : 'Delete Playlist'}
                    </DropdownMenuItem>
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
