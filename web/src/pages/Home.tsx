import { useState, useEffect, useMemo } from 'react';
import { VideoList } from '../components/VideoList';
import { VideoPlayer } from '../components/VideoPlayer';
import { SortDropdown } from '../components/SortDropdown';
import { DarkModeToggle } from '../components/DarkModeToggle';
import { useFavorites } from '../hooks/useFavorites';
import { apiClient } from '../services/api';
import { sortVideos } from '../utils/sortVideos';
import type { VideoPlaylistItem, SortOption } from '../types/video.types';

export const Home = () => {
  const [videos, setVideos] = useState<VideoPlaylistItem[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('position');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const { favorites, favoritesCount } = useFavorites();

  useEffect(() => {
    const loadVideos = async () => {
      try {
        setLoading(true);
        const data = await apiClient.fetchVideos();
        console.log('Data:', data);
        setVideos(data.items);
        setError(null);
      } catch (err) {
        console.error('Error loading videos:', err);
        setError('Failed to load videos. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

  const handleSync = async () => {
    try {
      setSyncing(true);
      setError(null);
      const data = await apiClient.fetchVideos();
      setVideos(data.items);
    } catch (err) {
      console.error('Error syncing playlist:', err);
      setError('Failed to sync playlist. Please try again later.');
    } finally {
      setSyncing(false);
    }
  };

  const filteredAndSortedVideos = useMemo(() => {
    if (!videos) return [];

    let filtered = videos.filter((video) =>
      video.snippet.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (showFavoritesOnly) {
      filtered = filtered.filter((video) => favorites.includes(video.id));
    }

    return sortVideos(filtered, sortOption);
  }, [videos, searchQuery, sortOption, showFavoritesOnly, favorites]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <header className="bg-white dark:bg-gray-800 shadow-sm transition-colors" role="banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">English Playlist Gallery</h1>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Interactive video gallery to help you learn English
              </p>
            </div>
            <div className="flex items-center gap-3">
              <DarkModeToggle />
              <button
                onClick={handleSync}
                disabled={syncing || loading}
                className="pl-8 pr-12 py-4 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors flex items-center gap-3 text-base font-medium"
                aria-label="Sync playlist with YouTube"
              >
              <svg
                className={`w-5 h-5 ${syncing ? 'animate-spin' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
                {syncing ? 'Syncing' : 'Sync Playlist'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" role="main">
        {error && (
          <div
            className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg mb-6 transition-colors"
            role="alert"
            aria-live="assertive"
          >
            {error}
          </div>
        )}

        <section className="mb-8" aria-label="Main video player">
          <VideoPlayer loading={loading} />
        </section>

        <section aria-label="Video gallery">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Video Gallery</h2>
              <button
                onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  showFavoritesOnly
                    ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                aria-label={showFavoritesOnly ? 'Show all videos' : 'Show favorites only'}
              >
                <svg
                  className={`w-5 h-5 ${showFavoritesOnly ? 'fill-red-500' : 'fill-gray-500'}`}
                  viewBox="0 0 24 24"
                >
                  <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                <span className="text-sm font-medium">
                  {showFavoritesOnly ? 'Favorites' : 'All'} ({showFavoritesOnly ? favoritesCount : videos?.length || 0})
                </span>
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-full max-w-[200px]">
                <SortDropdown value={sortOption} onChange={setSortOption} />
              </div>
              <div className="w-full max-w-sm min-w-[200px]">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent placeholder:text-slate-400 dark:placeholder:text-slate-500 text-slate-700 dark:text-slate-200 text-sm border border-slate-200 dark:border-slate-600 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 dark:focus:border-slate-500 hover:border-slate-300 dark:hover:border-slate-500 shadow-sm focus:shadow"
                  placeholder="Search videos"
                  aria-label="Search videos"
                />
              </div>
            </div>
          </div>
          <VideoList videos={filteredAndSortedVideos} loading={loading} />
        </section>
      </main>
    </div>
  );
};
