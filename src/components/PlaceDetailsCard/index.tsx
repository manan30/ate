import React from 'react';
import Modal from '../Modal';

type PlaceDetailsCardProps = {
  handleClose: () => void;
};

const PlaceDetailsCard: React.FC<PlaceDetailsCardProps> = ({ handleClose }) => {
  return <Modal cancelAction={{ text: 'Close', handler: handleClose }}></Modal>;
};

export default PlaceDetailsCard;
