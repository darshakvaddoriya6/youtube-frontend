import Skeleton from "react-loading-skeleton"
import { Spinner } from "@/components/ui/spinner"

interface VideoCardSkeletonProps {
  variant?: 'grid' | 'history' | 'recommended' | 'login' | 'register' | 'subscriptions' | 'like' | 'search'
  count?: number
}

export default function VideoCardSkeleton({ variant = 'grid', count = 1 }: VideoCardSkeletonProps) {
  const skeletons = Array.from({ length: count }, (_, i) => i)

  if (variant === 'grid') {
    return (
      <>
        {skeletons.map((index) => (
          <div key={index} className="group cursor-pointer animate-pulse  ">
            {/* Thumbnail skeleton */}
            <div className="block">
              <div className="relative overflow-hidden rounded-lg bg-gray-200">
                <div className="w-full h-60 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>
                <div className="absolute bottom-2 right-2 bg-gray-300/80 backdrop-blur-sm text-transparent text-xs px-2 py-1 rounded">
                  0:00
                </div>
              </div>
            </div>

            {/* Video info skeleton */}
            <div className="mt-3 h-[72px]">
              <div className="flex items-start space-x-3">
                {/* Avatar skeleton */}
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 lg:w-10 lg:h-10 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-full"></div>
                </div>

                <div className="flex-1 min-w-0 space-y-2">
                  {/* Title skeleton */}
                  <div className="space-y-1.5">
                    <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md"></div>
                  </div>

                  {/* Channel name skeleton */}
                  <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-1/2"></div>

                  {/* Views and date skeleton */}
                  <div className="flex items-center space-x-2">
                    <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-16"></div>
                    <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                    <div className="h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-20"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </>
    )
  }

  if (variant === 'login') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-2">
        <div className="max-w-md w-full space-y-10">
          <div className="text-center">
            <Skeleton height={30} width={350} className="mx-auto mb-2" />
            <Skeleton height={20} width={250} className="mx-auto" />
          </div>
          <div className="space-y-2">
            <div>
              <Skeleton height={40} />
              <Skeleton height={40} />
            </div>
            <div className="flex items-center justify-between pb-4">
              <div className="flex items-center">
                <Skeleton circle width={20} height={20} className="mr-2" />
                <Skeleton width={100} height={20} />
              </div>
              <Skeleton width={150} height={20} />
            </div>
            <Skeleton height={40} />
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'register') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full ">
          <div className="text-center">
            <Skeleton height={38} width={308} className="mx-auto mb-2" />
            <Skeleton height={17} width={200} className="mx-auto mb-8" />
          </div>

          <div className="space-y-2">
            <Skeleton height={37.6} width={448} />
            <Skeleton height={37.6} width={448} />
            <Skeleton height={37.6} width={448} />
            <Skeleton height={37.6} width={448} />
          </div>



          <div className="flex flex-col ">
            <Skeleton width={100} height={20} className="mt-2" />
            <div className="relative flex space-x-4 mb-4">
              <Skeleton circle width={80} height={80} />
              <div className="flex flex-col">
                <Skeleton width={152} height={38} className="mt-2" />
                <Skeleton width={152} height={16} className="mt-2" />
              </div>
            </div>
            <Skeleton width={100} height={20} className="mt-2" />
            <div className="w-full">
              <Skeleton width={448} height={128} className="mt-2" />
            </div>
          </div>

          <div className="space-y-2">
            <Skeleton height={38} width={194} />
            <Skeleton height={16} width={100} className="rounded-full" />
          </div>

          <Skeleton height={40} className="rounded-md mt-3" />


        </div>
      </div>
    )
  }

  if (variant === 'history') {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto animate-pulse">
          {/* Header skeleton */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded"></div>
              <div className="h-7 lg:h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-40"></div>
            </div>
            {/* Clear all button skeleton */}
            <div className="h-9 w-[160px] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-full"></div>
          </div>

          {/* Skeleton loading for history sections */}
          <div className="space-y-8">
            {[1, 2].map((section) => (
              <div key={section} className="space-y-4">
                {/* Date header skeleton */}
                <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-32"></div>

                {/* History items skeleton */}
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
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'subscriptions') {
    return (
      <div className="flex items-center justify-center gap-6">
        <Spinner className="size-10 text-red-500" /> Loading subscriptions...
      </div>
    )
  }

  if (variant === 'like') {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-6xl mx-auto animate-pulse">
          {/* Header skeleton */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded"></div>
              <div className="h-7 lg:h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-40"></div>
            </div>
            {/* Clear all button skeleton */}
            <div className="h-9 w-[160px] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-full"></div>
          </div>

          {/* Skeleton loading for history sections */}
          <div className="space-y-8">
            {[1, 2].map((section) => (
              <div key={section} className="space-y-4">
                {/* Date header skeleton */}
                <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-32"></div>

                {/* History items skeleton */}
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
            ))}
          </div>
        </div>
      </div>
    )
  }


  if (variant === 'recommended') {
    return (
      <>
        {skeletons.map((index) => (
          <div key={index} className="flex gap-2 lg:gap-3 p-2 animate-pulse">
            {/* Thumbnail skeleton */}
            <div className="relative flex-shrink-0 overflow-hidden rounded-lg bg-gray-200">
              <div className="w-44 h-24 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>
              <div className="absolute bottom-1 right-1 bg-gray-300/80 backdrop-blur-sm text-transparent text-xs px-1.5 py-0.5 rounded">
                0:00
              </div>
            </div>

            {/* Video info skeleton */}
            <div className="flex-1 min-w-0 space-y-1.5">
              {/* Title skeleton */}
              <div className="space-y-1">
                <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md"></div>
                <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-3/4"></div>
              </div>

              {/* Channel name skeleton */}
              <div className="h-2.5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-1/2"></div>

              {/* Views and date skeleton */}
              <div className="flex items-center space-x-1.5">
                <div className="h-2.5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-12"></div>
                <div className="w-0.5 h-0.5 bg-gray-300 rounded-full"></div>
                <div className="h-2.5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer rounded-md w-16"></div>
              </div>
            </div>
          </div>
        ))}
      </>
    )
  }

  if (variant === 'search') {
    return (
      <div className="flex items-center justify-center gap-6">
        <Spinner className="size-10 text-red-500" /> Loading search...
      </div>
    )
  }

  return null
}
