import React from 'react';
import { AutoSuggestItem } from '../../../api/places/types';

type PlacesSearchSuggestionItemProps = {
  item: AutoSuggestItem;
};

const PlacesSearchSuggestionItem: React.FC<PlacesSearchSuggestionItemProps> = ({
  item
}) => {
  return (
    <button className='p-0 px-3 py-1 text-left focus:outline-none focus:bg-orange-50 hover:bg-orange-50 group'>
      <div className='mb-1 font-medium text-gray-800 group-focus:text-orange-800 group-hover:text-orange-800'>
        {item.title}
      </div>
      <div className='text-xs truncate text-slate-500 group-focus:text-orange-400 group-hover:text-orange-400'>
        {item.address?.label}
      </div>
    </button>
  );
};

export default PlacesSearchSuggestionItem;
