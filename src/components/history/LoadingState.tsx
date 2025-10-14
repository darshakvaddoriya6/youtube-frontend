import { History } from "lucide-react";
import { VideoCardSkeleton } from '@/components/skeletons';

const LoadingState = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-3 lg:px-6 py-4 lg:py-8">
        <div className="flex items-center mb-8">
          <History className="h-8 w-8 mr-3 text-gray-900" />
          <h1 className="text-3xl font-semibold text-gray-900">History</h1>
        </div>
        
        {/* Skeleton loading for history sections */}
        <div className="space-y-6 lg:space-y-8">
          <div>
            <div className="h-6 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
            <div className="space-y-4">
              <VideoCardSkeleton variant="list" count={5} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;