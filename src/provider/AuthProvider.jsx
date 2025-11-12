import React, { createContext, useState, useEffect } from "react";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged, 
  updateProfile 
} from "firebase/auth";
import app from "../firebase/firebase.config"; 

export const AuthContext = createContext();

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  const registerUser = async (email, password, name, photoURL) => {
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(res.user, { displayName: name, photoURL });
      return res.user;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

 
  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      return res.user;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };


  const googleLogin = async () => {
    setLoading(true);
    try {
      const res = await signInWithPopup(auth, googleProvider);
      return res.user;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };


  const logoutUser = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      localStorage.removeItem("token");
      setUser(null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const token = await currentUser.getIdToken(true); // force refresh token
          localStorage.setItem("token", token); // safe store
          setUser(currentUser);
        } catch (err) {
          console.error("Token fetch error:", err);
          localStorage.removeItem("token");
          setUser(null);
        }
      } else {
        localStorage.removeItem("token");
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      registerUser,
      loginUser,
      googleLogin,
      logoutUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
