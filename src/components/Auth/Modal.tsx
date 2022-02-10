import React from 'react';
import Modal from '../Modal';

type ModalProps = { show: boolean };

const AuthModal: React.FC<ModalProps> = ({ show }) => {
  return <Modal show={show}>Auth Modal</Modal>;
};

export default AuthModal;
