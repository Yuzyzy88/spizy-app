import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import rootReducer from "./reducers";

export const store = configureStore({ reducer: rootReducer });

export const useThunkDispatch = () => useDispatch<typeof store.dispatch>();