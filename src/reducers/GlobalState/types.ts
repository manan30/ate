import type { Position } from '../../hooks/browser-api/types';

export type GlobalState = {
  userLocation: { error: string | null; position: Position | null };
};

export type GlobalDispatchTypes = 'SET_USER_LOCATION';

export type GlobalDispatch = {
  type: GlobalDispatchTypes;
  payload: Partial<GlobalState>;
};
