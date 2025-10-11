"use client";
import UnauthenticatedPrompt from "@/components/UnauthenticatedPrompt";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { groupHistoryByDate } from "@/lib/utils";
import HistoryHeader from "@/components/history/HistoryHeader";
import HistoryList from "@/components/history/HistoryList";
import LoadingState from "@/components/history/LoadingState";
import ErrorState from "@/components/history/ErrorState";

const HistoryPage = () => {
  const router = useRouter();
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

  const handleVideoClick = async (video: any) => {
    if (video._id) {
      try {
        await api.post('/users/history/add', { videoId: video._id });
      } catch (err: any) {
        if (err.response?.status === 401) {
          // Handle unauthorized error silently
        }
      }
      router.push(`/watch/${video._id}`);
    }
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
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
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

  const groupedHistory = groupHistoryByDate(watchHistory);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <HistoryHeader
          historyCount={watchHistory.length}
          onClearAll={handleClearAllHistory}
          clearingAll={clearingAll}
        />

        <HistoryList
          groupedHistory={groupedHistory}
          onVideoClick={handleVideoClick}
          onDeleteHistory={handleDeleteHistory}
          deletingId={deletingId}
          activeMenu={activeMenu}
          onToggleMenu={toggleMenu}
          onCloseMenu={() => setActiveMenu(null)}
        />
      </div>
    </div>
  );
};



export default HistoryPage;
