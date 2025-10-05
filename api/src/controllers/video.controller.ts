import { Request, Response } from 'express';
import { youtubeService } from '../services/youtube.service';
import { env } from '../config/env';

export class VideoController {

  async listVideos(req: Request, res: Response): Promise<void> {
    try {
      const playlistId = (req.query.playlistId as string) || env.PLAYLIST_ID;
      const maxResults = parseInt((req.query.maxResults as string) || String(env.NUMBER_OF_VIDEOS), 10);

      const data = await youtubeService.fetchPlaylistItems(playlistId, maxResults);

      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching playlist items:', error);

      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

      res.status(500).json({
        error: 'Failed to fetch videos from YouTube',
        message: errorMessage,
      });
    }
  }
}

export const videoController = new VideoController();
