import { History } from "lucide-react";

const LoadingState = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center mb-8">
          <History className="h-8 w-8 mr-3 text-gray-900" />
          <h1 className="text-3xl font-semibold text-gray-900">History</h1>
        </div>
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;