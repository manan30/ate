import { useCallback, useEffect } from 'react';
import { useGlobalDispatch } from '../../providers/GlobalState';
import type { UserLocationPosition } from '../../reducers/GlobalState/types';

const settings: PositionOptions = {
  enableHighAccuracy: true,
  timeout: Infinity,
  maximumAge: 0
};

const usePosition = (promptLocationPermissionDialog: boolean) => {
  const dispatch = useGlobalDispatch();
  const storedGeoLocationPermission = localStorage.getItem(
    'geolocation-permission'
  );

  const onChange = useCallback(
    ({
      coords,
      timestamp
    }: {
      coords: GeolocationCoordinates;
      timestamp: number;
    }) => {
      localStorage.setItem('geolocation-permission', 'granted');
      dispatch?.({
        type: 'SET_USER_LOCATION',
        payload: {
          latitude: coords.latitude,
          longitude: coords.longitude,
          accuracy: coords.accuracy,
          speed: coords.speed,
          heading: coords.heading,
          timestamp
        } as UserLocationPosition
      });
    },
    [dispatch]
  );

  const onError = useCallback(
    (error: GeolocationPositionError | { message: string }) => {
      localStorage.setItem('geolocation-permission', 'revoked');
      dispatch?.({ type: 'SET_USER_LOCATION_ERROR', payload: error.message });
    },
    [dispatch]
  );

  useEffect(() => {
    if (!navigator || !navigator.geolocation) {
      onError({
        message: 'Geolocation is not supported'
      });
      return;
    }

    if (storedGeoLocationPermission || promptLocationPermissionDialog) {
      navigator.geolocation.getCurrentPosition(onChange, onError, settings);
    }
  }, [
    onChange,
    onError,
    storedGeoLocationPermission,
    promptLocationPermissionDialog
  ]);
};

export default usePosition;
