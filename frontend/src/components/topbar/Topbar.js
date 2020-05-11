import React from "react";
import { useDispatch } from "react-redux";
import ThemeToggler from "./ThemeToggler";
import CreateRoom from "./CreateRoom";

function Topbar() {
  const dispatch = useDispatch();

  return (
    <div id="topbar">
      <ThemeToggler />
      <CreateRoom dispatch={dispatch} />
    </div>
  );
}

export default Topbar;
