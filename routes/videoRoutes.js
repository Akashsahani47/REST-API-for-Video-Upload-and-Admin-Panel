import express from 'express';
import { uploadVideo, getAllVideos } from '../controllers/videoController.js';
import auth from '../middlewares/authMiddleware.js';
import role from '../middlewares/roleMiddleware.js';
import multer from 'multer';

const upload = multer({ dest: 'uploads/', limits: { fileSize: 100 * 1024 * 1024 } });

const router = express.Router();

router.post(
  '/upload',
  auth,
  role(['Artist']),
  upload.fields([
    { name: 'video', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
  ]),
  uploadVideo
);

router.get('/all', getAllVideos);

export default router;