import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { ControlledEditor, monaco } from "@monaco-editor/react";

function MonacoEditor(props) {
  const { updateCode, code, users } = props;

  const [monacoInstance, setMonacoInstance] = useState(null);
  const [decorations, setDecorations] = useState([]);

  const theme = useSelector(state => state.theme);
  const language = useSelector(state => state.language);

  useEffect(applyCursorEffects, [users]);

  useEffect(() => {
    document.log("Init");
    monaco
      .init()
      .then(monaco => {
        setMonacoInstance(monaco);
      })
      .catch(error =>
        console.error(
          "An error occurred during initialization of Monaco: ",
          error
        )
      );
  }, []);

  const editorValue = useRef(null);
  const editorRef = useRef(null);

  function handleEditorDidMount(_editorValue, _editorRef) {
    editorValue.current = _editorValue;
    editorRef.current = _editorRef;
  }

  function onChange() {
    let cursorCoordinates = editorRef.current.getPosition();
    const code = editorValue.current();
    updateCode(code, cursorCoordinates);
  }

  function applyCursorEffects() {
    if (!!monacoInstance && !!editorRef && users) {
      const filteredUsers = users.filter(user => user.cursorCoordinates);
      const ranges = filteredUsers.map(user => {
        const coord = user.cursorCoordinates;
        return {
          range: new monacoInstance.Range(
            coord.lineNumber,
            coord.column,
            coord.lineNumber,
            coord.column
          ),
          options: {
            className: "user-cursor",
            inlineClassName: "selectedRange"
          }
        };
      });
      var newDeco = editorRef.current.deltaDecorations(decorations, ranges);
      setDecorations(newDeco);
    }
  }

  const options = {
    minimap: { enabled: false },
    smoothScrolling: true,
    scrollbar: {
      verticalScrollbarSize: 5,
      horizontalScrollbarSize: 5
    }
  };

  return (
    <div id="editor-wrapper">
      <div id="editor" onKeyUp={onChange}>
        <ControlledEditor
          height="100%"
          width="100%"
          language={language}
          theme={theme}
          value={code}
          editorDidMount={handleEditorDidMount}
          options={options}
        />
      </div>
    </div>
  );
}

export default MonacoEditor;
