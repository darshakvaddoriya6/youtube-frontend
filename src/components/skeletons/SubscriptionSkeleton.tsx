interface SubscriptionSkeletonProps {
  count?: number
}

export default function SubscriptionSkeleton({ count = 6 }: SubscriptionSkeletonProps) {
  const skeletons = Array.from({ length: count }, (_, i) => i)

  return (
    <div className="animate-pulse">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="grid grid-cols-2 gap-4">
          {skeletons.map((index) => (
            <div key={index} className="text-center">
              {/* Channel avatar skeleton */}
              <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-3"></div>
              
              {/* Channel name skeleton */}
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto mb-2"></div>
              
              {/* Subscriber count skeleton */}
              <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto mb-3"></div>
              
              {/* Subscribe button skeleton */}
              <div className="h-8 bg-gray-200 rounded-full w-20 mx-auto"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="space-y-6">
          {skeletons.map((index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100">
              <div className="flex items-center space-x-4">
                {/* Channel avatar skeleton */}
                <div className="w-16 h-16 bg-gray-200 rounded-full flex-shrink-0"></div>
                
                <div className="space-y-2">
                  {/* Channel name skeleton */}
                  <div className="h-5 bg-gray-200 rounded w-48"></div>
                  
                  {/* Subscriber count skeleton */}
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                  
                  {/* Description skeleton */}
                  <div className="h-3 bg-gray-200 rounded w-64"></div>
                </div>
              </div>
              
              {/* Subscribe button skeleton */}
              <div className="h-9 bg-gray-200 rounded-full w-24 flex-shrink-0"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}