const { clients: seedClients, accounts: seedAccounts, emails: seedEmails } = require('../data/seedData');
const Email = require('../models/Email');
const ClientProfile = require('../models/ClientProfile');
const Account = require('../models/Account');
const { getStorageMode } = require('../config/db');

// In-memory data store with deep clones of seed data
let inMemoryClients = JSON.parse(JSON.stringify(seedClients));
let inMemoryAccounts = JSON.parse(JSON.stringify(seedAccounts));
let inMemoryEmails = JSON.parse(JSON.stringify(seedEmails));

// Database initialization
const initStore = async () => {
  const { isConnected } = getStorageMode();
  if (isConnected) {
    try {
      const emailCount = await Email.countDocuments();
      if (emailCount === 0) {
        console.log('🌱 Seeding MongoDB with initial email & client data...');
        await ClientProfile.insertMany(seedClients);
        await Account.insertMany(seedAccounts);
        await Email.insertMany(seedEmails);
        console.log('✅ MongoDB successfully seeded.');
      }
    } catch (err) {
      console.error('Error seeding MongoDB:', err.message);
    }
  } else {
    console.log(`⚡ In-memory store ready with ${inMemoryEmails.length} rich email threads across ${inMemoryClients.length} clients.`);
  }
};

// Client operations
const getClients = async () => {
  const { isConnected } = getStorageMode();
  if (isConnected) {
    return await ClientProfile.find();
  }
  return inMemoryClients;
};

const getClientById = async (id) => {
  const { isConnected } = getStorageMode();
  if (isConnected) {
    return await ClientProfile.findOne({ id });
  }
  return inMemoryClients.find(c => c.id === id);
};

// Account operations
const getAccounts = async (clientId) => {
  const { isConnected } = getStorageMode();
  if (isConnected) {
    const query = clientId && clientId !== 'all' ? { clientId } : {};
    return await Account.find(query);
  }
  if (clientId && clientId !== 'all') {
    return inMemoryAccounts.filter(a => a.clientId === clientId);
  }
  return inMemoryAccounts;
};

const updateAccountSync = async (id) => {
  const { isConnected } = getStorageMode();
  const now = new Date().toISOString();
  if (isConnected) {
    return await Account.findOneAndUpdate(
      { id },
      { lastSyncedAt: now, status: 'connected' },
      { new: true }
    );
  }
  const acc = inMemoryAccounts.find(a => a.id === id);
  if (acc) {
    acc.lastSyncedAt = now;
    acc.status = 'connected';
    return acc;
  }
  return null;
};

const addAccount = async (accountData) => {
  const { isConnected } = getStorageMode();
  const newAcc = {
    id: `acc-${Date.now()}`,
    ...accountData,
    status: 'connected',
    lastSyncedAt: new Date().toISOString(),
    totalEmailsSynced: Math.floor(Math.random() * 500) + 120
  };

  if (isConnected) {
    return await Account.create(newAcc);
  }
  inMemoryAccounts.push(newAcc);
  return newAcc;
};

