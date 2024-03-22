import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import adminauthService from "./adminauthServices";

function adminAuthStatus() {
  const token = localStorage.getItem("admin-token");
  if (token === null) {
    return null;
  }
  const decoded = jwtDecode(token);
  return {
    _id: decoded._id,
    email: decoded.email,
    isAdmin: decoded.isAdmin
  };
}

const initalState = {
  adminData: adminAuthStatus(),
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const adminLogin = createAsyncThunk("admin/login", async (user, thunkAPI) => {
  try {
    return await adminauthService.adminLogin(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const adminLogout = createAsyncThunk("admin/logout", async () => {
  await adminauthService.adminLogout();
});

export const adminauthSlice = createSlice({
  name: "adminAuth",
  initialState: initalState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogout.fulfilled, (state) => {
        state.isError = false;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = "";
        state.adminData = null;
      })
      .addCase(adminLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.adminData = action.payload.data;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.adminData = null;
      });
  },
});

export const { reset } = adminauthSlice.actions;
export default adminauthSlice.reducer;
