import { configureStore } from "@reduxjs/toolkit";
import operationsReducer from "./operationsSlice";
import boardReducer from "./boardsSlice";
import listsReducer from "./listsSlice";
import cardsReducer from "./cardsSlice";
import checkListsReducer from "./checkListsSlice";
import checkitemsReducer from "./checkitemsSlice";

export const store = configureStore({
  reducer: {
    operations: operationsReducer,
    boards: boardReducer,
    lists: listsReducer,
    cards: cardsReducer,
    checkLists: checkListsReducer,
    checkitems: checkitemsReducer,
  },
});
