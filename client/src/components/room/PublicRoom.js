import React, { useEffect } from "react";
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
} from "../../utils/client-sockets";

import { notifyWarning, notifyInfo } from "../../utils/toaster";

function PublicRoom(props) {
  const { dispatch, code, updateCode, user, roomId, room } = props;

  useEffect(initializeSockets, [user.name, roomId]);

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

  function initializeSockets() {
    if (user.name && roomId) {
      emitJoinRoom(user.name, roomId);
      notifyInfo("You have joined room " + user.userRoomInfo.roomName);
    }

    onUserConnect(user => {
      addUser(user);
      notifyInfo(user.name + " joined");
    });

    onJoinRoom(data => {
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
          users={room.users}
        />
      </div>
    </div>
  );
}

export default PublicRoom;
