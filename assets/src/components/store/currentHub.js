import { createSlice } from "@reduxjs/toolkit";

export const currentHubSlice = createSlice({
  name: "currentHub",
  initialState: null,
  reducers: {
    setCurrentHub(state, action) {
      return action.payload;
    },
  },
});

export const selectCurrentHub = (state) => state.currentHub;

export const { setCurrentHub } = currentHubSlice.actions;
