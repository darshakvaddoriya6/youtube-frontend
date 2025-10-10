'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import {
  VideoPlayer,
  ChannelInfo,
  VideoActions,
  VideoDescription,
  CommentsSection,
  RecommendedVideos
} from '@/components/watch'
import { useVideoData } from '@/hooks/useVideoData'

export default function WatchPage() {
  const { id: videoId } = useParams()
  const [newComment, setNewComment] = useState('')

  const {
    video,
    recommended,
    comments,
    currentUser,
    error,
    isSubscribed,
    subscriberCount,
    isLiked,
    likeCount,
    toggleLike,
    handleSubscribeToggle,
    addComment
  } = useVideoData(videoId)

  const handleAddComment = async () => {
    if (!newComment.trim()) return
    await addComment(newComment)
    setNewComment('')
  }

  if (error || !video) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600">{error || 'Video not found'}</p>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 xl:grid-cols-12 lg:grid-cols-4 gap-8">
        {/* Main video section */}
        <div className="xl:col-span-8 lg:col-span-3">
          <VideoPlayer
            videoFile={video.videoFile}
            thumbnail={video.thumbnail}
            title={video.title}
          />

          {/* Channel Info and Actions */}
          <div className="mt-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <ChannelInfo
              owner={video.Owner}
              subscriberCount={subscriberCount}
              isSubscribed={isSubscribed}
              onSubscribeToggle={handleSubscribeToggle}
            />

            <VideoActions
              isLiked={isLiked}
              likeCount={likeCount}
              currentUser={currentUser}
              onToggleLike={toggleLike}
            />
          </div>

          <VideoDescription
            views={video.views || 0}
            createdAt={video.createdAt}
            description={video.description}
          />

          <CommentsSection
            comments={comments}
            currentUser={currentUser}
            newComment={newComment}
            setNewComment={setNewComment}
            onAddComment={handleAddComment}
          />
        </div>

        <RecommendedVideos videos={recommended} />
      </div>
    </div>
  )
}
