import { useQuery } from 'react-query';
import { placesApiEndpoints } from '../../api/places';
import { useGlobalState } from '../../providers/GlobalState';

const useAutoSuggest = (searchTerm: string) => {
  const { userLocation } = useGlobalState();
  const { data, isLoading, error } = useQuery(
    ['auto-suggest', searchTerm],
    async () =>
      await placesApiEndpoints.autoSuggest(searchTerm, {
        lat: userLocation.position?.latitude ?? 0,
        lng: userLocation.position?.longitude ?? 0
      }),
    { enabled: searchTerm.length > 0 }
  );

  const autoSuggestData = data?.data.items ?? [];

  return { isLoading, error, autoSuggestData };
};

export default useAutoSuggest;
