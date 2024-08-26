"use client";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

function Editor({}: EditorProps) {
  const editor = useCreateBlockNote({});

  return (
    <div className="mx-auto mt-6 md:w-full lg:w-3/5">
      <BlockNoteView
        editor={editor}
        onChange={() => console.log(editor.document)}
        theme={"dark"}
        emojiPicker={true}
        tableHandles={true}
        slashMenu={false}
      ></BlockNoteView>
    </div>
  );
}
export default Editor;
