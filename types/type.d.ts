export type DocumentOutput = {
  // Assuming the structure of documentOutput if needed. If unknown, leave it as an empty array.
};

export type WorkspaceData = {
  coverImage: string | null;
  emoji: string | null;
  documentOutput: DocumentOutput[]; // or any other specific structure if known
  createdBy: string;
  workspaceId: number;
  documentName: string;
  id: string;
};
