interface CommentsSkeletonProps {
  count?: number
}

export default function CommentsSkeleton({ count = 5 }: CommentsSkeletonProps) {
  const skeletons = Array.from({ length: count }, (_, i) => i)

  return (
    <div className="mt-8 animate-pulse">
      {/* Comments header skeleton */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="h-6 bg-gray-200 rounded w-32"></div>
        <div className="h-4 bg-gray-200 rounded w-16"></div>
      </div>

      {/* Add comment skeleton */}
      <div className="flex space-x-3 mb-6">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
        <div className="flex-1">
          <div className="h-12 bg-gray-200 rounded w-full"></div>
        </div>
      </div>

      {/* Comments list skeleton */}
      <div className="space-y-4">
        {skeletons.map((index) => (
          <div key={index} className="flex space-x-3">
            {/* Avatar skeleton */}
            <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0"></div>
            
            <div className="flex-1">
              {/* Comment header skeleton */}
              <div className="flex items-center space-x-2 mb-2">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
              </div>
              
              {/* Comment content skeleton */}
              <div className="space-y-2 mb-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
              
              {/* Comment actions skeleton */}
              <div className="flex items-center space-x-4">
                <div className="h-4 bg-gray-200 rounded w-12"></div>
                <div className="h-4 bg-gray-200 rounded w-12"></div>
              </div>

              {/* Replies skeleton (for some comments) */}
              {index % 3 === 0 && (
                <div className="mt-4 ml-12 space-y-3">
                  <div className="flex space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="h-3 bg-gray-200 rounded w-20"></div>
                        <div className="h-3 bg-gray-200 rounded w-12"></div>
                      </div>
                      <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                      <div className="flex items-center space-x-4">
                        <div className="h-3 bg-gray-200 rounded w-10"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}