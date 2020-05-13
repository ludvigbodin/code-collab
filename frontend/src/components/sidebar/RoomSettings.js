import React from "react";
import ThemeToggler from "./settings/ThemeToggler";
import ToggleLiveExecution from "./settings/ToggleLiveExecution";
import ExecuteButton from "./settings/ExecuteButton";

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
        <ExecuteButton />
      </div>
    </>
  );
}

export default RoomSettings;
