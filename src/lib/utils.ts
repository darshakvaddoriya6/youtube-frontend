import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// Helper functions for formatting
export const formatDuration = (seconds: number) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = Math.floor(seconds % 60)

  if (hours > 0) {
    return `${hours}h ${minutes}m ${secs}s`
  } else if (minutes > 0) {
    return `${minutes}m ${secs}s`
  } else {
    return `${secs}s`
  }
}

export const formatViews = (views: number) => {
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M views`;
  if (views >= 1000) return `${(views / 1000).toFixed(1)}K views`;
  return `${views} views`;
};

// Group history by date
export const groupHistoryByDate = (watchHistory: any[]) => {
  return watchHistory.reduce((acc, item) => {
    const watchedDate = new Date(item.watchedAt || new Date());
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    let dateKey = "";

    if (watchedDate.toDateString() === today.toDateString()) {
      dateKey = "Today";
    } else if (watchedDate.toDateString() === yesterday.toDateString()) {
      dateKey = "Yesterday";
    } else {
      const options: Intl.DateTimeFormatOptions = {
        month: "short",
        day: "numeric",
      };
      dateKey = watchedDate.toLocaleDateString("en-US", options);
    }

    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(item);
    return acc;
  }, {} as Record<string, any[]>);
};