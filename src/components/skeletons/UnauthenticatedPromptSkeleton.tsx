export default function UnauthenticatedPromptSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 text-center">
        {/* Icon skeleton */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-gray-100 rounded-full">
            <div className="h-12 w-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md" />
          </div>
        </div>

        {/* Title skeleton */}
        <div className="mb-3 flex justify-center">
          <div className="h-9 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-80" />
        </div>

        {/* Description skeleton */}
        <div className="mb-8 flex justify-center">
          <div className="h-7 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-96" />
        </div>

        {/* Features section skeleton */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          {/* Features title skeleton */}
          <div className="mb-4 flex justify-center">
            <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-64" />
          </div>
          
          {/* Features grid skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} className="flex items-center">
                <div className="w-2 h-2 bg-gray-300 rounded-full mr-3 flex-shrink-0" />
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md flex-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Action buttons skeleton */}
        <div className="space-y-4">
          {/* Sign in button skeleton */}
          <div className="w-full h-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-lg" />
          
          {/* Create account button skeleton */}
          <div className="w-full h-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-lg" />
        </div>

        {/* Footer skeleton */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-center">
            <div className="h-4 w-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-sm mr-2" />
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-48" />
          </div>
        </div>
      </div>
    </div>
  )
}