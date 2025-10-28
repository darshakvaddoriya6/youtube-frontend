interface HistorySkeletonProps {
  count?: number;
}

const HistorySkeleton = ({ count = 5 }: HistorySkeletonProps) => {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  return (
    <div className="space-y-4 lg:space-y-6">
      {skeletons.map((index) => (
        <div key={index} className="animate-pulse">
          {/* Mobile Layout */}
          <div className="lg:hidden">
            {/* Video Thumbnail */}
            <div className="relative mb-3 overflow-hidden rounded-lg bg-gray-200">
              <div className="w-full h-60 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite]"></div>
              <div className="absolute bottom-2 right-2 bg-gray-300/80 backdrop-blur-sm text-transparent text-xs px-2 py-1 rounded">
                0:00
              </div>
            </div>

            {/* Video Info Below */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0 space-y-2">
                {/* Title skeleton */}
                <div className="space-y-1.5">
                  <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-md"></div>
                  <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-md w-3/4"></div>
                </div>

                {/* Channel name skeleton */}
                <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-md w-1/2"></div>

                {/* Views and date skeleton */}
                <div className="flex items-center space-x-2">
                  <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-md w-16"></div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                  <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-md w-20"></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex-shrink-0 flex space-x-1">
                <div className="w-6 h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-full"></div>
                <div className="w-6 h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:flex items-start gap-4">
            {/* Thumbnail */}
            <div className="relative flex-shrink-0 w-60 overflow-hidden rounded-lg bg-gray-200">
              <div className="w-60 h-40 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite]"></div>
              <div className="absolute bottom-2 right-2 bg-gray-300/80 backdrop-blur-sm text-transparent text-xs px-2 py-1 rounded">
                0:00
              </div>
            </div>

            {/* Video Info */}
            <div className="flex-1 min-w-0 space-y-2">
              {/* Title skeleton */}
              <div className="space-y-1.5">
                <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-md"></div>
                <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-md w-2/3"></div>
              </div>

              {/* Channel name skeleton */}
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-md w-1/3"></div>

              {/* Views and date skeleton */}
              <div className="flex items-center space-x-2">
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-md w-20"></div>
                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-md w-24"></div>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-[shimmer_1.5s_ease-in-out_infinite] rounded-full"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistorySkeleton;