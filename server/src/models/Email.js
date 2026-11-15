const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  id: { type: String, required: true },
  sender: { type: String, required: true },
  senderEmail: { type: String, required: true },
  avatar: { type: String },
  recipient: { type: String, required: true },
  recipientEmail: { type: String },
  timestamp: { type: Date, default: Date.now },
  body: { type: String, required: true },
  isFromClient: { type: Boolean, default: false },
  isFromAssistant: { type: Boolean, default: false }
});

const EmailSchema = new mongoose.Schema({
  id: { type: String, index: true },
  threadId: { type: String, required: true, unique: true },
  clientId: { type: String, required: true },
  subject: { type: String, required: true },
  snippet: { type: String, required: true },
  unread: { type: Boolean, default: true },
  starred: { type: Boolean, default: false },
  archived: { type: Boolean, default: false },
  labels: [{ type: String }],
  
  // AI Automatic Classification
  classification: {
    type: {
      type: String,
      enum: ['Assistant to Reply', 'Client to Reply', 'No Reply Needed'],
      required: true
    },
    confidence: { type: Number, min: 0, max: 1, default: 0.85 },
    reason: { type: String, required: true },
    urgency: {
      type: String,
      enum: ['urgent', 'high', 'medium', 'low'],
      default: 'medium'
    },
    manualOverride: { type: Boolean, default: false },
    assignedTo: {
      type: String,
      enum: ['Assistant', 'Client', 'None'],
      default: 'Assistant'
    }
  },

  // AI Insights
  summary: { type: String },
  actionItems: [{ type: String }],
  meetingDetails: {
    isDetected: { type: Boolean, default: false },
    title: { type: String },
    date: { type: String },
    time: { type: String },
    location: { type: String }
  },

  // Waiting status
  waitingForResponse: { type: Boolean, default: false },
  waitingOn: { type: String },

  // Messages in thread
  messages: [MessageSchema],

  // AI Reply Studio
  draftReply: {
    content: { type: String },
    tone: { type: String, default: 'Professional' },
    status: { type: String, enum: ['none', 'draft', 'pending_approval', 'sent'], default: 'none' },
    generatedAt: { type: Date }
  },

  // Client-facing interaction
  clientFeedback: {
    handled: { type: Boolean, default: false },
    noteToAssistant: { type: String },
    delegatedBack: { type: Boolean, default: false },
    updatedAt: { type: Date }
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Email', EmailSchema);
