const aiService = require('../services/aiService');
const store = require('../services/store');

// Classify custom email content
const classify = async (req, res) => {
  try {
    const { subject, body, sender, clientName } = req.body;
    if (!subject || !body) {
      return res.status(400).json({ success: false, message: 'Subject and body are required' });
    }

    const classification = await aiService.classifyEmailContent({ subject, body, sender, clientName });
    const meetingDetails = aiService.extractMeetingDetails({ subject, body });
    const actionItems = aiService.extractActionItems({ subject, body });
    const summary = await aiService.generateSummary({ subject, body, sender });

    res.json({
      success: true,
      data: {
        classification,
        meetingDetails,
        actionItems,
        summary
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Generate summary
const summarize = async (req, res) => {
  try {
    const { subject, body, sender } = req.body;
    const summary = await aiService.generateSummary({ subject, body, sender });
    res.json({ success: true, summary });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Generate draft reply with selected tone and optional user instructions
const generateDraft = async (req, res) => {
  try {
    const { subject, messages, tone, instructions, clientName } = req.body;
    const draft = await aiService.draftReply({ subject, messages, tone, instructions, clientName });
    res.json({ success: true, draft });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Interactive Inbox Copilot Chat
const chatWithCopilot = async (req, res) => {
  try {
    const { query, clientId = 'all' } = req.body;
    if (!query) {
      return res.status(400).json({ success: false, message: 'Query is required' });
    }

    const emails = await store.getEmails({ clientId });
    const client = clientId !== 'all' ? await store.getClientById(clientId) : null;
    const clientName = client ? client.name : 'Sarah';

    const response = await aiService.queryInboxCopilot({
      query,
      emails,
      clientName
    });

    res.json({
      success: true,
      data: response
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  classify,
  summarize,
  generateDraft,
  chatWithCopilot
};
