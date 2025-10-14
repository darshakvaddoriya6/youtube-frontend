export default function ChannelSkeleton() {
    return (
        <div className="animate-pulse">
            {/* Channel banner skeleton */}
            <div className="w-full h-32 lg:h-48 bg-gray-200 rounded-lg mb-6"></div>

            {/* Channel info skeleton */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
                <div className="flex items-center space-x-4">
                    {/* Avatar skeleton */}
                    <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gray-200 rounded-full"></div>

                    <div className="space-y-2">
                        {/* Channel name skeleton */}
                        <div className="h-6 bg-gray-200 rounded w-48"></div>
                        {/* Username skeleton */}
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                        {/* Subscriber count skeleton */}
                        <div className="h-4 bg-gray-200 rounded w-28"></div>
                    </div>
                </div>

                {/* Subscribe button skeleton */}
                <div className="h-10 bg-gray-200 rounded-full w-32"></div>
            </div>

            {/* Channel description skeleton */}
            <div className="mb-8 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>

            {/* Tabs skeleton */}
            <div className="border-b border-gray-200 mb-6">
                <div className="flex space-x-8">
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                    <div className="h-4 bg-gray-200 rounded w-18"></div>
                </div>
                <div className="mt-4 h-0.5 bg-gray-200 w-16"></div>
            </div>

            {/* Videos grid skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                {Array.from({ length: 6 }, (_, i) => (
                    <div key={i} className="group cursor-pointer">
                        {/* Thumbnail skeleton */}
                        <div className="relative">
                            <div className="w-full h-60 bg-gray-200 rounded-lg"></div>
                            <div className="absolute bottom-2 right-2 bg-gray-300 text-transparent text-xs px-2 py-1 rounded">
                                0:00
                            </div>
                        </div>

                        {/* Video info skeleton */}
                        <div className="mt-3 space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                            <div className="flex items-center space-x-1 mt-2">
                                <div className="h-3 bg-gray-200 rounded w-16"></div>
                                <div className="w-1 h-1 bg-gray-200 rounded-full"></div>
                                <div className="h-3 bg-gray-200 rounded w-20"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}