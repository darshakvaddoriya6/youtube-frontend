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
            <div className="relative">
              <div className="w-full h-60 bg-gray-200 rounded-lg"></div>
              <div className="absolute bottom-2 right-2 bg-gray-300 text-transparent text-xs px-2 py-1 rounded">
                0:00
              </div>
            </div>

            {/* Video info skeleton */}
            <div className="mt-3">
              <div className="flex items-start space-x-3">
                {/* Avatar skeleton */}
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gray-200 rounded-full"></div>
                </div>
                
                <div className="flex-1 min-w-0">
                  {/* Title skeleton */}
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                  
                  {/* Channel name skeleton */}
                  <div className="h-3 bg-gray-200 rounded w-1/2 mt-2"></div>
                  
                  {/* Views and date skeleton */}
                  <div className="flex items-center mt-1 space-x-1">
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                    <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-20"></div>
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
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
              
              {/* Channel name skeleton */}
              <div className="h-3 bg-gray-200 rounded w-1/3 mb-2"></div>
              
              {/* Views and date skeleton */}
              <div className="flex items-center space-x-1">
                <div className="h-3 bg-gray-200 rounded w-16"></div>
                <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
                <div className="h-3 bg-gray-200 rounded w-20"></div>
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
            <div className="relative flex-shrink-0">
              <div className="w-44 h-24 bg-gray-200 rounded-lg"></div>
              <div className="absolute bottom-1 right-1 bg-gray-300 text-transparent text-xs px-1.5 py-0.5 rounded">
                0:00
              </div>
            </div>
            
            {/* Video info skeleton */}
            <div className="flex-1 min-w-0">
              {/* Title skeleton */}
              <div className="space-y-1 mb-2">
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
              
              {/* Channel name skeleton */}
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-1"></div>
              
              {/* Views and date skeleton */}
              <div className="flex items-center space-x-1">
                <div className="h-2 bg-gray-200 rounded w-12"></div>
                <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
                <div className="h-2 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          </div>
        ))}
      </>
    )
  }

  return null
}