import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import sprintSlice from "./sprintSlice"; // Ensure this path is correct

const rootReducer = combineReducers({
  sprint: sprintSlice,
});

// Configure store
const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export default store;
