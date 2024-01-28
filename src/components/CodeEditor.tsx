/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Editor } from "@monaco-editor/react";

interface ICodeEditorProps {
  onChange: (eventName: string, value: string) => void;
  code: string;
}

export default function CodeEditor({ onChange, code }: ICodeEditorProps) {
  const [value, setValue] = useState(code || "");

  // const editorOptions = {
  //   selectOnLineNumbers: true,
  //   fontSize: 14,
  //   automaticLayout: true,
  // };

  const handleEditorChange = (newValue: any) => {
    setValue(newValue);
    onChange("code", newValue);
  };

  // const languageConfiguration = {
  //   comments: {
  //     lineComment: "//",
  //     blockComment: ["/*", "*/"],
  //   },
  //   brackets: [
  //     ["{", "}"],
  //     ["[", "]"],
  //     ["(", ")"],
  //   ],
  //   autoClosingPairs: [
  //     { open: "{", close: "}" },
  //     { open: "[", close: "]" },
  //     { open: "(", close: ")" },
  //     { open: "'", close: "'", notIn: ["string", "comment"] },
  //     { open: '"', close: '"', notIn: ["string"] },
  //   ],
  // };

  return (
    <Editor
      height={486}
      language="c"
      theme="vs-dark"
      value={value}
      onChange={handleEditorChange}
      // options={{ ...editorOptions }}
    />
  );
}
