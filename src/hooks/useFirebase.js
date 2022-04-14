import firebaseInit from "../firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useEffect, useState } from "react";
import axios from "axios";

firebaseInit();
const useFirebase = () => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isDashBoard, setIsDashBoard] = useState(true);
  const [message, setMessage] = useState("");
  const [cart, setCart] = useState([]);
  const [quantityManage, setQuantityManage] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

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
        axios
          .get(`http://localhost:5000/isadmin/${userData.email}`)
          .then((res) => {
            if (res.status === 200) {
              if (res.data.role === "ADMIN") {
                setIsAdmin(true);
              } else {
                setIsAdmin(false);
              }
            }
          })
          .catch((error) => setError("Database connection problem"));
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
    setProducts,
    products,
    cart,
    setCart,
    setQuantityManage,
    quantityManage,
    isAdmin,
  };
};

export default useFirebase;
