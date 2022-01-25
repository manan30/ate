import React from 'react';
import Modal from './components/Modal';
import Home from './pages/Home';

const App = (): React.ReactElement => {
  return (
    <div className='flex flex-col items-center justify-center w-full h-full p-4 bg-slate-100'>
      {/* <Home /> */}
      <Modal />
    </div>
  );
};

export default App;
