const store = require('../services/store');

const formatClient = (client) => {
  if (!client) return client;
  const obj = client.toObject ? client.toObject() : { ...client };
  const name = (obj.name || '').toLowerCase();
  const email = (obj.email || '').toLowerCase();
  if (name.includes('prince') || email.includes('pjha')) {
    obj.avatar = '/prince-jha.jpg';
    obj.name = 'Prince Jha';
    obj.company = obj.company || 'GMAIL Inc.';
  } else if (name.includes('alex') || email.includes('alex')) {
    obj.avatar = '/alex-vance.jpg';
  }
  return obj;
};

const getClients = async (req, res) => {
  try {
    const clients = await store.getClients();
    const formatted = (clients || []).map(formatClient);
    res.json({ success: true, count: formatted.length, data: formatted });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getClientById = async (req, res) => {
  try {
    const client = await store.getClientById(req.params.id);
    if (!client) {
      return res.status(404).json({ success: false, message: 'Client not found' });
    }
    res.json({ success: true, data: formatClient(client) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getClients,
  getClientById
};
