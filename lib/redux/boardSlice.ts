import { createSlice } from "@reduxjs/toolkit";

export type PriorityType = {
  color: string;
  priority: string;
};

export type ItemType = {
  id: string;
  title: string;
  description: string;
  priority: PriorityType;
  deadLine: string | undefined;
};

export type BoardSliceType = {
  id: number;
  title: string;
  items: ItemType[];
}[];

const initialState: BoardSliceType = [];

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBoard: (state, action) => {
      return action.payload;
    },
    createNewList: (state, action) => {
      state.push(action.payload);
    },
  },
});

// export the actions
export const { setBoard, createNewList } = boardSlice.actions;

// Export the reducer
export default boardSlice.reducer;
