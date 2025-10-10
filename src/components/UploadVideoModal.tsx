'use client'

import { useState } from 'react'
import { X, Upload, Image } from 'lucide-react'
import api from '@/lib/api'

interface UploadVideoModalProps {
  isOpen: boolean
  onClose: () => void
}

const UploadVideoModal = ({ isOpen, onClose }: UploadVideoModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoFile: null as File | null,
    thumbnail: null as File | null,
  })
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target
    if (files && files[0]) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    // Validation
    if (!formData.title.trim()) {
      setError('Title is required')
      return
    }
    if (!formData.description.trim()) {
      setError('Description is required')
      return
    }
    if (!formData.videoFile) {
      setError('Video file is required')
      return
    }
    if (!formData.thumbnail) {
      setError('Thumbnail is required')
      return
    }

    setIsUploading(true)

    try {
      const submitData = new FormData()
      submitData.append('title', formData.title)
      submitData.append('description', formData.description)
      submitData.append('videoFile', formData.videoFile)
      submitData.append('thumbnail', formData.thumbnail)

      await api.post('/videos', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      // Show success message
      setSuccess('Video uploaded successfully!')

      // Reset form after showing success message
      setTimeout(() => {
        setFormData({
          title: '',
          description: '',
          videoFile: null,
          thumbnail: null,
        })
        setSuccess('')
        onClose()
        window.location.reload()
      }, 1500)

    } catch (err: any) {
      console.error('Upload error:', err)
      setError(err.response?.data?.message || 'Failed to upload video')
    } finally {
      setIsUploading(false)
    }
  }

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      videoFile: null,
      thumbnail: null,
    })
    setError('')
    setSuccess('')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[2147483647] p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Upload video</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {success && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 text-sm">{success}</p>
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter video title"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter video description"
              required
            />
          </div>

          {/* Video File */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Video File *
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <input
                type="file"
                name="videoFile"
                onChange={handleFileChange}
                accept="video/*"
                className="hidden"
                id="videoFile"
                required
              />
              <label
                htmlFor="videoFile"
                className="flex flex-col items-center cursor-pointer"
              >
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">
                  {formData.videoFile ? formData.videoFile.name : 'Click to upload video file'}
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  MP4, MOV, AVI up to 100MB
                </span>
              </label>
            </div>
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Thumbnail *
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              <input
                type="file"
                name="thumbnail"
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
                id="thumbnail"
                required
              />
              <label
                htmlFor="thumbnail"
                className="flex flex-col items-center cursor-pointer"
              >
                <Image className="h-8 w-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-600">
                  {formData.thumbnail ? formData.thumbnail.name : 'Click to upload thumbnail'}
                </span>
                <span className="text-xs text-gray-500 mt-1">
                  JPG, PNG up to 5MB
                </span>
              </label>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
              disabled={isUploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg disabled:opacity-50"
              disabled={isUploading || !!success}
            >
              {isUploading ? 'Uploading...' : success ? 'Uploaded!' : 'Upload'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default UploadVideoModal
