import { env } from './config/env';
import app from './app';

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