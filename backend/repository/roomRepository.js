const RoomModel = require("../models/room");
const UserModel = require("../models/user");

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

async function assignMasterForRoom(roomId, userId) {
  return await updateRoom(roomId, { master: userId });
}

async function validateUserMaster(roomId, userId) {
  let room = await getRoomById(roomId);
  if (room.master === userId) {
    let user = UserModel.findOne({ room: roomId, active: true });
    await assignMasterForRoom(roomId, user ? user._id : null);
  }
}

module.exports = {
  createRoom: createRoom,
  getRoomById: getRoomById,
  updateRoom: updateRoom,
  updateAndGetRoom: updateAndGetRoom,
  assignMasterForRoom: assignMasterForRoom,
  validateUserMaster: validateUserMaster
};
