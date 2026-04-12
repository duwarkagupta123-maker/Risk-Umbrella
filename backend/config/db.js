/**
 * MongoDB connection helper for Mongoose.
 * Uses MONGODB_URI from environment variables.
 */
const mongoose = require('mongoose');

/**
 * Connect to MongoDB Atlas (or local MongoDB).
 * @returns {Promise<typeof mongoose>}
 */
async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }

  mongoose.set('strictQuery', true);

  await mongoose.connect(uri, {
    // Stable options for Atlas
    serverSelectionTimeoutMS: 10000,
  });

  return mongoose;
}

module.exports = { connectDB };
