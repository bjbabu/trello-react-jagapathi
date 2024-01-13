/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useRef, useState, useEffect } from "react";
import { useContext } from "react";
import { Context } from "../App";
import { creatingList } from "./API";

const AddListDrop = (props) => {
  const { boardId, listsInBoard, setListsInBoard } = props;

  const [listOfBoards, setListOfBoards, handleError, setHandleError] =
    useContext(Context);

  const [isDrop, setIsDrop] = useState(false);
  const [listName, setListName] = useState("");

  function handleData(data) {
    setIsDrop(!isDrop);
    setListName("");
    setListsInBoard([...listsInBoard, data]);
  }

  if (handleError) {
    return <div>{handleError}</div>;
  }

  return (
    <>
      <div
        className=' w-72 bg-slate-100 p-1 rounded-md shadow-lg flex justify-center items-center self-start flex-shrink-0'
        style={
          isDrop
            ? { height: "5rem", backgroundColor: "rgba(236,236,236,1)" }
            : { height: "2rem", backgroundColor: "rgba(236,236,236,0.3)" }
        }
      >
        {isDrop ? (
          <div>
            <input
              autoFocus
              type='text'
              placeholder='Enter list title...'
              className=' border-2 border-blue-700 rounded-md ps-2 text-black'
              value={listName}
              onChange={(e) => {
                setListName(e.target.value);
              }}
            />
            <div>
              <button
                className=' bg-blue-600 p-2 rounded-md m-1'
                disabled={listName === ""}
                onClick={() => {
                  creatingList(boardId, listName, handleData, setHandleError);
                }}
              >
                Add list
              </button>
              <span
                className='m-2 text-slate-700 cursor-pointer'
                onClick={() => {
                  setIsDrop(!isDrop);
                }}
              >
                X
              </span>
            </div>
          </div>
        ) : (
          <div
            onClick={() => {
              setIsDrop(!isDrop);
            }}
            className='flex justify-center items-center text-sm font-medium cursor-pointer text-slate-800'
          >
            <div className=' text-xl'>+</div>
            <div className='mx-3'>Add another list</div>
          </div>
        )}
      </div>
    </>
  );
};

export default AddListDrop;
