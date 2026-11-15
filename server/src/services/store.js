const { clients: seedClients, accounts: seedAccounts, emails: seedEmails } = require('../data/seedData');
const Email = require('../models/Email');
const ClientProfile = require('../models/ClientProfile');
const Account = require('../models/Account');
const { getStorageMode } = require('../config/db');

const mongoose = require('mongoose');

// Helper to build safe query for email lookup across id, threadId, and valid MongoDB _id
const buildIdFilter = (id) => {
  if (!id) return { id: '__invalid__' };
  const strId = String(id);
  const filters = [{ id: strId }, { threadId: strId }];
  if (mongoose.Types.ObjectId.isValid(strId)) {
    filters.push({ _id: strId });
  }
  return { $or: filters };
};

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
      } else {
        // Ensure existing records have latest avatars for Claire Montgomery & Prince Jha
        await Email.updateMany(
          { 'messages.sender': { $regex: 'claire', $options: 'i' } },
          { $set: { 'messages.$[elem].avatar': '/claire-montgomery.jpg' } },
          { arrayFilters: [{ 'elem.sender': { $regex: 'claire', $options: 'i' } }] }
        ).catch(() => {});
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
    const docs = await Email.find(query).sort({ updatedAt: -1 });
    return docs.map(d => {
      const obj = d.toObject ? d.toObject() : { ...d };
      if (!obj.id) obj.id = obj.threadId || String(obj._id);
      return obj;
    });
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
    try {
      const filter = buildIdFilter(id);
      const doc = await Email.findOne(filter);
      if (doc) {
        const obj = doc.toObject ? doc.toObject() : { ...doc };
        if (!obj.id) obj.id = obj.threadId || String(obj._id);
        return obj;
      }
    } catch (err) {
      console.warn(`MongoDB getEmailById warning for ${id}:`, err.message);
    }
  }
  const strId = String(id);
  return inMemoryEmails.find(e => e.id === strId || e.threadId === strId || (e._id && String(e._id) === strId));
};

const updateEmail = async (id, updates) => {
  const { isConnected } = getStorageMode();
  const now = new Date().toISOString();
  updates.updatedAt = now;
  const strId = String(id);

  // Always update inMemoryEmails immediately for zero-lag consistency
  const idx = inMemoryEmails.findIndex(e => e.id === strId || e.threadId === strId || (e._id && String(e._id) === strId));
  let inMemUpdated = null;
  if (idx !== -1) {
    inMemoryEmails[idx] = {
      ...inMemoryEmails[idx],
      ...updates,
      updatedAt: now
    };
    inMemUpdated = inMemoryEmails[idx];
  }

  if (isConnected) {
    try {
      const filter = buildIdFilter(id);
      const updatedDoc = await Email.findOneAndUpdate(
        filter,
        { $set: updates },
        { new: true }
      );
      if (updatedDoc) {
        const obj = updatedDoc.toObject ? updatedDoc.toObject() : { ...updatedDoc };
        if (!obj.id) obj.id = obj.threadId || String(obj._id);
        return obj;
      }
    } catch (err) {
      console.warn(`MongoDB updateEmail warning for ${id}:`, err.message);
    }
  }

  return inMemUpdated;
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

const deleteEmail = async (id) => {
  const { isConnected } = getStorageMode();
  const strId = String(id);

  // Remove from in-memory emails
  const beforeLen = inMemoryEmails.length;
  inMemoryEmails = inMemoryEmails.filter(e => !(e.id === strId || e.threadId === strId || (e._id && String(e._id) === strId)));
  const removedFromMem = inMemoryEmails.length < beforeLen;

  let removedFromDb = false;
  if (isConnected) {
    try {
      const filter = buildIdFilter(id);
      const res = await Email.deleteOne(filter);
      removedFromDb = res && res.deletedCount > 0;
    } catch (err) {
      console.warn(`MongoDB deleteEmail warning for ${id}:`, err.message);
    }
  }

  return removedFromMem || removedFromDb;
};

const resetStore = async () => {
  inMemoryClients = JSON.parse(JSON.stringify(seedClients));
  inMemoryAccounts = JSON.parse(JSON.stringify(seedAccounts));
  inMemoryEmails = JSON.parse(JSON.stringify(seedEmails));

  const { isConnected } = getStorageMode();
  if (isConnected) {
    try {
      await Email.deleteMany({});
      await Email.insertMany(seedEmails);
      await ClientProfile.deleteMany({});
      await ClientProfile.insertMany(seedClients);
      await Account.deleteMany({});
      await Account.insertMany(seedAccounts);
      console.log('✅ MongoDB reset to clean initial seed data.');
    } catch (err) {
      console.error('Error resetting MongoDB:', err.message);
    }
  }
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
  deleteEmail,
  resetStore
};
