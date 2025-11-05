import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

// Public API instance that doesn't redirect on 401 (for anonymous access)
export const publicApi = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Public API request interceptor (optional auth)
publicApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Try to refresh token
      try {
        const refreshResponse = await axios.post(`${API_BASE_URL}/users/refresh-token`, {}, { withCredentials: true })
        const { accessToken } = refreshResponse.data.data

        localStorage.setItem('accessToken', accessToken)

        // Retry original request
        error.config.headers.Authorization = `Bearer ${accessToken}`
        return api(error.config)
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem('accessToken')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

// Public API response interceptor (no redirect on 401)
publicApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Try to refresh token but don't redirect on failure
      try {
        const refreshResponse = await axios.post(`${API_BASE_URL}/users/refresh-token`, {}, { withCredentials: true })
        const { accessToken } = refreshResponse.data.data

        localStorage.setItem('accessToken', accessToken)

        // Retry original request
        error.config.headers.Authorization = `Bearer ${accessToken}`
        return publicApi(error.config)
      } catch (refreshError) {
        // Refresh failed, just remove token but don't redirect
        localStorage.removeItem('accessToken')
      }
    }
    return Promise.reject(error)
  }
)

// Watch Later API functions
export const watchLaterApi = {
  getWatchLater: () => api.get('/users/watch-later'),
  toggleWatchLater: (videoId: string) => api.post('/users/watch-later/toggle', { videoId }),
  clearWatchLater: () => api.delete('/users/watch-later/clear'),
}

// Playlist API functions
export const playlistApi = {
  toggleSave: (playlistId: string) => api.post('/users/playlist/toggle', { playlistId }),
  getSavedPlaylists: () => api.get('/users/playlist/saved'),
}

export default api
