import React from 'react';
import Header from './components/Header';
import RequestUserLocation from './components/RequestUserLocation';
import Home from './pages/Home';

const App = (): React.ReactElement => {
  return (
    <>
      <Header />
      <main className='w-full h-[calc(100%-3.3rem)] px-4 mx-auto sm:max-w-xl md:max-w-3xl lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl pt-4'>
        <Home />
      </main>
      <RequestUserLocation />
    </>
  );
};

export default App;
