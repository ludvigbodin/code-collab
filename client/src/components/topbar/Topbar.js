import React from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateRoom from "./CreateRoom";
import Logo from "./Logo";
import TopbarUserList from "./TopbarUserList";
import RoomName from "./RoomName";

function Topbar() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const users = useSelector(state => state.room.users);
  const { userRoomInfo } = user;

  return (
    <div id="topbar">
      <Logo />
      {userRoomInfo.validated && userRoomInfo.roomName ? (
        <RoomName roomName={userRoomInfo.roomName} />
      ) : (
        <CreateRoom dispatch={dispatch} />
      )}
      {userRoomInfo.validated && <TopbarUserList users={users} />}
    </div>
  );
}

export default Topbar;
