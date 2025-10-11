'use client'

import { MoreVertical } from 'lucide-react'

interface SubscriptionChannel {
  _id: string
  username: string
  fullName: string
  avatar: string
  coverImage?: string
}

interface Subscription {
  _id: string
  channel: SubscriptionChannel
  createdAt: string
  totalSubscribersCount?: number
}

interface SubscriptionCardProps {
  subscription: Subscription
  onChannelClick: (username: string) => void
  onUnsubscribe: (channelId: string) => void
  isUnsubscribing: boolean
}

const SubscriptionCard = ({ 
  subscription, 
  onChannelClick, 
  onUnsubscribe, 
  isUnsubscribing 
}: SubscriptionCardProps) => {
  const channel = subscription.channel || subscription

  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
      <img
        src={channel.avatar || '/api/placeholder/40/40'}
        alt={channel.fullName || channel.username || 'Channel'}
        className="w-12 h-12 rounded-full flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={() => onChannelClick(channel.username)}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h3
              className="font-semibold text-lg w-fit text-gray-900 truncate cursor-pointer hover:text-red-600 transition-colors"
              onClick={() => onChannelClick(channel.username)}
            >
              {channel.fullName || channel.username}
            </h3>
            <p
              className="text-gray-600 text-sm w-fit cursor-pointer hover:text-red-600 transition-colors"
              onClick={() => onChannelClick(channel.username)}
            >
              @{channel.username}
            </p>
            <div className="flex items-center space-x-4 text-gray-500 text-sm mt-1">
              <span>Subscribed {new Date(subscription.createdAt).toLocaleDateString()}</span>
              {subscription.totalSubscribersCount && (
                <span>• {subscription.totalSubscribersCount.toLocaleString()} subscribers</span>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onUnsubscribe(channel._id)}
              disabled={isUnsubscribing}
              className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-full hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUnsubscribing ? 'Loading...' : 'Unsubscribe'}
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <MoreVertical className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubscriptionCard