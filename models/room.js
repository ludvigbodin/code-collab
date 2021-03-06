const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomName: String,
  created: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
});

const RoomModel = new mongoose.model("Room", roomSchema);

module.exports = RoomModel;
