import React, { useState, useCallback, useContext } from "react";
import Logger from "../util/logger";
const logger = Logger("providers/auth");

export const AuthContext = React.createContext();

export const AuthProvider = (props) => {
  const [isLogggedIn, setIsLogggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLogggedIn(true);
  }, [])

  const logout = useCallback(() => {
    setIsLogggedIn(false);
  }, [])

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isLogggedIn,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuth = () => useContext(AuthContext);
