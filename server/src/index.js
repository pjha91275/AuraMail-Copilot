const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

// Load environment variables from root .env or server/.env
const rootEnvPath = path.resolve(__dirname, '../../.env');
const serverEnvPath = path.resolve(__dirname, '../.env');
if (fs.existsSync(rootEnvPath)) {
  dotenv.config({ path: rootEnvPath });
}
if (fs.existsSync(serverEnvPath)) {
  dotenv.config({ path: serverEnvPath });
}
dotenv.config();

const { connectDB, getStorageMode } = require('./config/db');
const { initStore } = require('./services/store');

const app = express();
const PORT = process.env.PORT || 5000;

let isInitialized = false;
let initPromise = null;
const ensureInit = async () => {
  if (isInitialized) return;
  if (!initPromise) {
    initPromise = (async () => {
      try {
        await connectDB();
        await initStore();
        isInitialized = true;
      } catch (err) {
        console.error('Initialization error:', err);
      }
    })();
  }
  await initPromise;
};

// Immediate background initialization
ensureInit();

// Middleware
app.use(cors());
app.use(express.json());

// Serverless DB connection middleware:
// Ensures DB connection is complete before dispatching API handlers
// Prevents Lambda from freezing during initial TLS handshake
app.use(async (req, res, next) => {
  if (req.path.startsWith('/api') && req.path !== '/api/health') {
    try {
      await ensureInit();
    } catch (e) {
      console.error('Database connection middleware warning:', e);
    }
  }
  next();
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/emails', require('./routes/emailRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));
app.use('/api/clients', require('./routes/clientRoutes'));
app.use('/api/accounts', require('./routes/accountRoutes'));

// Health & Info Endpoint
app.get('/api/health', (req, res) => {
  const mode = getStorageMode();
  res.json({
    status: 'healthy',
    database: {
      connected: mode.isConnected,
      storageMode: mode.isConnected ? 'mongodb' : 'memory-store',
      readyState: mode.readyState
    },
    product: 'AuraMail Copilot - Personal Assistant Email Management Platform',
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

// Start standalone server if executed directly
if (require.main === module || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 AuraMail Server running smoothly on http://localhost:${PORT}`);
  });
}

module.exports = app;
module.exports.ensureInit = ensureInit;
