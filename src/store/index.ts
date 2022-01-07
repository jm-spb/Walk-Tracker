import { configureStore } from '@reduxjs/toolkit';
import trackerSliceReducer from './trackerSlice';

const store = configureStore({
  reducer: trackerSliceReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
