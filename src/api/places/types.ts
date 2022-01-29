/* eslint-disable @typescript-eslint/no-explicit-any */
export enum ResultType {
  'place' = 'place',
  'locality' = 'locality',
  'street' = 'street',
  'houseNumber' = 'houseNumber',
  'administrativeArea' = 'administrativeArea',
  'addressBlock' = 'addressBlock',
  'intersection' = 'intersection',
  'postalCodePoint' = 'postalCodePoint',
  'chainQuery' = 'chainQuery',
  'categoryQuery' = 'categoryQuery'
}

export type Category = {
  id: string;
  name: string;
  primary?: boolean;
};

export type FoodType = Category;

export type Position = { lat: string; lng: string };

export type DiscoverItem = {
  resultType: ResultType;
  title: string;
  address?: Record<string, any>;
  position: Position;
  access?: Array<Record<string, any>>;
  id: string;
  categories?: Array<Category>;
  foodTypes?: Array<FoodType>;
  contacts?: Array<Record<string, any>>;
  openingHours?: Array<Record<string, any>>;
};

export type AutoSuggestItem = {
  resultType: ResultType;
  title: string;
  id: string;
  href?: string;
  highlights?: Record<string, any>;
  position?: Position;
  access?: Array<Record<string, any>>;
  distance?: number;
  address?: { label: string };
  categories?: Array<Category>;
  foodTypes?: Array<FoodType>;
  chains?: Array<Record<string, any>>;
};

export type AutoCompleteItem = {
  resultType: ResultType;
  houseNumberType?: string;
  title: string;
  address?: Record<string, any>;
  id: string;
  language?: string;
  highlights?: Record<string, any>;
};

export type BrowseItem = {
  id: string;
  position: Position;
  title?: string;
  resultType?: ResultType;
  categories?: Array<Category>;
  foodTypes?: Array<FoodType>;
  distance?: number;
  address?: Record<string, any>;
  contacts?: Array<Record<string, any>>;
  openingHours?: Array<Record<string, any>>;
};

export type LookupItem = {
  resultType: ResultType;
  title: string;
  address: Record<string, any>;
  position: Position;
  access: Array<Record<string, any>>;
  id: string;
  categories: Array<Category>;
  foodTypes: Array<FoodType>;
  chains: Array<Record<string, any>>;
  contacts: Array<Record<string, any>>;
  openingHours: Array<Record<string, any>>;
};

export type DiscoverResponse = {
  items: Array<DiscoverItem>;
};

export type AutoSuggestResponse = {
  items: Array<AutoSuggestItem>;
};

export type AutoCompleteResponse = {
  items: Array<AutoCompleteItem>;
};

export type BrowseResponse = {
  items: Array<BrowseItem>;
};

export type LookupResponse = {
  items: BrowseItem;
};
