import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateRoom from "./CreateRoom";
import Logo from "./Logo";

function Topbar() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const { hasJoinedRoom } = user;

  return (
    <div id="topbar">
      <Logo />
      {!hasJoinedRoom && <CreateRoom dispatch={dispatch} />}
    </div>
  );
}

export default Topbar;
