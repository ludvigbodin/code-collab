const RoomModel = require("../models/room");
const UserModel = require("../models/user");
const mongoose = require("mongoose");

class RoomService {
  constructor() {}

  async createRoom(roomName) {
    const room = new RoomModel({
      roomName: roomName
    });
    const result = await room.save();
    console.log("Created room with id: " + result._id);
    return result._id;
  }

  async getRoomById(roomId) {
    if (!mongoose.isValidObjectId(roomId)) {
      return null;
    }
    const room = await RoomModel.findById(roomId).select(["-__v"]);
    return room;
  }

  async getActiveUsersInRoomById(roomId) {
    const users = await UserModel.find({ room: roomId, active: true });
    return users;
  }

  async updateRoom(roomId, data) {
    return await RoomModel.findOneAndUpdate({ _id: roomId }, data, {
      new: true
    });
  }

  async roomHasMaster(roomId) {
    const activeUsers = await this.getActiveUsersInRoomById(roomId);
    const room = await this.getRoomById(roomId);

    let filtered = activeUsers.filter(user => user._id === room.master);

    return room.master === null ? false : true;
  }

  async assignUserAsMasterForRoom(roomId, userId) {
    return await this.updateRoom(roomId, { master: userId });
  }

  async assignRandomUserAsMaster(roomId) {
    let user = await UserModel.findOne({
      room: roomId,
      active: true
    });
    let userId = user === null ? null : user._id;
    console.log("Random Room Master: " + userId);
    await this.updateRoom(roomId, { master: userId });
  }
}

module.exports = RoomService;
