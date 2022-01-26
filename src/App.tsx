import React from 'react';
import RequestUserLocation from './components/RequestUserLocation';
import usePosition from './hooks/browser-api/usePosition';
import Home from './pages/Home';

const App = (): React.ReactElement => {
  usePosition();
  return (
    <div className='flex flex-col items-center justify-center w-full h-full p-4 bg-slate-100'>
      <Home />
      <RequestUserLocation />
    </div>
  );
};

export default App;
