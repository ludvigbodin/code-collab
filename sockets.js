let UserService = require("./services/UserService");
let userService = new UserService();

let RoomService = require("./services/RoomService");
let roomService = new RoomService();

let sockets = {};

sockets.init = function(io) {
  io.on("connection", socket => {
    socket.on("join_room", ({ roomId, name }) => {
      socket.join(roomId, async () => {
        console.log(name + " is trying to join room " + roomId);
        let room = await roomService.getRoomById(roomId);
        let user = await userService.joinRoom(name, socket.id, roomId);

        const usersInRoom = await roomService.getActiveUsersInRoomById(roomId);
        const roomInfo = {
          isActive: room.isActive,
          roomId: room._id,
          roomName: room.roomName,
          created: room.created,
          users: usersInRoom
        };

        const infoToJoinedUser = {
          roomInfo: roomInfo,
          userId: user._id
        };
        io.to(socket.id).emit("join_room", infoToJoinedUser);
        socket.broadcast.to(roomId).emit("user_connected", user);
      });
    });

    socket.on("typing", data => {
      socket.broadcast.to(data.roomId).emit("recieve_code", data.info);
    });

    socket.on("disconnect", async () => {
      const user = await userService.disconnectUserFromRoom(socket.id);
      if (user) {
        io.to(user.room).emit("user_disconnected", user);
      }
    });
  });
};

module.exports = sockets;
