import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function Console(props) {
  const liveExecution = useSelector(state => state.liveExecution);

  useEffect(() => {
    if (liveExecution) {
      executeCode(props.code);
    }
  }, [props.code, liveExecution]);

  function executeCode(code) {
    let logger = document.getElementById("console");
    logger.innerHTML = "";
    try {
      let fn = new Function(code);
      document.log("OK");
      fn();
    } catch (err) {
      document.log("ERR");
      console.log(err.name + ": " + err.message);
    }
  }

  return (
    <div id="console-wrapper">
      <div id="console-title">
        <span id="console-text"> console </span>
      </div>
      <div id="console-scroll">
        {/* <div id="console" /> */}
        <ul id="console"></ul>
      </div>
    </div>
  );
}

export default Console;
