import { Video, IVideo } from '../Video.model';

describe('Video Model', () => {
  describe('Schema Structure', () => {
    it('should have all required fields defined', () => {
      const videoSchema = Video.schema;
      const paths = videoSchema.paths;

      expect(paths.videoId).toBeDefined();
      expect(paths.title).toBeDefined();
      expect(paths.description).toBeDefined();
      expect(paths.thumbnails).toBeDefined();
      expect(paths.publishedAt).toBeDefined();
      expect(paths.channelId).toBeDefined();
      expect(paths.channelTitle).toBeDefined();
      expect(paths.playlistId).toBeDefined();
      expect(paths.position).toBeDefined();
    });

    it('should have timestamps enabled', () => {
      const videoSchema = Video.schema;
      const options = videoSchema.options;

      expect(options.timestamps).toBe(true);
    });

    it('should use correct collection name', () => {
      const videoSchema = Video.schema;
      const options = videoSchema.options;

      expect(options.collection).toBe('videos');
    });
  });

  describe('Field Validations', () => {
    it('should require videoId field', () => {
      const videoId = Video.schema.paths.videoId;
      expect(videoId.isRequired).toBe(true);
    });

    it('should have unique constraint on videoId', () => {
      const videoId = Video.schema.paths.videoId as unknown as { options: { unique: boolean } };
      expect(videoId.options.unique).toBe(true);
    });

    it('should require title field', () => {
      const title = Video.schema.paths.title;
      expect(title.isRequired).toBe(true);
    });

    it('should require description field', () => {
      const description = Video.schema.paths.description;
      expect(description.isRequired).toBe(true);
    });

    it('should require thumbnails field', () => {
      const thumbnails = Video.schema.paths.thumbnails;
      expect(thumbnails.isRequired).toBe(true);
    });

    it('should require publishedAt field', () => {
      const publishedAt = Video.schema.paths.publishedAt;
      expect(publishedAt.isRequired).toBe(true);
    });

    it('should require channelId field', () => {
      const channelId = Video.schema.paths.channelId;
      expect(channelId.isRequired).toBe(true);
    });

    it('should require channelTitle field', () => {
      const channelTitle = Video.schema.paths.channelTitle;
      expect(channelTitle.isRequired).toBe(true);
    });

    it('should require playlistId field', () => {
      const playlistId = Video.schema.paths.playlistId;
      expect(playlistId.isRequired).toBe(true);
    });

    it('should require position field', () => {
      const position = Video.schema.paths.position;
      expect(position.isRequired).toBe(true);
    });

    it('should have correct type for videoId (String)', () => {
      const videoId = Video.schema.paths.videoId;
      expect(videoId.instance).toBe('String');
    });

    it('should have correct type for publishedAt (Date)', () => {
      const publishedAt = Video.schema.paths.publishedAt;
      expect(publishedAt.instance).toBe('Date');
    });

    it('should have correct type for position (Number)', () => {
      const position = Video.schema.paths.position;
      expect(position.instance).toBe('Number');
    });
  });

  describe('Indexes', () => {
    it('should have index on videoId', () => {
      const indexes = Video.schema.indexes();
      const videoIdIndex = indexes.find((idx) => idx[0].videoId === 1);

      expect(videoIdIndex).toBeDefined();
    });

    it('should have index on channelId', () => {
      const indexes = Video.schema.indexes();
      const channelIdIndex = indexes.find((idx) => idx[0].channelId === 1);

      expect(channelIdIndex).toBeDefined();
    });

    it('should have index on playlistId', () => {
      const indexes = Video.schema.indexes();
      const playlistIdIndex = indexes.find((idx) => idx[0].playlistId === 1);

      expect(playlistIdIndex).toBeDefined();
    });

    it('should have compound index on playlistId and position', () => {
      const indexes = Video.schema.indexes();
      const compoundIndex = indexes.find(
        (idx) => idx[0].playlistId === 1 && idx[0].position === 1
      );

      expect(compoundIndex).toBeDefined();
    });

    it('should have index on publishedAt (descending)', () => {
      const indexes = Video.schema.indexes();
      const publishedAtIndex = indexes.find((idx) => idx[0].publishedAt === -1);

      expect(publishedAtIndex).toBeDefined();
    });
  });

  describe('Thumbnail Schema Structure', () => {
    interface ThumbnailsPath {
      schema: {
        paths: Record<string, { isRequired: boolean }>;
      };
    }

    it('should have thumbnail nested schema with required fields', () => {
      const thumbnails = Video.schema.paths.thumbnails as unknown as ThumbnailsPath;
      const thumbnailsSchema = thumbnails.schema;

      expect(thumbnailsSchema.paths.default).toBeDefined();
      expect(thumbnailsSchema.paths.medium).toBeDefined();
      expect(thumbnailsSchema.paths.high).toBeDefined();
      expect(thumbnailsSchema.paths.standard).toBeDefined();
      expect(thumbnailsSchema.paths.maxres).toBeDefined();
    });

    it('should require default, medium, and high thumbnails', () => {
      const thumbnails = Video.schema.paths.thumbnails as unknown as ThumbnailsPath;
      const thumbnailsSchema = thumbnails.schema;

      expect(thumbnailsSchema.paths.default.isRequired).toBe(true);
      expect(thumbnailsSchema.paths.medium.isRequired).toBe(true);
      expect(thumbnailsSchema.paths.high.isRequired).toBe(true);
    });

    it('should not require standard and maxres thumbnails', () => {
      const thumbnails = Video.schema.paths.thumbnails as unknown as ThumbnailsPath;
      const thumbnailsSchema = thumbnails.schema;

      expect(thumbnailsSchema.paths.standard.isRequired).toBe(false);
      expect(thumbnailsSchema.paths.maxres.isRequired).toBe(false);
    });
  });

  describe('Model Name', () => {
    it('should have correct model name', () => {
      expect(Video.modelName).toBe('Video');
    });
  });

  describe('TypeScript Interface', () => {
    it('should allow creating a type-safe video object', () => {
      // This is a compile-time test - if it compiles, the interface is correct
      const mockVideo: Partial<IVideo> = {
        videoId: 'test123',
        title: 'Test Video',
        description: 'Test Description',
        thumbnails: {
          default: { url: 'http://example.com/default.jpg', width: 120, height: 90 },
          medium: { url: 'http://example.com/medium.jpg', width: 320, height: 180 },
          high: { url: 'http://example.com/high.jpg', width: 480, height: 360 },
        },
        publishedAt: new Date(),
        channelId: 'channel123',
        channelTitle: 'Test Channel',
        playlistId: 'playlist123',
        position: 0,
      };

      expect(mockVideo.videoId).toBe('test123');
      expect(mockVideo.title).toBe('Test Video');
    });
  });
});
