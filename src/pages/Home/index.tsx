import ExploreNearby from './components/ExploreNearby';
import PlacesSearch from './components/PlacesSearch';

const Home = () => {
  return (
    <div className='w-full md:w-[80%] md:mx-[10%] h-full overflow-hidden flex flex-col'>
      <PlacesSearch />
      <ExploreNearby />
    </div>
  );
};

export default Home;
