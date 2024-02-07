/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import List from "./List";
import AddListDrop from "./AddListDrop";
import CardDetail from "./CardDetail";
import YourBoards from "./YourBoards";
import { getListsOfABoard } from "./API";
import { useDispatch, useSelector } from "react-redux";

const Lists = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const boardsData = useSelector((state) => state.boards.data);

  const fetchingOp = useSelector((state) => state.operations.fetching);

  const listsLoading = useSelector((state) => state.lists.loading);
  const listsData = useSelector((state) => state.lists.data);
  const listsError = useSelector((state) => state.lists.error);

  const [cardIdForCardDetail, setCardIdForCardDetail] = useState("");
  const [listIdInCardDetail, setListIdInCardDetail] = useState("");
  const [isCardDetailVisible, setIsCardDetailVisible] = useState(false);

  const board = boardsData.filter((board) => {
    return board.id === id;
  });

  useEffect(() => {
    dispatch(getListsOfABoard(id));
  }, []);

  return (
    <>
      <div
        id='lists-body'
        className='relative h-dvh w-dvw flex text-white bg-center bg-cover bg-no-repeat'
        style={
          board.length !== 0
            ? {
                backgroundColor: board[0].prefs.backgroundTopColor,
                backgroundImage: `url(${board[0].prefs.backgroundImage})`,
              }
            : {}
        }
      >
        <div
          id='side-navbar'
          className=' z-10 mt-12 desktop: w-2/12 flex flex-col justify-start'
          style={
            board.length !== 0
              ? {
                  backgroundColor: board[0].prefs.backgroundBottomColor,
                }
              : {}
          }
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
          <div
            id='your-boards'
            className=' w-full flex flex-col justify-between'
          >
            <header className='flex justify-between items-center my-2'>
              <h3 className='text-sm font-semibold'>Your boards</h3>{" "}
              <span className=' text-2xl font-normal self-center'>+</span>
            </header>
            {boardsData.map((board) => (
              <YourBoards
                key={board.id}
                urlId={id}
                boardId={board.id}
                boardName={board.name}
                backgroundColor={board.prefs.backgroundColor}
                backgroundImage={board.prefs.backgroundImage}
              />
            ))}
          </div>
        </div>
        <div
          id='lists-container'
          className=' mt-12 desktop: w-10/12 overflow-y-hidden'
        >
          <header className='desktop: h-14 bg-black bg-opacity-5 backdrop-blur-sm flex items-center'>
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
            className=' desktop: h-5/6 pt-2 ps-3 flex gap-4 bg-transparent overflow-x-auto'
            style={
              board.length !== 0
                ? {
                    ...board[0].prefs,
                  }
                : {}
            }
          >
            {listsLoading && fetchingOp ? (
              <div>Loading Lists..</div>
            ) : fetchingOp && listsError !== "" ? (
              <div className=' text-red-600'>{listsError}</div>
            ) : (
              <>
                {listsData.map((list) => (
                  <List
                    key={list.id}
                    listId={list.id}
                    setListIdInCardDetail={setListIdInCardDetail}
                    listName={list.name}
                    setCardIdForCardDetail={setCardIdForCardDetail}
                    setIsCardDetailVisible={setIsCardDetailVisible}
                  />
                ))}
                <AddListDrop boardId={id} />
              </>
            )}
          </div>
        </div>
        {isCardDetailVisible ? (
          <CardDetail
            cardIdForCardDetail={cardIdForCardDetail}
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
