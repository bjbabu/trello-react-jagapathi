/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../App";
import { deletingCheckItem, updatingCheckItem } from "./API";

const Task = (props) => {
  const {
    cardIdForCardDetail,
    checkListId,
    itemId,
    taskName,
    taskState,
    setTotalCheckedItems,
    handleDeleteCheckItem,
    handleUpdateCheckItem,
  } = props;

  const [listOfBoards, setListOfBoards, handleError, setHandleError] =
    useContext(Context);
  // const [taskStatus, setTaskStatus] = useState(taskState);

  useEffect(() => {
    updatingCheckItem(cardIdForCardDetail, itemId, taskState, setHandleError);
  }, [taskState]);

  if (handleError) {
    return <div>{handleError}</div>;
  }

  return (
    <div className='ps-2 flex items-center my-2 '>
      <input
        defaultChecked={taskState === "complete" ? true : false}
        type='checkbox'
        name=''
        id=''
        className=' w-4 h-4 flex-grow-0 cursor-pointer'
        onClick={() => {
          handleUpdateCheckItem(itemId);
          if (taskState === "complete") {
            setTotalCheckedItems((val) => val - 1);
          } else {
            setTotalCheckedItems((val) => val + 1);
          }
        }}
      />
      <div
        id='parent'
        className='ms-4 flex w-full rounded-md hover:bg-slate-200 cursor-pointer'
      >
        <div
          className='w-full text-black font-light'
          style={
            taskState === "complete"
              ? { textDecoration: "line-through" }
              : { textDecoration: "none" }
          }
        >
          {taskName}
        </div>
        <div
          className='ms-3'
          onClick={() => {
            deletingCheckItem(
              checkListId,
              itemId,
              // handleChange,
              // setHandleChange,
              handleDeleteCheckItem,
              setHandleError
            );
          }}
        >
          <svg
            id='child'
            height='20'
            viewBox='0 0 48 48'
            width='20'
            xmlns='http://www.w3.org/2000/svg'
            className=' fill-slate-400'
          >
            <path d='M12 38c0 2.21 1.79 4 4 4h16c2.21 0 4-1.79 4-4v-24h-24v24zm26-30h-7l-2-2h-10l-2 2h-7v4h28v-4z' />
            <path d='M0 0h48v48h-48z' fill='none' />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Task;
