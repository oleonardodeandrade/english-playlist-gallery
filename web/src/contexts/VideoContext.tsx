import { createContext, useState, type ReactNode } from 'react';
import type { VideoPlaylistItem } from '../types/video.types';

export interface VideoContextType {
  selectedVideo: VideoPlaylistItem | null;
  setSelectedVideo: (video: VideoPlaylistItem | null) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const VideoProvider = ({ children }: { children: ReactNode }) => {
  const [selectedVideo, setSelectedVideo] = useState<VideoPlaylistItem | null>(null);

  return (
    <VideoContext.Provider value={{ selectedVideo, setSelectedVideo }}>
      {children}
    </VideoContext.Provider>
  );
};
