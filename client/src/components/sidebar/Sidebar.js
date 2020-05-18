import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserList from "./UserList";
import { setRoomData } from "../../actions/roomActions";
import RoomSettings from "./RoomSettings";

function Sidebar() {
  const roomData = useSelector(state => state.room);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const { users, master, roomId } = roomData;
  const { id, hasJoinedRoom } = user;

  return (
    <div id="sidebar">
      <RoomSettings dispatch={dispatch} />
      {hasJoinedRoom && <UserList master={master} userId={id} users={users} />}
    </div>
  );
}

export default Sidebar;