// Email operations
const getEmails = async ({ clientId, category, search, urgency, unreadOnly, waitingOnly }) => {
  const { isConnected } = getStorageMode();

  if (isConnected) {
    const query = {};
    if (clientId && clientId !== 'all') query.clientId = clientId;
    if (category) {
      if (category === 'assistant') query['classification.type'] = 'Assistant to Reply';
      else if (category === 'client') query['classification.type'] = 'Client to Reply';
      else if (category === 'no_reply') query['classification.type'] = 'No Reply Needed';
      else if (category === 'starred') query.starred = true;
      else if (category === 'meetings') query['meetingDetails.isDetected'] = true;
      else if (category === 'action_required') query['actionItems.0'] = { $exists: true };
      else if (category === 'waiting') query.waitingForResponse = true;
      else if (category === 'archived') query.archived = true;
    }
    if (category !== 'archived') query.archived = false;
    if (unreadOnly) query.unread = true;
    if (waitingOnly) query.waitingForResponse = true;
    if (urgency) query['classification.urgency'] = urgency;

    if (search) {
      query.$or = [
        { subject: { $regex: search, $options: 'i' } },
        { snippet: { $regex: search, $options: 'i' } },
        { 'messages.sender': { $regex: search, $options: 'i' } },
        { 'messages.body': { $regex: search, $options: 'i' } }
      ];
    }
    return await Email.find(query).sort({ updatedAt: -1 });
  }

  // In-memory filtering
  return inMemoryEmails
    .filter(e => {
      if (clientId && clientId !== 'all' && e.clientId !== clientId) return false;
      if (category === 'archived') {
        if (!e.archived) return false;
      } else {
        if (e.archived) return false;
      }

      if (category === 'assistant' && e.classification?.type !== 'Assistant to Reply') return false;
      if (category === 'client' && e.classification?.type !== 'Client to Reply') return false;
      if (category === 'no_reply' && e.classification?.type !== 'No Reply Needed') return false;
      if (category === 'starred' && !e.starred) return false;
      if (category === 'meetings' && !e.meetingDetails?.isDetected) return false;
      if (category === 'action_required' && (!e.actionItems || e.actionItems.length === 0)) return false;
      if (category === 'waiting' && !e.waitingForResponse) return false;
      if (unreadOnly && !e.unread) return false;
      if (waitingOnly && !e.waitingForResponse) return false;
      if (urgency && e.classification?.urgency !== urgency) return false;

      if (search && search.trim() !== '') {
        const q = search.toLowerCase();
        const matchSubject = e.subject.toLowerCase().includes(q);
        const matchSnippet = e.snippet.toLowerCase().includes(q);
        const matchSender = e.messages.some(m => m.sender.toLowerCase().includes(q) || m.senderEmail.toLowerCase().includes(q));
        const matchBody = e.messages.some(m => m.body.toLowerCase().includes(q));
        if (!matchSubject && !matchSnippet && !matchSender && !matchBody) return false;
      }

      return true;
    })
    .sort((a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt));
};

const getEmailById = async (id) => {
  const { isConnected } = getStorageMode();
  if (isConnected) {
    return await Email.findOne({ $or: [{ id }, { _id: id }, { threadId: id }] });
  }
  return inMemoryEmails.find(e => e.id === id || e.threadId === id);
};

const updateEmail = async (id, updates) => {
  const { isConnected } = getStorageMode();
  const now = new Date().toISOString();
  updates.updatedAt = now;

  if (isConnected) {
    return await Email.findOneAndUpdate(
      { $or: [{ id }, { _id: id }, { threadId: id }] },
      { $set: updates },
      { new: true }
    );
  }

  const idx = inMemoryEmails.findIndex(e => e.id === id || e.threadId === id);
  if (idx !== -1) {
    inMemoryEmails[idx] = {
      ...inMemoryEmails[idx],
      ...updates,
      updatedAt: now
    };
    return inMemoryEmails[idx];
  }
  return null;
};

const addEmail = async (emailData) => {
  const { isConnected } = getStorageMode();
  const newEmail = {
    id: `em-${Date.now()}`,
    threadId: `thread-${Date.now()}`,
    unread: true,
    starred: false,
    archived: false,
    labels: emailData.labels || ['Inbox'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...emailData
  };

  if (isConnected) {
    return await Email.create(newEmail);
  }
  inMemoryEmails.unshift(newEmail);
  return newEmail;
};

const resetStore = () => {
  inMemoryClients = JSON.parse(JSON.stringify(seedClients));
  inMemoryAccounts = JSON.parse(JSON.stringify(seedAccounts));
  inMemoryEmails = JSON.parse(JSON.stringify(seedEmails));
};

module.exports = {
  initStore,
  getClients,
  getClientById,
  getAccounts,
  updateAccountSync,
  addAccount,
  getEmails,
  getEmailById,
  updateEmail,
  addEmail,
  resetStore
};
