/**
 * AuraMail AI - Intelligent Email Processing Engine
 * Dual-Mode Engine:
 * 1. Live Google Gemini LLM API (gemini-3.5-flash-lite / gemini-flash-latest) when AI_API_KEY / GEMINI_API_KEY is present
 * 2. Instant Zero-Latency Heuristic NLP Engine (built-in fallback for offline resilience & maximum speed)
 */

const getApiKey = () => process.env.AI_API_KEY || process.env.GEMINI_API_KEY;

// Check and announce Gemini readiness
if (getApiKey()) {
  console.log('🤖 AuraMail AI: Google Gemini LLM API integration active (Live AI Key detected).');
} else {
  console.log('⚡ AuraMail AI: Running in ultra-fast zero-latency heuristic NLP mode.');
}

/**
 * Universal Gemini API caller with model cascading and timeout resilience
 */
const callGemini = async (prompt, { jsonMode = false, systemInstruction = '' } = {}) => {
  const apiKey = getApiKey();
  if (!apiKey) return null;

  const models = ['gemini-3.5-flash-lite', 'gemini-3.5-flash', 'gemini-flash-latest'];
  
  for (const model of models) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 7000);

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const payload = {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      };

      if (systemInstruction) {
        payload.systemInstruction = {
          parts: [{ text: systemInstruction }]
        };
      }

      if (jsonMode) {
        payload.generationConfig = { responseMimeType: 'application/json' };
      }

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeout);

      if (res.ok) {
        const data = await res.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          console.log(`✨ [Gemini AI] Live inference successful via model: ${model}`);
          return text;
        }
      }
    } catch (err) {
      clearTimeout(timeout);
      // Try next model if timeout or network hiccup
    }
  }

  return null;
};

// ==========================================
// 1. CLASSIFICATION & REPLY RESPONSIBILITY
// ==========================================
const heuristicClassify = ({ subject, body, sender, clientName }) => {
  const text = `${subject} ${body}`.toLowerCase();
  const senderLower = (sender || '').toLowerCase();

  // No Reply Needed
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

  // Client to Reply
  const isLegalOrFinancial = /term sheet|wire authorization|signature required|docusign|board vote|equity|convertible note|valuation|merger|acquisition/i.test(text);
  const isPersonalExecutive = /personal input|personal decision|keynote speaker|fireside chat|private breakfast|confidential partnership|strictly between us|your direct sign-off/i.test(text);

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

  // Assistant to Reply
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

  return {
    type: 'Assistant to Reply',
    confidence: 0.72,
    reason: 'Flagged for assistant review to confirm appropriate delegation.',
    urgency: 'medium',
    assignedTo: 'Assistant'
  };
};

const classifyEmailContent = async ({ subject, body, sender, clientName = 'Sarah Jenkins' }) => {
  const prompt = `You are AuraMail AI, an executive email intelligence assistant.
Analyze this incoming email and classify who is responsible for replying into strictly one of three categories:
1. "Assistant to Reply" (for scheduling, attendee coordination, vendor inquiries, logistics, administrative dispatch)
2. "Client to Reply" (for fiduciary contracts, term sheets, legal signatures, sensitive strategic advice, board votes, personal speaking invitations)
3. "No Reply Needed" (for newsletters, receipts, automated security alerts, confirmations, resolved threads)

Email Details:
Sender: ${sender || 'Unknown'}
Subject: ${subject}
Body: ${body}
Client Name: ${clientName}

Respond strictly with valid JSON format:
{
  "type": "Assistant to Reply" | "Client to Reply" | "No Reply Needed",
  "confidence": 0.95,
  "reason": "Clear 1-sentence reason why this assignment was chosen",
  "urgency": "urgent" | "high" | "medium" | "low",
  "assignedTo": "Assistant" | "Client" | "None"
}`;

  try {
    const rawResult = await callGemini(prompt, { jsonMode: true });
    if (rawResult) {
      const parsed = JSON.parse(rawResult);
      if (['Assistant to Reply', 'Client to Reply', 'No Reply Needed'].includes(parsed.type)) {
        return {
          type: parsed.type,
          confidence: Number(parsed.confidence) || 0.95,
          reason: parsed.reason || 'AI automated responsibility assignment.',
          urgency: parsed.urgency || 'medium',
          assignedTo: parsed.assignedTo || (parsed.type === 'Client to Reply' ? 'Client' : parsed.type === 'Assistant to Reply' ? 'Assistant' : 'None')
        };
      }
    }
  } catch (err) {
    console.warn('Gemini classification fallback:', err.message);
  }

  return heuristicClassify({ subject, body, sender, clientName });
};

