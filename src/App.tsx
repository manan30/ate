import React from 'react';

const App = (): React.ReactElement => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-full p-4 bg-slate-300'>
      <div className='grid grid-cols-3 lg:max-w-screen-lg'>
        <div className='flex flex-col'>
          <div className='mb-2 text-3xl font-extrabold'>Vi</div>
          <div className='text-xl'>Vite</div>
        </div>
        <div className='flex flex-col'>
          <div className='mb-2 ml-1 text-3xl font-extrabold'>Re</div>
          <div className='text-xl'>React</div>
        </div>
        <div className='flex flex-col text-center'>
          <div className='mb-2 text-3xl font-extrabold'>Tail</div>
          <div className='text-xl'>Tailwind CSS</div>
        </div>
      </div>
      <div className='mt-6'>
        <ul className='tracking-wide list-disc'>
          <li>React</li>
          <li>Tailwind CSS v3</li>
          <li>Vite</li>
          <li>Eslint</li>
          <li>Prettier</li>
          <li>PNPM</li>
        </ul>
      </div>
    </div>
  );
};

export default App;
