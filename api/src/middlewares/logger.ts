import { Request, Response, NextFunction } from 'express';

export const logger = (req: Request, res: Response, next: NextFunction): void => {
  const start = Date.now();
  const { method, path, query } = req;

  res.on('finish', () => {
    const duration = Date.now() - start;
    const { statusCode } = res;

    const queryString = Object.keys(query).length > 0 ? `?${JSON.stringify(query)}` : '';
    const logLevel = statusCode >= 400 ? 'error' : 'info';

    const logMessage = {
      level: logLevel,
      method,
      path: `${path}${queryString}`,
      statusCode,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString(),
    };

    if (logLevel === 'error') {
      console.error(JSON.stringify(logMessage));
    } else {
      console.warn(JSON.stringify(logMessage));
    }
  });

  next();
};
