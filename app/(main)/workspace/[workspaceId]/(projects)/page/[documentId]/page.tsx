"use client";
import PageDocumentInfo from "@/app/(main)/_components/PageDocumentInfo";
import { ScrollArea } from "@/components/ui/scroll-area";
import dynamic from "next/dynamic";
import { useMemo } from "react";

function DocumentPage({
  params,
}: {
  params: {
    workspaceId: string;
    documentId: string;
  };
}) {
  // Dynamically import the editor
  const Editor = useMemo(
    () =>
      dynamic(() => import("@/app/(main)/_components/Editor"), {
        ssr: false,
      }),
    [],
  );

  return (
    <section className="flex h-full w-full flex-col md:pt-0">
      <div className="flex w-full flex-grow flex-col">
        {" "}
        {/* Adjust for Top and Side Navigation */}
        <ScrollArea className="flex h-full w-full dark:bg-[#1F1F1F]">
          <PageDocumentInfo params={params} />
          {/* Rich text editor */}
          <Editor params={params} />
        </ScrollArea>
      </div>
    </section>
  );
}
export default DocumentPage;
