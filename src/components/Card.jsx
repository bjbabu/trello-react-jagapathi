/* eslint-disable react/prop-types */

const Card = (props) => {
  const {
    cardId,
    cardName,
    setCardIdForCardDetail,
    setCardNameInCardDetail,
    isCardDetailVisible,
    setIsCardDetailVisible,
  } = props;

  return (
    <>
      <div
        className='w-full p-2 bg-white text-slate-700 text-sm rounded-md drop-shadow-lg my-1 border-2 border-white hover:border-blue-500 cursor-pointer'
        onClick={() => {
          setCardIdForCardDetail(cardId);
          setCardNameInCardDetail(cardName);
          setIsCardDetailVisible(!isCardDetailVisible);
        }}
      >
        {cardName}
      </div>
    </>
  );
};

export default Card;
