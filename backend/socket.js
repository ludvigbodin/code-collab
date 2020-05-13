let UserService = require("./services/UserService");
let userService = new UserService();

let RoomService = require("./services/RoomService");
let roomService = new RoomService();

function initilizeSocket(io) {
  io.on("connection", socket => {
    socket.on("join_room", ({ roomId, name }) => {
      socket.join(roomId, async () => {
        console.log(name + " is trying to join room " + roomId);
        let room = await roomService.getRoomById(roomId);
        let user = await userService.joinRoom(name, socket.id, roomId);

        if (room.master === null) {
          room = await roomService.assignUserAsMasterForRoom(roomId, user._id);
        }

        const usersInRoom = await roomService.getActiveUsersInRoomById(roomId);
        const roomInfo = {
          master: room.master,
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

        const infoToOtherParticipants = {
          roomInfo: roomInfo,
          user: user.name
        };

        io.to(socket.id).emit("join_room", infoToJoinedUser);
        socket.broadcast
          .to(roomId)
          .emit("user_connected", infoToOtherParticipants);
      });
    });

    socket.on("typing", ({ code, roomId }) => {
      socket.broadcast.to(roomId).emit("recieve_code", code);
    });

    socket.on("assign_master", async data => {
      await roomService.assignUserAsMasterForRoom(data.roomId, data.userId);
      io.in(data.roomId).emit(
        "new_master_assigned",
        await getRoomInfo(data.roomId)
      );
    });

    socket.on("disconnect", async () => {
      let disconnectedUser = await userService.disconnectUserFromRoom(
        socket.id
      );
      if (disconnectedUser) {
        let roomId = disconnectedUser.room;
        let room = await roomService.getRoomById(roomId);
        if (disconnectedUser._id.toString() === room.master.toString()) {
          await roomService.assignRandomUserAsMaster(roomId);
        }
        let data = {
          info: await getInfoWhenUserDisconnect(roomId),
          user: disconnectedUser
        };
        io.to(roomId).emit("user_disconnected", data);
      }
    });
  });
}

async function getRoomInfo(roomId) {
  const room = await roomService.getRoomById(roomId);
  return {
    master: room.master,
    isActive: room.isActive,
    roomId: room._id,
    roomName: room.roomName,
    created: room.created,
    users: await roomService.getActiveUsersInRoomById(roomId)
  };
}

async function getInfoWhenUserDisconnect(roomId) {
  const room = await roomService.getRoomById(roomId);
  return {
    master: room.master,
    users: await roomService.getActiveUsersInRoomById(roomId)
  };
}

module.exports = initilizeSocket;
