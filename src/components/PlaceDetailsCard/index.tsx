import React from 'react';
import Modal from '../Modal';

type PlaceDetailsCardProps = {
  placeId: () => void;
  handleClose: () => void;
};

const PlaceDetailsCard: React.FC<PlaceDetailsCardProps> = ({ handleClose }) => {
  return <Modal cancelAction={{ text: 'Close', handler: handleClose }}></Modal>;
};

export default PlaceDetailsCard;
