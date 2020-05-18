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
          className="input-style "
          id="create-room-textfield"
          type="text"
          value={roomName}
          placeholder="Enter name"
          onChange={e => setRoomName(e.target.value)}
        />
        <button className="blue-btn" onClick={onCreateRoom}>
          Create room
        </button>
      </form>
    </div>
  );
}

export default CreateRoom;
