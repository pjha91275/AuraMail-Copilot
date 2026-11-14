const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const { initStore } = require('./services/store');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/emails', require('./routes/emailRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));
app.use('/api/clients', require('./routes/clientRoutes'));
app.use('/api/accounts', require('./routes/accountRoutes'));

// Health & Info Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    product: 'AuraMail AI - Personal Assistant Email Management Platform',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Serve frontend in production if built
const clientDist = path.join(__dirname, '../../client/dist');
app.use(express.static(clientDist));
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ success: false, message: 'API route not found' });
  }
  res.sendFile(path.join(clientDist, 'index.html'), (err) => {
    if (err) {
      res.status(200).send('AuraMail AI Backend API is running.');
    }
  });
});

let isInitialized = false;
const ensureInit = async () => {
  if (!isInitialized) {
    try {
      await connectDB();
      await initStore();
      isInitialized = true;
    } catch (err) {
      console.error('Initialization error:', err);
    }
  }
};

// Immediate init
ensureInit();

// Start standalone server if executed directly
if (require.main === module || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 AuraMail Server running smoothly on http://localhost:${PORT}`);
  });
}

module.exports = app;
