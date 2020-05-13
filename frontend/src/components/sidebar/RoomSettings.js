import React from "react";
import ThemeToggler from "./settings/ThemeToggler";
import ToggleLiveExecution from "./settings/ToggleLiveExecution";

function RoomSettings(props) {
  const { dispatch } = props;

  return (
    <>
      <div id="sidebar-settings-title-wrapper">
        <h3 id="sidebar-settings-title"> Settings </h3>
      </div>
      <div id="settings">
        <ThemeToggler />
        <ToggleLiveExecution dispatch={dispatch} />
      </div>
    </>
  );
}

export default RoomSettings;
