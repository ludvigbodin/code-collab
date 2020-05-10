import React, { useEffect } from "react";

function Console(props) {
  useEffect(() => {
    executeCode(props.code);
  }, [props.code]);

  function executeCode(code) {
    let logger = document.getElementById("console");
    logger.innerHTML = "";
    try {
      /*jslint evil: true */
      let fn = new Function(code);
      fn();
    } catch (err) {
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
