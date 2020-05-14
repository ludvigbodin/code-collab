const RoomModel = require("../models/room");
const UserModel = require("../models/user");

class UserService {
  constructor() {}

  async joinRoom(name, socketId, roomId) {
    const user = await new UserModel({
      name: name,
      room: roomId,
      socketId: socketId
    });
    const result = await user.save();
    console.log(
      "Created user with name " + name + " and joined room " + roomId
    );
    return result;
  }

  async disconnectUserFromRoom(socketId) {
    return this.updateUser({ socketId: socketId }, { active: false });
  }

  async updateUser(condition, data) {
    return await UserModel.findOneAndUpdate(condition, data, { new: true });
  }
}

module.exports = UserService;
