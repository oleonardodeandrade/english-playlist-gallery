export const VideoCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="aspect-video bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200"></div>
      <div className="p-4 space-y-3">
        <div className="space-y-2">
          <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded"></div>
          <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-3/4"></div>
        </div>
        <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );
};
