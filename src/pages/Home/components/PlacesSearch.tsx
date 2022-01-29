import { Fragment, useState } from 'react';
import { Transition } from '@headlessui/react';
import Input from '../../../components/Input';
import useAutoSuggest from '../../../hooks/here-api/useAutoSuggest';

const PlacesSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { autoSuggestData, isLoading } = useAutoSuggest(searchTerm);

  return (
    <div className='relative w-full'>
      <Input
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
              <button
                className='p-0 px-3 py-1 text-left focus:outline-none focus:bg-orange-50 hover:bg-orange-50 group'
                key={autoSuggestItem.id}
              >
                <div className='mb-1 font-medium text-gray-800 group-focus:text-orange-800 group-hover:text-orange-800'>
                  {autoSuggestItem.title}
                </div>
                <div className='text-xs truncate text-slate-500 group-focus:text-orange-400 group-hover:text-orange-400'>
                  {autoSuggestItem.address?.label}
                </div>
              </button>
            ))}
          </div>
        ) : (
          <></>
        )}
      </Transition>
    </div>
  );
};

export default PlacesSearch;
