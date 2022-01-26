import { useQuery } from 'react-query';
import { placesApiEndpoints } from '../../api/places';
import { useGlobalState } from '../../providers/GlobalState';

const useBrowse = () => {
  const { userLocation } = useGlobalState();
  const { data, isLoading, error } = useQuery(
    ['browse'],
    async () =>
      await placesApiEndpoints.browse({
        lat: userLocation.position?.latitude ?? 0,
        lng: userLocation.position?.longitude ?? 0
      })
  );

  const browseData = data?.data.items ?? [];

  return { isLoading, error, browseData };
};

export default useBrowse;
