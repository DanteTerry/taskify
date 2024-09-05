import { createSlice } from "@reduxjs/toolkit";

type ItemType = {
  id: string;
  title: string;
};

type ListType = {
  id: number;
  title: string;
  items: ItemType[];
};

export type BoardSliceType = {
  name: string;
  bgColor: string;
  list: ListType[];
};

const initialState: BoardSliceType = {
  name: "My Board",
  bgColor: "#069000",
  list: [
    {
      id: 1,
      title: "To Do",
      items: [],
    },
    {
      id: 2,
      title: "In progress",
      items: [],
    },
    {
      id: 3,
      title: "Done",
      items: [],
    },
  ],
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBoard: (state, action) => {
      return action.payload;
    },
  },
});

// export the actions
export const { setBoard } = boardSlice.actions;

// Export the reducer
export default boardSlice.reducer;
