import { useQuery } from 'react-query';
import { placesApiEndpoints } from '../../api/places';

const useAutoSuggest = (searchTerm: string) => {
  const { data, isLoading, error } = useQuery(
    ['discover', searchTerm],
    async () => await placesApiEndpoints.autoSuggest(searchTerm)
  );

  const autoSuggestData = data?.data ?? {};

  return { isLoading, error, autoSuggestData };
};

export default useAutoSuggest;
