import React, { useContext } from 'react';
import { useGlobalStateReducer } from '../../reducers/GlobalState';
import { GlobalDispatch, GlobalState } from '../../reducers/GlobalState/types';

const GlobalStateContext = React.createContext<GlobalState>({} as GlobalState);
const GlobalDispatchContext =
  React.createContext<React.Dispatch<GlobalDispatch> | null>(null);

const GlobalStateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useGlobalStateReducer();
  return (
    <GlobalDispatchContext.Provider value={dispatch}>
      <GlobalStateContext.Provider value={state}>
        {children}
      </GlobalStateContext.Provider>
    </GlobalDispatchContext.Provider>
  );
};

export default GlobalStateProvider;

export const useGlobalState = () => useContext(GlobalStateContext);
export const useGlobalDispatch = () => useContext(GlobalDispatchContext);
