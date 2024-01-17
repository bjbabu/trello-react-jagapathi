import { createSlice } from "@reduxjs/toolkit";

const initialState = { loading: false, data: {}, error: "" };

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    fetchCardsRequest: (state) => {
      state.loading = true;
    },
    fetchCardsSuccess: (state, action) => {
      state.loading = false;
      state.data = {
        ...state.data,
        [action.payload.id]: action.payload.data,
      };
      state.error = "";
    },
    fetchCardsFailure: (state, action) => {
      state.loading = false;
      state.data = [];
      state.error = action.payload;
    },
    addCard: (state, action) => {
      state.loading = false;
      state.data = {
        ...state.data,
        [action.payload.id]: [
          ...state.data[action.payload.id],
          action.payload.data,
        ],
      };
    },
    archiveCard: (state, action) => {
      const temp = state.data[action.payload.listId].filter((card) => {
        return card.id !== action.payload.cardId;
      });
      state.data[action.payload.listId] = temp;
    },
  },
});

export const {
  fetchCardsRequest,
  fetchCardsSuccess,
  fetchCardsFailure,
  addCard,
  archiveCard,
} = cardsSlice.actions;

export default cardsSlice.reducer;
