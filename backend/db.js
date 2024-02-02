// db.js
const { MongoClient } = require('mongodb');

const mongoURI = 'mongodb+srv://admin:admin@meddispense.iltwl8i.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
}

function closeDB() {
  return client.close().then(() => {
    console.log('MongoDB connection closed');
  });
}

function getDB() {
  return client.db('MedDispense');
}

module.exports = { connectDB, closeDB, getDB };
