import { createSlice } from "@reduxjs/toolkit";

const initialState = { loading: false, data: [], error: "" };

const boardSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    fetchBoardsRequest: (state) => {
      state.loading = true;
    },
    fetchBoardsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
    },
    fetchBoardsFailure: (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    },
    addBoard: (state, action) => {
      state.data = [...state.data, action.payload];
    },
  },
});

export const {
  fetchBoardsRequest,
  fetchBoardsSuccess,
  fetchBoardsFailure,
  addBoard,
} = boardSlice.actions;
export default boardSlice.reducer;
