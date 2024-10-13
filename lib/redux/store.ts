import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import sprintSlice from "./sprintSlice"; 
import darkModeSlice from "./darkModeSlice";

const rootReducer = combineReducers({
  sprint: sprintSlice,
  darkMode: darkModeSlice,
});

// Configure store
const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export default store;
