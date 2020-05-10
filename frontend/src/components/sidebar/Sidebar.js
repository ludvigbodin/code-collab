import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserList from "./UserList";
import { emitAssignMaster, onNewMasterAssigned } from "../../utils/socket";
import { setRoomData } from "../../actions/roomActions";

function Sidebar() {
  const roomData = useSelector(state => state.room);
  const userId = useSelector(state => state.user);
  const dispatch = useDispatch();

  const { users, room, master } = roomData;

  useEffect(initilizeHooks, []);

  function initilizeHooks() {
    onNewMasterAssigned(data => {
      setRoom(data);
    });
  }

  function setRoom(room) {
    dispatch(setRoomData(room));
  }

  function assignNewMaster(userId) {
    const data = {
      userId: userId,
      roomName: room
    };
    emitAssignMaster(data);
  }

  return (
    <div id="sidebar">
      <div id="sidebar-title-wrapper">
        <h3 id="sidebar-title"> Users </h3>
      </div>
      <UserList
        assignNewMaster={assignNewMaster}
        master={master}
        userId={userId}
        users={users}
      />
    </div>
  );
}

export default Sidebar;
