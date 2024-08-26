"use client";
import "@blocknote/core/fonts/inter.css";
import { CodeBlock, insertCode } from "@defensestation/blocknote-code";
import "@blocknote/mantine/style.css";
import { BlockNoteView } from "@blocknote/mantine";
import {
  getDefaultReactSlashMenuItems,
  SuggestionMenuController,
} from "@blocknote/react";
import {
  BlockNoteEditor,
  BlockNoteSchema,
  defaultBlockSpecs,
  filterSuggestionItems,
  PartialBlock,
} from "@blocknote/core";
import { db } from "@/config/firebaseConfig";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";

function Editor({
  params,
}: {
  params: {
    workspaceId: string;
    documentId: string;
  };
}) {
  const [documentOutput, setDocumentOutput] = useState<PartialBlock[]>();

  // save document
  const saveDocument = async (document: any) => {
    const docRef = doc(db, "DocumentOutput", params?.documentId);
    await updateDoc(docRef, { output: document });
  };

  // get document data
  const getDocument = async () => {
    const docRef = doc(db, "DocumentOutput", params?.documentId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      docSnap.data().output && setDocumentOutput(docSnap.data()?.output);
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    params && getDocument();
  }, [params]);

  // creating schema for blocknote
  const schema = BlockNoteSchema.create({
    blockSpecs: {
      ...defaultBlockSpecs,
      procode: CodeBlock,
    },
  });

  // create blocknote editors
  const editor = useMemo(() => {
    return BlockNoteEditor.create({
      initialContent: documentOutput,
      schema: schema,
    });
  }, [documentOutput, schema]);

  return (
    <div className="mx-auto mt-6 md:w-full lg:w-3/5">
      <BlockNoteView
        editor={editor}
        onChange={() => saveDocument(editor.document)}
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
