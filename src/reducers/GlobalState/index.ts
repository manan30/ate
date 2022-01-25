import { useReducer } from 'react';
import { GlobalState, GlobalDispatch } from './types';

const defaultState: GlobalState = {
  userLocation: { error: null, position: null }
};

export const globalStateReducer = (
  state: GlobalState,
  dispatch: GlobalDispatch
): GlobalState => {
  switch (dispatch.type) {
    default:
      throw new Error(`Unhandled action type: ${dispatch.type}`);
  }
};

export const useGlobalStateReducer = () =>
  useReducer(globalStateReducer, defaultState);
