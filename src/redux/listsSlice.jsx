import { createSlice } from "@reduxjs/toolkit";

const initialState = { loading: false, data: [], error: "" };

const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    fetchListsRequest: (state) => {
      state.loading = true;
    },
    fetchListsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
    },
    fetchListsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addList: (state, action) => {
      state.loading = false;
      state.data = [...state.data, action.payload];
    },
    archiveList: (state, action) => {
      state.loading = false;
      const temp = state.data.filter((list) => {
        return list.id !== action.payload.id;
      });
      state.data = temp;
    },
  },
});

export const {
  fetchListsRequest,
  fetchListsSuccess,
  fetchListsFailure,
  addList,
  archiveList,
} = listsSlice.actions;

export default listsSlice.reducer;
