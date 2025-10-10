import ReactPlayer from 'react-player';
import { useVideo } from '../hooks/useVideo';
import { VideoPlayerSkeleton } from './VideoPlayerSkeleton';

interface VideoPlayerProps {
  loading?: boolean;
}

export const VideoPlayer = ({ loading = false }: VideoPlayerProps) => {
  const { selectedVideo } = useVideo();

  if (loading) {
    return <VideoPlayerSkeleton />;
  }

  if (!selectedVideo) {
    return (
      <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
        <div className="text-center text-white">
          <svg
            className="mx-auto h-16 w-16 text-gray-500 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
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
      </div>
    );
  }

  const videoUrl = `https://www.youtube.com/watch?v=${selectedVideo.snippet.resourceId.videoId}`;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-fade-in">
      <div className="aspect-video">
        <ReactPlayer
          src={videoUrl}
          width="100%"
          height="100%"
          playing
          controls
        />
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedVideo.snippet.description}</h2>
        <p className="text-gray-600 text-sm mb-4">
          {new Date(selectedVideo.contentDetails.videoPublishedAt).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })}
        </p>
        {selectedVideo.snippet.description && (
          <p className="text-gray-700 whitespace-pre-line">{selectedVideo.snippet.description}</p>
        )}
      </div>
    </div>
  );
};
