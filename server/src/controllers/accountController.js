const store = require('../services/store');

const getAccounts = async (req, res) => {
  try {
    const { clientId } = req.query;
    const accounts = await store.getAccounts(clientId);
    res.json({ success: true, count: accounts.length, data: accounts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const syncAccount = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await store.updateAccountSync(id);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Account not found' });
    }
    res.json({ success: true, message: 'Account synchronized successfully', data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addAccount = async (req, res) => {
  try {
    const { clientId, provider, emailAddress, name } = req.body;
    if (!clientId || !provider || !emailAddress) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const newAccount = await store.addAccount({
      clientId,
      provider,
      emailAddress,
      name: name || `${emailAddress} (${provider === 'google' ? 'Gmail' : 'Outlook'})`,
      avatar: provider === 'google'
        ? 'https://ssl.gstatic.com/ui/v1/icons/mail/rfr/gmail.ico'
        : 'https://res.cdn.office.net/assets/mail/pwa/v1/pngs/outlook_96.png'
    });

    res.json({ success: true, message: 'Account connected and synchronized', data: newAccount });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAccounts,
  syncAccount,
  addAccount
};
