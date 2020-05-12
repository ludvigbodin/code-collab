import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../sidebar/Sidebar";
import { joinRoom } from "../../actions/roomActions";
import PublicRoom from "./PublicRoom";

function PublicRoomContainer(props) {
  const roomId = props.match.params.room;
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  useEffect(() => {
    document.log("effect" + roomId);

    dispatch(joinRoom(roomId));
  }, [roomId]);

  return (
    <div id="root-layout">
      <Sidebar />
      {user.hasJoinedRoom && <PublicRoom roomId={roomId} />}
    </div>
  );
}

export default PublicRoomContainer;
