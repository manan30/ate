import { useReducer } from 'react';
import { Position } from '../../hooks/browser-api/types';
import { GlobalState, GlobalDispatch } from './types';

const defaultState: GlobalState = {
  userLocation: { error: null, position: null }
};

export const globalStateReducer = (
  state: GlobalState,
  dispatch: GlobalDispatch
): GlobalState => {
  switch (dispatch.type) {
    case 'SET_USER_LOCATION':
      return {
        ...state,
        userLocation: {
          position: dispatch.payload as Position,
          error: null
        }
      };
    case 'SET_USER_LOCATION_ERROR':
      return {
        ...state,
        userLocation: { position: null, error: dispatch.payload as string }
      };
    default:
      throw new Error(`Unhandled action type: ${dispatch.type}`);
  }
};

export const useGlobalStateReducer = () =>
  useReducer(globalStateReducer, defaultState);
