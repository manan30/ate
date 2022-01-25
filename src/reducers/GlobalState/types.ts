import type { Position } from '../../hooks/browser-api/types';

export type GlobalState = {
  userLocation: { error: string | null; position: Position | null };
};

export type GlobalDispatchTypes =
  | 'SET_USER_LOCATION'
  | 'SET_USER_LOCATION_ERROR';

export type UserLocationError = string | null;
export type UserLocationPosition = Position | null;

export type GlobalDispatchPayloads = UserLocationError | UserLocationPosition;

export type GlobalDispatch = {
  type: GlobalDispatchTypes;
  payload: GlobalDispatchPayloads;
};
