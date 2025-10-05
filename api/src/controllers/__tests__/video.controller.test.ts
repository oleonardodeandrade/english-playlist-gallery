import { Request, Response } from 'express';
import { VideoController } from '../video.controller';
import { youtubeService } from '../../services/youtube.service';
import { YouTubePlaylistResponse } from '../../types/youtube.types';

jest.mock('../../services/youtube.service');

describe('VideoController', () => {
  let videoController: VideoController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

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
    videoController = new VideoController();
    mockRequest = {
      query: {},
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };

    // Mock console methods
    jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  describe('listVideos', () => {
    it('should return videos successfully with default parameters', async () => {
      (youtubeService.fetchPlaylistItems as jest.Mock).mockResolvedValue(mockPlaylistResponse);

      await videoController.listVideos(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockPlaylistResponse);
      expect(youtubeService.fetchPlaylistItems).toHaveBeenCalled();
    });

    it('should use custom playlistId from query', async () => {
      const customPlaylistId = 'custom-playlist-id';
      mockRequest.query = { playlistId: customPlaylistId };
      (youtubeService.fetchPlaylistItems as jest.Mock).mockResolvedValue(mockPlaylistResponse);

      await videoController.listVideos(mockRequest as Request, mockResponse as Response);

      expect(youtubeService.fetchPlaylistItems).toHaveBeenCalledWith(
        customPlaylistId,
        expect.any(Number)
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });

    it('should use custom maxResults from query', async () => {
      const customMaxResults = '25';
      mockRequest.query = { maxResults: customMaxResults };
      (youtubeService.fetchPlaylistItems as jest.Mock).mockResolvedValue(mockPlaylistResponse);

      await videoController.listVideos(mockRequest as Request, mockResponse as Response);

      expect(youtubeService.fetchPlaylistItems).toHaveBeenCalledWith(
        expect.any(String),
        25
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });

    it('should handle both custom playlistId and maxResults', async () => {
      const customPlaylistId = 'custom-playlist-id';
      const customMaxResults = '30';
      mockRequest.query = {
        playlistId: customPlaylistId,
        maxResults: customMaxResults
      };
      (youtubeService.fetchPlaylistItems as jest.Mock).mockResolvedValue(mockPlaylistResponse);

      await videoController.listVideos(mockRequest as Request, mockResponse as Response);

      expect(youtubeService.fetchPlaylistItems).toHaveBeenCalledWith(
        customPlaylistId,
        30
      );
      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });

    it('should handle service errors', async () => {
      const errorMessage = 'YouTube API error';
      (youtubeService.fetchPlaylistItems as jest.Mock).mockRejectedValue(
        new Error(errorMessage)
      );

      await videoController.listVideos(mockRequest as Request, mockResponse as Response);

      expect(console.error).toHaveBeenCalledWith(
        'Error fetching playlist items:',
        expect.any(Error)
      );
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Failed to fetch videos from YouTube',
        message: errorMessage,
      });
    });

    it('should handle unknown errors', async () => {
      (youtubeService.fetchPlaylistItems as jest.Mock).mockRejectedValue('Unknown error');

      await videoController.listVideos(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Failed to fetch videos from YouTube',
        message: 'Unknown error occurred',
      });
    });

    it('should parse maxResults as integer', async () => {
      mockRequest.query = { maxResults: '15.7' };
      (youtubeService.fetchPlaylistItems as jest.Mock).mockResolvedValue(mockPlaylistResponse);

      await videoController.listVideos(mockRequest as Request, mockResponse as Response);

      expect(youtubeService.fetchPlaylistItems).toHaveBeenCalledWith(
        expect.any(String),
        15
      );
    });

    it('should handle empty query parameters', async () => {
      mockRequest.query = {};
      (youtubeService.fetchPlaylistItems as jest.Mock).mockResolvedValue(mockPlaylistResponse);

      await videoController.listVideos(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(youtubeService.fetchPlaylistItems).toHaveBeenCalled();
    });
  });
});
