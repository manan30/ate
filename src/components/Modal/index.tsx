import React, { Fragment, useState } from 'react';
import Button from '../Button';
import { Dialog, Transition } from '@headlessui/react';

type ModalProps = {
  Title?: string | React.ReactElement;
  size?: 'small' | 'medium' | 'large';
  cancelAction?: { text: string; handler: () => void };
  confirmAction?: { text: string; handler: () => void };
};

const Modal: React.FC<ModalProps> = ({
  Title,
  cancelAction,
  confirmAction,
  children
}) => {
  const [enableTransition, setEnableTransition] = useState(true);

  return (
    <Transition
      appear
      show={enableTransition}
      as={Fragment}
      afterLeave={() => {
        if (cancelAction?.handler) cancelAction.handler();
        if (confirmAction?.handler) confirmAction.handler();
      }}
    >
      <Dialog
        as='div'
        className='fixed inset-0 z-[100] overflow-hidden'
        onClose={() => setEnableTransition(false)}
      >
        <div className='min-h-screen px-4 text-center'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Dialog.Overlay className='fixed inset-0 bg-slate-700/30' />
          </Transition.Child>

          <span
            className='inline-block h-screen align-middle'
            aria-hidden='true'
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter='ease-out duration-[400ms]'
            enterFrom='opacity-0 scale-50'
            enterTo='opacity-100 scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 scale-100'
            leaveTo='opacity-0 scale-50'
          >
            <div className='inline-block w-full h-full max-w-md px-6 py-4 my-8 overflow-hidden text-left align-middle transition-all transform rounded-md shadow-md bg-slate-100 max-h-[70vh]'>
              {Title ? (
                <Dialog.Title
                  as='h3'
                  className='text-lg font-medium leading-6 text-orange-600'
                >
                  {Title}
                </Dialog.Title>
              ) : null}
              <Dialog.Description
                as='div'
                className='h-full overflow-hidden overflow-y-auto max-h-modal-description'
              >
                {children}
              </Dialog.Description>
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
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
