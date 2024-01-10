const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    const connectString = `mongodb://localhost:27017/homeland`;

    await mongoose.connect(connectString, { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to DB successfully.");
  } catch (error) {
    console.log("Failed when connect to DB.");
    console.log(error);
    process.exit(1);
  }
};

module.exports = connectToDb;
