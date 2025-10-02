import { Router } from 'express';
import { videoController } from '../controllers/video.controller';

const router = Router();

router.get('/list', (req, res) => videoController.listVideos(req, res));

export default router;
