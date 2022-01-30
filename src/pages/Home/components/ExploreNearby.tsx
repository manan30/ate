import React, { useState } from 'react';
import { MdLocationOff } from 'react-icons/md';
import LoadingCards from '../../../components/Card/LoadingCards';
import useBrowse from '../../../hooks/here-api/useBrowse';
import { useGlobalState } from '../../../providers/GlobalState';
import ExploreNearbyCard from './ExploreNearbyCard';

const PlaceDetailsCard = React.lazy(
  () => import('../../../components/PlaceDetailsCard')
);

const ExploreNearby = () => {
  const { userLocation } = useGlobalState();
  const { browseData, isLoading } = useBrowse();

  const [currentPlaceId, setCurrentPlaceId] = useState<string | null>(null);
  const [showPlaceDetailsCard, setShowPlaceDetailsCard] = useState(false);

  return (
    <>
      <section className='flex flex-col h-full mx-2 overflow-hidden'>
        <h2 className='mt-6 mb-2 text-lg font-medium text-slate-700'>
          Explore Nearby
        </h2>
        <div className='grid flex-1 grid-cols-1 gap-4 mb-1 overflow-y-auto md:grid-cols-2 xl:grid-cols-3'>
          {isLoading || !userLocation.position ? (
            <LoadingCards />
          ) : (
            browseData.map((item) => (
              <div className='mx-1 my-2' key={item.id}>
                <ExploreNearbyCard
                  item={item}
                  handleTitleClick={() => {
                    setCurrentPlaceId(item.id);
                    setShowPlaceDetailsCard(true);
                  }}
                />
              </div>
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
      {showPlaceDetailsCard && currentPlaceId ? (
        <React.Suspense fallback={null}>
          <PlaceDetailsCard
            handleClose={() => setShowPlaceDetailsCard(false)}
            placeId={currentPlaceId}
          />
        </React.Suspense>
      ) : null}
    </>
  );
};

export default ExploreNearby;
