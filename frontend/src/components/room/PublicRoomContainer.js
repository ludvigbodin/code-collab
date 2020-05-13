import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../sidebar/Sidebar";
import { joinRoom } from "../../actions/roomActions";
import PublicRoom from "./PublicRoom";
import { updateCodeInStore } from "../../actions/codeActions";
import { overrideConsole } from "../../utils/output";

function PublicRoomContainer(props) {
  const roomId = props.match.params.room;
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const code = useSelector(state => state.code);

  useEffect(overrideConsole, []);

  useEffect(() => {
    dispatch(joinRoom(roomId));
  }, [roomId, dispatch]);

  function updateCode(code) {
    dispatch(updateCodeInStore(code));
  }

  return (
    <div id="root-layout">
      <Sidebar />
      {user.hasJoinedRoom && (
        <PublicRoom
          code={code}
          updateCode={updateCode}
          dispatch={dispatch}
          roomId={roomId}
        />
      )}
    </div>
  );
}

export default PublicRoomContainer;
