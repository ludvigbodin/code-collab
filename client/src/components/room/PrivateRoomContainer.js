import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { getConsoleItem } from "../../utils/output";
import PrivateRoom from "./PrivateRoom";
import Sidebar from "../sidebar/Sidebar";
import { updateCodeInStore } from "../../actions/codeActions";
import { overrideConsole } from "../../utils/output";
import Console from "../content/Console";

function PrivateRoomContainer() {
  const code = useSelector(state => state.code);
  const dispatch = useDispatch();

  useEffect(overrideConsole, []);

  function updateCode(code) {
    dispatch(updateCodeInStore(code));
  }

  return (
    <div id="root-layout">
      <Sidebar />
      <PrivateRoom updateCode={updateCode} code={code} />
      <Console code={code} />
    </div>
  );
}

export default PrivateRoomContainer;
