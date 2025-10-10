
'use client'

import { HelpCircle, Search, Book, MessageCircle, ExternalLink } from 'lucide-react'

const HelpPage = () => {
  const helpCategories = [
    {
      title: 'Getting Started',
      icon: Book,
      items: [
        { title: 'Creating an account', description: 'Learn how to set up your YouTube account' },
        { title: 'Uploading your first video', description: 'Step-by-step guide to upload videos' },
        { title: 'Managing your channel', description: 'Tips for organizing and growing your channel' }
      ]
    },
    {
      title: 'Account & Settings',
      icon: HelpCircle,
      items: [
        { title: 'Privacy settings', description: 'Control who can see your videos and activity' },
        { title: 'Notification preferences', description: 'Manage when and how you get notified' },
        { title: 'Billing and payments', description: 'Manage your YouTube Premium subscription' }
      ]
    },
    {
      title: 'Troubleshooting',
      icon: MessageCircle,
      items: [
        { title: 'Video playback issues', description: 'Fix problems with video loading or playing' },
        { title: 'Upload errors', description: 'Resolve common upload problems' },
        { title: 'Account recovery', description: 'Get help accessing your account' }
      ]
    }
  ]

  const popularArticles = [
    'How to upload videos',
    'Copyright basics',
    'Community guidelines',
    'YouTube Premium benefits',
    'Channel monetization'
  ]

  return (
    <div className="p-6 max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <HelpCircle className="h-6 w-6 mr-3" />
          <h1 className="text-2xl font-bold">Help Center</h1>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <div className="flex items-center">
            <Search className="h-5 w-5 text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Search help articles..."
              className="flex-1 text-lg border-none outline-none"
            />
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg">
              Search
            </button>
          </div>
        </div>

        {/* Help Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {helpCategories.map((category) => (
            <div key={category.title} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center mb-4">
                <category.icon className="h-6 w-6 text-blue-600 mr-3" />
                <h2 className="text-lg font-semibold">{category.title}</h2>
              </div>

              <div className="space-y-3">
                {category.items.map((item, index) => (
                  <div key={index} className="cursor-pointer hover:bg-gray-50 p-3 rounded-lg">
                    <h3 className="font-medium text-gray-900 hover:text-blue-600">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Popular Articles */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">Popular Help Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {popularArticles.map((article, index) => (
              <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                <span className="text-gray-700">{article}</span>
                <ExternalLink className="h-4 w-4 text-gray-400" />
              </div>
            ))}
          </div>
        </div>

        {/* Contact Support */}
        <div className="bg-blue-50 rounded-lg border border-blue-200 p-6 mt-8">
          <h2 className="text-xl font-semibold mb-2 text-blue-900">Need more help?</h2>
          <p className="text-blue-700 mb-4">
            Can't find what you're looking for? Contact our support team for personalized assistance.
          </p>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Contact Support
          </button>
        </div>
      </div>
  )
}

export default HelpPage
