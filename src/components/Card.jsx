/* eslint-disable react/prop-types */
const Card = (props) => {
  const { cardName } = props;

  return (
    <div className='w-full p-2 bg-white text-slate-700 text-sm rounded-md drop-shadow-lg'>
      {cardName}
    </div>
  );
};

export default Card;
