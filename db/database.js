const mongoose = require("mongoose");

class Database {
  async connect(uri, dbName) {
    try {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      });
      console.log("Connected to MongoDB using Mongoose");
      var db = mongoose.connection;
      db.useDb(dbName);
      console.log(dbName);
    } catch (err) {
      console.log(err.stack);
    }
  }
}

module.exports = Database;
