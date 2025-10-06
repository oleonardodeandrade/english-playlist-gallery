import axios, { AxiosInstance, AxiosError } from 'axios';
import type { Video, ApiResponse } from '../types/video.types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

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

  async fetchVideos(): Promise<Video[]> {
    const response = await this.client.get<ApiResponse<Video[]>>('/videos');
    return response.data.data;
  }

  async fetchVideoById(id: string): Promise<Video> {
    const response = await this.client.get<ApiResponse<Video>>(`/videos/${id}`);
    return response.data.data;
  }

  async syncPlaylist(): Promise<Video[]> {
    const response = await this.client.post<ApiResponse<Video[]>>('/videos/sync');
    return response.data.data;
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
export default apiClient;
