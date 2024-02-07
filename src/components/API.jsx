/* eslint-disable no-undef */
import axios from "axios";

import {
  fetching,
  creating,
  updating,
  deleting,
} from "../redux/operationsSlice";

import {
  fetchBoardsRequest,
  fetchBoardsSuccess,
  fetchBoardsFailure,
  addBoard,
} from "../redux/boardsSlice";

import {
  fetchListsRequest,
  fetchListsSuccess,
  fetchListsFailure,
  addList,
  archiveList,
} from "../redux/listsSlice";

import {
  fetchCardsRequest,
  fetchCardsSuccess,
  fetchCardsFailure,
  addCard,
  archiveCard,
} from "../redux/cardsSlice";

import {
  fetchCheckListsRequest,
  fetchCheckListsSuccess,
  fetchCheckListsFailure,
} from "../redux/checkListsSlice";

import {
  fetchCheckitemsRequest,
  fetchCheckitemsSuccess,
  fetchCheckitemsFailure,
} from "../redux/checkitemsSlice";

const baseUrl = import.meta.env.VITE_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;
const apiToken = import.meta.env.VITE_API_TOKEN;

/*Getting Boards*/

export function getBoards(id) {
  return (dispatch) => {
    dispatch(fetching());
    dispatch(fetchBoardsRequest());
    axios
      .get(`${baseUrl}/members/${id}/boards?key=${apiKey}&token=${apiToken}`)
      .then((res) => {
        dispatch(fetchBoardsSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchBoardsFailure(err.message));
      });
  };
}

/*Creating Board*/

export function createBoard(boardName, navigate) {
  return (dispatch) => {
    dispatch(creating());
    return axios
      .post(
        `${baseUrl}/boards/?name=${boardName}&key=${apiKey}&token=${apiToken}`
      )
      .then((res) => {
        navigate(`/boards/${res.data.id}`);
        dispatch(addBoard(res.data));
      })
      .catch((err) => {
        dispatch(fetchBoardsFailure("Error while creating the board!"));
        console.log(err);
      });
  };
}

/*Getting Lists of a board*/

export function getListsOfABoard(boardId) {
  return (dispatch) => {
    dispatch(fetchListsRequest());
    axios
      .get(`${baseUrl}/boards/${boardId}/lists?key=${apiKey}&token=${apiToken}`)
      .then((res) => {
        dispatch(fetchListsSuccess(res.data));
      })
      .catch((err) => {
        dispatch(fetchListsFailure(err.message));
      });
  };
}

