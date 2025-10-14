'use client'

import { useState, useRef } from 'react'
import { X, Copy, Check, Facebook, Twitter, MessageCircle } from 'lucide-react'

interface ShareModalProps {
    isOpen: boolean
    onClose: () => void
    channelUrl: string
    channelName: string
}

export default function ShareModal({ isOpen, onClose, channelUrl, channelName }: ShareModalProps) {
    const [copied, setCopied] = useState(false)
    const modalRef = useRef<HTMLDivElement>(null)

    if (!isOpen) return null

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onClose()
        }
    }

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(channelUrl)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy link:', err)
        }
    }

    const shareOptions = [
        {
            name: 'Facebook',
            icon: Facebook,
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(channelUrl)}`,
            color: 'bg-blue-600 hover:bg-blue-700'
        },
        {
            name: 'Twitter',
            icon: Twitter,
            url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(channelUrl)}&text=${encodeURIComponent(`${channelName}`)}`,
            color: 'bg-sky-500 hover:bg-sky-600'
        },
        {
            name: 'WhatsApp',
            icon: MessageCircle,
            url: `https://wa.me/?text=${encodeURIComponent(`${channelUrl}`)}`,
            color: 'bg-green-500 hover:bg-green-600'
        }
    ]

    const handleSocialShare = (url: string) => {
        window.open(url, '_blank', 'width=600,height=400')
    }

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={handleBackdropClick}
        >
            <div
                ref={modalRef}
                className="bg-white rounded-lg max-w-md w-full p-6"
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold">Share Channel</h2>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Copy Link Section */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Channel Link
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={channelUrl}
                            readOnly
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm"
                        />
                        <button
                            onClick={handleCopyLink}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${copied
                                    ? 'bg-green-100 text-green-700 border border-green-300'
                                    : 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200'
                                }`}
                        >
                            {copied ? (
                                <>
                                    <Check className="h-4 w-4 inline mr-1" />
                                    Copied
                                </>
                            ) : (
                                <>
                                    <Copy className="h-4 w-4 inline mr-1" />
                                    Copy
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Social Share Options */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                        Share on Social Media
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                        {shareOptions.map((option) => (
                            <button
                                key={option.name}
                                onClick={() => handleSocialShare(option.url)}
                                className={`flex flex-col items-center gap-2 p-3 rounded-lg text-white transition-colors ${option.color}`}
                            >
                                <option.icon className="h-5 w-5" />
                                <span className="text-xs font-medium">{option.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}