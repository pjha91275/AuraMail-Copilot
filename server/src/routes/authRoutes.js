const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// 1. Generate Google OAuth URL (with prompt=select_account for device account chooser)
router.get('/google/url', authController.getAuthUrl);

// 2. Google OAuth Redirect Callback
router.get('/google/callback', authController.handleCallback);

// 3. Verify / Register Google Account Session
router.post('/google/verify', authController.verifyGoogleSession);

module.exports = router;
