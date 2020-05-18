const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const morgan = require("morgan");
require("dotenv").config();
const sockets = require("./sockets");

const RoomService = require("./services/RoomService");
const roomService = new RoomService();

const Database = require("./db/database");
const db = new Database();

app.use(express.json());
app.use(morgan("tiny"));

db.connect(process.env.MONGO_URI, process.env.DB_NAME);
sockets.init(io);

const PORT = process.env.PORT || 5000;

app.post("/api/room/create", async (req, res) => {
  if (!req.body.roomName || req.body.roomName.length === 0) {
    res.status(400).send({ message: "Name is required" });
    return;
  }
  const roomName = req.body.roomName;
  const roomId = await roomService.createRoom(roomName);
  res.send({ roomId: roomId });
});

app.get("/api/room/join/:roomId", async (req, res) => {
  const roomId = req.params.roomId;
  const room = await roomService.getRoomById(roomId);
  room === null
    ? res.status(400).send({ message: "Room doesn't exist" })
    : res.send(room);
});

app.get("/api/status", (req, res) => {
  res.send({ status: "running" });
});

// TEST -----------------------
app.get("/api/test", async (req, res) => {
  const rest = await roomService.getRoomById("5eb9b2b683b3c79a35ea4cf1");
  res.send(rest);
});
// -----------------------------

http.listen(PORT, () => {
  console.log("server running on PORT: " + PORT);
});
