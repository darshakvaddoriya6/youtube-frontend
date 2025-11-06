import { VideoCardSkeleton } from '@/components/skeletons';

const LoadingState = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-3 lg:px-6 py-4 lg:py-8 animate-pulse">
        {/* Header skeleton */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded"></div>
            <div className="h-7 lg:h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-40"></div>
          </div>
          {/* Clear all button skeleton */}
          <div className="h-9 w-32 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-full"></div>
        </div>

        {/* Skeleton loading for history sections */}
        <div className="space-y-8">
          {/* Multiple date sections */}
          {[1, 2, 3].map((section) => (
            <div key={section} className="space-y-4">
              {/* Date header skeleton */}
              <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-32"></div>

              {/* History items skeleton */}
              <VideoCardSkeleton variant="history" count={section === 1 ? 3 : section === 2 ? 2 : 1} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
