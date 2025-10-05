process.env.NODE_ENV = 'test';
process.env.PORT = '3000';
process.env.MONGODB_URI = 'mongodb://localhost:27017/test';
process.env.YOUTUBE_API_KEY = 'test-api-key';
process.env.PLAYLIST_ID = 'test-playlist-id';
process.env.NUMBER_OF_VIDEOS = '10';

global.console = {
  ...console,
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};
