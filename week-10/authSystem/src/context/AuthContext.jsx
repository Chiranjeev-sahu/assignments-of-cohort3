import { createContext } from 'react';
import { useAuthLogic } from '../hooks/useAuthLogic';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const value = useAuthLogic();

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}