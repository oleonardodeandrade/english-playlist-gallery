import { useState, useEffect } from 'react';
import { VideoList } from '../components/VideoList';
import { Video } from '../types/video.types';
import { apiClient } from '../services/api';

export const Home = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        setLoading(true);
        const data = await apiClient.fetchVideos();
        setVideos(data);
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

  const handleVideoClick = (video: Video) => {
    console.log('Video clicked:', video);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-gray-900">English Playlist Gallery</h1>
          <p className="mt-2 text-gray-600">
            Interactive video gallery to help you learn English
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        <VideoList videos={videos} loading={loading} onVideoClick={handleVideoClick} />
      </main>
    </div>
  );
};
