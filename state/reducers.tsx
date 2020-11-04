import { combineReducers } from "@reduxjs/toolkit";
import userReducers from "./userSlice";
import projectsReducers from "./projectsSlice";
import tasksReducers from "./tasksSlice";

const rootReducer = combineReducers({
  user: userReducers,
  projects: projectsReducers,
  tasks: tasksReducers,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
