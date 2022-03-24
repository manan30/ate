import Auth from '../Auth';

const Header = () => {
  return (
    <header className='flex items-center w-full px-8 py-3 pt-4 mx-auto sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl'>
      <div className='w-full md:w-[80%] md:mx-[10%] flex items-center'>
        <span className='text-lg tracking-wide text-orange-500 md:text-2xl font-bolder'>
          Wanderer
        </span>
        <Auth />
      </div>
    </header>
  );
};

export default Header;
