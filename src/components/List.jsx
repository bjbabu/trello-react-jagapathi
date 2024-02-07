/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListActionsDrop from "./ListActionsDrop";
import Card from "./Card";
import { getCardsOfAList, creatingCardsInAList } from "./API";

const List = (props) => {
  const {
    listId,
    setListIdInCardDetail,
    listName,
    setCardIdForCardDetail,
    setIsCardDetailVisible,
  } = props;

  const dispatch = useDispatch();

  const fetchingOp = useSelector((state) => state.operations.fetching);
  const creatingOp = useSelector((state) => state.operations.creating);
  const archivingOp = useSelector((state) => state.operations.deleting);

  const cardsLoading = useSelector((state) => state.cards.loading);
  const cardsData = useSelector((state) => state.cards.data);
  const cardsError = useSelector((state) => state.cards.error);

  const cardDetails = useSelector((state) => state.cards.cardDetails);

  const [cardName, setCardName] = useState("");
  const [listActionDrop, setListActionDrop] = useState(false);
  const [isAddCardDrop, setIsAddCardDrop] = useState(false);
  const [clickedListId, setClickedListId] = useState("");

  useEffect(() => {
    dispatch(getCardsOfAList(listId));
  }, []);

  return (
    <>
      <div
        className='w-72 bg-slate-100 p-2 rounded-md shadow-lg flex flex-col justify-center self-start flex-shrink-0'
        onClick={() => {
          setListIdInCardDetail(listId);
        }}
      >
        <header className='flex items-center justify-between ps-3 pe-2 desktop: h-5'>
          <h3 className='text-black font-medium'>{listName}</h3>
          {/* <input type='text' className=' bg-slate-300' /> */}
          <button className='text-slate-700 cursor-pointer'>
            <div
              className='relative'
              onClick={(e) => {
                setListActionDrop(!listActionDrop);
              }}
            >
              ...
            </div>
            {listActionDrop ? (
              <ListActionsDrop
                listId={listId}
                listActionDrop={listActionDrop}
                setListActionDrop={setListActionDrop}
              />
            ) : (
              <></>
            )}
          </button>
        </header>

        <div className='mt-3'>
          {cardsLoading === true && fetchingOp && !cardsData[listId] ? (
            <div className='text-green-600'>Cards Loading...</div>
          ) : cardsError && fetchingOp ? (
            <div className='text-red-600'>{cardsError}</div>
          ) : cardDetails.listId === listId && archivingOp && cardsError ? (
            <div className='text-red-600'>Error while archiving the card!!</div>
          ) : cardDetails.listId === listId && archivingOp && cardsLoading ? (
            <div className='text-green-600'>Archiving the card</div>
          ) : listId === clickedListId && creatingOp && cardsLoading ? (
            <div className='text-green-600'>Creating Card...</div>
          ) : (
            cardsData[listId] &&
            cardsData[listId].map((card) => (
              <>
                <Card
                  key={card.id}
                  listId={listId}
                  cardId={card.id}
                  cardName={card.name}
                  setCardIdForCardDetail={setCardIdForCardDetail}
                  setIsCardDetailVisible={setIsCardDetailVisible}
                />
              </>
            ))
          )}
        </div>

        <footer className='flex text-black mt-4 '>
          {isAddCardDrop ? (
            <div className=' w-full'>
              <textarea
                autoFocus
                name=''
                id=''
                rows={3}
                className='w-full p-2 placeholder:text-sm outline-none rounded-md shadow-lg focus'
                placeholder='Enter a title for this card...'
                value={cardName}
                onChange={(e) => {
                  setCardName(e.target.value);
                }}
              ></textarea>
              <div>
                <button
                  className=' bg-blue-600 px-2 py-1 text-white text-sm font-medium rounded-md focus:clear-none'
                  disabled={cardName === "" || cardName.trim() === ""}
                  onClick={() => {
                    setClickedListId(listId);
                    dispatch(creatingCardsInAList(listId, cardName));
                    setCardName("");
                  }}
                >
                  Add card
                </button>
                <span
                  className='text-sm font-medium m-2 cursor-pointer'
                  onClick={() => {
                    setIsAddCardDrop(!isAddCardDrop);
                  }}
                >
                  X
                </span>
              </div>
            </div>
          ) : (
            <div
              className=' w-full ps-3 flex items-center text-slate-600 text-sm cursor-pointer rounded-md hover:bg-slate-300'
              onClick={() => {
                setIsAddCardDrop(!isAddCardDrop);
              }}
            >
              <div className=' text-xl'>+</div>
              <div className='mx-3'>Add a card</div>
            </div>
          )}
        </footer>
      </div>
    </>
  );
};

export default List;
