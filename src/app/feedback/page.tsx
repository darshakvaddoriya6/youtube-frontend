
'use client'

import { Flag, ThumbsUp, ThumbsDown, MessageSquare, Bug, Lightbulb } from 'lucide-react'

const FeedbackPage = () => {
  const feedbackTypes = [
    {
      icon: Bug,
      title: 'Bug Report',
      description: 'Report a technical issue or error'
    },
    {
      icon: Lightbulb,
      title: 'Feature Request',
      description: 'Suggest new features or improvements'
    },
    {
      icon: MessageSquare,
      title: 'General Feedback',
      description: 'Share your thoughts and suggestions'
    }
  ]

  return (
    <div className="p-6 max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <Flag className="h-6 w-6 mr-3" />
          <h1 className="text-2xl font-bold">Send Feedback</h1>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">How can we help?</h2>
          <p className="text-gray-600 mb-6">
            Your feedback helps us improve YouTube for everyone. Please let us know about any issues, suggestions, or general thoughts you have.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {feedbackTypes.map((type) => (
              <button
                key={type.title}
                className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
              >
                <type.icon className="h-8 w-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">{type.title}</h3>
                <p className="text-sm text-gray-600">{type.description}</p>
              </button>
            ))}
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Feedback Type
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Bug Report</option>
                <option>Feature Request</option>
                <option>General Feedback</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                placeholder="Brief description of your feedback"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Details
              </label>
              <textarea
                rows={6}
                placeholder="Please provide detailed information about your feedback, including steps to reproduce any issues..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category (Optional)
              </label>
              <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>Select a category</option>
                <option>Video Playback</option>
                <option>Upload Issues</option>
                <option>Account & Settings</option>
                <option>Mobile App</option>
                <option>Website</option>
                <option>Other</option>
              </select>
            </div>

            <div className="flex items-center space-x-4">
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Send Feedback
              </button>
              <button
                type="button"
                className="px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        <div className="bg-gray-50 rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Other ways to reach us</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <MessageSquare className="h-5 w-5 text-gray-600 mr-3" />
              <span className="text-gray-700">Join our community forum</span>
            </div>
            <div className="flex items-center">
              <ThumbsUp className="h-5 w-5 text-gray-600 mr-3" />
              <span className="text-gray-700">Follow us on social media for updates</span>
            </div>
          </div>
        </div>
      </div>
  )
}

export default FeedbackPage
