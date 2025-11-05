'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

// --------------------
// User and Auth Types
// --------------------
interface User {
  _id: string
  username: string
  email: string
  fullName: string
  avatar: string
  coverImage?: string
}

interface RegisterData {
  username: string
  email: string
  password: string
  fullName: string
  avatar?: File | string
  coverImage?: File | string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: RegisterData | FormData) => Promise<void>   // ✅ FIXED
  logout: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<void>
}

// --------------------
// Create Context Hook
// --------------------
const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// --------------------
// AuthProvider Component
// --------------------
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // --------------------
  // Check Auth on Mount
  // --------------------
  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      if (token) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/current-user`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (response.ok) {
          const userData = await response.json()
          setUser(userData.data)
          localStorage.setItem('user', JSON.stringify(userData.data))
        } else {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('user')
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      localStorage.removeItem('accessToken')
      localStorage.removeItem('user')
    } finally {
      setLoading(false)
    }
  }

  // --------------------
  // Login
  // --------------------
  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      })

      const data = await response.json()

      if (response.ok) {
        const { accessToken, user } = data.data
        localStorage.setItem('accessToken', accessToken)
        localStorage.setItem('user', JSON.stringify(user))
        setUser(user)
        toast.success('Login successful!')
        router.push('/')
      } else {
        toast.error(data.message || 'Login failed')
      }
    } catch (error) {
      toast.error('Incorrect email or password')
      console.error('Login error:', error)
    }
  }

  // --------------------
  // Register ✅ (now accepts FormData or object)
  // --------------------
  const register = async (userData: RegisterData | FormData) => {
    try {
      let formData: FormData

      if (userData instanceof FormData) {
        formData = userData
      } else {
        formData = new FormData()
        formData.append('username', userData.username)
        formData.append('email', userData.email)
        formData.append('password', userData.password)
        formData.append('fullName', userData.fullName)

        if (userData.avatar && userData.avatar instanceof File) {
          formData.append('avatar', userData.avatar)
        }
        if (userData.coverImage && userData.coverImage instanceof File) {
          formData.append('coverImage', userData.coverImage)
        }
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/register`, {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Registration successful! Please login.')
        router.push('/login')
      } else {
        toast.error(data.message || 'Registration failed')
      }
    } catch (error) {
      toast.error('Registration failed')
      console.error('Registration error:', error)
    }
  }

  // --------------------
  // Logout
  // --------------------
  const logout = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/logout`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      })

      localStorage.removeItem('accessToken')
      localStorage.removeItem('user')
      setUser(null)
      toast.success('Logged out successfully')
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
      localStorage.removeItem('accessToken')
      localStorage.removeItem('user')
      setUser(null)
      router.push('/login')
    }
  }

  // --------------------
  // Update Profile
  // --------------------
  const updateProfile = async (data: Partial<User>) => {
    try {
      const token = localStorage.getItem('accessToken')
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/update-account`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        const updatedUser = await response.json()
        setUser(updatedUser.data)
        toast.success('Profile updated successfully')
      } else {
        toast.error('Failed to update profile')
      }
    } catch (error) {
      toast.error('Failed to update profile')
      console.error('Update profile error:', error)
    }
  }

  // --------------------
  // Provide Context
  // --------------------
  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
