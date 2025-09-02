import crypto from 'crypto';
import User from '../models/User.js';
import OTP from '../models/OTP.js';
import generateToken from '../utils/generateToken.js';
import sendEmail from '../utils/sendEmail.js';
import { validateEmail, validateName, validatePassword } from '../utils/validators.js';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Generate OTP
const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

// Send OTP Email
const sendOTPEmail = async (email, otp) => {
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Your Verification Code</h2>
      <p>Use the following OTP to complete your registration:</p>
      <div style="background: #f4f4f4; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px;">
        ${otp}
      </div>
      <p>This OTP will expire in 10 minutes.</p>
      <p>If you didn't request this, please ignore this email.</p>
    </div>
  `;

  await sendEmail({
    email,
    subject: 'Your OTP for Notes App',
    html
  });
};

// @desc    Register user with OTP
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const { name, email } = req.body;

    // Validate input
    if (!name || !email) {
      return res.status(400).json({ message: 'Please provide name and email' });
    }

    if (!validateName(name)) {
      return res.status(400).json({ message: 'Name must be between 2 and 50 characters' });
    }

    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'Please provide a valid email' });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });

    // Generate OTP
    const otp = generateOTP();

    // Delete any existing OTP for this email
    await OTP.deleteMany({ email });

    // Save OTP to database
    await OTP.create({ email, otp });

    // Send OTP email
    await sendOTPEmail(email, otp);

    if (userExists) {
      // Existing user → OTP sent for login
      return res.status(200).json({ 
        message: 'User already exists, OTP sent for login', 
        data: { name: userExists.name, email } 
      });
    }

    // New user → OTP sent for registration
    res.status(200).json({ 
      message: 'OTP sent for registration', 
      data: { name, email } 
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Verify OTP and create user
// @route   POST /api/auth/verify-otp
// @access  Public
export const verifyOTP = async (req, res) => {
  try {
    const { name, email, otp } = req.body;

    // Validate input
    if (!name || !email || !otp) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      // Already exists → just login
      const token = generateToken(userExists._id);
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });
      return res.status(200).json({
        message: 'User already exists, logged in successfully',
        data: {
          _id: userExists._id,
          name: userExists.name,
          email: userExists.email,
          avatar: userExists.avatar
        }
      });
    }

    // Find the most recent OTP for the email
    const otpRecord = await OTP.findOne({ email }).sort({ createdAt: -1 });

    if (!otpRecord) {
      return res.status(400).json({ message: 'OTP not found or expired' });
    }

    if (otpRecord.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    // Check if OTP is expired (10 minutes)
    if (Date.now() > otpRecord.createdAt.getTime() + 10 * 60 * 1000) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // Delete the OTP
    await OTP.deleteMany({ email });

    // Create user
    const user = await User.create({
      name,
      email,
      isVerified: true
    });

    if (user) {
      const token = generateToken(user._id);
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      res.status(201).json({
        message: 'User registered successfully',
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          avatar: user.avatar
        }
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Login with Google
// @route   POST /api/auth/google
// @access  Public
export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: 'Google token is required' });
    }

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        avatar: { url: picture },
        authProvider: 'google',
        isVerified: true
      });
    }

    const jwtToken = generateToken(user._id);
    res.cookie('token', jwtToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      message: 'Login successful',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logout = async (req, res) => {
  try {
    res.cookie('token', '', {
      httpOnly: true,
      expires: new Date(0)
    });

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
