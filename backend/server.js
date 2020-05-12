let express = require("express");
let app = express();
let http = require("http").Server(app);
let io = require("socket.io")(http);

let connectoToDb = require("./repository/database");
let initilizeSocket = require("./socket2");

let RoomService = require("./services/RoomService");
let roomService = new RoomService();

app.use(express.json());

connectoToDb();
initilizeSocket(io);

const PORT = 5000;

app.post("/api/room/create", async (req, res) => {
  const roomName = req.body.roomName;
  const roomId = await roomService.createRoom(roomName);
  res.send({ roomId: roomId });
});

app.get("/api/join/:roomId", async (req, res) => {
  const roomId = req.params.roomId;
  const room = await roomService.getRoomById(roomId);
  room === null ? res.sendStatus(404) : res.send(room);
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
