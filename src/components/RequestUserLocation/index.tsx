import { useEffect, useState } from 'react';
import usePosition from '../../hooks/browser-api/usePosition';
import { useGlobalState } from '../../providers/GlobalState';
import Modal from '../Modal';

const RequestUserLocation = () => {
  const locationPermissionMissing = !localStorage.getItem(
    'geolocation-permission'
  );
  const locationPermissionRevoked =
    localStorage.getItem('geolocation-permission') === 'revoked';

  const { userLocation } = useGlobalState();
  const [showLocationPermissionPrompt, setShowLocationPermissionPrompt] =
    useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (
      userLocation.error ||
      locationPermissionRevoked ||
      locationPermissionMissing
    ) {
      setShowModal(true);
    }
  }, [locationPermissionRevoked, userLocation, locationPermissionMissing]);

  useEffect(() => {
    if (locationPermissionRevoked && !userLocation.error) {
      setShowLocationPermissionPrompt(true);
    }
  }, [locationPermissionRevoked, userLocation.error]);

  useEffect(() => {
    if (userLocation.position) setShowModal(false);
  }, [userLocation.position]);

  usePosition(showLocationPermissionPrompt);

  return (
    <Modal
      show={showModal}
      title='Allow Location Access'
      size='small'
      disableOutsideClick
      confirmAction={
        locationPermissionMissing && !userLocation.error
          ? {
              text: 'Grant',
              handler: () => {
                setShowLocationPermissionPrompt(true);
                setShowModal(false);
              }
            }
          : undefined
      }
    >
      <div className='mt-2 text-sm text-slate-700 lg:text-base'>
        {userLocation.error
          ? 'It looks like you have denied access to location. Please go to Settings > Privacy > Location to enable it'
          : 'Please share your location to get the most accurate results'}
      </div>
    </Modal>
  );
};

export default RequestUserLocation;
