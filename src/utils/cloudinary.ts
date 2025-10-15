/**
 * Generate optimized Cloudinary video URL with proper caching headers
 */
export function getOptimizedVideoUrl(cloudinaryUrl: string): string {
  if (!cloudinaryUrl) return ''
  
  // If it's already optimized, return as is
  if (cloudinaryUrl.includes('/video/upload/')) {
    // Add optimization parameters to existing Cloudinary URL
    const optimizedUrl = cloudinaryUrl.replace(
      '/video/upload/',
      '/video/upload/f_auto,q_auto:good,fl_progressive/'
    )
    return optimizedUrl
  }
  
  return cloudinaryUrl
}

/**
 * Get video URL with proxy for better caching (optional)
 */
export function getProxiedVideoUrl(cloudinaryUrl: string): string {
  if (!cloudinaryUrl) return ''
  
  // Use proxy only in production for better caching
  if (process.env.NODE_ENV === 'production') {
    return `/api/video-proxy?url=${encodeURIComponent(cloudinaryUrl)}`
  }
  
  return getOptimizedVideoUrl(cloudinaryUrl)
}

/**
 * Generate multiple video sources for better browser compatibility
 */
export function getVideoSources(cloudinaryUrl: string) {
  if (!cloudinaryUrl) return []
  
  const baseUrl = cloudinaryUrl.replace('/video/upload/', '/video/upload/f_auto,q_auto:good,fl_progressive/')
  
  return [
    {
      src: baseUrl.replace(/\.[^.]+$/, '.mp4'),
      type: 'video/mp4'
    },
    {
      src: baseUrl.replace(/\.[^.]+$/, '.webm'),
      type: 'video/webm'
    }
  ]
}