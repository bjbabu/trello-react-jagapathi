/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { deletingCheckItem, updatingCheckItem } from "./API";
import { deleteCheckItem, updateCheckItem } from "../redux/checkitemsSlice";
import { useDispatch } from "react-redux";

const Task = (props) => {
  const { cardIdForCardDetail, checkListId, itemId, taskName, taskState } =
    props;

  const dispatch = useDispatch();

  useEffect(() => {
    updatingCheckItem(cardIdForCardDetail, itemId, taskState);
  }, [taskState]);

  function handleDeleteCheckItem(data) {
    dispatch(
      deleteCheckItem({ checkListId: checkListId, checkItemId: itemId })
    );
  }

  // if (handleError) {
  //   return <div>{handleError}</div>;
  // }

  return (
    <div className='ps-2 flex items-center my-2 '>
      <input
        defaultChecked={taskState === "complete" ? true : false}
        type='checkbox'
        name=''
        id=''
        className=' w-4 h-4 flex-grow-0 cursor-pointer'
        onClick={() => {
          dispatch(
            updateCheckItem({ checkListId: checkListId, checkItemId: itemId })
          );
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
            deletingCheckItem(checkListId, itemId, handleDeleteCheckItem);
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
