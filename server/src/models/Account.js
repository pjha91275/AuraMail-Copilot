const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  clientId: { type: String, required: true },
  provider: { type: String, enum: ['google', 'microsoft', 'imap'], required: true },
  emailAddress: { type: String, required: true },
  name: { type: String, required: true },
  status: { type: String, enum: ['connected', 'syncing', 'error', 'disconnected'], default: 'connected' },
  lastSyncedAt: { type: Date, default: Date.now },
  totalEmailsSynced: { type: Number, default: 0 },
  avatar: { type: String }
});

module.exports = mongoose.model('Account', AccountSchema);
