import { UserCircleIcon } from '@heroicons/react/solid';

const Header = () => {
  return (
    <header className='flex items-center w-full px-4 py-3 bg-orange-500'>
      <span className='text-lg tracking-wide md:text-xl text-orange-50'>
        ATE
      </span>
      <UserCircleIcon className='w-6 h-6 ml-auto text-orange-100' />
    </header>
  );
};

export default Header;
