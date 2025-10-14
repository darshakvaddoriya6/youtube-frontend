'use client'

import { AlertCircle } from 'lucide-react'

interface ErrorStateProps {
  error: string
}

const ErrorState = ({ error }: ErrorStateProps) => {
  return (
    <div className="flex items-center justify-center py-8 lg:py-12 px-4 text-red-600">
      <AlertCircle className="h-5 w-5 lg:h-6 lg:w-6 mr-2 flex-shrink-0" />
      <span className="text-sm lg:text-base text-center">{error}</span>
    </div>
  )
}

export default ErrorState