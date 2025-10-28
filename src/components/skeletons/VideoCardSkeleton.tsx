interface VideoCardSkeletonProps {
  variant?: 'grid' | 'list' | 'recommended'
  count?: number
}

export default function VideoCardSkeleton({ variant = 'grid', count = 1 }: VideoCardSkeletonProps) {
  const skeletons = Array.from({ length: count }, (_, i) => i)

  if (variant === 'grid') {
    return (
      <>
        {skeletons.map((index) => (
          <div key={index} className="group cursor-pointer animate-pulse">
            {/* Thumbnail skeleton */}
            <div className="block">
              <div className="relative overflow-hidden rounded-lg bg-gray-200">
                <div className="w-full h-60 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>
                <div className="absolute bottom-2 right-2 bg-gray-300/80 backdrop-blur-sm text-transparent text-xs px-2 py-1 rounded">
                  0:00
                </div>
              </div>
            </div>

            {/* Video info skeleton */}
            <div className="mt-3">
              <div className="flex items-start space-x-3">
                {/* Avatar skeleton */}
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-full"></div>
                </div>

                <div className="flex-1 min-w-0 space-y-2">
                  {/* Title skeleton */}
                  <div className="space-y-1.5">
                    <div className="h-4 lg:h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md"></div>
                    <div className="h-4 lg:h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-3/4"></div>
                  </div>

                  {/* Channel name skeleton */}
                  <div className="h-3 lg:h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-1/2"></div>

                  {/* Views and date skeleton */}
                  <div className="flex items-center space-x-2">
                    <div className="h-3 lg:h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-16"></div>
                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                    <div className="h-3 lg:h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-20"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </>
    )
  }

  if (variant === 'list') {
    return (
      <>
        {skeletons.map((index) => (
          <div key={index} className="flex items-start gap-4 group animate-pulse">
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
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-2/3"></div>
              </div>

              {/* Channel name skeleton */}
              <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-1/3"></div>

              {/* Views and date skeleton */}
              <div className="flex items-center space-x-2">
                <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-16"></div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </>
    )
  }

  if (variant === 'recommended') {
    return (
      <>
        {skeletons.map((index) => (
          <div key={index} className="flex gap-2 lg:gap-3 p-2 animate-pulse">
            {/* Thumbnail skeleton */}
            <div className="relative flex-shrink-0 overflow-hidden rounded-lg bg-gray-200">
              <div className="w-44 h-24 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>
              <div className="absolute bottom-1 right-1 bg-gray-300/80 backdrop-blur-sm text-transparent text-xs px-1.5 py-0.5 rounded">
                0:00
              </div>
            </div>

            {/* Video info skeleton */}
            <div className="flex-1 min-w-0 space-y-1.5">
              {/* Title skeleton */}
              <div className="space-y-1">
                <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md"></div>
                <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-3/4"></div>
              </div>

              {/* Channel name skeleton */}
              <div className="h-2.5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-1/2"></div>

              {/* Views and date skeleton */}
              <div className="flex items-center space-x-1.5">
                <div className="h-2.5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-12"></div>
                <div className="w-0.5 h-0.5 bg-gray-300 rounded-full"></div>
                <div className="h-2.5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-16"></div>
              </div>
            </div>
          </div>
        ))}
      </>
    )
  }

  return null
}
