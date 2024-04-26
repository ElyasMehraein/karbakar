const { default: mongoose } = require("mongoose");

export default connectToDB;

const connectToDB = async () => {
  if (mongoose.connections[0].readyState) {
    return true;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connect To DB Successfully :))");
  } catch (err) {
    console.error("DB Connection Error:", err);
    throw err;
  }
};
