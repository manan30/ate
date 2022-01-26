import React from 'react';
import Loader from '../Loader';

type BaseInputProps = {
  value: string;
  name: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  className?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  loading?: boolean;
};

const BaseInput: React.FC<BaseInputProps> = ({
  value,
  name,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  type = 'text',
  loading
}) => {
  return (
    <div className='flex w-full px-3 py-2 space-x-6 text-sm transition-shadow ease-out bg-white border rounded-md focus-within:shadow-sm focus-within:ring-1 focus-within:ring-orange-500'>
      <input
        name={name}
        type={type}
        value={value}
        onChange={(e) => {
          onChange(e.currentTarget.value);
        }}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder ?? 'Enter value'}
        className='flex-1 block leading-tight text-gray-700 focus:outline-none'
      />
      {loading ? (
        <div className='ml-auto'>
          <Loader size={20} />
        </div>
      ) : null}
    </div>
  );
};

export default BaseInput;
