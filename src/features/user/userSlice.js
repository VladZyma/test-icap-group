import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { userService } from "../../services/user.service";

const initialState = {
  users: {},
  userForUpdate: null,
  loading: false,
  error: null,
};

const getAllUsers = createAsyncThunk(
  "userSlice/getAllUsers",
  async ({ limit, offset }, { rejectWithValue }) => {
    try {
      const { data } = await userService.getAllUsers(limit, offset);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const createUser = createAsyncThunk(
  "userSlice/createUser",
  async ({ user }, { rejectWithValue }) => {
    try {
      const { data } = await userService.createUser(user);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const updateUserById = createAsyncThunk(
  "userSlice/updateUserById",
  async ({ id, user }, { rejectWithValue }) => {
    try {
      const { data } = await userService.updateUserById(id, user);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const deleteUserById = createAsyncThunk(
  "userSlice/deleteUserById",
  async ({ id }, { rejectWithValue }) => {
    try {
      await userService.deleteUserById(id);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUserForUpdate: (state, action) => {
      state.userForUpdate = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      // get all users
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // create user
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.results.push(action.payload);
        state.loading = false;
      })
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // update user by id
      .addCase(updateUserById.fulfilled, (state, action) => {
        const oldUser = state.users.results.find(
          (user) => user.id === action.payload.id
        );
        Object.assign(oldUser, action.payload);
        state.loading = false;
      })
      .addCase(updateUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserById.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      // delete user by id
      .addCase(deleteUserById.fulfilled, (state, action) => {
        const userIndex = state.users.results.findIndex(
          (user) => user.id === action.payload
        );
        state.users.results.splice(userIndex, 1);
        state.loading = false;
      })
      .addCase(deleteUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUserById.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      }),
});

const {
  reducer: userReducer,
  actions: { setUserForUpdate },
} = userSlice;
const userActions = {
  getAllUsers,
  createUser,
  deleteUserById,
  setUserForUpdate,
  updateUserById,
};

export { userReducer, userActions };
