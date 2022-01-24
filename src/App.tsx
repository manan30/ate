import React from 'react';
import Home from './pages/Home';

const App = (): React.ReactElement => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-full p-4 bg-slate-100'>
      <Home />
    </div>
  );
};

export default App;
