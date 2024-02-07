/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { archivingListsOfABoard } from "./API";
import { useDispatch, useSelector } from "react-redux";

const ListActionsDrop = (props) => {
  const { listId, listActionDrop, setListActionDrop } = props;

  const archivingOp = useSelector((state) => state.operations.deleting);

  const listsLoading = useSelector((state) => state.lists.loading);
  const listsError = useSelector((state) => state.lists.error);

  const dispatch = useDispatch();

  return (
    <div className='absolute z-10 w-72 bg-white mt-2 rounded-md shadow-lg p-2 flex flex-col'>
      {listsError && archivingOp ? (
        <div className='text-red-600'>Error while archiving!</div>
      ) : listsLoading && archivingOp ? (
        <div>Archiving...</div>
      ) : (
        <>
          <header className='text-sm font-medium flex justify-between'>
            <div className=''>List Actions</div>
            <div
              className='right-0 mx-3 cursor-pointer'
              onClick={() => {
                setListActionDrop(!listActionDrop);
              }}
            >
              X
            </div>
          </header>

          <div
            className=' hover:bg-slate-200 hover:rounded-md'
            onClick={() => {
              dispatch(
                archivingListsOfABoard(
                  listId,
                  listActionDrop,
                  setListActionDrop
                )
              );
            }}
          >
            Archive this list
          </div>
        </>
      )}
    </div>
  );
};

export default ListActionsDrop;
