import { useRef, useEffect } from 'react';
import { useVideo } from '../hooks/useVideo';
import type { VideoPlaylistItem } from '../types/video.types';

interface VideoCardProps {
  video: VideoPlaylistItem;
}

export const VideoCard = ({ video }: VideoCardProps) => {
  const { selectedVideo, setSelectedVideo } = useVideo();
  const isSelected = selectedVideo?.id === video.id;
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
      <div className="aspect-video bg-gray-100">
        <img
          src={video.snippet.thumbnails.high.url}
          alt={video.snippet.title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
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
