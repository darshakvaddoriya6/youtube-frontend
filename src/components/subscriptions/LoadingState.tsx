'use client'

import { Loader2 } from 'lucide-react'

const LoadingState = () => {
  return (
    <div className="flex items-center justify-center py-8 lg:py-12 px-4">
      <Loader2 className="h-6 w-6 lg:h-8 lg:w-8 animate-spin text-gray-400" />
      <span className="ml-2 text-sm lg:text-base text-gray-600">Loading subscriptions...</span>
    </div>
  )
}

export default LoadingState