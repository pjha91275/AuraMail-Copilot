const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

// Email routes
router.get('/', emailController.getEmails);
router.get('/:id', emailController.getEmailById);
router.patch('/:id/classification', emailController.updateClassification);
router.patch('/:id/status', emailController.updateEmailStatus);
router.post('/:id/client-action', emailController.handleClientAction);
router.post('/:id/draft', emailController.updateDraftReply);
router.post('/simulate', emailController.simulateIncomingEmail);

module.exports = router;
