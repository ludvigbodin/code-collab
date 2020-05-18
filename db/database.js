const mongoose = require("mongoose");

class Database {
  async connect(uri) {
    try {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      });
      console.log("Connected to MongoDB");
      var db = mongoose.connection;
    } catch (err) {
      console.log(err.stack);
    }
  }
}

module.exports = Database;
