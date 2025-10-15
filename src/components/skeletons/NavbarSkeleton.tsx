import React from 'react'

interface NavbarSkeletonProps {
    variant?: 'authenticated' | 'unauthenticated'
}

const NavbarSkeleton: React.FC<NavbarSkeletonProps> = ({ variant = 'authenticated' }) => {

    return (
        <div className="flex items-center space-x-1 lg:space-x-2">
            {/* Upload button skeleton */}
            <div className="flex items-center space-x-1 lg:space-x-2 px-2 lg:px-4 py-2 rounded-full">
                <div className="h-4 w-4 lg:h-5 lg:w-5 bg-gray-200 rounded animate-pulse" />
                <div className="hidden lg:inline h-4 w-20 bg-gray-200 rounded animate-pulse" />
            </div>

            {/* Avatar skeleton */}
            <div className="flex items-center space-x-2 p-2 rounded-full">
                <div className="h-6 w-6 lg:h-8 lg:w-8 bg-gray-200 rounded-full animate-pulse" />
            </div>
        </div>
    )
}

export default NavbarSkeleton