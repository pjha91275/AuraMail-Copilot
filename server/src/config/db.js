const mongoose = require('mongoose');

let isConnected = false;
let useMemoryStore = false;

const connectDB = async () => {
  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    console.log('ℹ️  No MONGODB_URI provided. Running in high-performance in-memory + JSON sync mode.');
    useMemoryStore = true;
    return;
  }

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 3000,
    });
    isConnected = true;
    useMemoryStore = false;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`⚠️  MongoDB connection failed (${error.message}). Gracefully falling back to in-memory store.`);
    useMemoryStore = true;
  }
};

const getStorageMode = () => ({
  isConnected,
  useMemoryStore
});

module.exports = { connectDB, getStorageMode };
