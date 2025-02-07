import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCurrentUser } from "@/lib/api/authAPI";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  firstTimeLogin: false,
};

export const checkAuthUser = createAsyncThunk(
  "auth/checkAuthUser",
  async (token, { rejectWithValue }) => {
    try {
      const response = await getCurrentUser(token);
      return { user: response, token };
    } catch (error) {
      return rejectWithValue(error.message || "Authentication failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      localStorage.setItem("token", token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setFirstTimeLogin: (state, action) => {
      state.firstTimeLogin = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkAuthUser.fulfilled, (state, action) => {
        const { user, token } = action.payload;
        state.user = user;
        state.token = token;
        state.isAuthenticated = true;
        state.isLoading = false;
        localStorage.setItem("token", token);
      })
      .addCase(checkAuthUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        localStorage.removeItem("token");
      });
  },
});

export const {
  setCredentials,
  logout,
  setError,
  clearError,
  setLoading,
  setFirstTimeLogin,
} = authSlice.actions;

export default authSlice.reducer;
