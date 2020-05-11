const RoomModel = require("../models/room");
const UserModel = require("../models/user");

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
    const room = await RoomModel.findOne({ _id: roomId }).select(["-__v"]);
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
    const room = this.getRoomById(roomId);
    return room.master === null ? false : true;
  }

  async assignUserAsMasterForRoom(roomId, userId) {
    return await this.updateRoom(roomId, { master: userId });
  }
}

module.exports = RoomService;
