import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import polyline from '@mapbox/polyline';

import { IRouteRenderData, ITrackerState } from '../types';

import fetchStravaData from '../api/fetchStravaData';

import {
  clientID,
  clientSecret,
  refreshToken,
  authLink,
  activitiesLink,
} from '../mapConfig';

export const fetchRoutes = createAsyncThunk(
  'tracker/fetchRoutes',
  async (_, { rejectWithValue }) => {
    try {
      const responseData = await fetchStravaData(
        clientID,
        clientSecret,
        refreshToken,
        authLink,
        activitiesLink,
      );

      const formatedData: IRouteRenderData[] = responseData.map(
        ({
          name,
          distance,
          average_speed,
          max_speed,
          moving_time,
          map: { summary_polyline },
        }) => ({
          name,
          distance,
          average_speed,
          max_speed,
          moving_time,
          coords: polyline.decode(summary_polyline),
        }),
      );

      return formatedData;
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.name);
      }
      return rejectWithValue(error);
    }
  },
);

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
  } as ITrackerState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRoutes.pending, (state) => {
      state.status = 'loading';
      state.error = '';
    });
    builder.addCase(fetchRoutes.fulfilled, (state, { payload }) => {
      state.status = 'fulfilled';
      state.routes = payload.map(
        ({ name, distance, average_speed, max_speed, moving_time, coords }) =>
          ({
            name,
            distance: parseFloat((distance / 1000).toFixed(2)), // km
            average_speed: parseFloat(average_speed.toFixed(2)), // m/s
            max_speed: parseFloat(max_speed.toFixed(2)), // m/s
            moving_time, // seconds
            coords: coords.map((coord) => coord.reverse()),
          } as IRouteRenderData),
      );
    });
    builder.addCase(fetchRoutes.rejected, (state, { payload }) => {
      state.status = 'rejected';
      state.error = payload as string;
    });
  },
});

export default trackerSlice.reducer;
