import React from "react";
import ThemeToggler from "./settings/ThemeToggler";
import ToggleLiveExecution from "./settings/ToggleLiveExecution";
import ExecuteButton from "./settings/ExecuteButton";
import SidebarTitle from "./item/SidebarTitle";

function RoomSettings(props) {
  const { dispatch } = props;

  return (
    <>
      <SidebarTitle icon="fa fa-cog" title="Settings" />
      <div id="settings">
        <ThemeToggler />
        <ToggleLiveExecution dispatch={dispatch} />
        <ExecuteButton />
      </div>
    </>
  );
}

export default RoomSettings;
