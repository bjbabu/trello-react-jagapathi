import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: {},
  error: "",
};

const checkListsSlice = createSlice({
  name: "checklists",
  initialState,
  reducers: {
    fetchCheckListsRequest: (state) => {
      state.loading = true;
    },
    fetchCheckListsSuccess: (state, action) => {
      state.loading = false;
      state.data = { ...state.data, [action.payload.id]: action.payload.data };
      state.error = "";
    },
    fetchCheckListsFailure: (state, action) => {
      state.loading = false;
      state.data = {};
      state.error = action.payload;
    },
    addCheckList: (state, action) => {
      state.loading = false;
      state.data = {
        ...state.data,
        [action.payload.id]: [
          ...state.data[action.payload.id],
          action.payload.data,
        ],
      };
    },
    archiveCheckList: (state, action) => {
      const temp = state.data[action.payload.cardId].filter((checkList) => {
        return checkList.id !== action.payload.checkListId;
      });

      state.data[action.payload.cardId] = temp;
    },
  },
});

export const {
  fetchCheckListsRequest,
  fetchCheckListsSuccess,
  fetchCheckListsFailure,
  addCheckList,
  archiveCheckList,
} = checkListsSlice.actions;

export default checkListsSlice.reducer;
