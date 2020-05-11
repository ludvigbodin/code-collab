var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var connectoToDb = require("./repository/database");
var initilizeSocket = require("./socket");

var { createRoom, getRoomByUUID } = require("./repository/roomRepository");

app.use(express.json());

connectoToDb();
initilizeSocket(io);

const PORT = 5000;

/* app.get("/api/room/:roomId", (req, res) => {
  console.log(req.params);
  res.send({ status: "ok" });
}); */

app.post("/api/room/create", async (req, res) => {
  const data = {
    roomName: req.body.roomName
  };
  const roomUUID = await createRoom(data);
  res.send({ roomUUID: roomUUID });
});

app.get("/api/room/:roomUUID", async (req, res) => {
  const UUID = req.params.roomUUID;
  const room = await getRoomByUUID(UUID);
  room === null ? res.sendStatus(404) : res.send(room);
});

// TEST -----------------------
app.post("/api/room/test", (req, res) => {
  const data = {
    roomName: req.body.roomName
  };
  res.sendStatus(404);
  //res.send({ roomUUID: "TEST" });
});
// -----------------------------

http.listen(PORT, () => {
  console.log("server running on PORT: " + PORT);
});
