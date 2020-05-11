const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomName: String,
  master: { type: String, default: null },
  created: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
});

const RoomModel = new mongoose.model("Room", roomSchema);

module.exports = RoomModel;
