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
  "tasks/get_tasks",
  async (payload: TaskData, { rejectWithValue }) => {
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
  "tasks/get_tasks",
  async (payload: TaskPutPayload, { rejectWithValue }) => {
    try {
      const csrfToken = await get_csrf_token();
      // PUT the task data
      const response = await axios_instance.put(
        `/task/${payload.id}`,
        payload.task_data,
        {
          headers: { "X-CSRFToken": csrfToken },
        }
      );
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
  "tasks/get_tasks",
  async (payload: TaskDeletePayload, { rejectWithValue }) => {
    try {
      const csrfToken = await get_csrf_token();
      // DELETE the task
      const response = await axios_instance.delete(`/task/${payload.id}`, {
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
      state.tasks = action.payload as Array<Task>;
    },
    [create_task.fulfilled as any]: (state, action) => {
      console.log(action);
    },
    [put_task.fulfilled as any]: (state, action) => {
      console.log(action);
    },
    [delete_task.fulfilled as any]: (state, action) => {
      console.log(action);
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
}
export declare interface Tasks {
  [index: number]: Task;
}
export declare interface TaskData {
  title: string;
  description: string;
  project: number;
}
export declare interface TaskCreateData {
  title: string;
  description: string;
  project: number;
}

export declare interface TaskPutPayload {
  id: number;
  task_data: TaskData;
}

export declare interface TaskDeletePayload {
  id: number;
}
