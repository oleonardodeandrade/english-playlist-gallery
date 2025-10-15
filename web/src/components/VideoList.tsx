import { memo } from 'react';
import type { VideoPlaylistItem } from '../types/video.types';
import { VideoCard } from './VideoCard';
import { VideoCardSkeleton } from './VideoCardSkeleton';

interface VideoListProps {
  videos: VideoPlaylistItem[];
  loading?: boolean;
}

const VideoListComponent = ({ videos, loading = false }: VideoListProps) => {
  if (loading) {
    return (
      <section aria-label="Loading videos" aria-busy="true">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <VideoCardSkeleton key={index} />
          ))}
        </div>
      </section>
    );
  }

  if (videos?.length === 0) {
    return (
      <section aria-label="No videos found" role="status">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No videos found</h3>
            <p className="text-gray-600">There are no videos to display at this time.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section aria-label="Playlist video gallery">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" role="list">
        {videos?.map((video, index) => (
          <div
            key={video.id}
            className="animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
            role="listitem"
          >
            <VideoCard video={video} />
          </div>
        ))}
      </div>
    </section>
  );
};

export const VideoList = memo(VideoListComponent);
