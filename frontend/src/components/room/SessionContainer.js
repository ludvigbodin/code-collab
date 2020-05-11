import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Sidebar from "../sidebar/Sidebar";
import ContentContainer from "../content/ContentContainer";
import { joinRoom } from "../../actions/roomActions";

function SessionContainer(props) {
  const roomId = props.match.params.room;
  const dispatch = useDispatch();

  useEffect(() => {
    document.log("effect" + roomId);

    dispatch(joinRoom(roomId));
  }, [roomId]);

  return (
    <div id="root-layout">
      <Sidebar />
      <ContentContainer roomId={roomId} />
    </div>
  );
}

export default SessionContainer;
