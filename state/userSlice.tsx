import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import { axios_instance } from "../utils/axios";

export const signup_user = createAsyncThunk(
  "user/signup_user",
  async (payload: SignUpPayload, { dispatch, rejectWithValue }) => {
    // Set state to loading
    dispatch(set_signup_loading({ signup_loading: true }));

    try {
      // Try creating the account
      const response = await axios_instance.post("/signup", payload);
      return response.data;
    } catch (e) {
      // Return error
      const error: AxiosError = e;
      return rejectWithValue(error.response.data);
    } finally {
      // Set loading to done
      dispatch(set_signup_loading({ signup_loading: false }));
    }
  }
);

export const login_user = createAsyncThunk(
  "user/login_user",
  async (payload: LoginPayload, { dispatch, rejectWithValue }) => {
    try {
      const csrfToken = await (await axios_instance.get("/csrftoken")).data.token;
      // Try logging
      const response = await axios_instance.post("/login", payload, {
        headers: { "X-CSRFToken": csrfToken },
      });
      return response.data;
    } catch (e) {
      // Return error
      const error: AxiosError = e;
      return rejectWithValue(error.response.data);
    } finally {
      // Set loading to done
    }
  }
);

export const logout_user = createAsyncThunk(
  "user/logout_user",
  async (payload, { dispatch, rejectWithValue }) => {
    // Get CSRF Token
    const csrfToken = await (await axios_instance.get("/csrftoken")).data.token;

    // Logout
    axios_instance.post("/logout", undefined, {
      headers: { "X-CSRFToken": csrfToken },
    });

    // Update state
    dispatch(set_logged_in({ logged_in: false }));
    dispatch(set_username({ username: "" }));
    dispatch(set_first_name({ first_name: "" }));
    dispatch(set_last_name({ last_name: "" }));
  }
);
export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    first_name: "",
    last_name: "",
    logged_in: false,
    signup_loading: false,
  },
  reducers: {
    logout_user(state, action: LogoutAction) {},
    set_username(
      state,
      action: { type: string; payload: { username: string } }
    ) {
      state.username = action.payload.username;
    },
    set_first_name(
      state,
      action: { type: string; payload: { first_name: string } }
    ) {
      state.first_name = action.payload.first_name;
    },
    set_last_name(
      state,
      action: { type: string; payload: { last_name: string } }
    ) {
      state.last_name = action.payload.last_name;
    },
    set_logged_in(
      state,
      action: { type: string; payload: { logged_in: boolean } }
    ) {
      state.logged_in = action.payload.logged_in;
    },
    set_signup_loading(
      state,
      action: { type: string; payload: { signup_loading: boolean } }
    ) {
      state.signup_loading = action.payload.signup_loading;
    },
  },
  extraReducers: {
    [signup_user.fulfilled as any]: (state, action) => {
      return action;
    },
    [signup_user.rejected as any]: (state, action) => {
      return action;
    },
  },
});

export const {
  set_signup_loading,
  set_username,
  set_first_name,
  set_last_name,
  set_logged_in,
} = userSlice.actions;

export default userSlice.reducer;

// ----- Types ------
export declare interface Action {
  type: string;
}
export declare interface SignUpPayload {
  username: string;
  password1: string;
  password2: string;
  first_name: string;
  last_name: string;
}
export declare interface SignUpAction extends Action {
  payload: SignUpPayload;
}

export declare interface LoginPayload {
  username: string;
  password: string;
}
export declare interface LoginAction extends Action {
  payload: LoginPayload;
}

export declare interface LogoutAction extends Action {
  payload: {};
}
