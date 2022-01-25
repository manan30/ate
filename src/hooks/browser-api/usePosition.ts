import { useCallback, useEffect, useMemo } from 'react';
import { useGlobalDispatch } from '../../providers/GlobalState';
import type { UserLocationPosition } from '../../reducers/GlobalState/types';

const defaultSettings: PositionOptions = {
  enableHighAccuracy: false,
  timeout: Infinity,
  maximumAge: 0
};

const usePosition = (watch = false, userSettings: PositionOptions = {}) => {
  const dispatch = useGlobalDispatch();
  const settings: PositionOptions = useMemo(
    () => ({ ...defaultSettings, ...userSettings }),
    [userSettings]
  );

  const onChange = useCallback(
    ({
      coords,
      timestamp
    }: {
      coords: GeolocationCoordinates;
      timestamp: number;
    }) => {
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
    (error: GeolocationPositionError) => {
      dispatch?.({ type: 'SET_USER_LOCATION_ERROR', payload: error.message });
    },
    [dispatch]
  );

  useEffect(() => {
    if (!navigator || !navigator.geolocation) {
      dispatch?.({
        type: 'SET_USER_LOCATION_ERROR',
        payload: 'Geolocation is not supported'
      });
      return;
    }

    if (watch) {
      const watcher = navigator.geolocation.watchPosition(onChange, onError);
      return () => navigator.geolocation.clearWatch(watcher);
    }

    navigator.geolocation.getCurrentPosition(onChange, onError, settings);
  }, [watch, settings, onChange, onError, dispatch]);
};

export default usePosition;
