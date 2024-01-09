/* eslint-disable react/prop-types */
const ListActionsDrop = (props) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const apiToken = import.meta.env.VITE_API_TOKEN;

  const { listId, listActionDrop, setListActionDrop } = props;

  function archivingList() {
    fetch(
      `https://api.trello.com/1/lists/${listId}/closed?key=${apiKey}&token=${apiToken}&value=true`,
      {
        method: "PUT",
      }
    )
      .then((response) => {
        console.log(`Response: ${response.status} ${response.statusText}`);
        return response.text();
      })
      .then((text) => console.log(text))
      .catch((err) => console.error(err));
  }

  return (
    <div className='absolute w-72 bg-white mt-2 rounded-md shadow-lg p-2 flex flex-col'>
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
        onClick={archivingList}
      >
        Archive this list
      </div>
    </div>
  );
};

export default ListActionsDrop;
