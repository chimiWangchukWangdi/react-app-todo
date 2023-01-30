import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { Store } from "../models/todo";
import reducer from "./slice";

export const store = configureStore<Store>({
  reducer: {
    todo: reducer,
  },
});

export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
