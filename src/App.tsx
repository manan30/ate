import React, { useEffect, useState } from 'react';
import useHereSearch from './api/places/hooks/useHereSearch';

const App = (): React.ReactElement => {
  const [searchTerm, setSearchTerm] = useState('');
  const { discoverData, error } = useHereSearch(searchTerm);

  useEffect(() => {
    // console.log(error);
  }, [error]);

  return (
    <div className='flex flex-col items-center justify-center w-full h-full p-4 bg-slate-100'>
      <div className='flex items-center mb-6'>
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
      <pre>{JSON.stringify(discoverData, null, 2)}</pre>
    </div>
  );
};

export default App;
