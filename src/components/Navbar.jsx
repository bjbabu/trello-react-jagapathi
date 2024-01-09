import { Button } from "@mui/material";
import { Avatar } from "@mui/material";

const Navbar = () => {
  return (
    <>
      <div
        id='navbar'
        className=' relative z-10 w-dvw desktop: h-12 p-2 bg-inherit brdr-btm-color border-b border-solid flex items-center justify-between'
      >
        <a className='h-8 w-20 flex justify-center items-center'>
          <div className='logo'></div>
        </a>
        <div>
          <div>
            <Button
              className=' bg-blue-600 text-sm font-bold capitalize'
              variant='contained'
            >
              Create
            </Button>
          </div>
        </div>

        <div className='flex items-center'>
          <div className=' flex items-center'>
            <svg width='16' height='16' viewBox='0 0 24 24' role='presentation'>
              <path
                d='M16.436 15.085l3.94 4.01a1 1 0 01-1.425 1.402l-3.938-4.006a7.5 7.5 0 111.423-1.406zM10.5 16a5.5 5.5 0 100-11 5.5 5.5 0 000 11z'
                fill='currentColor'
                fillRule='evenodd'
              ></path>
            </svg>
            <input
              type='text'
              placeholder='Search'
              className='h-7 border-2 outline-none rounded-md'
            ></input>
          </div>
          <div>
            <Avatar className=' bg-orange-600 h-6 w-6 m-2 text-xs'>Jb</Avatar>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
