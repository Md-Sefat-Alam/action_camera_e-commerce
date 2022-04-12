import { useContext } from "react";
import { AuthContext } from "../contexts/AllProviders/AllProvider";

const useAuth = () => {
  return useContext(AuthContext);
};
export default useAuth;
