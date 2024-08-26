import PageDocumentInfo from "@/app/(main)/_components/PageDocumentInfo";
import dynamic from "next/dynamic";

export const Editor = dynamic(() => import("@/app/(main)/_components/Editor"), {
  ssr: false,
});

function DocumentPage({
  params,
}: {
  params: {
    workspaceId: string;
    documentId: string;
  };
}) {
  return (
    <div className="h-full w-full dark:bg-[#1F1F1F]">
      <PageDocumentInfo params={params} />

      {/*  Rich text editor */}
      <Editor params={params} />
    </div>
  );
}
export default DocumentPage;
