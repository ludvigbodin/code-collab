import React from "react";
import { useSelector } from "react-redux";
import { toggleLiveExecution } from "../../actions/executionActions";

function ToggleLiveExecution(props) {
  const { dispatch } = props;
  const liveExecution = useSelector(state => state.liveExecution);

  function toggle() {
    dispatch(toggleLiveExecution(!liveExecution));
  }

  return (
    <div id="toggle-live-execution-wrappaer">
      <label className="switch">
        <input type="checkbox" checked={liveExecution} onChange={toggle} />
        <span className="slider round"></span>
      </label>
    </div>
  );
}

export default ToggleLiveExecution;
