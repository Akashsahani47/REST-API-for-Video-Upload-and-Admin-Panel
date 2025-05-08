import express from 'express';
import { getPendingVideos, approveVideo, rejectVideo } from '../controllers/adminController.js';
import auth from '../middlewares/authMiddleware.js';
import role from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.get('/videos', auth, role(['Admin']), getPendingVideos);
router.put('/approve/:id', auth, role(['Admin']), approveVideo);
router.put('/reject/:id', auth, role(['Admin']), rejectVideo);

export default router;