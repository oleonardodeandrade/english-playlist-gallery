import express, { Request, Response } from 'express';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import routes from './routes';
import { corsMiddleware } from './middlewares/cors';
import { logger } from './middlewares/logger';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler';
import swaggerDocument from './config/swagger.json';

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

app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api', routes);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;
