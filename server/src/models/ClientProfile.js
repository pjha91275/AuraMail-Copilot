const mongoose = require('mongoose');

const ClientProfileSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true },
  company: { type: String, required: true },
  avatar: { type: String },
  connectedAccounts: [{ type: String }], // email addresses
  aiRules: {
    autoDelegateScheduling: { type: Boolean, default: true },
    urgentThreshold: { type: String, default: 'high' },
    customInstructions: { type: String }
  }
});

module.exports = mongoose.model('ClientProfile', ClientProfileSchema);
