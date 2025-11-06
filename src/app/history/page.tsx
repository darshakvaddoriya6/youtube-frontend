"use client";
import { useState, useEffect } from 'react';
import UnauthenticatedPrompt from "@/components/UnauthenticatedPrompt";
import { groupHistoryByDate } from "@/lib/utils";
import HistoryHeader from "@/components/history/HistoryHeader";
import HistoryList from "@/components/history/HistoryList";
import LoadingState from "@/components/history/LoadingState";
import ErrorState from "@/components/history/ErrorState";
import { useWatchHistory } from "@/hooks/useWatchHistory";

const HistoryPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('accessToken');
      setIsAuthenticated(!!token);
      setAuthLoading(false)
    };
    checkAuth();
  }, []);



  const {
    watchHistory,
    loading,
    error,
    deletingId,
    clearingAll,
    activeMenu,
    handleDeleteHistory,
    handleClearAllHistory,
    handleVideoClick,
    toggleMenu,
    closeMenu,
  } = useWatchHistory(isAuthenticated);

  if (authLoading) {
    return <LoadingState />
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
      <div className="max-w-6xl mx-auto px-3 lg:px-6 py-4 lg:py-8">

        {loading && <LoadingState />}
        {error && <ErrorState error={error} />}

        {!loading && !error && (
          <HistoryHeader
            historyCount={watchHistory.length}
            onClearAll={handleClearAllHistory}
            clearingAll={clearingAll}
          />
        )}

        {!loading && !error && (
          <HistoryList
            groupedHistory={groupedHistory}
            onVideoClick={handleVideoClick}
            onDeleteHistory={handleDeleteHistory}
            deletingId={deletingId}
            activeMenu={activeMenu}
            onToggleMenu={toggleMenu}
            onCloseMenu={closeMenu}
          />
        )}
      </div>
    </div>
  );
};



export default HistoryPage;
