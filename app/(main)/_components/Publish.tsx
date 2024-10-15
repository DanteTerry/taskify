"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { db } from "@/config/firebaseConfig";
import { useOrigin } from "@/hooks/use-origin";
import { DocumentOutput, WorkspaceDocData } from "@/types/type";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { Check, Copy, Globe, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function Publish({
  documentId,
  documentInfo,
}: {
  documentId: string;
  documentInfo: WorkspaceDocData | undefined;
}) {
  const origin = useOrigin();

  const [copied, setCopied] = useState(false);

  const [editorEmail, setEditorEmail] = useState("");
  const [documentOutput, setDocumentOutput] = useState<DocumentOutput>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const url = `${origin}/preview/${documentId}`;

  // getting document output
  useEffect(() => {
    const docRef = doc(db, "PageDocumentOutput", documentId);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setDocumentOutput(data as DocumentOutput);
      } else {
        console.log("No such document!");
      }
    });

    return () => unsubscribe();
  }, [documentId]);

  const onPublish = async () => {
    try {
      setIsSubmitting(true);
      const docRef = doc(db, "WorkSpaceDocuments", documentId);
      const publishPromise = updateDoc(docRef, {
        isPublished: true,
      });

      // Use the promise for the toast
      await toast.promise(publishPromise, {
        loading: "Publishing...",
        success: "Note Published",
        error: "Failed to publish note",
      });

      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  const onUnPublish = async () => {
    try {
      setIsSubmitting(true);
      const docRef = doc(db, "WorkSpaceDocuments", documentId);
      const unpublishPromise = updateDoc(docRef, {
        isPublished: false,
      });

      await toast.promise(unpublishPromise, {
        loading: "Unpublishing...",
        success: "Note Unpublished",
        error: "Failed to unpublish note",
      });

      setIsSubmitting(false);
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  const onCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const updateEditors = async (newEditors: string[], action: string) => {
    try {
      setIsSubmitting(true);
      const docRef = doc(db, "PageDocumentOutput", documentId);
      const updateEditorsPromise = updateDoc(docRef, {
        editors: newEditors,
      });

      await toast.promise(updateEditorsPromise, {
        loading: `${action} editor...`,
        success: `Editor ${action.toLowerCase()}ed`,
        error: `Failed to ${action.toLowerCase()} editor`,
      });

      setIsSubmitting(false);
      setEditorEmail("");
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
    }
  };

  const addEditors = () => {
    const editors = documentOutput?.editors || [];
    const newEditors = [...editors, editorEmail];
    updateEditors(newEditors, "Add");
  };

  const handleRemoveEditor = (editor: string) => {
    if (!documentOutput) return;
    const newEditors = documentOutput.editors.filter((e) => e !== editor);
    updateEditors(newEditors, "Remove");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"secondary"}>
          {documentInfo?.isPublished ? (
            <Globe className="h-4 w-4 text-sky-500" />
          ) : (
            "Publish"
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-full md:w-72"
        align="end"
        alignOffset={8}
        forceMount
      >
        {documentInfo?.isPublished ? (
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <Globe className="h-4 w-4 animate-pulse text-sky-500" />
              <p className="text-sky-500- text-xs font-medium">
                This note is live on web
              </p>
            </div>
            <div className="flex items-center">
              <input
                className="h-8 flex-1 truncate rounded-l-md border bg-muted px-2 text-xs"
                value={url}
                disabled
              />

              <Button onClick={onCopy} className="h-8 rounded-l-none">
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>

            <div className="mt-4">
              <p className="text-sm font-medium">Permissions</p>
              <div className="mt-2 flex items-center">
                <input
                  value={editorEmail}
                  onChange={(e) => setEditorEmail(e.target.value)}
                  type="email"
                  placeholder="Enter email"
                  className="h-8 flex-1 rounded-l-md border bg-muted px-2 text-xs"
                />
                <Button onClick={addEditors} className="h-8 rounded-l-none">
                  Add
                </Button>
              </div>
              <div className="mt-2">
                <p className="text-xs text-muted-foreground">
                  Manage who can edit this document
                </p>
              </div>
              <div className="mt-2 space-y-2">
                {documentOutput?.editors?.map((editor, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded-md bg-gray-100 p-2 dark:bg-[#262626]"
                  >
                    <span className="text-xs font-medium text-gray-700 dark:text-white">
                      {editor}
                    </span>
                    <button
                      className="duration-300hover:bg-red-100 transition-all"
                      onClick={() => handleRemoveEditor(editor)}
                    >
                      <Trash2 className="h-4 w-4 text-red-400 hover:text-red-500" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <Button
              className="w-full text-sm"
              size={"sm"}
              disabled={isSubmitting}
              onClick={onUnPublish}
            >
              Unpublish
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <Globe className="mb-2 h-8 w-8 text-muted-foreground" />
            <p className="mb-2 text-sm font-medium">Publish this note</p>
            <span className="mb-4 text-sm text-muted-foreground">
              Share your work with others
            </span>

            <Button
              disabled={isSubmitting}
              onClick={onPublish}
              className="w-full text-xs"
              size={"sm"}
            >
              Publish
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
export default Publish;
