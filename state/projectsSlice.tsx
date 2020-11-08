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
    create_project_modal_visible: false,
    delete_project_modal_visible: false,
    delete_project_model: null,
    update_project_modal_visible: false,
    update_project_model: { id: -1, title: "", description: "" },
  },
  reducers: {
    toggle_project_modal_visibility(state, action) {
      state.create_project_modal_visible = !state.create_project_modal_visible;
      return state;
    },
    set_project_modal_visibility(
      state,
      action: { type: string; payload: boolean }
    ) {
      state.create_project_modal_visible = action.payload;
      return state;
    },
    set_delete_project_modal_visibility(
      state,
      action: { type: string; payload: boolean }
    ) {
      state.delete_project_modal_visible = action.payload;
      return state;
    },
    set_delete_project_model(
      state,
      action: { type: string; payload: Project }
    ) {
      state.delete_project_model = action.payload;
      return state;
    },
    set_update_project_modal_visibility(
      state,
      action: { type: string; payload: boolean }
    ) {
      state.update_project_modal_visible = action.payload;
      return state;
    },
    set_update_project_model(
      state,
      action: { type: string; payload: Project }
    ) {
      state.update_project_model = action.payload;
      return state;
    },
  },
  extraReducers: {
    [get_projects.fulfilled as any]: (
      state,
      action: { type: string; payload: Projects }
    ) => {
      state.projects = action.payload as Array<Project>;
    },
    [create_project.fulfilled as any]: (
      state,
      action: { type: string; payload: Project }
    ) => {
      state.projects.push(action.payload);
    },
    [put_project.fulfilled as any]: (
      state,
      action: { type: string; payload: Project }
    ) => {
      let project_position = state.projects.findIndex(
        (project) => project.id == action.payload.id
      );
      state.projects[project_position] = action.payload;
      return state;
    },
    [delete_project.fulfilled as any]: (
      state,
      action: { type: string; payload: Project }
    ) => {
      const pos = state.projects.findIndex(
        (project) => project.id != action.payload.id
      );
      state.projects.splice(pos, 1);
      return state;
    },
  },
});
export const {
  toggle_project_modal_visibility,
  set_project_modal_visibility,
  set_delete_project_modal_visibility,
  set_delete_project_model,
  set_update_project_modal_visibility,
  set_update_project_model,
} = projectsSlice.actions;
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
