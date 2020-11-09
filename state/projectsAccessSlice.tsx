import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { axios_instance, get_csrf_token } from "../utils/axios";

export const get_all_access = createAsyncThunk(
  "projectaccess/get_all_access",
  async (payload, { rejectWithValue }) => {
    try {
      // Get all tasks
      const response = await axios_instance.get("/project-access");
      return response.data;
    } catch (e) {
      // Return error
      const error: AxiosError = e;
      return rejectWithValue(error.response.data);
    } finally {
    }
  }
);

export const create_access = createAsyncThunk(
  "projectaccess/create_access",
  async (payload: CreateAccessPayload, { rejectWithValue }) => {
    try {
      const csrfToken = await get_csrf_token();
      // Create the access
      const response = await axios_instance.post("/project-access", payload, {
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

export const delete_access = createAsyncThunk(
  "projectaccess/delete_access",
  async (payload: DeleteAccessPayload, { rejectWithValue }) => {
    try {
      const csrfToken = await get_csrf_token();
      // DELETE the task
      const response = await axios_instance.delete(
        `/project-access/${payload.id}`,
        {
          headers: { "X-CSRFToken": csrfToken },
        }
      );
      return payload;
    } catch (e) {
      // Return error
      const error: AxiosError = e;
      return rejectWithValue(error.response.data);
    } finally {
    }
  }
);

export const update_access = createAsyncThunk(
  "projectaccess/update_access",
  async (payload: Access, { rejectWithValue }) => {
    try {
      const csrfToken = await get_csrf_token();
      // Extract ID and data
      const { id, ...access_data } = payload;
      // PUT the task data
      const response = await axios_instance.put(
        `/project-access/${id}`,
        access_data,
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
export const projectsAccessSlice = createSlice({
  name: "projectaccess",
  initialState: {
    all_access: Array<Access>(),
    loading: false,
    loading_create: false,
    loading_put: false,
    loading_delete: false,
    loading_update: false,
  },
  reducers: {
    set_loading(state, action: { type: string; payload: boolean }) {
      state.loading = action.payload;
    },
  },
  extraReducers: {
    // Get section
    [get_all_access.fulfilled as any]: (
      state,
      action: { type: string; payload: Access[] }
    ) => {
      state.all_access = action.payload;
      state.loading = false;
    },
    [get_all_access.pending as any]: (state, action) => {
      state.loading = true;
    },
    [get_all_access.rejected as any]: (state, action) => {
      state.loading = false;
    },
    // Create section
    [create_access.pending as any]: (state, action) => {
      state.loading_create = true;
    },
    [create_access.fulfilled as any]: (
      state,
      action: { type: string; payload: Access }
    ) => {
      state.loading_create = false;
      state.all_access.push(action.payload);
    },
    [create_access.rejected as any]: (state, action) => {
      state.loading_create = false;
    },
    // Delete section
    [delete_access.pending as any]: (state, action) => {
      state.loading_delete = true;
    },
    [delete_access.fulfilled as any]: (
      state,
      action: { type: string; payload: DeleteAccessPayload }
    ) => {
      state.loading_delete = false;
      // Find position in state
      const pos = state.all_access.findIndex(
        (access) => access.id == action.payload.id
      );
      // Remove the access from the state
      state.all_access.splice(pos, 1);
    },
    [delete_access.rejected as any]: (state, action) => {
      state.loading_delete = false;
    },
    // Put section
    [update_access.pending as any]: (state, action) => {
      state.loading_update = true;
    },
    [update_access.fulfilled as any]: (
      state,
      action: { type: string; payload: Access }
    ) => {
      state.loading_update = false;
      // Find position in state
      const pos = state.all_access.findIndex(
        (access) => access.id == action.payload.id
      );
      // Update the access
      state.all_access[pos] = action.payload;
    },
    [update_access.rejected as any]: (state, action) => {
      state.loading_update = false;
    },
  },
});

export const { set_loading } = projectsAccessSlice.actions;

export default projectsAccessSlice.reducer;

// --- Types ---
export declare interface Access {
  id: number;
  project: number;
  user: string;
  membership_level: MembershipLevel;
}
export enum MembershipLevel{
  OWNER = 1,
  MEMBER = 2,
}

export type CreateAccessPayload = Omit<Access, "id">;
export type DeleteAccessPayload = Pick<Access, "id">;

