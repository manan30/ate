import { useQuery } from 'react-query';
import { placesApiEndpoints } from '../../api/places';

const useLookup = (lookupId: string) => {
  const { data, isLoading, error } = useQuery(
    ['lookup', lookupId],
    async () => await placesApiEndpoints.lookup(lookupId),
    {
      enabled: !!(lookupId && lookupId !== '')
    }
  );

  const lookupData = data?.data;

  return { isLoading, error, lookupData };
};

export default useLookup;
