var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var connectoToDb = require("./repository/database");
var initilizeSocket = require("./socket");

var { createRoom, getRoomById } = require("./repository/RoomRepository");
var { addUserToRoom } = require("./repository/UserRepository");

app.use(express.json());

connectoToDb();
initilizeSocket(io);

const PORT = 5000;

app.post("/api/room/create", async (req, res) => {
  const data = {
    roomName: req.body.roomName
  };
  const roomId = await createRoom(data);
  res.send({ roomId: roomId });
});

app.get("/api/join/:roomId", async (req, res) => {
  const roomId = req.params.roomId;
  const room = await getRoomById(roomId);
  room === null ? res.sendStatus(404) : res.send(room);
});

// TEST -----------------------
app.get("/api/rooms/test", async (req, res) => {
  const rest = await getRoomById("5eb95af16948477e8408c6bc");
  res.send(rest);
  //res.send({ roomUUID: "TEST" });
});

app.post("/api/join", async (req, res) => {
  let r = await addUserToRoom("5eb95af16948477e8408c6bc", "Ludvig B");
  res.send(r);
});
// -----------------------------

http.listen(PORT, () => {
  console.log("server running on PORT: " + PORT);
});
