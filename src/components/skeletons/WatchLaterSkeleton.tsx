interface WatchLaterSkeletonProps {
  count?: number
}

export default function WatchLaterSkeleton({ count = 6 }: WatchLaterSkeletonProps) {
  const skeletons = Array.from({ length: count }, (_, i) => i)

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-3 lg:px-6 py-4 lg:py-8 animate-pulse">
        {/* Header skeleton */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded"></div>
            <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-40"></div>
          </div>
        </div>

        {/* Video list skeleton */}
        <div className="space-y-6">
          {skeletons.map((index) => (
            <div key={index}>
              {/* Mobile Layout */}
              <div className="lg:hidden">
                {/* Thumbnail skeleton */}
                <div className="relative mb-3 overflow-hidden rounded-lg bg-gray-200">
                  <div className="w-full h-60 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>
                  <div className="absolute bottom-2 right-2 bg-gray-300/80 backdrop-blur-sm text-transparent text-xs px-2 py-1 rounded">
                    0:00
                  </div>
                </div>

                {/* Video info skeleton */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0 space-y-2">
                    {/* Title skeleton */}
                    <div className="space-y-1.5">
                      <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md"></div>
                      <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-3/4"></div>
                    </div>

                    {/* Channel name skeleton */}
                    <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-1/2"></div>

                    {/* Views and date skeleton */}
                    <div className="flex items-center space-x-2">
                      <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-16"></div>
                      <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                      <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-20"></div>
                    </div>
                  </div>

                  {/* Action buttons skeleton */}
                  <div className="flex-shrink-0 flex space-x-1">
                    <div className="w-6 h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-full"></div>
                    <div className="w-6 h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden lg:flex items-start gap-4">
                {/* Thumbnail skeleton */}
                <div className="relative flex-shrink-0 w-60 overflow-hidden rounded-lg bg-gray-200">
                  <div className="w-60 h-40 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>
                  <div className="absolute bottom-2 right-2 bg-gray-300/80 backdrop-blur-sm text-transparent text-xs px-2 py-1 rounded">
                    0:00
                  </div>
                </div>

                {/* Video info skeleton */}
                <div className="flex-1 min-w-0 space-y-2">
                  {/* Title skeleton */}
                  <div className="space-y-1.5">
                    <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md"></div>
                    <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-2/3"></div>
                  </div>

                  {/* Channel name skeleton */}
                  <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-1/3"></div>

                  {/* Views and date skeleton */}
                  <div className="flex items-center space-x-2">
                    <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-20"></div>
                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                    <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-24"></div>
                  </div>
                </div>

                {/* Action buttons skeleton */}
                <div className="flex-shrink-0">
                  <div className="w-9 h-9 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
