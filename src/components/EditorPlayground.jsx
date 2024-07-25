import React, { useEffect, useRef } from "react";
// import "codemirror/mode/javascript/javascript";
// import "codemirror/theme/dracula.css";
// import "codemirror/addon/edit/closetag";
// import "codemirror/addon/edit/closebrackets";
// import "codemirror/lib/codemirror";
// import CodeMirror from "codemirror";

const EditorPlayground = () => {
  const editorRef = useRef();
  // useEffect(() => {
  //   const init = async () => {
  //     const editor = CodeMirror.fromTextArea(
  //       document.getElementById("EditorPlayground"),
  //       {
  //         mode: { name: "javascript", json: true },
  //         theme: "dracula",
  //         autoCloseTags: true,
  //         autoCloseBrackets: true,
  //         lineNumbers: true,
  //       }
  //     );
  //   };
  // }, []);

  return (
    <div>
      <textarea name="" id="EditorPlayground"></textarea>
    </div>
  );
};

export default EditorPlayground;
