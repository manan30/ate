import { Fragment, useState } from 'react';
import { Transition } from '@headlessui/react';
import BaseInput from '../../../components/BaseInput';
import useAutoSuggest from '../../../hooks/here-api/useAutoSuggest';
import PlacesSearchSuggestionItem from './PlacesSearchSuggestionItem';

const PlacesSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { autoSuggestData, isLoading } = useAutoSuggest(searchTerm);

  return (
    <>
      <div className='relative w-1/2'>
        <BaseInput
          name='autoSuggestSearch'
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder='Search for a place, address, or attraction'
          loading={isLoading}
        />
        <Transition
          show={autoSuggestData.length > 0}
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          {autoSuggestData.length > 0 ? (
            <div className='absolute flex flex-col w-full py-2 mt-2 space-y-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
              {autoSuggestData.map((autoSuggestItem) => (
                <PlacesSearchSuggestionItem
                  key={autoSuggestItem.id}
                  item={autoSuggestItem}
                />
              ))}
            </div>
          ) : (
            <></>
          )}
        </Transition>
      </div>
    </>
  );
};

export default PlacesSearch;
