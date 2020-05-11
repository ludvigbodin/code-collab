const UserModel = require("../models/user");

async function addUserToRoom(roomId, username, socketod) {
  const user = await new UserModel({
    name: username,
    room: roomId,
    socketId: socketId
  });
  const result = await user.save();
  console.log("User joined: ");
  return result;
}

async function getActiveUsersInRoomById(roomId) {
  const users = await UserModel.find({ room: roomId, active: true });
  return users;
}

async function updateUserInRoom(roomId, userId, data) {
  return await UserModel.findOneAndUpdate(
    { room: roomId, userId: userId },
    data,
    { new: true }
  );
}

async function disconnectUserBySocketID(socketId) {
  return await UserModel.findOneAndUpdate(
    { socketId: socketId },
    { active: false },
    { new: true }
  );
}

module.exports = {
  addUserToRoom: addUserToRoom,
  getActiveUsersInRoomById: getActiveUsersInRoomById,
  updateUserInRoom: updateUserInRoom,
  disconnectUserBySocketID: disconnectUserBySocketID
};
