import { useQuery } from 'react-query';
import { placesApiEndpoints } from '../../api/places';

const useSearch = (searchTerm: string) => {
  const { data, isLoading, error } = useQuery(
    ['discover', searchTerm],
    async () => await placesApiEndpoints.search(searchTerm),
    {
      enabled: false,
      retry: false
    }
  );

  const discoverData = data?.data;

  return { isLoading, error, discoverData };
};

export default useSearch;
