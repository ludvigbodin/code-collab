import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import MonacoEditor from "./MonacoEditor";
import Console from "./Console";
import { setRoomData, setRoomUsers } from "../../actions/roomActions";
import { setUser } from "../../actions/userActions";

import {
  emitJoinRoom,
  onUserConnect,
  onGetMyUserId,
  onRecieveCode,
  emitTyping,
  onUserDisconnect
} from "../../utils/socket";

import { getConsoleItem } from "../../utils/output";

function ContentContainer(props) {
  const [code, setCode] = useState("//write ur code here");
  const userId = useSelector(state => state.user);
  const room = useSelector(state => state.room);
  const master = room.master;
  const dispatch = useDispatch();

  useEffect(() => {
    if (master === userId) {
      emitTyping(code, room.room);
    }
  }, [code, master, userId, room]);

  function setRoom(room) {
    dispatch(setRoomData(room));
  }

  function setUserToStore(user) {
    dispatch(setUser(user));
  }

  function setUsersInRoom(users) {
    dispatch(setRoomUsers(users));
  }

  useEffect(changeConsoleLog, []);

  useEffect(initializeSockets, [props.roomId]);

  function initializeSockets() {
    /* let name = prompt('whats ur name?') */
    let name = "John Doe " + Math.floor(Math.random() * 100);
    document.log("Name: " + name + " Room: " + props.roomId);
    emitJoinRoom(name, props.roomId);

    onUserConnect(info => {
      setRoom(info);
    });

    onGetMyUserId(id => {
      setUserToStore(id);
    });

    onRecieveCode(code => {
      setCode(code);
    });

    onUserDisconnect(data => {
      setUsersInRoom(data.users);
      alert("User " + data.user.name + " has disconnected");
    });
  }

  function updateCode(code) {
    setCode(code);
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

  const userIsMaster = master === userId;

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

export default ContentContainer;
