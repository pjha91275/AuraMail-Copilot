/**
 * AI Service for Email Management Dashboard
 * Provides automatic email classification, reply responsibility determination,
 * meeting extraction, executive summarization, draft reply generation,
 * and an interactive Inbox AI Copilot.
 */

// Heuristic & NLP Classification Engine
const classifyEmailContent = ({ subject, body, sender, clientName }) => {
  const text = `${subject} ${body}`.toLowerCase();
  const senderLower = (sender || '').toLowerCase();

  // 1. Detect No Reply Needed
  const isNewsletter = /unsubscribe|view in browser|newsletter|digest|weekly round|issue #/i.test(text);
  const isAutomatedNotice = /no-reply|noreply|mailer-daemon|notification@|receipt|invoice #|payment confirmed|auto-generated|alert: new login/i.test(text + ' ' + senderLower);
  const isAlreadyResolved = /all set|resolved|no further action needed|just an fyi|for your information only/i.test(text);

  if (isNewsletter || isAutomatedNotice || isAlreadyResolved) {
    let reason = 'Automated system notification or receipt. No response needed.';
    if (isNewsletter) reason = 'Informational newsletter publication. Zero reply required.';
    else if (isAlreadyResolved) reason = 'Matter has been concluded or marked purely informational.';

    return {
      type: 'No Reply Needed',
      confidence: 0.98,
      reason,
      urgency: 'low',
      assignedTo: 'None'
    };
  }

  // 2. Detect Client to Reply (High-stakes, legal, personal decision, executive approval)
  const isLegalOrFinancial = /term sheet|wire authorization|signature required|docusign|board vote|equity|convertible note|valuation|merger|acquisition/i.test(text);
  const isPersonalExecutive = /personal input|personal decision|keynote speaker|fireside chat|private breakfast|confidential partnership|strictly between us|your direct sign-off/i.test(text);
  const isAddressedDirectlyToClient = clientName && new RegExp(`hi ${clientName}|dear ${clientName}`, 'i').test(text);

  if (isLegalOrFinancial || isPersonalExecutive) {
    let reason = 'Requires client\'s personal sign-off, signature, or fiduciary decision.';
    if (isPersonalExecutive) reason = 'Executive-level personal invitation or sensitive strategic discussion.';

    const isUrgent = /urgent|today|asap|before 5 pm|deadline|immediate/i.test(text);

    return {
      type: 'Client to Reply',
      confidence: 0.96,
      reason,
      urgency: isUrgent ? 'urgent' : 'high',
      assignedTo: 'Client'
    };
  }

  // 3. Detect Assistant to Reply (Scheduling, logistics, follow-ups, general administration, document forwarding)
  const isScheduling = /schedule|reschedule|availability|calendar|zoom link|meeting time|shift our|what time works/i.test(text);
  const isAdministrative = /dpa|soc 2|proposal|catering|hotel|vendor|rsvp|procurement questionnaire|attach|inquiry/i.test(text);
  const isRoutineInquiry = /following up|checking in|could your team|status update/i.test(text);

  if (isScheduling || isAdministrative || isRoutineInquiry) {
    let reason = 'Routine calendar scheduling and attendee coordination within assistant management scope.';
    if (isAdministrative) reason = 'Administrative task or document dispatch handled by executive assistant.';
    else if (isRoutineInquiry) reason = 'Standard business inquiry and follow-up appropriate for assistant response.';

    return {
      type: 'Assistant to Reply',
      confidence: 0.94,
      reason,
      urgency: /urgent|today/i.test(text) ? 'high' : 'medium',
      assignedTo: 'Assistant'
    };
  }

  // Fallback: If uncertain, flag for Assistant review
  return {
    type: 'Assistant to Reply',
    confidence: 0.72,
    reason: 'Flagged for assistant review to confirm appropriate delegation.',
    urgency: 'medium',
    assignedTo: 'Assistant'
  };
};

