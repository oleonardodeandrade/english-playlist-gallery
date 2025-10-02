import express, { Request, Response } from 'express';
import { env } from './config/env';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'English Playlist Gallery API',
    version: '1.0.0',
    status: 'healthy',
  });
});

app.use('/api', routes);

const startServer = () => {
  try {
    app.listen(env.PORT, () => {
      console.warn(`🚀 Server running on port ${env.PORT}`);
      console.warn(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();