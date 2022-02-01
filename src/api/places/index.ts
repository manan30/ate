import axios from 'redaxios';
import { generateServiceEndpoint, HERE_API_SERVICES } from './constants';
import type {
  AutoSuggestResponse,
  DiscoverResponse,
  AutoCompleteResponse,
  BrowseResponse,
  LookupResponse
} from './types';

const discoverServiceEndpoint = generateServiceEndpoint(
  HERE_API_SERVICES.SEARCH
);
const autoSuggestServiceEndpoint = generateServiceEndpoint(
  HERE_API_SERVICES.AUTOSUGGEST
);
const autoCompleteServiceEndpoint = generateServiceEndpoint(
  HERE_API_SERVICES.AUTOCOMPLETE
);
const browseServiceEndpoint = generateServiceEndpoint(HERE_API_SERVICES.BROWSE);
const lookupServiceEndpoint = generateServiceEndpoint(HERE_API_SERVICES.LOOKUP);

export const placesApiEndpoints = {
  discover: (searchTerm: string, coords: { lat: number; lng: number }) =>
    axios.get<DiscoverResponse>(discoverServiceEndpoint, {
      params: {
        q: searchTerm,
        at: `${coords.lat},${coords.lng}`,
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
    }),
  lookup: (id: string) =>
    axios.get<LookupResponse>(lookupServiceEndpoint, {
      params: {
        id,
        apiKey: import.meta.env.VITE_HERE_API_KEY?.toString() ?? ''
      }
    })
};
