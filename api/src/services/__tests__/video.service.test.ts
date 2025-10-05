import { VideoService } from '../video.service';
import { Video } from '../../models/Video.model';

jest.mock('../../models/Video.model');

describe('VideoService', () => {
  let videoService: VideoService;

  beforeEach(() => {
    videoService = new VideoService();
    jest.clearAllMocks();
  });

  describe('upsertVideos', () => {
    it('should upsert videos and return them sorted by position', async () => {
      const mockVideos = [
        { videoId: 'video1', title: 'Video 1', position: 0 },
        { videoId: 'video2', title: 'Video 2', position: 1 },
      ];

      const mockReturnedVideos = [
        { videoId: 'video1', title: 'Video 1', position: 0, _id: '1' },
        { videoId: 'video2', title: 'Video 2', position: 1, _id: '2' },
      ];

      (Video.bulkWrite as jest.Mock) = jest.fn().mockResolvedValue({});
      (Video.find as jest.Mock) = jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(mockReturnedVideos),
        }),
      });

      const result = await videoService.upsertVideos(mockVideos);

      expect(Video.bulkWrite).toHaveBeenCalledWith([
        {
          updateOne: {
            filter: { videoId: 'video1' },
            update: { $set: mockVideos[0] },
            upsert: true,
          },
        },
        {
          updateOne: {
            filter: { videoId: 'video2' },
            update: { $set: mockVideos[1] },
            upsert: true,
          },
        },
      ]);
      expect(result).toEqual(mockReturnedVideos);
    });
  });

  describe('findAll', () => {
    it('should find all videos without filter', async () => {
      const mockVideos = [{ videoId: 'video1' }, { videoId: 'video2' }];

      (Video.find as jest.Mock) = jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(mockVideos),
        }),
      });

      const result = await videoService.findAll();

      expect(Video.find).toHaveBeenCalledWith({});
      expect(result).toEqual(mockVideos);
    });

    it('should find videos filtered by playlistId', async () => {
      const mockVideos = [{ videoId: 'video1', playlistId: 'playlist1' }];

      (Video.find as jest.Mock) = jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(mockVideos),
        }),
      });

      const result = await videoService.findAll('playlist1');

      expect(Video.find).toHaveBeenCalledWith({ playlistId: 'playlist1' });
      expect(result).toEqual(mockVideos);
    });
  });

  describe('findByVideoId', () => {
    it('should find video by videoId', async () => {
      const mockVideo = { videoId: 'video1', title: 'Test Video' };

      (Video.findOne as jest.Mock) = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockVideo),
      });

      const result = await videoService.findByVideoId('video1');

      expect(Video.findOne).toHaveBeenCalledWith({ videoId: 'video1' });
      expect(result).toEqual(mockVideo);
    });

    it('should return null if video not found', async () => {
      (Video.findOne as jest.Mock) = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      const result = await videoService.findByVideoId('nonexistent');

      expect(result).toBeNull();
    });
  });

  describe('findById', () => {
    it('should find video by MongoDB _id', async () => {
      const mockVideo = { _id: '507f1f77bcf86cd799439011', videoId: 'video1' };

      (Video.findById as jest.Mock) = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockVideo),
      });

      const result = await videoService.findById('507f1f77bcf86cd799439011');

      expect(Video.findById).toHaveBeenCalledWith('507f1f77bcf86cd799439011');
      expect(result).toEqual(mockVideo);
    });
  });

  describe('findByPlaylistId', () => {
    it('should find videos by playlistId sorted by position', async () => {
      const mockVideos = [
        { videoId: 'video1', playlistId: 'playlist1', position: 0 },
        { videoId: 'video2', playlistId: 'playlist1', position: 1 },
      ];

      (Video.find as jest.Mock) = jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(mockVideos),
        }),
      });

      const result = await videoService.findByPlaylistId('playlist1');

      expect(Video.find).toHaveBeenCalledWith({ playlistId: 'playlist1' });
      expect(result).toEqual(mockVideos);
    });
  });

  describe('updateByVideoId', () => {
    it('should update video by videoId and return updated document', async () => {
      const mockVideo = { videoId: 'video1', title: 'Updated Title' };

      (Video.findOneAndUpdate as jest.Mock) = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockVideo),
      });

      const result = await videoService.updateByVideoId('video1', { title: 'Updated Title' });

      expect(Video.findOneAndUpdate).toHaveBeenCalledWith(
        { videoId: 'video1' },
        { $set: { title: 'Updated Title' } },
        { new: true }
      );
      expect(result).toEqual(mockVideo);
    });
  });

  describe('deleteByVideoId', () => {
    it('should delete video by videoId and return true', async () => {
      (Video.deleteOne as jest.Mock) = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue({ deletedCount: 1 }),
      });

      const result = await videoService.deleteByVideoId('video1');

      expect(Video.deleteOne).toHaveBeenCalledWith({ videoId: 'video1' });
      expect(result).toBe(true);
    });

    it('should return false if video not found', async () => {
      (Video.deleteOne as jest.Mock) = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue({ deletedCount: 0 }),
      });

      const result = await videoService.deleteByVideoId('nonexistent');

      expect(result).toBe(false);
    });
  });

  describe('deleteByPlaylistId', () => {
    it('should delete all videos from playlist and return count', async () => {
      (Video.deleteMany as jest.Mock) = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue({ deletedCount: 5 }),
      });

      const result = await videoService.deleteByPlaylistId('playlist1');

      expect(Video.deleteMany).toHaveBeenCalledWith({ playlistId: 'playlist1' });
      expect(result).toBe(5);
    });
  });

  describe('deleteAll', () => {
    it('should delete all videos and return count', async () => {
      (Video.deleteMany as jest.Mock) = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue({ deletedCount: 10 }),
      });

      const result = await videoService.deleteAll();

      expect(Video.deleteMany).toHaveBeenCalledWith({});
      expect(result).toBe(10);
    });
  });

  describe('count', () => {
    it('should count all videos without filter', async () => {
      (Video.countDocuments as jest.Mock) = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(10),
      });

      const result = await videoService.count();

      expect(Video.countDocuments).toHaveBeenCalledWith({});
      expect(result).toBe(10);
    });

    it('should count videos filtered by playlistId', async () => {
      (Video.countDocuments as jest.Mock) = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(5),
      });

      const result = await videoService.count('playlist1');

      expect(Video.countDocuments).toHaveBeenCalledWith({ playlistId: 'playlist1' });
      expect(result).toBe(5);
    });
  });

  describe('findByPublishedAfter', () => {
    it('should find videos published after date', async () => {
      const testDate = new Date('2024-01-01');
      const mockVideos = [{ videoId: 'video1', publishedAt: new Date('2024-01-02') }];

      (Video.find as jest.Mock) = jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(mockVideos),
        }),
      });

      const result = await videoService.findByPublishedAfter(testDate);

      expect(Video.find).toHaveBeenCalledWith({ publishedAt: { $gte: testDate } });
      expect(result).toEqual(mockVideos);
    });

    it('should find videos published after date with playlistId filter', async () => {
      const testDate = new Date('2024-01-01');
      const mockVideos = [
        { videoId: 'video1', playlistId: 'playlist1', publishedAt: new Date('2024-01-02') },
      ];

      (Video.find as jest.Mock) = jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(mockVideos),
        }),
      });

      const result = await videoService.findByPublishedAfter(testDate, 'playlist1');

      expect(Video.find).toHaveBeenCalledWith({
        publishedAt: { $gte: testDate },
        playlistId: 'playlist1',
      });
      expect(result).toEqual(mockVideos);
    });
  });
});
