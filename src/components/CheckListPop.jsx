/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import { useState } from "react";
import { useState } from "react";
import { useContext } from "react";
import { Context } from "../App";
import { creatingCheckListsInACard } from "./API";

const CheckListPop = (props) => {
  const {
    handleCheckListCreation,
    cardIdForCardDetail,
    checkListName,
    setCheckListName,
    isCheckListPopVisible,
    setIsCheckListPopVisible,
  } = props;

  const [listOfBoards, setListOfBoards, handleError, setHandleError] =
    useContext(Context);

  if (handleError) {
    return <div>{handleError}</div>;
  }

  return (
    <div className='absolute ps-2 w-72 top-48 bg-white rounded-md shadow-md'>
      <header className=' h-10 flex items-center'>
        <h3 className=' flex-grow text-center'>Add checklist</h3>
        <div
          className=' flex-grow-0 pe-5 cursor-pointer'
          onClick={() => {
            setIsCheckListPopVisible(!isCheckListPopVisible);
          }}
        >
          X
        </div>
      </header>
      <div id='container' className='py-2'>
        <div className='flex flex-col'>
          <label className='text-xs font-medium'>Title</label>
          <div className='my-2 pe-2'>
            <input
              autoFocus
              type='text'
              placeholder='Checklist'
              className='w-full h-9 p-2 border-2 border-slate-400 rounded-md text-sm outline-none focus:border-blue-600'
              disabled={checkListName === "" || checkListName.trim() === ""}
              value={checkListName}
              onChange={(e) => {
                setCheckListName(e.target.value);
              }}
            />
          </div>
        </div>

        <button
          className=' bg-blue-600 text-white font-semibold px-7 py-2 rounded-md'
          onClick={() => {
            creatingCheckListsInACard(
              cardIdForCardDetail,
              checkListName,
              handleCheckListCreation,
              setIsCheckListPopVisible,
              setCheckListName,
              setHandleError
            );
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default CheckListPop;
