import { Request, Response, NextFunction, RequestHandler } from 'express';
import { ApiError, errorHandler, notFoundHandler, asyncHandler } from '../errorHandler';

describe('ErrorHandler Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = {
      url: '/test',
      method: 'GET',
      path: '/test',
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    nextFunction = jest.fn();

    // Mock console methods
    jest.spyOn(console, 'error').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('ApiError class', () => {
    it('should create an ApiError with correct properties', () => {
      const error = new ApiError(404, 'Not found');

      expect(error).toBeInstanceOf(Error);
      expect(error.statusCode).toBe(404);
      expect(error.message).toBe('Not found');
      expect(error.isOperational).toBe(true);
    });

    it('should create an ApiError with custom operational flag', () => {
      const error = new ApiError(500, 'Internal error', false);

      expect(error.isOperational).toBe(false);
    });
  });

  describe('errorHandler', () => {
    it('should handle ApiError correctly', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      const error = new ApiError(404, 'Resource not found');

      errorHandler(error, mockRequest as Request, mockResponse as Response, nextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Resource not found',
      });

      process.env.NODE_ENV = originalEnv;
    });

    it('should handle ValidationError', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      const error = new Error('Validation failed');
      error.name = 'ValidationError';

      errorHandler(error, mockRequest as Request, mockResponse as Response, nextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Validation Error',
      });

      process.env.NODE_ENV = originalEnv;
    });

    it('should handle CastError', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      const error = new Error('Invalid ID');
      error.name = 'CastError';

      errorHandler(error, mockRequest as Request, mockResponse as Response, nextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Invalid ID format',
      });

      process.env.NODE_ENV = originalEnv;
    });

    it('should handle generic errors', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      const error = new Error('Something went wrong');

      errorHandler(error, mockRequest as Request, mockResponse as Response, nextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Something went wrong',
      });
      expect(console.error).toHaveBeenCalled();

      process.env.NODE_ENV = originalEnv;
    });

    it('should include stack trace in development mode', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'development';

      const error = new Error('Test error');

      errorHandler(error, mockRequest as Request, mockResponse as Response, nextFunction);

      expect(mockResponse.json).toHaveBeenCalledWith(
        expect.objectContaining({
          stack: expect.any(String),
          details: 'Test error',
        })
      );

      process.env.NODE_ENV = originalEnv;
    });

    it('should not include stack trace in production mode', () => {
      const originalEnv = process.env.NODE_ENV;
      process.env.NODE_ENV = 'production';

      const error = new Error('Test error');

      errorHandler(error, mockRequest as Request, mockResponse as Response, nextFunction);

      const jsonCall = (mockResponse.json as jest.Mock).mock.calls[0][0];
      expect(jsonCall).not.toHaveProperty('stack');

      process.env.NODE_ENV = originalEnv;
    });

    it('should log error for non-operational errors', () => {
      const error = new ApiError(500, 'Internal error', false);

      errorHandler(error, mockRequest as Request, mockResponse as Response, nextFunction);

      expect(console.error).toHaveBeenCalled();
    });
  });

  describe('notFoundHandler', () => {
    it('should return 404 with correct message', () => {
      notFoundHandler(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Route not found',
        path: '/test',
      });
    });
  });

  describe('asyncHandler', () => {
    it('should handle successful async functions', async () => {
      const asyncFn: RequestHandler = async (req, res) => {
        res.status(200).json({ success: true });
      };

      const wrappedFn = asyncHandler(asyncFn);
      await wrappedFn(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ success: true });
      expect(nextFunction).not.toHaveBeenCalled();
    });

    it('should catch and forward errors to next middleware', async () => {
      const error = new Error('Async error');
      const asyncFn: RequestHandler = async () => {
        throw error;
      };

      const wrappedFn = asyncHandler(asyncFn);
      await wrappedFn(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(nextFunction).toHaveBeenCalledWith(error);
    });

    it('should handle ApiError in async functions', async () => {
      const error = new ApiError(400, 'Bad request');
      const asyncFn: RequestHandler = async () => {
        throw error;
      };

      const wrappedFn = asyncHandler(asyncFn);
      await wrappedFn(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(nextFunction).toHaveBeenCalledWith(error);
    });
  });
});
