export enum HERE_API_SERVICES {
  'AUTOSUGGEST' = 'autosuggest',
  'AUTOCOMPLETE' = 'autocomplete',
  'SEARCH' = 'discover',
  'BROWSE' = 'browse',
  'LOOKUP' = 'lookup'
}

const PROTOCOL = 'https://';
const API_BASE_URL = 'search.hereapi.com';
const VERSION = 'v1';

export const generateServiceEndpoint = (service: HERE_API_SERVICES) =>
  `${PROTOCOL}${service}.${API_BASE_URL}/${VERSION}/${service}`;
