const { MongoClient } = require("mongodb");

const url =
  "mongodb+srv://dbUser:dbUserPassword@mongocluster-tkvat.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(url);

async function connectoToDb() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
  } catch (err) {
    console.log(err.stack);
  } finally {
    await client.close();
  }
}

module.exports = connectoToDb;
