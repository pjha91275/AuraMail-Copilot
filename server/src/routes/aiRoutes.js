const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');

router.post('/classify', aiController.classify);
router.post('/summarize', aiController.summarize);
router.post('/draft', aiController.generateDraft);
router.post('/chat', aiController.chatWithCopilot);

module.exports = router;
