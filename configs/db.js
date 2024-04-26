const { default: mongoose } = require("mongoose");


const connectToDB = async () => {
  if (mongoose.connections[0].readyState) {
    return true;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connect To DB Successfully :))");
    return true
  } catch (err) {
    console.error("DB Connection Error:", err);
    throw err;
  }
};
export default connectToDB;
