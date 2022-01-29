import React, { Fragment, useState } from 'react';
import cn from 'classnames';
import Button from '../Button';
import { Transition } from '@headlessui/react';

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
  const [enableTransition, setEnableTransition] = useState(true);

  return (
    <div className='fixed inset-0 w-full h-full z-[100]'>
      <div className='fixed inset-0 w-full h-full bg-slate-600 opacity-30'></div>
      <Transition
        appear
        show={enableTransition}
        as={Fragment}
        enter='transform transition duration-[400ms] ease-in-out'
        enterFrom='opacity-0 scale-50'
        enterTo='opacity-100 scale-100'
        leave='transform duration-200 transition ease-in'
        leaveFrom='opacity-100 scale-100'
        leaveTo='opacity-0 scale-50'
        afterLeave={() => {
          if (cancelAction?.handler) cancelAction.handler();
          if (confirmAction?.handler) confirmAction.handler();
        }}
      >
        <div className='fixed inset-0 grid w-full h-full place-items-center'>
          <div
            className={cn(
              'p-4 rounded-md m-8 shadow-md bg-slate-100 text-sm md:text-base max-h-[70%] overflow-hidden flex flex-col',
              size === 'small' && 'w-1/2 md:w-[30%]',
              size === 'medium' && 'w-3/5',
              size === 'large' && 'w-4/5 md:w-[70%]'
            )}
          >
            <div className='overflow-hidden overflow-y-auto'>{children}</div>
            <div className='flex items-center justify-end mt-4 space-x-4'>
              {cancelAction ? (
                <Button
                  variant='default'
                  className='min-w-[1.5rem] text-slate-600 hover:text-slate-700'
                  onClickHandler={() => setEnableTransition(false)}
                >
                  {cancelAction.text}
                </Button>
              ) : null}
              {confirmAction ? (
                <Button
                  variant='link'
                  className='min-w-[1.5rem]'
                  onClickHandler={() => setEnableTransition(false)}
                >
                  {confirmAction.text}
                </Button>
              ) : null}
            </div>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default Modal;
