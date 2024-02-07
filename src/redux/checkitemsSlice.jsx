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
      let count = 0;
      action.payload.data.map((checkitem) => {
        if (checkitem.state === "complete") {
          count++;
        }
      });
      state.completedItems = {
        ...state.completedItems,
        [action.payload.id]: count,
      };
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
            state.completedItems[action.payload.checkListId]--;
            return { ...checkitem, state: "incomplete" };
          } else {
            state.completedItems[action.payload.checkListId]++;
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
          if (checkitem.id === action.payload.checkItemId) {
            if (
              state.completedItems[action.payload.checkListId] !== 0 &&
              checkitem.state === "complete"
            ) {
              state.completedItems[action.payload.checkListId]--;
            }
          }
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
