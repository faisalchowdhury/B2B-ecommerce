import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../Firebase/firebase";
import axios from "axios";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Register User
  const registerUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Update Profile
  const updateUserProfile = (userData, imageUrl) => {
    return updateProfile(auth.currentUser, {
      displayName: userData.name,
      photoURL: imageUrl,
    });
  };

  // Login User
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Login with Google
  const googleProvider = new GoogleAuthProvider();
  const loginWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };
  // onAuthStateChange / observer

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser?.email) {
        axios
          .post(
            "https://b2b-server-five.vercel.app/jwt",
            { email: currentUser.email },
            {
              withCredentials: true,
            }
          )
          .then((res) => console.log(res.data));
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  //  logout User

  const logoutUser = () => {
    signOut(auth).then(() =>
      axios
        .post(
          "https://b2b-server-five.vercel.app/logout",
          {},
          { withCredentials: true }
        )
        .then((res) => console.log(res.data))
    );
  };
  const userInfo = {
    registerUser,
    loginUser,
    updateUserProfile,
    loginWithGoogle,
    user,
    loading,
    logoutUser,
  };

  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
