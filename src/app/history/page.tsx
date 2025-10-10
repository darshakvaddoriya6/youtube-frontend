"use client";
import UnauthenticatedPrompt from "@/components/UnauthenticatedPrompt";
import { useState, useEffect } from "react";
import {
  History,
  MoreVertical,
  Play,
  Trash2,
  Clock,
  ListPlus,
  Bookmark,
  Download,
  Share2,
  X,
} from "lucide-react";
import api from "@/lib/api";

const HistoryPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [watchHistory, setWatchHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [clearingAll, setClearingAll] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    const fetchWatchHistory = async () => {
      if (!isAuthenticated) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await api.get("/users/history");

        let historyData = [];
        if (response.data?.data?.history) {
          historyData = response.data.data.history;
        } else if (response.data?.history) {
          historyData = response.data.history;
        }

        setWatchHistory(historyData);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An error occurred";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchHistory();
  }, [isAuthenticated]);

  const handleDeleteHistory = async (historyId: string) => {
    if (!confirm("Remove from Watch history?")) return;

    try {
      setDeletingId(historyId);
      await api.delete(`/users/history/delete/${historyId}`);
      setWatchHistory((prev) => prev.filter((item) => item._id !== historyId));
      setActiveMenu(null);
    } catch (err) {
      console.error("Failed to delete history:", err);
      alert("Failed to delete history item");
    } finally {
      setDeletingId(null);
    }
  };

  const toggleMenu = (id: string) => {
    setActiveMenu(activeMenu === id ? null : id);
  };

  const handleClearAllHistory = async () => {
    if (!confirm("Clear all watch history? This action cannot be undone."))
      return;

    try {
      setClearingAll(true);
      await api.delete("/users/history/watch-history/clear");
      setWatchHistory([]);
      setActiveMenu(null);
    } catch (err) {
      console.error("Failed to clear history:", err);
      alert("Failed to clear watch history");
    } finally {
      setClearingAll(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center mb-8">
            <History className="h-8 w-8 mr-3 text-gray-900" />
            <h1 className="text-3xl font-semibold text-gray-900">History</h1>
          </div>
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center mb-8">
            <History className="h-8 w-8 mr-3 text-gray-900" />
            <h1 className="text-3xl font-semibold text-gray-900">History</h1>
          </div>
          <div className="text-center py-20">
            <div className="text-red-500 text-2xl mb-3">⚠️</div>
            <p className="text-red-600 font-medium text-lg">
              Error loading watch history
            </p>
            <p className="text-gray-600 text-sm mt-2">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 px-6 py-2.5 bg-gray-900 text-white rounded-full hover:bg-gray-800 font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <UnauthenticatedPrompt
        pageTitle="Watch History"
        pageDescription="Keep up with your favorite channels and creators by signing in to your account."
        features={[
          "Get notified about new videos",
          "Access your personalized feed",
          "Manage your subscriptions",
          "Continue watching where you left off",
          "Save videos to watch later",
          "Like and comment on videos",
        ]}
      />
    );
  }

  // Group history by date and format like YouTube
  const groupedHistory = watchHistory.reduce((acc, item) => {
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
      // Show month and day for older videos (e.g., "Dec 25" instead of full date)
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

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <History className="h-8 w-8 mr-3 text-gray-900" />
            <h1 className="text-3xl font-semibold text-gray-900">History</h1>
          </div>
          {watchHistory.length > 0 && (
            <button
              onClick={handleClearAllHistory}
              disabled={clearingAll}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-red-500 rounded-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition duration-300"
            >
              {clearingAll ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-700"></div>
                  <span>Clearing...</span>
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4" />
                  <span>Clear all history</span>
                </>
              )}
            </button>
          )}
        </div>

        {watchHistory.length === 0 ? (
          <div className="text-center py-20">
            <History className="h-20 w-20 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-700 text-xl font-medium">
              Keep track of what you watch
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Watch history isn't viewable when signed out
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedHistory || {}).map(([date, items]) => (
              <div key={date}>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  {date}
                </h2>
                <div className="space-y-4">
                  {Array.isArray(items) &&
                    items.map((item: any) => {
                      const video = item.video || item;
                      if (!video) return null;

                      return (
                        <div
                          key={item._id}
                          className="flex items-start gap-4 group"
                        >
                          {/* Thumbnail */}
                          <div className="relative flex-shrink-0 cursor-pointer">
                            <img
                              src={video.thumbnail}
                              alt={video.title}
                              className="w-[246px] h-[138px] object-contain rounded-xl hover:rounded-none transition-all duration-200"
                            />
                            <div className="absolute bottom-2 right-2 bg-black bg-opacity-90 text-white text-xs font-semibold px-1.5 py-0.5 rounded">
                              {video.duration
                                ? formatDuration(video.duration)
                                : "0:00"}
                            </div>
                          </div>

                          {/* Video Info */}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium w-fit text-base text-gray-900 mb-1 cursor-pointer hover:text-gray-700 line-clamp-2">
                              {video.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-1 cursor-pointer hover:text-gray-900">
                              {video.owner?.fullName ||
                                video.owner?.username ||
                                "Unknown Channel"}
                            </p>
                            <div className="flex items-center text-sm text-gray-600">
                              <span>
                                {video.views
                                  ? formatViews(video.views)
                                  : "0 views"}
                              </span>
                            </div>
                          </div>

                          {/* Menu Button */}

                          <div className="relative flex-shrink-0 flex">
                            <button
                              onClick={() => handleDeleteHistory(item._id)}
                              disabled={deletingId === item._id}
                              className="w-full px-4 py-2.5 text-left hover:bg-red-100 flex items-center gap-3 text-sm"
                            >
                              <X className="h-5 w-5" />
                            </button>
                            <button
                              onClick={() => toggleMenu(item._id)}
                              className="p-2 rounded-full  hover:bg-gray-100 transition-opacity"
                            >
                              <MoreVertical className="h-5 w-5 text-gray-700" />
                            </button>

                            {/* Dropdown Menu */}
                            {activeMenu === item._id && (
                              <>
                                <div
                                  className="fixed inset-0 z-10"
                                  onClick={() => setActiveMenu(null)}
                                ></div>
                                <div className="absolute right-0 top-10 z-20 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 py-2">
                                  <button className="w-full px-4 py-2.5 text-left hover:bg-gray-100 flex items-center gap-3 text-sm">
                                    <ListPlus className="h-5 w-5" />
                                    <span>Add to queue</span>
                                  </button>
                                  <button className="w-full px-4 py-2.5 text-left hover:bg-gray-100 flex items-center gap-3 text-sm">
                                    <Clock className="h-5 w-5" />
                                    <span>Save to Watch later</span>
                                  </button>
                                  <button className="w-full px-4 py-2.5 text-left hover:bg-gray-100 flex items-center gap-3 text-sm">
                                    <Bookmark className="h-5 w-5" />
                                    <span>Save to playlist</span>
                                  </button>
                                  <button className="w-full px-4 py-2.5 text-left hover:bg-gray-100 flex items-center gap-3 text-sm">
                                    <Download className="h-5 w-5" />
                                    <span>Download</span>
                                  </button>
                                  <button className="w-full px-4 py-2.5 text-left hover:bg-gray-100 flex items-center gap-3 text-sm">
                                    <Share2 className="h-5 w-5" />
                                    <span>Share</span>
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Helper functions
const formatDuration = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  }
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
};

const formatViews = (views: number) => {
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M views`;
  if (views >= 1000) return `${(views / 1000).toFixed(1)}K views`;
  return `${views} views`;
};

export default HistoryPage;
