"use client";
import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { AlertTriangle, Loader } from "lucide-react"; // Optional icon for error states
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import PreviewDocumentInfo from "../../_components/PreviewDocumentInfo";
import { WorkspaceDocData } from "@/types/type";

// Dynamically import the editor
function DocumentPreviewPage({
  params,
}: {
  params: {
    workspaceId: string;
    documentId: string;
  };
}) {
  const Editor = useMemo(
    () =>
      dynamic(() => import("@/app/(main)/_components/Editor"), {
        ssr: false,
      }),
    [],
  );

  const [emojiIcon, setEmojiIcon] = useState("");
  const [documentInfo, setDocumentInfo] = useState<
    WorkspaceDocData | undefined
  >();
  const [selectedCover, setSelectedCover] = useState("");
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    if (params.documentId) {
      getDocumentInfo();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.documentId]);

  const getDocumentInfo = async () => {
    try {
      const docRef = doc(db, "WorkSpaceDocuments", params.documentId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setDocumentInfo(docSnap.data() as WorkspaceDocData);
        setEmojiIcon(docSnap.data()?.emoji);
        docSnap.data()?.coverImage &&
          setSelectedCover(docSnap.data()?.coverImage);
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    } finally {
      setLoading(false); // Stop loading once data is fetched
    }
  };

  // Show a loading state while fetching data
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-100 dark:bg-[#1F1F1F]">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          {/* Add a circular loader with a smooth animation */}
          <Loader className="h-16 w-16 animate-spin rounded-full" />

          {/* Loading text with a subtle fading animation */}
          <p className="animate-pulse text-lg font-semibold text-gray-700 dark:text-gray-300">
            Loading document, please wait...
          </p>
        </div>
      </div>
    );
  }

  // Handle the case where the document is unpublished or doesn't exist
  if (!documentInfo?.isPublished) {
    return (
      <div className="flex h-full w-full items-center justify-center p-10">
        <div className="flex flex-col items-center justify-center text-center">
          <AlertTriangle size={60} className="mb-4 text-gray-500" />
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
            Document Unavailable
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            This document is either unpublished or does not exist.
          </p>
          <Button
            onClick={() => window.history.back()}
            className="mt-6 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none"
          >
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section className="flex h-full w-full flex-col md:pt-0">
      <div className="flex w-full flex-grow flex-col">
        <ScrollArea className="flex h-[calc(100vh)] w-full overflow-auto dark:bg-[#1F1F1F]">
          <div className="pb-4">
            <PreviewDocumentInfo
              params={params}
              emojiIcon={emojiIcon}
              documentInfo={documentInfo}
              selectedCover={selectedCover}
            />
            <Editor params={params} editable={false} />
          </div>
        </ScrollArea>
      </div>
    </section>
  );
}

export default DocumentPreviewPage;