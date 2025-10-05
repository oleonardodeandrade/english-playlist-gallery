import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { validate, schemas } from '../validation';
import { ApiError } from '../errorHandler';

describe('Validation Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {};
    nextFunction = jest.fn();
  });

  describe('validate function', () => {
    it('should pass validation for valid query parameters', () => {
      mockRequest.query = {
        playlistId: 'test-playlist-id',
        maxResults: '10',
      };

      const middleware = validate(schemas.listVideos, 'query');
      middleware(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(nextFunction).toHaveBeenCalledWith();
      expect(nextFunction).toHaveBeenCalledTimes(1);
    });

    it('should transform maxResults string to number', () => {
      mockRequest.query = {
        playlistId: 'test-playlist-id',
        maxResults: '25',
      };

      const middleware = validate(schemas.listVideos, 'query');
      middleware(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(nextFunction).toHaveBeenCalledWith();
      expect(mockRequest.query).toHaveProperty('maxResults', 25);
    });

    it('should fail validation for invalid maxResults', () => {
      mockRequest.query = {
        maxResults: 'invalid',
      };

      const middleware = validate(schemas.listVideos, 'query');
      middleware(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(nextFunction).toHaveBeenCalledWith(expect.any(ApiError));
      const error = (nextFunction as jest.Mock).mock.calls[0][0] as ApiError;
      expect(error.statusCode).toBe(400);
      expect(error.message).toContain('Validation error');
      expect(error.message).toContain('maxResults must be a number');
    });

    it('should pass validation with optional parameters', () => {
      mockRequest.query = {};

      const middleware = validate(schemas.listVideos, 'query');
      middleware(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(nextFunction).toHaveBeenCalledWith();
      expect(nextFunction).toHaveBeenCalledTimes(1);
    });

    it('should validate body parameters', () => {
      mockRequest.body = {
        name: 'Test',
      };

      const testSchema = z.object({
        name: z.string(),
      });

      const middleware = validate(testSchema, 'body');
      middleware(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(nextFunction).toHaveBeenCalledWith();
    });

    it('should validate params parameters', () => {
      mockRequest.params = {
        id: 'test-id',
      };

      const middleware = validate(schemas.getVideoById, 'params');
      middleware(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(nextFunction).toHaveBeenCalledWith();
    });

    it('should fail when required param is missing', () => {
      mockRequest.params = {};

      const middleware = validate(schemas.getVideoById, 'params');
      middleware(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(nextFunction).toHaveBeenCalledWith(expect.any(ApiError));
      const error = (nextFunction as jest.Mock).mock.calls[0][0] as ApiError;
      expect(error.statusCode).toBe(400);
      expect(error.message).toContain('Video ID is required');
    });
  });

  describe('schemas', () => {
    it('should have listVideos schema', () => {
      expect(schemas.listVideos).toBeDefined();
    });

    it('should have getVideoById schema', () => {
      expect(schemas.getVideoById).toBeDefined();
    });

    it('should have syncPlaylist schema', () => {
      expect(schemas.syncPlaylist).toBeDefined();
    });

    it('should validate listVideos schema correctly', () => {
      const validData = {
        playlistId: 'test-id',
        maxResults: '10',
      };

      const result = schemas.listVideos.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should validate syncPlaylist schema correctly', () => {
      const validData = {
        playlistId: 'test-id',
        maxResults: '20',
      };

      const result = schemas.syncPlaylist.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });
});
