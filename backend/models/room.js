const mongoose = require("mongoose");

const Room = new mongoose.model("Room", roomSchema);

module.exports = Room;
