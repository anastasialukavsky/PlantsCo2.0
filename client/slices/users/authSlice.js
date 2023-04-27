import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const logIn = createAsyncThunk(
  'login',
  async (credentials, { rejectWithValue }) => {
    try {
      let { data } = await axios.post('/api/auth/login', credentials);
      localStorage.setItem('token', data.token);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const signUp = createAsyncThunk(
  'auth/signup',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/api/users', userData);
      localStorage.setItem('token', data.token);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const attemptTokenLogin = createAsyncThunk(
  'attemptTokenLogin',
  async (x, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return {};
      const { data } = await axios.get(`/api/auth`, {
        headers: {
          authorization: token,
        },
      });
      return { data, token };
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    auth: {},
    error: '',
    status: '',
    loginMessage: false,
    logoutMessage: false,
    loading: false,
  },
  reducers: {
    resetStatus: (state) => {
      state.status = '';
      state.error = '';
      state.loginMessage = false;
      state.logoutMessage = false;
    },
    logOut: (state) => {
      state.auth = {};
      state.token = '';
      state.status = '';
      localStorage.clear();
      state.logoutMessage = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.status = 'logged in';
        state.error = '';
        state.loginMessage = true;
        state.loading = false;
      })
      .addCase(logIn.pending, (state, { payload }) => {
        state.status = 'loading';
        state.error = '';
        state.loading = true;
      })
      .addCase(logIn.rejected, (state, { payload }) => {
        state.loading = false;
        state.status = 'failed';
        state.error = payload.message;
      })
      .addCase(attemptTokenLogin.fulfilled, (state, { payload }) => {
        state.auth = payload.data || {};
        state.status = 'success';
        state.error = '';
        state.token = payload.token;
      })
      .addCase(attemptTokenLogin.pending, (state, { payload }) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(attemptTokenLogin.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload.message;
      })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.token = payload.token;
        state.error = '';
      })
      .addCase(signUp.pending, (state, { payload }) => {
        state.status = 'loading';
        state.error = '';
      })
      .addCase(signUp.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload.message;
      });
  },
});

export const { resetStatus, logOut } = authSlice.actions;

export const selectAuth = (state) => state.auth;
export const selectLoginMessage = (state) => state.auth.loginMessage;
export const selectLogoutMessage = (state) => state.auth.logoutMessage;
export const selectAuthLoading = (state) => state.auth.loading;

export default authSlice.reducer;
