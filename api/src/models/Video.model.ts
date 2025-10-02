import mongoose, { Document, Schema } from 'mongoose';

export interface IThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface IThumbnails {
  default: IThumbnail;
  medium: IThumbnail;
  high: IThumbnail;
  standard?: IThumbnail;
  maxres?: IThumbnail;
}

export interface IVideo extends Document {
  videoId: string;
  title: string;
  description: string;
  thumbnails: IThumbnails;
  publishedAt: Date;
  channelId: string;
  channelTitle: string;
  playlistId: string;
  position: number;
  createdAt: Date;
  updatedAt: Date;
}

const ThumbnailSchema = new Schema(
  {
    url: {
      type: String,
      required: [true, 'Thumbnail URL is required'],
      trim: true,
    },
    width: {
      type: Number,
      required: [true, 'Thumbnail width is required'],
      min: [0, 'Width must be positive'],
    },
    height: {
      type: Number,
      required: [true, 'Thumbnail height is required'],
      min: [0, 'Height must be positive'],
    },
  },
  { _id: false }
);

const ThumbnailsSchema = new Schema(
  {
    default: {
      type: ThumbnailSchema,
      required: [true, 'Default thumbnail is required'],
    },
    medium: {
      type: ThumbnailSchema,
      required: [true, 'Medium thumbnail is required'],
    },
    high: {
      type: ThumbnailSchema,
      required: [true, 'High thumbnail is required'],
    },
    standard: {
      type: ThumbnailSchema,
      required: false,
    },
    maxres: {
      type: ThumbnailSchema,
      required: false,
    },
  },
  { _id: false }
);

const VideoSchema = new Schema(
  {
    videoId: {
      type: String,
      required: [true, 'Video ID is required'],
      unique: true,
      trim: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [500, 'Title cannot exceed 500 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [5000, 'Description cannot exceed 5000 characters'],
    },
    thumbnails: {
      type: ThumbnailsSchema,
      required: [true, 'Thumbnails are required'],
    },
    publishedAt: {
      type: Date,
      required: [true, 'Published date is required'],
    },
    channelId: {
      type: String,
      required: [true, 'Channel ID is required'],
      trim: true,
      index: true,
    },
    channelTitle: {
      type: String,
      required: [true, 'Channel title is required'],
      trim: true,
    },
    playlistId: {
      type: String,
      required: [true, 'Playlist ID is required'],
      trim: true,
      index: true,
    },
    position: {
      type: Number,
      required: [true, 'Position is required'],
      min: [0, 'Position must be non-negative'],
    },
  },
  {
    timestamps: true,
    collection: 'videos',
  }
);

VideoSchema.index({ playlistId: 1, position: 1 });

VideoSchema.index({ publishedAt: -1 });

export const Video = mongoose.model('Video', VideoSchema);
