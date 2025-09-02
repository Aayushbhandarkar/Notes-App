import express from 'express';
import {
  registerUser,
  verifyOTP,
  googleLogin,
  logout,
  getMe
} from '../controllers/authController.js';
import protect from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/verify-otp', verifyOTP);
router.post('/google', googleLogin);


router.post('/logout', protect, logout);

router.get('/me', protect, getMe);

export default router;
