const mongoose = require("mongoose");

class Database {
  async connect(user, password) {
    user = "dbUser";
    password = "dbUserPassword";

    const url = `mongodb+srv://${user}:${password}@mongocluster-tkvat.mongodb.net/test?retryWrites=true&w=majority`;
    try {
      const connect = await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true
      });
      console.log("Connected to MongoDB using Mongoose");
      var db = mongoose.connection;
      db.useDb("CodeTogetherDb");
      console.log("Using: CodeTogetherDB");
    } catch (err) {
      console.log(err.stack);
    }
  }
}

const url2 =
  "mongodb+srv://dbUser:dbUserPassword@mongocluster-tkvat.mongodb.net/CodeTogetherDb?retryWrites=true&w=majority";

const urlLocalhost = "mongodb://localhost/code";

module.exports = Database;
