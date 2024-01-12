/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import Board from "./Board";
import BoardShimmer from "./BoardShimmer";
import CreateBoard from "./CreateBoard";
import { Context } from "../App";
import { getBoards } from "./API";
import { Link } from "react-router-dom";

const BoardsBody = () => {
  const id = import.meta.env.VITE_ID;

  const [listOfBoards, setListOfBoards, handleError, setHandleError] =
    useContext(Context);

  const [isCreateBoardVisible, setIsCreateBoardVisible] = useState(false);

  useEffect(() => {
    getBoards(id, handleData, setHandleError);
  }, []);

  function handleData(data) {
    setListOfBoards(data);
  }

  if (handleError) {
    return <div>{handleError}</div>;
  }

  return (
    <>
      <div className='relative desktop: w-dvw h-dvh flex justify-center'>
        <div id='side-navbar' className=' mt-24 w-64 px-4'>
          <div>
            <ul>
              <li className='flex h-10 bg-blue-300 items-center rounded-md text-blue-700 font-semibold'>
                <span>
                  <img
                    src='vite/trello-react-jagapathi/src/assets/trello-logo-svgrepo-com.svg'
                    alt=''
                  />
                </span>
                <span>Boards</span>
              </li>
            </ul>
          </div>
        </div>
        <div id='boards-bar' className='w-7/12 mt-24 mx-4 flex flex-wrap'>
          <div>
            <h3 className=' text-slate-600 font-semibold'>YOUR WORKSPACES</h3>
            <div>
              <div className=' h-8 flex items-center mb-3'>
                <div className=' text-xl bg-gradient-to-r from-emerald-700 to-emerald-500 text-white font-bold m-2 w-7 h-7 text-center rounded-md '>
                  T
                </div>
                <h3 className='font-semibold'>Trello Workspace</h3>
              </div>
              <div className=''>
                {listOfBoards.length !== 0 ? (
                  <ul className=' flex flex-wrap'>
                    {listOfBoards.map((board) => (
                      <Link key={board.id} to={`/boards/${board.id}`}>
                        <Board
                          key={board.id}
                          boardName={board.name}
                          bgImage={board.prefs.backgroundImage}
                          bgColor={board.prefs.backgroundColor}
                        />
                      </Link>
                    ))}
                    <li className=' relative mb-4'>
                      <div
                        className=' h-24 w-48 p-2 bg-slate-200 flex flex-col justify-center items-center rounded-md bg-cover bg-center'
                        onClick={() => {
                          setIsCreateBoardVisible(!isCreateBoardVisible);
                        }}
                      >
                        <div className=' text-slate-600 font-normal'>
                          {" "}
                          Create new board
                        </div>
                        <div className='text-sm text-slate-600 '>
                          {10 - listOfBoards.length} remaining
                        </div>
                      </div>

                      {isCreateBoardVisible && (
                        <CreateBoard
                          isCreateBoardVisible={isCreateBoardVisible}
                          setIsCreateBoardVisible={setIsCreateBoardVisible}
                        />
                      )}
                    </li>
                  </ul>
                ) : (
                  <ul className=' flex flex-wrap gap-4'>
                    <BoardShimmer />
                    <BoardShimmer />
                    <BoardShimmer />
                    <BoardShimmer />
                    <BoardShimmer />
                    <BoardShimmer />
                    <BoardShimmer />
                    <BoardShimmer />
                    <BoardShimmer />
                    <BoardShimmer />
                    <BoardShimmer />
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BoardsBody;
