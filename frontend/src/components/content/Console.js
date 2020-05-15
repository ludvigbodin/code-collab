import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { executeCode } from "../../utils/execute";

function Console(props) {
  const liveExecution = useSelector(state => state.liveExecution);

  useEffect(() => {
    if (liveExecution) {
      executeCode(props.code);
    }
  }, [props.code, liveExecution]);

  return (
    <div id="console-wrapper">
      <div id="console-title">
        <span id="console-text"> console </span>
      </div>
      <div id="console-scroll">
        <ul id="console"></ul>
      </div>
    </div>
  );
}

export default Console;
