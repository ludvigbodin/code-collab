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

        const info = {
          master: room.master,
          isActive: room.isActive,
          roomId: room._id,
          roomName: room.roomName,
          created: room.created,
          users: await roomService.getActiveUsersInRoomById(roomId)
        };
        io.to(socket.id).emit("get_id", user._id);
        io.in(roomId).emit("user_connected", info);
      });
    });

    socket.on("typing", ({ code, roomId }) => {
      socket.broadcast.to(roomId).emit("recieve_code", code);
    });

    socket.on("assign_master", async data => {
      await roomService.assignUserAsMasterForRoom(data.roomId, data.userId);
      console.log("NEW");

      io.in(data.roomId).emit(
        "new_master_assigned",
        await getRoomInfo(data.roomId)
      );
    });

    // FIXA disconnect

    /*     socket.on("disconnect", () => {
      let socketId = socket.id;
      let user = await userService.disconnectUserFromRoom(socketId)
      let room = await roomService.getRoomById(user.room);
      if (user) {
        if(user.room === room.master) {
            roomService.updateRoom(room.roomId, {master: null})
        }
        io.to(data.user.room).emit("user_disconnected", data);
      }
    }); */
  });
}

// TODO - behöver endast returnera nya MASTER id.
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

module.exports = initilizeSocket;
