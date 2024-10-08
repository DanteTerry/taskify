import { db } from "@/config/firebaseConfig";
import { issueDataType } from "@/types/type";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, onSnapshot } from "firebase/firestore";

export interface SprintState {
  collaborators: {
    id: string;
    fullName: string;
    email: string;
    picture: string;
  }[];
  output: {
    id: string;
    status: string;
    items: issueDataType[];
  }[];
}

// Initial state: Collaborators and output data
const initialState = {
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
          // Dispatch actions to update store
          dispatch(setCollaborators(docSnap.data().collaborators));
          dispatch(setOutput(docSnap.data().output));
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
    setCollaborators: (state, action) => {
      state.collaborators = action.payload;
    },
    // Update sprint output data in state
    setOutput: (state, action) => {
      state.output = action.payload;
    },
  },
});

// Export the actions and reducer
export const { setCollaborators, setOutput } = sprintSlice.actions;
export default sprintSlice.reducer;
