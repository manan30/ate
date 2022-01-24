import { useQuery } from 'react-query';
import { placesApiEndpoints } from '../../api/places';

const useAutoComplete = (searchTerm: string) => {
  const { data, isLoading, error } = useQuery(
    ['auto-complete', searchTerm],
    async () => await placesApiEndpoints.autoComplete(searchTerm)
  );

  const autoCompleteData = data?.data;

  return { isLoading, error, autoCompleteData };
};

export default useAutoComplete;
