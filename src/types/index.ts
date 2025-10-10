export interface Video {
  _id: string
  title: string
  description: string
  videoFile: string
  thumbnail: string
  duration: number
  views: number
  isPublished: boolean
  owner: {
    _id: string
    username: string
    fullName: string
    avatar: string
  }
  createdAt: string
  updatedAt: string
}

export interface Comment {
  _id: string
  content: string
  video: string
  owner: {
    _id: string
    username: string
    fullName: string
    avatar: string
  }
  createdAt: string
  updatedAt: string
}

export interface Like {
  _id: string
  video?: string
  comment?: string
  tweet?: string
  likedBy: string
}

export interface Playlist {
  _id: string
  name: string
  description: string
  videos: Video[]
  owner: {
    _id: string
    username: string
    fullName: string
    avatar: string
  }
  createdAt: string
  updatedAt: string
}

export interface Subscription {
  _id: string
  subscriber: {
    _id: string
    username: string
    fullName: string
    avatar: string
  }
  channel: {
    _id: string
    username: string
    fullName: string
    avatar: string
  }
}

export interface Tweet {
  _id: string
  content: string
  owner: {
    _id: string
    username: string
    fullName: string
    avatar: string
  }
  createdAt: string
  updatedAt: string
}

export interface User {
  _id: string
  username: string
  email: string
  fullName: string
  avatar: string
  coverImage?: string
  watchHistory: Video[]
}




