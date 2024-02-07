/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { gettingChecklistsInACard } from "./API";
import { cardDetails } from "../redux/cardsSlice";

const Card = (props) => {
  const {
    listId,
    cardId,
    cardName,
    setCardIdForCardDetail,
    setIsCardDetailVisible,
  } = props;

  const dispatch = useDispatch();

  return (
    <>
      <div
        className='w-full p-2 bg-white text-slate-700 text-sm rounded-md drop-shadow-lg my-1 border-2 border-white hover:border-blue-500 cursor-pointer'
        onClick={() => {
          dispatch(cardDetails({ listId: listId, cardId: cardId }));
          setCardIdForCardDetail(cardId);
          setIsCardDetailVisible(true);
          dispatch(gettingChecklistsInACard(cardId));
        }}
      >
        {cardName}
      </div>
    </>
  );
};

export default Card;
