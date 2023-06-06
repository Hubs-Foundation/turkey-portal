import { createSlice } from '@reduxjs/toolkit';
import { RootStateT } from './store';
import { RegionT } from 'types/Countries';

const initialState: RegionT = {
  regionCode: 'US',
};

const regionSlice = createSlice({
  name: 'region',
  initialState,
  reducers: {
    setRegion(state, action) {
      if (!action.payload) return;

      // Initialize Region Values
      const { regionCode } = action.payload;
      state.regionCode = regionCode;
    },
  },
});

export const selectRegion = (state: RootStateT) => state.region;
export const { setRegion } = regionSlice.actions;
export default regionSlice.reducer;
