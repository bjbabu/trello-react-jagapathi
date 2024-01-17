import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  data: {},
  completedItems: {},
  error: "",
};

const checkitemsSlice = createSlice({
  name: "checkitems",
  initialState,
  reducers: {
    fetchCheckitemsRequest: (state) => {
      state.loading = true;
    },
    fetchCheckitemsSuccess: (state, action) => {
      state.loading = false;
      state.data = { ...state.data, [action.payload.id]: action.payload.data };
    },
    fetchCheckitemsFailure: (state, action) => {
      state.loading = false;
      state.data = {};
      state.error = action.payload;
    },
    addCheckitem: (state, action) => {
      state.loading = false;
      state.data = {
        ...state.data,
        [action.payload.id]: [
          ...state.data[action.payload.id],
          action.payload.data,
        ],
      };
    },
    updateCheckItem: (state, action) => {
      const temp = state.data[action.payload.checkListId].map((checkitem) => {
        if (checkitem.id === action.payload.checkItemId) {
          if (checkitem.state === "complete") {
            return { ...checkitem, state: "incomplete" };
          } else {
            return { ...checkitem, state: "complete" };
          }
        } else {
          return checkitem;
        }
      });

      state.data[action.payload.checkListId] = temp;
    },
    deleteCheckItem: (state, action) => {
      state.loading = false;
      const temp = state.data[action.payload.checkListId].filter(
        (checkitem) => {
          return checkitem.id !== action.payload.checkItemId;
        }
      );
      state.data[action.payload.checkListId] = temp;
    },
  },
});

export const {
  fetchCheckitemsRequest,
  fetchCheckitemsSuccess,
  fetchCheckitemsFailure,
  addCheckitem,
  updateCheckItem,
  deleteCheckItem,
} = checkitemsSlice.actions;

export default checkitemsSlice.reducer;
