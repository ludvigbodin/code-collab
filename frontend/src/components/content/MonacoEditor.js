import React from "react";
import { useSelector } from "react-redux";
import { ControlledEditor } from "@monaco-editor/react";

function MonacoEditor(props) {
  const { canEdit, updateCode, code } = props;

  const theme = useSelector(state => state.theme);
  const language = useSelector(state => state.language);

  function onChange(ev, value) {
    updateCode(value);
  }

  const options = {
    readOnly: !canEdit,
    minimap: { enabled: false },
    smoothScrolling: true,
    scrollbar: {
      verticalScrollbarSize: 5,
      horizontalScrollbarSize: 5
    }
  };

  return (
    <div id="editor-wrapper">
      <div id="editor">
        <ControlledEditor
          height="100%"
          width="100%"
          language={language}
          theme={theme}
          value={code}
          onChange={onChange}
          options={options}
        />
      </div>
    </div>
  );
}

export default MonacoEditor;
