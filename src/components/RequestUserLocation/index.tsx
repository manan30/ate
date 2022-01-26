import { useEffect, useState } from 'react';
import { useGlobalState } from '../../providers/GlobalState';
import UserLocationModal from './UserLocationModal';

const RequestUserLocation = () => {
  const [showModal, setShowModal] = useState(false);
  const { userLocation } = useGlobalState();

  useEffect(() => {
    if (userLocation.error) setShowModal(true);
    else setShowModal(false);
  }, [userLocation.error]);

  return showModal ? (
    <UserLocationModal confirmActionHandler={() => setShowModal(false)} />
  ) : null;
};

export default RequestUserLocation;
