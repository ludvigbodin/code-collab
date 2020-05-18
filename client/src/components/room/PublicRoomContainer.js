import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../sidebar/Sidebar";
import { validateRoom } from "../../actions/roomActions";
import PublicRoom from "./PublicRoom";
import { updateCodeInStore } from "../../actions/codeActions";
import { overrideConsole } from "../../utils/output";
import Console from "../content/Console";
import Modal from "../../Modal";
import { setUserName } from "../../actions/userActions";

function PublicRoomContainer(props) {
  const roomId = props.match.params.room;
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const code = useSelector(state => state.code);
  const room = useSelector(state => state.room);

  const [showModal, setShowModal] = useState(true);

  useEffect(overrideConsole, []);

  useEffect(() => {
    dispatch(validateRoom(roomId));
  }, [dispatch, roomId]);

  function updateCode(code) {
    dispatch(updateCodeInStore(code));
  }

  function onModalOk(name) {
    dispatch(setUserName(name));
    setShowModal(false);
  }

  return (
    <div id="root-layout">
      <Sidebar />
      {user.userRoomInfo.validated && user.name.length > 0 && (
        <PublicRoom
          code={code}
          updateCode={updateCode}
          dispatch={dispatch}
          roomId={roomId}
          user={user}
          room={room}
        />
      )}
      <Console code={code} />
      <Modal show={showModal} handleOk={onModalOk} />
    </div>
  );
}

export default PublicRoomContainer;
