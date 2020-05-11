const RoomModel = require("../models/room");

async function createRoom(data) {
  const room = new RoomModel({
    roomName: data.roomName
  });

  const result = await room.save();
  console.log("Created room with id: " + result._id);
  return result._id;
}

async function getRoomById(roomId) {
  const room = await RoomModel.findOne({ _id: roomId }).select(["-__v"]);
  return room;
}

async function updateRoom(roomId, data) {
  return await UserModel.findOneAndUpdate({ room: roomId }, data, {
    new: true
  });
}

async function updateAndGetRoom(roomId, userId) {
  let room = await getRoomById(roomId);
  if (room.master === null) {
    room = await updateRoom(roomId, { master: userId });
  }
  return room;
}

/* async function checkIfDisconnectedUserWasMaster(roomId, userId) {
  const room = await getRoomById(roomId);
  if(room.master === userId) {
    
  }
} */

module.exports = {
  createRoom: createRoom,
  getRoomById: getRoomById,
  updateRoom: updateRoom,
  updateAndGetRoom: updateAndGetRoom
};
