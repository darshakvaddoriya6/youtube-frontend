'use client'

import { AlertCircle } from 'lucide-react'

interface ErrorStateProps {
  error: string
}

const ErrorState = ({ error }: ErrorStateProps) => {
  return (
    <div className="flex items-center justify-center py-12 text-red-600">
      <AlertCircle className="h-6 w-6 mr-2" />
      <span>{error}</span>
    </div>
  )
}

export default ErrorState