import { useQuery } from 'react-query';
import { placesApiEndpoints } from '../../api/places';
import { useGlobalState } from '../../providers/GlobalState';

const useDiscover = (searchTerm: string) => {
  const { userLocation } = useGlobalState();
  const { data, isLoading, error } = useQuery(
    ['discover', searchTerm],
    async () =>
      await placesApiEndpoints.discover(searchTerm, {
        lat: userLocation.position?.latitude ?? 0,
        lng: userLocation.position?.longitude ?? 0
      }),
    { enabled: !!(userLocation.position && searchTerm !== '') }
  );

  const discoverData = data?.data;

  return { isLoading, error, discoverData };
};

export default useDiscover;
