import dotenv from 'dotenv';

dotenv.config();

interface EnvConfig {
  PORT: number;
  MONGODB_URI: string;
  YOUTUBE_API_KEY: string;
  PLAYLIST_ID: string;
  NUMBER_OF_VIDEOS: number;
}

const getEnvVariable = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
};

export const env: EnvConfig = {
  PORT: parseInt(getEnvVariable('PORT', '3000'), 10),
  MONGODB_URI: getEnvVariable('MONGODB_URI'),
  YOUTUBE_API_KEY: getEnvVariable('YOUTUBE_API_KEY'),
  PLAYLIST_ID: getEnvVariable('PLAYLIST_ID', 'PLcetZ6gSk968DQPgqGfu6GOJ4yEoQAu4h'),
  NUMBER_OF_VIDEOS: parseInt(getEnvVariable('NUMBER_OF_VIDEOS', '10'), 10),
};
