import type { VideoPlaylistItem, SortOption } from '../types/video.types';

export const sortVideos = (
  videos: VideoPlaylistItem[],
  sortOption: SortOption
): VideoPlaylistItem[] => {
  const sortedVideos = [...videos];

  switch (sortOption) {
    case 'position':
      return sortedVideos.sort((a, b) => a.snippet.position - b.snippet.position);

    case 'date':
      return sortedVideos.sort(
        (a, b) =>
          new Date(b.snippet.publishedAt).getTime() - new Date(a.snippet.publishedAt).getTime()
      );

    case 'title':
      return sortedVideos.sort((a, b) =>
        a.snippet.title.localeCompare(b.snippet.title, 'en', { sensitivity: 'base' })
      );

    default:
      return sortedVideos;
  }
};
