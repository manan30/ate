import React from 'react';
import { AiOutlineGoogle } from 'react-icons/ai';
import { supabase } from '../../services/supabase';
import Button from '../Button';
import Modal from '../Modal';

type ModalProps = { show: boolean; onClose: () => void };

const AuthModal: React.FC<ModalProps> = ({ show, onClose }) => {
  const signInWithGoogle = async () => {
    await supabase.auth.signIn({
      // provider can be 'github', 'google', 'gitlab', and more
      provider: 'google'
    });
  };

  return (
    <Modal show={show} cancelAction={{ handler: onClose, text: '' }}>
      <div className='grid py-2 place-items-center'>
        <Button onClickHandler={signInWithGoogle}>
          <div className='flex items-center space-x-3'>
            <AiOutlineGoogle className='w-6 h-6 text-orange-400' />
            <span>Login with Google</span>
          </div>
        </Button>
      </div>
    </Modal>
  );
};

export default AuthModal;
