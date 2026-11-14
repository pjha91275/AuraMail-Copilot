const store = require('../services/store');
const aiService = require('../services/aiService');

// Get all emails with rich filtering
const getEmails = async (req, res) => {
  try {
    const { clientId, category, search, urgency, unreadOnly, waitingOnly } = req.query;
    const emails = await store.getEmails({
      clientId,
      category,
      search,
      urgency,
      unreadOnly: unreadOnly === 'true',
      waitingOnly: waitingOnly === 'true'
    });

    // Compute live stats for dashboard badges
    const allEmails = await store.getEmails({ clientId: clientId || 'all' });
    const stats = {
      total: allEmails.length,
      unread: allEmails.filter(e => e.unread).length,
      assistantToReply: allEmails.filter(e => e.classification?.type === 'Assistant to Reply').length,
      clientToReply: allEmails.filter(e => e.classification?.type === 'Client to Reply').length,
      noReplyNeeded: allEmails.filter(e => e.classification?.type === 'No Reply Needed').length,
      actionRequired: allEmails.filter(e => e.actionItems && e.actionItems.length > 0).length,
      waitingForResponse: allEmails.filter(e => e.waitingForResponse).length,
      meetingsCount: allEmails.filter(e => e.meetingDetails?.isDetected).length,
      starredCount: allEmails.filter(e => e.starred).length
    };

    res.json({
      success: true,
      count: emails.length,
      stats,
      data: emails
    });
  } catch (error) {
    console.error('Error fetching emails:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single email thread
const getEmailById = async (req, res) => {
  try {
    const email = await store.getEmailById(req.params.id);
    if (!email) {
      return res.status(404).json({ success: false, message: 'Email thread not found' });
    }
    res.json({ success: true, data: email });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update classification (manual override by assistant)
const updateClassification = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, reason, urgency, assignedTo } = req.body;

    const email = await store.getEmailById(id);
    if (!email) {
      return res.status(404).json({ success: false, message: 'Email not found' });
    }

    const updated = await store.updateEmail(id, {
      classification: {
        ...email.classification,
        type: type || email.classification.type,
        reason: reason || `Manually overridden by Assistant (${type})`,
        urgency: urgency || email.classification.urgency,
        assignedTo: assignedTo || (type === 'Client to Reply' ? 'Client' : type === 'Assistant to Reply' ? 'Assistant' : 'None'),
        manualOverride: true
      }
    });

    res.json({ success: true, message: 'Classification updated successfully', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Toggle read, star, archive
const updateEmailStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body; // e.g. { unread: false } or { starred: true } or { archived: true }

    const updated = await store.updateEmail(id, updates);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Email not found' });
    }

    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Client action: Client marks handled or delegates to assistant with note
const handleClientAction = async (req, res) => {
  try {
    const { id } = req.params;
    const { action, note } = req.body; // action: 'mark_handled' | 'delegate_to_assistant'

    const email = await store.getEmailById(id);
    if (!email) {
      return res.status(404).json({ success: false, message: 'Email not found' });
    }

    let updates = {};

    if (action === 'mark_handled') {
      updates = {
        clientFeedback: {
          handled: true,
          noteToAssistant: note || 'Marked handled directly by client',
          delegatedBack: false,
          updatedAt: new Date().toISOString()
        },
        classification: {
          ...email.classification,
          type: 'No Reply Needed',
          reason: 'Marked resolved and handled directly by client',
          assignedTo: 'None'
        }
      };
    } else if (action === 'delegate_to_assistant') {
      updates = {
        clientFeedback: {
          handled: false,
          noteToAssistant: note || 'Client requested assistant to handle response.',
          delegatedBack: true,
          updatedAt: new Date().toISOString()
        },
        classification: {
          ...email.classification,
          type: 'Assistant to Reply',
          reason: `Delegated by client: "${note || 'Please take care of this'}"`,
          assignedTo: 'Assistant',
          manualOverride: true
        }
      };
    }

    const updated = await store.updateEmail(id, updates);
    res.json({ success: true, message: 'Client feedback synchronized', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Save or send draft reply
const updateDraftReply = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, tone, status } = req.body;

    const email = await store.getEmailById(id);
    if (!email) {
      return res.status(404).json({ success: false, message: 'Email not found' });
    }

    const updates = {
      draftReply: {
        content,
        tone: tone || email.draftReply?.tone || 'Professional',
        status: status || 'draft',
        generatedAt: new Date().toISOString()
      }
    };

    // If sent, add message to thread and mark unread false
    if (status === 'sent') {
      const newMessage = {
        id: `msg-out-${Date.now()}`,
        sender: 'Alex Vance (Assistant)',
        senderEmail: 'alex.assistant@techflow.io',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        recipient: email.messages[0]?.sender || 'Recipient',
        recipientEmail: email.messages[0]?.senderEmail || '',
        timestamp: new Date().toISOString(),
        body: content,
        isFromClient: false,
        isFromAssistant: true
      };

      updates.messages = [...email.messages, newMessage];
      updates.unread = false;
      updates.classification = {
        ...email.classification,
        type: 'No Reply Needed',
        reason: 'Reply sent by assistant. Thread concluded or waiting for counterparty.'
      };
    }

    const updated = await store.updateEmail(id, updates);
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Simulate receiving a new incoming email in real time
const simulateIncomingEmail = async (req, res) => {
  try {
    const { clientId = 'client-1', scenario = 'scheduling' } = req.body;

    const scenarios = {
      scheduling: {
        subject: 'Meeting Request: Series B Follow-up with Founders Fund',
        sender: 'Brian Singerman',
        senderEmail: 'brian@foundersfund.com',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
        body: 'Hi Sarah,\n\nOur team loved the platform demo. We’d like to book 45 minutes this Thursday afternoon at 2:00 PM PST with your executive team for technical diligence.\n\nCould your assistant send over the invite?\n\nBest,\nBrian'
      },
      client_urgent: {
        subject: 'CRITICAL: Acquisition Term Sheet Counter-Offer ($85M)',
        sender: 'Jonathan Vance (Corp Dev VP)',
        senderEmail: 'j.vance@googlecorpdev.com',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
        body: 'Sarah,\n\nOur board has approved increasing the buyout offer to $85M with retention equity packages. We require your personal response and exclusivity agreement signed before midnight tonight.\n\nStrictly confidential.\n\nJonathan'
      },
      automated: {
        subject: 'GitHub: Security Alert - 1 dependency vulnerability patched',
        sender: 'GitHub Security Alerts',
        senderEmail: 'notifications@github.com',
        avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
        body: 'Dependabot alert has been resolved for repository techflow/core-api. Vulnerability in axios (CVE-2026-1194) closed automatically by bot.'
      }
    };

    const chosen = scenarios[scenario] || scenarios.scheduling;

    // Run AI analysis on the simulated incoming email
    const classification = aiService.classifyEmailContent({
      subject: chosen.subject,
      body: chosen.body,
      sender: chosen.sender,
      clientName: 'Sarah Jenkins'
    });

    const meetingDetails = aiService.extractMeetingDetails({
      subject: chosen.subject,
      body: chosen.body
    });

    const actionItems = aiService.extractActionItems({
      subject: chosen.subject,
      body: chosen.body
    });

    const summary = aiService.generateSummary({
      subject: chosen.subject,
      body: chosen.body,
      sender: chosen.sender
    });

    const newEmail = await store.addEmail({
      clientId,
      subject: chosen.subject,
      snippet: chosen.body.slice(0, 110) + '...',
      unread: true,
      starred: classification.urgency === 'urgent',
      archived: false,
      labels: ['Inbox', classification.type.replace(/\s+/g, '')],
      classification,
      summary,
      actionItems,
      meetingDetails,
      messages: [
        {
          id: `msg-sim-${Date.now()}`,
          sender: chosen.sender,
          senderEmail: chosen.senderEmail,
          avatar: chosen.avatar,
          recipient: 'Sarah Jenkins',
          recipientEmail: 'sarah.jenkins@techflow.io',
          timestamp: new Date().toISOString(),
          body: chosen.body,
          isFromClient: false,
          isFromAssistant: false
        }
      ],
      draftReply: {
        content: aiService.draftReply({
          subject: chosen.subject,
          messages: [{ sender: chosen.sender, body: chosen.body }],
          tone: 'Professional'
        }),
        tone: 'Professional',
        status: 'draft',
        generatedAt: new Date().toISOString()
      },
      clientFeedback: {
        handled: false,
        noteToAssistant: '',
        delegatedBack: false
      }
    });

    res.json({
      success: true,
      message: 'New incoming email simulated & AI classified successfully',
      data: newEmail
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getEmails,
  getEmailById,
  updateClassification,
  updateEmailStatus,
  handleClientAction,
  updateDraftReply,
  simulateIncomingEmail
};
