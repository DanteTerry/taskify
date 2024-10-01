"use client";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { BlockNoteView } from "@blocknote/mantine";
import { uploadFiles } from "@/utils/uploadthing";
import { db } from "@/config/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
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

  const saveDocument = async (document: PartialBlock[]) => {
    const docRef = doc(db, "PageDocumentOutput", params?.documentId);
    await updateDoc(docRef, { output: document });
  };

  const getDocument = async () => {
    const docRef = doc(db, "PageDocumentOutput", params?.documentId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const output = docSnap.data()?.output;
      if (Array.isArray(output) && output.length > 0) {
        setDocumentOutput(output);
      } else {
        // Set default content if no document is found
        setDocumentOutput([
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
      }
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getDocument();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  useEffect(() => {
    if (documentOutput.length > 0) {
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
  }, [documentOutput]);

  return (
    <div className="mx-auto mt-6 md:w-full md:-translate-x-4 lg:w-3/5">
      {editor && (
        <BlockNoteView
          editor={editor}
          onChange={async () => {
            const data = await sanitizeBlocks(editor.document);
            await saveDocument(data);
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
