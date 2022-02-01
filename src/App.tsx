import React from 'react';
import RequestUserLocation from './components/RequestUserLocation';
import Home from './pages/Home';

const App = (): React.ReactElement => {
  return (
    <>
      <main className='w-full h-full p-4 mx-auto sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl'>
        <Home />
      </main>
      <RequestUserLocation />
    </>
  );
};

export default App;
