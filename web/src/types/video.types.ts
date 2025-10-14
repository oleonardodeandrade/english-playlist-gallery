export interface VideoThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface VideoThumbnails {
  default: VideoThumbnail;
  medium: VideoThumbnail;
  high: VideoThumbnail;
  standard?: VideoThumbnail;
  maxres?: VideoThumbnail;
}

export interface VideoResourceId {
  kind: string;
  videoId: string;
}

export interface VideoSnippet {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails: VideoThumbnails;
  channelTitle: string;
  playlistId: string;
  position: number;
  resourceId: VideoResourceId;
  videoOwnerChannelTitle: string;
  videoOwnerChannelId: string;
}

export interface VideoContentDetails {
  videoId: string;
  videoPublishedAt: string;
}

export interface VideoPlaylistItem {
  kind: string;
  etag: string;
  id: string;
  snippet: VideoSnippet;
  contentDetails: VideoContentDetails;
}

export interface VideoPageInfo {
  totalResults: number;
  resultsPerPage: number;
}

export interface VideoPlaylistResponse {
  kind: string;
  etag: string;
  items: VideoPlaylistItem[];
  pageInfo: VideoPageInfo;
}

export type SortOption =
  | 'position'
  | 'date-desc'
  | 'date-asc'
  | 'title-asc'
  | 'title-desc';
