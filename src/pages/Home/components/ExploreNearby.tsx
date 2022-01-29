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
      <section className='mx-2 h-full overflow-hidden'>
        <h2 className='my-6 text-lg font-medium text-slate-700'>
          Explore Nearby
        </h2>
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 h-[calc(100%-3rem)] overflow-y-auto w-[100%-0.5rem]'>
          {isLoading || !userLocation.position ? (
            <LoadingCards />
          ) : (
            browseData.map((item) => (
              <div className='mx-1' key={item.id}>
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
