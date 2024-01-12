/* eslint-disable react/prop-types */
import { useState } from "react";
import { archivingListsOfABoard } from "./API";

const ListActionsDrop = (props) => {
  // const apiKey = import.meta.env.VITE_API_KEY;
  // const apiToken = import.meta.env.VITE_API_TOKEN;

  const { listId, listActionDrop, setListActionDrop } = props;
  const [handleError, setHandleError] = useState("");

  // function archivingList() {
  //   fetch(
  //     `https://api.trello.com/1/lists/${listId}/closed?key=${apiKey}&token=${apiToken}&value=true`,
  //     {
  //       method: "PUT",
  //     }
  //   )
  //     .then((response) => {
  //       console.log(`Response: ${response.status} ${response.statusText}`);
  //       return response.text();
  //     })
  //     .then(() => setListActionDrop(!listActionDrop))
  //     .catch((err) => console.error(err));
  // }

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
          archivingListsOfABoard(listId, setHandleError);
        }}
      >
        Archive this list
      </div>
    </div>
  );
};

export default ListActionsDrop;
