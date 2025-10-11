'use client'

import Link from 'next/link'
import { Users, ExternalLink } from 'lucide-react'

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
  isLoading: boolean
  onSubscribeToggle: () => void
}

export default function ChannelHeader({ user, currentUser, isLoading, onSubscribeToggle }: ChannelHeaderProps) {
  return (
    <>
      {/* Cover Image */}
      <div className="w-full h-56 md:h-72 lg:h-80 bg-gray-100">
        <img
          src={user.coverImage || '/api/placeholder/1200/400'}
          alt="cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Channel Info Section */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 mt-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-start md:items-center gap-5">
          {/* Avatar */}
          <img
            src={user.avatar}
            alt={user.fullName}
            className="w-28 h-28 md:w-32 md:h-32 rounded-full object-contain border border-gray-300"
          />

          {/* Channel Details */}
          <div>
            <h1 className="text-3xl font-bold">{user.fullName}</h1>
            <p className="text-gray-500">@{user.username}</p>
            <p className="text-gray-600 mt-1">
              {user.subscribersCount} subscriber{user.subscribersCount !== 1 && 's'}
            </p>    
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-6 md:mt-0">
          {currentUser ? (
            <button
              onClick={onSubscribeToggle}
              disabled={isLoading}
              className={`flex items-center gap-2 px-6 py-2.5 font-medium rounded-full border transition-all ${
                isLoading ? 'opacity-50 cursor-not-allowed' :
                user.isSubscribed
                  ? 'bg-gray-200 text-gray-800 hover:bg-gray-300 border-gray-300'
                  : 'bg-red-600 text-white hover:bg-red-700 border-transparent'
              }`}
            >
              <Users className="h-5 w-5" />
              {isLoading ? 'Loading...' : (user.isSubscribed ? 'Unsubscribe' : 'Subscribe')}
            </button>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white font-medium rounded-full border border-transparent hover:bg-red-700 transition-all"
            >
              <Users className="h-5 w-5" />
              Sign in to subscribe
            </Link>
          )}

          <button className="flex items-center gap-2 px-6 py-2.5 bg-gray-100 text-gray-800 font-medium rounded-full border border-gray-300 hover:bg-gray-200 transition-all">
            <ExternalLink className="h-5 w-5" /> Share
          </button>
        </div>
      </div>

      {/* Horizontal Divider */}
      <div className="border-b border-gray-300 mt-6"></div>
    </>
  )
}