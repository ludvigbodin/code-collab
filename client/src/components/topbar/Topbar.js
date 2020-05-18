import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateRoom from "./CreateRoom";
import Logo from "./Logo";
import TopbarUserList from "./TopbarUserList";

function Topbar() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const users = useSelector(state => state.room.users);
  const { hasJoinedRoom } = user;

  return (
    <div id="topbar">
      <Logo />
      {!hasJoinedRoom && <CreateRoom dispatch={dispatch} />}
      {hasJoinedRoom && <TopbarUserList users={users} />}
    </div>
  );
}

export default Topbar;
