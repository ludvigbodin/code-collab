const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomUUID: String,
  roomName: String,
  created: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true }
});

const Room = new mongoose.model("Room", roomSchema);

async function createRoom(data) {
  const room = new Room({
    roomUUID: getUUID(),
    roomName: data.roomName
  });

  const response = await room.save();
  console.log("Created room: " + response);
  return response.roomUUID;
}

async function getRoomByUUID(UUID) {
  console.log(UUID);
  const room = await Room.findOne({ roomUUID: UUID });
  return room;
}

function getUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

module.exports = { createRoom: createRoom, getRoomByUUID: getRoomByUUID };
