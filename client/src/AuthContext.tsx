import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  userToken: string | null;
  loginContext: (token: string) => void;
  logoutContext: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export const AuthProvider: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    // Check for an existing token in local storage or cookies
    const storedToken = localStorage.getItem('userToken');
    if (storedToken) {
      setUserToken(storedToken);
    }
  }, []);

  const loginContext = (token: string) => {
    // Store the token in context and local storage
    setUserToken(token);
    localStorage.setItem('userToken', token);
  };

  const logoutContext = () => {
    // Clear the token from context and local storage
    setUserToken(null);
    localStorage.removeItem('userToken');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!userToken, userToken, loginContext, logoutContext }}>
      {children}
    </AuthContext.Provider>
  );
};
