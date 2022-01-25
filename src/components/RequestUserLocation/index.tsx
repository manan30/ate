import { useEffect, useState } from 'react';
import usePosition from '../../hooks/browser-api/usePosition';
import { useGlobalState } from '../../providers/GlobalState';
import UserLocationModal from './UserLocationModal';

const RequestUserLocation = () => {
  const [showModal, setShowModal] = useState(false);
  const { userLocation } = useGlobalState();

  usePosition();

  useEffect(() => {
    if (userLocation.error) setShowModal(true);
    else setShowModal(false);
  }, [userLocation.error]);

  return showModal ? (
    <UserLocationModal confirmActionHandler={() => setShowModal(false)} />
  ) : null;
};

export default RequestUserLocation;
