import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const videoUrl = searchParams.get('url')

  if (!videoUrl) {
    return NextResponse.json({ error: 'Video URL is required' }, { status: 400 })
  }

  try {
    // Validate it's a Cloudinary URL for security
    if (!videoUrl.includes('cloudinary.com')) {
      return NextResponse.json({ error: 'Invalid video source' }, { status: 400 })
    }

    const response = await fetch(videoUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; VideoProxy/1.0)',
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const videoBuffer = await response.arrayBuffer()

    return new NextResponse(videoBuffer, {
      status: 200,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'video/mp4',
        'Content-Length': response.headers.get('Content-Length') || videoBuffer.byteLength.toString(),
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
        'Access-Control-Allow-Headers': 'Range, Content-Range, Content-Length',
        // Prevent caching issues
        'X-Content-Type-Options': 'nosniff',
        'Vary': 'Accept-Encoding',
      },
    })
  } catch (error) {
    console.error('Video proxy error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch video' },
      { status: 500 }
    )
  }
}

export async function HEAD(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const videoUrl = searchParams.get('url')

  if (!videoUrl || !videoUrl.includes('cloudinary.com')) {
    return new NextResponse(null, { status: 400 })
  }

  try {
    const response = await fetch(videoUrl, { method: 'HEAD' })
    
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'video/mp4',
        'Content-Length': response.headers.get('Content-Length') || '0',
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (error) {
    return new NextResponse(null, { status: 500 })
  }
}