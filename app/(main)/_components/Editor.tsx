"use client";
import "@blocknote/core/fonts/inter.css";
import { CodeBlock, insertCode } from "@defensestation/blocknote-code";
import "@blocknote/mantine/style.css";
import { BlockNoteView } from "@blocknote/mantine";
import { uploadFiles } from "@/utils/uploadthing";
import { db } from "@/config/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { sanitizeBlocks } from "@/utils/blockNoteUtil";
import {
  BlockNoteEditor,
  BlockNoteSchema,
  defaultBlockSpecs,
  filterSuggestionItems,
  PartialBlock,
} from "@blocknote/core";
import {
  getDefaultReactSlashMenuItems,
  SuggestionMenuController,
} from "@blocknote/react";

function Editor({
  params,
}: {
  params: {
    workspaceId: string;
    documentId: string;
  };
}) {
  const [documentOutput, setDocumentOutput] = useState<PartialBlock[]>([
    {
      id: "",
      type: "paragraph",
      props: {
        textColor: "default",
        backgroundColor: "default",
        textAlignment: "left",
      },
      content: [],
      children: [],
    },
  ]);

  // save document
  const saveDocument = async (document: PartialBlock[]) => {
    const docRef = doc(db, "DocumentOutput", params?.documentId);
    await updateDoc(docRef, { output: document });
  };

  // get document data
  const getDocument = async () => {
    const docRef = doc(db, "DocumentOutput", params?.documentId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const output = docSnap.data()?.output;
      if (Array.isArray(output) && output.length > 0) {
        setDocumentOutput(output);
      }
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    if (params) {
      getDocument();
    }
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
      uploadFile: async (file: File) => {
        const [res] = await uploadFiles("imageUploader", {
          files: [file],
        });

        return res.url;
      },
    });
  }, [documentOutput, schema]);

  return (
    <div className="mx-auto mt-6 -translate-x-4 md:w-full lg:w-3/5">
      <BlockNoteView
        editor={editor}
        onChange={async () => {
          const data = await sanitizeBlocks(editor.document);
          saveDocument(data);
        }}
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
