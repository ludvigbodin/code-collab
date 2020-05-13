import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConsoleItem } from "../../utils/output";
import PrivateRoom from "./PrivateRoom";
import Sidebar from "../sidebar/Sidebar";
import { updateCodeInStore } from "../../actions/codeActions";

function PrivateRoomContainer() {
  const code = useSelector(state => state.code);
  const dispatch = useDispatch();

  useEffect(changeConsoleLog, []);

  function updateCode(code) {
    dispatch(updateCodeInStore(code));
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

  return (
    <div id="root-layout">
      <Sidebar />
      <PrivateRoom updateCode={updateCode} code={code} />
    </div>
  );
}

export default PrivateRoomContainer;