// ==========================================
// 2. EXECUTIVE SUMMARIZATION
// ==========================================
const heuristicSummary = ({ subject, body, sender }) => {
  const s = subject.replace(/^(re:|fwd:|urgent:)\s*/i, '');
  return `${sender || 'Sender'} initiated communication regarding "${s}". Review and coordinate next steps based on client priorities.`;
};

const generateSummary = async ({ subject, body, sender }) => {
  const prompt = `Generate a crisp, high-signal 1-to-2 sentence executive TL;DR summary for an executive assistant and CEO.
Sender: ${sender || 'Unknown'}
Subject: ${subject}
Content:
${body}

Return only the executive summary text directly without quotes or markdown headers.`;

  try {
    const summary = await callGemini(prompt);
    if (summary && summary.trim().length > 10) {
      return summary.trim();
    }
  } catch (err) {
    // fallback
  }

  return heuristicSummary({ subject, body, sender });
};

// ==========================================
// 3. AI DRAFT REPLY STUDIO
// ==========================================
const heuristicDraftReply = ({ subject, messages, tone = 'Professional', instructions = '', clientName = 'Sarah' }) => {
  const lastMessage = messages && messages.length > 0 ? messages[messages.length - 1] : { body: '', sender: 'Sender' };
  const senderName = lastMessage.sender || 'there';
  const firstName = senderName.split(' ')[0];

  if (tone === 'Scheduling Confirmation') {
    return `Hi ${firstName},\n\nThank you for reaching out. I have checked the calendar and confirmed the proposed time works well. I've sent an updated calendar invitation with conference details.\n\nBest regards,\nExecutive Assistant to ${clientName}`;
  }

  if (tone === 'Polite Decline') {
    return `Hi ${firstName},\n\nThank you very much for thinking of ${clientName}. Due to existing commitments and high priority deliverables this quarter, we are unable to participate at this time.\n\nWe wish you great success and hope to connect in the future.\n\nWarm regards,\nOffice of ${clientName}`;
  }

  if (tone === 'Executive Brief') {
    return `Hi ${firstName},\n\nThanks for sending this over. We have reviewed the terms and everything looks in order. Proceeding with the sign-off as discussed.\n\nBest,\n${clientName}`;
  }

  if (instructions && instructions.trim() !== '') {
    return `Hi ${firstName},\n\nThank you for following up. Regarding your note: ${instructions.trim()}.\n\nPlease let us know if you need any additional information.\n\nBest regards,\nAssistant to ${clientName}`;
  }

  return `Hi ${firstName},\n\nThank you for reaching out regarding "${subject.replace(/^(re:|fwd:|urgent:)\s*/i, '')}". We have received your message and are processing the request.\n\nWe will update you as soon as the details are finalized.\n\nBest regards,\nOffice of ${clientName}`;
};

