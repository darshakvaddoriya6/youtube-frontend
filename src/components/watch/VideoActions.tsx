'use client'

import { useState, useRef, useEffect } from 'react'
import { ThumbsUp, Share, Download, MoreHorizontal, Copy, Facebook, Twitter, Bookmark } from 'lucide-react'

interface VideoActionsProps {
  isLiked: boolean
  likeCount: number
  currentUser: any
  videoId: string
  isSaved?: boolean
  onToggleLike: () => void
  onToggleSave?: () => void
}

export default function VideoActions({ 
  isLiked, 
  likeCount, 
  currentUser, 
  videoId,
  isSaved = false,
  onToggleLike,
  onToggleSave
}: VideoActionsProps) {
  const [showShareModal, setShowShareModal] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const [saved, setSaved] = useState(isSaved)
  const [isTogglingSave, setIsTogglingSave] = useState(false)

  // Sync saved state with isSaved prop
  useEffect(() => {
    setSaved(isSaved)
  }, [isSaved])
  const shareModalRef = useRef<HTMLDivElement>(null)
  const shareButtonRef = useRef<HTMLButtonElement>(null)

  // Close modal when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        shareModalRef.current && 
        !shareModalRef.current.contains(event.target as Node) &&
        !shareButtonRef.current?.contains(event.target as Node)
      ) {
        setShowShareModal(false)
      }
    }

    if (showShareModal) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showShareModal])

  const handleShare = () => {
    setShowShareModal(!showShareModal)
  }

  const handleCopyLink = async () => {
    try {
      const currentUrl = window.location.href
      await navigator.clipboard.writeText(currentUrl)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  const handleSocialShare = (platform: string) => {
    const currentUrl = encodeURIComponent(window.location.href)
    const title = encodeURIComponent(document.title)
    
    let shareUrl = ''
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`
        break
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${currentUrl}&text=${title}`
        break
      default:
        return
    }
    
    window.open(shareUrl, '_blank', 'width=600,height=400')
    setShowShareModal(false)
  }

  const handleToggleSave = async () => {
    if (!currentUser || isTogglingSave) return
    
    setIsTogglingSave(true)
    
    try {
      if (onToggleSave) {
        await onToggleSave()
        // Don't manually set saved state here - let the parent component handle it via isSaved prop
      }
    } catch (error) {
      console.error('Error toggling save status:', error)
    } finally {
      setIsTogglingSave(false)
    }
  }



  return (
    <div className="flex items-center flex-wrap gap-2">
      <div className="flex items-center bg-gray-100 rounded-full">
        {currentUser ? (
          <button
            onClick={onToggleLike}
            title={isLiked ? 'Unlike' : 'Like'}
            className={`flex items-center space-x-2 px-3 py-2 hover:bg-gray-200 rounded-full transition-colors ${
              isLiked ? 'text-black' : 'text-black'
            }`}
          >
            <ThumbsUp
              className="h-4 w-4 transition-transform"
              style={{
                fill: isLiked ? 'currentColor' : 'none',
                color: isLiked ? '#000' : undefined,
                stroke: isLiked ? 'none' : undefined,
              }}
              aria-hidden="true"
            />
            <span className="text-sm font-medium">
              {likeCount > 0 ? (
                likeCount >= 1000 ? `${(likeCount / 1000).toFixed(1)}K` : likeCount.toString()
              ) : '0'}
            </span>
          </button>
        ) : (
          <div className="flex items-center space-x-2 px-3 py-2 rounded-full">
            <ThumbsUp className="h-4 w-4" aria-hidden="true" />
            <span className="text-sm font-medium">
              {likeCount > 0 ? (
                likeCount >= 1000 ? `${(likeCount / 1000).toFixed(1)}K` : likeCount.toString()
              ) : '0'}
            </span>
          </div>
        )}
      </div>

      <div className="relative">
        <button 
          ref={shareButtonRef}
          onClick={handleShare}
          className="flex items-center space-x-2 px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <Share className="h-4 w-4" />
          <span className="text-sm font-medium hidden sm:inline">Share</span>
        </button>

        {showShareModal && (
          <div 
            ref={shareModalRef}
            className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-64 z-50"
          >
            <h3 className="text-sm font-semibold mb-3 text-gray-900">Share this video</h3>
            
            <div className="space-y-2">
              <button
                onClick={handleCopyLink}
                className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="p-2 bg-gray-100 rounded-full">
                  <Copy className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium">
                  {copySuccess ? 'Link copied!' : 'Copy link'}
                </span>
              </button>

              <button
                onClick={() => handleSocialShare('facebook')}
                className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="p-2 bg-blue-100 rounded-full">
                  <Facebook className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium">Facebook</span>
              </button>

              <button
                onClick={() => handleSocialShare('twitter')}
                className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="p-2 bg-blue-100 rounded-full">
                  <Twitter className="h-4 w-4 text-blue-400" />
                </div>
                <span className="text-sm font-medium">Twitter</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {currentUser && (
        <button 
          onClick={handleToggleSave}
          disabled={isTogglingSave}
          title={saved ? 'Remove from Watch Later' : 'Save to Watch Later'}
          className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-colors ${
            saved 
              ? 'bg-green-100 text-green-600 hover:bg-green-200' 
              : 'bg-gray-100 hover:bg-gray-200'
          } ${isTogglingSave ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Bookmark 
            className="h-4 w-4 transition-transform"
            style={{
              fill: saved ? 'currentColor' : 'none',
            }}
          />
          <span className="text-sm font-medium hidden sm:inline">
            {isTogglingSave ? 'Saving...' : saved ? 'Saved' : 'Save'}
          </span>
        </button>
      )}

      <button className="flex items-center space-x-2 px-3 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
        <Download className="h-4 w-4" />
        <span className="text-sm font-medium hidden sm:inline">Download</span>
      </button>

      <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
        <MoreHorizontal className="h-4 w-4" />
      </button>
    </div>
  )
}