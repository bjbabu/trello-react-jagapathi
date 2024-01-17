/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import { Context } from "../App";
import Task from "./Task";
import {
  deletingCheckListInACard,
  gettingCheckItems,
  creatingCheckItems,
} from "./API";
import { archiveCheckList } from "../redux/checkListsSlice";
import { addCheckitem } from "../redux/checkitemsSlice";

const CheckListBody = (props) => {
  const { cardIdForCardDetail, checkListId, checkListName } = props;

  const dispatch = useDispatch();

  // const [checkItemsList, dispatchCheckItems] = useReducer(reducer, []);

  const [listOfBoards, setListOfBoards, handleError, setHandleError] =
    useContext(Context);

  const [isTaskAddVisible, setIsTaskAddVisible] = useState(true);
  const [checkItemName, setCheckItemName] = useState("");
  const [totalCheckedItems, setTotalCheckedItems] = useState(0);

  useEffect(() => {
    dispatch(gettingCheckItems(checkListId));
  }, []);

  const checkitemsData = useSelector((state) => state.checkitems.data);

  // if (checkitemsData[checkListId]) {
  //   setTotalCheckedItems(0);
  //   checkitemsData[checkListId].map((checkItem) => {
  //     if (checkItem.state === "complete") {
  //       setTotalCheckedItems((val) => val + 1);
  //     }
  //   });
  // }

  function handleCheckListArchive(data) {
    dispatch(
      archiveCheckList({
        cardId: cardIdForCardDetail,
        checkListId: checkListId,
      })
    );
  }

  function handleCreatingCheckItem(data) {
    setCheckItemName("");
    dispatch(addCheckitem({ id: checkListId, data: data }));
  }

  let width;
  // if (checkItemsList.length !== 0) {
  //   width = (totalCheckedItems / checkItemsList.length) * 100;
  //   width = Math.floor(width);
  //   width = width + "%";
  // }

  if (handleError) {
    return <div>{handleError}</div>;
  }

  return (
    <div className='my-10'>
      <header className='flex items-center'>
        <svg
          fill='none'
          height='14'
          viewBox='0 0 166 165'
          width='32'
          xmlns='http://www.w3.org/2000/svg'
          className=' flex-grow-0 fill-slate-500'
        >
          <path
            d='M140.48 42.2645C139.747 41.3742 137.253 41.7282 136.037 42.0403C135.037 42.4045 134.133 42.9949 133.398 43.7654C133.216 43.9272 133.035 44.0882 132.855 44.2414C106.655 66.44 81.2413 88.3469 58.3313 112.283C57.8716 112.763 57.387 113.215 56.716 113.844C56.367 114.17 55.9698 114.54 55.5023 114.983C52.6316 111.831 46.0679 104.392 40.7768 98.3971C37.9983 95.2497 35.5744 92.5031 34.2288 90.9936C33.4843 90.1256 32.7867 89.2184 32.139 88.276C31.6999 87.661 31.2452 87.024 30.7692 86.4203C29.8974 85.313 28.273 83.2559 25.9768 84.8392C24.031 86.187 24.7709 88.1022 25.6264 89.628C25.7264 89.8039 25.8243 89.9827 25.9215 90.1614C26.2685 90.8414 26.6719 91.4911 27.1274 92.1037C31.197 97.2479 44.0512 113.039 48.301 117.716C51.7186 121.475 53.9219 122.976 56.157 123.059C56.218 123.059 56.2798 123.059 56.3408 123.059C58.8945 123.059 61.5006 121.083 64.853 117.909C82.4968 101.195 98.4318 86.2721 113.569 72.2928C118.4 67.8303 123.454 63.4458 128.342 59.2046C131.363 56.5842 134.485 53.8744 137.525 51.1732C139.005 49.8595 140.382 48.5486 140.98 46.9816C141.486 45.6565 141.38 43.3562 140.48 42.2645Z'
            fill='black'
          />
          <path
            d='M126.966 164.261H119.903C118.214 163.856 116.499 163.573 114.77 163.414C99.4759 163.037 84.1808 162.615 68.8843 162.469C57.3644 162.359 45.8211 162.232 34.3245 162.823C12.9304 163.927 0.186098 146.952 1.73249 132.119C2.16875 127.938 1.78216 123.667 1.7247 119.438C1.37782 93.9058 0.95501 68.3747 0.710283 42.8408C0.656372 37.2078 0.652109 31.4705 1.60832 25.9518C3.87045 12.8996 15.643 3.63052 30.1727 3.22832C53.1097 2.5899 76.0545 2.24084 98.9936 1.67903C108.871 1.43714 118.753 1.14778 128.615 0.568239C144.304 -0.353922 160.005 8.05619 162.27 26.6519C163.858 39.6778 164.768 52.8391 165.045 65.9601C165.512 88.0714 165.308 110.199 165.246 132.319C165.208 145.626 154.023 159.291 140.867 162.148C136.296 163.143 131.603 163.574 126.966 164.261ZM79.2749 154.969C85.0328 155.232 90.7877 155.587 96.5484 155.74C109.33 156.077 122.092 157.911 134.901 155.674C147.63 153.45 157.478 142.928 157.432 131.348C157.359 113.112 157.355 94.8758 157.42 76.6402C157.463 61.1237 157.593 45.6654 154.582 30.2746C151.798 16.0428 143.165 9.20244 128.625 9.11306C106.743 8.97899 84.8576 9.29538 62.9768 9.77349C52.4074 10.0047 41.8302 10.7971 31.2998 11.7916C23.5835 12.5208 16.5183 15.0603 12.6033 22.5887C9.73731 28.2624 8.29648 34.5487 8.40538 40.9042C8.42028 70.0814 8.73526 99.2601 8.526 128.439C8.40683 144.998 17.9306 155.081 34.4444 154.983C49.3884 154.893 64.3317 154.963 79.2749 154.969V154.969Z'
            fill='black'
          />
        </svg>
        <h2 className=' mx-2 flex-grow font-semibold'>{checkListName}</h2>
        <button
          className=' flex-grow-0 bg-slate-200 text-sm font-medium px-2 py-1 rounded-md'
          onClick={() => {
            deletingCheckListInACard(
              checkListId,
              handleCheckListArchive,
              setHandleError
            );
          }}
        >
          Delete
        </button>
      </header>
      <div id='bar' className='flex my-2 items-center pe-0'>
        {checkitemsData[checkListId] &&
        checkitemsData[checkListId].length !== 0 ? (
          <div className='flex-grow-0 text-xs px-2'>{width}</div>
        ) : (
          <div className='flex-grow-0 text-xs px-2'>0%</div>
        )}
        <div className='w-full mx-2 h-2 bg-slate-200 rounded-md'>
          {checkitemsData[checkListId] &&
          checkitemsData[checkListId].length !== 0 ? (
            <div
              className='w-full bg-slate-200 h-2 rounded-md'
              style={
                width === "100%"
                  ? { width: `${width}`, backgroundColor: "green" }
                  : { width: `${width}`, backgroundColor: "rgb(21, 120, 205)" }
              }
            ></div>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div id='tasks'>
        {checkitemsData[checkListId] &&
          checkitemsData[checkListId].map((checkItem) => (
            <Task
              key={checkItem.id}
              cardIdForCardDetail={cardIdForCardDetail}
              checkListId={checkListId}
              itemId={checkItem.id}
              taskName={checkItem.name}
              taskState={checkItem.state}
              setTotalCheckedItems={setTotalCheckedItems}
              // handleUpdateCheckItem={handleUpdateCheckItem}
            />
          ))}
      </div>

      {isTaskAddVisible ? (
        <div className='mx-8 w-11/12'>
          <textarea
            autoFocus
            // cols='45'
            rows='2'
            placeholder='Add an item'
            className='p-2 w-full placeholder:text-black rounded text-sm outline-none border-2 focus:border-blue-500'
            value={checkItemName}
            onChange={(e) => {
              setCheckItemName(e.target.value);
            }}
          ></textarea>
          <div>
            <button
              disabled={checkItemName === "" || checkItemName.trim() === ""}
              className='bg-blue-500 px-2 py-1 text-white text-sm font-medium rounded'
              onClick={() => {
                creatingCheckItems(
                  checkListId,
                  checkItemName,
                  handleCreatingCheckItem,
                  setHandleError
                );
              }}
            >
              Add
            </button>
            <button
              className='mx-2 px-2 py-1 text-sm font-semibold hover:bg-slate-200 rounded'
              onClick={() => {
                setIsTaskAddVisible(!isTaskAddVisible);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          className='mx-8 text-sm font-medium bg-slate-200 p-2 rounded-md'
          onClick={() => {
            setIsTaskAddVisible(true);
          }}
        >
          Add an item
        </button>
      )}
    </div>
  );
};

export default CheckListBody;
