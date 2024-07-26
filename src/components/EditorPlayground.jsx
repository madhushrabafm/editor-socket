import React, { useEffect, useRef } from "react";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import "codemirror/lib/codemirror.css";
import CodeMirror from "codemirror";

function EditorPlayground({ socketRef, roomId, onCodeChange }) {
  const editorRef = useRef(null);

  useEffect(() => {
    const initEditor = () => {
      const editor = CodeMirror.fromTextArea(
        document.getElementById("realtimeEditor"),
        {
          mode: { name: "javascript", json: true },
          theme: "dracula",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        }
      );

      editor.setSize(null, "100%");
      editorRef.current = editor;

      editor.on("change", (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue();
        onCodeChange(code);

        if (origin !== "setValue") {
          socketRef.current.emit("code-change", {
            roomId,
            code,
          });
        }
      });
    };

    initEditor();

    if (socketRef.current) {
      // Listen for code-change event from other clients
      socketRef.current.on("code-change", ({ code }) => {
        if (editorRef.current) {
          const currentCode = editorRef.current.getValue();
          if (currentCode !== code) {
            editorRef.current.setValue(code);
          }
        }
      });

      // Listen for requestCodeSync event to provide code to new users
      socketRef.current.on("requestCodeSync", () => {
        const code = editorRef.current.getValue();
        socketRef.current.emit("syncCode", {
          socketId: socketRef.current.id,
          code,
        });
      });

      // Cleanup listeners on component unmount
      return () => {
        socketRef.current.off("code-change");
        socketRef.current.off("requestCodeSync");
      };
    }
  }, [socketRef, roomId, onCodeChange]);

  return (
    <div style={{ height: "100vh" }} className="overflow-hidden">
      <textarea id="realtimeEditor" className="text-lg"></textarea>
    </div>
  );
}

export default EditorPlayground;
