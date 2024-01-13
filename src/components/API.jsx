/* eslint-disable no-undef */
import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;
const apiToken = import.meta.env.VITE_API_TOKEN;

// const id = "6597aa01d67bfb4269b27c04";
// const apiKey = "b23160e2a444b73f7e80a11836f7d23a";
// const apiToken =
//   "ATTAb0ba4d05544f9a6fd6851bf310b28b00f9d2cda8b3fb859e2e20b46e3644361bCB58EAF7";

/*Getting Boards*/

export function getBoards(id, handleData, setHandleError) {
  axios
    .get(`${baseUrl}/members/${id}/boards?key=${apiKey}&token=${apiToken}`)
    .then((res) => {
      handleData(res.data);
    })
    .catch((err) => {
      console.log(err);
      setHandleError("Error while fetching boards");
    });
}

/*Creating Board*/

export function createBoard(boardName, setHandleError) {
  return axios
    .post(
      `${baseUrl}/boards/?name=${boardName}&key=${apiKey}&token=${apiToken}`
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      setHandleError("Error while creating boards");
    });
}

/*Getting Lists of a board*/

export function getListsOfABoard(boardId, handleData, setHandleError) {
  axios
    .get(`${baseUrl}/boards/${boardId}/lists?key=${apiKey}&token=${apiToken}`)
    .then((res) => handleData(res.data))
    .catch((err) => {
      console.log(err);
      setHandleError("Error while getting lists");
    });
}

/* Creating a new list */
export function creatingList(boardId, listName, handleData, setHandleError) {
  axios
    .post(
      `https://api.trello.com/1/lists?name=${listName}&idBoard=${boardId}&key=${apiKey}&token=${apiToken}`
    )
    .then((res) => {
      handleData(res.data);
    })
    .catch((err) => {
      console.log(err);
      setHandleError("Error while creating list");
    });
}

/*Archiving the Lists*/

export function archivingListsOfABoard(
  listId,
  listActionDrop,
  setListActionDrop,
  handleChange,
  setHandleChange,
  setHandleError
) {
  axios
    .put(
      `https://api.trello.com/1/lists/${listId}/closed?key=${apiKey}&token=${apiToken}&value=true`
    )
    .then(() => {
      setListActionDrop(!listActionDrop);
      setHandleChange(!handleChange);
    })
    .catch((err) => {
      console.log(err);
      setHandleError("Error while archiving the list");
    });
}

/* Getting Cards in a list*/

export function getCardsOfAList(listId, handleData, setHandleError) {
  axios
    .get(`${baseUrl}/lists/${listId}/cards?key=${apiKey}&token=${apiToken}`)
    .then((res) => handleData(res.data))
    .catch((err) => {
      console.log(err);
      setHandleError("Error while getting cards of a list");
    });
}

/* Creating Cards in a list */

export function creatingCardsInAList(
  listId,
  cardName,
  setCardName,
  setHandleError
) {
  const data = {
    idList: listId,
    name: cardName,
    key: apiKey,
    token: apiToken,
  };

  axios
    .post(`${baseUrl}/cards`, data)
    .then(() => {
      setCardName("");
    })
    .catch((err) => {
      console.log(err);
      setHandleError("Error while creating cards in a list");
    });
}

/* Deleting Card in a list*/

export function deletingACardInAList(
  cardId,
  setIsCardDetailVisible,
  setHandleError
) {
  axios
    .delete(
      `https://api.trello.com/1/cards/${cardId}?key=${apiKey}&token=${apiToken}`
    )
    .then(() => {
      setIsCardDetailVisible(false);
    })
    .catch((err) => {
      console.log(err);
      setHandleError("Error while deleting a card in the list");
    });
}

/* Getting Check Lists in a card */

export function gettingChecklistsInACard(cardId, handleData, setHandleError) {
  axios
    .get(
      `https://api.trello.com/1/cards/${cardId}/checklists?key=${apiKey}&token=${apiToken}`
    )
    .then((res) => handleData(res.data))
    .catch((err) => {
      console.log(err);
      setHandleError("Error while fetching check lists in the card");
    });
}

/* Creatin checklists in a card */

export function creatingCheckListsInACard(
  cardId,
  checkListName,
  handleCheckListCreation,
  setIsCheckListPopVisible,
  setCheckListName,
  setHandleError
) {
  axios
    .post(
      `https://api.trello.com/1/cards/${cardId}/checklists?key=${apiKey}&token=${apiToken}&name=${checkListName}`
    )
    .then((res) => {
      handleCheckListCreation(res.data);
      setCheckListName("Checklist");
      setIsCheckListPopVisible(false);
    })
    .catch((err) => {
      console.log(err);
      setHandleError("Error while creating check list");
    });
}

/* Deleting checklist in a card */

export function deletingCheckListInACard(
  checkListId,
  setHandleCheckListDelete,
  setHandleError
) {
  axios
    .delete(
      `https://api.trello.com/1/checklists/${checkListId}?key=${apiKey}&token=${apiToken}`
    )
    .then(() => {
      setHandleCheckListDelete(checkListId);
    })
    .catch((err) => {
      console.log(err);
      setHandleError("Error while deleting checklist in the card");
    });
}

/* Getting check items in a check list */

export function gettingCheckItems(checkListId, handleData, setHandleError) {
  axios
    .get(
      `https://api.trello.com/1/checklists/${checkListId}/checkItems?key=${apiKey}&token=${apiToken}`
    )
    .then((res) => {
      handleData(res.data);
    })
    .catch((err) => {
      console.log(err);
      setHandleError("Error while fetching check items");
    });
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

export function deletingCheckItem(
  checkListId,
  itemId,
  // handleChange,
  // setHandleChange,
  handleDeleteCheckItem,
  setHandleError
) {
  axios
    .delete(
      `https://api.trello.com/1/checklists/${checkListId}/checkItems/${itemId}?key=${apiKey}&token=${apiToken}`
    )
    .then(() => {
      handleDeleteCheckItem(itemId);
      // setHandleChange(!handleChange);
    })
    .catch((err) => {
      console.log(err);
      setHandleError("Error while deleting check item");
    });
}

/* Updating check item */

export function updatingCheckItem(cardId, itemId, taskStatus, setHandleError) {
  axios
    .put(
      `https://api.trello.com/1/cards/${cardId}/checkItem/${itemId}?key=${apiKey}&token=${apiToken}&state=${taskStatus}`
    )
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
      setHandleError("Error while updating check item");
    });
}
