/* eslint-disable react/prop-types */
import { useState } from "react";

const AddListDrop = (props) => {
  const { boardId, listsInBoard, setListsInBoard } = props;

  const apiKey = import.meta.env.VITE_API_KEY;
  const apiToken = import.meta.env.VITE_API_TOKEN;

  const [isDrop, setIsDrop] = useState(false);
  const [listName, setListName] = useState("");

  function addingNewList() {
    setIsDrop(!isDrop);
    setListName("");
    fetch(
      `https://api.trello.com/1/lists?name=${listName}&idBoard=${boardId}&key=${apiKey}&token=${apiToken}`,
      {
        method: "POST",
      }
    )
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error("Failed to create list");
      })
      .then((data) => setListsInBoard([...listsInBoard, data]));
  }

  return (
    <>
      <div
        className=' w-72 bg-slate-100 p-1 rounded-md shadow-lg flex justify-center items-center'
        style={
          isDrop
            ? { height: "5rem", backgroundColor: "rgba(236,236,236,1)" }
            : { height: "2rem", backgroundColor: "rgba(236,236,236,0.3)" }
        }
      >
        {isDrop ? (
          <div>
            <input
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
                onClick={addingNewList}
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
            className='flex justify-center items-center text-sm font-medium cursor-pointer'
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
