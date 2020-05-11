const mongoose = require("mongoose");

const url =
  "mongodb+srv://dbUser:dbUserPassword@mongocluster-tkvat.mongodb.net/test?retryWrites=true&w=majority";

const url2 =
  "mongodb+srv://dbUser:dbUserPassword@mongocluster-tkvat.mongodb.net/CodeTogetherDb?retryWrites=true&w=majority";

const urlLocalhost = "mongodb://localhost/code";

async function connectoToDb() {
  try {
    const connect = await mongoose.connect(url, { useNewUrlParser: true });
    console.log("Connected to MongoDB using Mongoose");
    var db = mongoose.connection;
    db.useDb("CodeTogetherDb");
    console.log("Using: CodeTogetherDB");
  } catch (err) {
    console.log(err.stack);
  }
}

module.exports = connectoToDb;
