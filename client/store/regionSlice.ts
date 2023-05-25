import { createSlice } from '@reduxjs/toolkit';
import { RootStateT } from './store';
import { RegionT } from 'types/Countries';

const initialState: RegionT = {
  code: 'US',
};

const regionSlice = createSlice({
  name: 'region',
  initialState,
  reducers: {
    setRegion(state, action) {
      if (!action.payload) return;

      // Initialize Region Values
      const { code } = action.payload;
      state.code = code;
    },
  },
});

export const selectRegion = (state: RootStateT) => state.region;
export const { setRegion } = regionSlice.actions;
export default regionSlice.reducer;
