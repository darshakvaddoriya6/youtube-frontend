interface SubscriptionSkeletonProps {
  count?: number
}

export default function SubscriptionSkeleton({ count = 6 }: SubscriptionSkeletonProps) {
  const skeletons = Array.from({ length: count }, (_, i) => i)

  return (
    <div className="animate-pulse space-y-4 max-w-6xl mx-auto">
      {/* Title skeleton */}
      <div className="h-7 lg:h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-44 mb-6"></div>
      
      {skeletons.map((index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          {/* Mobile Layout */}
          <div className="flex flex-col lg:hidden p-4 space-y-4">
            <div className="flex items-center space-x-3">
              {/* Channel avatar skeleton */}
              <div className="w-12 h-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-full flex-shrink-0"></div>

              <div className="flex-1 min-w-0 space-y-2">
                {/* Channel name skeleton */}
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-32"></div>

                {/* Username skeleton */}
                <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-24"></div>
              </div>

              {/* More button skeleton */}
              <div className="w-9 h-9 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-full"></div>
            </div>

            {/* Subscription info skeleton */}
            <div className="space-y-2">
              <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-28"></div>
              <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-20"></div>
            </div>

            {/* Unsubscribe button skeleton */}
            <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-full"></div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:flex items-center space-x-4 p-4">
            {/* Channel avatar skeleton */}
            <div className="w-12 h-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-full flex-shrink-0"></div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0 space-y-2">
                  {/* Channel name skeleton */}
                  <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-48"></div>

                  {/* Username skeleton */}
                  <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-32"></div>

                  {/* Subscription info skeleton */}
                  <div className="flex items-center space-x-4">
                    <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-32"></div>
                    <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-24"></div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {/* Unsubscribe button skeleton */}
                  <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-full w-28"></div>

                  {/* More button skeleton */}
                  <div className="w-9 h-9 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
