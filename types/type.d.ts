import { AddCardSchema, CreateProjectSchema } from "@/lib/validation";
import { InlineContent, PartialBlock, TableContent } from "@blocknote/core";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { z } from "zod";

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

export type AddCardTpe = z.infer<typeof AddCardSchema>;

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
  type?: "paragraph" | "image" | "table" | string;
  props?: Partial<Record<string, any>>;
  content?: string | InlineContent[] | TableContent;
  children?: BlockType[];
};

export type listType = {
  id: string;
  title: string;
  items: ItemType[];
};
