/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { archivingListsOfABoard } from "./API";

const ListActionsDrop = (props) => {
  const {
    listId,
    listActionDrop,
    setListActionDrop,
    handleChange,
    setHandleChange,
  } = props;
  const [handleError, setHandleError] = useState("");

  if (handleError) {
    return <div>Error while archiving the list!!!</div>;
  }

  return (
    <div className='absolute z-10 w-72 bg-white mt-2 rounded-md shadow-lg p-2 flex flex-col'>
      <header className='text-sm font-medium flex justify-between'>
        <div className=''>List Actions</div>
        <div
          className='right-0 mx-3 cursor-pointer'
          onClick={() => {
            setListActionDrop(!listActionDrop);
          }}
        >
          X
        </div>
      </header>
      <div
        className=' hover:bg-slate-200 hover:rounded-md'
        onClick={() => {
          archivingListsOfABoard(
            listId,
            listActionDrop,
            setListActionDrop,
            handleChange,
            setHandleChange,
            setHandleError
          );
        }}
      >
        Archive this list
      </div>
    </div>
  );
};

export default ListActionsDrop;
