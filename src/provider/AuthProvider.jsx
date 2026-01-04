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
import api from "../api/api";

export const AuthContext = createContext();

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
const [role, setRole] = useState(null);

  
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

  const refreshUser = async () => {
  if (auth.currentUser) {
    await auth.currentUser.reload();
    setUser({ ...auth.currentUser });
  }
};


useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      try {
        const token = await currentUser.getIdToken(true);
        localStorage.setItem("token", token);
        setUser(currentUser);

        const res = await api.get(
          `/users/role/${currentUser.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setRole(res.data.role);
      } catch (err) {
        console.error("Auth error:", err);
        setUser(null);
        setRole(null);
      }
    } else {
      setUser(null);
      setRole(null);
      localStorage.removeItem("token");
    }
    setLoading(false);
  });

  return () => unsubscribe();
}, []);

  return (
    <AuthContext.Provider value={{
      user,
       role,    
      loading,
      registerUser,
      loginUser,
      refreshUser,
      googleLogin,
      logoutUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
