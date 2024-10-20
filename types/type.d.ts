import { Collaborator } from "@/app/(main)/_components/CreateIssue";
import { AddCardSchema, CreateProjectSchema } from "@/lib/validation";
import { InlineContent, PartialBlock, TableContent } from "@blocknote/core";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { z } from "zod";

export type DocumentOutput = {
  id: string;
  output: [];
  workspaceId: string;
  editors: [];
};

export type WorkspaceDocData = {
  coverImage: string;
  emoji: string | null;
  createdBy: string;
  workspaceId: number;
  documentName: string;
  id: string;
  projectType: string;
  isPublished: boolean;
  teamProject: boolean;
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
  status?: "backlog" | "selected for development" | "in progress" | "done";
};

// sprint project types
export interface issueDataType {
  id: string;
  description: string;
  issueType: string;
  shortSummary: string;
  reporter: Collaborator;
  assignees: Collaborator[];
  priority: string;
  comments: {
    id: string;
    comment: string;
    user: {
      id: string;
      fullName: string;
      picture: string;
      email: string;
    };
  }[];
  status: "backlog" | "selected for development" | "in progress" | "done";
  estimatedTime: number;
  deadLine: Date;
  loggedTime: number;
  remainingTime: number;
  createdAt: Date;
}

export interface issueType {
  id: string;
  items: issueDataType[];
  status: "backlog" | "selected for development" | "in progress" | "done";
}

// board
export type ItemType = {
  id: string;
  title: string;
  description: string;
  priority: PriorityType;
  deadLine: string | undefined;
};

// priority type
export interface PriorityType {
  color: string;
  priority: string;
}

export interface CommentType {
  id: string;
  comment: string;
  createdAt: Date;
  user: {
    id: string;
    fullName: string;
    picture: string;
    email: string;
  };
}
