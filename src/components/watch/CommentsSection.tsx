'use client'

import { useState } from 'react'
import { ThumbsUp, Trash2, Edit2 } from 'lucide-react'

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
  replies?: Comment[]
  parentComment?: string
}

interface CommentsSectionProps {
  comments: Comment[]
  currentUser: any
  newComment: string
  setNewComment: (comment: string) => void
  onAddComment: () => Promise<void>
  onToggleCommentLike: (commentId: string, commentOwnerId: string) => Promise<void>
  onAddReply: (commentId: string, content: string) => Promise<void>
  onUpdateComment: (commentId: string, content: string) => Promise<void>
  onDeleteComment: (commentId: string) => Promise<void>
}

export default function CommentsSection({
  comments,
  currentUser,
  newComment,
  setNewComment,
  onAddComment,
  onToggleCommentLike,
  onAddReply,
  onUpdateComment,
  onDeleteComment
}: CommentsSectionProps) {
  const [visibleComments, setVisibleComments] = useState(5)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState('')
  const [isSubmittingReply, setIsSubmittingReply] = useState(false)
  const [editingComment, setEditingComment] = useState<string | null>(null)
  const [editContent, setEditContent] = useState('')
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(false)
  const [visibleReplies, setVisibleReplies] = useState<{ [key: string]: number }>({})

  const showMoreReplies = (commentId: string) => {
    setVisibleReplies(prev => ({
      ...prev,
      [commentId]: (prev[commentId] || 2) + 5
    }))
  }

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

  const handleSubmitReply = async (commentId: string) => {
    if (!replyContent.trim() || isSubmittingReply) return

    setIsSubmittingReply(true)
    try {
      await onAddReply(commentId, replyContent)
      setReplyContent('')
      setReplyingTo(null)
    } finally {
      setIsSubmittingReply(false)
    }
  }

  const handleCancelReply = () => {
    setReplyingTo(null)
    setReplyContent('')
  }

  const handleStartEdit = (commentId: string, currentContent: string) => {
    setEditingComment(commentId)
    setEditContent(currentContent)
  }

  const handleSubmitEdit = async (commentId: string) => {
    if (!editContent.trim() || isSubmittingEdit) return

    setIsSubmittingEdit(true)
    try {
      await onUpdateComment(commentId, editContent)
      setEditContent('')
      setEditingComment(null)
    } finally {
      setIsSubmittingEdit(false)
    }
  }

  const handleCancelEdit = () => {
    setEditingComment(null)
    setEditContent('')
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
            <CommentItem
              key={comment._id}
              comment={comment}
              currentUser={currentUser}
              onToggleCommentLike={onToggleCommentLike}
              onDeleteComment={onDeleteComment}
              replyingTo={replyingTo}
              setReplyingTo={setReplyingTo}
              replyContent={replyContent}
              setReplyContent={setReplyContent}
              onSubmitReply={handleSubmitReply}
              onCancelReply={handleCancelReply}
              isSubmittingReply={isSubmittingReply}
              editingComment={editingComment}
              editContent={editContent}
              setEditContent={setEditContent}
              onStartEdit={handleStartEdit}
              onSubmitEdit={handleSubmitEdit}
              onCancelEdit={handleCancelEdit}
              isSubmittingEdit={isSubmittingEdit}
              visibleReplies={visibleReplies[comment._id] || 2}
              onShowMoreReplies={() => showMoreReplies(comment._id)}
            />
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

interface CommentItemProps {
  comment: Comment
  currentUser: any
  onToggleCommentLike: (commentId: string, commentOwnerId: string) => Promise<void>
  onDeleteComment: (commentId: string) => Promise<void>
  replyingTo: string | null
  setReplyingTo: (commentId: string | null) => void
  replyContent: string
  setReplyContent: (content: string) => void
  onSubmitReply: (commentId: string) => Promise<void>
  onCancelReply: () => void
  isSubmittingReply: boolean
  editingComment: string | null
  editContent: string
  setEditContent: (content: string) => void
  onStartEdit: (commentId: string, currentContent: string) => void
  onSubmitEdit: (commentId: string) => Promise<void>
  onCancelEdit: () => void
  isSubmittingEdit: boolean
  isReply?: boolean
  visibleReplies?: number
  onShowMoreReplies?: () => void
}

function CommentItem({
  comment,
  currentUser,
  onToggleCommentLike,
  onDeleteComment,
  replyingTo,
  setReplyingTo,
  replyContent,
  setReplyContent,
  onSubmitReply,
  onCancelReply,
  isSubmittingReply,
  editingComment,
  editContent,
  setEditContent,
  onStartEdit,
  onSubmitEdit,
  onCancelEdit,
  isSubmittingEdit,
  isReply = false,
  visibleReplies = 2,
  onShowMoreReplies
}: CommentItemProps) {
  const isReplying = replyingTo === comment._id
  const isEditing = editingComment === comment._id
  const [isDeleting, setIsDeleting] = useState(false)
  const isOwner = currentUser && currentUser._id === comment.owner._id

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this comment?')) {
      return
    }

    setIsDeleting(true)
    try {
      await onDeleteComment(comment._id)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className={`flex space-x-3 ${isReply ? 'ml-12 mt-3' : ''}`}>
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
        {isEditing ? (
          <div className="mb-2">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-lg focus:border-blue-500 outline-none resize-none text-sm"
              rows={2}
            />
            <div className="flex justify-end space-x-2 mt-2">
              <button
                onClick={onCancelEdit}
                className="px-3 py-1 text-xs text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => onSubmitEdit(comment._id)}
                disabled={!editContent.trim() || isSubmittingEdit}
                className="px-3 py-1 bg-blue-600 text-white text-xs rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmittingEdit ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-800 mb-2">
            {comment.content}
          </p>
        )}
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
          {currentUser && !isReply && (
            <button
              onClick={() => setReplyingTo(isReplying ? null : comment._id)}
              className="text-xs text-gray-600 hover:text-gray-800 transition-colors"
            >
              {isReplying ? 'Cancel' : 'Reply'}
            </button>
          )}
          {isOwner && !isEditing && (
            <button
              onClick={() => onStartEdit(comment._id, comment.content)}
              className="flex items-center space-x-1 text-xs text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Edit2 className="h-3 w-3" />
              <span>Edit</span>
            </button>
          )}
          {isOwner && (
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="flex items-center space-x-1 text-xs text-red-600 hover:text-red-800 transition-colors disabled:opacity-50"
            >
              <Trash2 className="h-3 w-3" />
              <span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
            </button>
          )}
        </div>

        {/* Reply Form */}
        {isReplying && currentUser && (
          <div className="mt-3 flex space-x-3">
            <img
              src={currentUser.avatar || '/default-avatar.png'}
              alt={currentUser.fullName}
              className="w-8 h-8 rounded-full flex-shrink-0"
            />
            <div className="flex-1">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder={`Reply to ${comment.owner.fullName}...`}
                className="w-full p-2 border border-gray-200 rounded-lg focus:border-blue-500 outline-none resize-none text-sm"
                rows={2}
              />
              <div className="flex justify-end space-x-2 mt-2">
                <button
                  onClick={onCancelReply}
                  className="px-3 py-1 text-xs text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => onSubmitReply(comment._id)}
                  disabled={!replyContent.trim() || isSubmittingReply}
                  className="px-3 py-1 bg-red-600 text-white text-xs rounded-full hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmittingReply ? 'Replying...' : 'Reply'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-4 space-y-3">
            {comment.replies.slice(0, visibleReplies).map((reply) => (
              <CommentItem
                key={reply._id}
                comment={reply}
                currentUser={currentUser}
                onToggleCommentLike={onToggleCommentLike}
                onDeleteComment={onDeleteComment}
                replyingTo={replyingTo}
                setReplyingTo={setReplyingTo}
                replyContent={replyContent}
                setReplyContent={setReplyContent}
                onSubmitReply={onSubmitReply}
                onCancelReply={onCancelReply}
                isSubmittingReply={isSubmittingReply}
                editingComment={editingComment}
                editContent={editContent}
                setEditContent={setEditContent}
                onStartEdit={onStartEdit}
                onSubmitEdit={onSubmitEdit}
                onCancelEdit={onCancelEdit}
                isSubmittingEdit={isSubmittingEdit}
                isReply={true}
              />
            ))}

            {/* Show More Replies Button */}
            {comment.replies.length > visibleReplies && onShowMoreReplies && (
              <div className="ml-12 mt-2">
                <button
                  onClick={onShowMoreReplies}
                  className="text-xs text-gray-600 hover:text-gray-800 font-medium transition-colors"
                >
                  Show {Math.min(5, comment.replies.length - visibleReplies)} more replies
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}