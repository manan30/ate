import React, { useState } from 'react';

const App = (): React.ReactElement => {
  const [, setSearchTerm] = useState('');

  return (
    <div className='flex flex-col items-center justify-center w-full h-full p-4 bg-slate-100'>
      <div className='flex items-center'>
        <input
          className='px-4 py-2 mr-6 border rounded-md shadow-md'
          onChange={(e) => {
            setSearchTerm(e.currentTarget.value);
          }}
        />
        <button className='p-1 text-sm rounded-md bg-cyan-600 text-slate-50'>
          Search
        </button>
      </div>
    </div>
  );
};

export default App;