// Meeting & Appointment detection
const extractMeetingDetails = ({ subject, body }) => {
  const text = `${subject} ${body}`;
  const meetingKeywords = /reschedule|meeting|strategy session|interview|keynote|breakfast|lunch|offsite|retreat|zoom/i;
  
  if (!meetingKeywords.test(text)) {
    return { isDetected: false };
  }

  // Sample extraction heuristic
  let date = 'Upcoming';
  let time = 'TBD';
  let location = 'Remote / Zoom';

  if (/friday/i.test(text)) date = 'This Friday';
  else if (/thursday/i.test(text)) date = 'This Thursday';
  else if (/wednesday/i.test(text)) date = 'Next Wednesday';
  else if (/oct/i.test(text)) date = 'Mid-October';

  if (/10:00 am|10 am/i.test(text)) time = '10:00 AM - 11:30 AM EST';
  else if (/8:00 am|8 am/i.test(text)) time = '8:00 AM PST';
  else if (/3:00 pm|3 pm/i.test(text)) time = '3:00 PM EST';

  if (/moscone|san francisco/i.test(text)) location = 'Moscone Center, SF';
  else if (/buck\'s|woodside/i.test(text)) location = 'Buck\'s of Woodside, CA';
  else if (/solage|napa/i.test(text)) location = 'Solage Calistoga, Napa Valley';
  else if (/zoom/i.test(text)) location = 'Zoom Private Room';

  return {
    isDetected: true,
    title: subject.replace(/^(re:|fwd:|urgent:)\s*/i, '').trim(),
    date,
    time,
    location
  };
};

// Action Items Extractor
const extractActionItems = ({ subject, body }) => {
  const text = `${subject} \n ${body}`;
  const items = [];

  if (/docusign|sign/i.test(text)) items.push('Review clauses and execute electronic signature');
  if (/wire|payment|invoice/i.test(text)) items.push('Verify accounting and authorize transaction');
  if (/calendar|availability|reschedule/i.test(text)) items.push('Coordinate calendar availability and update invite');
  if (/dpa|soc 2|document|attach/i.test(text)) items.push('Provide requested compliance / security documentation');
  if (/proposal|hotel|deposit/i.test(text)) items.push('Confirm package selection with vendor');

  if (items.length === 0) {
    items.push('Review thread and determine next operational step');
  }

  return items;
};

// Executive Summarizer
const generateSummary = ({ subject, body, sender }) => {
  const s = subject.replace(/^(re:|fwd:|urgent:)\s*/i, '');
  return `${sender || 'Sender'} initiated communication regarding "${s}". Key details require review and timely coordination based on current priority guidelines.`;
};

// Draft Reply Generator
const draftReply = ({ subject, messages, tone = 'Professional', instructions = '', clientName = 'Sarah' }) => {
  const lastMessage = messages && messages.length > 0 ? messages[messages.length - 1] : { body: '', sender: 'Sender' };
  const senderName = lastMessage.sender || 'there';

  if (tone === 'Scheduling Confirmation') {
    return `Hi ${senderName.split(' ')[0]},\n\nThank you for reaching out. I have checked the calendar and confirmed the proposed time works well. I've sent an updated calendar invitation with conference details.\n\nBest regards,\nExecutive Assistant to ${clientName}`;
  }

  if (tone === 'Polite Decline') {
    return `Hi ${senderName.split(' ')[0]},\n\nThank you very much for thinking of ${clientName}. Due to existing commitments and high priority deliverables this quarter, we are unable to participate at this time.\n\nWe wish you great success and hope to connect in the future.\n\nWarm regards,\nOffice of ${clientName}`;
  }

  if (tone === 'Executive Brief') {
    return `Hi ${senderName.split(' ')[0]},\n\nThanks for sending this over. We have reviewed the terms and everything looks in order. Proceeding with the sign-off as discussed.\n\nBest,\n${clientName}`;
  }

  if (instructions && instructions.trim() !== '') {
    return `Hi ${senderName.split(' ')[0]},\n\nThank you for following up. Regarding your note: ${instructions.trim()}.\n\nPlease let us know if you need any additional information.\n\nBest regards,\nAssistant to ${clientName}`;
  }

  // Standard Professional Default
  return `Hi ${senderName.split(' ')[0]},\n\nThank you for reaching out regarding "${subject.replace(/^(re:|fwd:|urgent:)\s*/i, '')}". We have received your message and are processing the request.\n\nWe will update you as soon as the details are finalized.\n\nBest regards,\nOffice of ${clientName}`;
};

// Natural Language Copilot Chat Engine
const queryInboxCopilot = async ({ query, emails, clientName = 'Sarah' }) => {
  const q = (query || '').toLowerCase().trim();

  if (q.includes('need my attention') || q.includes('assigned to assistant') || q.includes('assistant to reply')) {
    const assistantEmails = emails.filter(e => e.classification?.type === 'Assistant to Reply');
    return {
      answer: `You currently have **${assistantEmails.length} emails** requiring your response as Assistant:`,
      highlightedEmails: assistantEmails.map(e => ({ id: e.id, subject: e.subject, urgency: e.classification?.urgency })),
      suggestedActions: ['Draft replies for top 2 urgent items', 'Confirm calendar reschedules', 'Send requested SOC2 / DPA docs']
    };
  }

  if (q.includes('client\'s attention') || q.includes('client to reply') || q.includes('require the client')) {
    const clientEmails = emails.filter(e => e.classification?.type === 'Client to Reply');
    return {
      answer: `There are **${clientEmails.length} high-priority emails** requiring ${clientName}'s personal sign-off or executive response:`,
      highlightedEmails: clientEmails.map(e => ({ id: e.id, subject: e.subject, urgency: e.classification?.urgency, reason: e.classification?.reason })),
      suggestedActions: [`Notify ${clientName} on VIP channel`, 'Prepare executive pre-draft for client approval', 'Flag 5 PM deadline on Term Sheet']
    };
  }

  if (q.includes('waiting') || q.includes('waiting for a response')) {
    const waitingEmails = emails.filter(e => e.waitingForResponse);
    return {
      answer: `You are currently tracking **${waitingEmails.length} conversation(s)** where a counterparty response is pending:`,
      highlightedEmails: waitingEmails.map(e => ({ id: e.id, subject: e.subject, waitingOn: e.waitingOn })),
      suggestedActions: ['Set auto-followup reminder for Thursday 3 PM if outside counsel does not respond']
    };
  }

  if (q.includes('meeting') || q.includes('appointment') || q.includes('schedule')) {
    const meetingEmails = emails.filter(e => e.meetingDetails?.isDetected);
    return {
      answer: `I detected **${meetingEmails.length} upcoming meetings or scheduling requests** in the inbox:`,
      highlightedEmails: meetingEmails.map(e => ({
        id: e.id,
        subject: e.subject,
        meeting: `${e.meetingDetails.title} (${e.meetingDetails.date} @ ${e.meetingDetails.time})`
      })),
      suggestedActions: ['Verify Zoom links', 'Review offsite hotel hold in Napa Valley']
    };
  }

  if (q.includes('why') && (q.includes('assigned') || q.includes('client'))) {
    return {
      answer: `Emails are classified as **Client to Reply** whenever they involve fiduciary sign-offs (e.g. Series B term sheet, wire release), personal keynotes/speaking requests, or confidential venture co-investments that strictly require the founder/partner's direct authority.`,
      suggestedActions: ['Check client AI delegation rules', 'Adjust classification manually if assistant can handle']
    };
  }

  if (q.includes('summarize')) {
    const topEmails = emails.slice(0, 3);
    return {
      answer: `Here is the executive digest of the most pressing conversations:\n\n` +
        topEmails.map((e, idx) => `**${idx + 1}. ${e.subject}**: ${e.summary}`).join('\n\n'),
      highlightedEmails: topEmails.map(e => ({ id: e.id, subject: e.subject })),
      suggestedActions: ['Review full thread details', 'Open AI Reply Studio']
    };
  }

  // General fallback search/assistant answer
  return {
    answer: `I analyzed your inbox across all active conversations. Total active emails: **${emails.length}**. I can help you filter items needing assistant replies, escalate items to ${clientName}, draft replies, or schedule meetings.`,
    highlightedEmails: emails.slice(0, 2).map(e => ({ id: e.id, subject: e.subject })),
    suggestedActions: [
      'Show me emails that need my attention',
      'Which emails require the client\'s attention?',
      'What am I waiting for a response on?',
      'Summarize top conversations'
    ]
  };
};

module.exports = {
  classifyEmailContent,
  extractMeetingDetails,
  extractActionItems,
  generateSummary,
  draftReply,
  queryInboxCopilot
};
