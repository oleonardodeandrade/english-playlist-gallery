import { useState, useEffect } from 'react';
import { VideoList } from '../components/VideoList';
import { VideoPlayer } from '../components/VideoPlayer';
import { apiClient } from '../services/api';
import type { VideoPlaylistItem } from '../types/video.types';

export const Home = () => {
  const [videos, setVideos] = useState<VideoPlaylistItem[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  const filteredVideos = videos?.filter((video) =>
    video.snippet.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm" role="banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">English Playlist Gallery</h1>
              <p className="mt-2 text-gray-600">
                Interactive video gallery to help you learn English
              </p>
            </div>
            <button
              onClick={handleSync}
              disabled={syncing || loading}
              className="pl-8 pr-12 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-3 text-base font-medium"
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
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" role="main">
        {error && (
          <div
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6"
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
            <h2 className="text-2xl font-bold text-gray-900">Video Gallery</h2>
            <div className="w-full max-w-sm min-w-[200px]">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="Search videos"
                aria-label="Search videos"
              />
            </div>
          </div>
          <VideoList videos={filteredVideos || []} loading={loading} />
        </section>
      </main>
    </div>
  );
};
