import React, { useState } from 'react';
import { AiOutlineGoogle } from 'react-icons/ai';
import { supabase } from '../../services/supabase';
import Input from '../Input';
import Button from '../Button';
import Modal from '../Modal';

type ModalProps = { show: boolean; onClose: () => void };

const AuthModal: React.FC<ModalProps> = ({ show, onClose }) => {
  const [formValues, setFormValues] = useState({ username: '', password: '' });
  const signInWithGoogle = async () => {
    await supabase.auth.signIn({
      provider: 'google'
    });
  };

  const onChangeHandler = (name: string, value: string) => {
    setFormValues((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <Modal show={show} cancelAction={{ handler: onClose, text: '' }}>
      <div className='flex flex-col p-2 space-y-6'>
        <form className='flex flex-col space-y-3'>
          <Input
            value={formValues.username}
            name='username'
            onChange={(value) => {
              onChangeHandler('username', value);
            }}
            placeholder='abc@xyz.com'
          />
          <Input
            value={formValues.username}
            name='username'
            onChange={(value) => {
              onChangeHandler('username', value);
            }}
            type='password'
            placeholder='Strong Password'
          />
          <Button className='h-8' type='submit'>
            Proceed
          </Button>
        </form>
        <div className='flex items-center w-full space-x-4'>
          <hr className='w-full h-1' />
          <span className='-mt-1 text-sm font-medium text-gray-400'>OR</span>
          <hr className='w-full h-1' />
        </div>
        <Button onClickHandler={signInWithGoogle}>
          <div className='flex items-center justify-center space-x-3 '>
            <AiOutlineGoogle className='w-6 h-6 text-orange-400' />
            <span>Proceed with Google</span>
          </div>
        </Button>
      </div>
    </Modal>
  );
};

export default AuthModal;
