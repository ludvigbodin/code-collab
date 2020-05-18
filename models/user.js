const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  IP: String,
  joined: { type: Date, default: Date.now },
  active: { type: Boolean, default: true },
  socketId: { type: String, default: null },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room"
  }
});

const UserModel = new mongoose.model("User", userSchema);

module.exports = UserModel;
