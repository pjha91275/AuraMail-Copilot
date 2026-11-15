const API_BASE = '/api';

export const fetchClients = async () => {
  const res = await fetch(`${API_BASE}/clients`);
  const data = await res.json();
  return data.data || [];
};

export const fetchAccounts = async (clientId) => {
  const url = clientId && clientId !== 'all' ? `${API_BASE}/accounts?clientId=${clientId}` : `${API_BASE}/accounts`;
  const res = await fetch(url);
  const data = await res.json();
  return data.data || [];
};

export const syncAccount = async (accountId) => {
  const res = await fetch(`${API_BASE}/accounts/${accountId}/sync`, { method: 'POST' });
  return await res.json();
};

export const addAccount = async (accountData) => {
  const res = await fetch(`${API_BASE}/accounts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(accountData)
  });
  return await res.json();
};

export const fetchEmails = async ({ clientId, category, search, urgency, unreadOnly, waitingOnly }) => {
  const params = new URLSearchParams();
  if (clientId) params.append('clientId', clientId);
  if (category) params.append('category', category);
  if (search) params.append('search', search);
  if (urgency) params.append('urgency', urgency);
  if (unreadOnly) params.append('unreadOnly', 'true');
  if (waitingOnly) params.append('waitingOnly', 'true');

  const res = await fetch(`${API_BASE}/emails?${params.toString()}`);
  return await res.json();
};

export const fetchEmailById = async (id) => {
  const res = await fetch(`${API_BASE}/emails/${id}`);
  const data = await res.json();
  return data.data;
};

export const updateClassification = async (id, { type, reason, urgency, assignedTo }) => {
  const res = await fetch(`${API_BASE}/emails/${id}/classification`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, reason, urgency, assignedTo })
  });
  return await res.json();
};

export const updateEmailStatus = async (id, updates) => {
  const res = await fetch(`${API_BASE}/emails/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  return await res.json();
};

export const handleClientAction = async (id, { action, note }) => {
  const res = await fetch(`${API_BASE}/emails/${id}/client-action`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, note })
  });
  return await res.json();
};

export const updateDraftReply = async (id, payload) => {
  const res = await fetch(`${API_BASE}/emails/${id}/draft`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return await res.json();
};

export const simulateIncomingEmail = async ({ clientId, scenario }) => {
  const res = await fetch(`${API_BASE}/emails/simulate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ clientId, scenario })
  });
  return await res.json();
};

export const askCopilot = async ({ query, clientId }) => {
  const res = await fetch(`${API_BASE}/ai/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, clientId })
  });
  return await res.json();
};

export const generateAiDraft = async ({ subject, messages, tone, instructions, clientName }) => {
  const res = await fetch(`${API_BASE}/ai/draft`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subject, messages, tone, instructions, clientName })
  });
  return await res.json();
};

export const deleteEmail = async (id) => {
  const res = await fetch(`${API_BASE}/emails/${id}`, {
    method: 'DELETE'
  });
  return await res.json();
};

export const deleteMessage = async (emailId, messageId) => {
  const res = await fetch(`${API_BASE}/emails/${emailId}/messages/${messageId}`, {
    method: 'DELETE'
  });
  return await res.json();
};

export const resetEmails = async () => {
  const res = await fetch(`${API_BASE}/emails/reset`, {
    method: 'POST'
  });
  return await res.json();
};
