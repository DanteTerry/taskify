import { db } from "@/config/firebaseConfig";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { doc, onSnapshot } from "firebase/firestore";

export interface Collaborator {
  id: string;
  fullName: string;
  email: string;
  picture: string;
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
}

// Initial state: Collaborators and output data
const initialState: SprintState = {
  collaborators: [],
  output: [],
};

export const fetchSprintDocumentOutput = createAsyncThunk(
  "sprint/fetchSprintDocumentOutput",
  async (sprintId: string, { dispatch }) => {
    if (!sprintId) throw new Error("Invalid sprintId");

    // Reference to the sprint document
    const docRef = doc(db, "SprintDocumentOutput", sprintId);

    // Listen to real-time updates from Firestore
    const unsubscribe = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          // Dispatch actions to update store
          dispatch(setCollaborators(data.collaborators));
          dispatch(setOutput(data.output));
        } else {
          console.log("No such document!");
        }
      },
      (error) => {
        console.error("Error getting real-time updates:", error);
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
  },
});

// Export the actions and reducer
export const { setCollaborators, setOutput } = sprintSlice.actions;
export default sprintSlice.reducer;
