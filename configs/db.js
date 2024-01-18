const { default: mongoose } = require("mongoose");

const connectToDB = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return true;
    } else {
      await mongoose.connect("mongodb+srv://elyas:Gsk5u4yDaXosRBn5@karbakar.jevgmsf.mongodb.net/?retryWrites=true&w=majority");
      // await mongoose.connect("mongodb://localhost:27017/next-auth");
      console.log("Connect To DB Successfully :))");
    }
  } catch (err) {
    console.log("DB Connection Has Error =>", err);
  }
};

export default connectToDB;