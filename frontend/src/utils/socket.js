import openSocket from "socket.io-client";
const ENDPOINT = "http://localhost:5000";
const socket = openSocket(ENDPOINT);

function emitJoinRoom(name, roomId) {
  socket.emit("join_room", { roomId: roomId, name: name });
}

function onJoinRoom(callback) {
  socket.on("join_room", data => {
    callback(data);
  });
}

function onUserConnect(callback) {
  socket.on("user_connected", info => {
    callback(info);
  });
}

function onUserDisconnect(callback) {
  socket.on("user_disconnected", data => {
    callback(data);
  });
}

function onNewMasterAssigned(callback) {
  socket.on("new_master_assigned", data => {
    callback(data);
  });
}

function emitTyping(code, roomId, userId, cursorCoordinates) {
  const data = {
    roomId: roomId,
    info: {
      code: code,
      cursorCoordinates: cursorCoordinates,
      userId: userId
    }
  };

  socket.emit("typing", data);
}

function onRecieveCode(callback) {
  socket.on("recieve_code", data => {
    callback(data);
  });
}

export {
  emitJoinRoom,
  onJoinRoom,
  onUserConnect,
  onRecieveCode,
  onUserDisconnect,
  emitTyping
};
