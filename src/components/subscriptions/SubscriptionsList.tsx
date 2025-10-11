'use client'

import { Users } from 'lucide-react'
import SubscriptionCard from './SubscriptionCard'

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

interface SubscriptionsListProps {
  subscriptions: Subscription[]
  onChannelClick: (username: string) => void
  onUnsubscribe: (channelId: string) => void
  subscribingChannels: Set<string>
}

const SubscriptionsList = ({ 
  subscriptions, 
  onChannelClick, 
  onUnsubscribe, 
  subscribingChannels 
}: SubscriptionsListProps) => {
  if (subscriptions.length === 0) {
    return (
      <div className="text-center py-16">
        <Users className="h-20 w-20 mx-auto text-gray-300 mb-4" />
        <p className="text-xl font-medium text-gray-500 mb-2">No subscriptions yet</p>
        <p className="text-gray-400">Subscribe to channels to see their latest videos here</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {subscriptions.map((subscription) => (
        <SubscriptionCard
          key={subscription._id}
          subscription={subscription}
          onChannelClick={onChannelClick}
          onUnsubscribe={onUnsubscribe}
          isUnsubscribing={subscribingChannels.has(subscription.channel?._id || subscription._id)}
        />
      ))}
    </div>
  )
}

export default SubscriptionsList