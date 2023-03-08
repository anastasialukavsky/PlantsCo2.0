import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllPromos = createAsyncThunk(
  'getPromos',
  async ({ token }, { rejectWithValue }) => {
    try {
      let { data } = await axios.get(`/api/promos`, {
        headers: {
          authorization: token,
        },
      });
      return data;
    } catch (err) {
      console.log('axios error getting all promos');
      return rejectWithValue(err);
    }
  }
);

export const fetchSinglePromo = createAsyncThunk(
  'getSinglePromo',
  async ({ id, token }, { rejectWithValue }) => {
    try {
      let { data } = await axios.get(`/api/promos/${id}`, {
        headers: {
          authorization: token,
        },
      });
      return data;
    } catch (err) {
      console.log('axios error getting single promo');
      return rejectWithValue(err);
    }
  }
);

const promoSlice = createSlice({
  name: 'promos',
  initialState: {
    promos: [],
    promo: {},
    error: '',
    status: '',
  },
  reducers: {
    resetStatus: (state) => {
      state.status = '';
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPromos.fulfilled, (state, { payload }) => {
        state.promos = payload;
        state.status = 'success';
        state.error = '';
      })
      .addCase(fetchAllPromos.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(fetchAllPromos.rejected, (state, { payload }) => {
        state.status = 'failed';
        console.log('failed payload', payload);
        state.error = payload.message;
      })
      .addCase(fetchSinglePromo.fulfilled, (state, { payload }) => {
        state.promo = payload;
        state.status = 'success';
        state.error = '';
      })
      .addCase(fetchSinglePromo.pending, (state, { payload }) => {
        state.status = 'loading';
      })
      .addCase(fetchSinglePromo.rejected, (state, { payload }) => {
        state.status = 'failed';
        console.log('failed payload', payload);
        state.error = payload.message;
      });
  },
});

export const { resetStatus } = promoSlice.actions;

export const selectPromos = (state) => state.promos;

export default promoSlice.reducer;
