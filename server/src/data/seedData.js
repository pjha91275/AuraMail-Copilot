const clients = [
  {
    id: 'client-1',
    name: 'Sarah Jenkins',
    email: 'sarah.jenkins@techflow.io',
    role: 'Founder & CEO',
    company: 'TechFlow Inc.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
    connectedAccounts: ['sarah.jenkins@techflow.io', 'sarah.personal@gmail.com'],
    aiRules: {
      autoDelegateScheduling: true,
      urgentThreshold: 'high',
      customInstructions: 'Always delegate calendar & routine pitches to assistant. Only escalate board votes, contracts >$50k, and direct media.'
    }
  },
  {
    id: 'client-2',
    name: 'David Chen',
    email: 'david.chen@horizonvc.com',
    role: 'General Partner',
    company: 'Horizon Ventures',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    connectedAccounts: ['david.chen@horizonvc.com'],
    aiRules: {
      autoDelegateScheduling: true,
      urgentThreshold: 'urgent',
      customInstructions: 'Assistant handles LP reports and travel logistics. Escalate portfolio company founder calls directly to me.'
    }
  },
  {
    id: 'client-3',
    name: 'Elena Vance',
    email: 'elena.vance@biosyn.ai',
    role: 'Chief AI Scientist',
    company: 'BioSynthetix AI',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&q=80',
    connectedAccounts: ['elena.vance@biosyn.ai'],
    aiRules: {
      autoDelegateScheduling: true,
      urgentThreshold: 'medium',
      customInstructions: 'Assistant schedules grant interviews and press inquiries.'
    }
  },
  {
    id: 'client-prince',
    name: 'Prince Jha',
    email: 'pjha91275@gmail.com',
    role: 'CEO & Founder',
    company: 'GMAIL Inc.',
    avatar: '/prince-jha.jpg',
    connectedAccounts: ['pjha91275@gmail.com'],
    aiRules: {
      autoDelegateScheduling: true,
      urgentThreshold: 'urgent',
      customInstructions: 'Escalate investor term sheets, contracts, and board votes. Assistant handles all scheduling and vendor logistics.'
    }
  }
];

const accounts = [
  {
    id: 'acc-1',
    clientId: 'client-1',
    provider: 'google',
    emailAddress: 'sarah.jenkins@techflow.io',
    name: 'Sarah Work (Google Workspace)',
    status: 'connected',
    lastSyncedAt: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
    totalEmailsSynced: 1420,
    avatar: 'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico'
  },
  {
    id: 'acc-2',
    clientId: 'client-1',
    provider: 'google',
    emailAddress: 'sarah.personal@gmail.com',
    name: 'Sarah Personal (Gmail)',
    status: 'connected',
    lastSyncedAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    totalEmailsSynced: 480,
    avatar: 'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico'
  },
  {
    id: 'acc-3',
    clientId: 'client-2',
    provider: 'microsoft',
    emailAddress: 'david.chen@horizonvc.com',
    name: 'David Horizon (Microsoft 365)',
    status: 'connected',
    lastSyncedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    totalEmailsSynced: 2310,
    avatar: 'https://res.cdn.office.net/assets/mail/pwa/v1/pngs/outlook_96.png'
  },
  {
    id: 'acc-4',
    clientId: 'client-3',
    provider: 'google',
    emailAddress: 'elena.vance@biosyn.ai',
    name: 'Elena BioSyn (Google Workspace)',
    status: 'connected',
    lastSyncedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    totalEmailsSynced: 910,
    avatar: 'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico'
  }
];

