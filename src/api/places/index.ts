import axios from 'redaxios';
import { generateServiceEndpoint, HERE_API_SERVICES } from './constants';
import type {
  AutoSuggestResponse,
  DiscoverResponse,
  AutoCompleteResponse
} from './types';

const searchServiceEndpoint = generateServiceEndpoint(HERE_API_SERVICES.SEARCH);
const autoSuggestServiceEndpoint = generateServiceEndpoint(
  HERE_API_SERVICES.AUTOSUGGEST
);
const autoCompleteServiceEndpoint = generateServiceEndpoint(
  HERE_API_SERVICES.AUTOCOMPLETE
);

export const placesApiEndpoints = {
  search: (searchTerm: string) =>
    axios.get<DiscoverResponse>(searchServiceEndpoint, {
      params: {
        q: searchTerm,
        in: 'circle:42.36309,-71.05495;r=150',
        apiKey: import.meta.env.VITE_HERE_API_KEY?.toString() ?? ''
      }
    }),
  autoSuggest: (searchTerm: string) =>
    axios.get<AutoSuggestResponse>(autoSuggestServiceEndpoint, {
      params: {
        q: searchTerm,
        in: 'circle:42.36309,-71.05495;r=150',
        apiKey: import.meta.env.VITE_HERE_API_KEY?.toString() ?? ''
      }
    }),
  autoComplete: (searchTerm: string) =>
    axios.get<AutoCompleteResponse>(autoCompleteServiceEndpoint, {
      params: {
        q: searchTerm,
        apiKey: import.meta.env.VITE_HERE_API_KEY?.toString() ?? ''
      }
    })
};
