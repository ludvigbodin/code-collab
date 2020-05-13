import React from "react";
import ThemeToggler from "../topbar/ThemeToggler";
import ToggleLiveExecution from "../topbar/ToggleLiveExecution";

function RoomConfig(props) {
  const { dispatch } = props;

  return (
    <>
      <div id="sidebar-config-title-wrapper">
        <h3 id="sidebar-config-title"> Config </h3>
      </div>
      <div id="config">
        <ThemeToggler />
        <ToggleLiveExecution dispatch={dispatch} />
      </div>
    </>
  );
}

export default RoomConfig;
