import React from 'react'

interface SkeletonBaseProps {
  className?: string
  variant?: 'rectangular' | 'circular' | 'text'
  width?: string | number
  height?: string | number
  children?: React.ReactNode
}

const SkeletonBase: React.FC<SkeletonBaseProps> = ({
  className = '',
  variant = 'rectangular',
  width,
  height,
  children
}) => {
  const baseClasses = 'bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] animate-shimmer'
  
  const variantClasses = {
    rectangular: 'rounded-md',
    circular: 'rounded-full',
    text: 'rounded-md'
  }

  const style: React.CSSProperties = {}
  if (width) style.width = typeof width === 'number' ? `${width}px` : width
  if (height) style.height = typeof height === 'number' ? `${height}px` : height

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}

export default SkeletonBase
