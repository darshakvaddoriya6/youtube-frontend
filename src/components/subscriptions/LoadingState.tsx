'use client'

import { SubscriptionSkeleton } from '@/components/skeletons'

const LoadingState = () => {
  return (
    <div className="py-4">
      <SubscriptionSkeleton count={8} />
    </div>
  )
}

export default LoadingState