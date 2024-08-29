"use client";
import PageDocumentInfo from "@/app/(main)/_components/PageDocumentInfo";
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
  const Editor = useMemo(
    () =>
      dynamic(() => import("@/app/(main)/_components/Editor"), {
        ssr: false,
      }),
    [],
  );
  return (
    <div className="w-full dark:bg-[#1F1F1F]">
      <PageDocumentInfo params={params} />

      {/*  Rich text editor */}
      <Editor params={params} />
    </div>
  );
}
export default DocumentPage;
