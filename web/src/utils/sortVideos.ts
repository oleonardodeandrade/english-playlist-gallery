import type { VideoPlaylistItem, SortOption } from '../types/video.types';

export const sortVideos = (
  videos: VideoPlaylistItem[],
  sortOption: SortOption
): VideoPlaylistItem[] => {
  const videosCopy = [...videos];

  switch (sortOption) {
    case 'position':
      return videosCopy.sort((a, b) => a.snippet.position - b.snippet.position);

    case 'date-desc':
      return videosCopy.sort(
        (a, b) =>
          new Date(b.snippet.publishedAt).getTime() -
          new Date(a.snippet.publishedAt).getTime()
      );

    case 'date-asc':
      return videosCopy.sort(
        (a, b) =>
          new Date(a.snippet.publishedAt).getTime() -
          new Date(b.snippet.publishedAt).getTime()
      );

    case 'title-asc':
      return videosCopy.sort((a, b) =>
        a.snippet.title.localeCompare(b.snippet.title, 'en', { sensitivity: 'base' })
      );

    case 'title-desc':
      return videosCopy.sort((a, b) =>
        b.snippet.title.localeCompare(a.snippet.title, 'en', { sensitivity: 'base' })
      );

    default:
      return videosCopy;
  }
};
