const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

// Email routes
router.get('/', emailController.getEmails);
router.post('/reset', emailController.resetEmails);
router.post('/simulate', emailController.simulateIncomingEmail);
router.get('/:id', emailController.getEmailById);
router.delete('/:id', emailController.deleteEmail);
router.delete('/:id/messages/:messageId', emailController.deleteMessageFromThread);
router.patch('/:id/classification', emailController.updateClassification);
router.patch('/:id/status', emailController.updateEmailStatus);
router.post('/:id/client-action', emailController.handleClientAction);
router.post('/:id/draft', emailController.updateDraftReply);

module.exports = router;
