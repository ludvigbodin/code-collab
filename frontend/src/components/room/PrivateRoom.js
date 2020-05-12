import React from "react";
import MonacoEditor from "../content/MonacoEditor";
import Console from "../content/Console";

function PrivateRoom(props) {
  const { updateCode, code } = props;

  return (
    <div id="content-wrapper">
      <div id="content">
        <MonacoEditor canEdit={true} code={code} updateCode={updateCode} />
        <Console code={code} />
      </div>
    </div>
  );
}

export default PrivateRoom;
