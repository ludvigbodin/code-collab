import React from "react";
import { useSelector } from "react-redux";
import { toggleLiveExecution } from "../../../actions/executionActions";
import ToggleButton from "react-toggle-button";

function ToggleLiveExecution(props) {
  const { dispatch } = props;
  const liveExecution = useSelector(state => state.liveExecution);

  function toggle() {
    dispatch(toggleLiveExecution(!liveExecution));
  }

  return (
    <div className="settings-item-wrapper">
      <ToggleButton value={liveExecution} onToggle={toggle} />
      <h3 className="toggle-text"> Live </h3>
    </div>
  );
}

export default ToggleLiveExecution;
