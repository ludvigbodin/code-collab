import React, { useState, useEffect } from "react";
import { getConsoleItem } from "../../utils/output";
import PrivateRoom from "./PrivateRoom";
import Sidebar from "../sidebar/Sidebar";

function PrivateRoomContainer() {
  const [code, setCode] = useState("//write ur code here");

  useEffect(changeConsoleLog, []);

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

  return (
    <div id="root-layout">
      <Sidebar />
      <PrivateRoom updateCode={updateCode} code={code} />
    </div>
  );
}

export default PrivateRoomContainer;
