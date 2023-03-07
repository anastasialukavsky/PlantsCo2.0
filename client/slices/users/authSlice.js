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
      return data;
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
  },
  reducers: {
    resetStatus: (state) => {
      state.status = '';
      state.error = '';
    },
    logOut: (state) => {
      state.auth = {};
      state.token = '';
      state.status = '';
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logIn.fulfilled, (state, { payload }) => {
        state.token = payload.token;
        state.status = 'success';
        state.error = '';
      })
      .addCase(logIn.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload.message;
      })
      .addCase(attemptTokenLogin.fulfilled, (state, { payload }) => {
        state.auth = payload || {};
        // console.log('payload from attemptTokenLogin:', payload);
        state.status = 'success';
        state.error = '';
        const token = localStorage.getItem('token');
        state.token = token;
      })
      .addCase(attemptTokenLogin.rejected, (state, { payload }) => {
        state.status = 'failed';
        state.error = payload.message;
      })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        state.status = 'success';
        state.token = payload.token;
        state.error = '';
        // console.log('payload from signUp:', payload);
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

export default authSlice.reducer;
