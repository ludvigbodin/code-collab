import React from "react";
import MonacoEditor from "../content/MonacoEditor";

function PrivateRoom(props) {
  const { updateCode, code } = props;

  return (
    <div id="content-wrapper">
      <div id="content">
        <MonacoEditor canEdit={true} code={code} updateCode={updateCode} />
      </div>
    </div>
  );
}

export default PrivateRoom;
