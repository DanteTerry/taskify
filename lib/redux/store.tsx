import { combineReducers, configureStore } from "@reduxjs/toolkit";
import boardSlice, { BoardSliceType } from "./boardSlice";
import storage from "redux-persist/lib/storage";
import createFilter from "redux-persist-transform-filter";
import { persistReducer, persistStore } from "redux-persist";

export interface RootState {
  board: BoardSliceType;
}

const DarkModeFilter = createFilter("root", ["darkMode"]);

const rootReducer = combineReducers({
  board: boardSlice,
});

// Define the persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["darkMode"],
  transforms: [DarkModeFilter],
};

// Create a persisted reducer
const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persister = persistStore(store);

// Define AppDispatch type
export type AppDispatch = typeof store.dispatch;
export type AppState = RootState;
