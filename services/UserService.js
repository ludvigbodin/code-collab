const UserModel = require("../models/user");

const colors = ["red", "blue", "green", "orange", "purple", "pink", "yellow"];

class UserService {
  constructor() {}

  async joinRoom(name, socketId, roomId) {
    const availableColors = await this.getAvailableColors(roomId);

    const user = await new UserModel({
      name: name,
      room: roomId,
      socketId: socketId,
      color: availableColors[0]
    });
    const result = await user.save();
    return result;
  }

  async disconnectUserFromRoom(socketId) {
    return this.updateUser({ socketId: socketId }, { active: false });
  }

  async updateUser(condition, data) {
    return await UserModel.findOneAndUpdate(condition, data, { new: true });
  }

  async getAvailableColors(roomId) {
    const users = await UserModel.find({
      room: roomId,
      active: true
    });

    const userColors = users.map(user => user.color);
    return colors.filter(color => !userColors.includes(color));
  }
}

module.exports = UserService;
