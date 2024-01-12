/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";

/* eslint-disable no-unused-vars */
const YourBoards = (props) => {
  const { urlId, boardId, boardName, backgroundColor, backgroundImage } = props;
  return (
    <>
      <Link to={`/boards/${boardId}`}>
        <div
          className='flex px-3 py-2 items-center'
          style={
            urlId === boardId
              ? { backgroundColor: "rgba(255, 255, 255,0.3)" }
              : {}
          }
        >
          <div
            className=' h-5 w-6 bg-white me-2 bg-cover bg-center bg-no-repeat rounded-sm'
            style={{
              backgroundColor: backgroundColor,
              backgroundImage: `url(${backgroundImage})`,
            }}
          ></div>
          <span className=' text-sm font-normal'>{boardName}</span>
        </div>
      </Link>
    </>
  );
};

export default YourBoards;
