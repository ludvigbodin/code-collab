import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserList from "./UserList";
import { emitAssignMaster, onNewMasterAssigned } from "../../utils/socket";
import { setRoomData } from "../../actions/roomActions";

function Sidebar() {
  const roomData = useSelector(state => state.room);
  const userId = useSelector(state => state.user);
  const dispatch = useDispatch();

  const { users, master, roomId } = roomData;

  useEffect(initilizeHooks, []);

  function initilizeHooks() {
    onNewMasterAssigned(data => {
      setRoom(data);
    });
  }

  function setRoom(data) {
    dispatch(setRoomData(data));
  }

  function assignNewMaster(userId) {
    const data = {
      userId: userId,
      roomId: roomId
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