const draftReply = async ({ subject, messages, tone = 'Professional', instructions = '', clientName = 'Sarah' }) => {
  const lastMessage = messages && messages.length > 0 ? messages[messages.length - 1] : { body: '', sender: 'Sender' };
  const conversationHistory = (messages || []).map(m => `${m.sender || 'Sender'}: ${m.body}`).join('\n\n');

  const prompt = `You are an AI Executive Assistant drafting a reply for ${clientName}.
Subject: ${subject}
Recipient: ${lastMessage.sender || 'Sender'}
Desired Tone: ${tone}
Specific Instructions / Key Points from Assistant: ${instructions || 'Respond courteously and address all pending items.'}

Recent Conversation History:
${conversationHistory}

Draft a polished, ready-to-send professional email reply. Return ONLY the drafted email body text.`;

  try {
    const draft = await callGemini(prompt);
    if (draft && draft.trim().length > 20) {
      return draft.trim();
    }
  } catch (err) {
    // fallback
  }

  return heuristicDraftReply({ subject, messages, tone, instructions, clientName });
};

// ==========================================
// 4. INBOX COPILOT CHAT
// ==========================================
const heuristicCopilot = ({ query, emails, clientName = 'Sarah' }) => {
  const q = (query || '').toLowerCase().trim();

  if (q.includes('need my attention') || q.includes('assigned to assistant') || q.includes('assistant to reply')) {
    const assistantEmails = emails.filter(e => e.classification?.type === 'Assistant to Reply');
    return {
      answer: `You currently have **${assistantEmails.length} emails** requiring your response as Assistant:`,
      highlightedEmails: assistantEmails.map(e => ({ id: e.id, subject: e.subject, urgency: e.classification?.urgency })),
      suggestedActions: ['Draft replies for top urgent items', 'Confirm calendar reschedules', 'Send requested SOC2 / DPA docs']
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

const queryInboxCopilot = async ({ query, emails, clientName = 'Sarah' }) => {
  const emailDigest = emails.map(e => ({
    id: e.id,
    subject: e.subject,
    sender: e.messages?.[0]?.sender || 'Sender',
    type: e.classification?.type,
    urgency: e.classification?.urgency,
    summary: e.summary,
    meeting: e.meetingDetails?.isDetected ? `${e.meetingDetails.title} on ${e.meetingDetails.date}` : null
  }));

  const prompt = `You are AuraMail AI CoPilot, an intelligent executive assistant for ${clientName}.
The user asked: "${query}"

Here is the current status of the active inbox threads (${emails.length} total):
${JSON.stringify(emailDigest, null, 2)}

Provide a direct, conversational, executive response in JSON format:
{
  "answer": "Helpful answer formatted with markdown bolding and bullet points",
  "highlightedEmailIds": ["id1", "id2"],
  "suggestedActions": ["Action pill 1", "Action pill 2", "Action pill 3"]
}`;

  try {
    const raw = await callGemini(prompt, { jsonMode: true });
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.answer) {
        const highlighted = (parsed.highlightedEmailIds || [])
          .map(id => emails.find(e => e.id === id))
          .filter(Boolean)
          .map(e => ({ id: e.id, subject: e.subject, urgency: e.classification?.urgency }));

        return {
          answer: parsed.answer,
          highlightedEmails: highlighted.length > 0 ? highlighted : emails.slice(0, 2).map(e => ({ id: e.id, subject: e.subject })),
          suggestedActions: parsed.suggestedActions || ['View threads', 'Draft immediate response']
        };
      }
    }
  } catch (err) {
    // fallback
  }

  return heuristicCopilot({ query, emails, clientName });
};

// ==========================================
// 5. MEETING EXTRACTION
// ==========================================
const extractMeetingDetails = ({ subject, body }) => {
  const text = `${subject} ${body}`;
  const meetingKeywords = /reschedule|meeting|strategy session|interview|keynote|breakfast|lunch|offsite|retreat|zoom/i;
  
  if (!meetingKeywords.test(text)) {
    return { isDetected: false };
  }

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

// ==========================================
// 6. ACTION ITEMS EXTRACTION
// ==========================================
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

module.exports = {
  classifyEmailContent,
  extractMeetingDetails,
  extractActionItems,
  generateSummary,
  draftReply,
  queryInboxCopilot
};
