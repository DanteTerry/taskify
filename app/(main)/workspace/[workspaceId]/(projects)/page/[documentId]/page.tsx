"use client";
import GenerateWithAi from "@/app/(main)/_components/GenerateWithAi";
import PageDocumentInfo from "@/app/(main)/_components/PageDocumentInfo";
import { Popover, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PartialBlock } from "@blocknote/core";
import { PopoverContent } from "@radix-ui/react-popover";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";

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

  const [documentOutput, setDocumentOutput] = useState<PartialBlock[]>([]);
  console.log(documentOutput);
  return (
    <section className="flex h-full w-full flex-col md:pt-0">
      <div className="flex w-full flex-grow flex-col">
        <ScrollArea className="relative flex h-[calc(100vh-60px)] w-full overflow-auto dark:bg-[#1F1F1F]">
          <div className="pb-4">
            {" "}
            {/* Add padding-bottom to prevent text cutoff */}
            <PageDocumentInfo params={params} />
            <Editor
              params={params}
              setDocumentOutput={setDocumentOutput}
              documentOutput={documentOutput}
              editable={true}
            />
          </div>
          <GenerateWithAi setDocumentOutput={setDocumentOutput} />
        </ScrollArea>
      </div>
    </section>
  );
}
export default DocumentPage;
