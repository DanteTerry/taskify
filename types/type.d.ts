import { CreateProjectSchema } from "@/lib/validation";
import { InlineContent, PartialBlock, TableContent } from "@blocknote/core";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export type DocumentOutput = {
  // Assuming the structure of documentOutput if needed. If unknown, leave it as an empty array.
};

export type WorkspaceDocData = {
  coverImage: string;
  emoji: string | null;
  documentOutput: DocumentOutput[]; // or any other specific structure if known
  createdBy: string;
  workspaceId: number;
  documentName: string;
  id: string;
  projectType: string;
};

export type CreateProject = z.infer<typeof CreateProjectSchema>;

export interface WorkspaceData {
  workspaceName: string;
  createdBy: string;
  coverImage: string;
  orgId: string;
  emoji: string;
  id: number;
}

export type BlockType = {
  id?: string;
  type?: "paragraph" | "image" | "table" | string; // Specify known types or use a union of known types
  props?: Partial<Record<string, any>>; // Exact type depends on "type"
  content?: string | InlineContent[] | TableContent;
  children?: BlockType[]; // Use BlockType to ensure consistency
};
