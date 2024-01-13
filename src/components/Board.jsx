/* eslint-disable react/prop-types */

const Board = (props) => {
  const { boardName, bgImage, bgColor } = props;

  return (
    <li className='mb-4 mr-4 '>
      <div
        className='h-24 w-48 p-2 flex flex-col justify-between rounded-md bg-cover bg-center'
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
        {/* <div className='hover-animate-star'>Star</div> */}
      </div>
    </li>
  );
};

export default Board;
