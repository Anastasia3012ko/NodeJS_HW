import express from 'express';
import { registerUser, changePassword, deleteAccount, changeEmail } from '../controllers/authController.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/change-password', changePassword);
router.post('/delete-account', deleteAccount);
router.post('/change-email', changeEmail);

export default router;