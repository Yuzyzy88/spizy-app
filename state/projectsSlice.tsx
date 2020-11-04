import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { axios_instance, get_csrf_token } from "../utils/axios";

export const get_projects = createAsyncThunk(
  "projects/get_projects",
  async (_payload, { rejectWithValue }) => {
    try {
      // Get projects
      const response = await axios_instance.get("/projects");
      return response.data;
    } catch (e) {
      // Return error
      const error: AxiosError = e;
      return rejectWithValue(error.response.data);
    } finally {
    }
  }
);

export const create_project = createAsyncThunk(
  "projects/create_project",
  async (payload: ProjectDataPayload, { dispatch, rejectWithValue }) => {
    try {
      const csrfToken = await get_csrf_token();
      // Get projects
      const response_data: Projects = await (
        await axios_instance.post("/projects", payload, {
          headers: { "X-CSRFToken": csrfToken },
        })
      ).data;
      return response_data;
    } catch (e) {
      // Return error
      const error: AxiosError = e;
      return rejectWithValue(error.response.data);
    } finally {
    }
  }
);

export const put_project = createAsyncThunk(
  "projects/put_project",
  async (payload: ProjectPutPayload, { rejectWithValue }) => {
    try {
      const csrfToken = await get_csrf_token();
      // Get projects
      const response = await axios_instance.put(
        `/project/${payload.id}`,
        payload.project_data,
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

export const delete_project = createAsyncThunk(
  "projects/delete_project",
  async (payload: ProjectDeletePayload, { rejectWithValue }) => {
    try {
      const csrfToken = await get_csrf_token();
      // Get projects
      const response = await axios_instance.delete(`/project/${payload.id}`, {
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

export const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    projects: Array<Project>(),
  },
  reducers: {},
  extraReducers: {
    [get_projects.fulfilled as any]: (
      state,
      action: { type: string; payload: Projects }
    ) => {
      state.projects = action.payload as Array<Project>;
      console.log("state");
      console.log(state);
    },
    [create_project.fulfilled as any]: (state, action) => {
      console.log(action);
    },
    [put_project.fulfilled as any]: (state, action) => {
      console.log(action);
    },
    [delete_project.fulfilled as any]: (state, action) => {
      console.log(action);
    },
  },
});

export default projectsSlice.reducer;

// --- Types ---

export declare interface Project {
  id: number;
  title: string;
  description: string;
}
export declare interface Projects {
  [index: number]: Project;
}
export declare interface ProjectDataPayload {
  title: string;
  description: string;
}
export declare interface ProjectPutPayload {
  id: number;
  project_data: ProjectDataPayload;
}
export declare interface ProjectDeletePayload {
  id: number;
}
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
export declare interface TaskCreateData {
  title: string;
  description: string;
  project: number;
}
