import mongoose from 'mongoose';
import { DB_URI, NODE_ENV } from '../config/env.js';

if (!DB_URI) {
    throw new Error('Please define the MONGODB_URL environment variable inside .env.<developmen/production>local');
}

const connectToDatabase = async () => {
    try {
      await mongoose.connect(DB_URI);
      console.log(`Connected to the database in ${process.env.NODE_ENV} mode`);
    } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
      process.exit(1); // Exit process with failure
    }
  };

export default connectToDatabase;
