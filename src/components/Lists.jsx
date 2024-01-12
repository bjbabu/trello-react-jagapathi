/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import { Context } from "../App";
import { useParams } from "react-router-dom";
import List from "./List";
import AddListDrop from "./AddListDrop";
import CardDetail from "./CardDetail";
import { getListsOfABoard } from "./API";

const Lists = () => {
  const { id } = useParams();

  const [listOfBoards, setListOfBoards, handleError, setHandleError] =
    useContext(Context);

  const [listsInBoard, setListsInBoard] = useState([]);
  const [cardIdForCardDetail, setCardIdForCardDetail] = useState("");
  const [cardNameInCardDetail, setCardNameInCardDetail] = useState("");
  const [listNameInCardDetail, setListNameInCardDetail] = useState("");
  const [isCardDetailVisible, setIsCardDetailVisible] = useState(false);
  // const [listActionDropVisible, setListActionDropVisible] = useState(false);
  const [board, setBoard] = useState("");
  // let boardName;

  useEffect(() => {
    setBoard(
      listOfBoards.filter((board) => {
        return board.id === id;
      })
    );
    // fetchLists();
    getListsOfABoard(id, handleData, setHandleError);
  }, [id]);

  function handleData(data) {
    setListsInBoard(data);
  }

  if (handleError) {
    return <div>{handleError}</div>;
  }

  return (
    <>
      <div
        id='lists-body'
        className='relative h-dvh w-dvw bg-pink-800 flex text-white overflow-y-hidden'
      >
        <div
          id='side-navbar'
          className=' z-10 desktop: w-2/12 flex flex-col justify-start'
        >
          <div className='flex items-center p-3 border-b desktop: h-14'>
            <div className=' text-xl bg-gradient-to-r from-emerald-700 to-emerald-500 text-white font-bold my-2 w-8 h-8 text-center rounded-md items-center'>
              T
            </div>
            <div className='flex flex-col ms-3'>
              <h3 className=' text-sm font-bold'>Trello Workspace</h3>
              <h4 className='text-xs'>Free</h4>
            </div>
            {/* <div className=' ms-7 flex justify-center items-center'>&lt;</div> */}
          </div>
          <div className=' pt-3 px-3'>
            <div>
              <div className='flex items-center'>
                <svg
                  width='16'
                  height='16'
                  role='presentation'
                  focusable='false'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M3 5C3 3.89543 3.89543 3 5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5ZM5 6C5 5.44772 5.44772 5 6 5H10C10.5523 5 11 5.44772 11 6V16C11 16.5523 10.5523 17 10 17H6C5.44772 17 5 16.5523 5 16V6ZM14 5C13.4477 5 13 5.44772 13 6V12C13 12.5523 13.4477 13 14 13H18C18.5523 13 19 12.5523 19 12V6C19 5.44772 18.5523 5 18 5H14Z'
                    fill='currentColor'
                  ></path>
                </svg>
                <span className='ms-3 text-sm'>Boards</span>
              </div>
            </div>
          </div>
        </div>
        <div
          id='lists-container'
          className='desktop: w-10/12 bg-pink-800 overflow-y-hidden'
        >
          <header className='desktop: h-14 bg-white bg-opacity-5 flex items-center'>
            <div className='flex items-center'>
              {board.length !== 0 ? (
                <h3 className='text-xl font-bold mx-5'>{board[0].name}</h3>
              ) : (
                <></>
              )}
              <button className=' bg-slate-300 text-black font-medium rounded-md p-2'>
                Board
              </button>
              <div></div>
            </div>
          </header>
          <div
            id='lists'
            className=' h-5/6 pt-2 ps-3 flex gap-4 bg-emerald-600 overflow-x-auto'
          >
            {listsInBoard.map((list) => (
              <List
                key={list.id}
                listId={list.id}
                listName={list.name}
                setCardIdForCardDetail={setCardIdForCardDetail}
                setListNameInCardDetail={setListNameInCardDetail}
                setCardNameInCardDetail={setCardNameInCardDetail}
                isCardDetailVisible={isCardDetailVisible}
                setIsCardDetailVisible={setIsCardDetailVisible}
              />
            ))}
            <AddListDrop
              boardId={id}
              listsInBoard={listsInBoard}
              setListsInBoard={setListsInBoard}
            />
          </div>
        </div>
        {isCardDetailVisible ? (
          <CardDetail
            cardIdForCardDetail={cardIdForCardDetail}
            listNameInCardDetail={listNameInCardDetail}
            cardNameInCardDetail={cardNameInCardDetail}
            isCardDetailVisible={isCardDetailVisible}
            setIsCardDetailVisible={setIsCardDetailVisible}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Lists;
