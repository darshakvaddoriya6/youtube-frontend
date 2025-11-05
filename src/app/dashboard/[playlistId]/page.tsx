"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Video, ListVideo, Trash2, Plus, Check } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/AuthContext"
import { useEffect, useState } from "react"
import { publicApi } from "@/lib/api"
import toast, { Toaster } from 'react-hot-toast'
import { formatDuration as formatVideoDuration, formatViews } from "@/lib/utils"

interface PlaylistVideo {
  _id: string
  title: string
  description: string
  thumbnail: string
  duration: number
  views: number
  createdAt: string
}

interface PlaylistPageProps {
  params: {
    playlistId: string
  }
}

export default function PlaylistPage({ params }: PlaylistPageProps) {
  const { playlistId } = params
  const { user } = useAuth()
  const [videos, setVideos] = useState<PlaylistVideo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [userVideos, setUserVideos] = useState<PlaylistVideo[]>([])
  const [loadingUserVideos, setLoadingUserVideos] = useState(false)
  const [selectedVideos, setSelectedVideos] = useState<Set<string>>(new Set())
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    fetchPlaylistVideos()
    fetchUserVideos()
  }, [playlistId])

  const fetchPlaylistVideos = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await publicApi.get(`/playlist/${playlistId}`);
      if (response.data?.statusCode?.videos) {
        const playlistData = response.data.statusCode;
        setVideos(playlistData.videos);
      } else if (response.data?.videos) {
        setVideos(response.data.videos);
      } else if (response.data?.data?.videos) {
        setVideos(response.data.data.videos);
      } else {
        setVideos([]);
        setError(response.data?.message || 'No videos found in this playlist');
      }
    } catch (error: any) {
      console.error('Error fetching playlist videos:', error);
      const errorMessage = error.response?.data?.message || 'Failed to fetch playlist videos';
      console.error('Error details:', errorMessage);
      setError(errorMessage);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  }

  const handleRemoveFromPlaylist = async (videoId: string) => {
    if (!confirm('Are you sure you want to remove this video from the playlist?')) return

    try {
      setDeletingId(videoId)
      await publicApi.patch(`/playlist/remove/${videoId}/${playlistId}`)
      await fetchPlaylistVideos()
      toast.success('Video removed from playlist')
    } catch (err) {
      console.error('Error removing video from playlist:', err)
      toast.error('Failed to remove video from playlist')
    } finally {
      setDeletingId(null)
    }
  }

  const fetchUserVideos = async () => {
    try {
      setLoadingUserVideos(true);
      const response = await publicApi.get(`/dashboard/videos`);
      const allUserVideos = response.data?.statusCode || [];
      setUserVideos(allUserVideos);
    } catch (error) {
      console.error('Error fetching user videos:', error);
    } finally {
      setLoadingUserVideos(false);
    }
  }

  const handleToggleVideoSelection = (videoId: string) => {
    setSelectedVideos(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(videoId)) {
        newSelection.delete(videoId);
      } else {
        newSelection.add(videoId);
      }
      return newSelection;
    });
  }

  const handleSaveToPlaylist = async () => {
    if (selectedVideos.size === 0) {
      toast.error('Please select at least one video to add.');
      return;
    }

    setIsSaving(true);
    try {
      await Promise.all(
        Array.from(selectedVideos).map(videoId =>
          publicApi.patch(`/playlist/add/${videoId}/${playlistId}`)
        )
      );

      toast.success('Videos added to playlist successfully!');
      setSelectedVideos(new Set());

      await Promise.all([fetchPlaylistVideos(), fetchUserVideos()]);

    } catch (err) {
      console.error('Error adding videos to playlist:', err);
      toast.error('Failed to add videos. Please try again.');
    } finally {
      setIsSaving(false);
    }
  }

  const playlistVideoIds = new Set(videos.map(v => v._id));
  const availableVideos = userVideos.filter(v => !playlistVideoIds.has(v._id));
  
  

  return (
    <>
      <Toaster position="top-right" containerClassName="mt-20" />
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Playlist Management</h1>
          <Link href={`/channel/${user?.username}`}>
            <Button variant="outline">Back to Dashboard</Button>
          </Link>
        </div>

        <Tabs defaultValue="videos" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mb-6">
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <ListVideo className="h-4 w-4" />
              Playlist Videos
            </TabsTrigger>
            <TabsTrigger value="add-video" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Add Videos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="videos" className="space-y-4">
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              </div>
            ) : error ? (
              <div className="text-red-500 text-center py-4">{error}</div>
            ) : videos.length === 0 ? (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <p className="text-gray-500">No videos in this playlist yet.</p>
                <p className="text-sm text-gray-400 mt-2">Add videos to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {videos.map((video) => (
                  <div key={video._id} className="group flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="relative flex-shrink-0 w-60 h-40 bg-gray-200 rounded-md overflow-hidden">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1 rounded">
                        {formatVideoDuration(video.duration || 0)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm text-gray-900 line-clamp-2">
                        {video.title}
                      </h3>
                      <div className="text-xs text-gray-600 mt-1">
                        <span>{video.views ? formatViews(video.views) : '0 views'}</span>
                        <span className="mx-1">•</span>
                        <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                      </div>
                      {video.description && (
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                          {video.description}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleRemoveFromPlaylist(video._id)}
                      disabled={deletingId === video._id}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-full hover:bg-gray-200"
                      title="Remove from playlist"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="add-video" className="space-y-4">
            {loadingUserVideos ? (
              <div className="flex justify-center py-8"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div></div>
            ) : availableVideos.length === 0 ? (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <p className="text-gray-500">All your videos are already in this playlist.</p>
              </div>
            ) : (
              <div>
                <div className="space-y-4">
                  {availableVideos.map((video) => (
                    <div
                      key={video._id}
                      onClick={() => handleToggleVideoSelection(video._id)}
                      className={`group flex items-start gap-4 p-3 rounded-lg transition-colors cursor-pointer ${selectedVideos.has(video._id) ? 'bg-blue-50 border-blue-500' : 'hover:bg-gray-50'
                        }`}>
                      <div className="flex items-center justify-center h-full pr-4">
                        <div className={`w-5 h-5 rounded-sm flex items-center justify-center border-2 transition-all ${selectedVideos.has(video._id) ? 'bg-blue-600 border-blue-600' : 'border-gray-400'
                          }`}>
                          {selectedVideos.has(video._id) &&
                            <Check className="h-4 w-4 text-white" />
                          }
                        </div>
                      </div>
                      <div className="relative flex-shrink-0 w-60 h-40 bg-gray-200 rounded-md overflow-hidden">
                        <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                        <div className="absolute bottom-1 right-1 bg-black/80 text-white text-[10px] px-1 rounded">
                          {formatVideoDuration(video.duration || 0)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm text-gray-900 line-clamp-2">{video.title}</h3>
                        <div className="text-xs text-gray-600 mt-1">
                          <span>{formatViews(video.views || 0)}</span>
                          <span className="mx-1">•</span>
                          <span>{new Date(video.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex justify-end">
                  <Button onClick={handleSaveToPlaylist} disabled={isSaving || selectedVideos.size === 0}>
                    {isSaving ? 'Saving...' : `Add ${selectedVideos.size} Video(s)`}
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
