// import { MongoClient } from 'mongodb';

const { MongoClient } = require('mongodb');


const password = encodeURIComponent(process.env.MONGO_PASSWORD.trim());
const connectionString = `mongodb+srv://unixisuru:${password}@devcluster.cdvs7yr.mongodb.net/?retryWrites=true&w=majority&appName=DevCluster`;
const client = new MongoClient(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log("Connection to MongoDB successful");
    return client.db('nodeexpressdb');
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
}

module.exports = connectToDatabase;
