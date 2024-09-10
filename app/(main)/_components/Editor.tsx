"use client";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { BlockNoteView } from "@blocknote/mantine";
import { uploadFiles } from "@/utils/uploadthing";
import { db } from "@/config/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import { sanitizeBlocks } from "@/utils/blockNoteUtil";
import { BlockNoteEditor, PartialBlock } from "@blocknote/core";

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
    const docRef = doc(db, "PageDocumentOutput", params?.documentId);
    await updateDoc(docRef, { output: document });
  };

  // get document data
  const getDocument = async () => {
    const docRef = doc(db, "PageDocumentOutput", params?.documentId);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  // create blocknote editors
  const editor = useMemo(() => {
    return BlockNoteEditor.create({
      initialContent: documentOutput,
      uploadFile: async (file: File) => {
        const [res] = await uploadFiles("imageUploader", {
          files: [file],
        });

        return res.url;
      },
    });
  }, [documentOutput]);

  return (
    <div className="mx-auto mt-6 -translate-x-4 md:w-full lg:w-3/5">
      <BlockNoteView
        editor={editor}
        onChange={async () => {
          const data = await sanitizeBlocks(editor.document);
          saveDocument(data);
        }}
        formattingToolbar={true}
        theme={"dark"}
        emojiPicker={true}
        tableHandles={true}
      />
    </div>
  );
}

export default Editor;
