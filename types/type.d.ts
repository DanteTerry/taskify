import { CreateProjectSchema } from "@/lib/validation";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export type DocumentOutput = {
  // Assuming the structure of documentOutput if needed. If unknown, leave it as an empty array.
};

export type WorkspaceData = {
  coverImage: any;
  emoji: string | null;
  documentOutput: DocumentOutput[]; // or any other specific structure if known
  createdBy: string;
  workspaceId: number;
  documentName: string;
  id: string;
};

export type CreateProject = z.infer<typeof CreateProjectSchema>;
