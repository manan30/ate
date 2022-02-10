import Auth from '../Auth';

const Header = () => {
  return (
    <header className='flex items-center w-full px-8 py-3 bg-orange-500'>
      <span className='text-lg tracking-wide md:text-xl text-orange-50'>
        ATE
      </span>
      <Auth />
    </header>
  );
};

export default Header;
