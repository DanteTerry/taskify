"use client";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { BlockNoteView } from "@blocknote/mantine";
import { uploadFiles } from "@/utils/uploadthing";
import { db } from "@/config/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { sanitizeImageBlocks } from "@/utils/blockNoteUtil";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";

function Editor({
  params,
  editable,
  documentOutput,
  setDocumentOutput,
  setEditors,
}: {
  params: {
    workspaceId: string;
    documentId: string;
  };
  setEditors?: Dispatch<SetStateAction<string[]>>;
  editable: boolean;
  setDocumentOutput: Dispatch<SetStateAction<PartialBlock[]>>;
  documentOutput: PartialBlock[];
}) {
  const [editor, setEditor] = useState<BlockNoteEditor | null>(null);

  const saveDocument = async (document: PartialBlock[]) => {
    const docRef = doc(db, "PageDocumentOutput", params?.documentId);
    await updateDoc(docRef, { output: document });
  };

  const getDocument = async () => {
    const docRef = doc(db, "PageDocumentOutput", params?.documentId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setEditors && setEditors(docSnap.data()?.editors);
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

  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);

  useEffect(() => {
    getDocument();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  useEffect(() => {
    if (documentOutput?.length > 0) {
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
            const data = await sanitizeImageBlocks(editor.document);
            await saveDocument(data);
          }}
          style={{
            width: "100%",
          }}
          formattingToolbar={true}
          theme={darkMode ? "dark" : "light"}
          emojiPicker={true}
          tableHandles={true}
          editable={editable}
        />
      )}
    </div>
  );
}

export default Editor;
