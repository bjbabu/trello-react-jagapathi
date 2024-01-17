import { createSlice } from "@reduxjs/toolkit";

const initialState = { loading: false, data: [], error: "" };

const checkListsSlice = createSlice({
  name: "checklists",
  initialState,
  reducers: {
    fetchCheckListsRequest: (state) => {
      state.loading = true;
    },
    fetchCheckListsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
    },
    fetchCheckListsFailure: (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    },
  },
});

export const {
  fetchCheckListsRequest,
  fetchCheckListsSuccess,
  fetchCheckListsFailure,
} = checkListsSlice.actions;

export default checkListsSlice.reducer;