const emails = [
  {
    id: 'em-1',
    threadId: 'thread-101',
    clientId: 'client-1',
    subject: 'URGENT: Series B Term Sheet Signing & Wire Authorization',
    snippet: 'Sarah, we need your physical or DocuSign authorization on the updated Series B valuation cap before 5 PM EST today...',
    unread: true,
    starred: true,
    archived: false,
    labels: ['Legal', 'Finance', 'Urgent'],
    classification: {
      type: 'Client to Reply',
      confidence: 0.98,
      reason: 'Requires legal signature and wire authorization from the CEO. Direct fiduciary decision.',
      urgency: 'urgent',
      manualOverride: false,
      assignedTo: 'Client'
    },
    summary: 'Lead investor Sequoia Horizon has sent the revised $45M Series B term sheet requiring Sarah\'s signature and wiring instructions before 5 PM EST today.',
    actionItems: [
      'Review section 4.2 liquidation preferences',
      'Execute DocuSign agreement before 5 PM EST',
      'Authorize treasury wire transfer'
    ],
    meetingDetails: {
      isDetected: false
    },
    waitingForResponse: false,
    waitingOn: null,
    messages: [
      {
        id: 'msg-101-1',
        sender: 'Marcus Sterling',
        senderEmail: 'm.sterling@sequoiahorizon.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        recipient: 'Sarah Jenkins',
        recipientEmail: 'sarah.jenkins@techflow.io',
        timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        body: `Hi Sarah,\n\nOur investment committee just unanimously ratified the revised terms for the Series B round at the $45M valuation cap. Attached is the final execution draft.\n\nCould you please review and sign via the DocuSign link before 5:00 PM EST today so our partners can authorize the wire release first thing tomorrow morning?\n\nExcited to partner together on this next chapter.\n\nBest,\nMarcus Sterling\nPartner, Sequoia Horizon`,
        isFromClient: false,
        isFromAssistant: false
      }
    ],
    draftReply: {
      content: `Hi Marcus,\n\nThank you for confirming the IC approval. I have reviewed the revised liquidation clauses and am executing the DocuSign right now. Our finance team will send over wiring verification shortly.\n\nBest,\nSarah`,
      tone: 'Executive Brief',
      status: 'pending_approval',
      generatedAt: new Date(Date.now() - 20 * 60 * 1000).toISOString()
    },
    clientFeedback: {
      handled: false,
      noteToAssistant: '',
      delegatedBack: false
    },
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 20 * 60 * 1000).toISOString()
  },
  {
    id: 'em-2',
    threadId: 'thread-102',
    clientId: 'client-1',
    subject: 'Reschedule: Q3 Board of Directors Strategy Session',
    snippet: 'Hi Sarah & Team, two board members have an unavoidable flight conflict for Thursday morning. Can we move to Friday at 10 AM?',
    unread: true,
    starred: true,
    archived: false,
    labels: ['Calendar', 'Board', 'Scheduling'],
    classification: {
      type: 'Assistant to Reply',
      confidence: 0.95,
      reason: 'Routine calendar rescheduling and attendee coordination. Falls under assistant management protocol.',
      urgency: 'high',
      manualOverride: false,
      assignedTo: 'Assistant'
    },
    summary: 'Board Secretary Richard Cole is requesting to reschedule the Q3 Board meeting from Thursday 9 AM to Friday 10 AM due to travel conflicts. Sarah\'s calendar is open Friday morning.',
    actionItems: [
      'Check Sarah\'s Friday calendar availability',
      'Confirm Friday 10:00 AM - 11:30 AM EST with board members',
      'Update Zoom invite and attach board deck'
    ],
    meetingDetails: {
      isDetected: true,
      title: 'Q3 Board of Directors Strategy Session',
      date: 'This Friday, Nov 20',
      time: '10:00 AM - 11:30 AM EST',
      location: 'Zoom (Board Private Room)'
    },
    waitingForResponse: false,
    waitingOn: null,
    messages: [
      {
        id: 'msg-102-1',
        sender: 'Richard Cole',
        senderEmail: 'r.cole@techflowboard.com',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
        recipient: 'Sarah Jenkins',
        recipientEmail: 'sarah.jenkins@techflow.io',
        timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
        body: `Hi Sarah and Team,\n\nTwo of our external directors have an unavoidable flight conflict on Thursday morning. Would Sarah be available to shift our Q3 Strategy Session to Friday, Nov 20th at 10:00 AM EST instead?\n\nIf that works, please send an updated invite with the revised link.\n\nWarm regards,\nRichard Cole\nLead Independent Director`,
        isFromClient: false,
        isFromAssistant: false
      }
    ],
    draftReply: {
      content: `Hi Richard,\n\nI have checked Sarah's calendar and Friday, Nov 20th at 10:00 AM - 11:30 AM EST works perfectly. I am updating the calendar invite and sending it across to all directors shortly along with the revised board packet.\n\nBest regards,\nAlex Vance\nExecutive Assistant to Sarah Jenkins`,
      tone: 'Scheduling Confirmation',
      status: 'draft',
      generatedAt: new Date(Date.now() - 1 * 3600 * 1000).toISOString()
    },
    clientFeedback: {
      handled: false,
      noteToAssistant: '',
      delegatedBack: false
    },
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 3600 * 1000).toISOString()
  },
  {
    id: 'em-3',
    threadId: 'thread-103',
    clientId: 'client-1',
    subject: 'Stripe: Monthly Invoice #INV-2026-8849 Paid ($12,450.00)',
    snippet: 'Your receipt for payment to Amazon Web Services Cloud Infrastructure. No action is required on your part...',
    unread: false,
    starred: false,
    archived: false,
    labels: ['Receipt', 'Automated'],
    classification: {
      type: 'No Reply Needed',
      confidence: 0.99,
      reason: 'Automated billing receipt from Stripe/AWS. Transaction confirmed, no response or follow-up needed.',
      urgency: 'low',
      manualOverride: false,
      assignedTo: 'None'
    },
    summary: 'Automated receipt confirming $12,450.00 payment to AWS Cloud Infrastructure via corporate card. Account balance in good standing.',
    actionItems: [
      'File receipt in accounting folder'
    ],
    meetingDetails: {
      isDetected: false
    },
    waitingForResponse: false,
    waitingOn: null,
    messages: [
      {
        id: 'msg-103-1',
        sender: 'Stripe Billing',
        senderEmail: 'notifications@stripe.com',
        avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
        recipient: 'Sarah Jenkins',
        recipientEmail: 'sarah.jenkins@techflow.io',
        timestamp: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
        body: `Receipt from Stripe Payments\n\nAmount paid: $12,450.00 USD\nDate: Today\nPayment method: Visa ending in 4092\nInvoice: INV-2026-8849\nDescription: AWS Production Cloud Cluster (Oct 1 - Oct 31)\n\nThank you for your business. You can view your invoice online anytime.`,
        isFromClient: false,
        isFromAssistant: false
      }
    ],
    draftReply: {
      content: '',
      tone: 'None',
      status: 'none',
      generatedAt: null
    },
    clientFeedback: {
      handled: false,
      noteToAssistant: '',
      delegatedBack: false
    },
    createdAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString()
  },
  {
    id: 'em-4',
    threadId: 'thread-104',
    clientId: 'client-1',
    subject: 'Keynote Speaker Invitation: TechCrunch Disrupt Mainstage',
    snippet: 'Dear Sarah, we would love to invite you as our opening keynote speaker on "The Autonomous AI Enterprise" in San Francisco...',
    unread: true,
    starred: true,
    archived: false,
    labels: ['Press', 'Speaking', 'VIP'],
    classification: {
      type: 'Client to Reply',
      confidence: 0.94,
      reason: 'High-profile personal keynote invitation requiring Sarah\'s personal decision on topics and travel.',
      urgency: 'high',
      manualOverride: false,
      assignedTo: 'Client'
    },
    summary: 'TechCrunch Editor-in-Chief invites Sarah to deliver the 30-min opening keynote on AI Agents at Disrupt SF on Oct 14. Travel & VIP backstage pass covered.',
    actionItems: [
      'Decide whether to accept keynote invitation',
      'Review proposed speech topic on AI Enterprise',
      'Check travel availability for Oct 13-15 in SF'
    ],
    meetingDetails: {
      isDetected: true,
      title: 'TechCrunch Disrupt Keynote',
      date: 'Wednesday, Oct 14',
      time: '9:30 AM PST',
      location: 'Moscone Center, San Francisco'
    },
    waitingForResponse: false,
    waitingOn: null,
    messages: [
      {
        id: 'msg-104-1',
        sender: 'Claire Montgomery',
        senderEmail: 'claire.m@techcrunch.com',
        avatar: '/claire-montgomery.jpg',
        recipient: 'Sarah Jenkins',
        recipientEmail: 'sarah.jenkins@techflow.io',
        timestamp: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
        body: `Dear Sarah,\n\nOn behalf of TechCrunch, I would be thrilled to invite you as our opening keynote speaker for Disrupt 2026 at Moscone Center, San Francisco.\n\nWe anticipate over 12,000 founders and investors. We’d love to feature your insights on "Building Autonomous Enterprise AI Systems". We provide full VIP travel accommodation.\n\nPlease let us know if your schedule allows by next Tuesday so we can confirm the lineup.\n\nBest,\nClaire Montgomery\nEditor-in-Chief, TechCrunch`,
        isFromClient: false,
        isFromAssistant: false
      }
    ],
    draftReply: {
      content: `Hi Claire,\n\nThank you so much for the invitation. I would be delighted to deliver the opening keynote at Disrupt. I will have my assistant Alex coordinate the logistical details and AV requirements with your team.\n\nWarm regards,\nSarah`,
      tone: 'Professional & Enthusiastic',
      status: 'pending_approval',
      generatedAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString()
    },
    clientFeedback: {
      handled: false,
      noteToAssistant: '',
      delegatedBack: false
    },
    createdAt: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString()
  },
  {
    id: 'em-5',
    threadId: 'thread-105',
    clientId: 'client-1',
    subject: 'Enterprise SLA Contract Follow-Up: Acme Corp Pilot Extension',
    snippet: 'Hi Sarah, our procurement team is waiting for the revised DPA and security questionnaire before signing off on the $250k tier...',
    unread: false,
    starred: false,
    archived: false,
    labels: ['Sales', 'Contracts', 'FollowUp'],
    classification: {
      type: 'Assistant to Reply',
      confidence: 0.92,
      reason: 'Administrative follow-up regarding standard DPA document attachment and SOC2 certificate dispatch.',
      urgency: 'medium',
      manualOverride: false,
      assignedTo: 'Assistant'
    },
    summary: 'Acme Corp procurement manager is asking for the standard DPA and SOC2 Type II report to finalize the enterprise contract. Pre-approved documents ready to send.',
    actionItems: [
      'Attach standard TechFlow DPA and SOC2 Type II PDF',
      'CC enterprise account executive Jason Miller',
      'Log status in Salesforce CRM'
    ],
    meetingDetails: {
      isDetected: false
    },
    waitingForResponse: false,
    waitingOn: null,
    messages: [
      {
        id: 'msg-105-1',
        sender: 'Brian Kowalski',
        senderEmail: 'b.kowalski@acmecorp.com',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80',
        recipient: 'Sarah Jenkins',
        recipientEmail: 'sarah.jenkins@techflow.io',
        timestamp: new Date(Date.now() - 8 * 3600 * 1000).toISOString(),
        body: `Hi Sarah,\n\nHope your week is off to a great start. Our legal and IT security teams are finalizing the vendor review for the $250k annual plan. Could your team please provide:\n1. TechFlow Standard Data Processing Addendum (DPA)\n2. Latest SOC 2 Type II audit summary\n\nOnce we have those, we are ready to countersign.\n\nThanks,\nBrian Kowalski\nDirector of Procurement, Acme Corp`,
        isFromClient: false,
        isFromAssistant: false
      }
    ],
    draftReply: {
      content: `Hi Brian,\n\nThank you for following up! I have attached our standard Data Processing Addendum (DPA) and our latest 2026 SOC 2 Type II executive audit summary for your legal and security teams.\n\nI have also CC'd Jason Miller, our Enterprise Lead, to assist with any questions. We look forward to finalizing the rollout!\n\nBest regards,\nAlex Vance\nExecutive Assistant to Sarah Jenkins`,
      tone: 'Professional',
      status: 'draft',
      generatedAt: new Date(Date.now() - 7 * 3600 * 1000).toISOString()
    },
    clientFeedback: {
      handled: false,
      noteToAssistant: '',
      delegatedBack: false
    },
    createdAt: new Date(Date.now() - 8 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 7 * 3600 * 1000).toISOString()
  },
  {
    id: 'em-6',
    threadId: 'thread-106',
    clientId: 'client-1',
    subject: 'Waiting: Redline review from Wilson Sonsini Legal Counsel',
    snippet: 'Sarah, sending over our team comments on the IP licensing agreement. Let us know when your counsel returns feedback...',
    unread: false,
    starred: false,
    archived: false,
    labels: ['Legal', 'Waiting'],
    classification: {
      type: 'No Reply Needed',
      confidence: 0.88,
      reason: 'Ball is in outside counsel\'s court. Pending external redline feedback.',
      urgency: 'low',
      manualOverride: false,
      assignedTo: 'None'
    },
    summary: 'External legal counsel Wilson Sonsini is reviewing the licensing terms. Currently waiting on their redline draft before taking any next steps.',
    actionItems: [
      'Follow up with legal counsel if not received by Thursday 3 PM'
    ],
    meetingDetails: {
      isDetected: false
    },
    waitingForResponse: true,
    waitingOn: 'Wilson Sonsini Outside Counsel',
    messages: [
      {
        id: 'msg-106-1',
        sender: 'Jessica Park, Esq.',
        senderEmail: 'jpark@wsgr-law.com',
        avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=120&q=80',
        recipient: 'Sarah Jenkins',
        recipientEmail: 'sarah.jenkins@techflow.io',
        timestamp: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
        body: `Hi Sarah,\n\nWe have received the redlines from the counterparty. Our associate Michael is doing a thorough pass on clauses 12 through 15 (indemnification and IP warranties). We will share our consolidated feedback by Thursday afternoon.\n\nNo action required from your end right now.\n\nBest,\nJessica Park\nSenior Partner, WSGR`,
        isFromClient: false,
        isFromAssistant: false
      }
    ],
    draftReply: {
      content: '',
      tone: 'None',
      status: 'none',
      generatedAt: null
    },
    clientFeedback: {
      handled: false,
      noteToAssistant: '',
      delegatedBack: false
    },
    createdAt: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 14 * 3600 * 1000).toISOString()
  },
  {
    id: 'em-7',
    threadId: 'thread-107',
    clientId: 'client-1',
    subject: 'Executive Offsite Hotel & Venue Reservation Options',
    snippet: 'Hi Alex & Sarah, attached are the three boutique hotel proposals in Napa Valley for the Executive Leadership Retreat...',
    unread: false,
    starred: false,
    archived: false,
    labels: ['Logistics', 'Offsite'],
    classification: {
      type: 'Assistant to Reply',
      confidence: 0.96,
      reason: 'Event logistics, catering proposals, and venue coordination directly managed by Executive Assistant.',
      urgency: 'medium',
      manualOverride: false,
      assignedTo: 'Assistant'
    },
    summary: 'Luxury concierge has delivered three curated options for the November leadership retreat in Napa (Meadowood, Solage, Bardessono). Awaiting assistant shortlist selection.',
    actionItems: [
      'Review A/V capabilities and conference room layouts',
      'Compare group pricing for 12 executive suites',
      'Select option 2 (Solage) and place 10% refundable deposit'
    ],
    meetingDetails: {
      isDetected: true,
      title: 'TechFlow Executive Offsite 2026',
      date: 'Nov 12 - Nov 14',
      time: 'All Day',
      location: 'Solage Resort, Napa Valley'
    },
    waitingForResponse: false,
    waitingOn: null,
    messages: [
      {
        id: 'msg-107-1',
        sender: 'Napa Luxury Retreats',
        senderEmail: 'events@naparetreats.com',
        avatar: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=120&q=80',
        recipient: 'Alex Vance',
        recipientEmail: 'alex.assistant@techflow.io',
        timestamp: new Date(Date.now() - 20 * 3600 * 1000).toISOString(),
        body: `Dear Alex,\n\nFollowing our call yesterday regarding Sarah Jenkins and the executive team offsite, we have prepared comprehensive proposals for three properties with private meeting pavilions and executive dining.\n\nOption 2 (Solage Calistoga) holds a provisional hold for your dates until Friday 5 PM. Please let us know if you wish to confirm with a deposit.\n\nWarm regards,\nChloe Laurent\nCorporate Hospitality Director`,
        isFromClient: false,
        isFromAssistant: false
      }
    ],
    draftReply: {
      content: `Hi Chloe,\n\nThank you for these detailed options. Sarah and I reviewed the layout, and Solage Calistoga fits our team needs perfectly. Please send over the corporate credit card authorization form so we can lock in the provisional hold.\n\nBest,\nAlex Vance`,
      tone: 'Professional',
      status: 'draft',
      generatedAt: new Date(Date.now() - 18 * 3600 * 1000).toISOString()
    },
    clientFeedback: {
      handled: false,
      noteToAssistant: '',
      delegatedBack: false
    },
    createdAt: new Date(Date.now() - 20 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 18 * 3600 * 1000).toISOString()
  },
  {
    id: 'em-8',
    threadId: 'thread-108',
    clientId: 'client-1',
    subject: 'Substack: AI Frontiers Weekly - Issue #142',
    snippet: 'This week in AI: Multi-agent orchestrations, token efficiency improvements, and the shift from chatbots to autonomous assistants...',
    unread: false,
    starred: false,
    archived: false,
    labels: ['Newsletter', 'Reading'],
    classification: {
      type: 'No Reply Needed',
      confidence: 0.99,
      reason: 'Weekly newsletter publication. Purely informational broadcast, zero reply needed.',
      urgency: 'low',
      manualOverride: false,
      assignedTo: 'None'
    },
    summary: 'Industry newsletter covering trends in AI autonomous agents and enterprise workflow automation.',
    actionItems: [],
    meetingDetails: { isDetected: false },
    waitingForResponse: false,
    waitingOn: null,
    messages: [
      {
        id: 'msg-108-1',
        sender: 'AI Frontiers Editorial',
        senderEmail: 'editorial@aifrontiers.substack.com',
        avatar: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=120&q=80',
        recipient: 'Sarah Jenkins',
        recipientEmail: 'sarah.jenkins@techflow.io',
        timestamp: new Date(Date.now() - 26 * 3600 * 1000).toISOString(),
        body: `Welcome to Issue #142 of AI Frontiers!\n\nKey Highlights This Week:\n- Deep dive into personal assistant agent frameworks\n- Benchmark comparison of LLM context caching\n- Interview with leading frontier model researchers\n\nEnjoy the read! Unsubscribe anytime.`,
        isFromClient: false,
        isFromAssistant: false
      }
    ],
    draftReply: { content: '', tone: 'None', status: 'none', generatedAt: null },
    clientFeedback: { handled: false, noteToAssistant: '', delegatedBack: false },
    createdAt: new Date(Date.now() - 26 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 26 * 3600 * 1000).toISOString()
  },
  {
    id: 'em-9',
    threadId: 'thread-109',
    clientId: 'client-2',
    subject: 'Confidential: Potential Series A Co-Lead Opportunity with Benchmark',
    snippet: 'David, Peter and I would love to grab a private breakfast on Sand Hill Road to discuss co-leading the new autonomous robotics seed graduate...',
    unread: true,
    starred: true,
    archived: false,
    labels: ['Investment', 'Confidential', 'VIP'],
    classification: {
      type: 'Client to Reply',
      confidence: 0.97,
      reason: 'Confidential deal discussion between venture partners. Requires David\'s personal evaluation.',
      urgency: 'urgent',
      manualOverride: false,
      assignedTo: 'Client'
    },
    summary: 'Benchmark partner invites David to co-lead a hot $12M Series A in autonomous robotics. Breakfast meeting on Sand Hill Road proposed for Thursday.',
    actionItems: [
      'Review confidential pitch deck link',
      'Confirm breakfast availability for Thursday 8:00 AM at Buck\'s of Woodside'
    ],
    meetingDetails: {
      isDetected: true,
      title: 'Partner Breakfast: Robotics Series A Co-Lead',
      date: 'Thursday, Nov 19',
      time: '8:00 AM PST',
      location: 'Buck\'s of Woodside, CA'
    },
    waitingForResponse: false,
    waitingOn: null,
    messages: [
      {
        id: 'msg-109-1',
        sender: 'Peter Fenton',
        senderEmail: 'pfenton@benchmark.com',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80',
        recipient: 'David Chen',
        recipientEmail: 'david.chen@horizonvc.com',
        timestamp: new Date(Date.now() - 1 * 3600 * 1000).toISOString(),
        body: `David,\n\nWe are looking closely at the autonomous robotics company out of Stanford. We love the team and think Horizon would be the ideal co-lead to split the $12M Series A round.\n\nCould we grab breakfast Thursday at 8:00 AM at Buck's? Keep this strictly between us for now.\n\nBest,\nPeter`,
        isFromClient: false,
        isFromAssistant: false
      }
    ],
    draftReply: {
      content: `Hi Peter,\n\nI'd be glad to discuss. Thursday at 8:00 AM at Buck's works great. Looking forward to diving into the unit economics together.\n\nBest,\nDavid`,
      tone: 'Concise Partner',
      status: 'pending_approval',
      generatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString()
    },
    clientFeedback: {
      handled: false,
      noteToAssistant: '',
      delegatedBack: false
    },
    createdAt: new Date(Date.now() - 1 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString()
  },
  {
    id: 'em-10',
    threadId: 'thread-110',
    clientId: 'client-3',
    subject: 'MIT Technology Review: Interview Request on Biological AI Models',
    snippet: 'Dr. Vance, our features editor is writing a cover story on neural-biological hybrid computing and wants to feature your breakthrough paper...',
    unread: true,
    starred: false,
    archived: false,
    labels: ['Press', 'Interview'],
    classification: {
      type: 'Assistant to Reply',
      confidence: 0.93,
      reason: 'Media interview scheduling and question vetting can be scheduled by assistant per Elena\'s press guidelines.',
      urgency: 'medium',
      manualOverride: false,
      assignedTo: 'Assistant'
    },
    summary: 'MIT Tech Review journalist requesting a 25-minute recorded Zoom interview regarding Elena\'s published biological computing research.',
    actionItems: [
      'Send media embargo guidelines',
      'Offer 25-minute interview slots on Wednesday afternoon',
      'Confirm questions will be provided 24 hours in advance'
    ],
    meetingDetails: {
      isDetected: true,
      title: 'MIT Tech Review Interview: Dr. Elena Vance',
      date: 'Next Wednesday, Nov 25',
      time: '3:00 PM EST',
      location: 'Zoom'
    },
    waitingForResponse: false,
    waitingOn: null,
    messages: [
      {
        id: 'msg-110-1',
        sender: 'Rachel Simmons',
        senderEmail: 'rachel.simmons@technologyreview.com',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        recipient: 'Elena Vance',
        recipientEmail: 'elena.vance@biosyn.ai',
        timestamp: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
        body: `Dear Dr. Vance,\n\nI am writing a feature article for MIT Technology Review exploring biological compute models. We would love to conduct a 25-minute remote interview with you next week to discuss your latest findings.\n\nCould your office let us know your availability?\n\nSincerely,\nRachel Simmons\nSenior Science Editor`,
        isFromClient: false,
        isFromAssistant: false
      }
    ],
    draftReply: {
      content: `Dear Rachel,\n\nThank you for reaching out. Dr. Vance would be pleased to speak with you regarding the biological computing paper. She has availability next Wednesday, Nov 25 at 3:00 PM EST or Thursday at 11:00 AM EST.\n\nPlease let me know which time works best and kindly share any specific question themes in advance.\n\nBest regards,\nAssistant to Dr. Elena Vance`,
      tone: 'Professional',
      status: 'draft',
      generatedAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString()
    },
    clientFeedback: {
      handled: false,
      noteToAssistant: '',
      delegatedBack: false
    },
    createdAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString()
  }
];

module.exports = {
  clients,
  accounts,
  emails
};
