import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { authService } from "../../services/auth.service";

const initialState = {
  status: null,
  loading: false,
  error: null,
};

const login = createAsyncThunk(
  "loginSlice/login",
  async ({ user }, { rejectWithValue }) => {
    try {
      const { status } = await authService.login(user);
      return status;
    } catch (err) {
      console.log(err);
      return rejectWithValue(err.message);
    }
  }
);

const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.status = action.payload;
        state.loading = false;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      }),
});

const { reducer: loginReducer } = loginSlice;
const loginActions = { login };

export { loginReducer, loginActions };
