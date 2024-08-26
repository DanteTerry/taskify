import PageDocumentInfo from "@/app/(main)/_components/PageDocumentInfo";
import Editor from "@/app/(main)/_components/Editor";

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
