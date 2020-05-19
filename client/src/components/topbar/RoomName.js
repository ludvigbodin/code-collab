import React from "react";

function RoomName(props) {
  const { roomName } = props;

  return (
    <div id="create-room-wrapper">
      <h3 className="sidebar-title">Room: {roomName}</h3>
    </div>
  );
}

export default RoomName;
