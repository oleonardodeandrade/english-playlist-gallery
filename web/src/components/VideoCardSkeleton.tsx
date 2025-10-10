export const VideoCardSkeleton = () => {
  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse opacity-70"
      role="status"
      aria-label="Loading video"
      aria-busy="true"
    >
      <div className="aspect-video bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer"></div>
      <div className="p-4 space-y-3">
        <div className="space-y-2">
          <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-shimmer"></div>
          <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-3/4 animate-shimmer"></div>
        </div>
        <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded w-1/2 animate-shimmer"></div>
      </div>
      <span className="sr-only">Loading video content...</span>
    </div>
  );
};
