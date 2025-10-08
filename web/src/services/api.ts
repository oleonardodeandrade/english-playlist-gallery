import axios, { AxiosError, type AxiosInstance } from 'axios';
import type { VideoPlaylistResponse, VideoPlaylistItem } from '../types/video.types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

class ApiClient {
  private client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        console.error('API Error:', error.message);
        return Promise.reject(error);
      }
    );
  }

  async fetchVideos(): Promise<VideoPlaylistResponse> {
    const response = await this.client.get<VideoPlaylistResponse>('/videos/list');
    return response.data;
  }

  async fetchVideoById(id: string): Promise<VideoPlaylistItem> {
    const response = await this.client.get<VideoPlaylistItem>(`/videos/${id}`);
    return response.data;
  }

  async syncPlaylist(): Promise<VideoPlaylistResponse> {
    const response = await this.client.post<VideoPlaylistResponse>('/videos/sync');
    return response.data;
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
export default apiClient;
