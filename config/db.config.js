const mongoose = require("mongoose");
const chalk = require("chalk");

// Replace this with your MONGOURI.
const MONGOURI = `mongodb+srv://P2:Pawan08082000@hrm.ucxfy.mongodb.net/HRM?retryWrites=true&w=majority`;
const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(MONGOURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
      console.log(chalk.bgGreen("Connected to database"));
} catch (e) {
    throw e;
  }
};
module.exports = InitiateMongoServer;
