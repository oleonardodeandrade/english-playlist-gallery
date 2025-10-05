import request from 'supertest';
import app from '../../app';
import { youtubeService } from '../../services/youtube.service';
import { YouTubePlaylistResponse } from '../../types/youtube.types';

describe('Video Routes', () => {
  const mockPlaylistResponse: YouTubePlaylistResponse = {
    kind: 'youtube#playlistItemListResponse',
    etag: 'test-etag',
    items: [
      {
        kind: 'youtube#playlistItem',
        etag: 'item-etag',
        id: 'test-id-1',
        snippet: {
          publishedAt: '2023-01-01T00:00:00Z',
          channelId: 'channel-id',
          title: 'Test Video 1',
          description: 'Test Description 1',
          thumbnails: {
            default: { url: 'https://example.com/thumb1.jpg', width: 120, height: 90 },
            medium: { url: 'https://example.com/thumb1-medium.jpg', width: 320, height: 180 },
            high: { url: 'https://example.com/thumb1-high.jpg', width: 480, height: 360 },
          },
          channelTitle: 'Test Channel',
          playlistId: 'test-playlist-id',
          position: 0,
          resourceId: {
            kind: 'youtube#video',
            videoId: 'video-id-1',
          },
        },
        contentDetails: {
          videoId: 'video-id-1',
          videoPublishedAt: '2023-01-01T00:00:00Z',
        },
      },
    ],
    pageInfo: {
      totalResults: 1,
      resultsPerPage: 10,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe('GET /api/videos/list', () => {
    it('should return videos successfully with default parameters', async () => {
      jest.spyOn(youtubeService, 'fetchPlaylistItems').mockResolvedValue(mockPlaylistResponse);

      const response = await request(app).get('/api/videos/list');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockPlaylistResponse);
      expect(youtubeService.fetchPlaylistItems).toHaveBeenCalled();
    });

    it('should return videos with custom playlistId', async () => {
      const customPlaylistId = 'custom-playlist-id';
      jest.spyOn(youtubeService, 'fetchPlaylistItems').mockResolvedValue(mockPlaylistResponse);

      const response = await request(app).get(`/api/videos/list?playlistId=${customPlaylistId}`);

      expect(response.status).toBe(200);
      expect(youtubeService.fetchPlaylistItems).toHaveBeenCalledWith(
        customPlaylistId,
        expect.any(Number)
      );
    });

    it('should return videos with custom maxResults', async () => {
      const customMaxResults = 25;
      jest.spyOn(youtubeService, 'fetchPlaylistItems').mockResolvedValue(mockPlaylistResponse);

      const response = await request(app).get(`/api/videos/list?maxResults=${customMaxResults}`);

      expect(response.status).toBe(200);
      expect(youtubeService.fetchPlaylistItems).toHaveBeenCalledWith(
        expect.any(String),
        customMaxResults
      );
    });

    it('should return 400 for invalid maxResults', async () => {
      const response = await request(app).get('/api/videos/list?maxResults=invalid');

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toContain('Validation error');
    });

    it('should handle service errors gracefully', async () => {
      jest.spyOn(youtubeService, 'fetchPlaylistItems').mockRejectedValue(
        new Error('YouTube API error')
      );

      const response = await request(app).get('/api/videos/list');

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Failed to fetch videos from YouTube');
    });

    it('should validate query parameters', async () => {
      const response = await request(app).get('/api/videos/list?maxResults=abc');

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('Health Check', () => {
    it('should return API health status', async () => {
      const response = await request(app).get('/');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'English Playlist Gallery API');
      expect(response.body).toHaveProperty('version', '1.0.0');
      expect(response.body).toHaveProperty('status', 'healthy');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('Not Found Handler', () => {
    it('should return 404 for non-existent routes', async () => {
      const response = await request(app).get('/api/non-existent-route');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'Route not found');
      expect(response.body).toHaveProperty('path', '/api/non-existent-route');
    });
  });
});
