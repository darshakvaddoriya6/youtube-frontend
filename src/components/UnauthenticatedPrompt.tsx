'use client'

import { useEffect, useState } from 'react'
import { Lock, LogIn, UserPlus, Youtube } from 'lucide-react'
import Link from 'next/link'

interface UnauthenticatedPromptProps {
  pageTitle?: string
  pageDescription?: string
  features?: string[]
  loading?: boolean
}

const UnauthenticatedPrompt = ({
  pageTitle = '',
  pageDescription = '',
  features = [],
}: UnauthenticatedPromptProps) => {
 
  


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-red-100 rounded-full">
            <Lock className="h-12 w-12 text-red-600" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Sign in to access {pageTitle}
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-8 text-lg">
          {pageDescription}
        </p>

        {/* Features */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            With a YouTube account, you can:
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center text-gray-700">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-3 flex-shrink-0"></div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link href="/login" className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center">
            <LogIn className="h-5 w-5 mr-2" />
            Sign in
          </Link>

          <Link href="/register" className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center">
            <UserPlus className="h-5 w-5 mr-2" />
            Create account
          </Link>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-center text-gray-500 text-sm">
            <Youtube className="h-4 w-4 mr-2 text-red-600" />
            <span>Secure sign-in powered by YouTube</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UnauthenticatedPrompt
