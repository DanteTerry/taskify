import PageDocumentInfo from "@/app/(main)/_components/PageDocumentInfo";

function DocumentPage({ params }) {
  return (
    <div className="h-full">
      <PageDocumentInfo params={params} />

      {/*  Rich text editor */}
    </div>
  );
}
export default DocumentPage;
