'use client'

import { useState } from 'react'
import { X, Image as ImageIcon } from 'lucide-react'
import api from '@/lib/api'
import toast, { Toaster } from 'react-hot-toast'

interface CreatePlaylistModalProps {
    isOpen: boolean
    onClose: () => void
    onPlaylistCreated: () => void
}

const CreatePlaylistModal = ({ isOpen, onClose, onPlaylistCreated }: CreatePlaylistModalProps) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        thumbnail: null as File | null,
        thumbnailPreview: ''
    })
    const [isUploading, setIsUploading] = useState(false)
    const [error, setError] = useState('')

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setFormData(prev => ({
                ...prev,
                thumbnail: file,
                thumbnailPreview: URL.createObjectURL(file)
            }))
        }
    }

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            thumbnail: null,
            thumbnailPreview: ''
        })
        setError('')
    }

    const handleCancel = () => {
        resetForm()
        onClose()
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.name.trim()) {
            setError('Playlist name is required')
            return
        }

        const formPayload = new FormData()
        formPayload.append('name', formData.name)
        formPayload.append('description', formData.description)
        if (formData.thumbnail) {
            formPayload.append('thumbnail', formData.thumbnail)
        }

        try {
            setIsUploading(true)
            setError('')
            await api.post('/playlist', formPayload, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            
            resetForm()
            onPlaylistCreated()
            onClose()
            toast.success('Playlist created successfully!')
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to create playlist')
            toast.error('Failed to create playlist')
        } finally {
            setIsUploading(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] p-4">
            <Toaster position="top-right" containerClassName="mt-20" />
            <div className="bg-white rounded-lg w-full max-w-md relative">
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-xl font-semibold">Create new playlist</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                        disabled={isUploading}
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Thumbnail *
                        </label>
                        <div className="mt-1 flex items-center">
                            <label className="cursor-pointer">
                                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-red-500 transition-colors">
                                    {formData.thumbnailPreview ? (
                                        <img
                                            src={formData.thumbnailPreview}
                                            alt="Thumbnail preview"
                                            className="h-32 w-full object-cover rounded"
                                        />
                                    ) : (
                                        <>
                                            <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
                                            <p className="text-sm text-gray-500">
                                                Click to upload thumbnail
                                            </p>
                                        </>
                                    )}
                                    <input
                                        type="file"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleThumbnailChange}
                                        disabled={isUploading}
                                    />
                                </div>
                            </label>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Playlist Name *
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                            placeholder="Enter playlist name"
                            disabled={isUploading}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description *
                        </label>
                        <textarea
                            name="description"
                            id="description"
                            rows={3}
                            value={formData.description}
                            onChange={handleInputChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                            placeholder="Add a description to your playlist"
                            disabled={isUploading}
                        />
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={isUploading}
                            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isUploading || !formData.name.trim()}
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                        >
                            {isUploading ? 'Creating...' : 'Create Playlist'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreatePlaylistModal
