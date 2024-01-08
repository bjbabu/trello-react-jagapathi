/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateBoard = (props) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiToken = import.meta.env.VITE_API_TOKEN;

  const navigate = useNavigate();
  const { isCreateBoardVisible, setIsCreateBoardVisible } = props;

  const [boardName, setBoardName] = useState("");

  function createBoardPost() {
    setIsCreateBoardVisible(!isCreateBoardVisible);
    fetch(
      `https://api.trello.com/1/boards/?name=${boardName}&key=${apiKey}&token=${apiToken}`,
      { method: "POST" }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Posting data failed");
        }
      })
      .then((data) => {
        navigate(`/boards/${data.id}`);
      });
  }

  return (
    <div className=' absolute w-72 px-2 bg-white rounded-md shadow-lg flex flex-col items-center text-sm -top-12 left-52'>
      <header className='w-full flex'>
        <div className='w-11/12'>
          <div className='text-center'>Create board</div>
        </div>
        <div>
          <button
            className=''
            onClick={() => {
              setIsCreateBoardVisible(!isCreateBoardVisible);
            }}
          >
            X
          </button>
        </div>
      </header>
      <div className=" w-52 h-32 bg-cover bg-center flex justify-center items-center bg-[url('https://images.unsplash.com/photo-1704504414486-292cc121cd0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3MDY2fDB8MXxjb2xsZWN0aW9ufDF8MzE3MDk5fHx8fHwyfHwxNzA0NzA0MjE1fA&ixlib=rb-4.0.3&q=80&w=400')]">
        <img src='https://trello.com/assets/14cda5dc635d1f13bc48.svg' alt='' />
      </div>

      <div className=' my-2'>
        <label htmlFor='' className='font-bold'>
          Board Title <span className='text-red-500'>*</span>
        </label>
        <input
          type='text'
          className=' w-full h-8 border-2 border-red-500 rounded-md'
          value={boardName}
          onChange={(e) => {
            setBoardName(e.target.value);
          }}
        />
        <label>Board title is required</label>
      </div>

      <div className=' my-2 w-full rounded-md'>
        <button
          className='w-full h-8 bg-slate-200 text-slate-500 rounded-md'
          style={
            boardName
              ? { backgroundColor: "blue", color: "white" }
              : { backgroundColor: "lightgray", color: "dimgray" }
          }
          disabled={boardName === ""}
          onClick={createBoardPost}
        >
          Create
        </button>
      </div>
    </div>
  );
};
export default CreateBoard;
