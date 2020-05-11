var { addUserToRoom, getUsersInRoom, disconnectUserBySocketID } = require("./repository/UserRepository");
var { getRoomById, updateAndGetRoom } = require("./repository/RoomRepository")

Map.prototype.computeIfAbsent = function(key, value) {
  return this.get(key) ? this.get(key) : value;
};


function initilizeSocket(io) {
  io.on("connection", socket => {
    socket.on("join_room", ({ roomId, username }) => {
      socket.join(roomId, () => {
        const socketId = socket.id;
        const user = await addUserToRoom(roomId, username. socketId)
        const room = await updateAndGetRoom(roomId, user._id);

        const info = {
          ...room,
          users: getUsersInRoom(roomId)
        }

        io.to(socketId).emit("get_id", user._id);
        io.in(roomId).emit("user_connected", info);
      });
    });

    socket.on("typing", ({ code, roomId }) => {
      socket.broadcast.to(roomId).emit("recieve_code", code);
    });

    socket.on("disconnect", () => {
      let socketId = socket.id;

      let user = await disconnectUserBySocketID(socketId)
      if (user) {
        checkIfDisconnectedUserIsMaster(data.user);
        io.to(data.user.room).emit("user_disconnected", data);
      }
    });

    socket.on("assign_master", data => {
      assignNewMasterForRoom(data);
      io.in(data.roomName).emit(
        "new_master_assigned",
        getRoomInfo(data.roomName)
      );
    });
  });
}

function getUsersInRoom(room) {
  return Object.values(users).filter(user => user.room === room);
}

function getRoomInfo(roomName) {
  let room = rooms.computeIfAbsent(roomName, { name: roomName, master: null });

  return {
    room: room.name,
    master: room.master,
    users: getUsersInRoom(room.name)
  };
}

function removeUser(userId) {
  const data = {
    user: users[userId]
  };
  delete users[userId];
  if (data.user) {
    data.users = getUsersInRoom(data.user.room);
  }
  return data;
}

function checkIfDisconnectedUserIsMaster(user) {
  const room = rooms.get(user.room);
  if (room.master === user.id) {
    room.master = null;
    rooms.set(room.name, room);
  }
}

function assignNewMasterForRoom(data) {
  let room = rooms.get(data.roomName);
  room.master = data.userId;
  rooms.set(data.roomName, room);
}

module.exports = initilizeSocket;
