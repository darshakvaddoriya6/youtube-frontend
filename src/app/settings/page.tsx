
'use client'

import { Settings, User, Bell, Shield, Palette, Globe, HelpCircle } from 'lucide-react'

const SettingsPage = () => {
  const settingsSections = [
    {
      title: 'Account',
      icon: User,
      items: [
        { label: 'Your account', description: 'Manage your Google account' },
        { label: 'Change password', description: 'Update your password' },
        { label: 'Privacy', description: 'Control your privacy settings' }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { label: 'Push notifications', description: 'Get notified about new videos' },
        { label: 'Email notifications', description: 'Manage email preferences' },
        { label: 'Subscription alerts', description: 'Get notified when channels upload' }
      ]
    },
    {
      title: 'Privacy',
      icon: Shield,
      items: [
        { label: 'Data usage', description: 'Control how your data is used' },
        { label: 'Ad preferences', description: 'Manage your ad experience' },
        { label: 'Search history', description: 'Control your search history' }
      ]
    },
    {
      title: 'Appearance',
      icon: Palette,
      items: [
        { label: 'Theme', description: 'Choose light or dark theme' },
        { label: 'Language', description: 'Select your preferred language' },
        { label: 'Playback quality', description: 'Set default video quality' }
      ]
    }
  ]

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center mb-8">
        <Settings className="h-6 w-6 mr-3" />
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <div className="space-y-6">
        {settingsSections.map((section) => (
          <div key={section.title} className="bg-white rounded-lg border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center">
                <section.icon className="h-5 w-5 mr-3 text-gray-600" />
                <h2 className="text-lg font-semibold">{section.title}</h2>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {section.items.map((item, index) => (
                <div key={index} className="p-6 hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{item.label}</h3>
                      <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                    </div>
                    <div className="text-gray-400">
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold mb-4">Danger Zone</h3>
        <div className="space-y-3">
          <button className="w-full text-left p-3 border border-red-200 rounded-lg hover:bg-red-50">
            <div className="text-red-600 font-medium">Delete account</div>
            <div className="text-sm text-gray-600">Permanently delete your account and all data</div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
