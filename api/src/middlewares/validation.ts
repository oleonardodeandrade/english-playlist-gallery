import { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';
import { ApiError } from './errorHandler';

export const schemas = {
  listVideos: z.object({
    playlistId: z.string().optional(),
    maxResults: z
      .string()
      .optional()
      .refine((val) => !val || !isNaN(Number(val)), {
        message: 'maxResults must be a number',
      })
      .transform((val) => (val ? Number(val) : undefined)),
  }),

  getVideoById: z.object({
    id: z.string().min(1, 'Video ID is required'),
  }),

  syncPlaylist: z.object({
    playlistId: z.string().optional(),
    maxResults: z
      .string()
      .optional()
      .refine((val) => !val || !isNaN(Number(val)), {
        message: 'maxResults must be a number',
      })
      .transform((val) => (val ? Number(val) : undefined)),
  }),
};

export const validate = (schema: z.ZodType, source: 'body' | 'query' | 'params' = 'body') => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      const data = req[source] as unknown;
      const validated = schema.parse(data);

      if (source === 'query') {
        Object.assign(req.query, validated);
      } else {
        (req[source] as Record<string, unknown>) = validated as Record<string, unknown>;
      }

      next();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const errorMessage: string = error.issues
          .map((issue) => `${issue.path.join('.')}: ${issue.message}`)
          .join(', ');

        next(new ApiError(400, `Validation error: ${errorMessage}`));
      } else {
        next(error);
      }
    }
  };
};