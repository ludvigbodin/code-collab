import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MonacoEditor from "../content/MonacoEditor";
import Console from "../content/Console";
import { setRoomData } from "../../actions/roomActions";
import { setUserId } from "../../actions/userActions";

import {
  emitJoinRoom,
  onUserConnect,
  onRecieveCode,
  emitTyping,
  onUserDisconnect,
  onJoinRoom
} from "../../utils/socket";

import { getConsoleItem } from "../../utils/output";
import { notifyWarning, notifyInfo } from "../../utils/toaster";

function PublicRoom(props) {
  const user = useSelector(state => state.user);
  const room = useSelector(state => state.room);
  const master = room.master;

  const { dispatch, code, updateCode } = props;

  useEffect(() => {
    if (master === user.id) {
      emitTyping(code, room.roomId);
    }
  }, [code, master, user.id, room]);

  function setRoom(room) {
    dispatch(setRoomData(room));
  }

  function setUserIdToStore(userId) {
    dispatch(setUserId(userId));
  }

  useEffect(changeConsoleLog, []);

  useEffect(initializeSockets, [props.roomId]);

  function initializeSockets() {
    /* let name = prompt('whats ur name?') */
    let name = "John Doe " + Math.floor(Math.random() * 100);
    document.log("Name: " + name + " Room: " + props.roomId);
    emitJoinRoom(name, props.roomId);

    onUserConnect(info => {
      document.log("Room Info", info.roomInfo);
      document.log("Joined user ", info.user);
      setRoom(info.roomInfo);
      notifyInfo(info.user + " joined");
    });

    onJoinRoom(data => {
      setRoom(data.roomInfo);
      setUserIdToStore(data.userId);
    });

    onRecieveCode(code => {
      updateCode(code);
    });

    onUserDisconnect(data => {
      setRoom(data.info);
      notifyWarning(data.user.name + " disconnected");
    });
  }

  function changeConsoleLog() {
    console.log = function() {
      for (var i = 0; i < arguments.length; i++) {
        let consoleItem = getConsoleItem(arguments[i]);
        outputToConsole(consoleItem);
      }
    };
  }

  function outputToConsole(consoleItem) {
    let logger = document.getElementById("console");
    logger.appendChild(consoleItem);
  }

  const userIsMaster = master === user.id;

  return (
    <div id="content-wrapper">
      <div id="content">
        <MonacoEditor
          canEdit={userIsMaster}
          code={code}
          updateCode={updateCode}
          master={master}
        />
        <Console code={code} />
      </div>
    </div>
  );
}

export default PublicRoom;
