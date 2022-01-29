import React from 'react';
import useLookup from '../../hooks/here-api/useLookup';
import Modal from '../Modal';

type PlaceDetailsCardProps = {
  placeId: string;
  handleClose: () => void;
};

const PlaceDetailsCard: React.FC<PlaceDetailsCardProps> = ({
  placeId,
  handleClose
}) => {
  const { lookupData } = useLookup(placeId);
  return (
    <Modal cancelAction={{ text: 'Close', handler: handleClose }}>
      <pre>{JSON.stringify(lookupData, null, 2)}</pre>
    </Modal>
  );
};

export default PlaceDetailsCard;
