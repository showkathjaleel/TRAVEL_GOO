import { createContext, useState } from "react";

export const AuthUser = createContext({});

export default function AuthProvider({ children }) {
  const [userAuth, setUserAuth] = useState({});

  return (
    <AuthUser.Provider value={{ userAuth, setUserAuth }}>
      {children}
    </AuthUser.Provider>
  );
}
