import firebaseInit from "../firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

firebaseInit();
const useFirebase = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDashBoard, setIsDashBoard] = useState(true);
  const [message, setMessage] = useState("");
  const history = useHistory();

  const auth = getAuth();
  const emailpasswordRegister = (email, pass) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        setUser(userCredential.user);
        const text = `Welcome ${
          userCredential.user.displayName
            ? userCredential.user.displayName
            : userCredential.user.email
        } Successfully registered and Logedin`;
        setMessage(text);
        history.push("/home");
      })
      .catch((error) => {
        setError(error.code);
      })
      .finally(() => setIsLoading(false));
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
  console.log(user);
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
