"use client";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useEffect, useState } from "react";
import { BlockNoteView } from "@blocknote/mantine";
import { uploadFiles } from "@/utils/uploadthing";
import { db } from "@/config/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { sanitizeBlocks } from "@/utils/blockNoteUtil";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";

function Editor({
  params,
  editable,
}: {
  params: {
    workspaceId: string;
    documentId: string;
  };
  editable: boolean;
}) {
  const [documentOutput, setDocumentOutput] = useState<PartialBlock[]>([]);
  const [editor, setEditor] = useState<BlockNoteEditor | null>(null);

  // Fetch the document from Firestore
  const getDocument = async () => {
    const docRef = doc(db, "PageDocumentOutput", params.documentId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const output = docSnap.data()?.output;
      if (Array.isArray(output)) {
        setDocumentOutput(output); // Set the document content
      }
    } else {
      console.log("No such document!");
    }
  };

  // Save document function
  const saveDocument = async (document: PartialBlock[]) => {
    const docRef = doc(db, "PageDocumentOutput", params.documentId);
    await updateDoc(docRef, { output: document });
  };

  // Fetch the document on component mount
  useEffect(() => {
    if (params) {
      getDocument();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  // Initialize the editor when documentOutput is fetched
  useEffect(() => {
    if (documentOutput.length > 0 && !editor) {
      const newEditor = BlockNoteEditor.create({
        initialContent: documentOutput,
        uploadFile: async (file: File) => {
          const [res] = await uploadFiles("imageUploader", {
            files: [file],
          });
          return res.url;
        },
      });
      setEditor(newEditor);
    }
  }, [documentOutput, editor]);

  return (
    <div className="mx-auto mt-6 md:w-full md:-translate-x-4 lg:w-3/5">
      {editor && (
        <BlockNoteView
          editor={editor}
          onChange={async () => {
            if (editable) {
              const data = await sanitizeBlocks(editor.document);
              saveDocument(data); // Only save document when in editable mode
            }
          }}
          style={{
            width: "100%",
          }}
          formattingToolbar={true}
          theme={"dark"}
          emojiPicker={true}
          tableHandles={true}
          editable={editable}
        />
      )}
    </div>
  );
}

export default Editor;
