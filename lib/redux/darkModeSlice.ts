import { createSlice } from "@reduxjs/toolkit";

export interface DarkModeState {
  darkMode: boolean;
}

const initialState: DarkModeState = {
  darkMode: false,
};

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState,
  reducers: {
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
  },
});

export const { setDarkMode } = darkModeSlice.actions;

export default darkModeSlice.reducer;
