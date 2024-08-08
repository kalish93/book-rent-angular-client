import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/user";

interface UserState {
  user: null | any;
  accessToken: null | string;
  users: User[];
  loading: boolean;
  error: any | null;
  isError: boolean;
  isAuthenticated: boolean;
  successMessage: any;
}

const initialState: UserState = {
  user: null,
  accessToken: null,
  users: [],
  loading: false,
  error: null,
  isError: false,
  isAuthenticated: false,
  successMessage: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
      state.isError = false;
    },
    loginSuccess: (
      state,
      action: PayloadAction<{
        email: string;
        accessToken: string;
        refreshToken: string;
      }>
    ) => {
      state.user = action.payload;
      state.accessToken = action.payload.accessToken;
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      state.isAuthenticated = !!localStorage.getItem("accessToken");
      state.loading = false;
    },

    completeProfileSuccess: (
      state,
      action: PayloadAction<{
        email: string;
        accessToken: string;
        refreshToken: string;
      }>
    ) => {
      state.user = action.payload;
      state.accessToken = action.payload.accessToken;
      localStorage.setItem("user", JSON.stringify(action.payload));
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("refreshToken", action.payload.refreshToken);
      state.isAuthenticated = !!localStorage.getItem("accessToken");
      state.loading = false;
    },

    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isError = true;
    },

    registerUserStart: (state) => {
      state.loading = true;
      state.error = null;
      state.isError = false;
    },
    registerUserSuccess: (state, action) => {
      const newUser = action.payload;
      state.users = [newUser, ...(state.users || [])];

      state.loading = false;
    },
    registerUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isError = true;
    },

    logoutUser: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
    },

    getUsersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    getUsersSuccess: (state, action) => {
      state.users = action.payload;
      state.loading = false;
    },
    getUsersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updateUserStart: (state) => {
      state.loading = true;
      state.error = null;
      state.isError = false;
    },
    updateUserSuccess: (state, action) => {
      const updatedUser = action.payload;
      // const userIndex = state.users.items.findIndex(
      //   (user) => user.id === updatedUser.id
      // );
      // if (userIndex !== -1) {
      //   state.users.items = state.users.items.map((user) =>
      //     user.id === updatedUser.id ? updatedUser : user
      //   );
      // } else {
      //   state.users.items = [updatedUser, ...state.users.items];
      // }
      state.loading = false;
    },
    updateUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isError = true;
    },

    deleteUserStart: (state) => {
      state.loading = true;
      state.error = null;
      state.isError = false;
    },
    deleteUserSuccess: (state, action) => {
      const deletedUser = action.payload;
      state.users = state.users.filter((user) => user.id !== deletedUser.id) || [];
      state.loading = false;
    },
    deleteUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isError = true;
    },

    changePasswordStart: (state) => {
      state.loading = true;
      state.error = null;
      state.isError = false;
      state.successMessage = null
    },
    changePasswordSuccess: (state, action) => {
      state.successMessage = 'success'
      state.loading = false;
    },
    changePasswordFailure: (state, action) => {
      state.error = action.payload;
      state.isError = true;
      state.loading = false;
    },

    approveBookOwnerSuccess: (state, action) => {
      const updatedUser = action.payload.data;
      const UserIndex = state.users.findIndex(
        (User: any) => User.id === updatedUser.id
      );
      if (UserIndex !== -1) {
        state.users = state.users.map((User: any) =>
          User.id === updatedUser.id ? updatedUser : User
        );
      } else {
        state.users = [updatedUser, ...state.users];
      }
      state.loading = false;
    },

    changeOwnerStatusSuccess: (state, action) => {
      const updatedUser = action.payload.data;
      const UserIndex = state.users.findIndex(
        (User: any) => User.id === updatedUser.id
      );
      if (UserIndex !== -1) {
        state.users = state.users.map((User: any) =>
          User.id === updatedUser.id ? updatedUser : User
        );
      } else {
        state.users = [updatedUser, ...state.users];
      }
      state.loading = false;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logoutUser,
  registerUserStart,
  registerUserSuccess,
  registerUserFailure,
  getUsersStart,
  getUsersSuccess,
  getUsersFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  changePasswordFailure,
  changePasswordStart,
  changePasswordSuccess,
  completeProfileSuccess,
  approveBookOwnerSuccess,
  changeOwnerStatusSuccess
} = userSlice.actions;

export const selectUser = (state: { user: UserState }) => state.user;

export default userSlice.reducer;
