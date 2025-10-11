'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Bell, ChevronDown, User } from 'lucide-react'

interface Owner {
  _id: string
  username: string
  fullName: string
  avatar: string
}

interface ChannelInfoProps {
  owner: Owner
  subscriberCount?: number
  isSubscribed: boolean
  onSubscribeToggle: () => void
  currentUser?: any
}

export default function ChannelInfo({ 
  owner, 
  subscriberCount, 
  isSubscribed, 
  onSubscribeToggle,
  currentUser
}: ChannelInfoProps) {
  const [showSubscribeDropdown, setShowSubscribeDropdown] = useState(false)
  const [notificationPreference, setNotificationPreference] = useState('all')

  const handleNotificationChange = (preference: string) => {
    setNotificationPreference(preference)
    setShowSubscribeDropdown(false)
  }

  const handleUnsubscribe = async () => {
    await onSubscribeToggle()
    setShowSubscribeDropdown(false)
  }

  return (
    <div className="flex items-center space-x-4">
      <Link href={`/channel/${owner.username}`} className="flex-shrink-0">
        <img
          src={owner.avatar}
          alt={owner.fullName}
          className="w-10 h-10 rounded-full hover:opacity-80 transition-opacity"
        />
      </Link>

      <div className="flex flex-col">
        <Link
          href={`/channel/${owner.username}`}
          className="text-base font-semibold text-gray-900 hover:text-blue-600 transition-colors"
        >
          {owner.fullName}
        </Link>
        <span className="text-sm text-gray-600">
          {subscriberCount !== undefined
            ? `${subscriberCount.toLocaleString()} subscriber${subscriberCount === 1 ? '' : 's'}`
            : 'Subscribers count unavailable'}
        </span>
      </div>

      {/* Subscribe Button with Dropdown - Only show if user is logged in */}
      {currentUser && (
        <div className="relative">
          {isSubscribed ? (
            <button
              className="flex items-center space-x-2 px-4 py-2 bg-white text-gray-800 hover:bg-gray-100 rounded-full border border-gray-300 transition-all shadow-sm"
              onClick={() => setShowSubscribeDropdown(!showSubscribeDropdown)}
            >
              <Bell className="h-4 w-4" />
              <ChevronDown className="h-4 w-4" />
            </button>
          ) : (
            <button
              className="flex items-center space-x-2 px-4 py-2 bg-black text-white hover:bg-gray-800 rounded-full font-medium transition-all"
              onClick={onSubscribeToggle}
            >
              <span>Subscribe</span>
            </button>
          )}
        </div>
      )}

      {/* Sign in prompt for unauthenticated users */}
      {!currentUser && (
        <div className="flex items-center space-x-2">
          <Link
            href="/login"
            className="flex items-center space-x-2 px-4 py-2 bg-black text-white hover:bg-gray-800 rounded-full font-medium transition-all"
          >
            <span>Sign in to subscribe</span>
          </Link>
        </div>
      )}

      
      {/* Dropdown Menu */}
      {showSubscribeDropdown && isSubscribed && currentUser && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <div className="p-4">
            <div className="space-y-2">
              <button
                className={`w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors ${
                  notificationPreference === 'all' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
                onClick={() => handleNotificationChange('all')}
              >
                <Bell className="h-4 w-4" />
                <div className="text-left">
                  <div className="font-medium">All</div>
                  <div className="text-xs text-gray-500">Get notified about every video</div>
                </div>
              </button>

              <button
                className={`w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors ${
                  notificationPreference === 'none' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                }`}
                onClick={() => handleNotificationChange('none')}
              >
                <div className="w-4 h-4 rounded-full border-2 border-gray-400"></div>
                <div className="text-left">
                  <div className="font-medium">None</div>
                  <div className="text-xs text-gray-500">Turn off all notifications</div>
                </div>
              </button>
            </div>

            <hr className="my-3" />

            <button
              className="w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
              onClick={handleUnsubscribe}
            >
              <User className="h-4 w-4" />
              <span>Unsubscribe</span>
            </button>
          </div>
        </div>
      )}

      {/* Click outside to close dropdown */}
      {showSubscribeDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowSubscribeDropdown(false)}
        />
      )}
    </div>
  )
}