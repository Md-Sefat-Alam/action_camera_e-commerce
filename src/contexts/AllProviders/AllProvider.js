import React, { createContext } from "react";
import useFirebase from "../../components/hooks/useFirebase";

export const AuthContext = createContext();
const AllProvider = ({ children }) => {
  const allValues = useFirebase();
  return (
    <AuthContext.Provider value={allValues}>{children}</AuthContext.Provider>
  );
};

export default AllProvider;
