/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../App";
import CheckListPop from "./CheckListPop";
import CheckListBody from "./CheckListBody";
import { deletingACardInAList, gettingChecklistsInACard } from "./API";

const CardDetail = (props) => {
  const {
    cardIdForCardDetail,
    listNameInCardDetail,
    cardNameInCardDetail,
    isCardDetailVisible,
    setIsCardDetailVisible,
  } = props;

  const [listOfBoards, setListOfBoards, handleError, setHandleError] =
    useContext(Context);

  const [isCheckListPopVisible, setIsCheckListPopVisible] = useState(false);
  const [listOfCheckLists, setListOfCheckLists] = useState([]);
  const [checkListName, setCheckListName] = useState("Checklist");
  const [handleCheckListDelete, setHandleCheckListDelete] = useState("");

  useEffect(() => {
    gettingChecklistsInACard(cardIdForCardDetail, handleData, setHandleError);
  }, [cardIdForCardDetail, handleCheckListDelete]);

  function handleData(data) {
    setListOfCheckLists(data);
  }

  if (handleError) {
    return <div>{handleError}</div>;
  }

  return (
    <>
      <div className='absolute z-20 w-dvw h-dvh bg-black/65 flex justify-center items-center'>
        <div className='z-20 w-4/12 h-5/6 bg-slate-100 text-slate-700 -mt-10 rounded-md shadow-md shadow-slate-200/70'>
          <header className='flex p-5 items-start'>
            <div className=' flex-grow-0 pt-1'>
              <svg
                width='24px'
                height='24px'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M12 7.9502H12.01M15 7.9502H15.01M18 7.9502H18.01M6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V8.2C21 7.0799 21 6.51984 20.782 6.09202C20.5903 5.71569 20.2843 5.40973 19.908 5.21799C19.4802 5 18.9201 5 17.8 5H6.2C5.0799 5 4.51984 5 4.09202 5.21799C3.71569 5.40973 3.40973 5.71569 3.21799 6.09202C3 6.51984 3 7.07989 3 8.2V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.07989 19 6.2 19Z'
                  stroke='#000000'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
            <div className=' flex-grow ps-3'>
              <h3 className='font-semibold text-xl'>{cardNameInCardDetail}</h3>{" "}
              <h4 className='text-sm'>
                in List{" "}
                <span className=' underline'>{listNameInCardDetail}</span>
              </h4>
            </div>
            <div
              className='flex-grow-0 pt-1 text-lg font-medium cursor-pointer'
              onClick={() => {
                setIsCardDetailVisible(!isCardDetailVisible);
              }}
            >
              X
            </div>
          </header>
          <div id='content' className='flex p-2'>
            <div className='w-9/12 pe-5 flex flex-col'>
              {listOfCheckLists.map((checklist) => (
                <CheckListBody
                  key={checklist.id}
                  cardIdForCardDetail={cardIdForCardDetail}
                  checkListId={checklist.id}
                  checkListName={checklist.name}
                  setHandleCheckListDelete={setHandleCheckListDelete}
                />
              ))}
            </div>
            <div className='w-3/12 h-12'>
              <h4 className='text-xs font-semibold'>Add to card</h4>
              <div className=' text-slate-800 text-sm font-medium'>
                <div className='relative p-1 bg-slate-200 rounded-md my-2 flex items-center cursor-pointer'>
                  <span
                    className='flex items-center'
                    onClick={() => {
                      setIsCheckListPopVisible(!isCheckListPopVisible);
                    }}
                  >
                    <svg
                      fill='none'
                      height='14'
                      viewBox='0 0 166 165'
                      width='32'
                      xmlns='http://www.w3.org/2000/svg'
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
                    Checklist
                  </span>

                  {isCheckListPopVisible ? (
                    <CheckListPop
                      // addCheckLists={addCheckLists}
                      listOfCheckLists={listOfCheckLists}
                      setListOfCheckLists={setListOfCheckLists}
                      cardIdForCardDetail={cardIdForCardDetail}
                      checkListName={checkListName}
                      setCheckListName={setCheckListName}
                      isCheckListPopVisible={isCheckListPopVisible}
                      setIsCheckListPopVisible={setIsCheckListPopVisible}
                    />
                  ) : (
                    <></>
                  )}
                </div>
                <div
                  className='p-1 bg-slate-200 rounded-md my-2 flex items-center cursor-pointer'
                  onClick={() => {
                    deletingACardInAList(
                      cardIdForCardDetail,
                      setIsCardDetailVisible,
                      setHandleError
                    );
                  }}
                >
                  <svg
                    height='18'
                    viewBox='0 0 48 48'
                    width='32'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path d='M41.09 10.45l-2.77-3.36c-.56-.66-1.39-1.09-2.32-1.09h-24c-.93 0-1.76.43-2.31 1.09l-2.77 3.36c-.58.7-.92 1.58-.92 2.55v25c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4v-25c0-.97-.34-1.85-.91-2.55zm-17.09 24.55l-11-11h7v-4h8v4h7l-11 11zm-13.75-25l1.63-2h24l1.87 2h-27.5z' />
                    <path d='M0 0h48v48h-48z' fill='none' />
                  </svg>
                  Archive
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CardDetail;
