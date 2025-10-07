import { Video } from '../types/video.types';

interface VideoCardProps {
  video: Video;
  onClick?: () => void;
}

export const VideoCard = ({ video, onClick }: VideoCardProps) => {
  const formattedDate = new Date(video.publishedAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-video bg-gray-100">
        <img
          src={video.thumbnailUrl}
          alt={video.title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 line-clamp-2 mb-2">{video.title}</h3>
        <p className="text-sm text-gray-600">{formattedDate}</p>
      </div>
    </div>
  );
};
