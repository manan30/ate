import React from 'react';
import RequestUserLocation from './components/RequestUserLocation';

const App = (): React.ReactElement => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-full p-4 bg-slate-100'>
      <RequestUserLocation />
    </div>
  );
};

export default App;
