import React from 'react';

const Modal: React.FC = ({ children }) => {
  return (
    <div className='fixed inset-0 grid w-full h-full bg-slate-600 opacity-30 place-items-center'>
      <div className='p-4 rounded-md shadow-md bg-slate-100'>{children}</div>
    </div>
  );
};

export default Modal;
