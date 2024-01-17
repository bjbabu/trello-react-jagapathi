import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./boardsSlice";
import listsReducer from "./listsSlice";
import cardsReducer from "./cardsSlice";
import checkListsReducer from "./checkListsSlice";

export const store = configureStore({
  reducer: {
    boards: boardReducer,
    lists: listsReducer,
    cards: cardsReducer,
    checkLists: checkListsReducer,
  },
});
