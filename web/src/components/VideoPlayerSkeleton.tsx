export const VideoPlayerSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden animate-pulse">
      <div className="aspect-video bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
      <div className="p-6 space-y-4">
        <div className="space-y-3">
          <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded"></div>
          <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-4/5"></div>
        </div>
        <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-1/3"></div>
        <div className="space-y-2 pt-2">
          <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded"></div>
          <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded"></div>
          <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    </div>
  );
};
