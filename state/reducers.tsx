import { combineReducers } from "@reduxjs/toolkit";
import userReducers from "./userSlice";
import projectsReducers from "./projectsSlice";
import tasksReducers from "./tasksSlice";
import accessReducers from "./projectsAccessSlice";

const rootReducer = combineReducers({
  user: userReducers,
  projects: projectsReducers,
  tasks: tasksReducers,
  access: accessReducers 
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
