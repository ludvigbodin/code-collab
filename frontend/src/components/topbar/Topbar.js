import React from "react";
import { useDispatch } from "react-redux";
import ThemeToggler from "./ThemeToggler";
import CreateRoom from "./CreateRoom";
import Logo from "./Logo";
import ToggleLiveExecution from "./ToggleLiveExecution";

function Topbar() {
  const dispatch = useDispatch();

  return (
    <div id="topbar">
      <Logo />
      <ThemeToggler />
      <CreateRoom dispatch={dispatch} />
      <ToggleLiveExecution dispatch={dispatch} />
    </div>
  );
}

export default Topbar;
