import { createSlice } from "@reduxjs/toolkit";

export interface BoardSliceType {}

const initialState: BoardSliceType = {
  boards: [
    {
      name: "My Board",
      bgColor: "#069000",
      list: [
        {
          id: 1,
          title: "To Do",
          items: [
            {
              id: "cdFft",
              title: "Project description one ",
            },
          ],
        },
        {
          id: 2,
          title: "In progress",
          items: [
            {
              id: "cdFfft",
              title: "Project description Two ",
            },
          ],
        },
        {
          id: 3,
          title: "Done",
          items: [
            {
              id: "cdFaft",
              title: "Project description three ",
            },
          ],
        },
      ],
    },
  ],
};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {},
});

// export the actions
export const {} = boardSlice.actions;

// Export the reducer
export default boardSlice.reducer;
