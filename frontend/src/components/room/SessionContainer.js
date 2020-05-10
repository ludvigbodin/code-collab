import React from "react";
import Sidebar from "../sidebar/Sidebar";
import ContentContainer from "../content/ContentContainer";

function SessionContainer(props) {
  const roomId = props.match.params.room;

  return (
    <div id="root-layout">
      <Sidebar />
      <ContentContainer roomId={roomId} />
    </div>
  );
}

export default SessionContainer;
