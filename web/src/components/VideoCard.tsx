import { useRef, useEffect } from 'react';
import { useVideo } from '../hooks/useVideo';
import { useFavorites } from '../hooks/useFavorites';
import type { VideoPlaylistItem } from '../types/video.types';

interface VideoCardProps {
  video: VideoPlaylistItem;
}

export const VideoCard = ({ video }: VideoCardProps) => {
  const { selectedVideo, setSelectedVideo } = useVideo();
  const { toggleFavorite, isFavorite } = useFavorites();
  const isSelected = selectedVideo?.id === video.id;
  const isFav = isFavorite(video.id);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSelected && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [isSelected]);

  const formattedDate = new Date(video.contentDetails.videoPublishedAt).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const handleClick = () => {
    setSelectedVideo(video);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setSelectedVideo(video);
    }
  };

  const handleFavoriteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    toggleFavorite(video.id);
  };

  return (
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      aria-label={`Watch video: ${video.snippet.title}, published on ${formattedDate}`}
      aria-pressed={isSelected}
      className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer ${
        isSelected ? 'ring-4 ring-blue-500 scale-105' : ''
      }`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <div className="relative aspect-video bg-gray-100">
        <img
          src={video.snippet.thumbnails.high.url}
          alt={video.snippet.title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <button
          onClick={handleFavoriteClick}
          aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
          className="absolute top-2 right-2 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-200 hover:scale-110 active:scale-95"
        >
          <svg
            className={`w-5 h-5 transition-colors ${
              isFav ? 'fill-red-500 stroke-red-500' : 'fill-none stroke-gray-700'
            }`}
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">
          {video.snippet.title}
        </h3>
        <p className="text-sm text-gray-600">
          {formattedDate}
        </p>
      </div>
    </div>
  );
};
