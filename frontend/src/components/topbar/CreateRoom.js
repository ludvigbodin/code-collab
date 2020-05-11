import React, { useState } from "react";
import { createRoom } from "../../actions/roomActions";

function CreateRoom(props) {
  const [roomName, setRoomName] = useState("");

  const { dispatch } = props;

  function onCreateRoom(e) {
    e.preventDefault();
    dispatch(createRoom(roomName));
  }

  return (
    <div id="create-room-wrapper">
      <form id="create-room-form">
        <input
          id="create-room-textfield"
          type="text"
          value={roomName}
          onChange={e => setRoomName(e.target.value)}
        />
        <button id="create-room-btn" onClick={onCreateRoom}>
          Create room
        </button>
      </form>
    </div>
  );
}

export default CreateRoom;
