export default function VideoPlayerSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Video player skeleton */}
      <div className="w-full aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
        <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
          <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
        </div>
      </div>

      {/* Video title skeleton */}
      <div className="mt-4 space-y-2">
        <div className="h-6 bg-gray-200 rounded w-full"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      </div>

      {/* Channel info and actions skeleton */}
      <div className="mt-4 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Channel info skeleton */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-32"></div>
            <div className="h-3 bg-gray-200 rounded w-24"></div>
          </div>
          <div className="h-9 bg-gray-200 rounded-full w-24"></div>
        </div>

        {/* Actions skeleton */}
        <div className="flex items-center space-x-2">
          <div className="h-9 bg-gray-200 rounded-full w-20"></div>
          <div className="h-9 bg-gray-200 rounded-full w-16"></div>
          <div className="h-9 bg-gray-200 rounded-full w-16"></div>
        </div>
      </div>

      {/* Description skeleton */}
      <div className="mt-6 space-y-2">
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <div className="h-4 bg-gray-200 rounded w-20"></div>
          <div className="h-4 bg-gray-200 rounded w-24"></div>
        </div>
        <div className="space-y-2 mt-4">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    </div>
  )
}