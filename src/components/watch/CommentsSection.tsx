'use client'

import { useState } from 'react'
import { ThumbsUp } from 'lucide-react'

interface Comment {
  _id: string
  content: string
  owner: {
    _id: string
    username: string
    fullName: string
    avatar: string
  }
  createdAt: string
  likesCount?: number
  isLiked?: boolean
}

interface CommentsSectionProps {
  comments: Comment[]
  currentUser: any
  newComment: string
  setNewComment: (comment: string) => void
  onAddComment: () => Promise<void>
  onToggleCommentLike: (commentId: string, commentOwnerId: string) => Promise<void>
}

export default function CommentsSection({
  comments,
  currentUser,
  newComment,
  setNewComment,
  onAddComment,
  onToggleCommentLike
}: CommentsSectionProps) {
  const [visibleComments, setVisibleComments] = useState(5)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const loadMoreComments = () => {
    setVisibleComments(prev => prev + 10)
  }

  const handleSubmitComment = async () => {
    if (!newComment.trim() || isSubmitting) return

    setIsSubmitting(true)
    try {
      await onAddComment()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mt-8">
      <div className="flex items-center space-x-4 mb-6">
        <h3 className="text-xl font-semibold">
          {comments.length} Comments
        </h3>
        <button className="text-sm text-gray-600 hover:text-gray-800 transition-colors">
          Sort by
        </button>
      </div>

      {/* Add Comment */}
      {currentUser ? (
        <div className="flex space-x-3 mb-6">
          <img
            src={currentUser.avatar || '/default-avatar.png'}
            alt={currentUser.fullName}
            className="w-10 h-10 rounded-full flex-shrink-0"
          />
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-3 border-b-2 border-gray-200 focus:border-blue-500 outline-none resize-none bg-transparent"
              rows={1}
              onFocus={(e) => {
                e.target.rows = 3
              }}
              onBlur={(e) => {
                if (!newComment.trim()) {
                  e.target.rows = 1
                }
              }}
            />
            {newComment.trim() && (
              <div className="flex justify-end space-x-2 mt-2">
                <button
                  onClick={() => setNewComment('')}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim() || isSubmitting}
                  className="px-4 py-2 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? 'Posting...' : 'Comment'}
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center py-6 mb-6 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <div className="text-center">
            <p className="text-gray-600 mb-2">Join the conversation</p>
            <a
              href="/login"
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm rounded-full hover:bg-blue-700 transition-colors"
            >
              Sign in to comment
            </a>
          </div>
        </div>
      )}



      {/* Comments List */}
      {comments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No comments yet</p>
          <p className="text-sm mt-1">Be the first to comment!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.slice(0, visibleComments).map((comment) => (
            <div key={comment._id} className="flex space-x-3">
              <img
                src={comment.owner.avatar || '/default-avatar.png'}
                alt={comment.owner.fullName}
                className="w-10 h-10 rounded-full flex-shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-sm">
                    {comment.owner.fullName}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-800 mb-2">
                  {comment.content}
                </p>
                <div className="flex items-center space-x-4">
                  {currentUser ? (
                    <button
                      onClick={() => onToggleCommentLike(comment._id, comment.owner._id)}
                      className={`flex items-center space-x-1 transition-colors ${comment.isLiked
                        ? 'text-black hover:text-black'
                        : 'text-gray-600 hover:text-gray-800'
                        }`}
                    >
                      <ThumbsUp className={`h-4 w-4 ${comment.isLiked ? 'fill-black' : ''}`} />
                      <span className="text-xs">{comment.likesCount || 0}</span>
                    </button>
                  ) : (
                    <div className="flex items-center space-x-1 text-gray-600">
                      <ThumbsUp className="h-4 w-4" />
                      <span className="text-xs">{comment.likesCount || 0}</span>
                    </div>
                  )}
                  {currentUser && (
                    <button className="text-xs text-gray-600 hover:text-gray-800 transition-colors">
                      Reply
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Show More Comments Button */}
          {comments.length > visibleComments && (
            <div className="text-center pt-4">
              <button
                onClick={loadMoreComments}
                className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-full transition-colors"
              >
                Show more comments
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}