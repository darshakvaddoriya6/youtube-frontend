interface WatchLaterSkeletonProps {
  count?: number
}

export default function WatchLaterSkeleton({ count = 6 }: WatchLaterSkeletonProps) {
  const skeletons = Array.from({ length: count }, (_, i) => i)

  return (
    <div className="min-h-screen bg-white animate-pulse">
      <div className="max-w-6xl mx-auto px-3 lg:px-6 py-4 lg:py-8">
        {/* Header skeleton */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gray-200 rounded mr-3"></div>
            <div className="h-8 bg-gray-200 rounded w-40"></div>
          </div>
        </div>

        {/* Video list skeleton */}
        <div className="space-y-4 lg:space-y-6">
          {skeletons.map((index) => (
            <div key={index}>
              {/* Mobile Layout */}
              <div className="lg:hidden">
                {/* Thumbnail skeleton */}
                <div className="relative mb-3">
                  <div className="w-full h-60 bg-gray-200 rounded-lg"></div>
                  <div className="absolute bottom-2 right-2 bg-gray-300 text-transparent text-xs px-2 py-1 rounded">
                    0:00
                  </div>
                </div>

                {/* Video info skeleton */}
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    {/* Title skeleton */}
                    <div className="space-y-2 mb-2">
                      <div className="h-4 bg-gray-200 rounded w-full"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                    
                    {/* Channel name skeleton */}
                    <div className="h-3 bg-gray-200 rounded w-1/2 mb-1"></div>
                    
                    {/* Views and date skeleton */}
                    <div className="flex items-center space-x-1">
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                      <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
                      <div className="h-3 bg-gray-200 rounded w-20"></div>
                    </div>
                  </div>

                  {/* Action buttons skeleton */}
                  <div className="flex space-x-1 ml-2">
                    <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                    <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden lg:flex items-start gap-4">
                {/* Thumbnail skeleton */}
                <div className="relative flex-shrink-0 w-60">
                  <div className="w-60 h-40 bg-gray-200 rounded-lg"></div>
                  <div className="absolute bottom-2 right-2 bg-gray-300 text-transparent text-xs px-2 py-1 rounded">
                    0:00
                  </div>
                </div>

                {/* Video info skeleton */}
                <div className="flex-1 min-w-0">
                  {/* Title skeleton */}
                  <div className="space-y-2 mb-2">
                    <div className="h-5 bg-gray-200 rounded w-full"></div>
                    <div className="h-5 bg-gray-200 rounded w-2/3"></div>
                  </div>
                  
                  {/* Channel name skeleton */}
                  <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                  
                  {/* Views and date skeleton */}
                  <div className="flex items-center space-x-2">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                    <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>

                {/* Action buttons skeleton */}
                <div className="flex space-x-1">
                  <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}