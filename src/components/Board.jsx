/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

const Board = (props) => {
  const navigate = useNavigate();

  const { boardId, boardName, bgImage, bgColor } = props;

  return (
    <li className='mb-4 mr-4 '>
      <div
        onClick={() => {
          navigate(`/boards/${boardId}`);
        }}
        className=' h-24 w-48 p-2 flex flex-col justify-between rounded-md bg-cover bg-center'
        style={
          bgImage
            ? {
                backgroundImage: `URL(${bgImage})`,
                backgroundRepeat: "no-repeat",
              }
            : { backgroundColor: bgColor }
        }
      >
        <div className=' text-white font-medium'>{boardName}</div>
        <div>Star</div>
      </div>
    </li>
  );
};

export default Board;
