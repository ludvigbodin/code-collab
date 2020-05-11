Map.prototype.computeIfAbsent = function(key, value) {
  return this.get(key) ? this.get(key) : value;
};

let rooms = new Map();
let users = {};

function initilizeSocket(io) {
  io.on("connection", socket => {
    socket.on("join_room", ({ room, name }) => {
      socket.join(room, () => {
        let user = {
          id: socket.id,
          name: name,
          room: room
        };

        const info = updateRoom(room, user);

        io.to(user.id).emit("get_id", user.id);
        io.in(room).emit("user_connected", info);
      });
    });

    socket.on("typing", ({ code, room }) => {
      socket.broadcast.to(room).emit("recieve_code", code);
    });

    socket.on("disconnect", () => {
      let userId = socket.id;

      const data = removeUser(userId);
      if (data.user) {
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

function updateRoom(room, user) {
  let info = rooms.computeIfAbsent(room, { name: room, master: null });

  if (info.master === null) {
    info.master = user.id;
  }
  rooms.set(room, info);
  users[user.id] = user;

  return {
    room: info.name,
    master: info.master,
    users: getUsersInRoom(room)
  };
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
