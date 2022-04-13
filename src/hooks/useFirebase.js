import firebaseInit from "../firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";

firebaseInit();
const useFirebase = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDashBoard, setIsDashBoard] = useState(true);
  const [message, setMessage] = useState("");

  const auth = getAuth();
  const emailpasswordRegister = (email, pass) => {
    setIsLoading(true);
    return createUserWithEmailAndPassword(auth, email, pass);
  };

  const emailPasswordLogin = (email, pass) => {
    setIsLoading(true);
    return signInWithEmailAndPassword(auth, email, pass);
  };
  const logOut = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        setMessage("An user Logouted");
      })
      .catch((error) => setError(error.code))
      .finally(() => setIsLoading(false));
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userData) => {
      if (userData) {
        setUser(userData);
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
    return () => unsubscribe;
  }, []);
  return {
    emailpasswordRegister,
    emailPasswordLogin,
    logOut,
    user,
    setUser,
    error,
    setError,
    message,
    setMessage,
    isLoading,
    setIsLoading,
    isDashBoard,
    setIsDashBoard,
  };
};

export default useFirebase;
