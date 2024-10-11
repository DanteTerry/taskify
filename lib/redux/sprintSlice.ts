import { db } from "@/config/firebaseConfig";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { doc, onSnapshot } from "firebase/firestore";

export interface Collaborator {
  id: string;
  fullName: string;
  email: string;
  picture: string;
  role: "owner" | "collaborator" | "viewer";
}

interface issueDataType {
  description: string;
  issueType: string;
  shortSummary: string;
  reporter: Collaborator;
  assignees: Collaborator[];
  priority: string;
  comments: string[];
  status: "backlog" | "selected for development" | "in progress" | "done";
  id: string;
}

export interface SprintOutput {
  id: string;
  status: string;
  items: issueDataType[];
}

export interface SprintState {
  collaborators: Collaborator[];
  output: SprintOutput[];
  joinCode: string;
  docId: string;
  documentInfo: DocumentInfoType;
  loading: boolean; // Add loading state
}

export interface DocumentInfoType {
  coverImage: string;
  createdBy: {
    id: string;
    fullName: string;
    email: string;
    picture: string;
  };
  documentName: string;
  documentOutput: SprintOutput[];
  emoji: string;
  id: string;
  isPublished: boolean;
  projectType: string;
  workspaceId: string;
}

// Initial state: Collaborators and output data
const initialState: SprintState = {
  collaborators: [],
  output: [],
  joinCode: "",
  docId: "",
  documentInfo: {
    coverImage: "",
    createdBy: {
      id: "",
      fullName: "",
      email: "",
      picture: "",
    },
    documentName: "",
    documentOutput: [],
    emoji: "",
    id: "",
    isPublished: false,
    projectType: "sprint",
    workspaceId: "",
  },
  loading: true,
};

export const fetchSprintDocumentOutput = createAsyncThunk(
  "sprint/fetchSprintDocumentOutput",
  async (sprintId: string, { dispatch }) => {
    if (!sprintId) throw new Error("Invalid sprintId");

    // Reference to the sprint document
    const docRef = doc(db, "SprintDocumentOutput", sprintId);

    // Set loading state to true
    dispatch(setLoading(true));

    // Listen to real-time updates from Firestore
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          // Dispatch actions to update store
          dispatch(setCollaborators(data.collaborators));
          dispatch(setOutput(data.output));
          dispatch(setJoinCode(data.joinCode));
        } else {
          console.log("No such document!");
        }
        // Set loading state to false
        dispatch(setLoading(false));
      },
      (error) => {
        console.error("Error getting real-time updates:", error);
        // Set loading state to false
        dispatch(setLoading(false));
      },
    );
  },
);

export const fetchDocumentInfo = createAsyncThunk(
  "sprint/fetchDocumentInfo",
  async (docId: string, { dispatch }) => {
    if (!docId) throw new Error("Invalid docId");

    // Reference to the sprint document
    const docRef = doc(db, "WorkSpaceDocuments", docId);

    // Set loading state to true
    dispatch(setLoading(true));

    // Listen to real-time updates from Firestore
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          // Dispatch actions to update store
          dispatch(setDocumentInfo(data as DocumentInfoType));
        } else {
          console.log("No such document!");
        }
        // Set loading state to false
        dispatch(setLoading(false));
      },
      (error) => {
        console.error("Error getting real-time updates:", error);
        // Set loading state to false
        dispatch(setLoading(false));
      },
    );
  },
);

// Slice with reducers to update the state
const sprintSlice = createSlice({
  name: "sprint",
  initialState,
  reducers: {
    // Update collaborators in state
    setCollaborators: (state, action: PayloadAction<Collaborator[]>) => {
      state.collaborators = action.payload;
    },
    // Update sprint output data in state
    setOutput: (state, action: PayloadAction<SprintOutput[]>) => {
      state.output = action.payload;
    },
    setJoinCode: (state, action: PayloadAction<string>) => {
      state.joinCode = action.payload;
    },
    setDocumentInfo: (state, action: PayloadAction<DocumentInfoType>) => {
      state.documentInfo = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

// Export the actions and reducer
export const {
  setCollaborators,
  setOutput,
  setJoinCode,
  setDocumentInfo,
  setLoading,
} = sprintSlice.actions;
export default sprintSlice.reducer;
