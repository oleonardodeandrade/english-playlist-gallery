import https from 'https';
import { env } from '../config/env';
import { YouTubePlaylistResponse } from '../types/youtube.types';

export class YouTubeService {
  private apiKey: string;

  constructor() {
    this.apiKey = env.YOUTUBE_API_KEY;
  }

  async fetchPlaylistItems(
    playlistId: string,
    maxResults: number = 10
  ): Promise<YouTubePlaylistResponse> {
    return new Promise((resolve, reject) => {
      const options = {
        hostname: 'www.googleapis.com',
        port: 443,
        path: `/youtube/v3/playlistItems?playlistId=${playlistId}&key=${this.apiKey}&part=snippet,contentDetails&maxResults=${maxResults}`,
        method: 'GET',
      };

      const req = https.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            try {
              const parsedData = JSON.parse(data) as YouTubePlaylistResponse;
              resolve(parsedData);
            } catch {
              reject(new Error('Failed to parse YouTube API response'));
            }
          } else {
            reject(new Error(`YouTube API returned status ${res.statusCode}: ${data}`));
          }
        });
      });

      req.on('error', (error) => {
        reject(new Error(`Failed to fetch from YouTube API: ${error.message}`));
      });

      req.end();
    });
  }
}

export const youtubeService = new YouTubeService();
