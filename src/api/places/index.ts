import axios from 'redaxios';
import { generateServiceEndpoint } from './constants';
import { HERE_API_SERVICES } from './types';

const searchServiceEndpoint = generateServiceEndpoint(HERE_API_SERVICES.SEARCH);

export const placesApiEndpoints = {
  search: (searchTerm: string) =>
    axios.get<Array<Record<string, unknown>>>(searchServiceEndpoint, {
      params: {
        q: searchTerm,
        in: 'circle:42.36309,-71.05495;r=150',
        apiKey: import.meta.env.VITE_HERE_API_KEY?.toString() ?? ''
      }
    })
};
