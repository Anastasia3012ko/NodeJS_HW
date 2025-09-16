import express from 'express';
import { checkRole } from "../middlewares/checkRole.js";
import { checkAdmin } from '../controllers/adminController.js';

const router = express.Router();

router.get('/admin', checkRole('admin'), checkAdmin);

export default router;
