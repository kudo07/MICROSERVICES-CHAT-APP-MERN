import mongoose from 'mongoose';

const connectDb = async () => {
  const url = process.env.MONGO_URI;
  if (!url) {
    throw new Error('Monog_URI is not defined in environment variables');
  }
  try {
    await mongoose.connect(url, {
      dbName: 'Chatappmicroserviceapp',
    });
    console.log('Connect to mongodb');
  } catch (error) {
    console.error('Failed to connect to mongodb', error);
    process.exit(1);
  }
};

export default connectDb;