/* Creating a new list */
export function creatingList(boardId, listName) {
  return (dispatch) => {
    dispatch(creating());
    dispatch(fetchListsRequest());
    axios
      .post(
        `${baseUrl}/lists?name=${listName}&idBoard=${boardId}&key=${apiKey}&token=${apiToken}`
      )
      .then((res) => {
        dispatch(addList(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchListsFailure("Error while creating list!"));
      });
  };
}

/*Archiving the Lists*/

export function archivingListsOfABoard(
  listId,
  listActionDrop,
  setListActionDrop
) {
  return (dispatch) => {
    dispatch(deleting());
    dispatch(fetchListsRequest());
    axios
      .put(
        `${baseUrl}/lists/${listId}/closed?key=${apiKey}&token=${apiToken}&value=true`
      )
      .then((res) => {
        setListActionDrop(!listActionDrop);
        dispatch(archiveList(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchListsFailure("Error while archiving the list"));
      });
  };
}

/* Getting Cards in a list*/

export function getCardsOfAList(listId) {
  return (dispatch) => {
    dispatch(fetching());
    dispatch(fetchCardsRequest());
    axios
      .get(`${baseUrl}/lists/${listId}/cards?key=${apiKey}&token=${apiToken}`)
      .then((res) => {
        dispatch(fetchCardsSuccess({ id: listId, data: res.data }));
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchCardsFailure(err.message));
      });
  };
}

/* Creating Cards in a list */

export function creatingCardsInAList(listId, cardName) {
  const data = {
    idList: listId,
    name: cardName,
    key: apiKey,
    token: apiToken,
  };
  return (dispatch) => {
    dispatch(creating());
    dispatch(fetchCardsRequest());
    axios
      .post(`${baseUrl}/cards`, data)
      .then((res) => {
        dispatch(addCard({ id: listId, data: res.data }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

/* Deleting Card in a list*/

export function deletingACardInAList(cardId, listId) {
  return (dispatch) => {
    dispatch(deleting());
    dispatch(fetchCardsRequest());
    axios
      .delete(`${baseUrl}/cards/${cardId}?key=${apiKey}&token=${apiToken}`)
      .then(() => {
        dispatch(archiveCard({ listId: listId, cardId: cardId }));
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchCardsFailure(err.message));
      });
  };
}

/* Getting Check Lists in a card */

export function gettingChecklistsInACard(cardId) {
  return (dispatch) => {
    dispatch(fetchCheckListsRequest());
    axios
      .get(
        `${baseUrl}/cards/${cardId}/checklists?key=${apiKey}&token=${apiToken}`
      )
      .then((res) => {
        dispatch(fetchCheckListsSuccess({ id: cardId, data: res.data }));
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchCheckListsFailure(err.message));
      });
  };
}

/* Creatin checklists in a card */

export function creatingCheckListsInACard(
  cardId,
  checkListName,
  setIsCheckListPopVisible,
  setCheckListName,
  handleAddCheckList,
  setHandleError
) {
  axios
    .post(
      `${baseUrl}/cards/${cardId}/checklists?key=${apiKey}&token=${apiToken}&name=${checkListName}`
    )
    .then((res) => {
      handleAddCheckList(res.data);
      setCheckListName("Checklist");
      setIsCheckListPopVisible(false);
    })
    .catch((err) => {
      console.log(err);
      setHandleError("Error while creating check list");
    });
}

/* Deleting checklist in a card */

export function deletingCheckListInACard(checkListId, handleCheckListArchive) {
  axios
    .delete(
      `https://api.trello.com/1/checklists/${checkListId}?key=${apiKey}&token=${apiToken}`
    )
    .then((res) => {
      handleCheckListArchive(res.data);
    })
    .catch((err) => {
      console.log(err);
      setHandleError("Error while deleting checklist in the card");
    });
}

/* Getting check items in a check list */

export function gettingCheckItems(checkListId) {
  return (dispatch) => {
    dispatch(fetchCheckitemsRequest());
    axios
      .get(
        `https://api.trello.com/1/checklists/${checkListId}/checkItems?key=${apiKey}&token=${apiToken}`
      )
      .then((res) => {
        dispatch(fetchCheckitemsSuccess({ id: checkListId, data: res.data }));
      })
      .catch((err) => {
        console.log(err);
        dispatch(fetchCheckitemsFailure(err.message));
      });
  };
}

/* Creating check items in a check list */

export function creatingCheckItems(
  checkListId,
  checkItemName,
  handleCreatingCheckItem,
  setHandleError
) {
  axios
    .post(
      `https://api.trello.com/1/checklists/${checkListId}/checkItems?name=${checkItemName}&key=${apiKey}&token=${apiToken}`
    )
    .then((res) => {
      handleCreatingCheckItem(res.data);
    })
    .catch((err) => {
      console.log(err);
      setHandleError("Error while creating check items");
    });
}

/* Deleting a check item */

export function deletingCheckItem(checkListId, itemId, handleDeleteCheckItem) {
  axios
    .delete(
      `https://api.trello.com/1/checklists/${checkListId}/checkItems/${itemId}?key=${apiKey}&token=${apiToken}`
    )
    .then((res) => {
      handleDeleteCheckItem(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

/* Updating check item */

export function updatingCheckItem(cardId, itemId, taskStatus) {
  axios
    .put(
      `https://api.trello.com/1/cards/${cardId}/checkItem/${itemId}?key=${apiKey}&token=${apiToken}&state=${taskStatus}`
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
}
