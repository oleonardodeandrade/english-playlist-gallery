import { Video, IVideo } from '../models/Video.model';

export class VideoService {

  async upsertVideos(videos: Partial<IVideo>[]): Promise<IVideo[]> {
    const operations = videos.map((video) => ({
      updateOne: {
        filter: { videoId: video.videoId },
        update: { $set: video },
        upsert: true,
      },
    }));

    await Video.bulkWrite(operations);

    const videoIds = videos.map((v) => v.videoId);
    return (await Video.find({ videoId: { $in: videoIds } })
      .sort({ position: 1 })
      .exec()) as unknown as IVideo[];
  }

  async findAll(playlistId?: string): Promise<IVideo[]> {
    const query = playlistId ? { playlistId } : {};
    return (await Video.find(query).sort({ position: 1 }).exec()) as unknown as IVideo[];
  }

  async findByVideoId(videoId: string): Promise<IVideo | null> {
    return (await Video.findOne({ videoId }).exec()) as unknown as IVideo | null;
  }

  async findById(id: string): Promise<IVideo | null> {
    return (await Video.findById(id).exec()) as unknown as IVideo | null;
  }

  async findByPlaylistId(playlistId: string): Promise<IVideo[]> {
    return (await Video.find({ playlistId }).sort({ position: 1 }).exec()) as unknown as IVideo[];
  }

  async updateByVideoId(videoId: string, updates: Partial<IVideo>): Promise<IVideo | null> {
    return (await Video.findOneAndUpdate({ videoId }, { $set: updates }, { new: true }).exec()) as unknown as IVideo | null;
  }

  async deleteByVideoId(videoId: string): Promise<boolean> {
    const result = await Video.deleteOne({ videoId }).exec();
    return result.deletedCount > 0;
  }

  async deleteByPlaylistId(playlistId: string): Promise<number> {
    const result = await Video.deleteMany({ playlistId }).exec();
    return result.deletedCount;
  }

  async deleteAll(): Promise<number> {
    const result = await Video.deleteMany({}).exec();
    return result.deletedCount;
  }

  async count(playlistId?: string): Promise<number> {
    const query = playlistId ? { playlistId } : {};
    return await Video.countDocuments(query).exec();
  }

  async findByPublishedAfter(date: Date, playlistId?: string): Promise<IVideo[]> {
    const query: Record<string, unknown> = { publishedAt: { $gte: date } };
    if (playlistId) {
      query.playlistId = playlistId;
    }
    return (await Video.find(query).sort({ publishedAt: -1 }).exec()) as unknown as IVideo[];
  }
}

export const videoService = new VideoService();
