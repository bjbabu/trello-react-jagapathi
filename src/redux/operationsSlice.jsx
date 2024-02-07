import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fetching: false,
  creating: false,
  updating: false,
  deleting: false,
};

const operationsSlice = createSlice({
  name: "operations",
  initialState,
  reducers: {
    fetching: (state) => {
      state.fetching = true;
      state.creating = false;
      state.updating = false;
      state.deleting = false;
    },
    creating: (state) => {
      state.fetching = false;
      state.creating = true;
      state.updating = false;
      state.deleting = false;
    },
    updating: (state) => {
      state.fetching = false;
      state.creating = false;
      state.updating = true;
      state.deleting = false;
    },
    deleting: (state) => {
      state.fetching = false;
      state.creating = false;
      state.updating = false;
      state.deleting = true;
    },
  },
});

export const { fetching, creating, updating, deleting } =
  operationsSlice.actions;

export default operationsSlice.reducer;
