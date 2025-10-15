import { memo } from 'react';
import ReactPlayer from 'react-player';
import { useVideo } from '../hooks/useVideo';
import { VideoPlayerSkeleton } from './VideoPlayerSkeleton';

interface VideoPlayerProps {
  loading?: boolean;
}

const VideoPlayerComponent = ({ loading = false }: VideoPlayerProps) => {
  const { selectedVideo } = useVideo();

  if (loading) {
    return <VideoPlayerSkeleton />;
  }

  if (!selectedVideo) {
    return (
      <section
        className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center"
        role="status"
        aria-label="No video selected"
      >
        <div className="text-center text-white">
          <svg
            className="mx-auto h-16 w-16 text-gray-500 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-lg font-medium">Select a video to start watching</p>
        </div>
      </section>
    );
  }

  const videoUrl = `https://www.youtube.com/watch?v=${selectedVideo.snippet.resourceId.videoId}`;

  return (
    <article
      className="bg-white rounded-lg shadow-lg overflow-hidden animate-fade-in"
      aria-label={`Now playing: ${selectedVideo.snippet.title}`}
    >
      <div className="aspect-video" role="region" aria-label="Video player">
        <ReactPlayer
          src={videoUrl}
          width="100%"
          height="100%"
          playing
          controls
        />
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedVideo.snippet.title}</h2>
        <p className="text-gray-600 text-sm mb-4">
          <time dateTime={selectedVideo.contentDetails.videoPublishedAt}>
            {new Date(selectedVideo.contentDetails.videoPublishedAt).toLocaleDateString('en-US', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </time>
        </p>
        {selectedVideo.snippet.description && (
          <p className="text-gray-700 whitespace-pre-line">{selectedVideo.snippet.description}</p>
        )}
      </div>
    </article>
  );
};

export const VideoPlayer = memo(VideoPlayerComponent);
