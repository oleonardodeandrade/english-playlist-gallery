import { Router } from 'express';
import { videoController } from '../controllers/video.controller';
import { validate, schemas } from '../middlewares/validation';
import { asyncHandler } from '../middlewares/errorHandler';

const router = Router();

router.get(
  '/list',
  validate(schemas.listVideos, 'query'),
  asyncHandler(async (req, res) => videoController.listVideos(req, res))
);

export default router;
