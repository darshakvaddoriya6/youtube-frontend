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
    isSaved,
    toggleLike,
    handleSubscribeToggle,
    toggleWatchLater,
    addComment,
    addReply,
    toggleCommentLike,
    updateComment,
    deleteComment,
    trackView
  } = useVideoData(videoId)

  const handleAddComment = async () => {
    if (!newComment.trim()) return
    
    try {
      await addComment(newComment)
      setNewComment('')
    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }

  const handleAddReply = async (commentId: string, content: string) => {
    try {
      await addReply(commentId, content)
    } catch (error) {
      console.error('Error adding reply:', error)
    }
  }

  const handleUpdateComment = async (commentId: string, content: string) => {
    try {
      await updateComment(commentId, content)
    } catch (error) {
      console.error('Error updating comment:', error)
    }
  }

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(commentId)
    } catch (error) {
      console.error('Error deleting comment:', error)
    }
  }

  if (error || !video) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600">{error || 'Video not found'}</p>
      </div>
    )
  }

  return (
    <div className="p-3 lg:p-6 max-w-6xl mx-auto">
      {/* Mobile Layout: Video -> Info -> Comments -> Recommended */}
      <div className="lg:hidden">
        {/* Video Player */}
        <VideoPlayer
          videoFile={video.videoFile}
          thumbnail={video.thumbnail}
          title={video.title}
          onTrackView={trackView}
        />

        {/* Channel Info and Actions */}
        <div className="mt-4 flex flex-col gap-4">
          <ChannelInfo
            owner={video.Owner}
            subscriberCount={subscriberCount}
            isSubscribed={isSubscribed}
            onSubscribeToggle={handleSubscribeToggle}
            currentUser={currentUser}
          />

          <VideoActions
            isLiked={isLiked}
            likeCount={likeCount}
            currentUser={currentUser}
            videoId={videoId as string}
            isSaved={isSaved}
            onToggleLike={toggleLike}
            onToggleSave={toggleWatchLater}
          />
        </div>

        {/* Video Description */}
        <VideoDescription
          views={video.views || 0}
          createdAt={video.createdAt}
          description={video.description}
        />

        {/* Comments Section */}
        <CommentsSection
          comments={comments}
          currentUser={currentUser}
          newComment={newComment}
          setNewComment={setNewComment}
          onAddComment={handleAddComment}
          onToggleCommentLike={toggleCommentLike}
          onAddReply={handleAddReply}
          onUpdateComment={handleUpdateComment}
          onDeleteComment={handleDeleteComment}
        />

        {/* Recommended Videos */}
        <div className="mt-6">
          <RecommendedVideos videos={recommended} />
        </div>
      </div>

      {/* Desktop Layout: Side by side */}
      <div className="hidden lg:grid lg:grid-cols-12 gap-8">
        {/* Main video section */}
        <div className="lg:col-span-8">
          <VideoPlayer
            videoFile={video.videoFile}
            thumbnail={video.thumbnail}
            title={video.title}
            onTrackView={trackView}
          />

          {/* Channel Info and Actions */}
          <div className="mt-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <ChannelInfo
              owner={video.Owner}
              subscriberCount={subscriberCount}
              isSubscribed={isSubscribed}
              onSubscribeToggle={handleSubscribeToggle}
              currentUser={currentUser}
            />

            <VideoActions
              isLiked={isLiked}
              likeCount={likeCount}
              currentUser={currentUser}
              videoId={videoId as string}
              isSaved={isSaved}
              onToggleLike={toggleLike}
              onToggleSave={toggleWatchLater}
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
            onToggleCommentLike={toggleCommentLike}
            onAddReply={handleAddReply}
            onUpdateComment={handleUpdateComment}
            onDeleteComment={handleDeleteComment}
          />
        </div>

        <div className="lg:col-span-4">
          <RecommendedVideos videos={recommended} />
        </div>
      </div>
    </div>
  )
}
