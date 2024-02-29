import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

const ContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [contextUserInfo, setContextUserInfo] = useState(false);

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        contextUserInfo,
        setContextUserInfo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useLogin = () => useContext(AppContext);

export default ContextProvider;
