import axios from 'redaxios';
import { generateServiceEndpoint, HERE_API_SERVICES } from './constants';
import type {
  AutoSuggestResponse,
  DiscoverResponse,
  AutoCompleteResponse,
  BrowseResponse
} from './types';

const searchServiceEndpoint = generateServiceEndpoint(HERE_API_SERVICES.SEARCH);
const autoSuggestServiceEndpoint = generateServiceEndpoint(
  HERE_API_SERVICES.AUTOSUGGEST
);
const autoCompleteServiceEndpoint = generateServiceEndpoint(
  HERE_API_SERVICES.AUTOCOMPLETE
);
const browseServiceEndpoint = generateServiceEndpoint(HERE_API_SERVICES.BROWSE);

export const placesApiEndpoints = {
  search: (searchTerm: string) =>
    axios.get<DiscoverResponse>(searchServiceEndpoint, {
      params: {
        q: searchTerm,
        in: 'circle:42.36309,-71.05495;r=150',
        apiKey: import.meta.env.VITE_HERE_API_KEY?.toString() ?? ''
      }
    }),
  autoSuggest: (searchTerm: string, coords: { lat: number; lng: number }) =>
    axios.get<AutoSuggestResponse>(autoSuggestServiceEndpoint, {
      params: {
        q: searchTerm,
        at: `${coords.lat},${coords.lng}`,
        apiKey: import.meta.env.VITE_HERE_API_KEY?.toString() ?? ''
      }
    }),
  autoComplete: (searchTerm: string) =>
    axios.get<AutoCompleteResponse>(autoCompleteServiceEndpoint, {
      params: {
        q: searchTerm,
        apiKey: import.meta.env.VITE_HERE_API_KEY?.toString() ?? ''
      }
    }),
  browse: (coords: { lat: number; lng: number }) =>
    axios.get<BrowseResponse>(browseServiceEndpoint, {
      params: {
        at: `${coords.lat},${coords.lng}`,
        categories: '100-1000,300-3000,600-6100,!100-1000-0009',
        foodTypes: '202,208,102',
        apiKey: import.meta.env.VITE_HERE_API_KEY?.toString() ?? ''
      }
    })
};
