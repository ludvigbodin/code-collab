import React from "react";
import { useDispatch } from "react-redux";
import CreateRoom from "./CreateRoom";
import Logo from "./Logo";

function Topbar() {
  const dispatch = useDispatch();

  return (
    <div id="topbar">
      <Logo />
      <CreateRoom dispatch={dispatch} />
    </div>
  );
}

export default Topbar;
