import React, { useState, useEffect } from "react";
import MonacoEditor from "../content/MonacoEditor";
import Console from "../content/Console";
import { getConsoleItem } from "../../utils/output";

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
    <div id="content-wrapper">
      <div id="content">
        <MonacoEditor canEdit={true} code={code} updateCode={updateCode} />
        <Console code={code} />
      </div>
    </div>
  );
}

export default PrivateRoomContainer;
