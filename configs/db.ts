import mongoose from 'mongoose';

const connectToDB = async (): Promise<boolean> => {
  if (mongoose.connections[0].readyState) {
    return true;
  }

  try {
    console.log('MONGO_URI:', process.env.MONGO_URI);
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI environment variable is not defined');
    }
    
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connect To DB Successfully :))");
    return true;
  } catch (err) {
    console.error("DB Connection Error:", err);
    throw err;
  }
};

export default connectToDB; 