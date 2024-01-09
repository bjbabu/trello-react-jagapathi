/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ListActionsDrop from "./ListActionsDrop";
import Card from "./Card";

const List = (props) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiToken = import.meta.env.VITE_API_TOKEN;

  const { listId, listName } = props;

  const [cardsInList, setCardsInList] = useState([]);
  const [listActionDrop, setListActionDrop] = useState(false);
  const [isAddCardDrop, setIsAddCardDrop] = useState(false);

  useEffect(() => {
    fetchCardsInList();
  }, []);

  function fetchCardsInList() {
    fetch(
      `https://api.trello.com/1/lists/${listId}/cards?key=${apiKey}&token=${apiToken}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    )
      .then((response) => {
        console.log(`Response: ${response.status} ${response.statusText}`);
        return response.json();
      })
      .then((data) => {
        setCardsInList(data);
        // console.log(data);
      })
      .catch((err) => console.error(err));
  }

  console.log(cardsInList);

  return (
    <>
      <div className='w-72 bg-slate-100 p-2 rounded-md shadow-lg flex flex-col justify-center'>
        <header className='flex items-center justify-between ps-3 pe-2 desktop: h-5'>
          <h3 className='text-black font-medium'>{listName}</h3>
          {/* <input type='text' className=' bg-slate-300' /> */}
          <button
            className='text-slate-700 cursor-pointer'
            onClick={() => {
              setListActionDrop(!listActionDrop);
            }}
          >
            <div className='relative'>...</div>
            {listActionDrop ? (
              <ListActionsDrop
                listId={listId}
                listActionDrop={listActionDrop}
                setListActionDrop={setListActionDrop}
              />
            ) : (
              <></>
            )}
          </button>
        </header>

        <div id='cards' className='my-3'>
          {cardsInList.map((card) => {
            <Card key={card.id} cardName={card.name} />;
          })}
        </div>

        <footer className='flex text-black mt-4 '>
          {isAddCardDrop ? (
            <div className=' w-full'>
              <textarea
                name=''
                id=''
                rows={3}
                className='w-full p-2 placeholder:text-sm outline-none rounded-md shadow-lg focus'
                placeholder='Enter a title for this card...'
              ></textarea>
              <div>
                <button className=' bg-blue-600 px-2 py-1 text-white text-sm font-medium rounded-md focus:clear-none'>
                  Add card
                </button>
                <span
                  className='text-sm font-medium m-2 cursor-pointer'
                  onClick={() => {
                    setIsAddCardDrop(!isAddCardDrop);
                  }}
                >
                  X
                </span>
              </div>
            </div>
          ) : (
            <div
              className=' w-full ps-3 flex items-center text-slate-600 text-sm cursor-pointer rounded-md hover:bg-slate-300'
              onClick={() => {
                setIsAddCardDrop(!isAddCardDrop);
              }}
            >
              <div className=' text-xl'>+</div>
              <div className='mx-3'>Add a card</div>
            </div>
          )}
        </footer>
      </div>
    </>
  );
};

export default List;
