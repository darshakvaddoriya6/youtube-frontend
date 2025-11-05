'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Users, ExternalLink } from 'lucide-react'
import ShareModal from './ShareModal'

interface ChannelUser {
  _id: string
  username: string
  fullName: string
  avatar: string
  coverImage?: string
  subscribersCount?: number
  isSubscribed?: boolean
}

interface ChannelHeaderProps {
  user: ChannelUser
  currentUser: any
  isLoading?: boolean
  onSubscribeToggle: () => void
}

export default function ChannelHeader({ user, currentUser, isLoading, onSubscribeToggle }: ChannelHeaderProps) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)

  const channelUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/channel/${user.username}`
    : `/channel/${user.username}`

  const handleShareClick = () => {
    setIsShareModalOpen(true)
  }

  return (
    <>
      {/* Cover Image */}
      <div className="w-full h-32 lg:h-56 xl:h-72 bg-gray-100">
        <img
          src={user.coverImage || '/api/placeholder/1200/400'}
          alt="cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Channel Info Section */}
      <div className="max-w-6xl mx-auto px-3 lg:px-4 xl:px-8 mt-4 lg:mt-6 flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start lg:items-center gap-3 lg:gap-5">
          {/* Avatar */}
          <img
            src={user.avatar}
            alt={user.fullName}
            className="w-20 h-20 lg:w-28 lg:h-28 xl:w-32 xl:h-32 rounded-full object-contain border border-gray-300"
          />

          {/* Channel Details */}
          <div>
            <h1 className="text-xl lg:text-2xl xl:text-3xl font-bold">{user.fullName}</h1>
            <p className="text-sm lg:text-base text-gray-500">@{user.username}</p>
            <p className="text-sm lg:text-base text-gray-600 mt-1">
              {user.subscribersCount} subscriber{user.subscribersCount !== 1 && 's'}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 lg:gap-3 mt-4 lg:mt-0">
          {currentUser ? (
            <button
              onClick={onSubscribeToggle}
              className={`flex items-center gap-1 lg:gap-2 px-4 lg:px-6 py-2 lg:py-2.5 text-sm lg:text-base font-medium rounded-full border transition-all ${
                  user.isSubscribed
                    ? 'bg-gray-200 text-gray-800 hover:bg-gray-300 border-gray-300'
                    : 'bg-red-600 text-white hover:bg-red-700 border-transparent'
                }`}
            >
              <Users className="h-4 w-4 lg:h-5 lg:w-5" />
              <span className="hidden lg:inline">{user.isSubscribed ? 'Unsubscribe' : 'Subscribe'}</span>
              <span className="lg:hidden">{user.isSubscribed ? 'Unsub' : 'Sub'}</span>
            </button>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1 lg:gap-2 px-4 lg:px-6 py-2 lg:py-2.5 text-sm lg:text-base bg-red-600 text-white font-medium rounded-full border border-transparent hover:bg-red-700 transition-all"
            >
              <Users className="h-4 w-4 lg:h-5 lg:w-5" />
              <span className="hidden lg:inline">Sign in to subscribe</span>
              <span className="lg:hidden">Sign in</span>
            </Link>
          )}

          <button
            onClick={handleShareClick}
            className="flex items-center gap-1 lg:gap-2 px-4 lg:px-6 py-2 lg:py-2.5 text-sm lg:text-base bg-gray-100 text-gray-800 font-medium rounded-full border border-gray-300 hover:bg-gray-200 transition-all"
          >
            <ExternalLink className="h-4 w-4 lg:h-5 lg:w-5" />
            <span className="hidden lg:inline">Share</span>
          </button>
        </div>
      </div>

      {/* Horizontal Divider */}
      <div className="border-b border-gray-300 mt-6"></div>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        channelUrl={channelUrl}
        channelName={user.fullName}
      />
    </>
  )
}