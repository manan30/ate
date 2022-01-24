import { useEffect, useMemo, useState } from 'react';

const defaultSettings: PositionOptions = {
  enableHighAccuracy: false,
  timeout: Infinity,
  maximumAge: 0
};

type Position = {
  latitude: number;
  longitude: number;
  accuracy: number;
  speed: number | null;
  heading: number | null;
  timestamp: number;
};

const usePosition = (watch = false, userSettings: PositionOptions = {}) => {
  const settings: PositionOptions = useMemo(
    () => ({ ...defaultSettings, ...userSettings }),
    [userSettings]
  );

  const [position, setPosition] = useState<Position | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onChange = ({
    coords,
    timestamp
  }: {
    coords: GeolocationCoordinates;
    timestamp: number;
  }) => {
    setPosition({
      latitude: coords.latitude,
      longitude: coords.longitude,
      accuracy: coords.accuracy,
      speed: coords.speed,
      heading: coords.heading,
      timestamp
    });
  };

  const onError = (error: GeolocationPositionError) => {
    setError(error.message);
  };

  useEffect(() => {
    if (!navigator || !navigator.geolocation) {
      setError('Geolocation is not supported');
      return;
    }

    if (watch) {
      const watcher = navigator.geolocation.watchPosition(onChange, onError);
      return () => navigator.geolocation.clearWatch(watcher);
    }

    navigator.geolocation.getCurrentPosition(onChange, onError, settings);
  }, [watch, settings]);

  return { position, error };
};

export default usePosition;
