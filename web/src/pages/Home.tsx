import { useState, useEffect } from 'react';
import { VideoList } from '../components/VideoList';
import { VideoPlayer } from '../components/VideoPlayer';
import { apiClient } from '../services/api';
import type { VideoPlaylistItem } from '../types/video.types';

export const Home = () => {
  const [videos, setVideos] = useState<VideoPlaylistItem[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm" role="banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">English Playlist Gallery</h1>
          <p className="mt-2 text-gray-600">
            Interactive video gallery to help you learn English
          </p>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Video Gallery</h2>
          <VideoList videos={videos || []} loading={loading} />
        </section>
      </main>
    </div>
  );
};
