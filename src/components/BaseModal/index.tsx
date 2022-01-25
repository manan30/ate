import React from 'react';
import cn from 'classnames';
import Button from '../Button';

type ModalProps = {
  size?: 'small' | 'medium' | 'large';
  cancelAction?: { text: string; handler: () => void };
  confirmAction?: { text: string; handler: () => void };
};

const Modal: React.FC<ModalProps> = ({
  size = 'medium',
  cancelAction,
  confirmAction,
  children
}) => {
  return (
    <div className='fixed inset-0 w-full h-full'>
      <div className='fixed inset-0 w-full h-full bg-slate-600 opacity-30'></div>
      <div className='fixed inset-0 grid w-full h-full place-items-center'>
        <div
          className={cn(
            'p-4 rounded-md m-8 shadow-md bg-slate-100 text-sm md:text-base',
            size === 'small' && 'w-1/2 md:w-[30%]',
            size === 'medium' && 'w-3/5',
            size === 'large' && 'w-4/5 md:w-[70%]'
          )}
        >
          {children}
          <div className='flex items-center justify-end mt-6 space-x-4'>
            {cancelAction ? (
              <Button
                variant='link'
                className='min-w-[1.5rem] text-slate-600 hover:text-slate-700'
                onClickHandler={cancelAction.handler}
              >
                {cancelAction.text}
              </Button>
            ) : null}
            {confirmAction ? (
              <Button
                variant='link'
                className='min-w-[1.5rem]'
                onClickHandler={confirmAction.handler}
              >
                {confirmAction.text}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
