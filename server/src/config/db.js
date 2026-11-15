const mongoose = require('mongoose');
const dns = require('dns');

// On AWS Lambda / Vercel Serverless (Node 18+), force IPv4 first.
// MongoDB Atlas M0 (free tier) does not accept IPv6 connections.
// If Node attempts IPv6, the connection hangs and times out.
if (dns.setDefaultResultOrder) {
  try {
    dns.setDefaultResultOrder('ipv4first');
  } catch (e) {
    // Ignore if not supported in runtime
  }
}

// Global cached connection for Serverless environments (Vercel / AWS Lambda)
let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

let isConnected = false;
let useMemoryStore = false;

/**
 * Robustly normalizes MongoDB Atlas connection strings for Mongoose.
 * Guarantees that the database name ('auramail') and required parameters
 * (retryWrites=true&w=majority) are present regardless of how MONGODB_URI is entered.
 */
function normalizeMongoUri(uri) {
  if (!uri) return uri;
  let cleanUri = uri.trim();

  const qIndex = cleanUri.indexOf('?');
  let base = qIndex !== -1 ? cleanUri.slice(0, qIndex) : cleanUri;
  const query = qIndex !== -1 ? cleanUri.slice(qIndex + 1) : '';

  // Find slash after protocol (e.g. after 'mongodb+srv://')
  const protoEnd = cleanUri.indexOf('://');
  if (protoEnd !== -1) {
    const slashAfterHost = base.indexOf('/', protoEnd + 3);
    if (slashAfterHost === -1) {
      base = `${base}/auramail`;
    } else {
      const dbPath = base.slice(slashAfterHost + 1);
      if (!dbPath || dbPath.trim() === '') {
        base = `${base}auramail`;
      }
    }
  }

  // Ensure retryWrites and w=majority query parameters exist
  const queryParams = [];
  if (query) {
    query.split('&').forEach(param => {
      if (param && !param.startsWith('retryWrites=') && !param.startsWith('w=')) {
        queryParams.push(param);
      }
    });
  }
  queryParams.push('retryWrites=true');
  queryParams.push('w=majority');

  return `${base}?${queryParams.join('&')}`;
}

const connectDB = async () => {
  // If already connected in this serverless runtime instance, return immediately
  if (mongoose.connection.readyState === 1) {
    isConnected = true;
    useMemoryStore = false;
    return mongoose.connection;
  }

  if (cached.conn) {
    isConnected = true;
    useMemoryStore = false;
    return cached.conn;
  }

  const rawUri = process.env.MONGODB_URI;

  if (!rawUri) {
    console.log('ℹ️  No MONGODB_URI provided in environment. Running in high-performance in-memory + JSON sync mode.');
    useMemoryStore = true;
    return null;
  }

  const mongoUri = normalizeMongoUri(rawUri);

  if (!cached.promise) {
    const opts = {
      serverSelectionTimeoutMS: 15000, // 15 seconds to allow cloud serverless cold start DNS & TLS handshakes
      connectTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      bufferCommands: false
    };

    cached.promise = mongoose.connect(mongoUri, opts)
      .then((m) => {
        isConnected = true;
        useMemoryStore = false;
        console.log(`✅ MongoDB Connected successfully: ${m.connection.host} (DB: ${m.connection.name})`);
        return m.connection;
      })
      .catch((error) => {
        cached.promise = null; // Reset so next request can retry
        console.warn(`⚠️  MongoDB connection note: ${error.message}`);
        if (error.message.includes('IP') || error.message.includes('whitelist') || error.message.includes('Could not connect to any servers')) {
          console.warn('💡 Tip: In MongoDB Atlas, go to "Network Access" and add IP Address "0.0.0.0/0" to allow connections from your current network.');
        }
        console.log('⚡ Gracefully operating in high-performance in-memory + JSON sync mode (Zero interruptions).');
        useMemoryStore = true;
        return null;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    useMemoryStore = true;
  }

  return cached.conn;
};

const getStorageMode = () => ({
  isConnected: mongoose.connection.readyState === 1 || isConnected,
  useMemoryStore,
  readyState: mongoose.connection.readyState
});

module.exports = { connectDB, getStorageMode, normalizeMongoUri };
