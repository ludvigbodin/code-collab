import React from "react";
import { useSelector } from "react-redux";
import { executeCode } from "../../../utils/execute";

function ExecuteButton() {
  const code = useSelector(state => state.code);

  function execute() {
    executeCode(code);
  }

  return (
    <div id="settings-item-wrapper">
      <button className="blue-btn execute-now-btn" onClick={execute}>
        <i className="fa fa-play"></i> Run
      </button>
    </div>
  );
}

export default ExecuteButton;
