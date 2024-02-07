import { createSlice } from "@reduxjs/toolkit";

const initialState = { loading: false, data: {}, cardDetails: {}, error: "" };

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
      state.loading = false;
      const temp = state.data[action.payload.listId].filter((card) => {
        return card.id !== action.payload.cardId;
      });
      state.data[action.payload.listId] = temp;
    },
    cardDetails: (state, action) => {
      state.data[action.payload.listId].map((card) => {
        if (card.id === action.payload.cardId) {
          state.cardDetails.cardId = action.payload.cardId;
          state.cardDetails.listId = card.idList;
          state.cardDetails.cardName = card.name;
        }
      });
    },
  },
});

export const {
  fetchCardsRequest,
  fetchCardsSuccess,
  fetchCardsFailure,
  addCard,
  archiveCard,
  cardDetails,
} = cardsSlice.actions;

export default cardsSlice.reducer;
