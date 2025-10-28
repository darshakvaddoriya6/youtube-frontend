import React from 'react'

interface NavbarSkeletonProps {
    variant?: 'authenticated' | 'unauthenticated'
}

const NavbarSkeleton: React.FC<NavbarSkeletonProps> = ({ variant = 'authenticated' }) => {
    return (
        <div className="flex items-center space-x-2 lg:space-x-3 animate-pulse">
            {variant === 'authenticated' && (
                <>
                    {/* Upload button skeleton */}
                    <div className="flex items-center space-x-2 px-3 lg:px-4 py-2 rounded-full bg-gray-100">
                        <div className="h-4 w-4 lg:h-5 lg:w-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded" />
                        <div className="hidden lg:inline h-4 w-16 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded" />
                    </div>

                    {/* Notifications skeleton */}
                    <div className="p-2 rounded-full hover:bg-gray-100">
                        <div className="h-5 w-5 lg:h-6 lg:w-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded" />
                    </div>

                    {/* Avatar skeleton */}
                    <div className="p-1">
                        <div className="h-7 w-7 lg:h-8 lg:w-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-full" />
                    </div>
                </>
            )}

            {variant === 'unauthenticated' && (
                <>
                    {/* Sign In button skeleton */}
                    <div className="px-4 py-2 rounded-full border border-gray-200">
                        <div className="h-4 w-16 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded" />
                    </div>
                </>
            )}
        </div>
    )
}

export default NavbarSkeleton
