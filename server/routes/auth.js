import express from 'express';
import { signup, signin, googleAuthSignIn, logout, generateOTP, verifyOTP } from '../controllers/auth.js';
// import { createError } from '../error.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Authentication token missing' });
    }
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
};

// Signup route
router.post('/signup', signup);

// Signin route
router.post('/signin', signin);

// Google Auth Signin route
router.post('/google-signin', googleAuthSignIn);

// Logout route
router.get('/logout', logout);

// Generate OTP route
router.post('/generate-otp', generateOTP);

// Verify OTP route
router.post('/verify-otp', verifyOTP);

export default router;
