'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { Upload, User, Image, Check, X } from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'

interface FormDataState {
  username: string
  email: string
  password: string
  fullName: string
  avatar?: File | null
  coverImage?: File | null
}


export default function RegisterPage() {
  const [formData, setFormData] = useState<FormDataState>({
    username: '',
    email: '',
    password: '',
    fullName: '',
    avatar: null,
    coverImage: null,
  })
  const [loading, setLoading] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null)
  const { register } = useAuth()

  // Password strength validation
  const passwordStrength = useMemo(() => {
    const password = formData.password
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    }

    const score = Object.values(checks).filter(Boolean).length
    const isStrong = score >= 4 && checks.length

    return { checks, score, isStrong }
  }, [formData.password])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        if (e.target.name === 'avatar') {
          setFormData(prev => ({ ...prev, avatar: file }))
          setAvatarPreview(result)
        } else if (e.target.name === 'coverImage') {
          setFormData(prev => ({ ...prev, coverImage: file }))
          setCoverImagePreview(result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formDataToSend = new FormData()

      formDataToSend.append('username', formData.username)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('password', formData.password)
      formDataToSend.append('fullName', formData.fullName)

      if (formData.avatar && formData.avatar instanceof File) {
        formDataToSend.append('avatar', formData.avatar)
      }

      if (formData.coverImage && formData.coverImage instanceof File) {
        formDataToSend.append('coverImage', formData.coverImage)
      }

      await register(formDataToSend)
      toast.success('Account created successfully!')
    } catch (error) {
      console.error('Registration failed:', error)
      toast.error('Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <> <Toaster position="top-right" containerClassName="mt-10"/>
     
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              sign in to existing account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="fullName" className="sr-only">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className={`appearance-none rounded-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm ${formData.password && !passwordStrength.isStrong
                    ? 'border-red-300'
                    : formData.password && passwordStrength.isStrong
                      ? 'border-green-300'
                      : 'border-gray-300'
                  }`}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Password Strength Indicator */}
          {formData.password && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Password Requirements:</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  {passwordStrength.checks.length ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <X className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm ${passwordStrength.checks.length ? 'text-green-600' : 'text-red-600'}`}>
                    At least 8 characters
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {passwordStrength.checks.uppercase ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <X className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm ${passwordStrength.checks.uppercase ? 'text-green-600' : 'text-red-600'}`}>
                    One uppercase letter
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {passwordStrength.checks.lowercase ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <X className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm ${passwordStrength.checks.lowercase ? 'text-green-600' : 'text-red-600'}`}>
                    One lowercase letter
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {passwordStrength.checks.number ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <X className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm ${passwordStrength.checks.number ? 'text-green-600' : 'text-red-600'}`}>
                    One number
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {passwordStrength.checks.special ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <X className="w-4 h-4 text-red-500" />
                  )}
                  <span className={`text-sm ${passwordStrength.checks.special ? 'text-green-600' : 'text-red-600'}`}>
                    One special character (!@#$%^&*...)
                  </span>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.score <= 2 ? 'bg-red-500' :
                          passwordStrength.score <= 3 ? 'bg-yellow-500' :
                            'bg-green-500'
                        }`}
                      style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                    />
                  </div>
                  <span className={`text-sm font-medium ${passwordStrength.score <= 2 ? 'text-red-600' :
                      passwordStrength.score <= 3 ? 'text-yellow-600' :
                        'text-green-600'
                    }`}>
                    {passwordStrength.score <= 2 ? 'Weak' :
                      passwordStrength.score <= 3 ? 'Medium' :
                        'Strong'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Avatar Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Profile Picture
            </label>
            <div className="flex items-center space-x-4">
              <div className="relative">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar preview"
                    className="w-20 h-20 rounded-full object-cover border-2 border-gray-300"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center border-2 border-gray-300">
                    <User className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>
              <div>
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="avatar-upload"
                />
                <label
                  htmlFor="avatar-upload"
                  className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Avatar
                </label>
                <p className="mt-1 text-xs text-gray-500">JPG, PNG up to 2MB</p>
              </div>
            </div>
          </div>

          {/* Cover Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Image
            </label>
            <div className="space-y-4">
              <div className="relative">
                {coverImagePreview ? (
                  <img
                    src={coverImagePreview}
                    alt="Cover preview"
                    className="w-full h-32 object-cover rounded-lg border-2 border-gray-300"
                  />
                ) : (
                  <div className="w-full h-32 bg-gray-200 flex items-center justify-center rounded-lg border-2 border-gray-300 border-dashed">
                    <Image className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>
              <div>
                <input
                  type="file"
                  name="coverImage"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="cover-upload"
                />
                <label
                  htmlFor="cover-upload"
                  className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Cover Image
                </label>
                <p className="mt-1 text-xs text-gray-500">JPG, PNG up to 5MB</p>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading || !passwordStrength.isStrong}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
            {formData.password && !passwordStrength.isStrong && (
              <p className="mt-2 text-sm text-red-600 text-center">
                Please create a stronger password to continue
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
    </>
  )
}
