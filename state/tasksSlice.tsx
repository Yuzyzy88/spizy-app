import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { axios_instance, get_csrf_token } from "../utils/axios";

export const get_tasks = createAsyncThunk(
  "tasks/get_tasks",
  async (payload, { rejectWithValue }) => {
    try {
      // Get all tasks
      const response = await axios_instance.get("/tasks");
      return response.data;
    } catch (e) {
      // Return error
      const error: AxiosError = e;
      return rejectWithValue(error.response.data);
    } finally {
    }
  }
);

export const create_task = createAsyncThunk(
  "tasks/create_tasks",
  async (payload: TaskCreateData, { rejectWithValue }) => {
    try {
      const csrfToken = await get_csrf_token();
      // Create teh task
      const response = await axios_instance.post("/tasks", payload, {
        headers: { "X-CSRFToken": csrfToken },
      });
      return response.data;
    } catch (e) {
      // Return error
      const error: AxiosError = e;
      return rejectWithValue(error.response.data);
    } finally {
    }
  }
);
export const put_task = createAsyncThunk(
  "tasks/put_tasks",
  async (payload: TaskPutPayload, { rejectWithValue }) => {
    try {
      const csrfToken = await get_csrf_token();
      // Extract ID and data
      const { id, ...task_data } = payload;
      // PUT the task data
      const response = await axios_instance.put(`/task/${id}`, task_data, {
        headers: { "X-CSRFToken": csrfToken },
      });
      return response.data;
    } catch (e) {
      // Return error
      const error: AxiosError = e;
      return rejectWithValue(error.response.data);
    } finally {
    }
  }
);

export const delete_task = createAsyncThunk(
  "tasks/delete_tasks",
  async (payload: TaskDeletePayload, { rejectWithValue }) => {
    try {
      const csrfToken = await get_csrf_token();
      // DELETE the task
      const response = await axios_instance.delete(`/task/${payload.id}`, {
        headers: { "X-CSRFToken": csrfToken },
      });
      return payload;
    } catch (e) {
      // Return error
      const error: AxiosError = e;
      return rejectWithValue(error.response.data);
    } finally {
    }
  }
);
export const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: Array<Task>(),
  },
  reducers: {},
  extraReducers: {
    [get_tasks.fulfilled as any]: (
      state,
      action: { type: string; payload: Tasks }
    ) => {
      state.tasks = action.payload as any;
      console.log(state.tasks);
    },
    [create_task.fulfilled as any]: (
      state,
      action: { type: string; payload: Task }
    ) => {
      state.tasks.push(action.payload);
    },
    [put_task.fulfilled as any]: (
      state,
      action: { type: string; payload: TaskPutPayload }
    ) => {
      // Find the task in the state
      const pos = state.tasks.findIndex((task) => task.id == action.payload.id);
      // Update Task
      state.tasks[pos] = action.payload;
    },
    [delete_task.fulfilled as any]: (
      state,
      action: { type: string; payload: TaskDeletePayload }
    ) => {
      // Find the task in the state
      const pos = state.tasks.findIndex((task) => task.id == action.payload.id);
      // Remove the task
      state.tasks.splice(pos, 1);
    },
  },
});

export default tasksSlice.reducer;

// --- Types ---
export declare interface Task {
  id: number;
  title: string;
  description: string;
  project: number;
  owner: string;
  progress: number;
  due_date: string;
}
export declare interface Tasks {
  [index: number]: Task;
}

export type TaskCreateData = Pick<Task, "title" | "description" | "project" | "progress">;

export type TaskPutPayload = Task;

export type TaskDeletePayload = Pick<Task, "id">;
