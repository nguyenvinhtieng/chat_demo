import { useState, createContext } from 'react';
import UserContext from './User';

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const state = {
      loading: [loading, setLoading],
      userAPI: UserContext()
    }
    return (
      <GlobalState.Provider value={state}>
          {children}
      </GlobalState.Provider>
    )
}

