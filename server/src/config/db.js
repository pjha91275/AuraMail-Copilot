const mongoose = require('mongoose');

let isConnected = false;
let useMemoryStore = false;

const connectDB = async () => {
  let mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    console.log('ℹ️  No MONGODB_URI provided. Running in high-performance in-memory + JSON sync mode.');
    useMemoryStore = true;
    return;
  }

  // Ensure database name exists if URI ends with trailing slash
  if (mongoUri.endsWith('/')) {
    mongoUri = `${mongoUri}auramail?retryWrites=true&w=majority`;
  }

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 4000,
    });
    isConnected = true;
    useMemoryStore = false;
    console.log(`✅ MongoDB Connected successfully: ${conn.connection.host} (DB: ${conn.connection.name})`);
  } catch (error) {
    console.warn(`⚠️  MongoDB connection note: ${error.message}`);
    if (error.message.includes('IP') || error.message.includes('whitelist') || error.message.includes('Could not connect to any servers')) {
      console.warn('💡 Tip: In MongoDB Atlas, go to "Network Access" and add IP Address "0.0.0.0/0" to allow connections from your current network.');
    }
    console.log('⚡ Gracefully operating in high-performance in-memory + JSON sync mode (Zero interruptions).');
    useMemoryStore = true;
  }
};

const getStorageMode = () => ({
  isConnected,
  useMemoryStore
});

module.exports = { connectDB, getStorageMode };
