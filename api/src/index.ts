import express, { Request, Response } from 'express';
import helmet from 'helmet';
import { env } from './config/env';
import routes from './routes';
import { corsMiddleware } from './middlewares/cors';
import { logger } from './middlewares/logger';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler';

const app = express();

app.use(helmet());
app.use(corsMiddleware);
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'English Playlist Gallery API',
    version: '1.0.0',
    status: 'healthy',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api', routes);

app.use(notFoundHandler);

app.use(errorHandler);

const startServer = () => {
  try {
    app.listen(env.PORT, () => {
      console.warn(`🚀 Server running on port ${env.PORT}`);
      console.warn(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.warn(`🔒 CORS enabled for development origins`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();