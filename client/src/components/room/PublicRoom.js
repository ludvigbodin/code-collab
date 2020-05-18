import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MonacoEditor from "../content/MonacoEditor";
import {
  setRoomData,
  updateUserCursorCordinates,
  addUserToRoom,
  removeUserFromRoom
} from "../../actions/roomActions";
import { setUserId } from "../../actions/userActions";

import {
  emitJoinRoom,
  onUserConnect,
  onRecieveCode,
  emitTyping,
  onUserDisconnect,
  onJoinRoom
} from "../../utils/socket";

import { notifyWarning, notifyInfo } from "../../utils/toaster";

function PublicRoom(props) {
  const user = useSelector(state => state.user);
  const room = useSelector(state => state.room);
  const master = room.master;

  const { dispatch, code, updateCode } = props;

  function setRoom(room) {
    dispatch(setRoomData(room));
  }

  function addUser(user) {
    dispatch(addUserToRoom(user));
  }

  function removeUser(user) {
    dispatch(removeUserFromRoom(user));
  }

  function setUserIdToStore(userId) {
    dispatch(setUserId(userId));
  }

  useEffect(initializeSockets, [props.roomId]);

  function initializeSockets() {
    /* let name = prompt('whats ur name?') */
    let name = "John Doe " + Math.floor(Math.random() * 100);
    document.log("Name: " + name + " Room: " + props.roomId);
    emitJoinRoom(name, props.roomId);

    onUserConnect(user => {
      addUser(user);
      notifyInfo(user.name + " joined");
    });

    onJoinRoom(data => {
      document.log(data);
      setRoom(data.roomInfo);
      setUserIdToStore(data.userId);
    });

    onRecieveCode(info => {
      updateCode(info.code);
      updateUserCord(info.userId, info.cursorCoordinates);
    });

    onUserDisconnect(user => {
      removeUser(user);
      notifyWarning(user.name + " disconnected");
    });
  }

  function updateUserCord(userId, cursorCoordinates) {
    dispatch(updateUserCursorCordinates(userId, cursorCoordinates));
  }

  function userHasChangedCode(newCode, cursorCoordinates) {
    emitTyping(newCode, room.roomId, user.id, cursorCoordinates);
    updateCode(newCode);
  }

  return (
    <div id="content-wrapper">
      <div id="content">
        <MonacoEditor
          code={code}
          updateCode={userHasChangedCode}
          master={master}
          users={room.users}
        />
      </div>
    </div>
  );
}

export default PublicRoom;
