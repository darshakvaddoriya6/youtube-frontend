export default function ChannelSkeleton() {
    return (
        <div className="animate-pulse space-y-6">
            {/* Channel banner skeleton */}
            <div className="w-full h-32 lg:h-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-lg overflow-hidden"></div>

            {/* Channel info skeleton */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex items-center space-x-4">
                    {/* Avatar skeleton */}
                    <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-full"></div>

                    <div className="space-y-3">
                        {/* Channel name skeleton */}
                        <div className="h-6 lg:h-7 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-48"></div>
                        {/* Username skeleton */}
                        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-32"></div>
                        {/* Subscriber count skeleton */}
                        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-28"></div>
                    </div>
                </div>

                {/* Subscribe button skeleton */}
                <div className="h-10 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-full w-32"></div>
            </div>

            {/* Channel description skeleton */}
            <div className="space-y-2">
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-3/4"></div>
                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-1/2"></div>
            </div>

            {/* Tabs skeleton */}
            <div className="border-b border-gray-200 pb-4">
                <div className="flex space-x-8 mb-4">
                    <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-16"></div>
                    <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-20"></div>
                    <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-18"></div>
                </div>
                <div className="h-0.5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer w-16"></div>
            </div>

            {/* Videos grid skeleton */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
                {Array.from({ length: 6 }, (_, i) => (
                    <div key={i} className="group cursor-pointer">
                        {/* Thumbnail skeleton */}
                        <div className="relative overflow-hidden rounded-lg bg-gray-200">
                            <div className="w-full h-60 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>
                            <div className="absolute bottom-2 right-2 bg-gray-300/80 backdrop-blur-sm text-transparent text-xs px-2 py-1 rounded">
                                0:00
                            </div>
                        </div>

                        {/* Video info skeleton */}
                        <div className="mt-3 space-y-2">
                            <div className="space-y-1">
                                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md"></div>
                                <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-3/4"></div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-16"></div>
                                <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                                <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-20"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
