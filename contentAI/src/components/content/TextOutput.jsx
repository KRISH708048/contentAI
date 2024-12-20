import React, { useEffect, useRef } from "react";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
import Button from "@mui/joy/Button";

const TextOutput = ({ aiOutput, loading }) => {
  const editorRef = useRef();

  useEffect(() => {
    if (editorRef.current && aiOutput) {
      editorRef.current.getInstance().setMarkdown(aiOutput);
    }
  }, [aiOutput]);

  const handleCopy = () => {
    if (editorRef.current) {
      const content = editorRef.current.getInstance().getMarkdown();
      navigator.clipboard.writeText(content).then(
        () => alert("Copied to clipboard!"),
        (err) => console.error("Failed to copy: ", err)
      );
    }
  };

  return (
    <div className="p-4 flex-col gap-10 border rounded-md shadow bg-gray-50">
      {loading ? (
        <p className="text-center text-gray-500">Loading AI response...</p>
      ) : (
        <Editor
          ref={editorRef}
          initialValue="Waiting for AI response..."
          initialEditType="wysiwyg"
          useCommandShortcut={true}
        />
      )}
      <div className="flex justify-end mt-4">
        <Button className="w-1/5" color="primary" onClick={handleCopy} disabled={loading}>
          Copy
        </Button>
      </div>
    </div>
  );
};

export default TextOutput;
