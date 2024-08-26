"use client";
import "@blocknote/core/fonts/inter.css";
import { CodeBlock, insertCode } from "@defensestation/blocknote-code";
import "@blocknote/mantine/style.css";
import { BlockNoteView } from "@blocknote/mantine";
import {
  getDefaultReactSlashMenuItems,
  SuggestionMenuController,
  useCreateBlockNote,
} from "@blocknote/react";
import {
  BlockNoteSchema,
  defaultBlockSpecs,
  filterSuggestionItems,
} from "@blocknote/core";

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

function Editor({}: EditorProps) {
  const schema = BlockNoteSchema.create({
    blockSpecs: {
      ...defaultBlockSpecs,
      procode: CodeBlock,
    },
  });
  const editor = useCreateBlockNote({
    schema: schema,
  });

  return (
    <div className="mx-auto mt-6 md:w-full lg:w-3/5">
      <BlockNoteView
        editor={editor}
        onChange={() => console.log(editor.document)}
        theme={"dark"}
        emojiPicker={true}
        tableHandles={true}
        slashMenu={false}
      >
        <SuggestionMenuController
          triggerCharacter={"/"}
          getItems={async (query) =>
            filterSuggestionItems(
              [...getDefaultReactSlashMenuItems(editor), insertCode()],
              query,
            )
          }
        />
      </BlockNoteView>
    </div>
  );
}
export default Editor;
