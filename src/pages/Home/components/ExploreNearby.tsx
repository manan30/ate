import { MdLocationOff } from 'react-icons/md';
import LoadingCards from '../../../components/Card/LoadingCards';
import useBrowse from '../../../hooks/here-api/useBrowse';
import { useGlobalState } from '../../../providers/GlobalState';
import ExploreNearbyCard from './ExploreNearbyCard';

const ExploreNearby = () => {
  const { userLocation } = useGlobalState();
  const { browseData, isLoading } = useBrowse();

  return (
    <section className='w-full mt-6'>
      <h2 className='my-6 text-lg font-medium text-slate-700'>
        Explore Nearby
      </h2>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {isLoading || !userLocation.position ? (
          <LoadingCards />
        ) : (
          browseData.map((item) => (
            <ExploreNearbyCard key={item.id} item={item} />
          ))
        )}
      </div>
      {browseData.length === 0 && !isLoading && userLocation.position ? (
        <div className='grid place-items-center'>
          <MdLocationOff size={48} className='mb-6 text-red-600' />
          <h4 className='font-medium tracking-tight text-red-500'>
            Sorry no nearby places found that match the search criteria
          </h4>
        </div>
      ) : null}
    </section>
  );
};

export default ExploreNearby;
