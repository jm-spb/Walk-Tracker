import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import polyline from '@mapbox/polyline';

import { IRouteResponseData } from '../types';

import fetchStravaData from '../api/fetchStravaData';

import {
  clientID,
  clientSecret,
  refreshToken,
  authLink,
  activitiesLink,
} from '../mapConfig';

export const fetchRoutes = createAsyncThunk('tracker/fetchRoutes', async () => {
  const responseData = await fetchStravaData(
    clientID,
    clientSecret,
    refreshToken,
    authLink,
    activitiesLink,
  );

  const formatedData = responseData.data?.map(
    ({
      name,
      distance,
      average_speed,
      max_speed,
      moving_time,
      map: { summary_polyline },
    }: IRouteResponseData) => ({
      name,
      distance,
      average_speed,
      max_speed,
      moving_time,
      coords: polyline.decode(summary_polyline).map((coord) => coord.reverse()),
    }),
  );

  return formatedData;
});

const trackerSlice = createSlice({
  name: 'tracker',
  initialState: {
    routes: [
      {
        name: '',
        distance: 0,
        average_speed: 0,
        max_speed: 0,
        moving_time: 0,
        coords: [[0, 0]],
      },
    ],
    status: '',
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRoutes.pending, (state) => {
      state.status = 'loading';
      state.error = '';
    });
    builder.addCase(fetchRoutes.fulfilled, (state, action) => {
      state.status = 'fulfilled';
      state.routes = action.payload;
    });
    builder.addCase(fetchRoutes.rejected, (state) => {
      state.error = 'error';
    });
  },
});

export default trackerSlice.reducer;
