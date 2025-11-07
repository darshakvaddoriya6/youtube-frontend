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
      <div className="text-center py-12">
        <Users className="h-16 w-16 lg:h-20 lg:w-20 mx-auto text-gray-300 mb-4" />
        <p className="text-lg lg:text-xl font-medium text-gray-600 mb-2">No subscriptions yet</p>
        <p className="text-sm lg:text-base text-gray-500 max-w-sm mx-auto leading-relaxed">
          Subscribe to channels to see their latest videos here
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-3 lg:space-y-4">
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