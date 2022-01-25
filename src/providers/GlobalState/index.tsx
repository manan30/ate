import React, { useContext } from 'react';
import { useGlobalStateReducer } from '../../reducers/GlobalState';
import { GlobalDispatch, GlobalState } from '../../reducers/GlobalState/types';

const GlobalStateContext = React.createContext<GlobalState | null>(null);
const GlobalDispatchContext =
  React.createContext<React.Dispatch<GlobalDispatch> | null>(null);

const GlobalStateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useGlobalStateReducer();
  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
};

export default GlobalStateProvider;

export const useGlobalState = () => useContext(GlobalStateContext);
export const useGlobalDispatch = () => useContext(GlobalDispatchContext);
